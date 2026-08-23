import React, { useState, useEffect, useRef } from 'react';
import { 
   TrendingUp, Search, Bell, Sun, Moon, Globe, 
   ChevronDown, User, Check, X, Shield, Sparkles, Building2, 
   Play, Briefcase, GraduationCap
} from 'lucide-react';
import { useFilterStore, UserRole } from '../../store/useFilterStore';
import { api } from '../../services/api';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'Trainee' | 'Provider' | 'Course';
}

interface TopNavProps {
  onOpenDemo?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenDemo }) => {
  const { 
    currentRole, setCurrentRole, 
    language, toggleLanguage, 
    theme, toggleTheme,
    searchQuery, setSearchQuery,
    navigateToTrainee, navigateToCourse, setActiveNavTab
  } = useFilterStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsRoleDropdownOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live search handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const trainees = await api.getTrainees(1, 4, searchQuery);
        const results: SearchResult[] = [];

        // Trainee results
        (trainees.items || []).forEach((t: any) => {
          results.push({
            id: t.skill_id || t.id,
            title: t.full_name,
            subtitle: `${t.skill_id} • ${t.district} • ${t.current_status}`,
            category: 'Trainee'
          });
        });

        // Synthetic provider matches
        const providerNames = [
          'Apollo MedSkills Institute', 'Tata Strive Skill Development', 
          'L&T Construction Skills Training', 'Centum Learning Center', 'Pratham Institute'
        ];
        providerNames
          .filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
          .forEach((p, idx) => {
            results.push({
              id: `prov-${idx}`,
              title: p,
              subtitle: 'Accredited NSDC Training Partner • Tier-1',
              category: 'Provider'
            });
          });

        setSearchResults(results);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const roles: { role: UserRole; title: string; subtitle: string; icon: any }[] = [
    { role: 'Government', title: 'Policy Administrator', subtitle: 'National MSDE & NCVET Oversight', icon: Shield },
    { role: 'Provider', title: 'Training Partner', subtitle: 'Batch Management & QP Benchmarks', icon: GraduationCap },
    { role: 'Trainee', title: 'Certified Trainee', subtitle: 'Digital Skill Passport & Wage Tracking', icon: User },
    { role: 'Employer', title: 'Industry Employer', subtitle: '1-Click Statutory Verification', icon: Briefcase },
    { role: 'Demo', title: '5-Min Guided Tour', subtitle: 'Interactive 9-Step Evaluation Walkthrough', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b12]/95 backdrop-blur-2xl transition-colors">
      {/* Subtle National Tricolor Edge Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-orange-500/80 via-white/80 to-emerald-500/80"></div>

      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setActiveNavTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 p-0.5 shadow-lg shadow-emerald-500/15 border border-emerald-400/30 group-hover:border-emerald-400/60 transition-all">
            <div className="w-full h-full bg-[#090e18] rounded-[10px] flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-400 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Vikas<span className="text-emerald-400">Drishti</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/25">
                v2.4 Live
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 tracking-wide">
              MSDE • Longitudinal Skilling Outcome Platform
            </p>
          </div>
        </div>

        {/* Centre: Global Search Bar */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <div 
            onClick={() => {
              setIsSearchOpen(true);
              searchInputRef.current?.focus();
            }}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0e1626]/80 px-3.5 py-2 text-xs text-slate-400 hover:border-slate-700 hover:bg-[#121c30] transition-all cursor-pointer shadow-inner"
          >
            <div className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'प्रशिक्षु आईडी या पाठ्यक्रम खोजें...' : 'Search Trainee ID, Course, Provider...'}
                className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-48 lg:w-60"
              />
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-slate-700/80 bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 shadow-sm">
              ⌘K
            </kbd>
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && (searchResults.length > 0 || searchQuery.trim().length > 0) && (
            <div className="absolute left-0 right-0 top-12 rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-2xl p-2 z-50 animate-fade-in">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>{isSearching ? 'Searching registry...' : `Results (${searchResults.length})`}</span>
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto py-1 space-y-1">
                {searchResults.length === 0 && !isSearching ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    No matching records found in verified database
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        if (item.category === 'Trainee') {
                          navigateToTrainee(item.id);
                        } else {
                          setActiveNavTab('training');
                        }
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-800/80 transition-all cursor-pointer"
                    >
                      <div className={`mt-0.5 p-1.5 rounded-lg text-xs font-bold ${
                        item.category === 'Trainee' 
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' 
                          : 'bg-blue-950/80 text-blue-400 border border-blue-800/40'
                      }`}>
                        {item.category === 'Trainee' ? <User className="h-3.5 w-3.5" /> : <Building2 className="h-3.5 w-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200 truncate">{item.title}</span>
                          <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Guided Demo Trigger */}
          {onOpenDemo && (
            <button
              onClick={onOpenDemo}
              className="hidden lg:flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 border border-emerald-400/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>5-Min Live Tour</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title="Toggle Language (EN / Hindi)"
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-[#0e1626] px-2.5 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-[#0e1626] text-slate-400 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-[#0e1626] text-slate-400 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-sm">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-11 w-80 rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-2xl p-3 z-50 animate-fade-in space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-bold text-xs text-white">
                  <span>Policy Alerts & Notifications</span>
                  <span className="text-[10px] text-emerald-400 font-mono">3 Active</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => { setActiveNavTab('actions'); setIsNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/20 hover:border-amber-500/40 cursor-pointer space-y-1 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 text-xs">Placement Drop Anomaly</span>
                      <span className="text-[9px] font-bold text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded">Action Req</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Data Entry placement fell 12% in Q4; PowerBI intervention drafted.</p>
                  </div>

                  <div 
                    onClick={() => { setActiveNavTab('jobs'); setIsNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer space-y-1 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-xs">Employer Confirmations</span>
                      <span className="text-[9px] font-bold text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">3 Pending</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Tata Power & Apollo Hospital submitted 1-click outcome verifications.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0e1626] px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-slate-700 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                {currentRole[0]}
              </div>
              <span className="hidden sm:inline font-semibold">{currentRole} View</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 top-11 w-64 rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                <span className="block px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Select User Persona
                </span>
                {roles.map((item) => {
                  const Icon = item.icon;
                  const isSelected = currentRole === item.role;
                  return (
                    <button
                      key={item.role}
                      onClick={() => {
                        setCurrentRole(item.role);
                        setIsRoleDropdownOpen(false);
                        if (item.role === 'Demo' && onOpenDemo) {
                          onOpenDemo();
                        }
                      }}
                      className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                          : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg text-xs mt-0.5 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{item.title}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

