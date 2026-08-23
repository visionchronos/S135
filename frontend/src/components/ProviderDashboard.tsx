import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Search, Award, CheckSquare, 
  Briefcase, Filter, ChevronRight, FileCheck, AlertTriangle 
} from 'lucide-react';
import { ProviderOverview } from './provider/ProviderOverview';
import { ActionRequiredDesk } from './provider/ActionRequiredDesk';
import { CohortPerformanceGrid } from './provider/CohortPerformanceGrid';
import { EmployerQueuePanel } from './provider/EmployerQueuePanel';
import { api } from '../services/api';
import { TraineeRecord } from '../types';

interface ProviderDashboardProps {
  language: string;
  onSelectTrainee: (skillId: string) => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ language, onSelectTrainee }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'triage' | 'cohorts' | 'employers' | 'trainees'>('overview');
  const [trainees, setTrainees] = useState<TraineeRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrainees();
  }, [search]);

  const loadTrainees = async () => {
    try {
      setLoading(true);
      const res = await api.getTrainees(1, 8, search);
      setTrainees(res.items || []);
    } catch (err) {
      console.error('Failed to load trainees:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Provider Overview & Funnel
          </button>

          <button
            onClick={() => setActiveSubTab('triage')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'triage'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Action Required Desk</span>
            <span className="rounded-full bg-rose-500 text-white px-1.5 py-0.2 text-[10px] font-black">
              14
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('cohorts')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'cohorts'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Cohort Performance Grid
          </button>

          <button
            onClick={() => setActiveSubTab('employers')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'employers'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Employer Verification Queue
          </button>

          <button
            onClick={() => setActiveSubTab('trainees')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'trainees'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Candidate Directory
          </button>
        </div>
      </div>

      {/* SubTab Views */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <ProviderOverview />
          <ActionRequiredDesk />
        </div>
      )}

      {activeSubTab === 'triage' && <ActionRequiredDesk />}

      {activeSubTab === 'cohorts' && <CohortPerformanceGrid />}

      {activeSubTab === 'employers' && <EmployerQueuePanel />}

      {activeSubTab === 'trainees' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-white">Certified Trainee Outcome Directory</h3>
              <p className="text-xs text-slate-400 mt-0.5">Explore individual trainee Skill IDs, current livelihoods, and verification status</p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-1.5 border border-slate-800 text-xs">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidate name or skill ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-52"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Candidate & Skill ID</th>
                  <th className="pb-3 pr-4">Course Qualification</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Monthly Wage</th>
                  <th className="pb-3 pr-4">Verification Tier</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {trainees.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="font-extrabold text-white">{t.full_name}</div>
                      <div className="font-mono text-[10px] text-emerald-400">{t.skill_id}</div>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{t.course_name}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.current_status === 'EMPLOYED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {t.current_status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-bold text-white font-mono">
                      {t.current_wage > 0 ? `₹${t.current_wage.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 pr-4 text-teal-300 text-[11px] font-semibold">{t.verification_tier}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onSelectTrainee(t.skill_id)}
                        className="rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white px-2.5 py-1 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                      >
                        Inspect Passport →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
