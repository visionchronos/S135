import random
import uuid
from datetime import datetime, timedelta
import numpy as np
from sqlalchemy.orm import Session
from ..models.schema import (
    User, Scheme, Programme, Provider, TrainingCentre, Course, Batch,
    Skill, CourseSkill, Trainee, Identity, ConsentPolicy, TraineeConsent,
    Attendance, Assessment, Certification, TraineeSkill, Employer,
    JobPosting, JobRequirementSkill, EmploymentRecord, ApprenticeshipRecord,
    SelfEmploymentRecord, WageRecord, FollowUpSchedule, FollowUpResponse,
    VerificationRecord, SkillGapAnalysis, Recommendation, Intervention,
    ModelPredictionLog, ModelMetricLog, EventStream, AuditLog
)

# Seed for deterministic generation with rich realism
random.seed(42)
np.random.seed(42)

DISTRICTS_DATA = [
    # NITI Aayog Aspirational Districts (Maharashtra)
    {"district": "Nandurbar", "state": "Maharashtra", "lat": 21.3739, "lng": 74.2403, "base_wage": 14500, "urban_ratio": 0.35, "is_aspirational": True, "niti_theme": "Tribal Renewable & Agri-Skilling"},
    {"district": "Gadchiroli", "state": "Maharashtra", "lat": 20.1849, "lng": 80.0030, "base_wage": 14000, "urban_ratio": 0.30, "is_aspirational": True, "niti_theme": "Forestry & Mining Equipment Operations"},
    {"district": "Washim", "state": "Maharashtra", "lat": 20.1110, "lng": 77.1352, "base_wage": 14800, "urban_ratio": 0.38, "is_aspirational": True, "niti_theme": "Agri-Logistics & Food Processing"},
    {"district": "Dharashiv", "state": "Maharashtra", "lat": 18.1750, "lng": 76.0400, "base_wage": 15200, "urban_ratio": 0.40, "is_aspirational": True, "niti_theme": "Solar Energy & Light Engineering"},
    
    # Maharashtra State Skill Development Mission (MSSDS) Economic Clusters
    {"district": "Pune", "state": "Maharashtra", "lat": 18.5204, "lng": 73.8567, "base_wage": 19500, "urban_ratio": 0.88, "is_aspirational": False, "niti_theme": "Automotive Mechatronics & IT-ITeS"},
    {"district": "Mumbai Suburban", "state": "Maharashtra", "lat": 19.0760, "lng": 72.8777, "base_wage": 22000, "urban_ratio": 0.98, "is_aspirational": False, "niti_theme": "FinTech, Healthcare & BFSI"},
    {"district": "Thane", "state": "Maharashtra", "lat": 19.2183, "lng": 72.9781, "base_wage": 19000, "urban_ratio": 0.85, "is_aspirational": False, "niti_theme": "Multi-modal Supply Chain & Warehousing"},
    {"district": "Nagpur", "state": "Maharashtra", "lat": 21.1458, "lng": 79.0882, "base_wage": 16500, "urban_ratio": 0.70, "is_aspirational": False, "niti_theme": "MIHAN Aviation Logistics & Solar"},
    {"district": "Nashik", "state": "Maharashtra", "lat": 19.9975, "lng": 73.7898, "base_wage": 16800, "urban_ratio": 0.65, "is_aspirational": False, "niti_theme": "Electrical Machinery & Precision CNC"},
    {"district": "Chhatrapati Sambhajinagar", "state": "Maharashtra", "lat": 19.8762, "lng": 75.3433, "base_wage": 16200, "urban_ratio": 0.62, "is_aspirational": False, "niti_theme": "Auto Ancillary & Pharma Technology"},
    {"district": "Solapur", "state": "Maharashtra", "lat": 17.6599, "lng": 75.9064, "base_wage": 15500, "urban_ratio": 0.58, "is_aspirational": False, "niti_theme": "Powerloom, Textiles & Garment Mfg"},
    {"district": "Kolhapur", "state": "Maharashtra", "lat": 16.7050, "lng": 74.2433, "base_wage": 16500, "urban_ratio": 0.60, "is_aspirational": False, "niti_theme": "Foundry Engineering & Agro Machinery"},
    {"district": "Amravati", "state": "Maharashtra", "lat": 20.9320, "lng": 77.7523, "base_wage": 15000, "urban_ratio": 0.55, "is_aspirational": False, "niti_theme": "Integrated Textile Park & Solar Tech"}
]

SECTORS_DATA = [
    "IT-ITeS", "Electronics & Hardware", "Healthcare", "Automotive", 
    "Retail & Logistics", "Green Energy / Solar", "Apparel & Textiles", "Beauty & Wellness"
]

