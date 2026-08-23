import React, { useState } from 'react';
import { 
  CheckSquare, AlertTriangle, Clock, Send, 
  Download, ArrowRight, CheckCircle2, UserCheck, 
  Sparkles, RefreshCw, Zap, ShieldAlert 
} from 'lucide-react';

interface TriageItem {
  id: string;
  name: string;
  skillId: string;
  course: string;
  daysPassed: number;
  flagDetail: string;
  recommendedAction: string;
}

export const ActionRequiredDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'unemployed' | 'pending_verify' | 'skill_gap' | 'low_response'>('unemployed');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const unemployedItems: TriageItem[] = [
    { id: 'TR-1004', name: 'Rohan Gupta', skillId: 'SKILL-IND-2025-100004', course: 'Domestic Data Entry Operator', daysPassed: 68, flagDetail: 'Certified 68 days ago; zero job placements logged.', recommendedAction: 'Match with Active BPO Vacancies' },
    { id: 'TR-1019', name: 'Pooja Rawat', skillId: 'SKILL-IND-2025-100019', course: 'Apparel Stitching Executive', daysPassed: 64, flagDetail: 'Certified 64 days ago; declined far-commute unit.', recommendedAction: 'Nudge for Local Tailoring SHG' },
    { id: 'TR-1033', name: 'Manish Kumar', skillId: 'SKILL-IND-2025-100033', course: 'Solar Panel Technician', daysPassed: 61, flagDetail: 'Certified 61 days ago; pending apprentice opening.', recommendedAction: 'Trigger NAPS Apprenticeship Contract' }
  ];

  const pendingVerifyItems: TriageItem[] = [
    { id: 'TR-2008', name: 'Anjali Sharma', skillId: 'SKILL-IND-2025-100008', course: 'General Duty Assistant', daysPassed: 34, flagDetail: 'Declared employment at Apollo Hospital 34 days ago without OTP.', recommendedAction: 'Dispatch Employer Statutory Reminder' },
    { id: 'TR-2021', name: 'Vikram Singh', skillId: 'SKILL-IND-2025-100021', course: 'Automotive Mechatronics', daysPassed: 31, flagDetail: 'Declared wage ₹18,500; employer verification pending.', recommendedAction: 'Request Salary Slip Upload' }
  ];

  const skillGapItems: TriageItem[] = [
    { id: 'TR-3011', name: 'Sunita Meena', skillId: 'SKILL-IND-2025-100011', course: 'Domestic Data Entry Operator', daysPassed: 45, flagDetail: 'Curriculum gap score 0.48 in Advanced Excel / PowerBI.', recommendedAction: 'Auto-Enroll in 20hr Bridge Bootcamp' },
    { id: 'TR-3042', name: 'Sanjay Yadav', skillId: 'SKILL-IND-2025-100042', course: 'CNC Operator', daysPassed: 40, flagDetail: 'Inferred precision tolerance deficit on high-speed lathe.', recommendedAction: 'Assign Practical Refresher Module' }
  ];

  const lowResponseItems: TriageItem[] = [
    { id: 'TR-4003', name: 'Deepa Joshi', skillId: 'SKILL-IND-2025-100003', course: 'Front Office Executive', daysPassed: 18, flagDetail: 'Day 90 WhatsApp and IVR calls unanswered (2 retries).', recommendedAction: 'Dispatch Field Counsellor Home Visit' },
    { id: 'TR-4015', name: 'Amit Sharma', skillId: 'SKILL-IND-2025-100015', course: 'Warehouse Associate', daysPassed: 14, flagDetail: 'Phone number SIM changed; WhatsApp bounce.', recommendedAction: 'Query Aadhaar Multi-Token Re-Link' }
  ];

  const getActiveList = (): TriageItem[] => {
    switch (activeTab) {
      case 'unemployed': return unemployedItems;
      case 'pending_verify': return pendingVerifyItems;
      case 'skill_gap': return skillGapItems;
      case 'low_response': return lowResponseItems;
    }
  };

  const currentList = getActiveList();

  const handleSelectAll = () => {
    if (selectedIds.length === currentList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentList.map(i => i.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAction = (item: TriageItem) => {
    setActionSuccess(`Action initiated for ${item.name}: "${item.recommendedAction}"`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleBulkAction = () => {
    if (selectedIds.length === 0) return;
    setActionSuccess(`Bulk operation executed for ${selectedIds.length} candidate(s).`);
    setSelectedIds([]);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['Trainee_ID', 'Name', 'Skill_ID', 'Course', 'Days_Flagged', 'Detail', 'Action'];
    const rows = currentList.map(c => [c.id, c.name, c.skillId, `"${c.course}"`, c.daysPassed, `"${c.flagDetail}"`, `"${c.recommendedAction}"`].join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `triage_${activeTab}_records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950/80 border border-amber-800/60 text-amber-400 font-bold">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Priority Action Required Triage Desk</h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated flags requiring provider counselor intervention & remediation</p>
          </div>
        </div>

        {/* Export & Bulk Action */}
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkAction}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Bulk Remediate ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2 text-xs font-bold">
        <button
          onClick={() => { setActiveTab('unemployed'); setSelectedIds([]); }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'unemployed'
              ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Unemployed Graduates</span>
          <span className="rounded-full bg-rose-500/20 px-1.5 py-0.2 text-[10px] text-rose-400 font-extrabold">
            {unemployedItems.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('pending_verify'); setSelectedIds([]); }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'pending_verify'
              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Pending Verifications</span>
          <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] text-amber-400 font-extrabold">
            {pendingVerifyItems.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('skill_gap'); setSelectedIds([]); }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'skill_gap'
              ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Skill Gap Alerts</span>
          <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.2 text-[10px] text-indigo-400 font-extrabold">
            {skillGapItems.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('low_response'); setSelectedIds([]); }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'low_response'
              ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Low Response Rate</span>
          <span className="rounded-full bg-teal-500/20 px-1.5 py-0.2 text-[10px] text-teal-400 font-extrabold">
            {lowResponseItems.length}
          </span>
        </button>
      </div>

      {/* Action Notification Alert */}
      {actionSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        </div>
      )}

      {/* Triage List Rows */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIds.length === currentList.length && currentList.length > 0}
              onChange={handleSelectAll}
              className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
            <span>Candidate & Course</span>
          </div>
          <span>Flag Severity & Action</span>
        </div>

        {currentList.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-950 border-emerald-500/50 shadow-md'
                  : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(item.id)}
                  className="mt-1 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-xs">{item.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                      {item.skillId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.course}</p>
                  <p className="text-[11px] text-rose-400/90 mt-1 font-medium">{item.flagDetail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 mr-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.daysPassed}d</span>
                </div>

                <button
                  onClick={() => handleAction(item)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white px-3 py-1.5 text-xs font-bold text-slate-200 transition-all cursor-pointer border border-slate-700"
                >
                  <Zap className="h-3 w-3 text-amber-400" />
                  <span>{item.recommendedAction}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
