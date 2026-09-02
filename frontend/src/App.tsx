import React from 'react';
import { TopNav } from './components/shell/TopNav';
import { Sidebar } from './components/shell/Sidebar';
import { FilterBar } from './components/shell/FilterBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { TraineesScreen } from './components/screens/TraineesScreen';
import { TrainingScreen } from './components/screens/TrainingScreen';
import { JobsScreen } from './components/screens/JobsScreen';
import { useFilterStore } from './store/useFilterStore';
import { ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const { activeNavTab, theme } = useFilterStore();

  const renderActiveScreen = () => {
    switch (activeNavTab) {
      case 'home':
        return <HomeScreen />;
      case 'trainees':
        return <TraineesScreen />;
      case 'training':
        return <TrainingScreen />;
      case 'jobs':
        return <JobsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#f3f2ef] text-slate-900 dark:bg-[#1d2226] dark:text-slate-100 flex flex-col antialiased selection:bg-[#0a66c2] selection:text-white ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* 1. Global LinkedIn-style Header */}
      <TopNav />

      {/* 2. Global Compact Filter Bar */}
      <FilterBar />

      {/* 3. Main Workspace */}
      <div className="flex flex-1 w-full relative">
        <Sidebar />

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto animate-fade-in">
          {renderActiveScreen()}
        </main>
      </div>

      {/* 4. LinkedIn Professional Enterprise Footer */}
      <footer className="border-t border-[#e0dfdc] bg-white dark:bg-[#1b1f23] dark:border-[#38434f] py-4 text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#0a66c2] tracking-tight flex items-center gap-1.5 text-sm">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#0a66c2]"></span>
              VikasDrishti
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px] font-medium">Maharashtra NITI Aayog Longitudinal Outcome Platform</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0a66c2]" />
              DPDP Act & NCrF Compliant
            </span>
            <span className="text-slate-400">•</span>
            <span>Skill Development & Entrepreneurship Department (Govt of Maharashtra)</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;


