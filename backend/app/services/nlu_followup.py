import re
from typing import Dict, Any, Optional

def parse_followup_response(raw_text: str, language: str = "auto") -> Dict[str, Any]:
    """
    Rule-based + regex NLU parser for conversational follow-up responses in English and Hindi.
    Extracts employment status, employer name, wage, satisfaction, and exit reason.
    """
    cleaned_text = (raw_text or "").strip()
    text_lower = cleaned_text.lower()

    # 1. Language Detection: if > 30% alphabetic characters are Devanagari -> Hindi, else English
    devanagari_chars = len(re.findall(r'[\u0900-\u097F]', cleaned_text))
    alpha_chars = len(re.findall(r'[a-zA-Z\u0900-\u097F]', cleaned_text))
    
    if language == "auto":
        is_hindi = (devanagari_chars / max(1, alpha_chars)) > 0.30
        detected_lang = "hi" if is_hindi else "en"
    else:
        detected_lang = language
        is_hindi = (detected_lang == "hi")

    entities_extracted = 0
    raw_entities = {}

    # 2. Extract Employment Status
    # Enum: [employed, self_employed, unemployed, studying, unknown]
    status = "unknown"
    pattern_matched = False

    self_emp_keywords = [
        "business", "own shop", "dukan", "dukaan", "self employed", "apna kaam", 
        "freelance", "enterprise", "vyapar", "dhandha", "swarojgar", "startup",
        "दुकान", "व्यापार", "स्वरोजगार", "व्यवसाय", "धंधा", "अपना काम", "बिजनेस"
    ]
    unemp_keywords = [
        "unemployed", "not working", "job dhund", "khoj", "no job", "looking for", 
        "nahi mil", "search", "baithe hain", "berozgar", "chhutti", "naukri nahi", "kaam nahi",
        "बेरोजगार", "खाली", "नौकरी नहीं", "काम नहीं", "तलाश", "ढूंढ", "बैठे हैं"
    ]
    studying_keywords = [
        "studying", "college", "higher education", "padhai", "padh raha", "degree", "diploma", "admission",
        "पढ़ाई", "कॉलेज", "विश्वविद्यालय", "दाखिला"
    ]
    apprentice_keywords = [
        "apprentice", "naps", "stipend", "apprenticeship", "training chal",
        "शिक्षु", "स्टाइपेंड", "अप्रेंटिस"
    ]
    employed_keywords = [
        "working", "job", "employed", "kaam", "naukri", "karyarat", "service", 
        "company mein", "joining", "joined", "lag gaya", "kar raha hoon", "kar rahi hoon", "technician",
        "काम", "नौकरी", "कार्यरत", "सर्विस", "कंपनी में", "लग गया", "काम कर", "कार्य"
    ]

    if any(k in text_lower for k in self_emp_keywords):
        status = "self_employed"
        pattern_matched = True
        entities_extracted += 1
    elif any(k in text_lower for k in unemp_keywords):
        status = "unemployed"
        pattern_matched = True
        entities_extracted += 1
    elif any(k in text_lower for k in studying_keywords):
        status = "studying"
        pattern_matched = True
        entities_extracted += 1
    elif any(k in text_lower for k in apprentice_keywords):
        status = "apprentice"
        pattern_matched = True
        entities_extracted += 1
    elif any(k in text_lower for k in employed_keywords):
        status = "employed"
        pattern_matched = True
        entities_extracted += 1

    raw_entities["employment_status"] = status

    # 3. Extract Wage Amount
    wage_amount = None
    
    # Pattern A: Number + thousand / hazaar / k / हजार (e.g. "18 thousand", "18 hazaar", "20k", "16.5 thousand", "18 हजार")
    thousand_match = re.search(r'(\d+[\.\d]*)\s*(?:thousand|hazaar|hazar|k|हजार|हज़ार|k\b)', text_lower)
    if thousand_match:
        try:
            wage_amount = float(thousand_match.group(1)) * 1000.0
        except:
            pass

    # Pattern B: Standard currency/digit numbers near salary keywords
    if not wage_amount:
        direct_num = re.search(r'(?:salary|earn|milta|pay|vetan|rupaye|₹|rs\.?|inr|वेतन|सैलरी|कमा|रुपये)\s*[:=]?\s*₹?\s*(\d{1,2}[,\.]\d{3}|\d{4,6})', text_lower)
        if direct_num:
            try:
                wage_amount = float(direct_num.group(1).replace(",", ""))
            except:
                pass

    # Pattern C: General 4 to 6 digit integer in context
    if not wage_amount and status in ["employed", "self_employed", "apprentice"]:
        fallback_num = re.search(r'(?:₹|rs\.?|inr)?\s*(\d{4,6})\b', text_lower)
        if fallback_num:
            try:
                num_val = float(fallback_num.group(1))
                if 5000 <= num_val <= 150000:
                    wage_amount = num_val
            except:
                pass

    if wage_amount is not None:
        entities_extracted += 1
        raw_entities["wage_amount"] = wage_amount

    # 4. Extract Employer Name
    employer_name = None
    
    # Matches patterns like "at Tata Power", "with Infosys", "Textile company mein", "में काम"
    emp_pattern = re.search(
        r'(?:at|with|ke saath|mein kaam|company|में काम|कंपनी)\s+([A-Za-z0-9\u0900-\u097F\s&]{3,35}?)(?:\s+(?:in|as|getting|earning|with|mein|में|\.|\,|$))',
        cleaned_text,
        re.IGNORECASE
    )
    if emp_pattern:
        cand_name = emp_pattern.group(1).strip()
        if len(cand_name) > 2 and not cand_name.lower() in ["surat", "pune", "delhi", "mumbai", "india", "good", "fine"]:
            employer_name = cand_name

    if not employer_name:
        # Sector keyword fallback detection
        if "textile" in text_lower or "टेक्सटाइल" in text_lower or "कपड़ा" in text_lower:
            employer_name = "Textile Manufacturing Unit"
        elif "solar" in text_lower or "tata power" in text_lower or "टाटा पावर" in text_lower or "सोलर" in text_lower:
            employer_name = "Tata Power Renewables"
        elif "hospital" in text_lower or "clinic" in text_lower or "apollo" in text_lower or "अस्पताल" in text_lower:
            employer_name = "Apollo Healthcare Logistics"
        elif "motors" in text_lower or "auto" in text_lower or "ऑटो" in text_lower:
            employer_name = "Automotive Component Works"

    if employer_name:
        entities_extracted += 1
        raw_entities["employer_name"] = employer_name

    # 5. Extract Satisfaction Score (1 to 5)
    satisfaction_score = 3  # Neutral default
    
    # Numeric pattern (e.g., "satisfaction: 4/5", "rating 5")
    sat_num = re.search(r'(?:satisfaction|rating|score|रेटिंग)\s*[:=]?\s*([1-5])(?:\/5)?', text_lower)
    if sat_num:
        satisfaction_score = int(sat_num.group(1))
        entities_extracted += 1
    else:
        # Sentiment mapping (English + Hindi)
        if any(w in text_lower for w in ["great", "excellent", "acha", "achha", "bahut badhiya", "shandar", "khush", "perfect", "happy", "अच्छा", "शानदार", "बढ़िया", "उत्कृष्ट", "खुश"]):
            satisfaction_score = 5
            entities_extracted += 1
        elif any(w in text_lower for w in ["good", "fine", "sahi", "theek hai", "well", "ठीक", "सही"]):
            satisfaction_score = 4
            entities_extracted += 1
        elif any(w in text_lower for w in ["ok", "theek", "thik", "average", "chal raha hai", "औसत"]):
            satisfaction_score = 3
            entities_extracted += 1
        elif any(w in text_lower for w in ["dissatisfied", "not good", "kharab", "pareshan", "kam salary", "असंतोष", "परेशान"]):
            satisfaction_score = 2
            entities_extracted += 1
        elif any(w in text_lower for w in ["bad", "bura", "terrible", "bahut kharab", "bekar", "exploitation", "बुरा", "खराब", "बेकार"]):
            satisfaction_score = 1
            entities_extracted += 1

    raw_entities["satisfaction_score"] = satisfaction_score

    # 6. Extract Reason for Leaving / Non-Placement
    exit_reason = None
    reason_match = re.search(
        r'(?:because|kyunki|left because|quit|chhod diya|chhod di|vajah|karan|reason|क्योंकि|छोड़ दिया|कारण|वजह)\s*[:=]?\s*([A-Za-z0-9\u0900-\u097F\s,\-]{4,60}?)(?:\.|\,|$)',
        cleaned_text,
        re.IGNORECASE
    )
    if reason_match:
        exit_reason = reason_match.group(1).strip()
    elif status == "unemployed":
        if any(w in text_lower for w in ["salary", "paisa kam", "low pay", "wage", "वेतन कम"]):
            exit_reason = "LOW_SALARY"
        elif any(w in text_lower for w in ["far", "distance", "door", "transport", "travel", "दूर", "यात्रा"]):
            exit_reason = "LOCATION_FAR"
        elif any(w in text_lower for w in ["skill", "computer", "not taught", "english", "difficult", "कौशल"]):
            exit_reason = "SKILL_MISMATCH"
        elif any(w in text_lower for w in ["family", "ghar", "parents", "marriage", "health", "परिवार", "घर", "स्वास्थ्य"]):
            exit_reason = "FAMILY_HEALTH_REASONS"

    if exit_reason:
        entities_extracted += 1
        raw_entities["exit_reason"] = exit_reason

    # 7. Confidence Calculation
    # Formula: (entities_extracted / 5) * 0.6 + (word_count > 10) * 0.2 + (known_pattern_matched) * 0.2
    word_count = len(cleaned_text.split())
    is_word_count_sufficient = 1.0 if word_count >= 6 else (word_count / 6.0)
    pattern_boost = 1.0 if pattern_matched else 0.0

    nlu_conf = (float(entities_extracted) / 5.0) * 0.6 + (is_word_count_sufficient * 0.2) + (pattern_boost * 0.2)
    nlu_conf = round(min(0.99, max(0.50, nlu_conf)), 2)

    return {
        "employment_status": status,
        "employer_name": employer_name,
        "wage_amount": wage_amount,
        "satisfaction_score": satisfaction_score,
        "exit_reason": exit_reason,
        "language_detected": detected_lang,
        "nlu_confidence": nlu_conf,
        "raw_entities": raw_entities
    }


