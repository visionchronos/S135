import { create } from 'zustand';

export type UserRole = 'Government' | 'Provider' | 'Trainee' | 'Employer' | 'Admin' | 'Demo';
export type PrimaryNavTab = 'home' | 'trainees' | 'training' | 'jobs' | 'insights' | 'actions' | 'settings';

export interface FilterState {
  district: string;
  sector: string;
  provider: string;
  gender: string;
  socialCategory: string;
  dateRange: string;
  
  // Navigation & global app state
  currentRole: UserRole;
  activeNavTab: PrimaryNavTab;
  selectedTraineeId: string | null;
  selectedCourseId: string | null;
  selectedActionId: string | null;
  sidebarCollapsed: boolean;
  searchQuery: string;
  language: 'en' | 'hi';
  theme: 'dark' | 'light';
  
  // Actions
  setFilter: (key: keyof FilterValues, value: string) => void;
  resetFilters: () => void;
  getActiveFilterCount: () => number;
  setCurrentRole: (role: UserRole) => void;
  setActiveNavTab: (tab: PrimaryNavTab) => void;
  navigateToTrainee: (traineeId: string) => void;
  navigateToCourse: (courseId: string) => void;
  navigateToAction: (actionId: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  toggleLanguage: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export interface FilterValues {
  district: string;
  sector: string;
  provider: string;
  gender: string;
  socialCategory: string;
  dateRange: string;
}

const initialFilters: FilterValues = {
  district: 'ALL',
  sector: 'ALL',
  provider: 'ALL',
  gender: 'ALL',
  socialCategory: 'ALL',
  dateRange: 'LAST_12M'
};

export const useFilterStore = create<FilterState>((set, get) => ({
  ...initialFilters,
  currentRole: 'Government',
  activeNavTab: 'home',
  selectedTraineeId: 'SKILL-IND-2025-100000',
  selectedCourseId: null,
  selectedActionId: null,
  sidebarCollapsed: false,
  searchQuery: '',
  language: 'en',
  theme: 'dark',

  setFilter: (key, value) => set({ [key]: value }),
  
  resetFilters: () => set({ ...initialFilters }),

  getActiveFilterCount: () => {
    const s = get();
    let count = 0;
    if (s.district !== 'ALL') count++;
    if (s.sector !== 'ALL') count++;
    if (s.provider !== 'ALL') count++;
    if (s.gender !== 'ALL') count++;
    if (s.socialCategory !== 'ALL') count++;
    if (s.dateRange !== 'LAST_12M') count++;
    return count;
  },

  setCurrentRole: (role) => {
    if (role === 'Trainee') {
      set({ currentRole: role, activeNavTab: 'trainees', selectedTraineeId: 'SKILL-IND-2025-100000' });
    } else if (role === 'Provider') {
      set({ currentRole: role, activeNavTab: 'training' });
    } else if (role === 'Employer') {
      set({ currentRole: role, activeNavTab: 'jobs' });
    } else {
      set({ currentRole: role, activeNavTab: 'home' });
    }
  },

  setActiveNavTab: (tab) => set({ activeNavTab: tab }),

  navigateToTrainee: (traineeId) => set({ activeNavTab: 'trainees', selectedTraineeId: traineeId }),
  navigateToCourse: (courseId) => set({ activeNavTab: 'training', selectedCourseId: courseId }),
  navigateToAction: (actionId) => set({ activeNavTab: 'actions', selectedActionId: actionId }),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setLanguage: (lang) => set({ language: lang }),

  toggleLanguage: () => set((s) => ({ language: s.language === 'en' ? 'hi' : 'en' })),

  setTheme: (theme) => set({ theme: theme }),

  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }))
}));
