import React from 'react';
import { 
  ComposedChart, Line, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { TrendingUp, Briefcase, Award, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TraineeDetailData } from '../../types';

interface CareerTrackerProps {
  trainee: TraineeDetailData;
}

export const CareerTracker: React.FC<CareerTrackerProps> = ({ trainee }) => {
  const wageData = [
    { wave: 'Day 0 (Join)', traineeWage: 18000, districtP25: 14500, districtP75: 18500, annotation: 'Joined Tata Power' },
    { wave: 'Day 30', traineeWage: 18000, districtP25: 14800, districtP75: 18700 },
    { wave: 'Day 90', traineeWage: 19500, districtP25: 15000, districtP75: 19000, annotation: 'Performance Increment +₹1,500' },
    { wave: 'Day 180 (6M)', traineeWage: 21500, districtP25: 15200, districtP75: 19500, annotation: 'Promoted to Lead Technician' },
    { wave: 'Day 365 (1Y)', traineeWage: 24000, districtP25: 15500, districtP75: 20000, annotation: 'Annual Appraisal' }
  ];

  const employmentTimeline = [
    {
      employer: 'Tata Power Renewables Ltd',
      role: 'Senior Solar PV Installation Technician',
      startDate: '2024-12-10',
      endDate: 'Present',
      startingWage: 18000,
      currentWage: 21500,
      verificationTier: 'Tier 4 (Statutory EPF Confirmed)',
      score: 96
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">Longitudinal Wage Progression & Benchmarking</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Candidate real income progression plotted against district P25-P75 median wage corridor
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-xl bg-emerald-950/80 px-3 py-1.5 border border-emerald-800/60 font-bold text-emerald-300">
              Total Growth: +33.3% in 12 Months
            </span>
          </div>
        </div>

        {/* Recharts Composed Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={wageData} margin={{ top: 15, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="wave" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[12000, 26000]} unit="₹" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                labelStyle={{ fontWeight: 'bold', color: '#f8fafc' }}
                formatter={(val: any, name: any) => [
                  `₹${Number(val).toLocaleString()}/month`,
                  name === 'traineeWage' ? 'Trainee Monthly Salary' : name === 'districtP75' ? 'District Top 25% (P75)' : 'District Bottom 25% (P25)'
                ]}
              />
              <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} />
              
              {/* District Median Corridor Area */}
              <Area type="monotone" dataKey="districtP75" name="District Top 25% (P75)" stroke="#475569" fill="#1e293b" fillOpacity={0.4} />
              <Area type="monotone" dataKey="districtP25" name="District Bottom 25% (P25)" stroke="#334155" fill="#0f172a" fillOpacity={0.6} />

              {/* Trainee Wage Progression Line */}
              <Line type="monotone" dataKey="traineeWage" name="Trainee Monthly Wage" stroke="#10b981" strokeWidth={3.5} dot={{ r: 4, fill: '#10b981' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employment Timeline & Skill Utilisation Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Briefcase className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">Verified Employment & Livelihood History</h3>
          </div>

          <div className="space-y-3">
            {employmentTimeline.map((emp, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{emp.role}</h4>
                    <p className="text-xs text-slate-300 font-medium">{emp.employer}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    Active Employment
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 border-t border-slate-800/60">
                  <div>Tenure: <span className="font-bold text-white block">{emp.startDate} → {emp.endDate}</span></div>
                  <div>Joining Pay: <span className="font-bold text-slate-300 block">₹{emp.startingWage.toLocaleString()}</span></div>
                  <div>Current Pay: <span className="font-bold text-emerald-400 block">₹{emp.currentWage.toLocaleString()}</span></div>
                  <div>Verification: <span className="font-bold text-teal-300 block">{emp.score}% Confirmed</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Utilisation Gauge (1 col) */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="h-5 w-5 text-amber-400" />
            <h3 className="text-sm font-extrabold text-white">Skill Utilisation Index</h3>
          </div>

          <div className="text-center py-4 space-y-2">
            <div className="text-4xl font-black text-emerald-400 tracking-tight">92.4%</div>
            <span className="text-xs font-bold text-slate-200 block">Optimal Role & Competency Match</span>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
              Candidate utilizes 92.4% of certified competencies (High-Voltage Inverters & Solar Stringing) daily on the job.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Zero curriculum deficit detected by employer.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