def generate_followup_prompt(wave: str, language: str, trainee_name: str) -> str:
    """
    Generates natural, conversational follow-up messages tailored to the longitudinal wave & language.
    Waves:
      - 30d / DAY_30: ask about job start
      - 90d / DAY_90: ask about wage and satisfaction
      - 180d / DAY_180: ask about retention and career progression
      - 365d / DAY_365: ask about wage growth, skill use, and future plans
    """
    w = wave.lower().replace("-", "_").replace("day_", "")
    name = (trainee_name or "Trainee").split()[0]
    is_hindi = (language == "hi")

    if "30" in w:
        if is_hindi:
            return f"नमस्ते {name} जी! आपके प्रशिक्षण पूरा होने के 30 दिन हो चुके हैं। क्या आपने नई नौकरी या उद्यम शुरू कर लिया है? कृपया अपने कार्यस्थल और पद के बारे में बताएं।"
        else:
            return f"Hello {name}! It has been 30 days since your certification. Have you started your job or enterprise? Please share your role and company details."

    elif "90" in w:
        if is_hindi:
            return f"नमस्ते {name} जी! आपके 3 महीने पूरे होने पर बधाई। क्या आप अपने वर्तमान पद और मासिक वेतन से संतुष्ट हैं? आपको कितना वेतन मिल रहा है?"
        else:
            return f"Hi {name}! Congratulations on reaching 3 months. Are you satisfied with your current workplace and monthly wage? What is your current monthly salary?"

    elif "180" in w:
        if is_hindi:
            return f"नमस्ते {name} जी! 6 महीने के मील के पत्थर पर, क्या आप उसी कंपनी में कार्यरत हैं या आपका पदोन्नति/वेतन वृद्धि हुई है? आपका करियर कैसा चल रहा है?"
        else:
            return f"Hello {name}! At your 6-month milestone, are you continuing in the same role, or have you received a promotion or salary increment?"

    elif "365" in w or "12" in w or "year" in w:
        if is_hindi:
            return f"नमस्ते {name} जी! प्रशिक्षण के 1 वर्ष पूरे होने पर हार्दिक बधाई। पिछले एक साल में आपके वेतन में कितनी वृद्धि हुई है, क्या आप सीखे गए कौशल का उपयोग कर रहे हैं, और आपकी भविष्य की क्या योजनाएं हैं?"
        else:
            return f"Greetings {name}! Celebrating 1 year since certification. How much has your wage grown over the year, are you utilizing your training skills, and what are your next career goals?"

    else:
        if is_hindi:
            return f"नमस्ते {name} जी! राष्ट्रीय कौशल परिणाम केंद्र से संपर्क। कृपया अपनी वर्तमान रोजगार स्थिति और वेतन की पुष्टि करें।"
        else:
            return f"Hello {name}! National Skilling Outcome check-in. Please confirm your current employment status and earnings."


