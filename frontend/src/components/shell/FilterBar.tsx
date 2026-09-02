import React from 'react';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

export const FilterBar: React.FC = () => {
  const {
    district, sector, provider, gender, socialCategory, dateRange,
    setFilter, resetFilters, getActiveFilterCount
  } = useFilterStore();

  const activeCount = getActiveFilterCount();

  const districts = [
    'ALL', 'Pune', 'Mumbai Suburban', 'Thane', 'Nagpur', 'Nashik', 
    'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Amravati', 
    'Nandurbar', 'Gadchiroli', 'Washim', 'Dharashiv'
  ];

  const sectors = [
    'ALL', 'IT-ITeS', 'Green Energy / Solar', 'Healthcare', 
    'Automotive', 'Logistics', 'Construction', 'Tourism & Hospitality', 'Apparel & Textiles'
  ];

  const providers = [
    'ALL', 'Apollo MedSkills Institute', 'Tata Strive Skill Development', 
    'L&T Construction Skills Training', 'Centum Learning Center', 'Pratham Institute'
  ];

  const genders = ['ALL', 'FEMALE', 'MALE', 'OTHER'];
  const categories = ['ALL', 'GEN', 'OBC', 'SC', 'ST', 'EWS'];
  const dateRanges = [
    { value: 'LAST_30D', label: 'Last 30 Days' },
    { value: 'LAST_90D', label: 'Last 90 Days' },
    { value: 'LAST_180D', label: 'Last 6 Months' },
    { value: 'LAST_12M', label: 'Last 12 Months' },
    { value: 'ALL_TIME', label: 'All-Time Longitudinal' }
  ];

  return (
    <div className="w-full border-b border-[#e0dfdc] dark:border-[#38434f] bg-white dark:bg-[#1b1f23] px-4 sm:px-6 py-2 transition-colors shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 mr-1">
            <Filter className="h-3.5 w-3.5 text-[#0a66c2]" />
            <span>Cohorts:</span>
            {activeCount > 0 && (
              <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#0a66c2] px-1.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>

          {/* District Dropdown */}
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setFilter('district', e.target.value)}
              className="appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#242a30] px-3.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] focus:outline-none focus:border-[#0a66c2] cursor-pointer shadow-2xs transition-colors"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === 'ALL' ? 'District: All Maharashtra' : `District: ${d}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Sector Dropdown */}
          <div className="relative">
            <select
              value={sector}
              onChange={(e) => setFilter('sector', e.target.value)}
              className="appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#242a30] px-3.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] focus:outline-none focus:border-[#0a66c2] cursor-pointer shadow-2xs transition-colors"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'Sector: All (8)' : `Sector: ${s}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Provider Dropdown */}
          <div className="relative hidden sm:block">
            <select
              value={provider}
              onChange={(e) => setFilter('provider', e.target.value)}
              className="appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#242a30] px-3.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] focus:outline-none focus:border-[#0a66c2] cursor-pointer max-w-[170px] truncate shadow-2xs transition-colors"
            >
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p === 'ALL' ? 'Provider: All (20)' : p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Gender Dropdown */}
          <div className="relative hidden md:block">
            <select
              value={gender}
              onChange={(e) => setFilter('gender', e.target.value)}
              className="appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#242a30] px-3.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] focus:outline-none focus:border-[#0a66c2] cursor-pointer shadow-2xs transition-colors"
            >
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g === 'ALL' ? 'Gender: All' : `Gender: ${g}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Category Dropdown */}
          <div className="relative hidden lg:block">
            <select
              value={socialCategory}
              onChange={(e) => setFilter('socialCategory', e.target.value)}
              className="appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#242a30] px-3.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] focus:outline-none focus:border-[#0a66c2] cursor-pointer shadow-2xs transition-colors"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'Category: All' : `Category: ${c}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setFilter('dateRange', e.target.value)}
              className="appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#242a30] px-3.5 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] focus:outline-none focus:border-[#0a66c2] cursor-pointer shadow-2xs transition-colors"
            >
              {dateRanges.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 text-slate-400" />
          </div>

        </div>

        {/* Reset Filter Button */}
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0a66c2] hover:bg-[#e8f3fc] dark:hover:bg-[#0a66c2]/20 transition-colors cursor-pointer px-3 py-1 rounded-full"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}

      </div>
    </div>
  );
};

