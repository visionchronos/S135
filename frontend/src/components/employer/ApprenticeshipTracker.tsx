import React, { useState } from 'react';
import { Award, Users, TrendingUp, Calendar, CheckCircle2, Clock, BarChart3 } from 'lucide-react';

interface ApprenticeItem {
  id: string;
  name: string;
  trade: string;
  napsId: string;
  startDate: string;
  endDate: string;
  stipend: number;
  tradeTestStatus: 'PASS' | 'PENDING' | 'SCHEDULED';
  conversionStatus: 'CONVERTED' | 'ACTIVE_APPRENTICE' | 'COMPLETED_OFFERED';
  startMonthOffset: number; // 0 to 11
  durationMonths: number;
}

export const ApprenticeshipTracker: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'gantt'>('table');

  const apprentices: ApprenticeItem[] = [
    { id: 'ap-1', name: 'Ramesh Patel', trade: 'Solar PV Installation', napsId: 'NAPS-2024-88412', startDate: '2024-06-01', endDate: '2024-11-30', stipend: 14000, tradeTestStatus: 'PASS', conversionStatus: 'CONVERTED', startMonthOffset: 5, durationMonths: 6 },
    { id: 'ap-2', name: 'Geeta Rawat', trade: 'Solar Power Inverter Technician', napsId: 'NAPS-2024-88419', startDate: '2024-07-01', endDate: '2024-12-31', stipend: 14000, tradeTestStatus: 'PASS', conversionStatus: 'CONVERTED', startMonthOffset: 6, durationMonths: 6 },
    { id: 'ap-3', name: 'Manish Singh', trade: 'Solar PV System Testing', napsId: 'NAPS-2024-88502', startDate: '2024-08-01', endDate: '2025-01-31', stipend: 14500, tradeTestStatus: 'PASS', conversionStatus: 'CONVERTED', startMonthOffset: 7, durationMonths: 6 },
    { id: 'ap-4', name: 'Pooja Joshi', trade: 'Electrical Maintenance Specialist', napsId: 'NAPS-2024-88514', startDate: '2024-09-01', endDate: '2025-02-28', stipend: 14500, tradeTestStatus: 'PENDING', conversionStatus: 'ACTIVE_APPRENTICE', startMonthOffset: 8, durationMonths: 6 },
    { id: 'ap-5', name: 'Sunil Kumar', trade: 'Solar Rooftop Grid Engineer', napsId: 'NAPS-2024-88620', startDate: '2024-10-01', endDate: '2025-03-31', stipend: 15000, tradeTestStatus: 'SCHEDULED', conversionStatus: 'ACTIVE_APPRENTICE', startMonthOffset: 9, durationMonths: 6 }
  ];

  const totalApprentices = apprentices.length;
  const convertedCount = apprentices.filter(a => a.conversionStatus === 'CONVERTED').length;
  const conversionRate = Math.round((convertedCount / totalApprentices) * 100);

  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  return (
    <div className="space-y-6">
      
      {/* Top Conversion Rate KPI Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-950/80 border border-teal-800/60 text-teal-400 font-bold shadow-lg">
            <Award className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">NAPS / NATS Apprenticeship Track & Transition</h2>
              <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-bold text-teal-400 border border-teal-500/30">
                Statutory Scheme Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitor on-the-job training stipends, trade assessment tests, and post-apprentice full-time employment conversion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Apprentice to Full-Time Lift</span>
            <div className="text-2xl font-black text-teal-400">{conversionRate}% Conversion</div>
          </div>
          <div className="text-right border-l border-slate-800 pl-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Government Subsidy</span>
            <div className="text-sm font-black text-white font-mono">₹1,500/mo DBT</div>
          </div>
        </div>
      </div>

      {/* Main Panel with View Switcher */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">Apprentice Candidate Roster & Timeline</h3>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('gantt')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'gantt' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Gantt Timeline View
            </button>
          </div>
        </div>

        {/* View Mode: Table */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Apprentice Name</th>
                  <th className="pb-3 pr-4">Trade Specification</th>
                  <th className="pb-3 pr-4">NAPS ID</th>
                  <th className="pb-3 pr-4">Period</th>
                  <th className="pb-3 pr-4">Stipend</th>
                  <th className="pb-3 pr-4">Trade Test</th>
                  <th className="pb-3 text-right">Conversion Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {apprentices.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 pr-4 font-extrabold text-white">{a.name}</td>
                    <td className="py-3 pr-4 text-slate-300">{a.trade}</td>
                    <td className="py-3 pr-4 font-mono text-emerald-400 text-[11px]">{a.napsId}</td>
                    <td className="py-3 pr-4 text-slate-400">{a.startDate} → {a.endDate}</td>
                    <td className="py-3 pr-4 font-bold text-white font-mono">₹{a.stipend.toLocaleString()}/mo</td>
                    <td className="py-3 pr-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        a.tradeTestStatus === 'PASS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {a.tradeTestStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        a.conversionStatus === 'CONVERTED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      }`}>
                        {a.conversionStatus === 'CONVERTED' ? '✓ Converted to Full-Time' : '○ Active On-the-Job'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* View Mode: Gantt Timeline */
          <div className="space-y-4 pt-2 overflow-x-auto">
            <div className="min-w-[650px] space-y-3">
              
              {/* Month Header */}
              <div className="grid grid-cols-12 gap-1 text-[10px] font-bold text-slate-500 text-center border-b border-slate-800 pb-2">
                {months.map((m, i) => (
                  <div key={i}>{m}</div>
                ))}
              </div>

              {/* Gantt Rows */}
              {apprentices.map((a) => (
                <div key={a.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{a.name} ({a.trade})</span>
                    <span className="text-emerald-400 text-[10px] font-mono">{a.conversionStatus}</span>
                  </div>

                  <div className="grid grid-cols-12 gap-1 h-7 bg-slate-950 rounded-xl p-1 border border-slate-800/80">
                    <div 
                      className={`h-full rounded-lg text-[9px] font-bold text-slate-950 flex items-center justify-center transition-all ${
                        a.conversionStatus === 'CONVERTED' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-teal-400 to-cyan-400'
                      }`}
                      style={{
                        gridColumnStart: a.startMonthOffset + 1,
                        gridColumnEnd: a.startMonthOffset + 1 + a.durationMonths
                      }}
                    >
                      {a.durationMonths} Months OJT
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
