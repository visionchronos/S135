import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, ForeignKey, 
    Text, JSON, Enum, Index, UniqueConstraint
)
from sqlalchemy.orm import relationship
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="policy_maker") # admin, policy_maker, provider, employer, trainee
    organization_id = Column(String(36), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    ministry = Column(String(255), nullable=False, default="Ministry of Skill Development & Entrepreneurship")
    budget_crores = Column(Float, default=100.0)
    target_beneficiaries = Column(Integer, default=50000)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    programmes = relationship("Programme", back_populates="scheme")

class Programme(Base):
    __tablename__ = "programmes"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    scheme_id = Column(String(36), ForeignKey("schemes.id"), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    target_sector = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    scheme = relationship("Scheme", back_populates="programmes")
    courses = relationship("Course", back_populates="programme")

class Provider(Base):
    __tablename__ = "providers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), default="National Training Partner") # NSDC Partner, State Skill Mission, Private, NGO
    state = Column(String(100), nullable=False)
    headquarters = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=False)
    contact_phone = Column(String(50), nullable=False)
    rating = Column(Float, default=4.0)
    data_quality_score = Column(Float, default=90.0)
    is_blacklisted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    centres = relationship("TrainingCentre", back_populates="provider")
    batches = relationship("Batch", back_populates="provider")

class TrainingCentre(Base):
    __tablename__ = "training_centres"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    provider_id = Column(String(36), ForeignKey("providers.id"), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    pincode = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    provider = relationship("Provider", back_populates="centres")
    batches = relationship("Batch", back_populates="centre")

class Course(Base):
    __tablename__ = "courses"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    programme_id = Column(String(36), ForeignKey("programmes.id"), nullable=False)
    qp_code = Column(String(50), unique=True, nullable=False) # Qualification Pack Code e.g. ELE/Q4606
    name = Column(String(255), nullable=False)
    sector = Column(String(100), nullable=False) # IT-ITeS, Electronics, Healthcare, Retail, Automotive, etc.
    nsqf_level = Column(Integer, default=4)
    duration_hours = Column(Integer, default=400)
    curriculum_summary = Column(Text, nullable=True)
    expected_entry_wage = Column(Float, default=15000.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    programme = relationship("Programme", back_populates="courses")
    batches = relationship("Batch", back_populates="course")
    skills = relationship("CourseSkill", back_populates="course")

class Batch(Base):
    __tablename__ = "batches"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    provider_id = Column(String(36), ForeignKey("providers.id"), nullable=False)
    centre_id = Column(String(36), ForeignKey("training_centres.id"), nullable=False)
    course_id = Column(String(36), ForeignKey("courses.id"), nullable=False)
    batch_code = Column(String(100), unique=True, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(50), default="COMPLETED") # ONGOING, COMPLETED, CANCELLED
    intervention_id = Column(String(36), ForeignKey("interventions.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    provider = relationship("Provider", back_populates="batches")
    centre = relationship("TrainingCentre", back_populates="batches")
    course = relationship("Course", back_populates="batches")
    trainees = relationship("Trainee", back_populates="batch")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(150), unique=True, nullable=False)
    category = Column(String(100), default="Technical") # Technical, Soft Skill, Digital, Domain
    demand_level = Column(String(50), default="MEDIUM") # HIGH, MEDIUM, LOW
    created_at = Column(DateTime, default=datetime.utcnow)

    course_links = relationship("CourseSkill", back_populates="skill")
    trainee_skills = relationship("TraineeSkill", back_populates="skill")

class CourseSkill(Base):
    __tablename__ = "course_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    course_id = Column(String(36), ForeignKey("courses.id"), nullable=False)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    depth_level = Column(String(50), default="INTERMEDIATE") # BASIC, INTERMEDIATE, ADVANCED

    course = relationship("Course", back_populates="skills")
    skill = relationship("Skill", back_populates="course_links")

class Trainee(Base):
    __tablename__ = "trainees"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    skill_id = Column(String(50), unique=True, index=True, nullable=False) # e.g. SKILL-IND-2026-XXXX
    batch_id = Column(String(36), ForeignKey("batches.id"), nullable=False)
    full_name = Column(String(255), nullable=False)
    gender = Column(String(20), nullable=False)
    dob = Column(String(20), nullable=False)
    social_category = Column(String(50), default="GEN") # GEN, OBC, SC, ST, EWS
    primary_phone = Column(String(50), index=True, nullable=False)
    secondary_phone = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    pincode = Column(String(20), nullable=False)
    education_level = Column(String(100), default="12th Pass")
    disability_status = Column(Boolean, default=False)
    rural_urban = Column(String(20), default="RURAL")
    
    # Longitudinal Status
    current_status = Column(String(50), default="CERTIFIED") 
    # ENROLLED, IN_TRAINING, DROPOUT, CERTIFIED, EMPLOYED, SELF_EMPLOYED, APPRENTICE, UNPLACED, HIGHER_ED
    
    data_quality_score = Column(Float, default=95.0)
    identity_confidence = Column(Float, default=100.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    batch = relationship("Batch", back_populates="trainees")
    identities = relationship("Identity", back_populates="trainee")
    consents = relationship("TraineeConsent", back_populates="trainee")
    attendances = relationship("Attendance", back_populates="trainee")
    assessments = relationship("Assessment", back_populates="trainee")
    certifications = relationship("Certification", back_populates="trainee")
    skills = relationship("TraineeSkill", back_populates="trainee")
    employment_records = relationship("EmploymentRecord", back_populates="trainee")
    apprenticeships = relationship("ApprenticeshipRecord", back_populates="trainee")
    self_employments = relationship("SelfEmploymentRecord", back_populates="trainee")
    wage_records = relationship("WageRecord", back_populates="trainee")
    followups = relationship("FollowUpSchedule", back_populates="trainee")
    predictions = relationship("ModelPredictionLog", back_populates="trainee")

class Identity(Base):
    __tablename__ = "identities"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    id_type = Column(String(50), nullable=False) # AADHAAR_VIRTUAL_TOKEN, APAAR_ID, DRIVING_LICENCE, VOTER_ID, PAN_HASH
    id_token_hash = Column(String(255), nullable=False, index=True)
    is_primary = Column(Boolean, default=True)
    verification_status = Column(String(50), default="VERIFIED")
    confidence_score = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    trainee = relationship("Trainee", back_populates="identities")

class ConsentPolicy(Base):
    __tablename__ = "consent_policies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    purpose_code = Column(String(100), unique=True, nullable=False) # EMPLOYMENT_TRACKING, EMPLOYER_VERIFY, POLICY_ANALYTICS, JOB_MATCHING
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    data_retention_years = Column(Integer, default=5)
    is_mandatory = Column(Boolean, default=False)
    version = Column(String(20), default="v1.0")

class TraineeConsent(Base):
    __tablename__ = "trainee_consents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    purpose_code = Column(String(100), nullable=False)
    status = Column(String(50), default="GRANTED") # GRANTED, REVOKED, EXPIRED
    granted_at = Column(DateTime, default=datetime.utcnow)
    revoked_at = Column(DateTime, nullable=True)
    channel = Column(String(50), default="DIGITAL_FORM") # DIGITAL_FORM, SMS_OTP, IVR_CONSENT, ASSISTED_VERBAL
    ip_address = Column(String(100), nullable=True)

    trainee = relationship("Trainee", back_populates="consents")

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    batch_id = Column(String(36), ForeignKey("batches.id"), nullable=False)
    total_classes = Column(Integer, default=80)
    attended_classes = Column(Integer, default=74)
    percentage = Column(Float, default=92.5)
    biometric_verified = Column(Boolean, default=True)

    trainee = relationship("Trainee", back_populates="attendances")

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    assessment_agency = Column(String(255), default="National Skill Assessment Council")
    theory_score = Column(Float, default=78.0)
    practical_score = Column(Float, default=85.0)
    total_score = Column(Float, default=81.5)
    passed = Column(Boolean, default=True)
    assessment_date = Column(DateTime, default=datetime.utcnow)

    trainee = relationship("Trainee", back_populates="assessments")

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    certificate_number = Column(String(100), unique=True, nullable=False)
    issue_date = Column(DateTime, default=datetime.utcnow)
    nsqf_level = Column(Integer, default=4)
    credential_uri = Column(String(500), nullable=True)
    qr_code_hash = Column(String(255), nullable=True)
    is_valid = Column(Boolean, default=True)

    trainee = relationship("Trainee", back_populates="certifications")

class TraineeSkill(Base):
    __tablename__ = "trainee_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    proficiency_level = Column(String(50), default="CERTIFIED") # LEARNER, CERTIFIED, PRACTICING, MASTER
    assessment_rating = Column(Float, default=80.0)

    trainee = relationship("Trainee", back_populates="skills")
    skill = relationship("Skill", back_populates="trainee_skills")

class Employer(Base):
    __tablename__ = "employers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    cin_or_reg = Column(String(100), unique=True, nullable=False)
    company_name = Column(String(255), nullable=False)
    sector = Column(String(100), nullable=False)
    scale = Column(String(50), default="MEDIUM") # MICRO, SMALL, MEDIUM, ENTERPRISE
    contact_person = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=False)
    contact_phone = Column(String(50), nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    verification_tier = Column(String(50), default="VERIFIED_PARTNER") # UNVERIFIED, SELF_DECLARED, VERIFIED_PARTNER, STATUTORY_CONFIRMED
    created_at = Column(DateTime, default=datetime.utcnow)

    employment_records = relationship("EmploymentRecord", back_populates="employer")
    job_postings = relationship("JobPosting", back_populates="employer")

class JobPosting(Base):
    __tablename__ = "job_postings"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    employer_id = Column(String(36), ForeignKey("employers.id"), nullable=False)
    job_title = Column(String(255), nullable=False)
    sector = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    offered_wage = Column(Float, default=18000.0)
    vacancies = Column(Integer, default=10)
    min_nsqf_level = Column(Integer, default=4)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    employer = relationship("Employer", back_populates="job_postings")
    requirements = relationship("JobRequirementSkill", back_populates="job_posting")

class JobRequirementSkill(Base):
    __tablename__ = "job_requirement_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    job_posting_id = Column(String(36), ForeignKey("job_postings.id"), nullable=False)
    skill_name = Column(String(150), nullable=False)
    is_mandatory = Column(Boolean, default=True)

    job_posting = relationship("JobPosting", back_populates="requirements")

class EmploymentRecord(Base):
    __tablename__ = "employment_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    employer_id = Column(String(36), ForeignKey("employers.id"), nullable=True)
    employer_name_declared = Column(String(255), nullable=False)
    designation = Column(String(255), nullable=False)
    sector = Column(String(100), nullable=False)
    job_location_district = Column(String(100), nullable=False)
    job_location_state = Column(String(100), nullable=False)
    employment_type = Column(String(50), default="FULL_TIME") # FULL_TIME, PART_TIME, CONTRACTUAL, GIG
    joining_date = Column(DateTime, nullable=False)
    exit_date = Column(DateTime, nullable=True)
    is_current = Column(Boolean, default=True)
    starting_wage = Column(Float, nullable=False)
    current_wage = Column(Float, nullable=False)
    skill_relevance_score = Column(Float, default=0.85) # 0.0 - 1.0 (Alignment between course and role)
    
    # Non-placement / Attrition Tracking
    exit_reason_category = Column(String(100), nullable=True) 
    # LOW_SALARY, LOCATION_FAR, SKILL_MISMATCH, WORKING_CONDITIONS, FAMILY_REASONS, FURTHER_STUDIES, HEALTH, BETTER_OFFER
    exit_reason_details = Column(Text, nullable=True)
    
    # Multi-signal verification
    verification_score = Column(Float, default=0.85) # 0.0 - 1.0
    verification_status = Column(String(50), default="VERIFIED") 
    # UNVERIFIED, PENDING_EMPLOYER, VERIFIED, REJECTED, SUSPICIOUS
    created_at = Column(DateTime, default=datetime.utcnow)

    trainee = relationship("Trainee", back_populates="employment_records")
    employer = relationship("Employer", back_populates="employment_records")
    verifications = relationship("VerificationRecord", back_populates="employment")

class ApprenticeshipRecord(Base):
    __tablename__ = "apprenticeships"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    contract_number = Column(String(100), unique=True, nullable=False)
    establishment_name = Column(String(255), nullable=False)
    monthly_stipend = Column(Float, default=10000.0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_completed = Column(Boolean, default=False)
    converted_to_fulltime = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    trainee = relationship("Trainee", back_populates="apprenticeships")

class SelfEmploymentRecord(Base):
    __tablename__ = "self_employment"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    enterprise_name = Column(String(255), nullable=False)
    trade_activity = Column(String(255), nullable=False)
    monthly_net_income = Column(Float, default=18000.0)
    num_employees = Column(Integer, default=0)
    udyam_registered = Column(Boolean, default=False)
    start_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    trainee = relationship("Trainee", back_populates="self_employments")

class WageRecord(Base):
    __tablename__ = "wage_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    checkpoint_day = Column(Integer, nullable=False) # 0 (starting), 30, 90, 180, 365
    monthly_wage = Column(Float, nullable=False)
    reported_date = Column(DateTime, default=datetime.utcnow)
    source = Column(String(50), default="FOLLOWUP_AI") # FOLLOWUP_AI, EMPLOYER_PAYROLL, SELF_DECLARATION
    is_flagged_anomaly = Column(Boolean, default=False)

    trainee = relationship("Trainee", back_populates="wage_records")

class FollowUpSchedule(Base):
    __tablename__ = "followups"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    checkpoint = Column(String(50), nullable=False) # DAY_30, DAY_90, DAY_180, DAY_365
    due_date = Column(DateTime, nullable=False)
    status = Column(String(50), default="PENDING") # PENDING, IN_PROGRESS, COMPLETED, MISSED, EXEMPT
    channel_used = Column(String(50), default="WHATSAPP_AI") # WHATSAPP_AI, SMS_CONVERSATIONAL, IVR_VOICE, COUNSELLOR_CALL
    attempts_count = Column(Integer, default=1)
    completed_at = Column(DateTime, nullable=True)

    trainee = relationship("Trainee", back_populates="followups")
    responses = relationship("FollowUpResponse", back_populates="followup")

class FollowUpResponse(Base):
    __tablename__ = "followup_responses"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    followup_id = Column(String(36), ForeignKey("followups.id"), nullable=False)
    transcript_raw = Column(Text, nullable=True)
    extracted_status = Column(String(50), nullable=False) # EMPLOYED, UNEMPLOYED, SELF_EMPLOYED, APPRENTICE, STUDYING
    extracted_wage = Column(Float, nullable=True)
    extracted_employer = Column(String(255), nullable=True)
    extracted_job_location = Column(String(100), nullable=True)
    job_satisfaction_rating = Column(Integer, default=4) # 1-5
    extracted_reason = Column(String(100), nullable=True) # if unemployed/left
    nlu_confidence = Column(Float, default=0.92)
    created_at = Column(DateTime, default=datetime.utcnow)

    followup = relationship("FollowUpSchedule", back_populates="responses")

class VerificationRecord(Base):
    __tablename__ = "verification_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    employment_id = Column(String(36), ForeignKey("employment_records.id"), nullable=False)
    signal_type = Column(String(50), nullable=False) 
    # EMPLOYER_PORTAL_CONFIRM, EMPLOYER_OTP, SALARY_SLIP_UPLOAD, FOLLOWUP_CONSISTENCY, SIMULATED_PAYROLL_API
    signal_weight = Column(Float, default=0.35)
    is_positive = Column(Boolean, default=True)
    details = Column(JSON, nullable=True)
    verified_at = Column(DateTime, default=datetime.utcnow)
    verifier_role = Column(String(50), default="EMPLOYER")

    employment = relationship("EmploymentRecord", back_populates="verifications")

class SkillGapAnalysis(Base):
    __tablename__ = "skill_gaps"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    course_id = Column(String(36), ForeignKey("courses.id"), nullable=False)
    skill_name = Column(String(150), nullable=False)
    demand_volume = Column(Integer, default=120)
    curriculum_coverage_score = Column(Float, default=0.2) # 0.0 - 1.0 (Low coverage = high gap)
    placement_impact_deficit = Column(Float, default=0.28) # Correlation with placement loss
    confidence_level = Column(Float, default=0.88)
    identified_at = Column(DateTime, default=datetime.utcnow)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    target_type = Column(String(50), nullable=False) # COURSE, PROVIDER, DISTRICT, POLICY
    target_id = Column(String(36), nullable=False)
    title = Column(String(255), nullable=False)
    problem_statement = Column(Text, nullable=False)
    evidence_summary = Column(Text, nullable=False)
    possible_causes = Column(JSON, nullable=True)
    recommended_actions = Column(JSON, nullable=True)
    priority = Column(String(50), default="HIGH") # CRITICAL, HIGH, MEDIUM, LOW
    expected_impact = Column(String(255), nullable=False)
    confidence_percentage = Column(Float, default=85.0)
    measurement_plan = Column(Text, nullable=False)
    status = Column(String(50), default="OPEN") # OPEN, ACCEPTED, REJECTED, UNDER_INTERVENTION
    created_at = Column(DateTime, default=datetime.utcnow)

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    recommendation_id = Column(String(36), ForeignKey("recommendations.id"), nullable=True)
    code = Column(String(50), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    intervention_type = Column(String(100), nullable=False) 
    # CURRICULUM_UPGRADE, EMPLOYER_TIE_UP, SOFT_SKILLS_BOOTCAMP, MIGRATION_SUPPORT, WAGE_SUBSIDY
    target_course_id = Column(String(36), ForeignKey("courses.id"), nullable=True)
    target_provider_id = Column(String(36), ForeignKey("providers.id"), nullable=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)
    status = Column(String(50), default="ACTIVE") # PLANNED, ACTIVE, COMPLETED, EVALUATED
    
    # Closed-loop tracking
    baseline_placement_rate = Column(Float, nullable=False)
    baseline_6m_retention = Column(Float, nullable=False)
    post_placement_rate = Column(Float, nullable=True)
    post_6m_retention = Column(Float, nullable=True)
    impact_delta_percentage = Column(Float, nullable=True)
    evaluation_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ModelPredictionLog(Base):
    __tablename__ = "model_predictions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    trainee_id = Column(String(36), ForeignKey("trainees.id"), nullable=False)
    model_type = Column(String(50), nullable=False) # PLACEMENT_PROBABILITY, ATTRITION_RISK
    model_version = Column(String(50), default="v2.1")
    prediction_score = Column(Float, nullable=False)
    prediction_label = Column(String(50), nullable=False) # HIGH_PROBABILITY, HIGH_RISK, etc.
    top_positive_factors = Column(JSON, nullable=True)
    top_negative_factors = Column(JSON, nullable=True)
    confidence = Column(Float, default=0.85)
    created_at = Column(DateTime, default=datetime.utcnow)

    trainee = relationship("Trainee", back_populates="predictions")

class ModelMetricLog(Base):
    __tablename__ = "model_metrics"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    model_type = Column(String(50), nullable=False)
    model_version = Column(String(50), nullable=False)
    evaluation_date = Column(DateTime, default=datetime.utcnow)
    accuracy = Column(Float, default=0.84)
    precision = Column(Float, default=0.81)
    recall = Column(Float, default=0.86)
    f1_score = Column(Float, default=0.83)
    auc_roc = Column(Float, default=0.88)
    disparate_impact_ratio = Column(Float, default=0.94) # Fairness check (0.8 - 1.2 is fair)
    drift_detected = Column(Boolean, default=False)
    drift_score = Column(Float, default=0.04)

class EventStream(Base):
    __tablename__ = "event_stream"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    event_type = Column(String(100), index=True, nullable=False)
    # TRAINEE_REGISTERED, CONSENT_GRANTED, TRAINING_COMPLETED, CERTIFICATE_ISSUED, 
    # JOB_REPORTED, EMPLOYMENT_VERIFIED, FOLLOWUP_COMPLETED, WAGE_UPDATED, 
    # ATTRITION_RECORDED, INTERVENTION_CREATED, INTERVENTION_EVALUATED
    entity_id = Column(String(36), index=True, nullable=False)
    entity_type = Column(String(50), nullable=False) # TRAINEE, BATCH, EMPLOYMENT, INTERVENTION
    actor_id = Column(String(100), nullable=False, default="SYSTEM")
    payload = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), nullable=True)
    action = Column(String(100), nullable=False)
    resource = Column(String(100), nullable=False)
    details = Column(Text, nullable=True)
    ip_address = Column(String(50), default="127.0.0.1")
    created_at = Column(DateTime, default=datetime.utcnow)