SKILLS_POOL = [
    # IT-ITeS
    {"name": "Python Programming", "category": "Technical", "sector": "IT-ITeS", "demand": "HIGH"},
    {"name": "Web Development (HTML/CSS/JS)", "category": "Technical", "sector": "IT-ITeS", "demand": "HIGH"},
    {"name": "React & Modern Frameworks", "category": "Technical", "sector": "IT-ITeS", "demand": "HIGH"},
    {"name": "Data Entry & Office Tools", "category": "Technical", "sector": "IT-ITeS", "demand": "LOW"},
    {"name": "Advanced Excel & MIS", "category": "Technical", "sector": "IT-ITeS", "demand": "HIGH"},
    {"name": "Business Communication", "category": "Soft Skill", "sector": "IT-ITeS", "demand": "HIGH"},
    
    # Electronics & Solar
    {"name": "Solar PV Installation", "category": "Technical", "sector": "Green Energy / Solar", "demand": "HIGH"},
    {"name": "Solar Micro-Grid Maintenance", "category": "Technical", "sector": "Green Energy / Solar", "demand": "HIGH"},
    {"name": "PCB Soldering & Rework", "category": "Technical", "sector": "Electronics & Hardware", "demand": "MEDIUM"},
    {"name": "Smart Meter Assembly", "category": "Technical", "sector": "Electronics & Hardware", "demand": "HIGH"},
    {"name": "EV Battery Maintenance", "category": "Technical", "sector": "Automotive", "demand": "HIGH"},
    
    # Healthcare
    {"name": "General Duty Assistance", "category": "Domain", "sector": "Healthcare", "demand": "HIGH"},
    {"name": "Emergency Medical Response", "category": "Technical", "sector": "Healthcare", "demand": "HIGH"},
    {"name": "Phlebotomy & Sample Collection", "category": "Technical", "sector": "Healthcare", "demand": "MEDIUM"},
    {"name": "Patient Care & Empathy", "category": "Soft Skill", "sector": "Healthcare", "demand": "HIGH"},
    
    # Automotive & Engineering
    {"name": "CNC Machine Operation", "category": "Technical", "sector": "Automotive", "demand": "HIGH"},
    {"name": "Automotive Mechatronics", "category": "Technical", "sector": "Automotive", "demand": "HIGH"},
    {"name": "EV Powertrain & Diagnostics", "category": "Technical", "sector": "Automotive", "demand": "HIGH"},
    {"name": "Two-Wheeler Service & Repair", "category": "Technical", "sector": "Automotive", "demand": "MEDIUM"},
    
    # Retail & Logistics
    {"name": "Warehouse Management & Inventory", "category": "Domain", "sector": "Retail & Logistics", "demand": "HIGH"},
    {"name": "Cold-Chain Logistics & Dispatch", "category": "Technical", "sector": "Retail & Logistics", "demand": "HIGH"},
    {"name": "Retail Sales & POS Systems", "category": "Domain", "sector": "Retail & Logistics", "demand": "MEDIUM"},
    {"name": "Customer Relationship Mgmt", "category": "Soft Skill", "sector": "Retail & Logistics", "demand": "HIGH"},
    
    # Apparel
    {"name": "Industrial Sewing Machine Operator", "category": "Technical", "sector": "Apparel & Textiles", "demand": "MEDIUM"},
    {"name": "Quality Inspection & Finishing", "category": "Technical", "sector": "Apparel & Textiles", "demand": "MEDIUM"}
]

COURSE_TEMPLATES = [
    {"name": "Junior Software Developer", "sector": "IT-ITeS", "qp": "SSC/Q0508", "level": 4, "hours": 450, "wage": 24000, "placement_pot": 0.84, "retention_pot": 0.82},
    {"name": "Domestic Data Entry Operator", "sector": "IT-ITeS", "qp": "SSC/Q2212", "level": 4, "hours": 350, "wage": 13500, "placement_pot": 0.46, "retention_pot": 0.35},
    {"name": "Solar PV Installer (Suryamitra)", "sector": "Green Energy / Solar", "qp": "SGJ/Q0101", "level": 4, "hours": 400, "wage": 19500, "placement_pot": 0.89, "retention_pot": 0.84},
    {"name": "General Duty Assistant (GDA)", "sector": "Healthcare", "qp": "HSS/Q5101", "level": 4, "hours": 480, "wage": 17500, "placement_pot": 0.87, "retention_pot": 0.78},
    {"name": "CNC Operator - Turning & Milling", "sector": "Automotive", "qp": "ASC/Q3501", "level": 4, "hours": 450, "wage": 21000, "placement_pot": 0.86, "retention_pot": 0.85},
    {"name": "EV Powertrain & Battery Technician", "sector": "Automotive", "qp": "ASC/Q1424", "level": 5, "hours": 500, "wage": 26000, "placement_pot": 0.92, "retention_pot": 0.90},
    {"name": "Warehouse & Cold-Chain Associate", "sector": "Retail & Logistics", "qp": "LSC/Q0101", "level": 3, "hours": 320, "wage": 16500, "placement_pot": 0.80, "retention_pot": 0.68},
    {"name": "Industrial Garment Sewing Operator", "sector": "Apparel & Textiles", "qp": "AMH/Q0301", "level": 4, "hours": 300, "wage": 14500, "placement_pot": 0.70, "retention_pot": 0.55}
]

