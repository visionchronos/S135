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
  const { selectedCourseId, navigateToCourse, navigateToAction } = useFilterStore();
  const [selectedCourse, setSelectedCourse] = useState<CourseOverviewData | null>(null);

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
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-[#0e1626] border border-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Training Catalog</span>
          </button>

          {/* Top Overview Card */}
          <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-gradient-to-br from-[#0e1626] via-[#0b1322] to-[#070c16] space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                    {selectedCourse.qpCode}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• NSQF Level {selectedCourse.nsqfLevel} • {selectedCourse.sector}</span>
                </div>
                <h1 className="text-2xl font-black text-white mt-1.5">{selectedCourse.name}</h1>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                selectedCourse.status === 'good'
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              }`}>
                {selectedCourse.status === 'good' ? 'Benchmark Achieved' : 'Action Required'}
              </span>
            </div>

            {/* 4 Outcome Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Enrolled</span>
                <span className="text-2xl font-black text-white mt-1 block">{selectedCourse.trainees}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Certified</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{selectedCourse.certifiedPct}%</span>
              </div>
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Placement Rate</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{selectedCourse.gotJobsPct}%</span>
              </div>
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">6M Retention</span>
                <span className="text-2xl font-black text-teal-300 mt-1 block">{selectedCourse.retentionPct}%</span>
              </div>
            </div>
          </div>

          {/* What is Working & What Needs Attention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* What is working */}
            <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">Cohort Strengths</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                {selectedCourse.workingPoints.map((pt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#090e18] border border-slate-800/80 flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What needs attention */}
            <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-extrabold text-white">Identified Curriculum Deficits</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                {selectedCourse.attentionPoints.map((pt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#090e18] border border-amber-500/20 flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recommended Action Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0e1f2b] to-[#0a1520] border border-emerald-500/40 space-y-4 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Targeted Closed-Loop Policy Intervention</span>
            <p className="text-sm font-extrabold text-white leading-relaxed">
              {selectedCourse.recommendedAction}
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateToAction(selectedCourse.actionId)}
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <Zap className="h-4 w-4 text-amber-300" />
                <span>Deploy Policy Intervention</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* Courses Overview List */
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">Qualification Packs & Training Outcomes</h1>
            <p className="text-xs text-slate-400">Track qualification completion, verified employment, and curriculum alignment across national QP-NOS codes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCourse(c)}
                className="p-6 rounded-2xl bg-[#0e1626]/80 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer space-y-4 shadow-lg backdrop-blur-md group hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                        {c.qpCode}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{c.sector}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors mt-1.5">{c.name}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    c.status === 'good'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}>
                    {c.status === 'good' ? 'Benchmark Met' : 'Attention'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs py-2.5 bg-[#090e18] rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Trainees</span>
                    <span className="font-extrabold text-white mt-0.5 block">{c.trainees}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Certified</span>
                    <span className="font-extrabold text-cyan-400 mt-0.5 block">{c.certifiedPct}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Placement</span>
                    <span className="font-extrabold text-emerald-400 mt-0.5 block">{c.gotJobsPct}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Retention</span>
                    <span className="font-extrabold text-teal-300 mt-0.5 block">{c.retentionPct}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                  <span className="text-slate-400 text-[11px] truncate max-w-xs">{c.recommendedAction}</span>
                  <span className="font-bold text-emerald-400 group-hover:translate-x-0.5 inline-flex items-center gap-1 transition-transform">
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

