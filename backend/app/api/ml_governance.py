from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..services.ml_service import MLOutcomeService

router = APIRouter(prefix="/api/ml-governance", tags=["ML Explainability & Fairness"])

@router.get("/predict-placement/{trainee_id}")
def predict_trainee_placement(trainee_id: str, db: Session = Depends(get_db)):
    service = MLOutcomeService(db)
    result = service.predict_placement_probability(trainee_id)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result

@router.get("/fairness-audit")
def get_model_fairness_audit(db: Session = Depends(get_db)):
    service = MLOutcomeService(db)
    return service.get_fairness_and_bias_audit()
