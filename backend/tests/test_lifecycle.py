import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.models.database import SessionLocal
from backend.app.models.schema import Trainee, EmploymentRecord, WageRecord

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_macro_overview():
    response = client.get("/api/intelligence/macro-overview")
    assert response.status_code == 200
    data = response.json()
    assert "total_enrolled" in data
    assert data["total_enrolled"] >= 5000
    assert "placement_rate" in data
    assert "retention_180d_pct" in data
    assert "data_quality_score" in data
    assert data["data_quality_score"] > 80

def test_district_map():
    response = client.get("/api/intelligence/district-map")
    assert response.status_code == 200
    districts = response.json()
    assert len(districts) >= 10
    assert "latitude" in districts[0]
    assert "placement_rate" in districts[0]

def test_course_benchmarks():
    response = client.get("/api/intelligence/course-benchmarks")
    assert response.status_code == 200
    courses = response.json()
    assert len(courses) > 0
    # Domestic Data Entry should have skill mismatch suspected
    dde = next((c for c in courses if "Data Entry" in c["course_name"]), None)
    if dde:
        assert dde["diagnosis"] == "SKILL_MISMATCH_SUSPECTED"

def test_followup_and_nlu_extraction():
    db = SessionLocal()
    trainee = db.query(Trainee).first()
    db.close()
    assert trainee is not None

    payload = {
        "trainee_id": trainee.id,
        "checkpoint": "DAY_90",
        "raw_message": "Yes, I am working at Tata Power as Solar Technician in Pune. Getting Rs 19,500 salary.",
        "language": "en",
        "channel": "WHATSAPP_AI"
    }
    response = client.post("/api/followups/process-conversation", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert res["extracted_status"] == "EMPLOYED"
    assert res["extracted_wage"] == 19500.0
    assert res["nlu_confidence"] >= 0.85
    assert len(res["suggested_next_question"]) > 10

def test_multi_signal_verification():
    db = SessionLocal()
    emp = db.query(EmploymentRecord).filter(EmploymentRecord.verification_status == "PENDING_EMPLOYER").first()
    if not emp:
        emp = db.query(EmploymentRecord).first()
    emp_id = emp.id
    db.close()

    verify_payload = {
        "employment_id": emp_id,
        "signal_type": "EMPLOYER_PORTAL_CONFIRM",
        "is_positive": True,
        "details": {"hr_manager": "Anand R", "method": "DIGITAL_OTP"}
    }
    response = client.post("/api/verification/verify-signal", json=verify_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["new_verification_status"] == "VERIFIED"
    assert data["verification_score"] >= 0.80

def test_ml_placement_explainability():
    db = SessionLocal()
    trainee = db.query(Trainee).first()
    trainee_id = trainee.id
    db.close()

    response = client.get(f"/api/ml-governance/predict-placement/{trainee_id}")
    assert response.status_code == 200
    pred = response.json()
    assert "prediction_score" in pred
    assert "positive_drivers" in pred
    assert len(pred["positive_drivers"]) > 0

def test_ml_fairness_audit():
    response = client.get("/api/ml-governance/fairness-audit")
    assert response.status_code == 200
    audit = response.json()
    assert "subgroups" in audit
    assert len(audit["subgroups"]) >= 3
    # Check Disparate Impact ratio is within legitimate bounds
    for sg in audit["subgroups"]:
        assert sg["disparate_impact_ratio"] > 0.70

def test_demo_scenarios():
    response = client.get("/api/demo/scenarios")
    assert response.status_code == 200
    scenarios = response.json()
    assert len(scenarios) == 9

    # Test Scenario 9 (Closed-loop proof)
    s9_resp = client.get("/api/demo/scenario/scenario_9")
    assert s9_resp.status_code == 200
    s9 = s9_resp.json()
    assert "+24.5 percentage points" in s9["demo_payload"]["placement_improvement"]
