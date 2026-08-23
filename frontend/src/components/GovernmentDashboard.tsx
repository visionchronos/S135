import React, { useState, useEffect } from 'react';
import { 
  Users, Award, Briefcase, TrendingUp, ShieldCheck, Database, 
  MapPin, AlertTriangle, CheckCircle2, ArrowUpRight, BarChart2,
  Filter, Search, HelpCircle, Layers, Activity
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { api } from '../services/api';
import { MacroKPIs, DistrictOutcome, CourseBenchmark, ProviderBenchmark, SkillSupplyDemand, RetentionAttritionData } from '../types';

interface GovernmentDashboardProps {
  language: string;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({ language }) => {
  const [macro, setMacro] = useState<MacroKPIs | null>(null);
  const [districts, setDistricts] = useState<DistrictOutcome[]>([]);
  const [courses, setCourses] = useState<CourseBenchmark[]>([]);
  const [providers, setProviders] = useState<ProviderBenchmark[]>([]);
  const [skills, setSkills] = useState<SkillSupplyDemand[]>([]);
  const [retention, setRetention] = useState<RetentionAttritionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  useEffect(() => {
    loadDashboardData();
  }, [selectedDistrict, selectedSector]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (selectedDistrict !== 'ALL') params.district = selectedDistrict;
      if (selectedSector !== 'ALL') params.sector = selectedSector;

      const [macroData, distData, courseData, provData, skillData, retData] = await Promise.all([
        api.getMacroOverview(params),
        api.getDistrictMap(),
        api.getCourseBenchmarks(),
        api.getProviderBenchmarks(),
        api.getSkillSupplyDemand(),
        api.getRetentionAttrition()
      ]);

      setMacro(macroData);
      setDistricts(distData);
      setCourses(courseData);
      setProviders(provData);
      setSkills(skillData);
      setRetention(retData);
    } catch (err) {
      console.error('Failed to load government dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

  if (loading && !macro) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-400">Loading Longitudinal Outcome Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              {language === 'hi' ? 'राष्ट्रीय कौशल परिणाम व नीति कमान केंद्र' : 'National Skilling Outcome & Policy Command Center'}
            </h1>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
              <Activity className="h-3 w-3 mr-1 animate-pulse" /> Live Outcome Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hi'
              ? 'प्रमाणीकरण से परे सतत आजीविका, वेतन वृद्धि, प्रतिधारण और कौशल मांग का अनुदैर्ध्य विश्लेषण'
              : 'Longitudinal intelligence beyond certification: sustainable livelihood, wage progression, retention, and market demand'}
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer"
            >
              <option value="ALL">All Districts ({districts.length})</option>
              {districts.map((d) => (
                <option key={d.district} value={d.district}>{d.district}, {d.state}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer"
            >
              <option value="ALL">All Sectors</option>
              <option value="IT-ITeS">IT-ITeS</option>
              <option value="Green Energy / Solar">Green Energy / Solar</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Automotive">Automotive</option>
              <option value="Retail & Logistics">Retail & Logistics</option>
              <option value="Apparel & Textiles">Apparel & Textiles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 6 Longitudinal Macro KPIs */}
      {macro && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          
          {/* Total Trainees */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Enrolled</span>
              <Users className="h-4 w-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-white">{macro.total_enrolled.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">{macro.total_certified.toLocaleString()}</span> certified ({macro.certification_rate}%)
            </div>
          </div>

          {/* Livelihood Placement Rate */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Livelihood Outcomes</span>
              <Briefcase className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{macro.placement_rate}%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Wage: {macro.total_employed_wage} | Self: {macro.total_self_employed} | Appr: {macro.total_apprentices}
            </div>
          </div>

          {/* 6-Month (180D) Retention */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">6M Retention</span>
              <TrendingUp className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-300">{macro.retention_180d_pct}%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              1-Year Sustained: <span className="text-slate-200 font-semibold">{macro.retention_365d_pct}%</span>
            </div>
          </div>

          {/* Median Wage Growth */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Wage Growth</span>
              <ArrowUpRight className="h-4 w-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">+{macro.median_wage_growth_pct}%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              ₹{macro.median_starting_wage.toLocaleString()} → ₹{macro.median_current_wage.toLocaleString()}
            </div>
          </div>

          {/* Outcome Verification Confidence */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Verified Outcomes</span>
              <ShieldCheck className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{macro.verified_outcomes_percentage}%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Multi-signal statutory confidence
            </div>
          </div>

          {/* Data Quality Score */}
          <div className="metric-card">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Data Quality Score</span>
              <Database className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{macro.data_quality_score}/100</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Automated anomaly inspection
            </div>
          </div>

        </div>
      )}

      {/* Row 2: Geospatial Map & Longitudinal Kaplan-Meier Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District Geospatial Impact Map */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Geographic Livelihood & Wage Outcome Map
              </h2>
              <p className="text-xs text-slate-400">District-level outcome sustainability, median wages, and data quality</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">{districts.length} active nodes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {districts.map((d) => (
              <div
                key={d.district}
                onClick={() => setSelectedDistrict(d.district === selectedDistrict ? 'ALL' : d.district)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedDistrict === d.district
                    ? 'border-emerald-500 bg-emerald-950/40'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-200">{d.district}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    d.status === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400' :
                    d.status === 'NEEDS_ATTENTION' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-rose-500/20 text-rose-400'
                  }`}>
                    {d.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{d.state}</div>

                <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Placed %</span>
                    <span className="font-bold text-emerald-400">{d.placement_rate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Median Wage</span>
                    <span className="font-bold text-slate-200">₹{d.median_wage.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-1.5">
                  <span>Trainees: {d.total_trainees}</span>
                  <span>DQ: {d.data_quality_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Longitudinal Retention Curve (Kaplan-Meier Style) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                Longitudinal Retention Curve
              </h2>
              <p className="text-xs text-slate-400">Survival rate across 30d, 90d, 180d, and 365d checkpoints</p>
            </div>
            <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
              Kaplan-Meier Model
            </span>
          </div>

          {retention && (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={retention.retention_curve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="checkpoint" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => [`${val}%`, 'Retention Rate']}
                  />
                  <Area type="monotone" dataKey="retention_pct" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#retentionGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="mt-3 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-indigo-200">
            <span className="font-bold text-indigo-300">Retention Rule:</span> Trainee is considered retained if continuously employed at the designated measurement checkpoint. 6M Drop-off rate is <span className="font-bold text-white">30.2%</span>.
          </div>
        </div>

      </div>

      {/* Row 3: Course Benchmarks & Inferred Gaps (Hidden Mismatch Finder) */}
      <div className="glass-panel rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-400" />
              Course Outcome Benchmarks & Hidden Mismatch Detection
            </h2>
            <p className="text-xs text-slate-400">
              Compares certification rates vs. real-world placement & 6-month retention. Flags curriculum mismatches.
            </p>
          </div>
          <span className="text-xs text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/60 font-semibold">
            Certification ≠ Final Outcome
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Course & Sector</th>
                <th className="pb-3 font-semibold">Enrolled</th>
                <th className="pb-3 font-semibold">Cert Rate</th>
                <th className="pb-3 font-semibold">Placement Rate</th>
                <th className="pb-3 font-semibold">6M Retention</th>
                <th className="pb-3 font-semibold">Median Wage</th>
                <th className="pb-3 font-semibold">Inferred Skill Gaps</th>
                <th className="pb-3 font-semibold">Outcome Diagnosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {courses.slice(0, 8).map((c) => (
                <tr key={c.course_id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-slate-200">{c.course_name}</div>
                    <div className="text-[10px] text-slate-400">{c.sector} • {c.qp_code}</div>
                  </td>
                  <td className="py-3 font-mono text-slate-300">{c.total_enrolled}</td>
                  <td className="py-3 font-mono text-slate-300">{c.certification_rate}%</td>
                  <td className="py-3 font-mono font-bold text-emerald-400">{c.placement_rate}%</td>
                  <td className="py-3 font-mono text-indigo-300">{c.retention_6m_pct}%</td>
                  <td className="py-3 font-mono text-slate-200">₹{c.median_entry_wage.toLocaleString()}</td>
                  <td className="py-3">
                    {c.inferred_skill_gaps && c.inferred_skill_gaps.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {c.inferred_skill_gaps.map((g, idx) => (
                          <span key={idx} className="bg-rose-500/10 text-rose-300 text-[10px] px-1.5 py-0.5 rounded border border-rose-500/20 font-medium">
                            {g}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Curriculum Aligned</span>
                    )}
                  </td>
                  <td className="py-3">
                    {c.diagnosis === 'SKILL_MISMATCH_SUSPECTED' ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/20 px-2 py-1 text-[10px] font-bold text-rose-300 border border-rose-500/30">
                        <AlertTriangle className="h-3 w-3" /> Skill Mismatch
                      </span>
                    ) : c.diagnosis === 'HIGH_OUTCOME_BENCHMARK' ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="h-3 w-3" /> High Benchmark
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Moderate</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Skill Supply vs Demand & Attrition Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Skill Supply vs Demand */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-400" />
                Market Skill Supply vs. Industry Demand
              </h2>
              <p className="text-xs text-slate-400">Trained candidate supply vs. active employer vacancies</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Labour Market Intelligence</span>
          </div>

          <div className="space-y-3">
            {skills.slice(0, 5).map((s) => (
              <div key={s.skill_name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-200">{s.skill_name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    s.status === 'CRITICAL_SHORTAGE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    s.status === 'BALANCED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  }`}>
                    {s.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>Trained Supply: <span className="font-semibold text-slate-200">{s.supply_trained}</span></div>
                  <div>Employer Demand: <span className="font-semibold text-emerald-400">{s.industry_demand}</span></div>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, (s.supply_trained / Math.max(1, s.industry_demand)) * 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Attrition & Exit Intelligence */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Attrition & Non-Placement Intelligence
              </h2>
              <p className="text-xs text-slate-400">Observed statistical factors contributing to job separation</p>
            </div>
            <span className="text-xs text-amber-400 font-mono">Exit Survey NLU</span>
          </div>

          {retention && (
            <div className="space-y-2.5">
              {retention.attrition_reasons.map((r, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-200">{r.reason.replace(/_/g, ' ')}</span>
                    <span className="font-bold text-amber-400">{r.percentage}% ({r.count} exits)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{r.insight}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