def seed_database_if_empty(db: Session, force_reset: bool = False, count: int = 10000):
    existing_trainees = db.query(Trainee).count()
    if existing_trainees >= 1 and not force_reset:
        print(f"[DataGen] Database already contains {existing_trainees} trainees. Skipping generation.")
        return

    print(f"[DataGen] Seeding database with {count} trainees for Maharashtra NITI Aayog & MSSDS ecosystem...")

    # 1. Create Default Users
    admin_user = User(
        id=str(uuid.uuid4()),
        email="admin@outcome.gov.in",
        hashed_password="pbkdf2:sha256:600000$demo$hash",
        full_name="Maharashtra State Skill Outcome Director",
        role="policy_maker"
    )
    db.add(admin_user)

    # 2. Consent Policies
    policies = [
        ConsentPolicy(purpose_code="EMPLOYMENT_TRACKING", title="Longitudinal Employment Tracking", description="Allows MSSDS and verification partners to track employment transitions and wage progression post-certification under DPDP Act.", data_retention_years=5, is_mandatory=True),
        ConsentPolicy(purpose_code="EMPLOYER_VERIFY", title="Direct Employer Verification", description="Authorizes authorized team to contact declared employers to verify tenure and designation.", data_retention_years=5, is_mandatory=False),
        ConsentPolicy(purpose_code="POLICY_ANALYTICS", title="Anonymized Policy & Macro Analytics", description="Aggregates outcome data to compute NITI Aayog district skill demand and programme ROI.", data_retention_years=10, is_mandatory=True),
        ConsentPolicy(purpose_code="JOB_MATCHING", title="Proactive Job Opportunity Matching", description="Permits verified job aggregators to share relevant higher-wage vacancies if trainee is unemployed.", data_retention_years=3, is_mandatory=False)
    ]
    for p in policies:
        db.add(p)

    # 3. Scheme & Programmes (Maharashtra MSSDS & NITI Aayog Aspirational District Skilling)
    pmkvy = Scheme(
        code="MSSDS-PMKUVA-2025",
        name="Pramod Mahajan Kaushalya Uddhyamita Vikas Abhiyan & PMKVY 4.0",
        ministry="Skill Development, Employment & Entrepreneurship Department (Govt of Maharashtra)",
        budget_crores=5800.0,
        target_beneficiaries=450000
    )
    db.add(pmkvy)
    db.flush()

    prog_stt = Programme(scheme_id=pmkvy.id, code="MSSDS-STT", name="Maharashtra Short Term Training (STT)", target_sector="Multi-Sector & Aspirational Districts")
    prog_appr = Programme(scheme_id=pmkvy.id, code="NAPS-MAHA", name="National Apprenticeship Promotion Scheme (Maharashtra Cluster)", target_sector="Automotive, Solar & Logistics")
    db.add_all([prog_stt, prog_appr])
    db.flush()

    # 4. Providers & Training Centres (Accredited Maharashtra Training Partners)
    providers = []
    centres = []
    provider_names = [
        "Maharashtra State Skill Development Society (MSSDS)", "Tata STRIVE Skill Development Pune",
        "L&T Construction Skills Institute (CSTI Panvel)", "Symbiosis Skills & Professional University (SSPU)",
        "Centum Learning Center Nagpur", "Don Bosco Tech Society (Chhatrapati Sambhajinagar)",
        "Pratham Vocational Institute (Washim & Nandurbar)", "Apollo MedSkills Institute Mumbai",
        "TechnoServe Maharashtra Skilling", "Government ITI Aundh (Pune)",
        "Government ITI Nagpur (MIHAN Cluster)", "Government ITI Nashik (Auto Hub)",
        "Government ITI Nandurbar (Tribal Skill Centre)", "Government ITI Gadchiroli (Aspirational)",
        "Orion Edutech Solapur Center", "TeamLease Skills Hub Thane",
        "Schneider Electric Center Amravati", "Gramin Vikas Kaushal Kendra Dharashiv",
        "Apex Tech Institute Kolhapur", "Vision India Vocational Thane"
    ]

    for i, name in enumerate(provider_names):
        dist_info = DISTRICTS_DATA[i % len(DISTRICTS_DATA)]
        data_quality = 74.0 if i == 14 else round(random.uniform(88.0, 98.0), 1)
        prov = Provider(
            code=f"TP-MH-{1000+i}-{uuid.uuid4().hex[:4]}",
            name=name,
            category="State Skill Mission Partner" if i % 2 == 0 else "NSDC Partner",
            state=dist_info["state"],
            headquarters=dist_info["district"],
            contact_email=f"contact@{name.lower().replace(' ', '').replace('&', '').replace('(', '').replace(')', '')[:20]}.org.in",
            contact_phone=f"+91 98{random.randint(10000000, 99999999)}",
            rating=round(random.uniform(3.9, 4.9), 1),
            data_quality_score=data_quality
        )
        providers.append(prov)
        db.add(prov)
    db.flush()

    for i, prov in enumerate(providers):
        for c_idx in range(2):
            dist_info = DISTRICTS_DATA[(i * 2 + c_idx) % len(DISTRICTS_DATA)]
            centre = TrainingCentre(
                provider_id=prov.id,
                code=f"TC-MH-{prov.code[-6:]}-{c_idx+1}",
                name=f"{prov.name} - {dist_info['district']} Center",
                state=dist_info["state"],
                district=dist_info["district"],
                pincode=f"41{random.randint(1000, 9999)}",
                latitude=dist_info["lat"] + random.uniform(-0.03, 0.03),
                longitude=dist_info["lng"] + random.uniform(-0.03, 0.03)
            )
            centres.append(centre)
            db.add(centre)
    db.flush()

    # 5. Skills and Courses (50 Courses created by variations)
    skills_map = {}
    for s_data in SKILLS_POOL:
        skill_obj = Skill(name=s_data["name"], category=s_data["category"], demand_level=s_data["demand"])
        db.add(skill_obj)
        skills_map[s_data["name"]] = skill_obj
    db.flush()

    courses = []
    for t_idx, tmpl in enumerate(COURSE_TEMPLATES):
        for v in range(6 if t_idx < 5 else 4): # creates ~48-50 courses
            suffix = f" Level {tmpl['level']}" if v == 0 else f" (Specialization {v})"
            course = Course(
                programme_id=prog_stt.id if v % 2 == 0 else prog_appr.id,
                qp_code=f"{tmpl['qp']}-v{v+1}-{uuid.uuid4().hex[:4]}",
                name=f"{tmpl['name']}{suffix}",
                sector=tmpl["sector"],
                nsqf_level=tmpl["level"],
                duration_hours=tmpl["hours"] + (v * 20),
                expected_entry_wage=tmpl["wage"] + (v * 500),
                curriculum_summary=f"Comprehensive curriculum covering core industry standards for {tmpl['name']}."
            )
            courses.append((course, tmpl))
            db.add(course)
    db.flush()

    # Link skills to courses
    for course_obj, tmpl in courses:
        # Match relevant skills from pool
        for s_data in SKILLS_POOL:
            if s_data["sector"] == tmpl["sector"]:
                db.add(CourseSkill(course_id=course_obj.id, skill_id=skills_map[s_data["name"]].id, depth_level="INTERMEDIATE"))
            elif s_data["category"] == "Soft Skill":
                db.add(CourseSkill(course_id=course_obj.id, skill_id=skills_map[s_data["name"]].id, depth_level="BASIC"))
    db.flush()

    # 6. Employers & Job Postings (100 Employers across districts)
    employers = []
    emp_names_prefixes = [
        ("Tata Motors Ltd", "Automotive"), ("Bharat Forge Precision Works", "Automotive"),
        ("Mahindra & Mahindra Auto", "Automotive"), ("Tata Power Renewables", "Green Energy / Solar"),
        ("SolarEdge Tech Maharashtra", "Green Energy / Solar"), ("Cipla LifeSciences", "Healthcare"),
        ("Lupin Pharma Technologies", "Healthcare"), ("Apollo SuperSpeciality", "Healthcare"),
        ("Sahyadri Healthcare Logistics", "Healthcare"), ("Tata Consultancy Services", "IT-ITeS"),
        ("Tech Mahindra Innovation", "IT-ITeS"), ("Infosys BPM Pune", "IT-ITeS"),
        ("DMart Supply Chain Hub", "Retail & Logistics"), ("Reliance Multi-modal Logistics", "Retail & Logistics"),
        ("Mahindra Logistics Node", "Retail & Logistics"), ("Raymond Textile Mills", "Apparel & Textiles"),
        ("Shahi Exports Garment Division", "Apparel & Textiles"), ("Bombay Rayon Fashions", "Apparel & Textiles"),
        ("L&T Electrical & Automation", "Electronics & Hardware"), ("Schneider Electric Manufacturing", "Electronics & Hardware")
    ]

    for e_i in range(100):
        prefix, sector = emp_names_prefixes[e_i % len(emp_names_prefixes)]
        dist_info = DISTRICTS_DATA[e_i % len(DISTRICTS_DATA)]
        emp = Employer(
            cin_or_reg=f"U{random.randint(10000, 99999)}MH201{e_i % 10}PTC{random.randint(100000, 999999)}",
            company_name=f"{prefix} {dist_info['district']} (Unit {e_i + 1})",
            sector=sector,
            scale=random.choice(["SMALL", "MEDIUM", "ENTERPRISE"]),
            contact_person=f"HR Manager {e_i+1}",
            contact_email=f"hr.recruitment{e_i}@industrypartner.in",
            contact_phone=f"+91 91{random.randint(10000000, 99999999)}",
            district=dist_info["district"],
            state=dist_info["state"],
            verification_tier="VERIFIED_PARTNER" if e_i % 4 != 0 else "SELF_DECLARED"
        )
        employers.append(emp)
        db.add(emp)
    db.flush()

    # Add Job Postings for each employer
    for emp in employers:
        posting = JobPosting(
            employer_id=emp.id,
            job_title=f"Associate - {emp.sector}",
            sector=emp.sector,
            district=emp.district,
            offered_wage=round(random.uniform(15000, 26000), -2),
            vacancies=random.randint(5, 30),
            min_nsqf_level=4
        )
        db.add(posting)
        db.flush()
        # Add required skills
        for s_data in SKILLS_POOL:
            if s_data["sector"] == emp.sector or s_data["category"] == "Soft Skill":
                db.add(JobRequirementSkill(job_posting_id=posting.id, skill_name=s_data["name"], is_mandatory=True))
    db.flush()

    # 7. Batches across Providers & Centres
    batches = []
    start_base = datetime.utcnow() - timedelta(days=500)
    for b_idx in range(120):
        prov = random.choice(providers)
        # pick a centre belonging to this provider
        centre = random.choice([c for c in centres if c.provider_id == prov.id] or [centres[0]])
        course_tuple = random.choice(courses)
        course_obj = course_tuple[0]
        
        b_start = start_base + timedelta(days=(b_idx * 3))
        b_end = b_start + timedelta(days=90)
        
        batch = Batch(
            provider_id=prov.id,
            centre_id=centre.id,
            course_id=course_obj.id,
            batch_code=f"BAT-2025-{1000 + b_idx}-{uuid.uuid4().hex[:6]}",
            start_date=b_start,
            end_date=b_end,
            status="COMPLETED"
        )
        batches.append((batch, course_tuple[1]))
        db.add(batch)
    db.flush()

    # 8. Trainees & Longitudinal Outcomes (Generating `count` trainees)
    print(f"[DataGen] Generating {count} trainees with full longitudinal lifecycles...")
    
    first_names_m = ["Aarav", "Rohan", "Aditya", "Amit", "Rahul", "Omkar", "Ganesh", "Prathamesh", "Sanket", "Swapnil", "Tushar", "Saurabh", "Abhishek", "Nikhil", "Akshay"]
    first_names_f = ["Priya", "Ananya", "Sneha", "Pooja", "Tanvi", "Shweta", "Rutuja", "Ankita", "Ashwini", "Sayali", "Neha", "Aarti", "Shraddha", "Komal", "Vaishnavi"]
    last_names = ["Patil", "Deshmukh", "Kulkarni", "Shinde", "Jadhav", "Gaikwad", "Pawar", "Chavan", "More", "Joshi", "Wagh", "Sawant", "Raut", "Thorat", "Kadam", "Bhosale"]
    
    trainees_to_add = []
    
    for i in range(count):
        batch_obj, tmpl = random.choice(batches)
        centre = db.query(TrainingCentre).filter_by(id=batch_obj.centre_id).first()
        dist_info = next((d for d in DISTRICTS_DATA if d["district"] == centre.district), DISTRICTS_DATA[0])
        
        is_female = random.random() < 0.44
        first_name = random.choice(first_names_f) if is_female else random.choice(first_names_m)
        last_name = random.choice(last_names)
        full_name = f"{first_name} {last_name}"
        gender = "FEMALE" if is_female else "MALE"
        
        # Phone: create 2% duplicate phones for anomaly engine
        if i > 0 and random.random() < 0.02:
            phone = f"+91 98{random.randint(1000, 1050)}9999" # Repeated cluster
            identity_conf = 84.0
            dq_score = 78.0
        else:
            phone = f"+91 9{random.randint(600000000, 999999999)}"
            identity_conf = 98.0
            dq_score = round(random.uniform(92.0, 100.0), 1)
        
        # Trainee longitudinal outcome probability
        placed_roll = random.random()
        placed_threshold = tmpl["placement_pot"]
        retention_threshold = tmpl["retention_pot"]
        
        # Determine status
        if placed_roll < (placed_threshold * 0.75):
            current_status = "EMPLOYED"
        elif placed_roll < (placed_threshold * 0.88):
            current_status = "SELF_EMPLOYED"
        elif placed_roll < (placed_threshold * 0.96):
            current_status = "APPRENTICE"
        else:
            current_status = "UNPLACED"
            
        t_id = str(uuid.uuid4())
        # Include a random suffix so skill_id stays unique even if the seeder runs
        # again with the same random.seed(42) deterministic sequence (e.g. Render restart).
        skill_id = f"SKILL-IND-{2025}-{100000 + i}-{uuid.uuid4().hex[:6]}"
        
        trainee = Trainee(
            id=t_id,
            skill_id=skill_id,
            batch_id=batch_obj.id,
            full_name=full_name,
            gender=gender,
            dob=f"{random.randint(1996, 2005)}-{random.randint(1,12):02d}-{random.randint(1,28):02d}",
            social_category=random.choices(["GEN", "OBC", "SC", "ST", "EWS"], weights=[0.25, 0.40, 0.20, 0.10, 0.05])[0],
            primary_phone=phone,
            email=f"{first_name.lower()}.{last_name.lower()}{i % 500}@skillsmail.in" if random.random() < 0.7 else None,
            state=dist_info["state"],
            district=dist_info["district"],
            pincode=centre.pincode,
            education_level=random.choice(["10th Pass", "12th Pass", "ITI", "Graduate"]),
            rural_urban="URBAN" if random.random() < dist_info["urban_ratio"] else "RURAL",
            current_status=current_status,
            data_quality_score=dq_score,
            identity_confidence=identity_conf
        )
        db.add(trainee)
        
        # Add Identity token
        db.add(Identity(
            trainee_id=t_id,
            id_type="AADHAAR_VIRTUAL_TOKEN",
            id_token_hash=f"SHA256-{uuid.uuid5(uuid.NAMESPACE_DNS, skill_id).hex}",
            confidence_score=identity_conf / 100.0
        ))
        
        # Add Consents
        for pol in policies:
            is_granted = True if pol.is_mandatory else (random.random() < 0.88)
            db.add(TraineeConsent(
                trainee_id=t_id,
                purpose_code=pol.purpose_code,
                status="GRANTED" if is_granted else "REVOKED",
                channel="DIGITAL_FORM"
            ))
            
        # Add Attendance & Assessment
        att_pct = random.uniform(80.0, 98.0)
        db.add(Attendance(
            trainee_id=t_id,
            batch_id=batch_obj.id,
            total_classes=80,
            attended_classes=int(80 * (att_pct / 100)),
            percentage=round(att_pct, 1)
        ))
        
        theory_score = round(random.uniform(65.0, 95.0), 1)
        practical_score = round(random.uniform(70.0, 98.0), 1)
        db.add(Assessment(
            trainee_id=t_id,
            theory_score=theory_score,
            practical_score=practical_score,
            total_score=round((theory_score + practical_score) / 2, 1),
            passed=True
        ))
        
        # Add Certification
        db.add(Certification(
            trainee_id=t_id,
            certificate_number=f"CERT-NCVET-{2025}-{200000 + i}-{uuid.uuid4().hex[:6]}",
            issue_date=batch_obj.end_date + timedelta(days=10),
            nsqf_level=tmpl["level"],
            credential_uri=f"https://credentials.gov.in/verify/CERT-NCVET-{2025}-{200000 + i}",
            qr_code_hash=f"QR-{uuid.uuid4().hex[:16]}"
        ))
        
        # Longitudinal Employment / Self-Employment / Apprenticeship & Wage Records
        start_wage = round(dist_info["base_wage"] * random.uniform(0.9, 1.25), -2)
        # Inject occasional suspicious rounded wage anomaly
        if i % 100 == 0:
            start_wage = 15000.0
            
        if current_status == "EMPLOYED":
            # Match with an employer in same or nearby sector
            emp = random.choice([e for e in employers if e.sector == tmpl["sector"]] or [employers[0]])
            # Retention simulation
            is_retained = random.random() < retention_threshold
            joining_date = batch_obj.end_date + timedelta(days=random.randint(10, 45))
            
            # Wage progression: 3m (+5-8%), 6m (+10-18%), 12m (+20-35%)
            wage_3m = round(start_wage * random.uniform(1.03, 1.08), -2)
            wage_6m = round(wage_3m * random.uniform(1.05, 1.12), -2)
            wage_12m = round(wage_6m * random.uniform(1.08, 1.15), -2)
            curr_wage = wage_12m if is_retained else wage_3m
            
            emp_rec = EmploymentRecord(
                trainee_id=t_id,
                employer_id=emp.id,
                employer_name_declared=emp.company_name,
                designation=f"Associate Technician - {tmpl['name']}",
                sector=tmpl["sector"],
                job_location_district=emp.district,
                job_location_state=emp.state,
                employment_type="FULL_TIME",
                joining_date=joining_date,
                exit_date=None if is_retained else (joining_date + timedelta(days=random.randint(70, 150))),
                is_current=is_retained,
                starting_wage=start_wage,
                current_wage=curr_wage,
                skill_relevance_score=round(random.uniform(0.75, 0.98), 2),
                verification_score=0.92 if emp.verification_tier == "VERIFIED_PARTNER" else 0.70,
                verification_status="VERIFIED" if emp.verification_tier == "VERIFIED_PARTNER" else "PENDING_EMPLOYER",
                exit_reason_category=None if is_retained else random.choice(["LOW_SALARY", "LOCATION_FAR", "SKILL_MISMATCH", "FAMILY_REASONS"])
            )
            db.add(emp_rec)
            db.flush()
            
            # Add verification signal
            db.add(VerificationRecord(
                employment_id=emp_rec.id,
                signal_type="EMPLOYER_PORTAL_CONFIRM" if emp.verification_tier == "VERIFIED_PARTNER" else "EMPLOYER_OTP",
                signal_weight=0.50,
                is_positive=True,
                details={"verified_by": emp.contact_person, "channel": "PORTAL_API"}
            ))
            
            # Add wage milestones
            db.add(WageRecord(trainee_id=t_id, checkpoint_day=0, monthly_wage=start_wage, reported_date=joining_date))
            db.add(WageRecord(trainee_id=t_id, checkpoint_day=90, monthly_wage=wage_3m, reported_date=joining_date + timedelta(days=90)))
            if is_retained:
                db.add(WageRecord(trainee_id=t_id, checkpoint_day=180, monthly_wage=wage_6m, reported_date=joining_date + timedelta(days=180)))
                db.add(WageRecord(trainee_id=t_id, checkpoint_day=365, monthly_wage=wage_12m, reported_date=joining_date + timedelta(days=365)))
                
        elif current_status == "SELF_EMPLOYED":
            se_inc = round(start_wage * random.uniform(1.1, 1.4), -2)
            db.add(SelfEmploymentRecord(
                trainee_id=t_id,
                enterprise_name=f"{full_name}'s {tmpl['sector']} Services",
                trade_activity=f"Independent {tmpl['name']}",
                monthly_net_income=se_inc,
                num_employees=random.randint(0, 3),
                udyam_registered=random.random() < 0.6,
                start_date=batch_obj.end_date + timedelta(days=20)
            ))
            db.add(WageRecord(trainee_id=t_id, checkpoint_day=0, monthly_wage=se_inc, reported_date=batch_obj.end_date + timedelta(days=20)))
            db.add(WageRecord(trainee_id=t_id, checkpoint_day=180, monthly_wage=round(se_inc * 1.15, -2), reported_date=batch_obj.end_date + timedelta(days=200)))
            
        elif current_status == "APPRENTICE":
            stipend = round(start_wage * 0.75, -2)
            db.add(ApprenticeshipRecord(
                trainee_id=t_id,
                contract_number=f"NAPS-CONT-{2025}-{300000 + i}",
                establishment_name=f"{employers[i % len(employers)].company_name}",
                monthly_stipend=stipend,
                start_date=batch_obj.end_date + timedelta(days=15),
                end_date=batch_obj.end_date + timedelta(days=380),
                converted_to_fulltime=random.random() < 0.65
            ))
            db.add(WageRecord(trainee_id=t_id, checkpoint_day=0, monthly_wage=stipend, reported_date=batch_obj.end_date + timedelta(days=15)))
            
        # Add Follow-up schedule and AI extracted response
        for cp_days, cp_name in [(30, "DAY_30"), (90, "DAY_90"), (180, "DAY_180"), (365, "DAY_365")]:
            fu = FollowUpSchedule(
                trainee_id=t_id,
                checkpoint=cp_name,
                due_date=batch_obj.end_date + timedelta(days=cp_days),
                status="COMPLETED",
                channel_used=random.choice(["WHATSAPP_AI", "SMS_CONVERSATIONAL", "IVR_VOICE"]),
                completed_at=batch_obj.end_date + timedelta(days=cp_days + 1)
            )
            db.add(fu)
            db.flush()
            
            # Response transcript and structured extraction
            if current_status == "EMPLOYED":
                raw_text = f"Yes, I am working at {employers[i % len(employers)].company_name} as technician in {dist_info['district']}. Getting Rs {int(start_wage)} per month."
                ext_status = "EMPLOYED"
                ext_wage = start_wage
            elif current_status == "SELF_EMPLOYED":
                raw_text = f"I have started my own repair shop in {dist_info['district']}. Earning about {int(start_wage * 1.2)} per month."
                ext_status = "SELF_EMPLOYED"
                ext_wage = start_wage * 1.2
            elif current_status == "APPRENTICE":
                raw_text = f"Doing apprenticeship under NAPS scheme with monthly stipend {int(start_wage * 0.75)}."
                ext_status = "APPRENTICE"
                ext_wage = start_wage * 0.75
            else:
                raw_text = f"Currently looking for job. Facing difficulty because employers ask for advanced computer skills not taught."
                ext_status = "UNEMPLOYED"
                ext_wage = None
                
            db.add(FollowUpResponse(
                followup_id=fu.id,
                transcript_raw=raw_text,
                extracted_status=ext_status,
                extracted_wage=ext_wage,
                extracted_employer=employers[i % len(employers)].company_name if current_status == "EMPLOYED" else None,
                extracted_job_location=dist_info["district"],
                job_satisfaction_rating=random.randint(3, 5) if current_status != "UNPLACED" else 2,
                extracted_reason="SKILL_MISMATCH" if current_status == "UNPLACED" else None,
                nlu_confidence=round(random.uniform(0.88, 0.99), 2)
            ))
            
        # Add Explainable ML Prediction
        pred_prob = round(random.uniform(0.65, 0.94) if current_status != "UNPLACED" else random.uniform(0.28, 0.52), 2)
        db.add(ModelPredictionLog(
            trainee_id=t_id,
            model_type="PLACEMENT_PROBABILITY",
            model_version="v2.1-XGBoost",
            prediction_score=pred_prob,
            prediction_label="HIGH_PROBABILITY" if pred_prob >= 0.7 else "AT_RISK_LOW_PLACEMENT",
            top_positive_factors=[
                {"feature": "NSQF Certificate Verified", "contribution": "+0.24"},
                {"feature": "Practical Assessment Score (85%+)", "contribution": "+0.18"},
                {"feature": f"Local Demand in {dist_info['district']}", "contribution": "+0.14"}
            ],
            top_negative_factors=[
                {"feature": "Entry Wage Expectation Gap", "contribution": "-0.08"},
                {"feature": "Commute Distance > 25km", "contribution": "-0.06"}
            ] if pred_prob < 0.7 else [],
            confidence=0.89
        ))

        if (i + 1) % 1000 == 0:
            db.commit()
            print(f"[DataGen] Committed {i + 1}/{count} trainees...")
            
    db.commit()

    # 9. Skill Gaps Analysis records
    for course_obj, tmpl in courses:
        if tmpl["qp"] == "SSC/Q2212": # Domestic Data Entry (Intentional Gap)
            db.add(SkillGapAnalysis(
                course_id=course_obj.id,
                skill_name="Advanced Excel & PowerBI",
                demand_volume=450,
                curriculum_coverage_score=0.15,
                placement_impact_deficit=0.38,
                confidence_level=0.92
            ))
            db.add(SkillGapAnalysis(
                course_id=course_obj.id,
                skill_name="Business English & Communication",
                demand_volume=380,
                curriculum_coverage_score=0.25,
                placement_impact_deficit=0.29,
                confidence_level=0.88
            ))
        elif tmpl["sector"] == "Automotive":
            db.add(SkillGapAnalysis(
                course_id=course_obj.id,
                skill_name="EV Battery Telematics Diagnostics",
                demand_volume=310,
                curriculum_coverage_score=0.30,
                placement_impact_deficit=0.22,
                confidence_level=0.86
            ))
    db.flush()

    # 10. Recommendations and Closed-Loop Interventions
    rec1 = Recommendation(
        target_type="COURSE",
        target_id=courses[1][0].id,
        title="Upgrade Data Entry Curriculum to Business Operations & Cloud MIS",
        problem_statement="Domestic Data Entry Operator exhibits 92% certification but only 44% placement and 32% 6-month retention across 14 cohorts.",
        evidence_summary="Observed across 1,840 trainees. 82% of hiring employers in IT-ITeS demand Advanced Excel, SQL, and CRM tools not present in current QP.",
        possible_causes=["Curriculum outdated relative to entry market standards", "Employers shifting from manual entry to automated CRM tools"],
        recommended_actions=["Incorporate 40 hours of Advanced Spreadsheets/PowerBI", "Introduce Business Communication module", "Partner with 15 tier-2 IT employers"],
        priority="CRITICAL",
        expected_impact="Estimated +25-30% placement lift and +18% 6-month retention",
        confidence_percentage=91.0,
        measurement_plan="Track next 3 pilot batches with upgraded curriculum against historical baselines",
        status="UNDER_INTERVENTION"
    )
    db.add(rec1)
    db.flush()

    # Closed-loop Intervention (Demonstrating measured cohort improvement)
    interv1 = Intervention(
        recommendation_id=rec1.id,
        code=f"INTV-2025-001-{uuid.uuid4().hex[:6]}",
        title="MIS & Communication Bridge Bootcamp Pilot",
        intervention_type="CURRICULUM_UPGRADE",
        target_course_id=courses[1][0].id,
        target_provider_id=providers[0].id,
        start_date=datetime.utcnow() - timedelta(days=180),
        end_date=datetime.utcnow() - timedelta(days=20),
        status="EVALUATED",
        baseline_placement_rate=44.0,
        baseline_6m_retention=32.0,
        post_placement_rate=68.5,
        post_6m_retention=54.2,
        impact_delta_percentage=24.5,
        evaluation_notes="Measured across 4 post-intervention cohorts (n=240). Significant improvement observed in placement (+24.5 pp) and 6-month wage (+18%). Continuous monitoring recommended."
    )
    db.add(interv1)

    # 11. Model Metrics Log (Fairness & Drift Monitoring)
    db.add(ModelMetricLog(
        model_type="PLACEMENT_PROBABILITY",
        model_version="v2.1-XGBoost",
        accuracy=0.852,
        precision=0.831,
        recall=0.874,
        f1_score=0.852,
        auc_roc=0.894,
        disparate_impact_ratio=0.96, # Subgroup fairness (Gender & Caste parity index)
        drift_detected=False,
        drift_score=0.032
    ))
    db.add(ModelMetricLog(
        model_type="ATTRITION_RISK",
        model_version="v1.8-RandomForest",
        accuracy=0.814,
        precision=0.792,
        recall=0.825,
        f1_score=0.808,
        auc_roc=0.862,
        disparate_impact_ratio=0.93,
        drift_detected=False,
        drift_score=0.041
    ))

    # 12. Seed Event Stream and Audit Log
    db.add(EventStream(
        event_type="SYSTEM_INITIALIZED",
        entity_id=pmkvy.id,
        entity_type="SCHEME",
        actor_id="SYSTEM_BOOTSTRAP",
        payload={"beneficiaries_seeded": count, "providers": len(providers), "courses": len(courses)}
    ))
    db.add(AuditLog(
        user_id=admin_user.id,
        action="BOOTSTRAP_OUTCOME_DATABASE",
        resource="DATABASE",
        details=f"Seeded {count} longitudinal trainee records with full closed-loop outcomes."
    ))

    db.commit()
    print(f"[DataGen] Seeding successfully completed!")
