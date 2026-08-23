import React, { useState, useEffect } from 'react';
import { 
  Award, TrendingUp, Radio, ShieldCheck, 
  Search, RefreshCw, User 
} from 'lucide-react';
import { SkillPassport } from './trainee/SkillPassport';
import { CareerTracker } from './trainee/CareerTracker';
import { ConversationalFollowUp } from './trainee/ConversationalFollowUp';
import { ConsentControlCenter } from './trainee/ConsentControlCenter';
import { api } from '../services/api';
import { TraineeDetailData } from '../types';

interface TraineePassportProps {
  language: string;
  initialSkillId?: string;
}

export const TraineePassport: React.FC<TraineePassportProps> = ({ language, initialSkillId = 'SKILL-IND-2025-100000' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'passport' | 'tracker' | 'followup' | 'consent'>('passport');
  const [skillIdInput, setSkillIdInput] = useState(initialSkillId);
  const [traineeData, setTraineeData] = useState<TraineeDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrainee(initialSkillId);
  }, [initialSkillId]);

  const loadTrainee = async (targetId: string) => {
    try {
      setLoading(true);
      const data = await api.getTraineeDetail(targetId);
      setTraineeData(data);
    } catch (err) {
      console.error('Failed to load trainee passport detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillIdInput.trim()) {
      loadTrainee(skillIdInput.trim());
    }
  };

  const defaultTrainee: TraineeDetailData = {
    id: '8999682d-364b-4a53-a25e-d241ac131a0a',
    skill_id: 'SKILL-IND-2025-100000',
    full_name: 'Gaurav Yadav',
    gender: 'MALE',
    dob: '2002-05-14',
    district: 'Ahmedabad',
    state: 'Gujarat',
    current_status: 'EMPLOYED',
    created_at: '2024-09-01',
    profile: {
      id: '8999682d-364b-4a53-a25e-d241ac131a0a',
      skill_id: 'SKILL-IND-2025-100000',
      full_name: 'Gaurav Yadav',
      gender: 'MALE',
      dob: '2002-05-14',
      district: 'Ahmedabad',
      state: 'Gujarat',
      current_status: 'EMPLOYED',
      created_at: '2024-09-01'
    },
    course: {
      course_name: 'Solar Panel Installation Technician',
      qp_code: 'SGJ/Q0101',
      sector: 'Green Energy / Solar',
      nsqf_level: 4,
      provider_name: 'Tata Strive Skill Development',
      training_centre_name: 'Ahmedabad Green Tech Hub',
      batch_start: '2024-09-01',
      batch_end: '2024-11-30'
    },
    assessment: {
      theory_score: 86,
      practical_score: 94,
      total_score: 90,
      grade: 'DISTINCTION',
      assessment_date: '2024-12-01',
      assessor_agency: 'Skill Council for Green Jobs (SCGJ)'
    }
  };

  const trainee = traineeData || defaultTrainee;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Search & Trainee Quick Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">Trainee Digital Portal & Skill ID</h2>
          <p className="text-xs text-slate-400 mt-0.5">Portable skills credential, longitudinal wage progression, and AI conversational follow-up</p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-200">
            <Search className="h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={skillIdInput}
              onChange={(e) => setSkillIdInput(e.target.value)}
              placeholder="Enter Skill ID (e.g. SKILL-IND-2025-100000)..."
              className="bg-transparent focus:outline-none w-56 font-mono text-xs text-emerald-400 placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Load
          </button>
        </form>
      </div>

      {/* SubTab Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('passport')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'passport'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          <span>Skill Passport Credential</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tracker')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'tracker'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Career & Wage Tracker</span>
        </button>

        <button
          onClick={() => setActiveSubTab('followup')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'followup'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span>Conversational Follow-Up</span>
        </button>

        <button
          onClick={() => setActiveSubTab('consent')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'consent'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Consent & Privacy Vault</span>
        </button>
      </div>

      {/* View Rendering */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">
          <RefreshCw className="h-6 w-6 animate-spin text-emerald-400 mx-auto mb-2" />
          Loading trainee passport & telemetry records...
        </div>
      ) : (
        <>
          {activeSubTab === 'passport' && <SkillPassport trainee={trainee} />}
          {activeSubTab === 'tracker' && <CareerTracker trainee={trainee} />}
          {activeSubTab === 'followup' && <ConversationalFollowUp trainee={trainee} language={language} />}
          {activeSubTab === 'consent' && <ConsentControlCenter trainee={trainee} />}
        </>
      )}

    </div>
  );
};
