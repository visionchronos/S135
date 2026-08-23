import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { BarChart3, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { SkillSupplyDemandGap } from '../../types';

interface SkillDemandSupplyMatrixProps {
  gaps?: SkillSupplyDemandGap[];
}

export const SkillDemandSupplyMatrix: React.FC<SkillDemandSupplyMatrixProps> = ({ gaps }) => {
  const [horizon, setHorizon] = useState<'current' | 'forecast'>('current');

  const defaultSectorGaps = [
    { sector: 'IT-ITeS', supply_count: 2400, demand_count: 3600, gap: -1200, shortage: true },
    { sector: 'Green Energy / Solar', supply_count: 1500, demand_count: 2300, gap: -800, shortage: true },
    { sector: 'Healthcare', supply_count: 1800, demand_count: 2500, gap: -700, shortage: true },
    { sector: 'Automotive', supply_count: 1600, demand_count: 2100, gap: -500, shortage: true },
    { sector: 'Logistics', supply_count: 1400, demand_count: 1800, gap: -400, shortage: true },
    { sector: 'Construction', supply_count: 1200, demand_count: 1450, gap: -250, shortage: true },
    { sector: 'Apparel & Textiles', supply_count: 1100, demand_count: 1150, gap: -50, shortage: true },
    { sector: 'Tourism & Hospitality', supply_count: 950, demand_count: 900, gap: 50, shortage: false }
  ];

  // Adjust for 12-Month Forecast multiplier
  const multiplier = horizon === 'forecast' ? 1.45 : 1.0;

  const data = defaultSectorGaps.map((item) => {
    const supply = Math.round(item.supply_count * (horizon === 'forecast' ? 1.25 : 1.0));
    const demand = Math.round(item.demand_count * multiplier);
    const gap = supply - demand;
    return {
      sector: item.sector,
      trained_supply: supply,
      employer_demand: demand,
      gap: gap,
      has_shortage: gap < 0
    };
  }).sort((a, b) => a.gap - b.gap); // Sorted by shortage deficit descending

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header & Forecast Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">
              Labour Market Skill Supply vs Employer Demand Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Trained certified supply vs active industry vacancies sorted by acute shortage gap
          </p>
        </div>

        {/* Horizon Toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setHorizon('current')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              horizon === 'current' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Current Quarter (Q4)
          </button>
          <button
            onClick={() => setHorizon('forecast')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              horizon === 'forecast' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            12-Month Projected Forecast
          </button>
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="sector" 
              stroke="#64748b" 
              fontSize={10} 
              angle={-20}
              textAnchor="end"
              interval={0}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
              labelStyle={{ fontWeight: 'bold', color: '#f8fafc' }}
              formatter={(val: any, name: any) => [
                Number(val).toLocaleString() + ' candidates',
                name === 'trained_supply' ? 'Trained Supply' : 'Employer Demand'
              ]}
            />
            <Legend 
              verticalAlign="top" 
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} 
            />
            <Bar dataKey="trained_supply" name="Trained Candidate Supply" fill="#0d9488" radius={[4, 4, 0, 0]} />
            <Bar dataKey="employer_demand" name="Employer Vacancy Demand" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Acute Shortage Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40">
          <div className="flex items-center gap-1.5 font-bold text-rose-300">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Highest Deficit: IT-ITeS</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Shortage of <span className="text-rose-400 font-bold font-mono">1,200</span> candidates in PowerBI & Data Analytics.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40">
          <div className="flex items-center gap-1.5 font-bold text-rose-300">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Green Energy Shortage</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Shortage of <span className="text-rose-400 font-bold font-mono">800</span> Solar PV grid rooftop technicians.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Equilibrium: Tourism</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Supply matches demand with a small surplus of <span className="text-emerald-400 font-bold font-mono">+50</span>.
          </p>
        </div>
      </div>

    </div>
  );
};
