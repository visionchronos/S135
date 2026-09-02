import React, { useState } from 'react';
import { 
  BookOpen, Users, Award, TrendingUp, CheckCircle2, 
  AlertCircle, AlertTriangle, ArrowRight, ArrowLeft, Building2, Sparkles, Check, Zap 
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

interface CourseOverviewData {
  id: string;
  qpCode: string;
  nsqfLevel: number;
  name: string;
  sector: string;
  trainees: number;
  certifiedPct: number;
  gotJobsPct: number;
  retentionPct: number;
  status: 'good' | 'attention' | 'critical';
  workingPoints: string[];
  attentionPoints: string[];
  recommendedAction: string;
  actionId: string;
}

export const TrainingScreen: React.FC = () => {
  const { selectedCourseId, navigateToCourse } = useFilterStore();
  const [selectedCourse, setSelectedCourse] = useState<CourseOverviewData | null>(null);
  const [isInterventionDeployed, setIsInterventionDeployed] = useState(false);

  const courses: CourseOverviewData[] = [
    {
      id: 'c-web',
      qpCode: 'QP-NOS SGJ/Q0101',
      nsqfLevel: 4,
      name: 'Domestic Data Entry & Spreadsheet Analytics',
      sector: 'IT-ITeS',
      trainees: 1240,
      certifiedPct: 88,
      gotJobsPct: 52,
      retentionPct: 44,
      status: 'critical',
      workingPoints: [
        'High batch completion rate (88% pass rate across theory & practicals)',
        'Standard biometric attendance compliance verified'
      ],
      attentionPoints: [
        'Placement has fallen 12% across the last 3 national cohorts',
        'Employers report candidates lack modern spreadsheet automation & PowerBI skills'
      ],
      recommendedAction: 'Add 30-hour practical PowerBI & Data Analytics module to the course curriculum.',
      actionId: 'act-1'
    },
    {
      id: 'c-solar',
      qpCode: 'QP-NOS ELE/Q5801',
      nsqfLevel: 4,
      name: 'Solar Panel Installation Technician',
      sector: 'Green Energy / Solar',
      trainees: 980,
      certifiedPct: 94,
      gotJobsPct: 86,
      retentionPct: 82,
      status: 'good',
      workingPoints: [
        'Top industry placement benchmark (86% placed within 30 days)',
        'Strong statutory employer partnership with Tata Power Renewables',
        'High 6-month livelihood retention (82%)'
      ],
      attentionPoints: [
        'High-voltage battery storage maintenance skills needed for commercial rooftop expansion'
      ],
      recommendedAction: 'Scale annual batch capacity by +25% in western districts.',
      actionId: 'act-3'
    },
    {
      id: 'c-gda',
      qpCode: 'QP-NOS HSS/Q5101',
      nsqfLevel: 4,
      name: 'General Duty Assistant (Healthcare)',
      sector: 'Healthcare',
      trainees: 850,
      certifiedPct: 91,
      gotJobsPct: 78,
      retentionPct: 69,
      status: 'attention',
      workingPoints: [
        'High healthcare hospital placement absorption (78%)',
        'Strong clinical bedside practical scores'
      ],
      attentionPoints: [
        '6-month job retention dips due to night commute & hostel accommodation constraints'
      ],
      recommendedAction: 'Implement employer safe night commute stipend partnership.',
      actionId: 'act-2'
    },
    {
      id: 'c-auto',
      qpCode: 'QP-NOS ASC/Q1402',
      nsqfLevel: 5,
      name: 'Automotive Mechatronics Specialist',
      sector: 'Automotive',
      trainees: 760,
      certifiedPct: 89,
      gotJobsPct: 68,
      retentionPct: 63,
      status: 'attention',
      workingPoints: [
        'Solid mechanical precision training on CNC lathes & diagnostics'
      ],
      attentionPoints: [
        'Transitioning industry demand requires Electric Vehicle (EV) battery pack diagnostics'
      ],
      recommendedAction: 'Deploy 40-hour EV powertrain bridge bootcamp.',
      actionId: 'act-1'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Course Detail View */}
      {selectedCourse ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-xs font-bold text-[#0a66c2] hover:bg-[#e8f3fc] dark:hover:bg-[#0a66c2]/20 transition-colors cursor-pointer px-3.5 py-1.5 rounded-full border border-[#0a66c2]/40"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Training Catalog</span>
          </button>

          {/* Top Overview Card */}
          <div className="linkedin-card p-6 sm:p-7 bg-white dark:bg-[#1b1f23] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#0a66c2] bg-[#e8f3fc] dark:bg-[#0a66c2]/20 px-2 py-0.5 rounded border border-[#0a66c2]/30">
                    {selectedCourse.qpCode}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">• NSQF Level {selectedCourse.nsqfLevel} • {selectedCourse.sector}</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">{selectedCourse.name}</h1>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                selectedCourse.status === 'good'
                  ? 'bg-emerald-50 text-[#057642] border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
              }`}>
                {selectedCourse.status === 'good' ? 'Benchmark Achieved' : 'Action Required'}
              </span>
            </div>

            {/* 4 Outcome Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Enrolled</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">{selectedCourse.trainees}</span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Certified</span>
                <span className="text-2xl font-black text-[#0a66c2] mt-1 block">{selectedCourse.certifiedPct}%</span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Placement Rate</span>
                <span className="text-2xl font-black text-[#057642] mt-1 block">{selectedCourse.gotJobsPct}%</span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">6M Retention</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1 block">{selectedCourse.retentionPct}%</span>
              </div>
            </div>
          </div>

          {/* What is Working & What Needs Attention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* What is working */}
            <div className="linkedin-card p-6 bg-white dark:bg-[#1b1f23] space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#057642]" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Cohort Strengths</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {selectedCourse.workingPoints.map((pt, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-[#057642] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What needs attention */}
            <div className="linkedin-card p-6 bg-white dark:bg-[#1b1f23] space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Identified Curriculum Deficits</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {selectedCourse.attentionPoints.map((pt, i) => (
                  <div key={i} className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recommended Action Card */}
          <div className="p-6 rounded-xl bg-[#e8f3fc] dark:bg-[#0a66c2]/15 border border-[#0a66c2]/30 space-y-4 shadow-xs">
            <span className="text-xs font-bold text-[#0a66c2] uppercase tracking-wider block">Targeted Closed-Loop Policy Intervention</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              {selectedCourse.recommendedAction}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsInterventionDeployed(!isInterventionDeployed)}
                className={`linkedin-btn-primary inline-flex items-center gap-2 cursor-pointer ${
                  isInterventionDeployed
                    ? 'bg-[#057642] hover:bg-[#046235]'
                    : ''
                }`}
              >
                <Zap className="h-4 w-4" />
                <span>{isInterventionDeployed ? 'Intervention Active & Queued' : 'Deploy Policy Intervention'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              {isInterventionDeployed && (
                <span className="text-xs text-[#057642] font-bold animate-fade-in">
                  ✓ Transmitted to NCVET & Sector Skill Council
                </span>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Courses Overview List */
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Qualification Packs & Training Outcomes</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Track qualification completion, verified employment, and curriculum alignment across Maharashtra QP-NOS codes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCourse(c)}
                className="linkedin-card p-6 bg-white dark:bg-[#1b1f23] hover:border-[#0a66c2]/50 transition-all duration-200 cursor-pointer space-y-4 shadow-xs hover:shadow-md group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#0a66c2] bg-[#e8f3fc] dark:bg-[#0a66c2]/20 px-2 py-0.5 rounded border border-[#0a66c2]/30">
                        {c.qpCode}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{c.sector}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-[#0a66c2] transition-colors mt-1.5">{c.name}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    c.status === 'good'
                      ? 'bg-emerald-50 text-[#057642] border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    {c.status === 'good' ? 'Benchmark Met' : 'Attention'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Trainees</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{c.trainees}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Certified</span>
                    <span className="font-bold text-[#0a66c2] mt-0.5 block">{c.certifiedPct}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Placement</span>
                    <span className="font-bold text-[#057642] mt-0.5 block">{c.gotJobsPct}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Retention</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400 mt-0.5 block">{c.retentionPct}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-xs">{c.recommendedAction}</span>
                  <span className="font-bold text-[#0a66c2] group-hover:underline inline-flex items-center gap-1">
                    Diagnosis →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

