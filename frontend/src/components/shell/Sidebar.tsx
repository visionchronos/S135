import React from 'react';
import { 
  Home, Users, BookOpen, Briefcase, 
  BarChart2, AlertTriangle, Settings, 
  ChevronLeft, ChevronRight, PlayCircle, Sparkles 
} from 'lucide-react';
import { useFilterStore, PrimaryNavTab } from '../../store/useFilterStore';

interface SidebarProps {
  onOpenDemo?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenDemo }) => {
  const { 
    activeNavTab, setActiveNavTab, 
    sidebarCollapsed, toggleSidebar, language 
  } = useFilterStore();

  const navItems: Array<{ id: PrimaryNavTab; labelEn: string; labelHi: string; icon: React.ReactNode; badge?: string; badgeColor?: string }> = [
    { id: 'home', labelEn: 'Overview', labelHi: 'मुख्य पृष्ठ', icon: <Home className="h-4 w-4" /> },
    { id: 'trainees', labelEn: 'Trainees & Passports', labelHi: 'प्रशिक्षार्थी पासपोर्ट', icon: <Users className="h-4 w-4" /> },
    { id: 'training', labelEn: 'Training & Partners', labelHi: 'प्रशिक्षण व प्रदाता', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'jobs', labelEn: 'Employer Verification', labelHi: 'नियोक्ता सत्यापन', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'insights', labelEn: 'Explainable AI & Fairness', labelHi: 'एआई व निष्पक्षता', icon: <BarChart2 className="h-4 w-4" /> },
    { id: 'actions', labelEn: 'Closed-Loop Actions', labelHi: 'कार्य योजना चक्र', icon: <AlertTriangle className="h-4 w-4" />, badge: '7', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40' },
    { id: 'settings', labelEn: 'DPDP & System Config', labelHi: 'सेटिंग्स व सहमति', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <aside 
      className={`relative z-20 shrink-0 border-r border-slate-800/80 bg-[#070b12]/95 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
        sidebarCollapsed ? 'w-16' : 'w-56 sm:w-64'
      }`}
    >
      <div className="py-4 space-y-1">
        {/* Navigation list */}
        <nav className="space-y-1.5 px-2.5">
          {navItems.map((item) => {
            const isActive = activeNavTab === item.id;
            const label = language === 'hi' ? item.labelHi : item.labelEn;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNavTab(item.id)}
                title={sidebarCollapsed ? label : undefined}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                {/* Active left glowing bar */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-emerald-400 shadow-glow-sm"></span>
                )}

                <div className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'}`}>
                  {item.icon}
                </div>

                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left tracking-wide">{label}</span>
                )}

                {!sidebarCollapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Action: Interactive Guided Tour & Collapse Toggle */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        {onOpenDemo && !sidebarCollapsed && (
          <button
            onClick={onOpenDemo}
            className="w-full flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0e1626] to-[#121d33] hover:from-emerald-950/60 hover:to-teal-950/60 border border-slate-800 hover:border-emerald-500/40 p-2.5 text-xs text-slate-300 hover:text-emerald-300 font-semibold transition-all cursor-pointer shadow-sm group"
          >
            <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-[11px] font-bold text-white group-hover:text-emerald-300">Live 9-Step Tour</div>
              <div className="text-[9px] text-slate-400">Judges Walkthrough</div>
            </div>
          </button>
        )}

        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-[#0e1626]/60 hover:bg-[#0e1626] text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800/80"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

