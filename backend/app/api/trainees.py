from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..models.schema import (
    Trainee, Batch, Course, Provider, Certification, EmploymentRecord,
    WageRecord, FollowUpSchedule, FollowUpResponse, TraineeConsent, ModelPredictionLog
)

router = APIRouter(prefix="/api/trainees", tags=["Trainees"])

@router.get("")
def list_trainees(
    skip: int = 0,
    limit: int = 25,
    district: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Trainee)
    if district:
        query = query.filter(Trainee.district == district)
    if status:
        query = query.filter(Trainee.current_status == status)
    if search:
        query = query.filter(
            (Trainee.full_name.ilike(f"%{search}%")) |
            (Trainee.skill_id.ilike(f"%{search}%")) |
            (Trainee.primary_phone.ilike(f"%{search}%"))
        )
    
    total = query.count()
    trainees = query.offset(skip).limit(limit).all()
    
    results = []
    for t in trainees:
        batch = db.query(Batch).filter(Batch.id == t.batch_id).first()
        course = db.query(Course).filter(Course.id == batch.course_id).first() if batch else None
        prov = db.query(Provider).filter(Provider.id == batch.provider_id).first() if batch else None

        results.append({
            "id": t.id,
            "skill_id": t.skill_id,
            "full_name": t.full_name,
            "gender": t.gender,
            "district": t.district,
            "state": t.state,
            "current_status": t.current_status,
            "course_name": course.name if course else None,
            "provider_name": prov.name if prov else None,
            "batch_code": batch.batch_code if batch else None,
            "data_quality_score": t.data_quality_score,
            "identity_confidence": t.identity_confidence
        })

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": results
    }

@router.get("/{skill_or_id}")
def get_trainee_detail(skill_or_id: str, db: Session = Depends(get_db)):
    trainee = db.query(Trainee).filter(
        (Trainee.id == skill_or_id) | (Trainee.skill_id == skill_or_id)
    ).first()
    
    if not trainee:
        raise HTTPException(status_code=404, detail="Trainee record not found")

    batch = db.query(Batch).filter(Batch.id == trainee.batch_id).first()
    course = db.query(Course).filter(Course.id == batch.course_id).first() if batch else None
    prov = db.query(Provider).filter(Provider.id == batch.provider_id).first() if batch else None

    certs = db.query(Certification).filter(Certification.trainee_id == trainee.id).all()
    emp_records = db.query(EmploymentRecord).filter(EmploymentRecord.trainee_id == trainee.id).all()
    wage_records = db.query(WageRecord).filter(WageRecord.trainee_id == trainee.id).order_by(WageRecord.checkpoint_day.asc()).all()
    followups = db.query(FollowUpSchedule).filter(FollowUpSchedule.trainee_id == trainee.id).all()
    consents = db.query(TraineeConsent).filter(TraineeConsent.trainee_id == trainee.id).all()
    predictions = db.query(ModelPredictionLog).filter(ModelPredictionLog.trainee_id == trainee.id).all()

    return {
        "id": trainee.id,
        "skill_id": trainee.skill_id,
        "full_name": trainee.full_name,
        "gender": trainee.gender,
        "dob": trainee.dob,
        "social_category": trainee.social_category,
        "primary_phone": trainee.primary_phone,
        "email": trainee.email,
        "district": trainee.district,
        "state": trainee.state,
        "education_level": trainee.education_level,
        "rural_urban": trainee.rural_urban,
        "current_status": trainee.current_status,
        "data_quality_score": trainee.data_quality_score,
        "identity_confidence": trainee.identity_confidence,
        "training": {
            "course_name": course.name if course else "N/A",
            "sector": course.sector if course else "N/A",
            "qp_code": course.qp_code if course else "N/A",
            "nsqf_level": course.nsqf_level if course else 4,
            "provider_name": prov.name if prov else "N/A",
            "batch_code": batch.batch_code if batch else "N/A",
            "start_date": batch.start_date.isoformat() if batch else None,
            "end_date": batch.end_date.isoformat() if batch else None
        },
        "certifications": [
            {
                "certificate_number": c.certificate_number,
                "issue_date": c.issue_date.isoformat(),
                "nsqf_level": c.nsqf_level,
                "credential_uri": c.credential_uri,
                "is_valid": c.is_valid
            }
            for c in certs
        ],
        "employment_records": [
            {
                "id": e.id,
                "employer_name": e.employer_name_declared,
                "designation": e.designation,
                "sector": e.sector,
                "location": f"{e.job_location_district}, {e.job_location_state}",
                "joining_date": e.joining_date.isoformat(),
                "exit_date": e.exit_date.isoformat() if e.exit_date else None,
                "starting_wage": e.starting_wage,
                "current_wage": e.current_wage,
                "verification_status": e.verification_status,
                "verification_score": e.verification_score,
                "skill_relevance_score": e.skill_relevance_score,
                "exit_reason": e.exit_reason_category
            }
            for e in emp_records
        ],
        "wage_records": [
            {
                "checkpoint_day": w.checkpoint_day,
                "monthly_wage": w.monthly_wage,
                "reported_date": w.reported_date.isoformat(),
                "source": w.source
            }
            for w in wage_records
        ],
        "followups": [
            {
                "id": f.id,
                "checkpoint": f.checkpoint,
                "status": f.status,
                "channel": f.channel_used,
                "completed_at": f.completed_at.isoformat() if f.completed_at else None
            }
            for f in followups
        ],
        "consents": [
            {
                "purpose_code": c.purpose_code,
                "status": c.status,
                "granted_at": c.granted_at.isoformat() if c.granted_at else None,
                "channel": c.channel
            }
            for c in consents
        ],
        "predictions": [
            {
                "model_type": p.model_type,
                "prediction_score": p.prediction_score,
                "prediction_label": p.prediction_label,
                "confidence": p.confidence,
                "positive_factors": p.top_positive_factors,
                "negative_factors": p.top_negative_factors
            }
            for p in predictions
        ]
    }
