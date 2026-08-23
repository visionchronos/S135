import React, { useState } from 'react';
import { Users, X, Award, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

interface BatchCell {
  batchCode: string;
  quarter: string;
  placementRate: number;
  retentionRate: number;
  enrolledCount: number;
  trainees: Array<{
    id: string;
    name: string;
    status: string;
    wage: string;
    verified: boolean;
  }>;
}

interface CourseCohortRow {
  courseId: string;
  courseName: string;
  sector: string;
  batches: Record<string, BatchCell>;
}

export const CohortPerformanceGrid: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<{ courseName: string; batch: BatchCell } | null>(null);

  const cohortData: CourseCohortRow[] = [
    {
      courseId: 'c1',
      courseName: 'Solar Panel Installation Technician',
      sector: 'Green Energy / Solar',
      batches: {
        '2024-Q1': {
          batchCode: 'SOL-2024-01', quarter: '2024-Q1', placementRate: 88.5, retentionRate: 84.0, enrolledCount: 30,
          trainees: [
            { id: 'TR-101', name: 'Ramesh Patel', status: 'EMPLOYED', wage: '₹19,500', verified: true },
            { id: 'TR-102', name: 'Suresh Verma', status: 'EMPLOYED', wage: '₹18,000', verified: true },
            { id: 'TR-103', name: 'Geeta Rawat', status: 'APPRENTICE', wage: '₹14,000', verified: true }
          ]
        },
        '2024-Q2': {
          batchCode: 'SOL-2024-02', quarter: '2024-Q2', placementRate: 85.0, retentionRate: 81.5, enrolledCount: 32,
          trainees: [
            { id: 'TR-104', name: 'Manish Singh', status: 'EMPLOYED', wage: '₹20,000', verified: true },
            { id: 'TR-105', name: 'Pooja Joshi', status: 'EMPLOYED', wage: '₹19,000', verified: true }
          ]
        },
        '2024-Q3': {
          batchCode: 'SOL-2024-03', quarter: '2024-Q3', placementRate: 82.0, retentionRate: 78.0, enrolledCount: 28,
          trainees: [{ id: 'TR-106', name: 'Sunil Kumar', status: 'EMPLOYED', wage: '₹18,500', verified: true }]
        },
        '2024-Q4': {
          batchCode: 'SOL-2024-04', quarter: '2024-Q4', placementRate: 79.0, retentionRate: 76.0, enrolledCount: 35,
          trainees: [{ id: 'TR-107', name: 'Deepa Sharma', status: 'EMPLOYED', wage: '₹18,000', verified: false }]
        }
      }
    },
    {
      courseId: 'c2',
      courseName: 'General Duty Assistant (Healthcare)',
      sector: 'Healthcare',
      batches: {
        '2024-Q1': {
          batchCode: 'GDA-2024-01', quarter: '2024-Q1', placementRate: 84.0, retentionRate: 79.0, enrolledCount: 25,
          trainees: [{ id: 'TR-201', name: 'Anjali Sharma', status: 'EMPLOYED', wage: '₹17,500', verified: true }]
        },
        '2024-Q2': {
          batchCode: 'GDA-2024-02', quarter: '2024-Q2', placementRate: 81.0, retentionRate: 76.5, enrolledCount: 28,
          trainees: [{ id: 'TR-202', name: 'Kavita Patel', status: 'EMPLOYED', wage: '₹17,000', verified: true }]
        },
        '2024-Q3': {
          batchCode: 'GDA-2024-03', quarter: '2024-Q3', placementRate: 77.5, retentionRate: 73.0, enrolledCount: 30,
          trainees: [{ id: 'TR-203', name: 'Vandana Yadav', status: 'EMPLOYED', wage: '₹16,500', verified: false }]
        },
        '2024-Q4': {
          batchCode: 'GDA-2024-04', quarter: '2024-Q4', placementRate: 74.0, retentionRate: 69.5, enrolledCount: 30,
          trainees: [{ id: 'TR-204', name: 'Priya Meena', status: 'UNEMPLOYED', wage: '₹0', verified: false }]
        }
      }
    },
    {
      courseId: 'c3',
      courseName: 'Automotive Mechatronics Specialist',
      sector: 'Automotive',
      batches: {
        '2024-Q1': {
          batchCode: 'AUT-2024-01', quarter: '2024-Q1', placementRate: 78.0, retentionRate: 74.0, enrolledCount: 30,
          trainees: [{ id: 'TR-301', name: 'Vikram Singh', status: 'EMPLOYED', wage: '₹19,000', verified: true }]
        },
        '2024-Q2': {
          batchCode: 'AUT-2024-02', quarter: '2024-Q2', placementRate: 75.0, retentionRate: 71.0, enrolledCount: 28,
          trainees: [{ id: 'TR-302', name: 'Amit Sharma', status: 'EMPLOYED', wage: '₹18,500', verified: true }]
        },
        '2024-Q3': {
          batchCode: 'AUT-2024-03', quarter: '2024-Q3', placementRate: 68.0, retentionRate: 64.0, enrolledCount: 32,
          trainees: [{ id: 'TR-303', name: 'Rohit Verma', status: 'UNEMPLOYED', wage: '₹0', verified: false }]
        },
        '2024-Q4': {
          batchCode: 'AUT-2024-04', quarter: '2024-Q4', placementRate: 64.5, retentionRate: 59.0, enrolledCount: 35,
          trainees: [{ id: 'TR-304', name: 'Sanjay Gupta', status: 'UNEMPLOYED', wage: '₹0', verified: false }]
        }
      }
    },
    {
      courseId: 'c4',
      courseName: 'Domestic Data Entry Operator',
      sector: 'IT-ITeS',
      batches: {
        '2024-Q1': {
          batchCode: 'DDE-2024-01', quarter: '2024-Q1', placementRate: 54.0, retentionRate: 42.0, enrolledCount: 40,
          trainees: [{ id: 'TR-401', name: 'Rohan Gupta', status: 'UNEMPLOYED', wage: '₹0', verified: false }]
        },
        '2024-Q2': {
          batchCode: 'DDE-2024-02', quarter: '2024-Q2', placementRate: 48.0, retentionRate: 36.0, enrolledCount: 38,
          trainees: [{ id: 'TR-402', name: 'Sunita Meena', status: 'UNEMPLOYED', wage: '₹0', verified: false }]
        },
        '2024-Q3': {
          batchCode: 'DDE-2024-03', quarter: '2024-Q3', placementRate: 44.0, retentionRate: 32.0, enrolledCount: 45,
          trainees: [{ id: 'TR-403', name: 'Pooja Rawat', status: 'UNEMPLOYED', wage: '₹0', verified: false }]
        },
        '2024-Q4': {
          batchCode: 'DDE-2024-04', quarter: '2024-Q4', placementRate: 68.5, retentionRate: 54.2, enrolledCount: 42,
          trainees: [{ id: 'TR-404', name: 'Ankit Kumar', status: 'EMPLOYED', wage: '₹17,500', verified: true }]
        }
      }
    }
  ];

  const quarters = ['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'];

  const getCellColor = (rate: number) => {
    if (rate >= 75) return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/90';
    if (rate >= 60) return 'bg-amber-950/80 text-amber-300 border-amber-800/60 hover:bg-amber-900/90';
    return 'bg-rose-950/80 text-rose-300 border-rose-800/60 hover:bg-rose-900/90';
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">
              Course & Batch Cohort Performance Grid
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Quarterly placement conversion rates by course qualification • Click any cell to inspect batch candidate roster
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-2.5 w-2.5 rounded bg-emerald-500" /> &gt; 75% High
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-2.5 w-2.5 rounded bg-amber-500" /> 60-75% Moderate
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-2.5 w-2.5 rounded bg-rose-500" /> &lt; 60% At Risk
          </span>
        </div>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pr-4">Course Qualification</th>
              <th className="pb-3 pr-4">Sector</th>
              {quarters.map((q) => (
                <th key={q} className="pb-3 text-center px-2">{q}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {cohortData.map((row) => (
              <tr key={row.courseId} className="hover:bg-slate-950/40 transition-colors">
                <td className="py-3 pr-4 font-bold text-white max-w-xs">{row.courseName}</td>
                <td className="py-3 pr-4 text-slate-400 font-medium">{row.sector}</td>
                {quarters.map((q) => {
                  const b = row.batches[q];
                  if (!b) return <td key={q} className="text-center text-slate-600">-</td>;

                  return (
                    <td key={q} className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => setSelectedBatch({ courseName: row.courseName, batch: b })}
                        className={`w-full py-2 px-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer shadow-sm ${getCellColor(b.placementRate)}`}
                      >
                        <div>{b.placementRate}%</div>
                        <span className="text-[9px] font-normal opacity-80 block">{b.enrolledCount} trained</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Batch Detail Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white">{selectedBatch.courseName}</h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  Batch Code: {selectedBatch.batch.batchCode} ({selectedBatch.batch.quarter})
                </span>
              </div>
              <button 
                onClick={() => setSelectedBatch(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block font-bold">Placement Rate</span>
                <span className="text-base font-black text-emerald-400">{selectedBatch.batch.placementRate}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block font-bold">6M Retention</span>
                <span className="text-base font-black text-teal-400">{selectedBatch.batch.retentionRate}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block font-bold">Batch Size</span>
                <span className="text-base font-black text-white">{selectedBatch.batch.enrolledCount}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Batch Trainee Roster:
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {selectedBatch.batch.trainees.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{t.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono ml-2">{t.id}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Reported Wage: <strong className="text-emerald-400">{t.wage}</strong></span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'EMPLOYED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {t.status}
                      </span>
                      <span className="text-[9px] text-slate-500 block mt-1">
                        {t.verified ? '✓ Statutory Verified' : '○ Self-Reported'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBatch(null)}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                Close Roster
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
