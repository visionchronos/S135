import React, { useState } from 'react';
import { UserCheck, Award, TrendingUp, Briefcase } from 'lucide-react';
import { VerificationHub } from './employer/VerificationHub';
import { ApprenticeshipTracker } from './employer/ApprenticeshipTracker';
import { DemandForecastPortal } from './employer/DemandForecastPortal';

interface EmployerPortalProps {
  language: string;
}

export const EmployerPortal: React.FC<EmployerPortalProps> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'verification' | 'apprenticeships' | 'demand'>('verification');

  return (
    <div className="space-y-8 pb-12">
      
      {/* SubTab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('verification')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'verification'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>Statutory Verification Hub</span>
            <span className="rounded-full bg-emerald-500 text-slate-950 px-1.5 py-0.2 text-[10px] font-black">
              3
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('apprenticeships')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'apprenticeships'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>NAPS / NATS Apprenticeship Tracker</span>
          </button>

          <button
            onClick={() => setActiveSubTab('demand')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'demand'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Hiring Demand Forecast</span>
          </button>
        </div>
      </div>

      {/* SubTab Views */}
      {activeSubTab === 'verification' && <VerificationHub />}
      {activeSubTab === 'apprenticeships' && <ApprenticeshipTracker />}
      {activeSubTab === 'demand' && <DemandForecastPortal />}

    </div>
  );
};
