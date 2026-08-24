import apiClient from '../api/client';
import {
  MacroKPIs, DistrictOutcome, CourseBenchmark, ProviderBenchmark,
  SkillSupplyDemand, RetentionAttritionData, DataQualityAudit,
  RecommendationItem, InterventionTrackerItem, FairnessAudit,
  TraineeRecord, TraineeDetailData, DemoScenario, KaplanMeierPoint, AttritionReasonBreakdown
} from '../types';

export const api = {
  // Intelligence
  getMacroOverview: async (params?: any): Promise<MacroKPIs> => {
    const res = await apiClient.get('/intelligence/macro-overview', { params });
    return res.data;
  },
  getMacroOutcomes: async (params?: any): Promise<MacroKPIs> => {
    const res = await apiClient.get('/intelligence/macro-overview', { params });
    return res.data;
  },
  getDistrictMap: async (): Promise<DistrictOutcome[]> => {
    const res = await apiClient.get('/intelligence/district-map');
    return res.data;
  },
  getDistrictHeatmap: async (): Promise<DistrictOutcome[]> => {
    const res = await apiClient.get('/intelligence/district-map');
    return res.data;
  },
  getCourseBenchmarks: async (): Promise<CourseBenchmark[]> => {
    const res = await apiClient.get('/intelligence/course-benchmarks');
    return res.data;
  },
  getProviderBenchmarks: async (): Promise<ProviderBenchmark[]> => {
    const res = await apiClient.get('/intelligence/provider-benchmarks');
    return res.data;
  },
  getSkillSupplyDemand: async (): Promise<SkillSupplyDemand[]> => {
    const res = await apiClient.get('/intelligence/skill-supply-demand');
    return res.data;
  },
  getSkillGaps: async (): Promise<SkillSupplyDemand[]> => {
    const res = await apiClient.get('/intelligence/skill-supply-demand');
    return res.data;
  },
  getRetentionAttrition: async (): Promise<RetentionAttritionData> => {
    const res = await apiClient.get('/intelligence/retention-attrition');
    return res.data;
  },
  getRetentionCurves: async (): Promise<KaplanMeierPoint[]> => {
    const res = await apiClient.get('/intelligence/retention-attrition');
    return (res.data?.retention_curve || []).map((r: any, i: number) => ({
      month: i + 1,
      survival_probability_pct: r.retention_pct,
      at_risk_count: r.employed_count
    }));
  },
  getAttritionReasons: async (): Promise<AttritionReasonBreakdown[]> => {
    const res = await apiClient.get('/intelligence/retention-attrition');
    return res.data?.attrition_reasons || [];
  },
  getDataQualityAudit: async (): Promise<DataQualityAudit> => {
    const res = await apiClient.get('/intelligence/data-quality-audit');
    return res.data;
  },

  // Interventions & Recommendations
  getRecommendations: async (status?: string): Promise<RecommendationItem[]> => {
    const res = await apiClient.get('/interventions/recommendations', { params: { status } });
    return res.data;
  },
  getInterventionTracker: async (): Promise<InterventionTrackerItem[]> => {
    const res = await apiClient.get('/interventions/active-tracker');
    return res.data;
  },
  createIntervention: async (payload: any) => {
    const res = await apiClient.post('/interventions/create', payload);
    return res.data;
  },

  // Trainees
  listTrainees: async (params?: any): Promise<{ total: number; data: TraineeRecord[]; items?: TraineeRecord[] }> => {
    const res = await apiClient.get('/trainees', { params });
    return {
      ...res.data,
      items: res.data?.data || []
    };
  },
  getTrainees: async (page = 1, limit = 10, search = ''): Promise<{ total: number; items: TraineeRecord[] }> => {
    const res = await apiClient.get('/trainees', { params: { page, limit, search } });
    return {
      total: res.data?.total || 0,
      items: res.data?.data || []
    };
  },
  getTraineeDetail: async (idOrSkillId: string): Promise<TraineeDetailData> => {
    const res = await apiClient.get(`/trainees/${idOrSkillId}`);
    return res.data;
  },

  // Follow-up NLU
  processFollowUpMessage: async (payload: { trainee_id: string; checkpoint: string; raw_message: string; language: string; channel: string }) => {
    const res = await apiClient.post('/followups/process-conversation', payload);
    return res.data;
  },

  // Multi-signal Verification
  getPendingVerifications: async () => {
    const res = await apiClient.get('/verification/pending-queue');
    return res.data;
  },
  verifySignal: async (payload: { employment_id: string; signal_type: string; is_positive: boolean; details?: any; verifier_role?: string }) => {
    const res = await apiClient.post('/verification/verify-signal', payload);
    return res.data;
  },

  // ML Governance
  predictPlacement: async (traineeId: string) => {
    const res = await apiClient.get(`/ml-governance/predict-placement/${traineeId}`);
    return res.data;
  },
  getFairnessAudit: async (): Promise<FairnessAudit> => {
    const res = await apiClient.get('/ml-governance/fairness-audit');
    return res.data;
  },

  // Demo Scenarios
  getDemoScenarios: async (): Promise<DemoScenario[]> => {
    const res = await apiClient.get('/demo/scenarios');
    return res.data;
  },
  getScenarioDetail: async (scenarioId: string) => {
    const res = await apiClient.get(`/demo/scenario/${scenarioId}`);
    return res.data;
  }
};
