import React, { useState, useEffect } from 'react';
import { 
  Building2, Sparkles, AlertTriangle, ShieldCheck, 
  TrendingUp, Download, RefreshCw 
} from 'lucide-react';
import { api } from '../../services/api';
import { 
  MacroLongitudinalOutcomes, DistrictGeospatialMetric, 
  ProviderBenchmark, KaplanMeierPoint, SkillSupplyDemandGap, AttritionReasonBreakdown 
} from '../../types';
import { KPIHeroCards } from './KPIHeroCards';
import { GeospatialHeatmap } from './GeospatialHeatmap';
import { RetentionKaplanMeier } from './RetentionKaplanMeier';
import { ProviderBenchmarkMatrix } from './ProviderBenchmarkMatrix';
import { SkillDemandSupplyMatrix } from './SkillDemandSupplyMatrix';
import { NonPlacementRootCause } from './NonPlacementRootCause';
import { useFilterStore } from '../../store/useFilterStore';

export const GovernmentCommandCenter: React.FC = () => {
  const { district, sector, language } = useFilterStore();
  const [macroData, setMacroData] = useState<MacroLongitudinalOutcomes | null>(null);
  const [districts, setDistricts] = useState<DistrictGeospatialMetric[]>([]);
  const [providers, setProviders] = useState<ProviderBenchmark[]>([]);
  const [retentionCurves, setRetentionCurves] = useState<KaplanMeierPoint[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillSupplyDemandGap[]>([]);
  const [attritionReasons, setAttritionReasons] = useState<AttritionReasonBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [district, sector]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [macro, dist, prov, ret, gaps, att] = await Promise.all([
        api.getMacroOutcomes().catch(() => null),
        api.getDistrictHeatmap().catch(() => []),
        api.getProviderBenchmarks().catch(() => []),
        api.getRetentionCurves().catch(() => []),
        api.getSkillGaps().catch(() => []),
        api.getAttritionReasons().catch(() => [])
      ]);

      setMacroData(macro);
      setDistricts(dist);
      setProviders(prov);
      setRetentionCurves(ret);
      setSkillGaps(gaps);
      setAttritionReasons(att);
    } catch (err) {
      console.error('Failed to load Government Command Center:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-400 border border-emerald-500/30">
              National Skilling Outcome Intelligence
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Telemetry • Multi-Signal Verified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
            Government & Policy Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Measuring longitudinal livelihood retention, verifiable statutory wages, and curriculum relevance beyond basic certification.
          </p>
        </div>

        <button
          onClick={loadDashboardData}
          disabled={loading}
          className="flex items-center gap-2 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 transition-all cursor-pointer shadow-lg disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Intelligence</span>
        </button>
      </div>

      {/* 1. 3x2 KPI Hero Cards Grid */}
      <KPIHeroCards data={macroData} loading={loading} />

      {/* 2. Geospatial Heatmap & Retention Survival Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeospatialHeatmap districts={districts} />
        <RetentionKaplanMeier data={retentionCurves} />
      </div>

      {/* 3. Provider Benchmark Matrix & Skill Supply vs Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProviderBenchmarkMatrix providers={providers} />
        <SkillDemandSupplyMatrix gaps={skillGaps} />
      </div>

      {/* 4. Non-Placement & Attrition Root Cause Taxonomy */}
      <NonPlacementRootCause reasons={attritionReasons} />

    </div>
  );
};
