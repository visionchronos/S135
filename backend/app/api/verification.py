from datetime import datetime
from typing import Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..models.schema import EmploymentRecord, VerificationRecord, EventStream, Trainee
from ..models.pydantic_models import VerificationRequest

router = APIRouter(prefix="/api/verification", tags=["Multi-Signal Verification"])

@router.get("/pending-queue")
def get_pending_verifications(limit: int = 25, db: Session = Depends(get_db)):
    pending = db.query(EmploymentRecord).filter(
        EmploymentRecord.verification_status.in_(["PENDING_EMPLOYER", "UNVERIFIED"])
    ).limit(limit).all()

    results = []
    for p in pending:
        t = db.query(Trainee).filter(Trainee.id == p.trainee_id).first()
        results.append({
            "employment_id": p.id,
            "trainee_id": p.trainee_id,
            "trainee_name": t.full_name if t else "N/A",
            "skill_id": t.skill_id if t else "N/A",
            "employer_name": p.employer_name_declared,
            "designation": p.designation,
            "location": f"{p.job_location_district}, {p.job_location_state}",
            "declared_wage": p.starting_wage,
            "joining_date": p.joining_date.isoformat(),
            "current_score": p.verification_score,
            "status": p.verification_status
        })

    return {"total_pending": len(results), "queue": results}

@router.post("/verify-signal")
def submit_verification_signal(req: VerificationRequest, db: Session = Depends(get_db)):
    emp = db.query(EmploymentRecord).filter(EmploymentRecord.id == req.employment_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employment record not found")

    # Add verification signal
    signal = VerificationRecord(
        employment_id=emp.id,
        signal_type=req.signal_type,
        signal_weight=0.45 if req.signal_type in ["EMPLOYER_PORTAL_CONFIRM", "EMPLOYER_OTP"] else 0.30,
        is_positive=req.is_positive,
        details=req.details or {"source": "PORTAL_ACTION"},
        verified_at=datetime.utcnow(),
        verifier_role=req.verifier_role
    )
    db.add(signal)
    db.flush()

    # Recalculate composite verification score
    all_signals = db.query(VerificationRecord).filter(VerificationRecord.employment_id == emp.id).all()
    pos_weight = sum(s.signal_weight for s in all_signals if s.is_positive)
    
    if req.is_positive:
        emp.verification_score = min(0.98, round(0.50 + pos_weight, 2))
        emp.verification_status = "VERIFIED"
    else:
        emp.verification_score = 0.20
        emp.verification_status = "REJECTED"

    db.add(EventStream(
        event_type="EMPLOYMENT_VERIFIED" if req.is_positive else "EMPLOYMENT_REJECTED",
        entity_id=emp.id,
        entity_type="EMPLOYMENT",
        actor_id=req.verifier_role,
        payload={
            "signal_type": req.signal_type,
            "is_positive": req.is_positive,
            "new_score": emp.verification_score,
            "status": emp.verification_status
        }
    ))

    db.commit()

    return {
        "employment_id": emp.id,
        "new_verification_status": emp.verification_status,
        "verification_score": emp.verification_score,
        "confidence_percentage": round(emp.verification_score * 100, 1),
        "message": "Employment outcome successfully verified with statutory multi-signal confidence."
    }
