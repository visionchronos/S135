import os
import sys

# Ensure root directory is on PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.models.database import SessionLocal, Base, engine
from backend.app.models.schema import Trainee, EmploymentRecord
from backend.app.services.data_generator import seed_database_if_empty

def run_all_tests():
    print("==================================================")
    print("RUNNING NEXUS OUTCOME INTELLIGENCE PLATFORM TESTS")
    print("==================================================")

    # Initialize DB & seed if not seeded
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    seed_database_if_empty(db, force_reset=False, count=10000)
    db.close()

    client = TestClient(app)

    # 1. Health
    print("[TEST 1/8] Checking Health Endpoint...")
    resp = client.get("/api/health")
    assert resp.status_code == 200, f"Health check failed: {resp.text}"
    print(" -> PASSED: Health OK")

    # 2. Macro Overview
    print("[TEST 2/8] Checking Macro Longitudinal Outcomes...")
    resp = client.get("/api/intelligence/macro-overview")
    assert resp.status_code == 200, f"Macro overview failed: {resp.text}"
    data = resp.json()
    assert data["total_enrolled"] >= 5000, f"Expected 5000+ enrolled, got {data['total_enrolled']}"
    assert data["data_quality_score"] > 80, f"Expected DQ > 80, got {data['data_quality_score']}"
    print(f" -> PASSED: Enrolled={data['total_enrolled']}, Placed={data['placement_rate']}%, 180d Retention={data['retention_180d_pct']}%, DQ Score={data['data_quality_score']}")

    # 3. District Map
    print("[TEST 3/8] Checking Geospatial District Map...")
    resp = client.get("/api/intelligence/district-map")
    assert resp.status_code == 200
    districts = resp.json()
    assert len(districts) >= 10
    print(f" -> PASSED: Loaded {len(districts)} district geospatial livelihood nodes.")

    # 4. Course Benchmarks & Inferred Gaps
    print("[TEST 4/8] Checking Course Benchmarks & Inferred Gaps...")
    resp = client.get("/api/intelligence/course-benchmarks")
    assert resp.status_code == 200
    courses = resp.json()
    dde = next((c for c in courses if "Data Entry" in c["course_name"]), None)
    assert dde is not None, "Domestic Data Entry course not found"
    assert dde["diagnosis"] == "SKILL_MISMATCH_SUSPECTED"
    print(f" -> PASSED: Identified {dde['course_name']} with diagnosis: {dde['diagnosis']}")

    # 5. Follow-up & Multilingual NLU
    print("[TEST 5/8] Checking Follow-up NLU Extraction...")
    db = SessionLocal()
    trainee = db.query(Trainee).first()
    t_id = trainee.id
    db.close()
    payload = {
        "trainee_id": t_id,
        "checkpoint": "DAY_90",
        "raw_message": "Yes, I am working at Tata Power as Solar Technician in Pune. Getting Rs 19,500 salary.",
        "language": "en",
        "channel": "WHATSAPP_AI"
    }
    resp = client.post("/api/followups/process-conversation", json=payload)
    assert resp.status_code == 200
    res = resp.json()
    assert res["extracted_status"] == "EMPLOYED"
    assert res["extracted_wage"] == 19500.0
    print(f" -> PASSED: NLU extracted Status={res['extracted_status']}, Wage=Rs {res['extracted_wage']}, Confidence={res['nlu_confidence']}")

    # 6. Multi-Signal Verification
    print("[TEST 6/8] Checking Multi-Signal Employer Verification...")
    db = SessionLocal()
    emp = db.query(EmploymentRecord).first()
    emp_id = emp.id
    db.close()
    v_payload = {
        "employment_id": emp_id,
        "signal_type": "EMPLOYER_PORTAL_CONFIRM",
        "is_positive": True,
        "details": {"hr_manager": "Anand R", "method": "DIGITAL_OTP"}
    }
    resp = client.post("/api/verification/verify-signal", json=v_payload)
    assert resp.status_code == 200
    v_data = resp.json()
    assert v_data["new_verification_status"] == "VERIFIED"
    print(f" -> PASSED: Status={v_data['new_verification_status']}, Score={v_data['verification_score']}")

    # 7. ML Explainability & Demographic Fairness
    print("[TEST 7/8] Checking Explainable ML & Fairness Audit...")
    resp = client.get(f"/api/ml-governance/predict-placement/{t_id}")
    assert resp.status_code == 200
    pred = resp.json()
    assert len(pred["positive_drivers"]) > 0

    f_resp = client.get("/api/ml-governance/fairness-audit")
    assert f_resp.status_code == 200
    f_data = f_resp.json()
    assert len(f_data["subgroups"]) >= 3
    print(f" -> PASSED: ML Placement Prediction={pred['prediction_score']}%, Fairness Status={f_data['fairness_status']}")

    # 8. Demo Scenarios (Scenarios 1-9)
    print("[TEST 8/8] Checking 9 Guided Demo Scenarios...")
    resp = client.get("/api/demo/scenarios")
    assert resp.status_code == 200
    assert len(resp.json()) == 9

    s9_resp = client.get("/api/demo/scenario/scenario_9")
    assert s9_resp.status_code == 200
    assert "+24.5 percentage points" in s9_resp.json()["demo_payload"]["placement_improvement"]
    print(" -> PASSED: All 9 Scenarios and Closed-Loop verified!")

    print("\n==================================================")
    print("ALL TESTS PASSED SUCCESSFULLY! (8/8)")
    print("==================================================")

if __name__ == "__main__":
    run_all_tests()
