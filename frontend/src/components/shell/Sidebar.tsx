import React from 'react';
import { 
  Home, Users, BookOpen, Briefcase, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useFilterStore, PrimaryNavTab } from '../../store/useFilterStore';

export const Sidebar: React.FC = () => {
  const { 
    activeNavTab, setActiveNavTab, 
    sidebarCollapsed, toggleSidebar, language 
  } = useFilterStore();

  const navItems: Array<{ id: PrimaryNavTab; labelEn: string; labelHi: string; icon: React.ReactNode }> = [
    { id: 'home', labelEn: 'Executive Overview', labelHi: 'मुख्य पृष्ठ', icon: <Home className="h-4 w-4" /> },
    { id: 'trainees', labelEn: 'Trainee Directory', labelHi: 'प्रशिक्षार्थी पासपोर्ट', icon: <Users className="h-4 w-4" /> },
    { id: 'training', labelEn: 'Training Benchmarks', labelHi: 'प्रशिक्षण व प्रदाता', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'jobs', labelEn: 'Outcome Verification', labelHi: 'नियोक्ता सत्यापन', icon: <Briefcase className="h-4 w-4" /> }
  ];

  return (
    <aside 
      className={`relative z-20 shrink-0 border-r border-[#e0dfdc] dark:border-[#38434f] bg-white dark:bg-[#1b1f23] transition-all duration-300 flex flex-col justify-between shadow-2xs ${
        sidebarCollapsed ? 'w-16' : 'w-56 sm:w-60'
      }`}
    >
      <div className="py-4 space-y-3">
        {/* Organization / Persona Card */}
        {!sidebarCollapsed && (
          <div className="mx-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-[#0a66c2] text-white flex items-center justify-center font-bold text-xs">
                MH
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Govt of Maharashtra</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">MSSDS & NITI Aayog</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-1 px-2.5">
          {navItems.map((item) => {
            const isActive = activeNavTab === item.id;
            const label = language === 'hi' ? item.labelHi : item.labelEn;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNavTab(item.id)}
                title={sidebarCollapsed ? label : undefined}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#e8f3fc] dark:bg-[#0a66c2]/20 text-[#0a66c2] dark:text-[#70b3ed] font-bold border-l-4 border-[#0a66c2]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 border-l-4 border-transparent'
                }`}
              >
                <div className={`shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-[#0a66c2] dark:text-[#70b3ed]' : 'text-slate-500 dark:text-slate-400 group-hover:text-[#0a66c2]'}`}>
                  {item.icon}
                </div>

                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left tracking-tight">{label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Action: Collapse Toggle */}
      <div className="p-3 border-t border-[#e0dfdc] dark:border-[#38434f]">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <ChevronLeft className="h-3.5 w-3.5 text-[#0a66c2]" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};


