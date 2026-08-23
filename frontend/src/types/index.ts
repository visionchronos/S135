export interface MacroKPIs {
  total_enrolled: number;
  total_certified: number;
  certification_rate: number;
  total_employed_wage: number;
  total_self_employed: number;
  total_apprentices: number;
  total_placed_or_employed: number;
  placement_rate: number;
  unplaced_count: number;
  retention_30d_pct: number;
  retention_90d_pct: number;
  retention_180d_pct: number;
  retention_365d_pct: number;
  median_starting_wage: number;
  median_current_wage: number;
  median_wage_growth_pct: number;
  data_quality_score: number;
  verified_outcomes_percentage: number;
  total_trainees?: number;
  placement_rate_pct?: number;
  wage_progression_delta_pct?: number;
}

export type MacroLongitudinalOutcomes = MacroKPIs;

export interface DistrictOutcome {
  district: string;
  state: string;
  latitude?: number;
  longitude?: number;
  total_trainees: number;
  placement_rate: number;
  placement_rate_pct?: number;
  retention_6m_rate?: number;
  retention_180d_pct?: number;
  median_wage?: number;
  avg_wage?: number;
  verified_rate_pct?: number;
  data_quality_score?: number;
  dominant_sector?: string;
  status?: 'HEALTHY' | 'NEEDS_ATTENTION' | 'CRITICAL_GAP';
}

export type DistrictGeospatialMetric = DistrictOutcome;

export interface CourseBenchmark {
  course_id: string;
  qp_code: string;
  course_name: string;
  sector: string;
  total_enrolled: number;
  certified_count: number;
  certification_rate: number;
  placed_count: number;
  placement_rate: number;
  retention_6m_pct: number;
  median_entry_wage: number;
  inferred_skill_gaps: string[];
  diagnosis: 'SKILL_MISMATCH_SUSPECTED' | 'HIGH_OUTCOME_BENCHMARK' | 'MODERATE_PERFORMANCE';
}

export interface ProviderBenchmark {
  provider_id: string;
  code?: string;
  name?: string;
  provider_name?: string;
  state?: string;
  headquarters?: string;
  total_trainees?: number;
  total_enrolled?: number;
  certification_rate?: number;
  certified_rate?: number;
  placement_rate: number;
  retention_6m?: number;
  employer_verified_rate?: number;
  employer_verification_rate?: number;
  data_quality_score: number;
  rating?: number;
  composite_performance_score?: number;
  anomaly_flag: boolean;
  anomaly_reason?: string;
}

export interface SkillSupplyDemand {
  skill_name: string;
  category: string;
  demand_level: string;
  supply_trained: number;
  industry_demand: number;
  net_gap: number;
  status: 'CRITICAL_SHORTAGE' | 'SURPLUS' | 'BALANCED';
}

export type SkillSupplyDemandGap = SkillSupplyDemand;

export interface KaplanMeierPoint {
  month: number;
  survival_probability_pct: number;
  at_risk_count?: number;
  exited_count?: number;
}

export interface AttritionReasonBreakdown {
  reason: string;
  count: number;
  percentage: number;
  insight: string;
}

export interface RetentionAttritionData {
  retention_curve: {
    checkpoint: string;
    retention_pct: number;
    employed_count: number;
  }[];
  attrition_reasons: {
    reason: string;
    count: number;
    percentage: number;
    insight: string;
  }[];
  non_placement_reasons: {
    reason: string;
    percentage: number;
    impact: string;
  }[];
}

export interface DataQualityAudit {
  overall_data_quality_score: number;
  duplicate_trainee_percentage: number;
  missing_wage_percentage: number;
  unverified_outcomes_percentage: number;
  round_number_wage_anomaly_count: number;
  course_outcome_drop_anomalies: number;
  high_risk_providers_count: number;
  suspicious_patterns_count?: number;
  issues_detected?: Array<{ issue: string; severity: string; count: number; impact: string; action?: string }>;
  status: 'HEALTHY' | 'ANOMALIES_DETECTED';
}

export interface RecommendationItem {
  id: string;
  title: string;
  target_name?: string;
  target_type?: string;
  target_entity_type?: string;
  target_entity_id?: string;
  category: string;
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  priority?: string;
  confidence?: number;
  confidence_percentage?: number;
  problem_statement?: string;
  evidence_summary?: string;
  evidence_json?: {
    observation: string;
    historical_benchmark: string;
    projected_impact: string;
  };
  recommended_actions?: string[];
  suggested_action?: string;
  expected_impact?: string;
  measurement_plan?: string;
  status: 'PENDING' | 'DEPLOYED' | 'DISMISSED';
}

