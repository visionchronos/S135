import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, CheckCircle2, AlertCircle, 
  Upload, XCircle, FileText, Clock, Zap, Check 
} from 'lucide-react';

interface TraineeCandidateVerification {
  id: string;
  name: string;
  skillId: string;
  course: string;
  startDate: string;
  declaredWage: number;
  tier: number;
  tierLabel: string;
  status: 'PENDING' | 'CONFIRMED' | 'DISPUTED';
  verificationHistory: Array<{ date: string; action: string; actor: string; detail: string }>;
}

export const VerificationHub: React.FC = () => {
  const [candidates, setCandidates] = useState<TraineeCandidateVerification[]>([
    {
      id: 'emp-v1',
      name: 'Ramesh Patel',
      skillId: 'SKILL-IND-2025-100001',
      course: 'Solar Panel Installation Technician',
      startDate: '2024-12-10',
      declaredWage: 19500,
      tier: 2,
      tierLabel: 'Tier 2 (Trainee Declared + Mobile OTP)',
      status: 'PENDING',
      verificationHistory: [
        { date: '2024-12-10', action: 'Trainee Self-Declaration', actor: 'Trainee WhatsApp AI', detail: 'Reported joining Tata Power Renewables as Solar Technician.' },
        { date: '2024-12-12', action: 'Mobile OTP Verification', actor: 'System Gateway', detail: 'Trainee registered SIM authenticated.' }
      ]
    },
    {
      id: 'emp-v2',
      name: 'Suresh Verma',
      skillId: 'SKILL-IND-2025-100002',
      course: 'Solar Panel Installation Technician',
      startDate: '2024-12-15',
      declaredWage: 18000,
      tier: 1,
      tierLabel: 'Tier 1 (Trainee Declared Only)',
      status: 'PENDING',
      verificationHistory: [
        { date: '2024-12-15', action: 'Trainee Self-Declaration', actor: 'Trainee App', detail: 'Declared entry-level appointment.' }
      ]
    },
    {
      id: 'emp-v3',
      name: 'Pooja Joshi',
      skillId: 'SKILL-IND-2025-100005',
      course: 'Solar Electrical Maintenance Specialist',
      startDate: '2024-12-20',
      declaredWage: 19000,
      tier: 3,
      tierLabel: 'Tier 3 (Payslip Uploaded)',
      status: 'PENDING',
      verificationHistory: [
        { date: '2024-12-20', action: 'Appointment Registered', actor: 'Provider', detail: 'Batch campus drive placement offer.' },
        { date: '2025-01-05', action: 'Payslip OCR Verified', actor: 'OCR Engine', detail: 'Verified gross monthly wage ₹19,000 matches declaration.' }
      ]
    }
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<TraineeCandidateVerification>(candidates[0]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleConfirmSingle = (id: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        const updated = {
          ...c,
          status: 'CONFIRMED' as const,
          tier: 4,
          tierLabel: 'Tier 4 (Employer Statutory Confirmed)',
          verificationHistory: [
            ...c.verificationHistory,
            {
              date: new Date().toISOString().split('T')[0],
              action: 'Employer 1-Click Verification',
              actor: 'Tata Power HR Portal',
              detail: 'HR confirmed appointment, job role, and declared monthly wage.'
            }
          ]
        };
        if (selectedCandidate.id === id) setSelectedCandidate(updated);
        return updated;
      }
      return c;
    }));

    setNotification('Candidate appointment confirmed with Tier 4 statutory assurance.');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleBulkConfirm = () => {
    setCandidates(prev => prev.map(c => ({
      ...c,
      status: 'CONFIRMED' as const,
      tier: 4,
      tierLabel: 'Tier 4 (Employer Statutory Confirmed)'
    })));

    setNotification(`1-Click Bulk Verified all pending candidates! Composite assurance upgraded.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDispute = (id: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        const updated = {
          ...c,
          status: 'DISPUTED' as const,
          verificationHistory: [
            ...c.verificationHistory,
            {
              date: new Date().toISOString().split('T')[0],
              action: 'Employer Disputed Appointment',
              actor: 'HR Portal',
              detail: 'Candidate not on payroll records; flagged for counsellor audit.'
            }
          ]
        };
        if (selectedCandidate.id === id) setSelectedCandidate(updated);
        return updated;
      }
      return c;
    }));

    setNotification('Record disputed and dispatched to district verification queue.');
    setTimeout(() => setNotification(null), 3500);
  };

  const pendingCount = candidates.filter(c => c.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      
      {/* Header & Bulk Verify Action */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-bold">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Employer Statutory Verification Hub</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Confirm declared candidate hires, validate starting wages, and establish ground-truth compliance
            </p>
          </div>
        </div>

        {pendingCount > 0 && (
          <button
            onClick={handleBulkConfirm}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>1-Click Bulk Confirm All ({pendingCount})</span>
          </button>
        )}
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Candidate List (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Declared Appointments Awaiting Verification
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-bold">
              {pendingCount} Pending
            </span>
          </div>

          <div className="space-y-3">
            {candidates.map((c) => {
              const isSelected = selectedCandidate.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-950 border-emerald-500/60 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">{c.name}</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                          {c.skillId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{c.course}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      c.status === 'CONFIRMED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : c.status === 'DISPUTED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-800/60">
                    <div>Joined: <strong className="text-slate-300 block">{c.startDate}</strong></div>
                    <div>Declared Wage: <strong className="text-emerald-400 block">₹{c.declaredWage.toLocaleString()}/mo</strong></div>
                    <div className="col-span-2 sm:col-span-1">
                      Current Tier: <strong className="text-cyan-300 text-[10px] block truncate">{c.tierLabel.split('(')[0]}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  {c.status === 'PENDING' && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDispute(c.id);
                        }}
                        className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 border border-slate-700 px-3 py-1 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Dispute</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmSingle(c.id);
                        }}
                        className="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Confirm Hire</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Verification Audit Timeline (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Verification Audit Trail
            </span>
            <span className="text-xs font-bold text-white">{selectedCandidate.name}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Assigned Verification Tier:</span>
              <span className="font-bold text-emerald-400 font-mono">Tier {selectedCandidate.tier}</span>
            </div>
            <p className="text-[11px] text-slate-300 font-semibold">{selectedCandidate.tierLabel}</p>
          </div>

          {/* Timeline Events */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Multi-Signal History:
            </span>

            <div className="space-y-3 pl-2 border-l-2 border-slate-800">
              {selectedCandidate.verificationHistory.map((h, i) => (
                <div key={i} className="relative pl-4 text-xs space-y-0.5">
                  <div className="absolute -left-[17px] top-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white">{h.action}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{h.date}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold block">{h.actor}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{h.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
