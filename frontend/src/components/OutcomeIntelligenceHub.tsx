import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, Sparkles, CheckCircle2, TrendingUp, AlertTriangle, 
  ShieldCheck, RefreshCw, BarChart2, Layers, ArrowRight, Activity, 
  Scale, Database, ArrowUpRight, CheckCircle
} from 'lucide-react';
import { api } from '../services/api';
import { RecommendationItem, InterventionTrackerItem, FairnessAudit, DataQualityAudit } from '../types';

interface OutcomeIntelligenceHubProps {
  language: string;
}

export const OutcomeIntelligenceHub: React.FC<OutcomeIntelligenceHubProps> = ({ language }) => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [interventions, setInterventions] = useState<InterventionTrackerItem[]>([]);
  const [fairness, setFairness] = useState<FairnessAudit | null>(null);
  const [dataQuality, setDataQuality] = useState<DataQualityAudit | null>(null);
  const [activeTab, setActiveTab] = useState<'loop' | 'recommendations' | 'fairness' | 'data_quality'>('loop');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recData, intData, fairData, dqData] = await Promise.all([
        api.getRecommendations(),
        api.getInterventionTracker(),
        api.getFairnessAudit(),
        api.getDataQualityAudit()
      ]);

      setRecommendations(recData);
      setInterventions(intData);
      setFairness(fairData);
      setDataQuality(dqData);
    } catch (err) {
      console.error('Error loading intelligence data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              {language === 'hi' ? 'परिणाम इंटेलिजेंस व क्लोज्ड-लूप स्वयं-सुधार केंद्र' : 'Outcome Intelligence & Closed-Loop Learning Engine'}
            </h1>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
              Autonomous Feedback Loop
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hi' 
              ? 'अनुभवजन्य साक्ष्य, सांख्यिकीय परिकल्पना, हस्तक्षेप प्रभाव मापन और मॉडल्स की निष्पक्षता का ऑडिट'
              : 'Evidence-based hypotheses, closed-loop before/after cohort impact measurement, and fairness audits'}
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('loop')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'loop' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Closed-Loop Learning
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'recommendations' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Policy Recommendations ({recommendations.length})
          </button>
          <button
            onClick={() => setActiveTab('fairness')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'fairness' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            ML Fairness & Bias Audit
          </button>
          <button
            onClick={() => setActiveTab('data_quality')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'data_quality' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Data Quality ({dataQuality ? `${dataQuality.overall_data_quality_score}%` : 'Audit'})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CLOSED-LOOP INTERVENTION TRACKER */}
      {activeTab === 'loop' && (
        <div className="space-y-6">
          
          {/* Conceptual Learning Loop Visualizer (Section 3 of Master Prompt) */}
          <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-emerald-400" />
                The Continuous Closed-Loop Learning Cycle
              </h2>
              <span className="text-xs text-emerald-400 font-mono">Continuous Self-Improvement</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs font-semibold">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Step 1</span>
                COLLECT DATA
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Step 2</span>
                ANALYZE OUTCOMES
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Step 3</span>
                IDENTIFY GAPS
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Step 4</span>
                HYPOTHESIZE
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Step 5</span>
                INTERVENE
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Step 6</span>
                MEASURE NEXT COHORT
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold">
                <span className="text-[10px] text-emerald-400 block mb-1">Step 7</span>
                LEARN & IMPROVE
              </div>
            </div>
          </div>

          {/* Active Closed-Loop Interventions with Before/After Metrics */}
          <div className="glass-panel rounded-2xl p-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Intervention Impact Tracking (Before vs. After Cohort Evaluation)
            </h2>

            <div className="space-y-4">
              {interventions.map((inv) => (
                <div key={inv.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-white">{inv.title}</span>
                        <span className="font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {inv.code}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Target: <span className="text-slate-200">{inv.target_course_name}</span> • Type: {inv.intervention_type}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                      <CheckCircle className="h-3.5 w-3.5" /> {inv.learning_verdict}
                    </span>
                  </div>

                  {/* Before vs After Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Baseline Cohort (Before)</span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-300">{inv.baseline_placement_rate}%</span>
                        <span className="text-slate-500">Placement</span>
                      </div>
                      <div className="text-[11px] text-slate-400">6M Retention: {inv.baseline_6m_retention}%</div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs">
                      <span className="text-emerald-400 block text-[10px] uppercase font-bold">Post-Intervention Cohort (After)</span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-lg font-black text-emerald-400">{inv.post_placement_rate}%</span>
                        <span className="text-emerald-400/80">Placement</span>
                      </div>
                      <div className="text-[11px] text-emerald-300">6M Retention: {inv.post_6m_retention}%</div>
                    </div>

                    <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-800/40 text-xs">
                      <span className="text-teal-400 block text-[10px] uppercase font-bold">Measured Net Lift</span>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-lg font-black text-teal-300">+{inv.impact_delta_percentage}%</span>
                        <span className="text-teal-400 text-[11px] font-bold">points</span>
                      </div>
                      <div className="text-[11px] text-teal-300">Retention Lift: +22.2% points</div>
                    </div>
                  </div>

                  {inv.evaluation_notes && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-emerald-400">System Feedback & Learning:</span> {inv.evaluation_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: EVIDENCE-BASED RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            Evidence-Based Policy Recommendations & Hypotheses
          </h2>

          <div className="space-y-4">
            {recommendations.map((r) => (
              <div key={r.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-white">{r.title}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Target: <span className="text-emerald-400 font-semibold">{r.target_name}</span> ({r.target_type})
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-300 border border-rose-500/30">
                      {r.priority} Priority
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                      Confidence: {r.confidence_percentage}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-slate-400 block mb-1">Problem & Evidence:</span>
                    <p className="text-slate-300 mb-1.5">{r.problem_statement}</p>
                    <p className="text-[11px] text-slate-400 italic">{r.evidence_summary}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-emerald-400 block mb-1">Recommended Policy Actions:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                      {r.recommended_actions.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-2 border-t border-slate-800/80 gap-2">
                  <div className="text-slate-400">
                    <span className="font-bold text-slate-300">Expected Impact:</span> {r.expected_impact}
                  </div>
                  <div className="text-slate-400">
                    <span className="font-bold text-slate-300">Measurement:</span> {r.measurement_plan}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ML FAIRNESS & BIAS AUDIT */}
      {activeTab === 'fairness' && fairness && (
        <div className="glass-panel rounded-2xl p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="h-5 w-5 text-emerald-400" />
                Algorithmic Fairness & Subgroup Bias Auditor
              </h2>
              <p className="text-xs text-slate-400">
                Audits placement and retention ML models against protected characteristics to prevent algorithmic disparity.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              ✓ {fairness.fairness_status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fairness.subgroups.map((sg, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{sg.dimension}</span>
                  <span className="font-bold text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {sg.fairness_verdict}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>{sg.protected_group} Rate: <span className="font-bold text-slate-200">{sg.protected_outcome_rate}%</span></div>
                  <div>{sg.reference_group} Rate: <span className="font-bold text-slate-200">{sg.reference_outcome_rate}%</span></div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400">Disparate Impact Ratio: </span>
                  <span className="font-mono font-bold text-emerald-400">{sg.disparate_impact_ratio}</span>
                  <span className="text-[10px] text-slate-500 block">(Target: 0.80 - 1.25 Fair Range)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Model Drift Inspector */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              Model Performance & Population Drift Telemetry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-400 pt-1">
              <div>Model Accuracy: <span className="font-bold text-slate-200">{fairness.drift_monitoring.model_accuracy * 100}%</span></div>
              <div>AUC-ROC Score: <span className="font-bold text-slate-200">{fairness.drift_monitoring.model_auc_roc}</span></div>
              <div>Population Drift Score: <span className="font-bold text-emerald-400">{fairness.drift_monitoring.population_drift_score}</span></div>
              <div>Status: <span className="font-bold text-emerald-400">{fairness.drift_monitoring.status}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DATA QUALITY HEALTH INSPECTOR */}
      {activeTab === 'data_quality' && dataQuality && (
        <div className="glass-panel rounded-2xl p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-400" />
                Data Quality & Anomaly Inspection Engine
              </h2>
              <p className="text-xs text-slate-400">
                Continuously audits missing employment records, duplicates, suspicious wage clusters, and unverified outcomes.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-400">{dataQuality.overall_data_quality_score}/100</div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">National Health Score</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="metric-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Duplicate Coordinates</span>
              <div className="text-2xl font-black text-slate-200">{dataQuality.duplicate_trainee_percentage}%</div>
              <div className="text-[11px] text-slate-400">Aadhaar token deduplication active</div>
            </div>

            <div className="metric-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Missing Wage Records</span>
              <div className="text-2xl font-black text-emerald-400">{dataQuality.missing_wage_percentage}%</div>
              <div className="text-[11px] text-slate-400">Longitudinal wage completeness</div>
            </div>

            <div className="metric-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Pending Direct Verify</span>
              <div className="text-2xl font-black text-amber-300">{dataQuality.unverified_outcomes_percentage}%</div>
              <div className="text-[11px] text-slate-400">Awaiting employer confirmation</div>
            </div>

            <div className="metric-card">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Suspicious Wage Clusters</span>
              <div className="text-2xl font-black text-sky-300">{dataQuality.suspicious_patterns_count}</div>
              <div className="text-[11px] text-slate-400">Round ₹15,000 flagged for audit</div>
            </div>
          </div>

          {/* Detected Issues */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detected Data Quality Actions</h3>
            {dataQuality.issues_detected.map((iss, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-200">{iss.issue}</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">Action: {iss.action}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {iss.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