export interface InterventionTrackerItem {
  id: string;
  code?: string;
  intervention_code?: string;
  title?: string;
  recommendation_title?: string;
  target_course_name?: string;
  intervention_type?: string;
  course_or_provider_name?: string;
  action_type?: string;
  learning_verdict?: string;
  baseline_placement_rate?: number;
  baseline_placement_pct?: number;
  current_placement_pct?: number;
  baseline_6m_retention?: number;
  baseline_retention_pct?: number;
  current_retention_pct?: number;
  post_placement_rate?: number;
  post_6m_retention?: number;
  impact_delta_percentage?: number;
  measured_improvement_pct?: number;
  evaluation_notes?: string;
  learning_feedback?: string;
  status: 'ACTIVE_MONITORING' | 'EVALUATED_SUCCESS' | 'EVALUATED_NO_IMPACT';
}

export interface FairnessAudit {
  fairness_status: string;
  fairness_score: number;
  model_version: string;
  audit_date: string;
  subgroups: {
    dimension: string;
    protected_group: string;
    reference_group: string;
    protected_outcome_rate: number;
    reference_outcome_rate: number;
    disparate_impact_ratio: number;
    fairness_verdict: string;
  }[];
  audit_checks?: {
    group: string;
    metric: string;
    value: number;
    threshold: number;
    status: 'PASS' | 'FAIL';
  }[];
  drift_monitoring: {
    population_drift_score: number;
    drift_detected: boolean;
    model_accuracy: number;
    model_auc_roc: number;
    status: string;
  };
}

export interface TraineeRecord {
  id: string;
  skill_id: string;
  full_name: string;
  gender: string;
  district: string;
  state: string;
  course_name: string;
  batch_code?: string;
  provider_name: string;
  certification_date: string;
  current_status: 'EMPLOYED' | 'SELF_EMPLOYED' | 'APPRENTICE' | 'UNEMPLOYED' | 'DROPOUT';
  starting_wage: number;
  current_wage: number;
  verification_tier: string;
  data_confidence_score: number;
  data_quality_score?: number;
}

export interface TraineeDetailData {
  id?: string;
  skill_id?: string;
  full_name?: string;
  district?: string;
  state?: string;
  gender?: string;
  dob?: string;
  education_level?: string;
  social_category?: string;
  current_status?: string;
  created_at?: string;
  profile?: {
    id: string;
    skill_id: string;
    full_name: string;
    gender: string;
    dob: string;
    district: string;
    state: string;
    current_status: string;
    created_at: string;
  };
  course?: {
    course_name: string;
    qp_code: string;
    sector: string;
    nsqf_level: number;
    provider_name: string;
    training_centre_name: string;
    batch_start: string;
    batch_end: string;
  };
  training?: {
    course_name: string;
    qp_code: string;
    sector: string;
    nsqf_level: number;
    provider_name: string;
    training_centre_name: string;
    batch_start: string;
    batch_end: string;
  };
  assessment?: {
    theory_score: number;
    practical_score: number;
    total_score: number;
    grade: string;
    assessment_date: string;
    assessor_agency: string;
  };
  consents?: {
    purpose: string;
    is_granted: boolean;
    granted_at: string;
  }[];
  employment_timeline?: {
    employer_name: string;
    role_title: string;
    joining_date: string;
    starting_wage: number;
    current_wage: number;
    is_current: boolean;
    verification_tier: string;
    verification_score: number;
  }[];
  employment_records?: {
    employer_name: string;
    role_title: string;
    joining_date: string;
    starting_wage: number;
    current_wage: number;
    is_current: boolean;
    verification_tier: string;
    verification_score: number;
  }[];
  wage_progression?: {
    checkpoint_day: number;
    checkpoint_label: string;
    monthly_wage: number;
    reported_date: string;
    source: string;
  }[];
  wage_records?: {
    checkpoint_day: number;
    checkpoint_label?: string;
    monthly_wage: number;
    reported_date: string;
    source: string;
  }[];
  followup_history?: {
    checkpoint: string;
    completed_at: string;
    status: string;
    channel_used: string;
    extracted_wage: number;
    extracted_employer: string;
    nlu_confidence: number;
  }[];
}

export interface DemoScenario {
  id: string;
  step: number;
  category: string;
  title: string;
  lifecycle_stage: string;
  description: string;
  action_summary: string;
  key_metric_impact: string;
}
