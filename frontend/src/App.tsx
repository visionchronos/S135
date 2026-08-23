import React, { useState } from 'react';
import { TopNav } from './components/shell/TopNav';
import { Sidebar } from './components/shell/Sidebar';
import { FilterBar } from './components/shell/FilterBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { TraineesScreen } from './components/screens/TraineesScreen';
import { TrainingScreen } from './components/screens/TrainingScreen';
import { JobsScreen } from './components/screens/JobsScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { ActionsScreen } from './components/screens/ActionsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { InteractiveDemoRunner } from './components/InteractiveDemoRunner';
import { useFilterStore } from './store/useFilterStore';
import { ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const { activeNavTab, language, theme } = useFilterStore();
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);

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
      case 'insights':
        return <InsightsScreen />;
      case 'actions':
        return <ActionsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#070b12] text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-white ${theme === 'light' ? 'light-mode' : ''}`}>
      
      {/* 1. Global Shell Header with tricolor accent line */}
      <TopNav onOpenDemo={() => setIsDemoOpen(true)} />

      {/* 2. Global Compact Filter Bar */}
      <FilterBar />

      {/* 3. Main Workspace with Compact Sidebar */}
      <div className="flex flex-1 w-full relative">
        <Sidebar onOpenDemo={() => setIsDemoOpen(true)} />

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto animate-fade-in">
          {renderActiveScreen()}
        </main>
      </div>

      {/* 4. Executive Enterprise Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060910]/95 py-3.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              VikasDrishti
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-[11px]">Longitudinal Outcome Intelligence & Closed-Loop Policy System</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              DPDP Act & NCrF Compliant
            </span>
            <span className="text-slate-600">•</span>
            <span>Ministry of Skill Development & Entrepreneurship (MSDE)</span>
          </div>
        </div>
      </footer>

      {/* 5. 5-Minute Interactive Live Guided Demo Modal */}
      {isDemoOpen && (
        <InteractiveDemoRunner
          onClose={() => setIsDemoOpen(false)}
          language={language}
        />
      )}

    </div>
  );
};

export default App;

