from datetime import datetime, timedelta
import uuid
from typing import Dict, Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models.database import get_db
from ..models.schema import (
    Trainee, Batch, Course, Provider, Certification, EmploymentRecord,
    WageRecord, FollowUpSchedule, FollowUpResponse, VerificationRecord,
    SkillGapAnalysis, Recommendation, Intervention, EventStream
)

router = APIRouter(prefix="/api/demo", tags=["Interactive 9-Scenario Demo Runner"])

DEMO_SCENARIOS = [
    {
        "id": "scenario_1",
        "step": 1,
        "title": "Scenario 1: Trainee Completes Training & Receives Verified Skill ID",
        "description": "Trainee 'Priya Sharma' completes Solar PV Installer Course (NSQF Level 4) with 94% practical score and receives verified digital Skill ID.",
        "lifecycle_stage": "Certification Milestone",
        "category": "COLLECT DATA"
    },
    {
        "id": "scenario_2",
        "step": 2,
        "title": "Scenario 2: Trainee Reports Employment via Multilingual Conversational AI",
        "description": "At Day 30 follow-up, Priya responds via WhatsApp in Hindi: 'Haan, main Tata Power Renewables mein kaam kar rahi hoon, 18 hazaar salary hai.' NLU extracts structured employment.",
        "lifecycle_stage": "Conversational Follow-up",
        "category": "COLLECT DATA"
    },
    {
        "id": "scenario_3",
        "step": 3,
        "title": "Scenario 3: Multi-Signal Employer Verification",
        "description": "Tata Power HR portal receives verification request. 1-click statutory OTP confirmation upgrades verification confidence to 96% (Verified).",
        "lifecycle_stage": "Outcome Verification",
        "category": "VERIFY OUTCOMES"
    },
    {
        "id": "scenario_4",
        "step": 4,
        "title": "Scenario 4: Longitudinal Wage Progression (6-Month Milestone)",
        "description": "At Day 180 checkpoint, Priya confirms wage increment from ₹18,000 to ₹21,500 (+19.4% wage growth) after promotion to Senior PV Field Technician.",
        "lifecycle_stage": "Wage Growth",
        "category": "ANALYZE OUTCOMES"
    },
    {
        "id": "scenario_5",
        "step": 5,
        "title": "Scenario 5: Longitudinal Retention & Kaplan-Meier Curve Calculation",
        "description": "System aggregates multi-cohort data, plotting 30d (88%), 90d (79%), 180d (70%), and 365d (61.5%) retention curves with statistical confidence.",
        "lifecycle_stage": "Retention Analysis",
        "category": "IDENTIFY PATTERNS"
    },
    {
        "id": "scenario_6",
        "step": 6,
        "title": "Scenario 6: AI Dynamic Skill Gap Discovery",
        "description": "Outcome Engine triangulates 'Domestic Data Entry' QP vs 450 employer job postings, identifying a severe gap: 82% employers demand PowerBI & Business Communication not taught in QP.",
        "lifecycle_stage": "Skill Intelligence",
        "category": "IDENTIFY WEAKNESSES"
    },
    {
        "id": "scenario_7",
        "step": 7,
        "title": "Scenario 7: Government Dashboard Flags Weak-Performing Course",
        "description": "Dashboard flags 'Domestic Data Entry Operator': 92% Certification vs 44% Placement vs 32% 6-Month Retention (Skill Mismatch Anomaly).",
        "lifecycle_stage": "Policy Intelligence",
        "category": "GENERATE HYPOTHESES"
    },
    {
        "id": "scenario_8",
        "step": 8,
        "title": "Scenario 8: Evidence-Based Policy Recommendation & Intervention Launch",
        "description": "Engine generates recommendation 'Upgrade Curriculum with 40-hr PowerBI Bridge Bootcamp' (Confidence: 91%). Administrator deploys closed-loop intervention INTV-2025-001.",
        "lifecycle_stage": "Closed-Loop Intervention",
        "category": "RECOMMEND INTERVENTIONS"
    },
    {
        "id": "scenario_9",
        "step": 9,
        "title": "Scenario 9: Later Cohort Shows Measured Improvement (Loop Completed)",
        "description": "Post-intervention cohort (n=240) completes training with upgraded curriculum: Placement surges from 44% -> 68.5% (+24.5 pp) and 6M retention rises from 32% -> 54.2%. System confirms recommendation efficacy.",
        "lifecycle_stage": "Self-Improvement Closed Loop",
        "category": "LEARN & SELF-IMPROVE"
    }
]

@router.get("/scenarios")
def list_scenarios():
    return DEMO_SCENARIOS

