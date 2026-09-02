import React, { useState, useEffect } from 'react';
import { 
  Search, Users, Briefcase, CheckCircle2, AlertCircle, 
  ArrowLeft, ExternalLink, TrendingUp, Sparkles, ShieldCheck, 
  Clock, Award, MessageSquare, ChevronRight, Mic, QrCode, FileText, Check
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { useFilterStore } from '../../store/useFilterStore';
import { api } from '../../services/api';
import { TraineeRecord, TraineeDetailData } from '../../types';

export const TraineesScreen: React.FC = () => {
  const { selectedTraineeId, navigateToTrainee, language } = useFilterStore();
  const [trainees, setTrainees] = useState<TraineeRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EMPLOYED' | 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'APPRENTICE'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeDetailData | null>(null);
  const [followupStep, setFollowupStep] = useState<number>(0);
  const [followupAnswer, setFollowupAnswer] = useState<string>('');
  const [followupSubmitted, setFollowupSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrainees();
  }, [search]);

  useEffect(() => {
    if (selectedTraineeId) {
      loadTraineeDetail(selectedTraineeId);
    }
  }, [selectedTraineeId]);

  const loadTrainees = async () => {
    try {
      setLoading(true);
      const res = await api.getTrainees(1, 20, search);
      setTrainees(res.items || []);
    } catch (err) {
      console.error('Failed to load trainees:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTraineeDetail = async (idOrSkillId: string) => {
    try {
      const data = await api.getTraineeDetail(idOrSkillId);
      setSelectedTrainee(data);
    } catch (err) {
      console.error('Failed to load trainee detail:', err);
    }
  };

  const filteredTrainees = trainees.filter(t => {
    if (activeFilter === 'ALL') return true;
    return t.current_status === activeFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EMPLOYED':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/25">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Employed
          </span>
        );
      case 'UNEMPLOYED':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/25">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            Seeking Job
          </span>
        );
      case 'SELF_EMPLOYED':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/25">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            Self-Employed
          </span>
        );
      case 'APPRENTICE':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-md border border-teal-500/25">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
            Apprentice
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
            Unspecified
          </span>
        );
    }
  };

  const sampleWageProgression = [
    { milestone: 'Day 0', wage: 17000, label: 'Entry Induction' },
    { milestone: 'Day 30', wage: 17800, label: 'Probation Milestone' },
    { milestone: 'Day 90', wage: 19500, label: 'Statutory Confirmation' },
    { milestone: 'Day 180', wage: 22000, label: 'Mid-Year Merit Lift' },
    { milestone: 'Day 270', wage: 23200, label: 'Skill Advancement' },
    { milestone: 'Day 365', wage: 24500, label: 'Annual Appraisal (+44%)' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* If a trainee is selected, show Trainee Profile Detail view */}
      {selectedTrainee ? (
        <div className="space-y-6">
          
          {/* Back Button & Top Action */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedTrainee(null)}
              className="flex items-center gap-2 text-xs font-bold text-[#0a66c2] hover:bg-[#e8f3fc] dark:hover:bg-[#0a66c2]/20 transition-colors cursor-pointer px-3.5 py-1.5 rounded-full border border-[#0a66c2]/40"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Trainees Registry</span>
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
              <span>Verified Skill ID:</span>
              <strong className="text-[#0a66c2] font-bold bg-[#e8f3fc] dark:bg-[#0a66c2]/20 px-2.5 py-0.5 rounded-full border border-[#0a66c2]/30">
                {selectedTrainee.profile?.skill_id || selectedTrainee.skill_id}
              </strong>
            </span>
          </div>

          {/* 1. Digital Skill Passport (LinkedIn Profile Header Card) */}
          <div className="linkedin-card overflow-hidden bg-white dark:bg-[#1b1f23]">
            {/* LinkedIn Cover Banner */}
            <div className="h-28 sm:h-32 w-full bg-gradient-to-r from-[#004182] via-[#0a66c2] to-[#378fe9] relative">
              <div className="absolute right-4 top-4">
                <span className="linkedin-badge bg-white/90 text-[#0a66c2] backdrop-blur-xs font-bold shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Aadhaar Verified DPDP Record
                </span>
              </div>
            </div>

            {/* Profile Avatar and Information */}
            <div className="px-6 pb-6 pt-0 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white dark:border-[#1b1f23] bg-[#e8f3fc] dark:bg-[#283340] text-[#0a66c2] font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md">
                  {(selectedTrainee.profile?.full_name || selectedTrainee.full_name || 'Arjun Kumar').split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex items-center gap-2.5">
                  {getStatusBadge(selectedTrainee.profile?.current_status || selectedTrainee.current_status || 'EMPLOYED')}
                  <button className="linkedin-btn-primary flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" />
                    <span>Verified Passport</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                    {selectedTrainee.profile?.full_name || selectedTrainee.full_name || 'Arjun Kumar'}
                  </h1>
                  <span className="h-5 w-5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[10px]">✓</span>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                  Solar Panel Installation Technician • {selectedTrainee.profile?.district || 'Pune'} Cluster, Maharashtra
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  NSQF Level 4 • Certificate ID: MSDE-MH-2025-88419 • MSSDS & NITI Aayog Aspirational Beneficiary
                </p>
              </div>

              {/* 2. Visual Career Journey Line: Training Tracking & Automated Follow-up Check-ins */}
              <div className="space-y-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    1. Training Tracking (Enrolment → Attendance → Skills → Certification)
                  </span>
                  <span className="text-xs text-[#0a66c2] font-bold">100% Completed</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Step 1</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Enrolment</span>
                    <span className="text-[10px] text-[#0a66c2] font-medium">Aadhaar Tokenized</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Step 2</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Attendance</span>
                    <span className="text-[10px] text-[#057642] font-medium">92% Biometric</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Step 3</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Skills Mastered</span>
                    <span className="text-[10px] text-[#0a66c2] font-medium">Solar PV NOS QP</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Step 4</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Certification</span>
                    <span className="text-[10px] text-[#057642] font-medium">NSQF-4 (Grade A)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    2. Automated Follow-ups (30, 90, 180 & 365-Day Longitudinal Check-ins)
                  </span>
                  <span className="text-xs text-[#0a66c2] font-bold">Active Cycle</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Day 30 Check-in</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Placement Start</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Tata Power (₹17k)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Day 90 Check-in</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">OTP Verified</span>
                    <span className="text-[10px] text-[#057642] font-medium">Employer Confirmed</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Day 180 Check-in</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">6M Retention</span>
                    <span className="text-[10px] text-[#0a66c2] font-bold">+29% Wage (₹22k)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Day 365 Check-in</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-0.5">12M Career Growth</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Lead Technician</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Two Columns: Current Employment & Wage Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Current Status Card */}
            <div className="linkedin-card p-6 space-y-4 bg-white dark:bg-[#1b1f23] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Verified Role</span>
                  <span className="linkedin-badge">
                    Tier 4 Multi-Signal
                  </span>
                </div>
                <div className="mt-2.5">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Solar Panel Installation Lead</h3>
                  <p className="text-sm font-bold text-[#0a66c2] mt-0.5">Tata Power Renewables Ltd</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedTrainee.profile?.district || 'Pune'} Cluster, Maharashtra</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Statutory Verification:</span>
                  <span className="font-bold text-[#057642] flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> 1-Click Employer OTP
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Confidence Score:</span>
                  <span className="font-bold text-[#0a66c2]">96.4% Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">DPDP Act Consent:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">Explicit (WhatsApp/SMS)</span>
                </div>
              </div>
            </div>

            {/* Salary Progression Card */}
            <div className="linkedin-card p-6 space-y-4 bg-white dark:bg-[#1b1f23]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Longitudinal Wage Velocity</span>
                <span className="text-xs font-bold text-[#057642] bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                  +44.1% 1-Year Career Lift
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Entry Wage</span>
                  <span className="text-base font-black text-slate-800 dark:text-slate-200">₹17,000</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Day 365 Wage</span>
                  <span className="text-base font-black text-[#0a66c2]">₹24,500</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Total Lift</span>
                  <span className="text-base font-black text-[#057642]">+₹7,500</span>
                </div>
              </div>

              <div className="h-32 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleWageProgression} margin={{ top: 8, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="wageGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0a66c2" stopOpacity={0.3}/>
                        <stop offset="60%" stopColor="#0a66c2" stopOpacity={0.08}/>
                        <stop offset="100%" stopColor="#0a66c2" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} vertical={false} />
                    <XAxis dataKey="milestone" stroke="#64748b" fontSize={10} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      domain={[15000, 26000]} 
                      tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border border-slate-200 bg-white dark:bg-[#1b1f23] p-2.5 shadow-lg text-xs space-y-1">
                              <span className="font-bold text-slate-900 dark:text-white block">{data.milestone} • {data.label}</span>
                              <div className="text-sm font-black text-[#0a66c2]">₹{data.wage.toLocaleString()}/mo</div>
                              <span className="text-[10px] text-[#057642] font-semibold block">
                                +{(((data.wage - 17000) / 17000) * 100).toFixed(1)}% vs Entry
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="wage" 
                      stroke="#0a66c2" 
                      strokeWidth={2.5} 
                      fill="url(#wageGrad)"
                      activeDot={{ r: 5, fill: '#0a66c2', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* 4. Skills & Recommended Upgrades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="linkedin-card p-6 space-y-3 bg-white dark:bg-[#1b1f23]">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Competency Taxonomy</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>Solar PV Wiring</span> <Check className="h-3 w-3 text-[#057642]" />
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>Grid-Tie Inverter Sync</span> <Check className="h-3 w-3 text-[#057642]" />
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>Electrical Safety NOS</span> <Check className="h-3 w-3 text-[#057642]" />
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <span>High-Voltage Battery Storage</span> <span className="text-[10px] bg-amber-200 dark:bg-amber-800 px-1 rounded">Upgrade</span>
                </span>
              </div>
            </div>

            <div className="linkedin-card p-6 space-y-3 bg-white dark:bg-[#1b1f23]">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">AI Career Bridge Recommendation</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Trainee can advance to <strong>Commercial Rooftop Supervisor</strong> (+₹6,500 salary potential) by completing:
              </p>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a66c2]" />
                  <span>30-hr High-Voltage Lithium Storage Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a66c2]" />
                  <span>Client Site Safety Protocol Certification</span>
                </div>
              </div>
            </div>

          </div>

          {/* 5. Next Follow-up (Conversational Flow) */}
          <div className="linkedin-card p-6 space-y-4 bg-white dark:bg-[#1b1f23]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Conversational Follow-up Parser (English & Marathi / Hindi)</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">Simulates WhatsApp/SMS survey responses processed via rule-based NLU</span>
              </div>
              <span className="linkedin-badge">
                Wave: 6-Month Milestone
              </span>
            </div>

            {!followupSubmitted ? (
              <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                {followupStep === 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">How is your current job engagement?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      {["Working full-time (Tata Power)", "Looking for role change", "Started own solar enterprise", "Enrolled in higher engineering"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFollowupAnswer(opt)}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                            followupAnswer === opt
                              ? 'bg-[#e8f3fc] text-[#0a66c2] border-[#0a66c2] font-bold'
                              : 'bg-white dark:bg-[#1b1f23] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0a66c2]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          if (followupAnswer) setFollowupStep(1);
                        }}
                        disabled={!followupAnswer}
                        className="linkedin-btn-primary disabled:opacity-50 cursor-pointer"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {followupStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Confirm current monthly salary range:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      {["₹20,000 - ₹25,000 per month", "₹18,000 - ₹20,000 per month", "Above ₹25,000 per month"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFollowupAnswer(opt)}
                          className="p-3 rounded-lg border bg-white dark:bg-[#1b1f23] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0a66c2] text-left transition-all cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setFollowupStep(0)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => setFollowupSubmitted(true)}
                        className="linkedin-btn-primary cursor-pointer"
                      >
                        Submit Follow-up Entry ✓
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#057642]" />
                  <span>Response validated by NLU and appended to Maharashtra verified longitudinal ledger.</span>
                </div>
                <button
                  onClick={() => { setFollowupSubmitted(false); setFollowupStep(0); setFollowupAnswer(''); }}
                  className="text-xs text-[#0a66c2] font-bold hover:underline cursor-pointer"
                >
                  Edit Response
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Trainee Directory List View */
        <div className="space-y-6">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Trainees Registry & Digital Passports</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Search and track longitudinal outcomes of certified candidates across Maharashtra</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2.5 rounded-full bg-[#edf3f8] dark:bg-[#242a30] border border-slate-300 dark:border-slate-600 px-4 py-2 text-xs text-slate-900 dark:text-slate-100">
              <Search className="h-4 w-4 text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="Search candidate name, Skill ID, or Maharashtra district..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent focus:outline-none w-full placeholder-slate-500"
              />
            </div>

            {/* Quick Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'ALL', label: 'All (10,000)' },
                { id: 'EMPLOYED', label: 'Employed' },
                { id: 'UNEMPLOYED', label: 'Seeking Job' },
                { id: 'SELF_EMPLOYED', label: 'Self-Employed' },
                { id: 'APPRENTICE', label: 'Apprentice' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                    activeFilter === f.id
                      ? 'bg-[#0a66c2] text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-[#242a30] text-slate-700 dark:text-slate-300 hover:border-[#0a66c2] border border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table & Mobile Cards */}
          <div className="linkedin-card overflow-hidden bg-white dark:bg-[#1b1f23]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50">
                    <th className="py-3 px-4">Beneficiary & Skill ID</th>
                    <th className="py-3 px-4">Course Qualification</th>
                    <th className="py-3 px-4">Outcome Status</th>
                    <th className="py-3 px-4">Training Partner</th>
                    <th className="py-3 px-4">Monthly Salary</th>
                    <th className="py-3 px-4">Verification Tier</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTrainees.map((t) => (
                    <tr 
                      key={t.id}
                      onClick={() => navigateToTrainee(t.skill_id)}
                      className="hover:bg-[#f3f6f9] dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-[#0a66c2] transition-colors">{t.full_name}</div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{t.skill_id}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">{t.course_name}</td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(t.current_status)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                        {t.provider_name.split(' ')[0]} Partner Unit
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-mono">
                        {t.current_wage > 0 ? `₹${t.current_wage.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] font-semibold">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a66c2] bg-[#e8f3fc] dark:bg-[#0a66c2]/20 px-2 py-0.5 rounded-full border border-[#0a66c2]/30">
                          {t.verification_tier || 'Tier 3 (Verified)'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-xs font-bold text-[#0a66c2] group-hover:underline inline-flex items-center gap-1">
                          Passport →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

