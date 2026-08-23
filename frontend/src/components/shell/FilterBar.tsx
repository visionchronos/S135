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
    'ALL', 'Ahmedabad', 'Surat', 'Pune', 'Bengaluru', 'Hyderabad', 
    'Jaipur', 'Lucknow', 'Bhopal', 'Patna', 'Ranchi', 'Bhubaneswar', 'Guwahati'
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
    <div className="w-full border-b border-slate-800/80 bg-[#070b12]/80 backdrop-blur-md px-4 sm:px-6 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mr-1.5">
            <Filter className="h-3.5 w-3.5 text-emerald-400" />
            <span>Cohorts:</span>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500/20 px-1.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                {activeCount}
              </span>
            )}
          </div>

          {/* District Dropdown */}
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setFilter('district', e.target.value)}
              className="appearance-none rounded-lg border border-slate-800/90 bg-[#0e1626] px-3 py-1.5 pr-7 text-xs font-medium text-slate-200 hover:border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-colors"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === 'ALL' ? 'District: All (12)' : `District: ${d}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Sector Dropdown */}
          <div className="relative">
            <select
              value={sector}
              onChange={(e) => setFilter('sector', e.target.value)}
              className="appearance-none rounded-lg border border-slate-800/90 bg-[#0e1626] px-3 py-1.5 pr-7 text-xs font-medium text-slate-200 hover:border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-colors"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'Sector: All (8)' : `Sector: ${s}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Provider Dropdown */}
          <div className="relative hidden sm:block">
            <select
              value={provider}
              onChange={(e) => setFilter('provider', e.target.value)}
              className="appearance-none rounded-lg border border-slate-800/90 bg-[#0e1626] px-3 py-1.5 pr-7 text-xs font-medium text-slate-200 hover:border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer max-w-[170px] truncate shadow-sm transition-colors"
            >
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p === 'ALL' ? 'Provider: All (20)' : p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Gender Dropdown */}
          <div className="relative hidden md:block">
            <select
              value={gender}
              onChange={(e) => setFilter('gender', e.target.value)}
              className="appearance-none rounded-lg border border-slate-800/90 bg-[#0e1626] px-3 py-1.5 pr-7 text-xs font-medium text-slate-200 hover:border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-colors"
            >
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g === 'ALL' ? 'Gender: All' : `Gender: ${g}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Category Dropdown */}
          <div className="relative hidden lg:block">
            <select
              value={socialCategory}
              onChange={(e) => setFilter('socialCategory', e.target.value)}
              className="appearance-none rounded-lg border border-slate-800/90 bg-[#0e1626] px-3 py-1.5 pr-7 text-xs font-medium text-slate-200 hover:border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-colors"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'Category: All' : `Category: ${c}`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3 w-3 text-slate-400" />
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setFilter('dateRange', e.target.value)}
              className="appearance-none rounded-lg border border-slate-800/90 bg-[#0e1626] px-3 py-1.5 pr-7 text-xs font-medium text-slate-200 hover:border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-colors"
            >
              {dateRanges.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3 w-3 text-slate-400" />
          </div>

        </div>

        {/* Reset Filter Button */}
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-rose-500/10"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}

      </div>
    </div>
  );
};

