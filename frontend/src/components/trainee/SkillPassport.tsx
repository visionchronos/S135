import React, { useState } from 'react';
import { 
  Award, ShieldCheck, QrCode, Download, Share2, 
  ExternalLink, CheckCircle2, Copy, Sparkles, Check 
} from 'lucide-react';
import { TraineeDetailData } from '../../types';

interface SkillPassportProps {
  trainee: TraineeDetailData;
}

export const SkillPassport: React.FC<SkillPassportProps> = ({ trainee }) => {
  const [copied, setCopied] = useState(false);

  const profile = trainee.profile || {
    id: trainee.id || 'tr-1',
    skill_id: trainee.skill_id || 'SKILL-IND-2025-100000',
    full_name: trainee.full_name || 'Gaurav Yadav',
    gender: trainee.gender || 'MALE',
    district: trainee.district || 'Ahmedabad',
    state: trainee.state || 'Gujarat',
    current_status: trainee.current_status || 'EMPLOYED',
    created_at: '2025-01-15'
  };

  const course = trainee.course || trainee.training || {
    course_name: 'Solar Panel Installation Technician',
    qp_code: 'SGJ/Q0101',
    sector: 'Green Energy / Solar',
    nsqf_level: 4,
    provider_name: 'Tata Strive Skill Development',
    training_centre_name: 'Ahmedabad Green Tech Hub',
    batch_start: '2024-09-01',
    batch_end: '2024-11-30'
  };

  const skills = [
    { name: 'Solar PV Module Stringing & Mounting', proficiency: 94, verified: true },
    { name: 'Grid-Tie Inverter Wiring & Sync', proficiency: 90, verified: true },
    { name: 'Electrical Safety & Earthing Protocols', proficiency: 96, verified: true },
    { name: 'System Preventive Maintenance & Testing', proficiency: 88, verified: true }
  ];

  const certifications = [
    { name: 'NCVET Certificate - Solar PV Installation Specialist (NSQF-4)', date: '2024-12-05', digilockerId: 'DL-2024-NCVET-882194' },
    { name: 'Skill India Assessment Distinction Credential', date: '2024-12-01', digilockerId: 'DL-2024-SI-991201' }
  ];

  const verifyUrl = `https://vikasdhrishti.gov.in/verify/${profile.skill_id}`;

  const handleShare = () => {
    navigator.clipboard.writeText(verifyUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Digital Skill ID Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl shadow-emerald-500/10">
        
        {/* Top ID Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-4">
            {/* Trainee Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/30">
              {profile.full_name.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">{profile.full_name}</h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="h-3 w-3" /> Statutory Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                Persistent Skill ID: <span className="text-emerald-400 font-bold">{profile.skill_id}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                {profile.district}, {profile.state} • Qualification: <strong className="text-slate-200">{course.course_name}</strong>
              </p>
            </div>
          </div>

          {/* QR Code Verification Box */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 text-slate-950 shadow-md">
            <QrCode className="h-16 w-16 text-slate-900" />
            <span className="text-[9px] font-bold tracking-tight text-slate-700 mt-1">
              Scan to Verify
            </span>
          </div>
        </div>

        {/* Passport Two Columns: Skills & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
          
          {/* Left Column: Verified Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Verified Competency Portfolio</span>
            </div>

            <div className="space-y-3">
              {skills.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      {s.name}
                    </span>
                    <span className="text-emerald-400 font-mono">{s.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                      style={{ width: `${s.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Statutory Certifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              <Award className="h-4 w-4 text-cyan-400" />
              <span>Accredited Credentials & DigiLocker</span>
            </div>

            <div className="space-y-3">
              {certifications.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-bold text-white text-xs block">{c.name}</span>
                    <span className="text-[10px] text-slate-400 block">Issued on {c.date} • {course.provider_name}</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800/40 inline-block mt-1">
                      {c.digilockerId}
                    </span>
                  </div>

                  <a 
                    href="#digilocker" 
                    title="View DigiLocker Credential"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-6 mt-6">
          <div className="text-[11px] text-slate-400">
            Official QR-verifiable credential powered by <strong className="text-slate-200">NCVET & VikasDrishti</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Passport'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF Passport</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
