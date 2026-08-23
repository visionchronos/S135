import React, { useState } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, ZAxis, Cell 
} from 'recharts';
import { Award, Star, AlertTriangle, TrendingUp, HelpCircle } from 'lucide-react';
import { ProviderBenchmark } from '../../types';
import { useFilterStore } from '../../store/useFilterStore';

interface ProviderBenchmarkMatrixProps {
  providers: ProviderBenchmark[];
}

export const ProviderBenchmarkMatrix: React.FC<ProviderBenchmarkMatrixProps> = ({ providers }) => {
  const { setFilter, setCurrentRole } = useFilterStore();
  const [selectedProvider, setSelectedProvider] = useState<ProviderBenchmark | null>(null);

  const defaultProviders: ProviderBenchmark[] = [
    { provider_id: 'p1', provider_name: 'Tata Strive Skill Development', total_enrolled: 820, certified_rate: 94.2, placement_rate: 86.5, retention_6m: 82.0, employer_verification_rate: 95.0, data_quality_score: 98.2, composite_performance_score: 91.5, anomaly_flag: false },
    { provider_id: 'p2', provider_name: 'Apollo MedSkills Institute', total_enrolled: 750, certified_rate: 92.0, placement_rate: 84.0, retention_6m: 79.5, employer_verification_rate: 93.0, data_quality_score: 96.5, composite_performance_score: 88.0, anomaly_flag: false },
    { provider_id: 'p3', provider_name: 'L&T Construction Skills Training', total_enrolled: 690, certified_rate: 89.5, placement_rate: 81.2, retention_6m: 76.8, employer_verification_rate: 91.0, data_quality_score: 95.0, composite_performance_score: 85.5, anomaly_flag: false },
    { provider_id: 'p4', provider_name: 'Centum Learning Center', total_enrolled: 640, certified_rate: 88.0, placement_rate: 76.5, retention_6m: 72.0, employer_verification_rate: 88.5, data_quality_score: 93.0, composite_performance_score: 82.0, anomaly_flag: false },
    { provider_id: 'p5', provider_name: 'Pratham Institute for Literacy & Skills', total_enrolled: 580, certified_rate: 86.0, placement_rate: 74.0, retention_6m: 70.5, employer_verification_rate: 87.0, data_quality_score: 92.5, composite_performance_score: 80.0, anomaly_flag: false },
    { provider_id: 'p6', provider_name: 'IL&FS Skills Development', total_enrolled: 520, certified_rate: 84.5, placement_rate: 70.0, retention_6m: 65.0, employer_verification_rate: 84.0, data_quality_score: 89.0, composite_performance_score: 75.0, anomaly_flag: false },
    { provider_id: 'p7', provider_name: 'Orion Edutech Training Center', total_enrolled: 480, certified_rate: 92.5, placement_rate: 52.0, retention_6m: 38.0, employer_verification_rate: 72.0, data_quality_score: 76.0, composite_performance_score: 58.0, anomaly_flag: true },
    { provider_id: 'p8', provider_name: 'LabourNet Services Society', total_enrolled: 460, certified_rate: 81.0, placement_rate: 66.0, retention_6m: 61.5, employer_verification_rate: 82.0, data_quality_score: 88.0, composite_performance_score: 72.0, anomaly_flag: false },
    { provider_id: 'p9', provider_name: 'Gram Tarang Employability Training', total_enrolled: 430, certified_rate: 83.0, placement_rate: 68.5, retention_6m: 64.0, employer_verification_rate: 83.5, data_quality_score: 90.0, composite_performance_score: 74.0, anomaly_flag: false },
    { provider_id: 'p10', provider_name: 'Quess Corp Skill Academy', total_enrolled: 410, certified_rate: 87.0, placement_rate: 78.0, retention_6m: 54.0, employer_verification_rate: 79.0, data_quality_score: 82.0, composite_performance_score: 69.0, anomaly_flag: true }
  ];

  const providerList = providers && providers.length > 0 ? providers : defaultProviders;

  const scatterData = providerList.map((p) => ({
    ...p,
    x: p.placement_rate,
    y: p.retention_6m,
    z: p.total_enrolled
  }));

  const getDotColor = (dqScore: number) => {
    if (dqScore >= 92) return '#10b981'; // Green (High Quality)
    if (dqScore >= 80) return '#f59e0b'; // Amber (Moderate Quality)
    return '#f43f5e'; // Red (Data Anomaly / Review Required)
  };

  const medianX = 72.0;
  const medianY = 65.0;

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">
              Training Provider 4-Quadrant Benchmark Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Placement Rate (X) vs 6M Retention (Y) • Bubble size = Trainee Volume • Color = Data Quality Score
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> DQ &gt; 92 (High)
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> DQ 80-92
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> DQ &lt; 80 (Anomaly)
          </span>
        </div>
      </div>

      {/* Quadrant Legend Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-center">
          <span className="font-bold text-emerald-300 block">Stars Quadrant (Top-Right)</span>
          <span className="text-[10px] text-slate-400">High Placement + High Retention</span>
        </div>
        <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-800/40 text-center">
          <span className="font-bold text-teal-300 block">Improvers (Top-Left)</span>
          <span className="text-[10px] text-slate-400">High Retention + Moderate Entry</span>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-center">
          <span className="font-bold text-amber-300 block">At Risk (Bottom-Right)</span>
          <span className="text-[10px] text-slate-400">High Day-0 Drop to Low 6M</span>
        </div>
        <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-center">
          <span className="font-bold text-rose-300 block">Struggling (Bottom-Left)</span>
          <span className="text-[10px] text-slate-400">Underperforming on both metrics</span>
        </div>
      </div>

      {/* Recharts Scatter Chart */}
      <div className="h-80 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Placement Rate" 
              unit="%" 
              domain={[40, 100]}
              stroke="#64748b"
              fontSize={11}
              label={{ value: 'Placement Rate %', position: 'bottom', fill: '#64748b', fontSize: 11 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="6-Month Retention" 
              unit="%" 
              domain={[30, 100]}
              stroke="#64748b"
              fontSize={11}
              label={{ value: '6-Month Retention %', angle: -90, position: 'left', fill: '#64748b', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="z" range={[80, 500]} name="Trainee Volume" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pData = payload[0].payload as any;
                  return (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs space-y-1">
                      <div className="font-bold text-white border-b border-slate-800 pb-1">{pData.provider_name}</div>
                      <div className="text-slate-300">Placement: <strong className="text-white">{pData.placement_rate}%</strong></div>
                      <div className="text-slate-300">6M Retention: <strong className="text-white">{pData.retention_6m}%</strong></div>
                      <div className="text-slate-300">Trainees Tracked: <strong className="text-white">{pData.total_enrolled}</strong></div>
                      <div className="text-slate-300">Data Quality Score: <strong className="text-emerald-400">{pData.data_quality_score}/100</strong></div>
                      {pData.anomaly_flag && (
                        <div className="text-rose-400 font-bold text-[10px] mt-1">⚠️ Attrition Anomaly Flagged</div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Median Quadrant Boundary Lines */}
            <ReferenceLine x={medianX} stroke="#475569" strokeDasharray="4 4" />
            <ReferenceLine y={medianY} stroke="#475569" strokeDasharray="4 4" />

            <Scatter 
              name="Training Providers" 
              data={scatterData} 
              onClick={(node) => {
                setSelectedProvider(node);
                setFilter('provider', node.provider_name);
              }}
              className="cursor-pointer"
            >
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getDotColor(entry.data_quality_score)} stroke="#0f172a" strokeWidth={1.5} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {selectedProvider && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Selected Provider</span>
            <span className="text-sm font-bold text-white">{selectedProvider.provider_name}</span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Placement: {selectedProvider.placement_rate}% • Retention: {selectedProvider.retention_6m}% • Volume: {selectedProvider.total_enrolled}
            </span>
          </div>
          <button
            onClick={() => {
              setCurrentRole('Provider');
            }}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Open Provider Action Desk →
          </button>
        </div>
      )}

    </div>
  );
};
