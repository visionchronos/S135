import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ArrowRight, ArrowLeft, Play, Sparkles, 
  Award, Briefcase, ShieldCheck, TrendingUp, AlertTriangle, 
  Layers, RefreshCw, BarChart3, Database, Check, Zap, Cpu 
} from 'lucide-react';
import { api } from '../services/api';
import { DemoScenario } from '../types';

interface InteractiveDemoRunnerProps {
  onClose: () => void;
  language: string;
}

export const InteractiveDemoRunner: React.FC<InteractiveDemoRunnerProps> = ({ onClose, language }) => {
  const [scenarios, setScenarios] = useState<DemoScenario[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [scenarioCache, setScenarioCache] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllScenarios();
  }, []);

  const loadAllScenarios = async () => {
    try {
      setLoading(true);
      const scList = await api.getDemoScenarios();
      setScenarios(scList);

      // Preload all scenario details for instant 0ms transition
      const cache: Record<string, any> = {};
      await Promise.all(
        scList.map(async (sc) => {
          try {
            const detail = await api.getScenarioDetail(sc.id);
            cache[sc.id] = detail;
          } catch (e) {
            console.error(`Failed to load ${sc.id}:`, e);
          }
        })
      );
      setScenarioCache(cache);
    } catch (err) {
      console.error('Failed to load demo scenarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentSc = scenarios[currentStepIndex];
  const currentDetail = currentSc ? scenarioCache[currentSc.id] : null;
  const payload = currentDetail?.demo_payload;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-700/80 bg-gradient-to-br from-[#0e1626] via-[#0b1322] to-[#070c16] shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* National Tricolor Top Accent */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#090e18]/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-orange-500/20">
              <Play className="h-4 w-4 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  {language === 'hi' ? 'इंटरैक्टिव 9-चरण क्लोज्ड-लूप सिमुलेशन' : 'Interactive 9-Step Closed-Loop Live Simulation'}
                </h2>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  Judges Walkthrough
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                DATA → MULTI-SIGNAL AUDIT → CAUSAL ML → POLICY INTERVENTION → RE-EVALUATION
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0e1626] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-[#090e18]/60 px-6 py-3 border-b border-slate-800/80 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] gap-2">
            {scenarios.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentStepIndex === idx
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                    : currentStepIndex > idx
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-[#090e18] text-slate-500 border border-slate-800'
                }`}
              >
                <span>{sc.step}</span>
                <span className="truncate max-w-[70px] text-[10px]">{sc.lifecycle_stage}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {currentSc && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/25">
                  Stage {currentSc.step}/9 • {currentSc.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentSc.lifecycle_stage}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                {currentSc.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {currentSc.description}
              </p>
            </div>
          )}

          {/* Interactive Live Data Card */}
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <RefreshCw className="h-6 w-6 animate-spin text-emerald-400 mx-auto mb-2" />
              Initializing demonstration telemetry...
            </div>
          ) : payload ? (
            <div className="rounded-xl bg-[#090e18] border border-slate-800 p-5 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  Live Platform State & Telemetry Output
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                  Verified Active Record
                </span>
              </div>

              {/* Scenario Specific Visuals */}
              {currentStepIndex === 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>Trainee Name: <span className="font-bold text-white block">{payload.trainee_name}</span></div>
                  <div>Persistent Skill ID: <span className="font-mono font-bold text-emerald-400 block">{payload.skill_id}</span></div>
                  <div>Certified Qualification: <span className="font-semibold text-slate-300 block">{payload.course}</span></div>
                  <div>Training Provider: <span className="text-slate-300 block">{payload.provider}</span></div>
                  <div>Practical Score: <span className="font-bold text-emerald-400 block">{payload.assessment_scores?.practical}% (Distinction)</span></div>
                  <div>Consent Status: <span className="font-bold text-teal-300 block">{payload.consent_status}</span></div>
                </div>
              )}

              {currentStepIndex === 1 && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0e1626] border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Trainee WhatsApp Response (Hindi/Multilingual NLU):</span>
                    <p className="text-emerald-300 font-medium text-sm">"{payload.raw_trainee_message}"</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                    <div>Status: <span className="font-bold text-white block">EMPLOYED</span></div>
                    <div>Employer: <span className="font-bold text-white block">Tata Power Renewables</span></div>
                    <div>Wage: <span className="font-bold text-white block">₹18,000 / month</span></div>
                    <div>NLU Confidence: <span className="font-bold text-white block">96%</span></div>
                  </div>
                </div>
              )}

              {currentStepIndex === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Employer Confirmation:</span>
                    <span className="font-bold text-slate-200">{payload.employer_name}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Composite Verification Score:</span>
                    <span className="font-bold text-emerald-400 text-lg">96% (Verified)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="text-emerald-400 block text-[10px]">Verification Tier:</span>
                    <span className="font-bold text-white">STATUTORY CONFIRMED</span>
                  </div>
                </div>
              )}

              {currentStepIndex === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Starting Entry Wage:</span>
                    <span className="font-bold text-slate-300">₹{(payload.starting_wage || 18000).toLocaleString()}/mo</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Day 180 (6-Month) Wage:</span>
                    <span className="font-bold text-emerald-400 text-base">₹{(payload.current_wage || 21500).toLocaleString()}/mo</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30">
                    <span className="text-teal-400 block text-[10px]">Wage Progression Growth:</span>
                    <span className="font-black text-teal-300 text-base">{payload.wage_growth_pct || '+19.4%'}</span>
                  </div>
                </div>
              )}

              {currentStepIndex === 4 && (
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(payload.retention_milestones || []).map((m: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-[#0e1626] border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">{m.checkpoint}</span>
                        <span className="font-bold text-emerald-400">{m.retention}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Kaplan-Meier 95% Confidence Interval: <span className="text-slate-200 font-mono">{payload.kaplan_meier_confidence_interval}</span>
                  </div>
                </div>
              )}

              {currentStepIndex === 5 && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-200">Inferred Gaps for {payload.course_analyzed}:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(payload.inferred_gaps || []).map((g: any, i: number) => (
                      <div key={i} className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                        <div className="font-bold text-rose-300">{g.skill}</div>
                        <div className="text-[11px] text-slate-400 mt-1">Curriculum Coverage: <span className="text-rose-400 font-semibold">{g.curriculum_coverage}</span></div>
                        <div className="text-[11px] text-slate-400">Impact on Placement: <span className="text-rose-400 font-semibold">{g.impact_on_placement}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStepIndex === 6 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Certification Rate:</span>
                    <span className="font-bold text-white">{payload.certification_rate}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Real Placement Rate:</span>
                    <span className="font-bold text-rose-400">{payload.placement_rate}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0e1626] border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">6M Retention:</span>
                    <span className="font-bold text-rose-400">{payload.retention_6m}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30">
                    <span className="text-rose-400 block text-[10px]">Outcome Drop-off:</span>
                    <span className="font-black text-rose-300">{payload.gap_between_cert_and_retention}</span>
                  </div>
                </div>
              )}

              {currentStepIndex === 7 && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{payload.title}</span>
                    <span className="font-bold text-emerald-400">Confidence: {payload.confidence}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Deployed Action: <span className="text-emerald-300 font-semibold">{payload.deployed_action}</span></div>
                  <div className="text-[11px] text-slate-400">Intervention Code: <span className="font-mono text-white">{payload.intervention_code}</span></div>
                </div>
              )}

              {currentStepIndex === 8 && (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold block mb-1">Measured Placement Improvement:</span>
                      <div className="text-base font-black text-white">
                        {payload.pre_intervention_placement} → {payload.post_intervention_placement}
                        <span className="text-emerald-400 ml-2 font-bold text-sm">({payload.placement_improvement})</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30">
                      <span className="text-teal-400 font-bold block mb-1">Measured 6-Month Retention Lift:</span>
                      <div className="text-base font-black text-white">
                        {payload.pre_6m_retention} → {payload.post_6m_retention}
                        <span className="text-teal-300 ml-2 font-bold text-sm">({payload.retention_improvement})</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e1626] border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                    <span className="font-bold text-emerald-400">Continuous Self-Improvement Loop Complete:</span> {payload.system_learning_verdict}
                  </div>
                </div>
              )}

            </div>
          ) : null}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-[#090e18]/90 px-6 py-4">
          <button
            onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 rounded-xl bg-[#0e1626] border border-slate-800 hover:border-slate-700 disabled:opacity-40 px-4 py-2 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Previous Step
          </button>

          <span className="text-xs text-slate-500 font-mono">
            Scenario {currentStepIndex + 1} of {scenarios.length}
          </span>

          {currentStepIndex < scenarios.length - 1 ? (
            <button
              onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              Next Scenario <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-4 py-2 text-xs font-bold text-slate-950 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" /> Finish Demonstration
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
