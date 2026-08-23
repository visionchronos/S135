import React, { useState } from 'react';
import { Briefcase, Send, CheckCircle2, Clock, ShieldCheck, FileCheck, AlertCircle } from 'lucide-react';

interface EmployerQueueItem {
  id: string;
  employerName: string;
  industry: string;
  pendingCount: number;
  lastContactDate: string;
  verificationTier: string;
  trainees: Array<{ name: string; course: string; wage: string }>;
}

export const EmployerQueuePanel: React.FC = () => {
  const [queue, setQueue] = useState<EmployerQueueItem[]>([
    {
      id: 'eq-1',
      employerName: 'Tata Power Renewables Ltd',
      industry: 'Green Energy / Solar',
      pendingCount: 6,
      lastContactDate: '2025-02-14',
      verificationTier: 'Tier 2 (Employer OTP)',
      trainees: [
        { name: 'Ramesh Patel', course: 'Solar Panel Technician', wage: '₹19,500' },
        { name: 'Suresh Verma', course: 'Solar Panel Technician', wage: '₹18,000' }
      ]
    },
    {
      id: 'eq-2',
      employerName: 'Apollo Healthcare Logistics',
      industry: 'Healthcare',
      pendingCount: 4,
      lastContactDate: '2025-02-10',
      verificationTier: 'Tier 3 (Salary Slip)',
      trainees: [
        { name: 'Anjali Sharma', course: 'General Duty Assistant', wage: '₹17,500' }
      ]
    },
    {
      id: 'eq-3',
      employerName: 'L&T Construction Heavy Civil',
      industry: 'Construction',
      pendingCount: 5,
      lastContactDate: '2025-02-08',
      verificationTier: 'Tier 4 (Statutory EPF)',
      trainees: [
        { name: 'Manish Kumar', course: 'Bar Bender & Steel Fixer', wage: '₹16,500' }
      ]
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleSendReminder = (employerName: string) => {
    setNotification(`Statutory OTP verification reminder dispatched to HR at ${employerName}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleMarkVerified = (id: string, employerName: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    setNotification(`All pending candidate outcomes verified for ${employerName} via document audit.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">
              Employer Verification Queue & Engagement Hub
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Track declared placement appointments pending employer HR acknowledgement and statutory verification
          </p>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40 font-bold">
          {queue.reduce((acc, q) => acc + q.pendingCount, 0)} Trainees Awaiting Confirmation
        </span>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Queue Items */}
      <div className="space-y-3">
        {queue.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            ✓ All employer verifications are up to date!
          </div>
        ) : (
          queue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{item.employerName}</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    {item.industry}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                  <span>Pending Confirmations: <strong className="text-emerald-400 font-mono">{item.pendingCount}</strong></span>
                  <span>•</span>
                  <span>Last Contact: <strong className="text-slate-300">{item.lastContactDate}</strong></span>
                  <span>•</span>
                  <span>Tier: <strong className="text-teal-300 font-mono text-[11px]">{item.verificationTier}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => handleSendReminder(item.employerName)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                >
                  <Send className="h-3 w-3 text-amber-400" />
                  <span>Send Reminder</span>
                </button>

                <button
                  onClick={() => handleMarkVerified(item.id, item.employerName)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>Mark Verified</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
