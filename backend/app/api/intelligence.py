from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..services.intelligence_engine import OutcomeIntelligenceEngine

router = APIRouter(prefix="/api/intelligence", tags=["Outcome Intelligence"])

@router.get("/macro-overview")
def get_macro_overview(
    state: Optional[str] = None,
    district: Optional[str] = None,
    sector: Optional[str] = None,
    provider_id: Optional[str] = None,
    course_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    engine = OutcomeIntelligenceEngine(db)
    filters = {}
    if state: filters["state"] = state
    if district: filters["district"] = district
    if sector: filters["sector"] = sector
    if provider_id: filters["provider_id"] = provider_id
    if course_id: filters["course_id"] = course_id

    return engine.get_macro_overview(filters)

@router.get("/district-map")
def get_district_map(db: Session = Depends(get_db)):
    engine = OutcomeIntelligenceEngine(db)
    return engine.get_district_outcomes_map()

@router.get("/course-benchmarks")
def get_course_benchmarks(db: Session = Depends(get_db)):
    engine = OutcomeIntelligenceEngine(db)
    return engine.get_course_benchmarks()

@router.get("/provider-benchmarks")
def get_provider_benchmarks(db: Session = Depends(get_db)):
    engine = OutcomeIntelligenceEngine(db)
    return engine.get_provider_benchmarks()

@router.get("/skill-supply-demand")
def get_skill_supply_demand(db: Session = Depends(get_db)):
    engine = OutcomeIntelligenceEngine(db)
    return engine.get_skill_supply_vs_demand()

@router.get("/retention-attrition")
def get_retention_attrition(db: Session = Depends(get_db)):
    engine = OutcomeIntelligenceEngine(db)
    return engine.get_retention_and_attrition_intelligence()

@router.get("/data-quality-audit")
def get_data_quality_audit(db: Session = Depends(get_db)):
    engine = OutcomeIntelligenceEngine(db)
    return engine.run_data_quality_audit()
