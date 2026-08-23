import os
import sys

# Ensure UTF-8 output encoding on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except:
        pass

# Ensure repository root is on PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.app.models.database import SessionLocal
from backend.app.models.schema import Trainee
from backend.app.services.ml_service import MLOutcomeService
from backend.app.services.nlu_followup import parse_followup_response, generate_followup_prompt

def test_nlu_service():
    print("\n--- TESTING NLU SERVICE (English & Hindi) ---")

    # English test
    eng_text = "I am working at Tata Power in Pune as Solar Technician earning salary 22,000 per month. Satisfaction: 5/5, feeling great."
    parsed_eng = parse_followup_response(eng_text)
    print("Parsed English:", parsed_eng)
    assert parsed_eng["employment_status"] == "employed"
    assert parsed_eng["wage_amount"] == 22000.0
    assert parsed_eng["employer_name"] is not None
    assert parsed_eng["satisfaction_score"] == 5
    assert parsed_eng["language_detected"] == "en"
    assert parsed_eng["nlu_confidence"] >= 0.80

    # Hindi Devanagari test
    hi_text = "हाँ, मैं सूरत में टेक्सटाइल कंपनी में काम कर रही हूँ। मेरा वेतन 18 हजार है और काम बहुत अच्छा है।"
    parsed_hi = parse_followup_response(hi_text)
    print("Parsed Hindi:", parsed_hi)
    assert parsed_hi["employment_status"] == "employed"
    assert parsed_hi["wage_amount"] == 18000.0
    assert parsed_hi["satisfaction_score"] >= 4
    assert parsed_hi["language_detected"] == "hi"

    # Exit reason test
    exit_text = "I left because salary was too low and distance was far."
    parsed_exit = parse_followup_response(exit_text)
    print("Parsed Exit:", parsed_exit)
    assert parsed_exit["exit_reason"] is not None

    # Wave prompt generator tests
    for wave in ["30d", "90d", "180d", "365d"]:
        p_en = generate_followup_prompt(wave, "en", "Priya Sharma")
        p_hi = generate_followup_prompt(wave, "hi", "प्रिया शर्मा")
        assert len(p_en) > 20
        assert len(p_hi) > 20
        print(f"[{wave.upper()}] EN: {p_en[:45]}... | HI: {p_hi[:45]}...")

    print(" -> NLU SERVICE: ALL ASSERTIONS PASSED!")


def test_ml_service():
    print("\n--- TESTING ML SERVICE (Model A, Model B, Fairness, Drift) ---")
    db = SessionLocal()
    trainee = db.query(Trainee).first()
    assert trainee is not None
    trainee_id = trainee.id

    service = MLOutcomeService(db)

    # 1. Model A - Placement Probability Classifier
    print("[1] Testing Model A (Placement Probability)...")
    res_a = service.predict_placement_probability(trainee_id)
    print("Model A Result:", res_a)
    assert "placement_probability" in res_a
    assert 0.0 <= res_a["placement_probability"] <= 1.0
    assert "top_features" in res_a
    assert len(res_a["top_features"]) == 8
    assert "confidence_band" in res_a
    assert len(res_a["confidence_band"]) == 2

    # 2. Model B - Attrition Risk Predictor
    print("[2] Testing Model B (Attrition Risk Predictor)...")
    res_b = service.predict_attrition_risk(trainee_id)
    print("Model B Result:", res_b)
    assert "attrition_risk_6m" in res_b
    assert 0.0 <= res_b["attrition_risk_6m"] <= 1.0
    assert "risk_factors" in res_b
    assert len(res_b["risk_factors"]) == 6
    assert "recommended_intervention" in res_b

    # 3. Algorithmic Fairness Audit
    print("[3] Testing Algorithmic Fairness Audit (Equal Opportunity & Disparate Impact)...")
    fairness = service.run_fairness_audit()
    print("Fairness Result Summary:", {k: fairness[k] for k in ["fairness_score", "total_checks", "passed_checks", "overall_status"]})
    assert "fairness_score" in fairness
    assert fairness["total_checks"] > 0
    for check in fairness["audit_checks"]:
        assert "metric" in check
        assert "value" in check
        assert "threshold" in check
        assert check["status"] in ["PASS", "FAIL"]

    # 4. Model Drift Monitor
    print("[4] Testing Model Drift Monitor (KS & Chi-square)...")
    drift = service.check_model_drift()
    print("Drift Result:", drift)
    assert "drift_detected" in drift
    assert "features_evaluated" in drift
    assert len(drift["features_evaluated"]) >= 3

    db.close()
    print(" -> ML SERVICE: ALL ASSERTIONS PASSED!")


if __name__ == "__main__":
    test_nlu_service()
    test_ml_service()
    print("\n==================================================")
    print("ALL ML & NLU SERVICE TESTS COMPLETED SUCCESSFULLY!")
    print("==================================================")
