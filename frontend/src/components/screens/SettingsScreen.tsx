import React, { useState } from 'react';
import { 
  Settings, Users, Bell, Clock, ShieldCheck, 
  BookOpen, Database, Lock, CheckCircle2, Save, Server, ShieldAlert, Cpu 
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'notifications' | 'rules' | 'outcomes' | 'privacy' | 'system'>('users');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = () => {
    setNotification('Configuration changes committed to sovereign audit ledger and propagated across cluster.');
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
              DPDP Act & NCrF Governance
            </span>
            <span className="text-xs text-slate-400">• National MSDE Compliance</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">System Governance & Privacy Controls</h1>
          <p className="text-xs text-slate-400">Configure outcome definitions, follow-up cadence, access control tiers, and DPDP compliance parameters</p>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2.5 animate-fade-in shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Tabbed Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold border-b border-slate-800/80 pb-3">
        {[
          { id: 'users', label: 'Users & RBAC', icon: <Users className="h-3.5 w-3.5" /> },
          { id: 'notifications', label: 'Automated Triggers', icon: <Bell className="h-3.5 w-3.5" /> },
          { id: 'rules', label: 'Follow-up Cadence', icon: <Clock className="h-3.5 w-3.5" /> },
          { id: 'outcomes', label: 'Outcome Definitions', icon: <BookOpen className="h-3.5 w-3.5" /> },
          { id: 'privacy', label: 'DPDP Consent Ledger', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
          { id: 'system', label: 'Sovereign Topology', icon: <Database className="h-3.5 w-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-bold'
                : 'bg-[#0e1626] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-7 rounded-2xl border border-slate-800/90 bg-[#0e1626]/80 backdrop-blur-md space-y-6 shadow-xl">
        
        {/* Users & Access */}
        {activeTab === 'users' && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-white">Role-Based Access Control (RBAC)</h3>
              <p className="text-slate-400 leading-relaxed mt-1">
                Define administrative permissions for Ministry officials, State Skill Missions (SSDM), Sector Skill Councils (SSC), and Training Providers.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white block">Central Ministry Administrators (MSDE)</span>
                  <span className="text-slate-400 text-[11px]">Full nationwide longitudinal visibility & policy recommendation deployment</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/25">12 Active Nodes</span>
              </div>

              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white block">District Skill Officers (DSO)</span>
                  <span className="text-slate-400 text-[11px]">District-level tracking, counsellor dispatch, and wage verification triage</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold">48 Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-white">Automated Alerts & Digest Rules</h3>
              <p className="text-slate-400 leading-relaxed mt-1">
                Configure trigger thresholds for automated WhatsApp alerts, email digests, and district intervention notifications.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 p-4 rounded-xl bg-[#090e18] border border-slate-800 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-emerald-500 bg-slate-900 border-slate-700 h-4 w-4" />
                <div>
                  <span className="font-bold text-white block">Send weekly outcome anomaly digests to District Officers</span>
                  <span className="text-slate-400 text-[11px]">Triggers when placement in any qualification pack drops &gt; 10% below benchmark</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl bg-[#090e18] border border-slate-800 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-emerald-500 bg-slate-900 border-slate-700 h-4 w-4" />
                <div>
                  <span className="font-bold text-white block">Dispatch employer follow-up reminders via WhatsApp API</span>
                  <span className="text-slate-400 text-[11px]">Automatically nudges HR for unconfirmed candidate hires after 14 days</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Follow-up Rules */}
        {activeTab === 'rules' && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-white">Longitudinal Follow-up Cadence</h3>
              <p className="text-slate-400 leading-relaxed mt-1">
                Automated multi-channel contact checkpoints (WhatsApp / SMS / IVR) scheduled following graduation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center pt-2">
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="font-bold text-emerald-400 block text-sm">Wave 1: Day 30</span>
                <span className="text-slate-400 text-[11px]">Initial placement & joining confirmation</span>
              </div>
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="font-bold text-emerald-400 block text-sm">Wave 2: Day 90</span>
                <span className="text-slate-400 text-[11px]">Workplace satisfaction & first increment</span>
              </div>
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="font-bold text-emerald-400 block text-sm">Wave 3: Day 180 (6M)</span>
                <span className="text-slate-400 text-[11px]">Primary longitudinal retention milestone</span>
              </div>
              <div className="p-4 rounded-xl bg-[#090e18] border border-slate-800">
                <span className="font-bold text-emerald-400 block text-sm">Wave 4: Day 365 (1Y)</span>
                <span className="text-slate-400 text-[11px]">Annual wage progression & career growth</span>
              </div>
            </div>
          </div>
        )}

        {/* Outcome Definitions */}
        {activeTab === 'outcomes' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-white">Standard Outcome Definitions (NCVET Aligned)</h3>
            <div className="space-y-2 text-slate-300 leading-relaxed">
              <p>• <strong>Verified Placement:</strong> Continuous employment for minimum 30 days verified by employer portal acknowledgement or statutory 1-click OTP confirmation.</p>
              <p>• <strong>6-Month Retention:</strong> Verified active livelihood at Day 180 with continuous wage growth or confirmed active enterprise for self-employed candidates.</p>
              <p>• <strong>Wage Progression:</strong> Net percentage increase in reported monthly earnings compared to initial entry starting wage.</p>
            </div>
          </div>
        )}

        {/* Consent & Privacy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-white">Digital Personal Data Protection (DPDP) Act 2023</h3>
            <p className="text-slate-300 leading-relaxed">
              All candidate records are tokenized with irreversible SHA-256 Aadhaar hashes. Raw biometrics and demographic PII are never retained in plaintext. Trainees retain statutory rights to view, export, or revoke consent for follow-up communications.
            </p>
          </div>
        )}

        {/* System & Storage */}
        {activeTab === 'system' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-white">Sovereign Data Storage & Cloud Topology</h3>
            <p className="text-slate-300 leading-relaxed">
              Hosting: <strong>MeitY Certified Sovereign Cloud Region (India)</strong> • Database: <strong>SQLAlchemy 2.0 / Encrypted SQLite with WAL</strong> • Encryption: <strong>AES-256</strong> at rest.
            </p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-800/80">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Save className="h-4 w-4" />
            <span>Commit Configuration Changes</span>
          </button>
        </div>

      </div>

    </div>
  );
};

