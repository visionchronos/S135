import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Eye, Trash2, ExternalLink, 
  CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Clock 
} from 'lucide-react';
import { TraineeDetailData } from '../../types';

interface ConsentControlCenterProps {
  trainee: TraineeDetailData;
}

export const ConsentControlCenter: React.FC<ConsentControlCenterProps> = ({ trainee }) => {
  const [consents, setConsents] = useState<Record<string, boolean>>({
    government_sharing: true,
    employer_sharing: true,
    research_sharing: false,
    analytics: true
  });

  const [isDataHoldOpen, setIsDataHoldOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  const toggleConsent = (key: string) => {
    setConsents(prev => {
      const next = { ...prev, [key]: !prev[key] };
      setSaveAlert(`Consent setting updated for ${key.replace('_', ' ')}. DPDP audit token logged.`);
      setTimeout(() => setSaveAlert(null), 3500);
      return next;
    });
  };

  const handleRequestDeletion = () => {
    setShowDeleteConfirm(false);
    setSaveAlert('Data deletion request registered under DPDP Act 2023 section 12. Verification ticket #DPDP-DEL-8821.');
    setTimeout(() => setSaveAlert(null), 5000);
  };

  const policyItems = [
    {
      key: 'government_sharing',
      title: 'Government Outcome Audit & Public Funding Linkage',
      purpose: 'Enables ministerial outcome verification for scheme disbursement, performance audits, and state skill mission benchmarking.',
      statutoryRequired: true
    },
    {
      key: 'employer_sharing',
      title: 'Employer Credential Verification & Direct Job Matching',
      purpose: 'Allows verified employers to inspect certified competencies and offer relevant job placements without paper resume friction.',
      statutoryRequired: false
    },
    {
      key: 'research_sharing',
      title: 'Anonymized Policy Research & Academic Longitudinal Studies',
      purpose: 'Shares de-identified milestone statistics for public policy impact research (never exposes phone or name).',
      statutoryRequired: false
    },
    {
      key: 'analytics',
      title: 'Adaptive Skill Gap Detection & Bridge Training Nudges',
      purpose: 'Enables platform ML to detect local curriculum shortages and recommend targeted reskilling bootcamps.',
      statutoryRequired: false
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-bold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Consent Control & Privacy Vault</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Compliant with India's <strong className="text-slate-300">Digital Personal Data Protection (DPDP) Act 2023</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>Last Audit: 2025-02-18 14:30 IST</span>
          </div>
        </div>

        {saveAlert && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{saveAlert}</span>
          </div>
        )}

        {/* Consent Policy Toggles */}
        <div className="space-y-3 pt-2">
          {policyItems.map((item) => {
            const isGranted = consents[item.key] ?? false;

            return (
              <div
                key={item.key}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-xs">{item.title}</span>
                    {item.statutoryRequired && (
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-bold text-slate-400 border border-slate-700">
                        Statutory Core
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl">{item.purpose}</p>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => toggleConsent(item.key)}
                  disabled={item.statutoryRequired}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                    isGranted ? 'bg-emerald-600' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isGranted ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Expandable "View What Data We Hold" */}
        <div className="pt-2">
          <button
            onClick={() => setIsDataHoldOpen(!isDataHoldOpen)}
            className="flex w-full items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-emerald-400" />
              <span>View Transparent Record of Data Held on VikasDrishti</span>
            </div>
            {isDataHoldOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {isDataHoldOpen && (
            <div className="mt-2 p-5 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-xs space-y-3 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Biographic & Identity</span>
                  <p className="text-slate-200 font-semibold mt-1">Full Name, Year of Birth, District, Tokenized Aadhaar Hash (Raw Aadhaar Never Stored)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Training & Certification</span>
                  <p className="text-slate-200 font-semibold mt-1">Course QP-NOS, Provider Name, Attendance %, Assessment Scores (Theory + Practical), Grade</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Livelihoods & Wages</span>
                  <p className="text-slate-200 font-semibold mt-1">Declared & Verified Monthly Wage, Employer Name, Employment Type, Retention Milestones (30/90/180/365d)</p>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Data Storage Location: <strong className="text-slate-200">MeitY Certified Sovereign Cloud (India)</strong> • Encryption: <strong className="text-slate-200">AES-256 at rest, TLS 1.3 in transit</strong>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions: DPDP Reference & Request Deletion */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 mt-4 text-xs">
          <a
            href="https://www.meity.gov.in/data-protection-framework"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>DPDP Act 2023 Citizen Rights Reference</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1.5 rounded-xl border border-rose-800/40 bg-rose-950/40 hover:bg-rose-900/60 px-3.5 py-1.5 text-xs font-bold text-rose-300 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Request Account & Data Deletion</span>
          </button>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-rose-800/60 bg-slate-900 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-base font-extrabold text-white">Confirm Data Deletion Request</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Under Section 12 of the DPDP Act 2023, you have the right to erase personal data. This will revoke your digital Skill Passport, QR verification credential, and automated employer matching.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestDeletion}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-600/20"
              >
                Proceed with Deletion Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
