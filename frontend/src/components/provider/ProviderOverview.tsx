import React from 'react';
import { 
  Building2, Award, Users, CheckCircle2, TrendingUp, 
  MapPin, ShieldCheck, ArrowRight, BarChart3 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';

export const ProviderOverview: React.FC = () => {
  const providerDetails = {
    name: 'Tata Strive Skill Development Institute',
    type: 'NSDC Accredited Training Partner • Tier-1',
    district: 'Ahmedabad (State HQ) & 4 Regional Centres',
    accreditationStatus: 'Grade A+ Certified',
    kpis: {
      enrolled: 820,
      certified: 772,
      certifiedPct: 94.2,
      placed: 668,
      placedPct: 86.5,
      retained6m: 633,
      retainedPct: 82.0
    }
  };

  // Funnel chart data
  const funnelData = [
    { stage: '1. Enrolled', count: 820, fill: '#3b82f6', drop: '100%' },
    { stage: '2. Certified', count: 772, fill: '#06b6d4', drop: '94.2% completion' },
    { stage: '3. Placed (Verified)', count: 668, fill: '#10b981', drop: '86.5% placement' },
    { stage: '4. 6M Retained', count: 633, fill: '#059669', drop: '82.0% retention' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-black shadow-lg">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">{providerDetails.name}</h2>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                {providerDetails.accreditationStatus}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">
              {providerDetails.type} • <MapPin className="inline h-3 w-3 text-slate-400 ml-1" /> {providerDetails.district}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-slate-950 px-3 py-2 border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
            Provider Code: TP-IND-GUJ-0042
          </span>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Enrolled</span>
          <div className="text-2xl font-black text-white">{providerDetails.kpis.enrolled}</div>
          <span className="text-[10px] text-slate-400 font-medium">100% Unique Skill Tokens</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Certified Graduates</span>
          <div className="text-2xl font-black text-cyan-400">{providerDetails.kpis.certified}</div>
          <span className="text-[10px] text-cyan-300 font-bold">{providerDetails.kpis.certifiedPct}% Pass Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Placed (Verified)</span>
          <div className="text-2xl font-black text-emerald-400">{providerDetails.kpis.placed}</div>
          <span className="text-[10px] text-emerald-300 font-bold">{providerDetails.kpis.placedPct}% Verified Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">6-Month Retention</span>
          <div className="text-2xl font-black text-teal-400">{providerDetails.kpis.retained6m}</div>
          <span className="text-[10px] text-teal-300 font-bold">{providerDetails.kpis.retainedPct}% Longitudinal Survival</span>
        </div>

      </div>

      {/* Horizontal Placement & Retention Funnel */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">Longitudinal Outcome Conversion Funnel</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Stage Conversion Efficiency</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
              <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 900]} />
              <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={11} width={130} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                labelStyle={{ fontWeight: 'bold', color: '#f8fafc' }}
                formatter={(val: any) => [`${val} Candidates`, 'Cohort Count']}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
          {funnelData.map((d, i) => (
            <div key={i} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block">{d.stage}</span>
              <span className="font-bold text-white text-sm">{d.count}</span>
              <span className="text-[10px] text-emerald-400 block">{d.drop}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
