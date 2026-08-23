from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..models.schema import Trainee, FollowUpSchedule, FollowUpResponse, WageRecord, EmploymentRecord, EventStream
from ..models.pydantic_models import FollowUpSubmission, FollowUpExtractedResponse
from ..services.nlu_followup import FollowUpNLUEngine

router = APIRouter(prefix="/api/followups", tags=["Follow-up Engine"])

@router.post("/process-conversation", response_model=FollowUpExtractedResponse)
def process_followup_message(submission: FollowUpSubmission, db: Session = Depends(get_db)):
    trainee = db.query(Trainee).filter(Trainee.id == submission.trainee_id).first()
    if not trainee:
        raise HTTPException(status_code=404, detail="Trainee not found")

    nlu = FollowUpNLUEngine()
    extracted = nlu.extract_milestone_from_text(submission.raw_message, submission.language)

    # Find or create follow-up schedule
    fu = db.query(FollowUpSchedule).filter(
        FollowUpSchedule.trainee_id == submission.trainee_id,
        FollowUpSchedule.checkpoint == submission.checkpoint
    ).first()

    if not fu:
        fu = FollowUpSchedule(
            trainee_id=submission.trainee_id,
            checkpoint=submission.checkpoint,
            due_date=datetime.utcnow(),
            status="COMPLETED",
            channel_used=submission.channel,
            completed_at=datetime.utcnow()
        )
        db.add(fu)
        db.flush()
    else:
        fu.status = "COMPLETED"
        fu.completed_at = datetime.utcnow()

    # Save structured response
    resp = FollowUpResponse(
        followup_id=fu.id,
        transcript_raw=submission.raw_message,
        extracted_status=extracted["extracted_status"],
        extracted_wage=extracted["extracted_wage"],
        extracted_employer=extracted["extracted_employer"],
        extracted_job_location=extracted["extracted_job_location"],
        job_satisfaction_rating=extracted["job_satisfaction_rating"],
        extracted_reason=extracted["extracted_reason"],
        nlu_confidence=extracted["nlu_confidence"]
    )
    db.add(resp)

    # Update trainee current status and wage record if valid
    trainee.current_status = extracted["extracted_status"]
    
    if extracted["extracted_wage"]:
        # Add new wage record
        cp_map = {"DAY_30": 30, "DAY_90": 90, "DAY_180": 180, "DAY_365": 365}
        cp_day = cp_map.get(submission.checkpoint, 90)
        
        db.add(WageRecord(
            trainee_id=trainee.id,
            checkpoint_day=cp_day,
            monthly_wage=extracted["extracted_wage"],
            reported_date=datetime.utcnow(),
            source="FOLLOWUP_AI"
        ))

        # Update existing current employment wage if active
        active_emp = db.query(EmploymentRecord).filter(
            EmploymentRecord.trainee_id == trainee.id,
            EmploymentRecord.is_current == True
        ).first()
        if active_emp:
            active_emp.current_wage = extracted["extracted_wage"]

    # Record event in stream
    db.add(EventStream(
        event_type="FOLLOWUP_COMPLETED",
        entity_id=trainee.id,
        entity_type="TRAINEE",
        actor_id="FOLLOWUP_AI_NLU",
        payload={
            "checkpoint": submission.checkpoint,
            "status": extracted["extracted_status"],
            "wage": extracted["extracted_wage"],
            "confidence": extracted["nlu_confidence"]
        }
    ))

    db.commit()

    return FollowUpExtractedResponse(
        followup_id=fu.id,
        trainee_id=trainee.id,
        extracted_status=extracted["extracted_status"],
        extracted_wage=extracted["extracted_wage"],
        extracted_employer=extracted["extracted_employer"],
        extracted_job_location=extracted["extracted_job_location"],
        extracted_reason=extracted["extracted_reason"],
        job_satisfaction_rating=extracted["job_satisfaction_rating"],
        nlu_confidence=extracted["nlu_confidence"],
        suggested_next_question=extracted["suggested_next_question"],
        structured_payload=extracted["structured_payload"]
    )
