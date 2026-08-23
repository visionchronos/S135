import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft, 
  Sparkles, ShieldCheck, TrendingUp, Zap, Clock, X, Check, Target, RefreshCw 
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

interface ActionItem {
  id: string;
  title: string;
  target: string;
  priority: 'High' | 'Medium' | 'Normal';
  problem: string;
  evidence: string;
  possibleReason: string;
  recommendedAction: string;
  expectedOutcome: string;
  beforeMetric: string;
  targetMetric: string;
  reviewAfter: string;
  status: 'PENDING' | 'DEPLOYED' | 'EVALUATED_SUCCESS';
}

export const ActionsScreen: React.FC = () => {
  const { selectedActionId, navigateToAction } = useFilterStore();
  const [actions, setActions] = useState<ActionItem[]>([
    {
      id: 'act-1',
      title: 'Update Domestic Data Entry Curriculum with PowerBI Module',
      target: 'IT-ITeS • National QP-NOS SGJ/Q0101',
      priority: 'High',
      problem: 'Placement rate dropped 12% across the last three cohort cycles.',
      evidence: '42% placement in Q4 vs 54% historical benchmark. 45 regional employers cited absent data analytics & modern spreadsheet skills.',
      possibleReason: 'Industry employers have automated basic data entry and now require PowerBI and automated Google Sheets/Excel.',
      recommendedAction: 'Add a mandatory 30-hour practical module in PowerBI, Pivot Tables, and automated Google Sheets to QP-NOS curriculum.',
      expectedOutcome: 'Placement rate projected to recover by +15% to 57% in subsequent training cohort.',
      beforeMetric: 'Placement = 42%',
      targetMetric: 'Placement = 57%+',
      reviewAfter: 'Next 2 training batches (60 days)',
      status: 'PENDING'
    },
    {
      id: 'act-2',
      title: 'Standardize Starting Wage Benchmarks in Patna & Ranchi',
      target: 'Patna & Ranchi Industrial Clusters',
      priority: 'High',
      problem: 'High candidate job turnover within the first 90 days (52% attrition).',
      evidence: 'Average starting wages of ₹13,500/mo are 22% below the district living wage index.',
      possibleReason: 'Candidates leave jobs quickly when pay does not cover urban transit and food costs.',
      recommendedAction: 'Require partner employers to adhere to minimum ₹16,500 statutory compensation or provide transit allowance.',
      expectedOutcome: '6-Month livelihood retention will improve from 48% → 65%.',
      beforeMetric: '6M Retention = 48%',
      targetMetric: '6M Retention = 65%+',
      reviewAfter: 'Next follow-up wave (90 days)',
      status: 'PENDING'
    },
    {
      id: 'act-3',
      title: 'Scale Solar Rooftop Technician Capacity in Western Region',
      target: 'Green Energy / Solar • Gujarat & Maharashtra',
      priority: 'Medium',
      problem: 'Employer hiring demand for certified solar technicians exceeds current batch supply by 800 candidates.',
      evidence: '2,300 active employer requisitions vs 1,500 trained candidates available.',
      possibleReason: 'Rapid expansion of commercial rooftop solar under PM Surya Ghar Muft Bijli Yojana.',
      recommendedAction: 'Authorise 15 additional accredited training centers in Tier-2 districts.',
      expectedOutcome: 'Certified candidate supply will meet employer hiring demand with 88%+ verified placement.',
      beforeMetric: 'Supply Deficit = -800',
      targetMetric: 'Deficit = 0 (Balanced)',
      reviewAfter: 'Q1-FY26',
      status: 'PENDING'
    }
  ]);

  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleDeploy = (id: string) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'DEPLOYED' } : a));
    setNotification('Policy intervention deployed to accredited training centers & registered in closed-loop audit ledger.');
    setSelectedAction(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
              Closed-Loop Policy Engine
            </span>
            <span className="text-xs text-slate-400">• Evidence-Based Self-Improvement</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Policy Interventions & Closed-Loop Tracker</h1>
          <p className="text-xs text-slate-400">
            Formulate, deploy, and verify evidence-based policy & curriculum interventions with measurable pre/post cohort impact delta
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2.5 animate-fade-in shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Action Detail View */}
      {selectedAction ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedAction(null)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-[#0e1626] border border-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Policy Actions Queue</span>
          </button>

          <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-gradient-to-br from-[#0e1626] via-[#0b1322] to-[#070c16] space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 block w-fit">
                  {selectedAction.target}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1.5">{selectedAction.title}</h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                Priority: {selectedAction.priority}
              </span>
            </div>

            {/* 6 Structured Review Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">1. Diagnosed Problem</span>
                <p className="text-slate-200 font-semibold leading-relaxed">{selectedAction.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">2. Empirical Evidence</span>
                <p className="text-slate-200 leading-relaxed">{selectedAction.evidence}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">3. Root Cause Analysis</span>
                <p className="text-slate-200 leading-relaxed">{selectedAction.possibleReason}</p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-[#0e222a] border border-emerald-500/40 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">4. Targeted Policy Action</span>
                <p className="text-emerald-100 font-bold leading-relaxed">{selectedAction.recommendedAction}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">5. Target Livelihood Lift</span>
                <p className="text-slate-200 leading-relaxed">{selectedAction.expectedOutcome}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">6. Pre vs Post Milestone</span>
                <div className="flex items-center justify-between font-mono font-bold text-xs pt-1">
                  <span className="text-slate-400">Baseline: <strong className="text-white">{selectedAction.beforeMetric}</strong></span>
                  <span className="text-emerald-400">Target: <strong className="text-emerald-300">{selectedAction.targetMetric}</strong></span>
                </div>
                <span className="text-[10px] text-slate-500 block font-mono">Evaluation Wave: {selectedAction.reviewAfter}</span>
              </div>
            </div>

            {/* Action Deployment Button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedAction(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDeploy(selectedAction.id)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <Zap className="h-4 w-4 text-amber-300" />
                <span>Deploy Intervention to Training Centers</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Actions List */
        <div className="space-y-4">
          {actions.map((act) => (
            <div
              key={act.id}
              className="p-6 rounded-2xl bg-[#0e1626]/80 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-200 space-y-4 shadow-xl backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                    {act.target}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1.5">{act.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    {act.priority} Priority
                  </span>
                  {act.status === 'DEPLOYED' && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      ✓ Active Monitoring
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#090e18] border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Diagnosed Problem</span>
                  <p className="text-slate-200 mt-1">{act.problem}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090e18] border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Root Cause Analysis</span>
                  <p className="text-slate-200 mt-1">{act.possibleReason}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-[#0e222a] border border-emerald-500/40 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block">Action & Expected Lift</span>
                  <p className="text-emerald-100 font-semibold mt-1">{act.recommendedAction}</p>
                </div>
              </div>

              <div className="flex items-center justify-end pt-1">
                <button
                  onClick={() => setSelectedAction(act)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <span>Review & Deploy Policy Action</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Self-Improving Platform Loop Visualization */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Closed-Loop Self-Improving Policy Learning Cycle</h2>
              <p className="text-xs text-slate-400">The platform measures intervention outcomes and automatically refines future recommendations</p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/25">
            Active Feedback Loop
          </span>
        </div>

        {/* 5-Step Visual Loop Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">1. Intervention</span>
            <span className="font-extrabold text-white block">PowerBI & Spreadsheet Automation</span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">2. Next Cohort</span>
            <span className="font-extrabold text-cyan-300 block">340 Candidates Trained</span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">3. 6M Retention</span>
            <span className="font-extrabold text-emerald-400 block">44% → 66.2% (+22.2% Lift)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">4. Outcome</span>
            <span className="font-extrabold text-teal-300 block">Sustainable Livelihood Achieved</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/50 to-[#0e222a] border border-emerald-500/40 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase block">5. Model Learning</span>
            <span className="font-extrabold text-white block">Confidence Boosted to 96%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="leading-relaxed">
            <strong>System Memory Log:</strong> The platform empirically verified that adding 30 hours of practical data analytics produced a <strong>+24.5% placement lift</strong> and <strong>+22.2% 6-month retention gain</strong>.
          </span>
          <span className="font-mono text-emerald-400 font-bold shrink-0">
            Impact Delta: +24.5%
          </span>
        </div>
      </div>

    </div>
  );
};

