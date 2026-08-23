import React from 'react';
import { 
  ShieldCheck, Layers, Award, Sparkles, Globe, 
  PlayCircle, RefreshCw, BarChart3, Users, Building2, BrainCircuit
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDemo: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDemo,
  language,
  setLanguage
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-lg">
                NEXUS <span className="text-emerald-400 font-extrabold">VikasDrishti</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                v2.0 Outcome Intelligence
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              National Longitudinal Skilling Outcomes & Closed-Loop Policy Platform
            </p>
          </div>
        </div>

        {/* Navigation Switcher Tabs */}
        <div className="hidden md:flex items-center gap-1 rounded-xl bg-slate-900/90 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('government')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'government'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            {language === 'hi' ? 'नीति व सरकार' : 'Policy & Government'}
          </button>

          <button
            onClick={() => setActiveTab('provider')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'provider'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            {language === 'hi' ? 'प्रशिक्षण प्रदाता' : 'Training Provider'}
          </button>

          <button
            onClick={() => setActiveTab('trainee')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'trainee'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            {language === 'hi' ? 'प्रशिक्षार्थी पासपोर्ट' : 'Trainee Passport'}
          </button>

          <button
            onClick={() => setActiveTab('employer')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'employer'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {language === 'hi' ? 'नियोक्ता सत्यापन' : 'Employer Verify'}
          </button>

          <button
            onClick={() => setActiveTab('intelligence')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'intelligence'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BrainCircuit className="h-3.5 w-3.5 text-emerald-300" />
            {language === 'hi' ? 'इंटेलिजेंस व एआई' : 'Self-Improve Loop & ML'}
          </button>
        </div>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-3">
          {/* Interactive Guided Demo Button */}
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400 transition-all cursor-pointer"
          >
            <PlayCircle className="h-4 w-4 fill-slate-950" />
            <span className="font-extrabold tracking-wide">
              {language === 'hi' ? 'लाइव 9-चरण डेमो' : '9-Step Closed-Loop Demo'}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                language === 'en' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                language === 'hi' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
