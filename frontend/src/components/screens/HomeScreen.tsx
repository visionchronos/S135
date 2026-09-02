import React, { useState } from 'react';
import { 
  Users, Briefcase, TrendingUp, AlertTriangle, 
  CheckCircle2, ArrowRight, ArrowUpRight, HelpCircle, 
  Sparkles, ShieldCheck, Award, Zap, Activity, Clock, BarChart3, LineChart as LineChartIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, ReferenceLine
} from 'recharts';
import { useFilterStore } from '../../store/useFilterStore';

export const HomeScreen: React.FC = () => {
  const { 
    language, 
    setActiveNavTab, navigateToCourse 
  } = useFilterStore();

  const [graphMode, setGraphMode] = useState<'retention' | 'wage' | 'districts'>('retention');

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

  // Accurate 12-Month Longitudinal Progression Dataset (Months 1 through 12)
  const full12MonthData = [
    { month: 'M1 (Day 30)', label: 'Month 1', placement: 75.0, retention: 74.8, wage: 16500, activeTrainees: 7500, verifiedOTP: 6850 },
    { month: 'M2 (Day 60)', label: 'Month 2', placement: 75.3, retention: 74.1, wage: 16800, activeTrainees: 7410, verifiedOTP: 6880 },
    { month: 'M3 (Day 90)', label: 'Month 3', placement: 75.7, retention: 73.4, wage: 17200, activeTrainees: 7340, verifiedOTP: 6920 },
    { month: 'M4 (Day 120)', label: 'Month 4', placement: 76.0, retention: 72.3, wage: 17500, activeTrainees: 7230, verifiedOTP: 6940 },
    { month: 'M5 (Day 150)', label: 'Month 5', placement: 76.2, retention: 71.2, wage: 17900, activeTrainees: 7120, verifiedOTP: 6950 },
    { month: 'M6 (Day 180)', label: 'Month 6', placement: 76.5, retention: 70.2, wage: 18450, activeTrainees: 7020, verifiedOTP: 6970 },
    { month: 'M7 (Day 210)', label: 'Month 7', placement: 76.8, retention: 69.6, wage: 18900, activeTrainees: 6960, verifiedOTP: 6980 },
    { month: 'M8 (Day 240)', label: 'Month 8', placement: 77.0, retention: 69.0, wage: 19400, activeTrainees: 6900, verifiedOTP: 6990 },
    { month: 'M9 (Day 270)', label: 'Month 9', placement: 77.3, retention: 68.4, wage: 19900, activeTrainees: 6840, verifiedOTP: 7010 },
    { month: 'M10 (Day 300)', label: 'Month 10', placement: 77.6, retention: 67.9, wage: 20450, activeTrainees: 6790, verifiedOTP: 7020 },
    { month: 'M11 (Day 330)', label: 'Month 11', placement: 77.8, retention: 67.4, wage: 20950, activeTrainees: 6740, verifiedOTP: 7030 },
    { month: 'M12 (Day 365)', label: 'Month 12', placement: 78.2, retention: 66.8, wage: 21500, activeTrainees: 6680, verifiedOTP: 7040 }
  ];

  // District Benchmark Data for Comparison
  const districtBenchmarkData = [
    { month: 'Pune', placement: 84.5, retention: 82.4, wage: 21200 },
    { month: 'Mumbai Sub', placement: 86.0, retention: 84.1, wage: 23400 },
    { month: 'Thane', placement: 79.5, retention: 78.5, wage: 19800 },
    { month: 'Nagpur', placement: 75.0, retention: 74.2, wage: 17500 },
    { month: 'Nashik', placement: 77.0, retention: 75.8, wage: 18100 },
    { month: 'Washim (Asp)', placement: 72.0, retention: 70.8, wage: 16000 },
    { month: 'Nandurbar (Asp)', placement: 71.0, retention: 69.4, wage: 15800 },
    { month: 'Dharashiv (Asp)', placement: 73.5, retention: 72.5, wage: 16900 },
    { month: 'Gadchiroli (Asp)', placement: 69.5, retention: 68.1, wage: 15200 }
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

  // Custom polished Tooltip Component
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1b1f23] p-3 shadow-xl text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="font-black text-slate-900 dark:text-white">{label}</span>
            <span className="text-[10px] font-bold text-[#0a66c2] bg-[#e8f3fc] dark:bg-[#0a66c2]/20 px-2 py-0.5 rounded-full">
              Verified Cohort
            </span>
          </div>
          {graphMode === 'retention' && (
            <>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-[#0a66c2]"></span>
                  Placement Rate:
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white">{dataPoint.placement}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-[#057642]"></span>
                  Job Retention:
                </span>
                <span className="font-extrabold text-[#057642]">{dataPoint.retention}%</span>
              </div>
              {dataPoint.activeTrainees && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Tracked Active:</span>
                  <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">{dataPoint.activeTrainees.toLocaleString()} Beneficiaries</span>
                </div>
              )}
            </>
          )}
          {graphMode === 'wage' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Monthly Salary:</span>
                <span className="font-black text-slate-900 dark:text-white text-sm">₹{dataPoint.wage.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Wage Lift:</span>
                <span className="font-bold text-[#057642]">
                  +{(((dataPoint.wage - 16500) / 16500) * 100).toFixed(1)}% vs Entry
                </span>
              </div>
            </>
          )}
          {graphMode === 'districts' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Placement:</span>
                <span className="font-bold text-[#0a66c2]">{dataPoint.placement}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">6M Retention:</span>
                <span className="font-bold text-[#057642]">{dataPoint.retention}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Average Salary:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">₹{dataPoint.wage.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const currentChartData = graphMode === 'districts' ? districtBenchmarkData : full12MonthData;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Executive National / State Banner */}
      <div className="linkedin-card p-6 relative overflow-hidden bg-white dark:bg-[#1b1f23]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="linkedin-badge">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0a66c2]" />
                NITI Aayog Verified Longitudinal Ledger • Maharashtra
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">MSSDS AY 2024-2025 Cohorts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{greeting}</h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveNavTab('training')}
              className="linkedin-btn-primary flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Benchmark Courses</span>
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
              className="linkedin-card p-5 space-y-3 bg-white dark:bg-[#1b1f23] hover:border-[#0a66c2]/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{m.label}</span>
                <div className="p-2 rounded-full bg-[#e8f3fc] dark:bg-[#0a66c2]/20 text-[#0a66c2]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{m.value}</div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-[#0a66c2]">{m.delta}</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-[#0a66c2] rounded-full transition-all duration-500"
                    style={{ width: `${m.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Longitudinal Outcome Progression & Kaplan-Meier Analytics */}
      <div className="linkedin-card p-6 space-y-5 bg-white dark:bg-[#1b1f23]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900 dark:text-white">Longitudinal Livelihood Progression (12-Month Horizon)</h2>
              <span className="linkedin-badge">
                Multi-Signal Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Longitudinal tracking across 12 monthly milestones for 10,000 Maharashtra NITI Aayog beneficiaries
            </p>
          </div>

          {/* Interactive Metric Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGraphMode('retention')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                graphMode === 'retention'
                  ? 'bg-[#0a66c2] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Retention Curve (%)
            </button>
            <button
              onClick={() => setGraphMode('wage')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                graphMode === 'wage'
                  ? 'bg-[#0a66c2] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Wage Velocity (₹)
            </button>
            <button
              onClick={() => setGraphMode('districts')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                graphMode === 'districts'
                  ? 'bg-[#0a66c2] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Districts Compare
            </button>
          </div>
        </div>

        {/* Dynamic Legend Header */}
        <div className="flex flex-wrap items-center justify-between text-xs gap-3 px-1">
          <div className="flex items-center gap-4">
            {graphMode === 'retention' && (
              <>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0a66c2]"></span>
                  <span>Cumulative Placement (78.2% at M12)</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#057642]"></span>
                  <span>Livelihood Retention (66.8% at M12)</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                  <span className="h-0.5 w-4 border-t-2 border-dashed border-amber-500"></span>
                  <span>NITI Aayog Benchmark (70%)</span>
                </div>
              </>
            )}
            {graphMode === 'wage' && (
              <>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0a66c2]"></span>
                  <span>Monthly Average Wage (₹16,500 → ₹21,500)</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500"></span>
                  <span>+30.3% Cumulative Growth</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-500">
                  <span className="h-0.5 w-4 border-t-2 border-dashed border-slate-400"></span>
                  <span>Living Wage Floor (₹14,500)</span>
                </div>
              </>
            )}
            {graphMode === 'districts' && (
              <>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0a66c2]"></span>
                  <span>Placement Rate (%)</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#057642]"></span>
                  <span>6M Retention Rate (%)</span>
                </div>
              </>
            )}
          </div>

          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Source: Maharashtra DPDP Audit Trail & Employer Multi-Signal Feed
          </span>
        </div>

        {/* High-definition, accurately modeled Area Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData} margin={{ top: 12, right: 20, left: 0, bottom: 0 }}>
              <defs>
                {/* LinkedIn Blue Gradient */}
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a66c2" stopOpacity={0.25}/>
                  <stop offset="60%" stopColor="#0a66c2" stopOpacity={0.06}/>
                  <stop offset="100%" stopColor="#0a66c2" stopOpacity={0.0}/>
                </linearGradient>
                {/* Emerald Retention Gradient */}
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#057642" stopOpacity={0.22}/>
                  <stop offset="60%" stopColor="#057642" stopOpacity={0.04}/>
                  <stop offset="100%" stopColor="#057642" stopOpacity={0.0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={{ stroke: '#e2e8f0' }}
              />
              
              {graphMode === 'retention' && (
                <>
                  <YAxis 
                    domain={[60, 85]} 
                    unit="%" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <ReferenceLine 
                    y={70} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    strokeWidth={1.5}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="placement" 
                    stroke="#0a66c2" 
                    strokeWidth={2.5} 
                    fill="url(#blueGradient)" 
                    activeDot={{ r: 6, fill: '#0a66c2', stroke: '#ffffff', strokeWidth: 3 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#057642" 
                    strokeWidth={2.5} 
                    fill="url(#emeraldGradient)" 
                    activeDot={{ r: 6, fill: '#057642', stroke: '#ffffff', strokeWidth: 3 }}
                  />
                </>
              )}

              {graphMode === 'wage' && (
                <>
                  <YAxis 
                    domain={[14000, 23000]} 
                    unit="₹" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <ReferenceLine 
                    y={14500} 
                    stroke="#94a3b8" 
                    strokeDasharray="4 4" 
                    strokeWidth={1.5}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="wage" 
                    stroke="#0a66c2" 
                    strokeWidth={3} 
                    fill="url(#blueGradient)" 
                    activeDot={{ r: 6, fill: '#0a66c2', stroke: '#ffffff', strokeWidth: 3 }}
                  />
                </>
              )}

              {graphMode === 'districts' && (
                <>
                  <YAxis 
                    domain={[60, 90]} 
                    unit="%" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <ReferenceLine 
                    y={70} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    strokeWidth={1.5}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="placement" 
                    stroke="#0a66c2" 
                    strokeWidth={2.5} 
                    fill="url(#blueGradient)" 
                    activeDot={{ r: 6, fill: '#0a66c2', stroke: '#ffffff', strokeWidth: 3 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#057642" 
                    strokeWidth={2.5} 
                    fill="url(#emeraldGradient)" 
                    activeDot={{ r: 6, fill: '#057642', stroke: '#ffffff', strokeWidth: 3 }}
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Clean Executive Data Breakdown Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold block">Day 30 → Day 180 Survival</span>
            <span className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">75.0% → 70.2% (-4.8%)</span>
            <span className="text-[10px] text-[#057642] font-semibold">Exceeds national baseline by +5.2%</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold block">Longitudinal Wage Velocity</span>
            <span className="text-sm font-black text-[#0a66c2] mt-0.5 block">₹16,500 → ₹21,500 (+30.3%)</span>
            <span className="text-[10px] text-[#0a66c2] font-semibold">+₹5,000 net lift over 12 months</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold block">NITI Aayog Aspirational Districts</span>
            <span className="text-sm font-black text-amber-700 dark:text-amber-400 mt-0.5 block">70.2% Aggregate Retention</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Washim & Dharashiv above threshold</span>
          </div>
        </div>
      </div>

      {/* 4. Priority Policy Anomalies & What's Happening */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 dark:text-white">Policy Anomaly Radar & Interventions</h2>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
              3 Active Signals
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Triangulated via employer follow-up logs & ML models</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {happeningInsights.map((item) => (
            <div 
              key={item.id}
              className="linkedin-card p-5 flex flex-col justify-between space-y-3 bg-white dark:bg-[#1b1f23] hover:border-[#0a66c2]/40 hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.severity === 'CRITICAL' 
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300' 
                      : item.severity === 'ACTION REQUIRED'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                  }`}>
                    {item.severity}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.tag}</span>
                </div>

                <h3 className="text-xs font-black text-slate-900 dark:text-white leading-snug pt-1">{item.title}</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{item.issue}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setActiveNavTab('training');
                  }}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#0a66c2] hover:text-[#004182] transition-colors cursor-pointer py-1"
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
            <h2 className="text-base font-black text-slate-900 dark:text-white">Course Health Benchmarks</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Qualification Pack (QP-NOS) placement performance vs market demand</p>
          </div>
          <button
            onClick={() => setActiveNavTab('training')}
            className="text-xs font-bold text-[#0a66c2] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coursesNeedingAttention.map((c) => (
            <div 
              key={c.id}
              className="linkedin-card p-5 space-y-3 flex flex-col justify-between bg-white dark:bg-[#1b1f23] hover:border-[#0a66c2]/40 hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">{c.qpCode}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    c.status === 'critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
                      : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    {c.status === 'critical' ? 'Critical Deficit' : 'Attention'}
                  </span>
                </div>

                <h3 className="text-xs font-black text-slate-900 dark:text-white leading-snug">{c.name}</h3>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{c.placement}</span>
                  <span className="text-[11px] text-rose-600 font-bold">{c.delta}</span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-800 dark:text-slate-200">Root Cause:</strong> {c.issue}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => navigateToCourse(c.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-[#0a66c2] hover:text-[#004182] transition-colors cursor-pointer py-1"
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

