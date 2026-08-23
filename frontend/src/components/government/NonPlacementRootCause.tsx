import React, { useState } from 'react';
import { 
  Treemap, ResponsiveContainer, Tooltip 
} from 'recharts';
import { AlertTriangle, Users, X, ChevronRight, HelpCircle } from 'lucide-react';
import { AttritionReasonBreakdown } from '../../types';

interface NonPlacementRootCauseProps {
  reasons?: AttritionReasonBreakdown[];
}

interface CauseNode {
  name: string;
  size: number;
  pct: string;
  color: string;
  description: string;
  sampleTrainees: Array<{ id: string; name: string; course: string; district: string; detail: string }>;
}

export const NonPlacementRootCause: React.FC<NonPlacementRootCauseProps> = ({ reasons }) => {
  const [selectedCause, setSelectedCause] = useState<CauseNode | null>(null);

  const causes: CauseNode[] = [
    {
      name: 'Demand Gap (Market Saturation)',
      size: 680,
      pct: '28.0%',
      color: '#f43f5e',
      description: 'Lack of local employer job openings matching qualification in candidate district.',
      sampleTrainees: [
        { id: 'TR-1024', name: 'Ankit Verma', course: 'Domestic Data Entry Operator', district: 'Lucknow', detail: 'Zero local IT data entry requisitions open within 25km radius.' },
        { id: 'TR-1099', name: 'Pooja Rawat', course: 'Sewing Machine Operator', district: 'Patna', detail: 'Apparel cluster capacity saturated in district industrial zone.' },
        { id: 'TR-1142', name: 'Manish Kumar', course: 'Retail Sales Associate', district: 'Ranchi', detail: 'No formal mall/retail store hiring active during Q4.' }
      ]
    },
    {
      name: 'Skill Mismatch (Curriculum Deficit)',
      size: 590,
      pct: '24.3%',
      color: '#e11d48',
      description: 'Employer assessment rejected candidate due to absent practical/software competency.',
      sampleTrainees: [
        { id: 'TR-2041', name: 'Rohan Gupta', course: 'Domestic Data Entry Operator', district: 'Ahmedabad', detail: 'Employer required PowerBI & Advanced VLOOKUP (not in QP-NOS curriculum).' },
        { id: 'TR-2188', name: 'Sunita Meena', course: 'Solar Panel Installation Technician', district: 'Jaipur', detail: 'Practical high-voltage inverter grid-tie sync was not trained.' }
      ]
    },
    {
      name: 'Geographic Constraint (Commute / Relocation)',
      size: 460,
      pct: '18.9%',
      color: '#ea580c',
      description: 'Candidate unable to relocate or commute > 35km without transport subsidy.',
      sampleTrainees: [
        { id: 'TR-3012', name: 'Deepa Joshi', course: 'General Duty Assistant (Healthcare)', district: 'Guwahati', detail: 'Hospital placement in metro city rejected due to lack of safe hostel accommodation.' },
        { id: 'TR-3088', name: 'Vikram Singh', course: 'Automotive Mechatronics', district: 'Bhopal', detail: 'Daily commute 42km with no public transit connecting rural block to auto plant.' }
      ]
    },
    {
      name: 'Personal & Family Health Reasons',
      size: 340,
      pct: '14.0%',
      color: '#d97706',
      description: 'Family caregiving obligations, health conditions, or marriage relocation.',
      sampleTrainees: [
        { id: 'TR-4022', name: 'Kavita Patel', course: 'Front Office Associate', district: 'Surat', detail: 'Family caregiving responsibilities required temporary career pause.' }
      ]
    },
    {
      name: 'Wage Exploitation / Below Living Benchmark',
      size: 240,
      pct: '9.9%',
      color: '#b45309',
      description: 'Employer offered starting pay >20% below district living wage without benefits.',
      sampleTrainees: [
        { id: 'TR-5011', name: 'Amit Sharma', course: 'Warehouse Packaging Executive', district: 'Pune', detail: 'Offered ₹10,500/mo for 12hr shifts vs district benchmark ₹18,500.' }
      ]
    },
    {
      name: 'Unknown / Non-Responsive Signal',
      size: 120,
      pct: '4.9%',
      color: '#64748b',
      description: 'Trainee unreachable across 3 digital follow-up waves; field verification queued.',
      sampleTrainees: [
        { id: 'TR-6001', name: 'Sanjay Yadav', course: 'CNC Operator', district: 'Bhubaneswar', detail: 'Phone SIM changed; counsellor home visit scheduled for physical verification.' }
      ]
    }
  ];

  // Custom Treemap Content Renderer
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = causes[index];
    if (!item || width < 45 || height < 35) return null;

    return (
      <g
        onClick={() => setSelectedCause(item)}
        className="cursor-pointer group"
      >
        <rect
          x={x + 2}
          y={y + 2}
          width={width - 4}
          height={height - 4}
          rx={8}
          fill={item.color}
          stroke="#0f172a"
          strokeWidth={2}
          opacity={0.88}
          className="hover:opacity-100 transition-opacity"
        />
        <text
          x={x + 10}
          y={y + 22}
          fill="#ffffff"
          fontSize={width > 120 ? '12' : '10'}
          fontWeight="800"
          fontFamily="sans-serif"
        >
          {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
        </text>
        <text
          x={x + 10}
          y={y + 38}
          fill="#f8fafc"
          fontSize="11"
          fontWeight="700"
          fontFamily="monospace"
        >
          {item.size} ({item.pct})
        </text>
      </g>
    );
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            <h3 className="text-base font-extrabold text-white">
              Non-Placement & 6M Attrition Root-Cause Taxonomy
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured hierarchical classification of candidate non-placement and dropouts • Click any leaf to inspect affected cohort
          </p>
        </div>

        <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-800/40 font-bold">
          2,430 Tracked Dropouts Analyzed
        </span>
      </div>

      {/* Treemap Visualization */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={causes}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#0f172a"
            content={<CustomizedContent />}
          >
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const node = payload[0].payload as CauseNode;
                  return (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs space-y-1">
                      <div className="font-bold text-white">{node.name}</div>
                      <div className="text-rose-400 font-bold">{node.size} Trainees ({node.pct})</div>
                      <p className="text-slate-400 text-[11px] max-w-xs">{node.description}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>

      {/* Cause Breakdown Legend Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        {causes.map((c) => (
          <div
            key={c.name}
            onClick={() => setSelectedCause(c)}
            className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <span className="font-bold text-slate-300 truncate max-w-[130px]">{c.name.split('(')[0]}</span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">{c.pct}</span>
          </div>
        ))}
      </div>

      {/* Affected Trainee Cohort Modal */}
      {selectedCause && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{selectedCause.name}</h3>
                  <span className="text-[10px] text-rose-400 font-mono font-bold">
                    {selectedCause.size} Trainees Affected ({selectedCause.pct} of total non-placement)
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCause(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {selectedCause.description}
            </p>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Sample Affected Trainee Telemetry Logs:
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {selectedCause.sampleTrainees.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-white">{t.name}</span>
                      <span className="text-emerald-400 font-mono text-[10px]">{t.id}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {t.course} • District: <strong className="text-slate-300">{t.district}</strong>
                    </div>
                    <div className="text-[11px] text-rose-300/90 pt-0.5">
                      Diagnosis: {t.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCause(null)}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                Close Cohort View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