@router.get("/scenario/{scenario_id}")
def get_scenario_details(scenario_id: str, db: Session = Depends(get_db)):
    sc = next((s for s in DEMO_SCENARIOS if s["id"] == scenario_id), None)
    if not sc:
        return {"error": "Scenario not found"}

    # Dynamic scenario data
    if scenario_id == "scenario_1":
        trainee = db.query(Trainee).filter(Trainee.current_status == "EMPLOYED").first()
        return {
            "metadata": sc,
            "demo_payload": {
                "trainee_name": "Priya Sharma",
                "skill_id": "SKILL-IND-2026-88491",
                "course": "Solar PV Installer (Suryamitra) - Level 4",
                "provider": "TechnoServe Skilling India (Pune Center)",
                "assessment_scores": {"theory": 88.5, "practical": 94.0, "total": 91.25},
                "certificate_hash": "SHA256-NCVET-2026-PV9941",
                "consent_status": "All 4 Granular Consents Active"
            }
        }
    elif scenario_id == "scenario_2":
        return {
            "metadata": sc,
            "demo_payload": {
                "raw_trainee_message": "हाँ, मैं टाटा पावर रिन्यूएबल्स में काम कर रही हूँ सूरत में। 18 हज़ार सैलरी है।",
                "channel": "WHATSAPP_AI (Hindi NLU)",
                "extracted_entities": {
                    "employment_status": "EMPLOYED",
                    "employer_name": "Tata Power Renewables",
                    "monthly_wage": 18000.0,
                    "location": "Surat, Gujarat",
                    "nlu_confidence": 0.96
                },
                "adaptive_followup_question": "बधाई हो! क्या टाटा पावर में आपका पद वही है, और क्या आपको कार्यस्थल पर पदोन्नति का अवसर मिला?"
            }
        }
    elif scenario_id == "scenario_3":
        return {
            "metadata": sc,
            "demo_payload": {
                "employer_name": "Tata Power Renewables Unit 4",
                "signal_type": "EMPLOYER_PORTAL_CONFIRM",
                "verified_by": "HR Manager (Aadhaar Verified)",
                "prior_score": 0.50,
                "new_composite_verification_score": 0.96,
                "verification_status": "VERIFIED_STATUTORY"
            }
        }
    elif scenario_id == "scenario_4":
        return {
            "metadata": sc,
            "demo_payload": {
                "checkpoint": "Day 180 (6-Month Follow-up)",
                "starting_wage": 18000.0,
                "current_wage": 21500.0,
                "wage_delta_absolute": "+₹3,500",
                "wage_growth_pct": "+19.4%",
                "new_designation": "Senior PV Field Operations Specialist"
            }
        }
    elif scenario_id == "scenario_5":
        return {
            "metadata": sc,
            "demo_payload": {
                "retention_milestones": [
                    {"checkpoint": "Day 0 (Joining)", "retention": "100%", "active_cohort_size": 5200},
                    {"checkpoint": "Day 30 (1 Month)", "retention": "88.4%", "active_cohort_size": 4596},
                    {"checkpoint": "Day 90 (3 Months)", "retention": "79.2%", "active_cohort_size": 4118},
                    {"checkpoint": "Day 180 (6 Months)", "retention": "69.8%", "active_cohort_size": 3629},
                    {"checkpoint": "Day 365 (1 Year)", "retention": "61.5%", "active_cohort_size": 3198}
                ],
                "kaplan_meier_confidence_interval": "[67.2% - 72.4% at 180 Days]"
            }
        }
    elif scenario_id == "scenario_6":
        return {
            "metadata": sc,
            "demo_payload": {
                "course_analyzed": "Domestic Data Entry Operator (SSC/Q2212)",
                "inferred_gaps": [
                    {
                        "skill": "Advanced Excel & PowerBI",
                        "market_demand_volume": 450,
                        "curriculum_coverage": "15% (Severe Deficit)",
                        "impact_on_placement": "-38% Placement Drag"
                    },
                    {
                        "skill": "Business English & Client Communication",
                        "market_demand_volume": 380,
                        "curriculum_coverage": "25% (Deficit)",
                        "impact_on_placement": "-29% Placement Drag"
                    }
                ]
            }
        }
    elif scenario_id == "scenario_7":
        return {
            "metadata": sc,
            "demo_payload": {
                "course": "Domestic Data Entry Operator",
                "certification_rate": "92.4%",
                "placement_rate": "44.0%",
                "retention_6m": "32.0%",
                "diagnosis": "SKILL_MISMATCH_SUSPECTED",
                "gap_between_cert_and_retention": "-60.4 percentage points"
            }
        }
    elif scenario_id == "scenario_8":
        return {
            "metadata": sc,
            "demo_payload": {
                "recommendation_code": "REC-2025-001",
                "title": "Upgrade Data Entry Curriculum to Business Operations & Cloud MIS",
                "confidence": "91.0%",
                "intervention_code": "INTV-2025-001",
                "deployed_action": "40-Hour Bridge Course in PowerBI & Communication across 4 Pilot Batches",
                "status": "ACTIVE_MEASUREMENT"
            }
        }
    elif scenario_id == "scenario_9":
        return {
            "metadata": sc,
            "demo_payload": {
                "intervention_code": "INTV-2025-001",
                "pre_intervention_placement": "44.0%",
                "post_intervention_placement": "68.5%",
                "placement_improvement": "+24.5 percentage points",
                "pre_6m_retention": "32.0%",
                "post_6m_retention": "54.2%",
                "retention_improvement": "+22.2 percentage points",
                "system_learning_verdict": "CONFIDENCE_INCREASED: Intervention is empirically validated. Recommended for nationwide curriculum standardization."
            }
        }

    return {"metadata": sc}