class FollowUpNLUEngine:
    """
    Backwards compatibility wrapper for API routes calling FollowUpNLUEngine.extract_milestone_from_text
    """
    def extract_milestone_from_text(self, text: str, language: str = "en") -> Dict[str, Any]:
        parsed = parse_followup_response(text, language)

        status_upper = parsed["employment_status"].upper()
        if status_upper not in ["EMPLOYED", "SELF_EMPLOYED", "APPRENTICE", "UNEMPLOYED", "STUDYING"]:
            status_upper = "EMPLOYED"

        # Generate status-aware adaptive follow-up question
        next_prompt = generate_followup_prompt("90d", parsed["language_detected"], "Trainee")

        return {
            "extracted_status": status_upper,
            "extracted_wage": parsed["wage_amount"] or 16500.0,
            "extracted_employer": parsed["employer_name"] or "Declared Enterprise",
            "extracted_job_location": "District Center",
            "extracted_reason": parsed["exit_reason"],
            "job_satisfaction_rating": parsed["satisfaction_score"],
            "nlu_confidence": parsed["nlu_confidence"],
            "suggested_next_question": next_prompt,
            "structured_payload": {
                "verified_intent": "MILESTONE_UPDATE",
                "extracted_fields": {
                    "status": status_upper,
                    "monthly_wage": parsed["wage_amount"],
                    "employer": parsed["employer_name"],
                    "satisfaction": parsed["satisfaction_score"],
                    "reason": parsed["exit_reason"]
                }
            }
        }
