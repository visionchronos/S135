import React from 'react';
import { 
  Users, Briefcase, TrendingUp, AlertTriangle, 
  CheckCircle2, ArrowRight, ArrowUpRight, HelpCircle, 
  Sparkles, ShieldCheck, Award, Zap, Activity, Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { useFilterStore } from '../../store/useFilterStore';

export const HomeScreen: React.FC = () => {
  const { 
    currentRole, language, 
    setActiveNavTab, navigateToAction, navigateToCourse 
  } = useFilterStore();

  const greeting = language === 'hi' ? 'नमस्ते, नीति प्रशासक' : 'National Skilling Outcome Intelligence Hub';
  const subtitle = language === 'hi' ? 'दीर्घकालिक परिणाम एवं प्रभाव मूल्यांकन अवलोकन' : 'Longitudinal Outcome, Livelihood & Closed-Loop Policy Dashboard';

  // 4 Executive Core Metrics
  const coreMetrics = [
    {
      label: language === 'hi' ? 'कुल ट्रैक किए गए लाभार्थी' : 'Trainees Tracked',
      value: '10,000',
      delta: '100% Aadhaar-Tokenized',
      deltaType: 'neutral',
      progress: 100,
      icon: Users,
      accent: 'emerald'
    },
    {
      label: language === 'hi' ? 'सत्यापित रोजगार दर' : 'Verified Placement Rate',
      value: '75.0%',
      delta: '↑ +6.2% vs Previous FY Cohort',
      deltaType: 'positive',
      progress: 75,
      icon: Briefcase,
      accent: 'emerald'
    },
    {
      label: language === 'hi' ? '6-माह निरंतरता दर' : '6-Month Job Retention',
      value: '70.2%',
      delta: 'Kaplan-Meier Baseline Benchmark',
      deltaType: 'positive',
      progress: 70,
      icon: Activity,
      accent: 'teal'
    },
    {
      label: language === 'hi' ? 'औसत मासिक आय' : 'Average Monthly Wage',
      value: '₹18,450',
      delta: '↑ +17.4% Wage Growth at Day 180',
      deltaType: 'positive',
      progress: 84,
      icon: TrendingUp,
      accent: 'cyan'
    }
  ];

  // High-priority intelligence cards
  const happeningInsights = [
    {
      id: 'act-1',
      type: 'warning',
      tag: 'Curriculum Deficit Anomaly',
      title: 'Placement down 12% in Domestic Data Entry',
      issue: 'Regional employers have automated basic spreadsheets and require PowerBI & automated analytics modules.',
      actionLabel: 'Deploy 30hr PowerBI Intervention',
      actionTab: 'actions' as const,
      actionId: 'act-1',
      severity: 'CRITICAL'
    },
    {
      id: 'act-2',
      type: 'success',
      tag: 'Policy Success Benchmark',
      title: 'Solar Rooftop 6-Month Retention Hit 82%',
      issue: 'Field apprenticeships with Tata Power Renewables lifted 6-month retention from 68% → 82% (+14% delta).',
      actionLabel: 'Scale Western Region Capacity',
      actionTab: 'actions' as const,
      actionId: 'act-3',
      severity: 'BENCHMARK MET'
    },
    {
      id: 'act-3',
      type: 'warning',
      tag: 'District Wage Disparity',
      title: 'Patna & Ranchi clusters show early attrition',
      issue: 'Entry wages of ₹13,500 are 22% below district living index, causing 52% attrition within first 90 days.',
      actionLabel: 'Mandate Minimum Wage Rule',
      actionTab: 'actions' as const,
      actionId: 'act-2',
      severity: 'ACTION REQUIRED'
    }
  ];

  // Longitudinal Retention & Placement Trend (Area Chart)
  const trendData = [
    { month: 'Oct 2024', placementRate: 69, retention6M: 64, avgWageK: 16.2 },
    { month: 'Nov 2024', placementRate: 71, retention6M: 66, avgWageK: 16.8 },
    { month: 'Dec 2024', placementRate: 72, retention6M: 68, avgWageK: 17.3 },
    { month: 'Jan 2025', placementRate: 74, retention6M: 69, avgWageK: 17.9 },
    { month: 'Feb 2025', placementRate: 75, retention6M: 70, avgWageK: 18.45 }
  ];

  // Courses Needing Attention
  const coursesNeedingAttention = [
    {
      id: 'c-web',
      qpCode: 'QP-NOS SGJ/Q0101',
      name: 'Domestic Data Entry & Analytics',
      sector: 'IT-ITeS',
      placement: '52%',
      delta: '↓ 12% drop',
      issue: 'Missing PowerBI & modern spreadsheet automation skills',
      status: 'critical'
    },
    {
      id: 'c-gda',
      qpCode: 'QP-NOS HSS/Q5101',
      name: 'General Duty Assistant (Healthcare)',
      sector: 'Healthcare',
      placement: '74%',
      delta: '↓ 5% 6M retention',
      issue: 'Night shift safe transport & housing subsidy deficit',
      status: 'attention'
    },
    {
      id: 'c-auto',
      qpCode: 'QP-NOS ASC/Q1402',
      name: 'Automotive Mechatronics Specialist',
      sector: 'Automotive',
      placement: '66%',
      delta: '↓ 8% conversion',
      issue: 'Transition to Electric Vehicle (EV) powertrain needed',
      status: 'attention'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* 1. Executive National Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-r from-[#0d1527] via-[#0b1322] to-[#080d18] p-6 sm:p-7 shadow-lg shadow-black/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/25">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Longitudinal Ledger • NCVET / MSDE
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">AY 2024-2025 Cohorts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{greeting}</h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveNavTab('actions')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 border border-emerald-400/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span>Launch Policy Intervention</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coreMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx}
              className="metric-card space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                <div className="p-2 rounded-lg bg-[#0e172a] border border-slate-700/80 text-emerald-400">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white tracking-tight">{m.value}</div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-emerald-400">{m.delta}</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${m.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Longitudinal Outcome Progression & Kaplan-Meier Analytics */}
      <div className="p-6 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-5 shadow-lg shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">Longitudinal Livelihood Progression (12-Month Horizon)</h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                Multi-Signal Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Placement rate vs 6-Month retention rate progression across all national training cohorts</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span>Placement Rate (75%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400"></span>
              <span>6M Retention (70%)</span>
            </div>
          </div>
        </div>

        {/* Rich Area Chart */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="placementGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis domain={[55, 85]} unit="%" stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                labelStyle={{ fontWeight: 'bold', color: '#f8fafc' }}
                formatter={(val: any, name: any) => [`${val}%`, name === 'placementRate' ? 'Placement Rate' : '6M Retention']}
              />
              <Area 
                type="monotone" 
                dataKey="placementRate" 
                stroke="#10b981" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#placementGrad)" 
              />
              <Area 
                type="monotone" 
                dataKey="retention6M" 
                stroke="#2dd4bf" 
                strokeWidth={2} 
                strokeDasharray="4 4"
                fillOpacity={1} 
                fill="url(#retentionGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Executive Takeaway Banner */}
        <div className="p-3.5 rounded-xl bg-[#090e18] border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Outcome Executive Summary:</strong> Verified employment increased by <strong>+6.2%</strong> across the last 4 cohort cycles, with western and southern districts leading retention benchmarks at <strong>82%</strong>.
            </span>
          </div>
          <button 
            onClick={() => setActiveNavTab('insights')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Analytics</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 4. Priority Policy Anomalies & What's Happening */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-white">Policy Anomaly Radar & Interventions</h2>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
              3 Active Signals
            </span>
          </div>
          <span className="text-xs text-slate-400">Triangulated via employer follow-up logs & ML models</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {happeningInsights.map((item) => (
            <div 
              key={item.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all duration-200 hover:-translate-y-0.5 ${
                item.type === 'warning'
                  ? 'bg-gradient-to-br from-[#121827] to-[#0e1422] border-amber-500/30 hover:border-amber-500/50 shadow-md shadow-amber-500/5'
                  : 'bg-gradient-to-br from-[#0e1a22] to-[#091218] border-emerald-500/30 hover:border-emerald-500/50 shadow-md shadow-emerald-500/5'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    item.severity === 'CRITICAL' 
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' 
                      : item.severity === 'ACTION REQUIRED'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {item.severity}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{item.tag}</span>
                </div>

                <h3 className="text-xs font-extrabold text-white leading-snug pt-1">{item.title}</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">{item.issue}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    if (item.actionTab === 'actions') {
                      navigateToAction(item.actionId || '');
                    } else {
                      setActiveNavTab('insights');
                    }
                  }}
                  className="w-full flex items-center justify-between text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer py-1"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Courses Needing Curriculum Action */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white">Course Health Benchmarks</h2>
            <p className="text-xs text-slate-400 mt-0.5">Qualification Pack (QP-NOS) placement performance vs market demand</p>
          </div>
          <button
            onClick={() => setActiveNavTab('training')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coursesNeedingAttention.map((c) => (
            <div 
              key={c.id}
              className="p-5 rounded-2xl bg-[#0e1626]/80 border border-slate-800/90 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">{c.qpCode}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    c.status === 'critical'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {c.status === 'critical' ? 'Critical Deficit' : 'Attention'}
                  </span>
                </div>

                <h3 className="text-xs font-extrabold text-white leading-snug">{c.name}</h3>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-black text-white">{c.placement}</span>
                  <span className="text-[11px] text-rose-400 font-bold">{c.delta}</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Root Cause:</strong> {c.issue}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => navigateToCourse(c.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer py-1"
                >
                  <span>See Diagnosis & Upgrades</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

