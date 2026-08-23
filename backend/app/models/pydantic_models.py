from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    role: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    role: str
    organization_id: Optional[str] = None

class TraineeSummary(BaseModel):
    id: str
    skill_id: str
    full_name: str
    gender: str
    district: str
    state: str
    current_status: str
    course_name: Optional[str] = None
    provider_name: Optional[str] = None
    batch_code: Optional[str] = None
    data_quality_score: float
    identity_confidence: float

class TraineeDetail(BaseModel):
    id: str
    skill_id: str
    full_name: str
    gender: str
    dob: str
    social_category: str
    primary_phone: str
    secondary_phone: Optional[str] = None
    email: Optional[str] = None
    district: str
    state: str
    education_level: str
    rural_urban: str
    current_status: str
    data_quality_score: float
    identity_confidence: float
    batch: Optional[Dict[str, Any]] = None
    certifications: List[Dict[str, Any]] = []
    employment_records: List[Dict[str, Any]] = []
    wage_records: List[Dict[str, Any]] = []
    followups: List[Dict[str, Any]] = []
    consents: List[Dict[str, Any]] = []
    predictions: List[Dict[str, Any]] = []

class FollowUpSubmission(BaseModel):
    trainee_id: str
    checkpoint: str # DAY_30, DAY_90, DAY_180, DAY_365
    raw_message: str
    language: str = "en"
    channel: str = "WHATSAPP_AI"

class FollowUpExtractedResponse(BaseModel):
    followup_id: str
    trainee_id: str
    extracted_status: str
    extracted_wage: Optional[float] = None
    extracted_employer: Optional[str] = None
    extracted_job_location: Optional[str] = None
    extracted_reason: Optional[str] = None
    job_satisfaction_rating: int
    nlu_confidence: float
    suggested_next_question: str
    structured_payload: Dict[str, Any]

class VerificationRequest(BaseModel):
    employment_id: str
    signal_type: str # EMPLOYER_PORTAL_CONFIRM, EMPLOYER_OTP, SALARY_SLIP_UPLOAD
    is_positive: bool
    details: Optional[Dict[str, Any]] = None
    verifier_role: str = "EMPLOYER"

class ConsentUpdateRequest(BaseModel):
    trainee_id: str
    purpose_code: str
    status: str # GRANTED, REVOKED
    channel: str = "DIGITAL_PORTAL"

class InterventionCreateRequest(BaseModel):
    recommendation_id: Optional[str] = None
    code: str
    title: str
    intervention_type: str
    target_course_id: Optional[str] = None
    target_provider_id: Optional[str] = None
    start_date: datetime
    baseline_placement_rate: float
    baseline_6m_retention: float

class RecommendationResponse(BaseModel):
    id: str
    target_type: str
    target_id: str
    target_name: Optional[str] = None
    title: str
    problem_statement: str
    evidence_summary: str
    possible_causes: List[str]
    recommended_actions: List[str]
    priority: str
    expected_impact: str
    confidence_percentage: float
    measurement_plan: str
    status: str

class MetricOverview(BaseModel):
    total_enrolled: int
    total_certified: int
    certification_rate: float
    total_placed_or_employed: int
    placement_rate: float
    total_self_employed: int
    total_apprentices: int
    retention_30d_pct: float
    retention_90d_pct: float
    retention_180d_pct: float
    retention_365d_pct: float
    median_starting_wage: float
    median_current_wage: float
    median_wage_growth_pct: float
    data_quality_score: float
    verified_outcomes_percentage: float

class MLPredictionResponse(BaseModel):
    trainee_id: str
    skill_id: str
    model_type: str
    prediction_score: float
    prediction_label: str
    confidence: float
    positive_drivers: List[Dict[str, Any]]
    negative_drivers: List[Dict[str, Any]]
    explanation_narrative: str
