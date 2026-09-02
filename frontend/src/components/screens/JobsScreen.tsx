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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="linkedin-badge">
              Maharashtra Employer Verification Network
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">• NCVET & DPDP Framework</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Employment Outcomes & Verification Queue</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Multi-Signal outcome verification, employer confirmations, and 12-month retention funnel</p>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="linkedin-card p-5 space-y-2 bg-white dark:bg-[#1b1f23]">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Placed</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">7,500</div>
          <div className="text-[11px] text-[#057642] font-semibold flex items-center gap-1">
            <span>↑ 75.0% of certified cohort</span>
          </div>
        </div>

        <div className="linkedin-card p-5 space-y-2 bg-white dark:bg-[#1b1f23]">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Statutory Verified</span>
          <div className="text-3xl font-black text-[#0a66c2]">6,900</div>
          <div className="text-[11px] text-[#0a66c2] font-semibold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>92.0% multi-signal verified</span>
          </div>
        </div>

        <div className="linkedin-card p-5 space-y-2 bg-white dark:bg-[#1b1f23]">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">6-Month Retained</span>
          <div className="text-3xl font-black text-[#057642]">5,250</div>
          <div className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold">
            <span>70.0% longitudinal livelihood benchmark</span>
          </div>
        </div>

        <div className="linkedin-card p-5 space-y-2 bg-white dark:bg-[#1b1f23]">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Average Monthly Salary</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">₹18,450</div>
          <div className="text-[11px] text-[#0a66c2] font-semibold">
            <span>+17.4% wage growth at Day 180</span>
          </div>
        </div>
      </div>

      {/* Visual Employment Journey Funnel */}
      <div className="linkedin-card p-6 sm:p-7 bg-white dark:bg-[#1b1f23] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">The Verified Livelihood Pipeline</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">End-to-end outcome conversion from certification to 1-year wage stability</p>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">10,000 Cohort Size</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {funnelStages.map((stage, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1.5 transition-all hover:border-[#0a66c2]/40">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold block">{stage.step}</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{stage.label}</span>
              <div className="text-xl font-black text-slate-900 dark:text-white">{stage.count}</div>
              <span className="text-[11px] text-[#057642] block font-bold">{stage.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-[#057642] shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Employer Verification Queue */}
      <div className="linkedin-card p-6 sm:p-7 bg-white dark:bg-[#1b1f23] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900 dark:text-white">Employer Statutory Verification Queue</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300">
                {pendingVerifications.length} Awaiting Signal
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reported employment records requiring multi-signal confidence confirmation</p>
          </div>

          {pendingVerifications.length > 0 && (
            <button
              onClick={handleBulkConfirm}
              className="linkedin-btn-primary flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>1-Click Bulk Multi-Signal Confirm</span>
            </button>
          )}
        </div>

        {pendingVerifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 space-y-2">
            <CheckCircle2 className="h-8 w-8 text-[#057642] mx-auto" />
            <p className="font-bold text-slate-900 dark:text-white text-sm">All Employer Outcome Records Verified</p>
            <p className="text-slate-500 text-xs">Zero verification backlog in Maharashtra statutory queue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingVerifications.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-[#0a66c2]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">{item.skillId}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.role} • <strong className="text-slate-900 dark:text-white font-bold">{item.employer}</strong></p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                    <span>Started: {item.startDate}</span>
                    <span>•</span>
                    <span>Wage: <strong className="text-slate-900 dark:text-white font-bold">{item.salary}</strong></span>
                    <span>•</span>
                    <span className="text-[#0a66c2] font-semibold">{item.signals}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleConfirm(item.id, item.name)}
                    className="linkedin-btn-primary flex items-center gap-1.5 cursor-pointer"
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

