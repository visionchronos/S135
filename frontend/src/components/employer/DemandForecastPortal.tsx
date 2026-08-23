import React, { useState } from 'react';
import { Briefcase, TrendingUp, PlusCircle, CheckCircle2, Users, MapPin, Sparkles } from 'lucide-react';

interface HiringDemandPosting {
  id: string;
  sector: string;
  roleTitle: string;
  district: string;
  volumeNeeded: number;
  quarter: string;
  minNsqfLevel: number;
  availableSupply: number;
  fillRatePct: number;
  postedDate: string;
}

export const DemandForecastPortal: React.FC = () => {
  const [postings, setPostings] = useState<HiringDemandPosting[]>([
    {
      id: 'hp-1',
      sector: 'Green Energy / Solar',
      roleTitle: 'Solar PV Grid Rooftop Technician',
      district: 'Ahmedabad',
      volumeNeeded: 40,
      quarter: 'Q1-FY26',
      minNsqfLevel: 4,
      availableSupply: 62,
      fillRatePct: 100,
      postedDate: '2025-02-10'
    },
    {
      id: 'hp-2',
      sector: 'Automotive',
      roleTitle: 'Electric Vehicle Service & Battery Specialist',
      district: 'Pune',
      volumeNeeded: 35,
      quarter: 'Q1-FY26',
      minNsqfLevel: 5,
      availableSupply: 22,
      fillRatePct: 62.8,
      postedDate: '2025-02-12'
    },
    {
      id: 'hp-3',
      sector: 'Healthcare',
      roleTitle: 'Emergency Medical & General Duty Assistant',
      district: 'Bengaluru',
      volumeNeeded: 50,
      quarter: 'Q2-FY26',
      minNsqfLevel: 4,
      availableSupply: 48,
      fillRatePct: 96.0,
      postedDate: '2025-02-15'
    }
  ]);

  // Form State
  const [sector, setSector] = useState('Green Energy / Solar');
  const [roleTitle, setRoleTitle] = useState('');
  const [district, setDistrict] = useState('Ahmedabad');
  const [volumeNeeded, setVolumeNeeded] = useState<number>(20);
  const [quarter, setQuarter] = useState('Q1-FY26');
  const [minNsqfLevel, setMinNsqfLevel] = useState<number>(4);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) return;

    const newPosting: HiringDemandPosting = {
      id: `hp-${Date.now()}`,
      sector,
      roleTitle: roleTitle.trim(),
      district,
      volumeNeeded,
      quarter,
      minNsqfLevel,
      availableSupply: Math.round(volumeNeeded * 1.15),
      fillRatePct: 95.0,
      postedDate: new Date().toISOString().split('T')[0]
    };

    setPostings([newPosting, ...postings]);
    setRoleTitle('');
    setNotification(`Future hiring requisition of ${volumeNeeded} candidates registered for ${sector}. Notified regional training providers.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const districtSupplySummary = [
    { district: 'Ahmedabad', topSector: 'Green Energy / Solar', certifiedCount: 380, matchRate: 94 },
    { district: 'Pune', topSector: 'Automotive', certifiedCount: 420, matchRate: 91 },
    { district: 'Bengaluru', topSector: 'IT-ITeS & Healthcare', certifiedCount: 560, matchRate: 96 },
    { district: 'Hyderabad', topSector: 'Healthcare', certifiedCount: 340, matchRate: 88 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 font-bold">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Forward Hiring Demand & Skill Aggregation</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Broadcast future manpower requisitions directly to training providers to shape upcoming batch curricula
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-800/40 font-bold">
          {postings.reduce((a, b) => a + b.volumeNeeded, 0)} Total Vacancies Projected
        </span>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Form & District Supply Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">Broadcast New Hiring Intent</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Industry Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="Green Energy / Solar">Green Energy / Solar</option>
                  <option value="Automotive">Automotive & EV</option>
                  <option value="Healthcare">Healthcare & Paramedical</option>
                  <option value="IT-ITeS">IT-ITeS & Analytics</option>
                  <option value="Logistics">Logistics & Supply Chain</option>
                  <option value="Construction">Construction & Civil</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Target District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="Ahmedabad">Ahmedabad, Gujarat</option>
                  <option value="Pune">Pune, Maharashtra</option>
                  <option value="Bengaluru">Bengaluru, Karnataka</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Role Title / Job Specification</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Solar Inverter Grid-Tie Commissioning Specialist"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Volume Needed</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={volumeNeeded}
                  onChange={(e) => setVolumeNeeded(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Target Horizon</label>
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="Q1-FY26">Q1-FY26 (Apr-Jun)</option>
                  <option value="Q2-FY26">Q2-FY26 (Jul-Sep)</option>
                  <option value="Q3-FY26">Q3-FY26 (Oct-Dec)</option>
                  <option value="Q4-FY26">Q4-FY26 (Jan-Mar)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Min NSQF Level</label>
                <select
                  value={minNsqfLevel}
                  onChange={(e) => setMinNsqfLevel(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer font-mono"
                >
                  <option value={3}>Level 3 (Assistant)</option>
                  <option value={4}>Level 4 (Technician)</option>
                  <option value={5}>Level 5 (Supervisor)</option>
                  <option value={6}>Level 6 (Specialist)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                Publish Hiring Demand to Regional Providers
              </button>
            </div>
          </form>
        </div>

        {/* Right Supply Snapshot (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">Live Certified Talent Pool By District</h3>
          </div>

          <div className="space-y-3">
            {districtSupplySummary.map((d, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-white flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>{d.district}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{d.topSector}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400 text-sm block">{d.certifiedCount} Ready</span>
                  <span className="text-[10px] text-teal-300 font-semibold">{d.matchRate}% Match Index</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Demand Postings Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-extrabold text-white">Active Hiring Requisitions & Talent Fill Rates</h3>
          <span className="text-xs text-slate-400 font-mono">Real-time Candidate Pipeline</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">Role Title & Sector</th>
                <th className="pb-3 pr-4">District</th>
                <th className="pb-3 pr-4">Volume Needed</th>
                <th className="pb-3 pr-4">Available Supply</th>
                <th className="pb-3 pr-4">Fill Rate</th>
                <th className="pb-3 text-right">Target Horizon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {postings.map((p) => (
                <tr key={p.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="font-extrabold text-white">{p.roleTitle}</div>
                    <div className="text-[11px] text-slate-400">{p.sector} • NSQF Level {p.minNsqfLevel}</div>
                  </td>
                  <td className="py-3 pr-4 text-slate-300 font-medium">{p.district}</td>
                  <td className="py-3 pr-4 font-bold text-white font-mono">{p.volumeNeeded}</td>
                  <td className="py-3 pr-4 font-bold text-emerald-400 font-mono">{p.availableSupply} Candidates</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${Math.min(p.fillRatePct, 100)}%` }}
                        />
                      </div>
                      <span className="font-mono text-emerald-400 text-[11px] font-bold">{p.fillRatePct}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right font-mono text-slate-300 font-bold">{p.quarter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
