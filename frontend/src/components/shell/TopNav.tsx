import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, Search, Sun, Moon, Globe, 
  User, X, Building2, ShieldCheck, Activity
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { api } from '../../services/api';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'Trainee' | 'Provider' | 'Course';
}

export const TopNav: React.FC = () => {
  const { 
    language, toggleLanguage, 
    theme, toggleTheme,
    searchQuery, setSearchQuery,
    navigateToTrainee, setActiveNavTab
  } = useFilterStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e0dfdc] dark:border-[#38434f] bg-white/95 dark:bg-[#1b1f23]/95 backdrop-blur-md transition-colors shadow-sm">
      {/* Subtle National Tricolor Edge Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-orange-500/80 via-white/80 to-emerald-500/80"></div>

      <div className="flex h-14 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setActiveNavTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0a66c2] text-white shadow-sm font-black text-sm group-hover:bg-[#004182] transition-colors">
            VD
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#0a66c2] transition-colors">
                Vikas<span className="text-[#0a66c2]">Drishti</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f3fc] dark:bg-[#0a66c2]/20 px-2 py-0.5 text-[10px] font-bold text-[#0a66c2] border border-[#0a66c2]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0a66c2] animate-pulse"></span>
                NITI Aayog
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              Maharashtra Skilling & Livelihood Intelligence
            </p>
          </div>
        </div>

        {/* Centre: LinkedIn-style Search Bar */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <div 
            onClick={() => {
              setIsSearchOpen(true);
              searchInputRef.current?.focus();
            }}
            className="flex items-center justify-between rounded-md border border-transparent bg-[#edf3f8] dark:bg-[#283340] px-3.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-[#e4ebf2] dark:hover:bg-[#313e4f] focus-within:border-[#0a66c2] focus-within:bg-white transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 w-full">
              <Search className="h-4 w-4 text-slate-500 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'प्रशिक्षु आईडी या पाठ्यक्रम खोजें...' : 'Search Trainee, Course, Provider...'}
                className="bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none w-full"
              />
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-1.5 py-0.5 text-[9px] font-mono text-slate-500 dark:text-slate-300 shadow-xs">
              ⌘K
            </kbd>
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && (searchResults.length > 0 || searchQuery.trim().length > 0) && (
            <div className="absolute left-0 right-0 top-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1b1f23] shadow-xl p-2 z-50 animate-fade-in">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>{isSearching ? 'Searching database...' : `Results (${searchResults.length})`}</span>
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="hover:text-slate-900 dark:hover:text-white"
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
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                    >
                      <div className={`mt-0.5 p-1.5 rounded-full text-xs font-bold ${
                        item.category === 'Trainee' 
                          ? 'bg-[#e8f3fc] text-[#0a66c2]' 
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                      }`}>
                        {item.category === 'Trainee' ? <User className="h-3.5 w-3.5" /> : <Building2 className="h-3.5 w-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{item.title}</span>
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f3fc] dark:bg-[#0a66c2]/15 text-xs text-[#0a66c2] font-semibold">
            <Activity className="h-3.5 w-3.5" />
            <span className="text-[11px]">NITI Aayog Live Ledger</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title="Toggle Language (EN / Hindi)"
            className="flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#242a30] px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-[#0a66c2]" />
            <span>{language === 'en' ? 'EN' : 'मराठी / हिन्दी'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#242a30] text-slate-600 dark:text-slate-300 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* Compliance Badge */}
          <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-3">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0a66c2]" />
            <span className="font-semibold">DPDP Compliant</span>
          </div>

        </div>

      </div>
    </header>
  );
};


