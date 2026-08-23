from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..models.schema import Recommendation, Intervention, Course, Provider, EventStream
from ..models.pydantic_models import InterventionCreateRequest

router = APIRouter(prefix="/api/interventions", tags=["Interventions & Closed-Loop Engine"])

@router.get("/recommendations")
def get_recommendations(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Recommendation)
    if status:
        query = query.filter(Recommendation.status == status)
    
    recs = query.all()
    results = []
    for r in recs:
        target_name = "System Wide"
        if r.target_type == "COURSE":
            c = db.query(Course).filter(Course.id == r.target_id).first()
            if c: target_name = c.name
        elif r.target_type == "PROVIDER":
            p = db.query(Provider).filter(Provider.id == r.target_id).first()
            if p: target_name = p.name

        results.append({
            "id": r.id,
            "target_type": r.target_type,
            "target_id": r.target_id,
            "target_name": target_name,
            "title": r.title,
            "problem_statement": r.problem_statement,
            "evidence_summary": r.evidence_summary,
            "possible_causes": r.possible_causes or [],
            "recommended_actions": r.recommended_actions or [],
            "priority": r.priority,
            "expected_impact": r.expected_impact,
            "confidence_percentage": r.confidence_percentage,
            "measurement_plan": r.measurement_plan,
            "status": r.status
        })

    return results

@router.get("/active-tracker")
def get_intervention_tracker(db: Session = Depends(get_db)):
    interventions = db.query(Intervention).all()
    results = []
    for inv in interventions:
        course = db.query(Course).filter(Course.id == inv.target_course_id).first()
        provider = db.query(Provider).filter(Provider.id == inv.target_provider_id).first()

        results.append({
            "id": inv.id,
            "code": inv.code,
            "title": inv.title,
            "intervention_type": inv.intervention_type,
            "target_course_name": course.name if course else "Multi-Course",
            "target_provider_name": provider.name if provider else "National Providers",
            "start_date": inv.start_date.isoformat(),
            "end_date": inv.end_date.isoformat() if inv.end_date else None,
            "status": inv.status,
            "baseline_placement_rate": inv.baseline_placement_rate,
            "baseline_6m_retention": inv.baseline_6m_retention,
            "post_placement_rate": inv.post_placement_rate,
            "post_6m_retention": inv.post_6m_retention,
            "impact_delta_percentage": inv.impact_delta_percentage,
            "evaluation_notes": inv.evaluation_notes,
            "learning_verdict": "PROVEN_EFFECTIVE" if (inv.impact_delta_percentage and inv.impact_delta_percentage > 15) else "MONITORING"
        })

    return results

@router.post("/create")
def create_intervention(req: InterventionCreateRequest, db: Session = Depends(get_db)):
    inv = Intervention(
        recommendation_id=req.recommendation_id,
        code=req.code,
        title=req.title,
        intervention_type=req.intervention_type,
        target_course_id=req.target_course_id,
        target_provider_id=req.target_provider_id,
        start_date=req.start_date,
        status="ACTIVE",
        baseline_placement_rate=req.baseline_placement_rate,
        baseline_6m_retention=req.baseline_6m_retention
    )
    db.add(inv)
    
    if req.recommendation_id:
        rec = db.query(Recommendation).filter(Recommendation.id == req.recommendation_id).first()
        if rec:
            rec.status = "UNDER_INTERVENTION"

    db.add(EventStream(
        event_type="INTERVENTION_CREATED",
        entity_id=inv.id,
        entity_type="INTERVENTION",
        actor_id="POLICY_ADMIN",
        payload={"code": inv.code, "title": inv.title}
    ))

    db.commit()

    return {"id": inv.id, "message": "Policy intervention deployed to active measurement tracker."}
