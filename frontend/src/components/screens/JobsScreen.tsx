import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, AlertCircle, UserCheck, 
  TrendingUp, ArrowRight, ShieldCheck, Zap, XCircle, Building2, Check, FileCheck 
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

export const JobsScreen: React.FC = () => {
  const { navigateToTrainee } = useFilterStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'open_jobs'>('overview');
  const [notification, setNotification] = useState<string | null>(null);

  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'v-1',
      name: 'Ramesh Patel',
      skillId: 'SKILL-IND-2025-100001',
      role: 'Solar Panel Installation Specialist',
      employer: 'Tata Power Renewables Ltd',
      startDate: '12 Dec 2024',
      salary: '₹19,500',
      signals: 'Signal 1 (Portal) + Signal 2 (OTP)',
      status: 'pending'
    },
    {
      id: 'v-2',
      name: 'Pooja Rawat',
      skillId: 'SKILL-IND-2025-100019',
      role: 'Apparel Stitching Lead',
      employer: 'Shahi Exports Pvt Ltd',
      startDate: '15 Jan 2025',
      salary: '₹16,000',
      signals: 'Signal 2 (OTP) + Signal 3 (Salary Slip)',
      status: 'pending'
    },
    {
      id: 'v-3',
      name: 'Anjali Sharma',
      skillId: 'SKILL-IND-2025-100008',
      role: 'General Duty Healthcare Assistant',
      employer: 'Apollo Hospitals Group',
      startDate: '20 Jan 2025',
      salary: '₹17,500',
      signals: 'Signal 1 (Direct API) + Signal 4 (Survey)',
      status: 'pending'
    }
  ]);

  const handleConfirm = (id: string, name: string) => {
    setPendingVerifications(prev => prev.filter(v => v.id !== id));
    setNotification(`Outcome verified with statutory multi-signal proof for ${name}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleBulkConfirm = () => {
    setPendingVerifications([]);
    setNotification(`1-Click Confirmed all pending employer records with multi-signal audit log!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const funnelStages = [
    { step: '01', label: 'Certified', count: '10,000', note: '100% Pass Rate' },
    { step: '02', label: 'Job Seeking', count: '2,500', note: 'Industry Matching' },
    { step: '03', label: 'Placed in Role', count: '7,500', note: '75.0% Placement' },
    { step: '04', label: 'Multi-Signal Verified', count: '6,900', note: '92.0% Confidence' },
    { step: '05', label: '6M Retained', count: '5,250', note: '70.0% Sustainable' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
              Employer Verification Network
            </span>
            <span className="text-xs text-slate-400">• NCVET Statutory Framework</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Employment Outcomes & Verification Queue</h1>
          <p className="text-xs text-slate-400">Multi-Signal outcome verification, employer confirmations, and 12-month retention funnel</p>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Placed</span>
          <div className="text-3xl font-black text-white">7,500</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>↑ 75.0% of certified cohort</span>
          </div>
        </div>

        <div className="metric-card space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Statutory Verified</span>
          <div className="text-3xl font-black text-emerald-400">6,900</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>92.0% multi-signal verified</span>
          </div>
        </div>

        <div className="metric-card space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">6-Month Retained</span>
          <div className="text-3xl font-black text-teal-300">5,250</div>
          <div className="text-[11px] text-teal-300 font-semibold">
            <span>70.0% longitudinal livelihood benchmark</span>
          </div>
        </div>

        <div className="metric-card space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Monthly Salary</span>
          <div className="text-3xl font-black text-cyan-300">₹18,450</div>
          <div className="text-[11px] text-cyan-300 font-semibold">
            <span>+17.4% wage growth at Day 180</span>
          </div>
        </div>
      </div>

      {/* Visual Employment Journey Funnel */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-white">The Verified Livelihood Pipeline</h2>
            <p className="text-xs text-slate-400 mt-0.5">End-to-end outcome conversion from certification to 1-year wage stability</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">10,000 Cohort Size</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {funnelStages.map((stage, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#090e18] border border-slate-800 text-center space-y-1.5 transition-all hover:border-emerald-500/30">
              <span className="text-[10px] font-mono text-slate-500 font-bold block">{stage.step}</span>
              <span className="text-xs font-bold text-slate-300 block">{stage.label}</span>
              <div className="text-xl font-black text-white">{stage.count}</div>
              <span className="text-[11px] text-emerald-400 block font-semibold">{stage.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Employer Verification Queue */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">Employer Statutory Verification Queue</h2>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                {pendingVerifications.length} Awaiting Signal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Reported employment records requiring multi-signal confidence confirmation</p>
          </div>

          {pendingVerifications.length > 0 && (
            <button
              onClick={handleBulkConfirm}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span>1-Click Bulk Multi-Signal Confirm</span>
            </button>
          )}
        </div>

        {pendingVerifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <p className="font-bold text-slate-200 text-sm">All Employer Outcome Records Verified</p>
            <p className="text-slate-400 text-xs">Zero verification backlog in national statutory queue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingVerifications.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#090e18] border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-xs">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">{item.skillId}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{item.role} • <strong className="text-white">{item.employer}</strong></p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                    <span>Started: {item.startDate}</span>
                    <span>•</span>
                    <span>Wage: <strong className="text-emerald-400 font-bold">{item.salary}</strong></span>
                    <span>•</span>
                    <span className="text-teal-300">{item.signals}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleConfirm(item.id, item.name)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-3.5 py-1.5 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Confirm 1-Click OTP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

