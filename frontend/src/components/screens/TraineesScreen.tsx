import React, { useState, useEffect } from 'react';
import { 
  Search, Users, Briefcase, CheckCircle2, AlertCircle, 
  ArrowLeft, ExternalLink, TrendingUp, Sparkles, ShieldCheck, 
  Clock, Award, MessageSquare, ChevronRight, Mic, QrCode, FileText, Check
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
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
    { month: 'Day 0', wage: 17000 },
    { month: 'Day 30', wage: 17800 },
    { month: 'Day 90', wage: 19500 },
    { month: 'Day 180', wage: 22000 }
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
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-[#0e1626] border border-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Trainees Registry</span>
            </button>

            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span>Verified Skill ID:</span>
              <strong className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {selectedTrainee.profile?.skill_id || selectedTrainee.skill_id}
              </strong>
            </span>
          </div>

          {/* 1. Digital Skill Passport Header */}
          <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-gradient-to-br from-[#0e1626] via-[#0b1322] to-[#070c16] space-y-6 shadow-xl shadow-black/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-lg shadow-emerald-600/20">
                  <div className="w-full h-full bg-[#090e18] rounded-[14px] flex items-center justify-center text-xl font-black text-emerald-400">
                    {(selectedTrainee.profile?.full_name || selectedTrainee.full_name || 'Arjun Kumar').split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-white">{selectedTrainee.profile?.full_name || selectedTrainee.full_name || 'Arjun Kumar'}</h1>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                      <ShieldCheck className="h-3 w-3" />
                      Aadhaar Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Solar Panel Installation Technician • {selectedTrainee.profile?.district || 'Ahmedabad'}, Gujarat
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    NSQF Level 4 • Certificate Hash: 0x8f3c...b12a • DPDP Consent Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(selectedTrainee.profile?.current_status || selectedTrainee.current_status || 'EMPLOYED')}
              </div>
            </div>

            {/* 2. Visual Career Journey Line */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Longitudinal Milestones (NCrF Verified)
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">100% On-Track</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#090e18] border border-emerald-500/30">
                  <span className="text-[10px] text-slate-500 font-semibold block">Stage 1</span>
                  <span className="font-extrabold text-emerald-300 block mt-0.5">Training Completed</span>
                  <span className="text-[10px] text-slate-400">92% Attendance</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090e18] border border-emerald-500/30">
                  <span className="text-[10px] text-slate-500 font-semibold block">Stage 2</span>
                  <span className="font-extrabold text-emerald-300 block mt-0.5">Certified (NSQF-4)</span>
                  <span className="text-[10px] text-slate-400">Grade: A (88%)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090e18] border border-emerald-500/30">
                  <span className="text-[10px] text-slate-500 font-semibold block">Stage 3</span>
                  <span className="font-extrabold text-emerald-300 block mt-0.5">Day 30 Placement</span>
                  <span className="text-[10px] text-slate-400">Tata Power</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090e18] border border-emerald-500/30">
                  <span className="text-[10px] text-slate-500 font-semibold block">Stage 4</span>
                  <span className="font-extrabold text-emerald-300 block mt-0.5">Day 90 OTP Verified</span>
                  <span className="text-[10px] text-slate-400">Statutory 1-Click</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090e18] border border-emerald-500/30 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">Stage 5</span>
                  <span className="font-extrabold text-emerald-300 block mt-0.5">Day 180 Retention</span>
                  <span className="text-[10px] text-slate-400">+29% Wage Growth</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Two Columns: Current Employment & Wage Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Current Status Card */}
            <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Verified Role</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                    Tier 4 Multi-Signal
                  </span>
                </div>
                <div className="mt-2.5">
                  <h3 className="text-lg font-extrabold text-white">Solar Panel Installation Lead</h3>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">Tata Power Renewables Ltd</p>
                  <p className="text-xs text-slate-400">Ahmedabad Cluster, Gujarat</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Statutory Verification:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> 1-Click Employer OTP
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Confidence Score:</span>
                  <span className="font-bold text-teal-300">96.4% Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">DPDP Act Consent:</span>
                  <span className="font-mono text-slate-300">Explicit (WhatsApp/SMS)</span>
                </div>
              </div>
            </div>

            {/* Salary Progression Card */}
            <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Longitudinal Wage Velocity</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                  +29.4% Growth
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#090e18] border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold block">Entry Wage</span>
                  <span className="text-base font-black text-slate-200">₹17,000</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090e18] border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold block">Day 180 Wage</span>
                  <span className="text-base font-black text-emerald-400">₹22,000</span>
                </div>
                <div className="p-3 rounded-xl bg-[#090e18] border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold block">Total Lift</span>
                  <span className="text-base font-black text-teal-300">+₹5,000</span>
                </div>
              </div>

              <div className="h-24 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleWageProgression} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="wageGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[15000, 24000]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Monthly Salary']}
                    />
                    <Area type="monotone" dataKey="wage" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#wageGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* 4. Skills & Recommended Upgrades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-3 shadow-lg">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Competency Taxonomy</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-lg bg-[#090e18] border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <span>Solar PV Wiring</span> <Check className="h-3 w-3 text-emerald-400" />
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#090e18] border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <span>Grid-Tie Inverter Sync</span> <Check className="h-3 w-3 text-emerald-400" />
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#090e18] border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <span>Electrical Safety NOS</span> <Check className="h-3 w-3 text-emerald-400" />
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#090e18] border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <span>High-Voltage Battery Storage</span> <span className="text-[10px] bg-amber-500/20 px-1 rounded">Upgrade</span>
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-3 shadow-lg">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">AI Career Bridge Recommendation</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trainee can advance to <strong>Commercial Rooftop Supervisor</strong> (+₹6,500 salary potential) by completing:
              </p>
              <div className="space-y-1.5 text-xs text-slate-200 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>30-hr High-Voltage Lithium Storage Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Client Site Safety Protocol Certification</span>
                </div>
              </div>
            </div>

          </div>

          {/* 5. Next Follow-up (Conversational Flow) */}
          <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white">Conversational Follow-up Parser (English & Hindi)</h3>
                <span className="text-xs text-slate-400">Simulates WhatsApp/SMS survey responses processed via rule-based NLU</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/25">
                Wave: 6-Month Milestone
              </span>
            </div>

            {!followupSubmitted ? (
              <div className="p-5 rounded-xl bg-[#090e18] border border-slate-800 space-y-4">
                {followupStep === 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-white">How is your current job engagement?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      {["Working full-time (Tata Power)", "Looking for role change", "Started own solar enterprise", "Enrolled in higher engineering"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFollowupAnswer(opt)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            followupAnswer === opt
                              ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                              : 'bg-[#0e1626] border-slate-800 text-slate-300 hover:border-slate-700'
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
                        className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 px-5 py-2 text-xs font-bold text-white transition-all cursor-pointer"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {followupStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-white">Confirm current monthly salary range:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      {["₹20,000 - ₹25,000 per month", "₹18,000 - ₹20,000 per month", "Above ₹25,000 per month"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFollowupAnswer(opt)}
                          className="p-3 rounded-xl border bg-[#0e1626] border-slate-800 text-slate-300 hover:border-emerald-500 text-left transition-all cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setFollowupStep(0)}
                        className="text-xs font-bold text-slate-400 hover:text-white"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => setFollowupSubmitted(true)}
                        className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-2 text-xs font-bold text-white transition-all cursor-pointer"
                      >
                        Submit Follow-up Ledger Entry ✓
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>Response validated by NLU and appended to verified longitudinal ledger.</span>
                </div>
                <button
                  onClick={() => { setFollowupSubmitted(false); setFollowupStep(0); setFollowupAnswer(''); }}
                  className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer"
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
              <h1 className="text-2xl font-extrabold text-white">Trainees Registry & Digital Passports</h1>
              <p className="text-xs text-slate-400">Search and track longitudinal outcomes of certified candidates across all batches</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 rounded-xl bg-[#0e1626] border border-slate-800 px-4 py-2.5 text-xs text-slate-200 shadow-inner">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by candidate name, Skill ID, or district..."
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
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                    activeFilter === f.id
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'bg-[#0e1626] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table & Mobile Cards */}
          <div className="rounded-2xl bg-[#0e1626]/80 border border-slate-800/90 shadow-xl overflow-hidden backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-[#090e18]">
                    <th className="py-3.5 px-4">Beneficiary & Skill ID</th>
                    <th className="py-3.5 px-4">Course Qualification</th>
                    <th className="py-3.5 px-4">Outcome Status</th>
                    <th className="py-3.5 px-4">Training Partner</th>
                    <th className="py-3.5 px-4">Monthly Salary</th>
                    <th className="py-3.5 px-4">Verification Confidence</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTrainees.map((t) => (
                    <tr 
                      key={t.id}
                      onClick={() => navigateToTrainee(t.skill_id)}
                      className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-white group-hover:text-emerald-400 transition-colors">{t.full_name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{t.skill_id}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">{t.course_name}</td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(t.current_status)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {t.provider_name.split(' ')[0]} Partner Unit
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white font-mono">
                        {t.current_wage > 0 ? `₹${t.current_wage.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-teal-300 text-[11px] font-semibold">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/25">
                          {t.verification_tier || 'Tier 3 (Verified)'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-0.5 inline-flex items-center gap-1 transition-transform">
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

