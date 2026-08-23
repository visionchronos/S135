import React, { useState } from 'react';
import { 
  Users, Briefcase, Award, TrendingUp, 
  ShieldCheck, CheckCircle2, ArrowUpRight, ArrowDownRight, 
  X, ChevronRight, Sparkles, BarChart2
} from 'lucide-react';
import { MacroLongitudinalOutcomes } from '../../types';

interface KPIHeroCardsProps {
  data: MacroLongitudinalOutcomes | null;
  loading: boolean;
}

interface MetricCardConfig {
  id: string;
  label: string;
  value: string;
  delta: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  sparkline: number[];
  color: string;
  drilldownDetails: {
    definition: string;
    benchmarkTarget: string;
    statutorySignal: string;
    historicalTrend: string;
  };
}

export const KPIHeroCards: React.FC<KPIHeroCardsProps> = ({ data, loading }) => {
  const [activeDrilldown, setActiveDrilldown] = useState<MetricCardConfig | null>(null);

  const cards: MetricCardConfig[] = [
    {
      id: 'total_trainees',
      label: 'Total Trainees Tracked',
      value: (data?.total_trainees || 10000).toLocaleString(),
      delta: '+12.4% vs last FY',
      isPositive: true,
      icon: Users,
      sparkline: [8200, 8600, 8900, 9200, 9500, 9800, 10000],
      color: 'emerald',
      drilldownDetails: {
        definition: 'De-duplicated unique citizen learners tracked across all certified batches.',
        benchmarkTarget: '10,000 Cohort Baseline target achieved.',
        statutorySignal: '99.4% resolved via Virtual Skill Tokens & Aadhaar hash validation.',
        historicalTrend: 'Consistent linear enrollment expansion across 12 target districts.'
      }
    },
    {
      id: 'placement_rate',
      label: 'Placement Rate (Verified)',
      value: `${data?.placement_rate_pct || 74.7}%`,
      delta: '+4.8% vs state median',
      isPositive: true,
      icon: Briefcase,
      sparkline: [68.2, 70.1, 71.5, 72.8, 73.9, 74.1, 74.7],
      color: 'teal',
      drilldownDetails: {
        definition: 'Proportion of certified trainees with verified Day-0 to Day-30 employment status.',
        benchmarkTarget: 'Target threshold: >= 70.0%. Current: 74.7% (Exceeding target).',
        statutorySignal: 'Verified through multi-signal employer confirmation & EPF/ESIC cross-validation.',
        historicalTrend: 'Upward trajectory driven by Solar Technician and Healthcare Logistics cohorts.'
      }
    },
    {
      id: 'retention_6m',
      label: '6-Month Job Retention',
      value: `${data?.retention_180d_pct || 69.8}%`,
      delta: '+3.2% vs previous cohort',
      isPositive: true,
      icon: Award,
      sparkline: [64.0, 65.5, 66.8, 67.9, 68.8, 69.2, 69.8],
      color: 'blue',
      drilldownDetails: {
        definition: 'Survival rate of placed candidates retaining gainful livelihoods past 180 days.',
        benchmarkTarget: 'National benchmark: 65.0%. Platform cohort: 69.8%.',
        statutorySignal: 'Active employment validation through progressive WhatsApp follow-up & payroll records.',
        historicalTrend: 'Retention uplift of +22.2 pp measured following bridge curriculum interventions.'
      }
    },
    {
      id: 'wage_growth',
      label: 'Median Wage Growth %',
      value: `${data?.wage_progression_delta_pct ? `+${data.wage_progression_delta_pct}%` : '+16.7%'}`,
      delta: '+2.1% real income delta',
      isPositive: true,
      icon: TrendingUp,
      sparkline: [10.2, 11.5, 12.8, 14.1, 15.0, 16.2, 16.7],
      color: 'purple',
      drilldownDetails: {
        definition: 'Percentage increase from initial joining wage to Day 180/365 follow-up milestone.',
        benchmarkTarget: 'Median monthly wage grew from ₹15,800 to ₹18,450 across tracked cohorts.',
        statutorySignal: 'Triangulated with employer payroll filings and banking credit records.',
        historicalTrend: 'Highest progression in IT-ITeS (+24%) and Green Energy (+21%).'
      }
    },
    {
      id: 'confidence_score',
      label: 'Outcome Confidence Score',
      value: '92.4%',
      delta: '+1.5% verification depth',
      isPositive: true,
      icon: ShieldCheck,
      sparkline: [88.0, 89.2, 90.1, 91.0, 91.8, 92.1, 92.4],
      color: 'amber',
      drilldownDetails: {
        definition: 'Composite Bayesian confidence rating reflecting evidence reliability and signal depth.',
        benchmarkTarget: 'High Assurance Tier (>= 90.0%).',
        statutorySignal: 'Multi-layer triangulation: Trainee declaration (10%) + Employer OTP (35%) + Statutory EPF (55%).',
        historicalTrend: 'Systemic reduction in self-reporting uncertainty across waves.'
      }
    },
    {
      id: 'data_quality',
      label: 'Data Quality Score',
      value: `${data?.data_quality_score || 95.6} / 100`,
      delta: '+0.8% deduplication integrity',
      isPositive: true,
      icon: CheckCircle2,
      sparkline: [92.0, 93.1, 93.8, 94.5, 95.0, 95.3, 95.6],
      color: 'emerald',
      drilldownDetails: {
        definition: 'Automated platform integrity score auditing anomalies, phone collisions, and round numbers.',
        benchmarkTarget: 'Grade A+ Platform Health (> 95.0).',
        statutorySignal: 'Continuous background scanner evaluating 10,000 records daily for anomaly triggers.',
        historicalTrend: '0.2% phone collision anomaly detected and isolated in Sector 4.'
      }
    }
  ];

  // Render Mini Sparkline (SVG)
  const renderSparkline = (points: number[], colorClass: string) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 70;
    const height = 24;

    const pathPoints = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
          points={pathPoints}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      
      {/* 3x2 KPI Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          
          if (loading) {
            return (
              <div key={card.id} className="h-32 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse p-5" />
            );
          }

          return (
            <div
              key={card.id}
              onClick={() => setActiveDrilldown(card)}
              className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 cursor-pointer shadow-lg shadow-slate-950/40 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-colors">
                    {card.label}
                  </span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="mt-3.5 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {card.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>{card.delta}</span>
                  </div>
                </div>

                <div className="text-emerald-400/80 group-hover:text-emerald-300 transition-colors pb-1">
                  {renderSparkline(card.sparkline, 'text-emerald-400')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drilldown Drawer Modal */}
      {activeDrilldown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{activeDrilldown.label}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">KPI Metric Telemetry Drilldown</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveDrilldown(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Current National Value</span>
                <span className="text-2xl font-black text-white">{activeDrilldown.value}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Period Trajectory</span>
                <span className="text-xs font-bold text-emerald-400">{activeDrilldown.delta}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="font-bold text-slate-300 block mb-0.5">Methodology Definition:</span>
                <p className="text-slate-400 leading-relaxed">{activeDrilldown.drilldownDetails.definition}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="font-bold text-slate-300 block mb-0.5">Benchmark Target Comparison:</span>
                <p className="text-slate-400 leading-relaxed">{activeDrilldown.drilldownDetails.benchmarkTarget}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <span className="font-bold text-emerald-300 block mb-0.5">Statutory Signal Triangulation:</span>
                <p className="text-emerald-200/80 leading-relaxed">{activeDrilldown.drilldownDetails.statutorySignal}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveDrilldown(null)}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                Close Drilldown
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
