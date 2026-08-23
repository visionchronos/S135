import React, { useState } from 'react';
import { 
  BarChart2, AlertTriangle, TrendingUp, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, ArrowRight, Sparkles, ShieldCheck, Scale, Cpu, Activity 
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

interface InsightItem {
  id: string;
  problem: string;
  evidence: string;
  possibleReason: string;
  recommendation: string;
  confidence: 'High' | 'Medium' | 'Low';
  whyExplanation: string[];
}

export const InsightsScreen: React.FC = () => {
  const { navigateToAction } = useFilterStore();
  const [expandedWhy, setExpandedWhy] = useState<string | null>('ins-1');

  const insights: InsightItem[] = [
    {
      id: 'ins-1',
      problem: 'Placement rate has fallen 12% in Data Entry courses',
      evidence: '52% placement this quarter vs 64% in the previous two cohorts across 1,240 graduates.',
      possibleReason: 'Regional employer hiring requirements have shifted from basic typing to PowerBI & spreadsheet automation.',
      recommendation: 'Update course curriculum to add 30 hours of practical PowerBI & Data Analytics.',
      confidence: 'High',
      whyExplanation: [
        'Based on 1,240 graduate records and 45 local employer job requisitions.',
        'Employers rejecting candidates specifically cited absent PowerBI & VLOOKUP assessment scores.',
        'Candidates who had prior spreadsheet experience had an 84% placement rate vs 42% for those without.',
        'Observed statistical relationship derived from multi-signal employer feedback logs.'
      ]
    },
    {
      id: 'ins-2',
      problem: '6-Month job turnover is 18% higher in Patna & Ranchi districts',
      evidence: 'Retention drops to 48% at Month 6 in these districts compared to the 70% national average.',
      possibleReason: 'Starting entry wages in local industrial clusters average ₹13,500/month, which is 22% below the district living cost benchmark.',
      recommendation: 'Institute employer minimum wage compliance standards and transport allowances.',
      confidence: 'High',
      whyExplanation: [
        'Based on 1,490 longitudinal wage records across 12 follow-up waves.',
        'Candidates earning under ₹14,000 had a 52% attrition rate within 90 days.',
        'Candidates earning ₹18,000+ had an 86% retention rate at 6 months.'
      ]
    },
    {
      id: 'ins-3',
      problem: 'Night shift transit deficit limits female healthcare placement in Tier-2 cities',
      evidence: 'Female retention in hospital General Duty Assistant roles drops 16% when safe night transport is absent.',
      possibleReason: 'Lack of safe municipal transit or dedicated employer shuttle between 9 PM and 6 AM.',
      recommendation: 'Partner with regional hospital networks to mandate safe transport or hostel subsidies.',
      confidence: 'Medium',
      whyExplanation: [
        'Derived from 340 conversational follow-up interviews with female healthcare graduates.',
        '64% of respondents who left hospital jobs cited safety and commuting distance.'
      ]
    }
  ];

  const fairnessDemographics = [
    { group: 'Gender Parity (Female vs Male)', dir: '0.98', status: 'Fair (Zero Bias)', threshold: '0.80 - 1.25' },
    { group: 'Social Category (SC/ST vs GEN)', dir: '0.99', status: 'Fair (Zero Bias)', threshold: '0.80 - 1.25' },
    { group: 'Social Category (OBC vs GEN)', dir: '1.01', status: 'Fair (Zero Bias)', threshold: '0.80 - 1.25' },
    { group: 'Geography (Rural vs Urban)', dir: '0.96', status: 'Fair (Zero Bias)', threshold: '0.80 - 1.25' }
  ];

  const skillDemandSupply = [
    { skill: 'PowerBI & Spreadsheet Automation', demand: 'High Demand', supply: 'Low Supply', gap: 'Critical Deficit', status: 'critical' },
    { skill: 'Solar PV Grid-Tie Inverter Sync', demand: 'High Demand', supply: 'Moderate Supply', gap: 'Deficit', status: 'attention' },
    { skill: 'EV Battery Pack Maintenance', demand: 'High Demand', supply: 'Low Supply', gap: 'Critical Deficit', status: 'critical' },
    { skill: 'General Electrical Safety', demand: 'High Demand', supply: 'Good Supply', gap: 'Balanced', status: 'good' },
    { skill: 'Apparel Sewing & Tailoring', demand: 'Medium Demand', supply: 'Good Supply', gap: 'Balanced', status: 'good' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
              Explainable AI & Governance
            </span>
            <span className="text-xs text-slate-400">• IEEE 7000 Algorithmic Standards</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Explainable AI & Fairness Auditing</h1>
          <p className="text-xs text-slate-400">Actionable intelligence distilled from 10,000 trainee lifecycles, demographic parity audits, and skill gap discovery</p>
        </div>
      </div>

      {/* Algorithmic Fairness & Model Governance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Demographic Parity</span>
            <Scale className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">100% Passed</div>
          <p className="text-[11px] text-slate-400">Disparate Impact Ratio across all 6 demographic tiers strictly within [0.80 - 1.25] benchmark.</p>
        </div>

        <div className="metric-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Predictor</span>
            <Cpu className="h-4 w-4 text-cyan-300" />
          </div>
          <div className="text-3xl font-black text-cyan-300">0.89 AUC-ROC</div>
          <p className="text-[11px] text-slate-400">Gradient Boosting model calibrated on longitudinal wage & attendance signals with feature explainability.</p>
        </div>

        <div className="metric-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data Drift Metric</span>
            <Activity className="h-4 w-4 text-teal-300" />
          </div>
          <div className="text-3xl font-black text-teal-300">KS = 0.042</div>
          <p className="text-[11px] text-slate-400">Kolmogorov-Smirnov feature drift test confirms stable distribution between training and inference cohorts.</p>
        </div>
      </div>

      {/* Fairness Audit Scorecard */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-white">Demographic Fairness Audit (Disparate Impact Ratio)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Auditing AI models across Social Categories (SC/ST/OBC/GEN), Gender, and Rural/Urban geographies</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/25">
            <ShieldCheck className="h-3.5 w-3.5" /> Zero Bias Certified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {fairnessDemographics.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block leading-tight">{item.group}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400 font-mono">{item.dir}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{item.status}</span>
              </div>
              <span className="text-[10px] text-slate-500 block font-mono">Standard Range: {item.threshold}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-white">Longitudinal Root Cause Discoveries</h2>
        {insights.map((item) => {
          const isWhyOpen = expandedWhy === item.id;

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-amber-400 font-bold text-sm">⚠️</span>
                  <h3 className="text-base font-extrabold text-white">{item.problem}</h3>
                </div>

                <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                  Confidence Score: <strong className="text-emerald-400">{item.confidence}</strong>
                </span>
              </div>

              {/* Evidence, Reason, Recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Observed Evidence</span>
                  <p className="text-slate-200 leading-relaxed">{item.evidence}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Root Cause Analysis</span>
                  <p className="text-slate-200 leading-relaxed">{item.possibleReason}</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-[#0e222a] border border-emerald-500/40 space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Policy Action</span>
                  <p className="text-emerald-200 font-semibold leading-relaxed">{item.recommendation}</p>
                </div>
              </div>

              {/* "Why are we showing this?" Accordion */}
              <div className="pt-1">
                <button
                  onClick={() => setExpandedWhy(isWhyOpen ? null : item.id)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isWhyOpen ? 'Hide statistical methodology & sample weights' : 'Why are we showing this? (See sample methodology & feature weights)'}</span>
                  {isWhyOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                {isWhyOpen && (
                  <div className="mt-3 p-4 rounded-xl bg-[#090e18] border border-slate-800 text-xs space-y-2 animate-fade-in">
                    <span className="font-extrabold text-white block">Statistical correlation & dataset attribution:</span>
                    <ul className="space-y-1 text-slate-300 list-disc pl-4 leading-relaxed">
                      {item.whyExplanation.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills in Demand vs Supply Comparison */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-white">Dynamic Skill Gap Discovery & Labor Market Alignment</h2>
            <p className="text-xs text-slate-400 mt-0.5">Triangulated from active employer job requisitions vs Course Qualification Packs (QP-NOS)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-[#090e18]">
                <th className="py-3 px-4">Competency / Skill Taxonomy</th>
                <th className="py-3 px-4">Industry Demand</th>
                <th className="py-3 px-4">Trained Supply Volume</th>
                <th className="py-3 px-4">Curriculum Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {skillDemandSupply.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-white">{s.skill}</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-semibold">{s.demand}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{s.supply}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      s.status === 'critical'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : s.status === 'attention'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {s.gap}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigateToAction('act-1')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                    >
                      Deploy Module →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

