import React, { useState } from 'react';
import { MapPin, Info, ArrowUpRight, Check, Filter } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { DistrictGeospatialMetric } from '../../types';

interface GeospatialHeatmapProps {
  districts: DistrictGeospatialMetric[];
}

export const GeospatialHeatmap: React.FC<GeospatialHeatmapProps> = ({ districts }) => {
  const { district: selectedDistrictFilter, setFilter } = useFilterStore();
  const [selectedKPI, setSelectedKPI] = useState<'placement' | 'retention' | 'wage' | 'verified'>('placement');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictGeospatialMetric | null>(null);

  // Default fallback district nodes if empty
  const defaultNodes: DistrictGeospatialMetric[] = [
    { district: 'Ahmedabad', state: 'Gujarat', total_trainees: 950, placement_rate: 78.4, placement_rate_pct: 78.4, retention_180d_pct: 74.2, retention_6m_rate: 74.2, avg_wage: 17200, median_wage: 17200, verified_rate_pct: 88.5, dominant_sector: 'Apparel & Textiles', latitude: 23.0225, longitude: 72.5714 },
    { district: 'Surat', state: 'Gujarat', total_trainees: 880, placement_rate: 76.1, placement_rate_pct: 76.1, retention_180d_pct: 71.8, retention_6m_rate: 71.8, avg_wage: 16800, median_wage: 16800, verified_rate_pct: 86.2, dominant_sector: 'Apparel & Textiles', latitude: 21.1702, longitude: 72.8311 },
    { district: 'Pune', state: 'Maharashtra', total_trainees: 1100, placement_rate: 82.3, placement_rate_pct: 82.3, retention_180d_pct: 78.9, retention_6m_rate: 78.9, avg_wage: 19400, median_wage: 19400, verified_rate_pct: 91.4, dominant_sector: 'Automotive', latitude: 18.5204, longitude: 73.8567 },
    { district: 'Bengaluru', state: 'Karnataka', total_trainees: 1250, placement_rate: 85.0, placement_rate_pct: 85.0, retention_180d_pct: 81.2, retention_6m_rate: 81.2, avg_wage: 21500, median_wage: 21500, verified_rate_pct: 93.0, dominant_sector: 'IT-ITeS', latitude: 12.9716, longitude: 77.5946 },
    { district: 'Hyderabad', state: 'Telangana', total_trainees: 1020, placement_rate: 80.5, placement_rate_pct: 80.5, retention_180d_pct: 76.4, retention_6m_rate: 76.4, avg_wage: 19800, median_wage: 19800, verified_rate_pct: 89.2, dominant_sector: 'Healthcare', latitude: 17.3850, longitude: 78.4867 },
    { district: 'Jaipur', state: 'Rajasthan', total_trainees: 780, placement_rate: 72.0, placement_rate_pct: 72.0, retention_180d_pct: 66.5, retention_6m_rate: 66.5, avg_wage: 15600, median_wage: 15600, verified_rate_pct: 83.1, dominant_sector: 'Tourism & Hospitality', latitude: 26.9124, longitude: 75.7873 },
    { district: 'Lucknow', state: 'Uttar Pradesh', total_trainees: 920, placement_rate: 70.8, placement_rate_pct: 70.8, retention_180d_pct: 64.9, retention_6m_rate: 64.9, avg_wage: 15200, median_wage: 15200, verified_rate_pct: 82.4, dominant_sector: 'Logistics', latitude: 26.8467, longitude: 80.9462 },
    { district: 'Bhopal', state: 'Madhya Pradesh', total_trainees: 710, placement_rate: 69.4, placement_rate_pct: 69.4, retention_180d_pct: 63.2, retention_6m_rate: 63.2, avg_wage: 14900, median_wage: 14900, verified_rate_pct: 80.8, dominant_sector: 'Construction', latitude: 23.2599, longitude: 77.4126 },
    { district: 'Patna', state: 'Bihar', total_trainees: 840, placement_rate: 67.2, placement_rate_pct: 67.2, retention_180d_pct: 61.5, retention_6m_rate: 61.5, avg_wage: 14500, median_wage: 14500, verified_rate_pct: 79.5, dominant_sector: 'Green Energy / Solar', latitude: 25.5941, longitude: 85.1376 },
    { district: 'Ranchi', state: 'Jharkhand', total_trainees: 650, placement_rate: 68.5, placement_rate_pct: 68.5, retention_180d_pct: 62.8, retention_6m_rate: 62.8, avg_wage: 14800, median_wage: 14800, verified_rate_pct: 81.0, dominant_sector: 'Construction', latitude: 23.3441, longitude: 85.3096 },
    { district: 'Bhubaneswar', state: 'Odisha', total_trainees: 760, placement_rate: 73.5, placement_rate_pct: 73.5, retention_180d_pct: 68.4, retention_6m_rate: 68.4, avg_wage: 16200, median_wage: 16200, verified_rate_pct: 85.3, dominant_sector: 'Green Energy / Solar', latitude: 20.2961, longitude: 85.8245 },
    { district: 'Guwahati', state: 'Assam', total_trainees: 640, placement_rate: 71.0, placement_rate_pct: 71.0, retention_180d_pct: 65.7, retention_6m_rate: 65.7, avg_wage: 15400, median_wage: 15400, verified_rate_pct: 83.7, dominant_sector: 'Healthcare', latitude: 26.1445, longitude: 91.7362 }
  ];

  const nodes = districts && districts.length > 0 ? districts : defaultNodes;

  // Compute Color Ramp based on KPI values
  const getKPIValue = (d: DistrictGeospatialMetric): number => {
    switch (selectedKPI) {
      case 'placement': return d.placement_rate_pct ?? d.placement_rate ?? 74.0;
      case 'retention': return d.retention_180d_pct ?? d.retention_6m_rate ?? 68.0;
      case 'wage': return d.avg_wage ?? d.median_wage ?? 16000;
      case 'verified': return d.verified_rate_pct ?? 85.0;
    }
  };

  const values = nodes.map(getKPIValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getColor = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal || 1);
    if (ratio > 0.8) return '#10b981';
    if (ratio > 0.6) return '#059669';
    if (ratio > 0.4) return '#047857';
    if (ratio > 0.2) return '#064e3b';
    return '#062d22';
  };

  const formatValue = (val: number) => {
    if (selectedKPI === 'wage') return `₹${val.toLocaleString()}`;
    return `${val.toFixed(1)}%`;
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
      
      {/* Header & KPI Metric Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-extrabold text-white">
              Geospatial District Livelihood Heatmap
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            SVG interactive spatial nodes across 12 target skilling districts
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setSelectedKPI('placement')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              selectedKPI === 'placement' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Placement %
          </button>
          <button
            onClick={() => setSelectedKPI('retention')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              selectedKPI === 'retention' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            6M Retention
          </button>
          <button
            onClick={() => setSelectedKPI('wage')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              selectedKPI === 'wage' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Avg Wage
          </button>
          <button
            onClick={() => setSelectedKPI('verified')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              selectedKPI === 'verified' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified %
          </button>
        </div>
      </div>

      {/* Main SVG Heatmap Grid */}
      <div className="relative">
        <svg viewBox="0 0 800 320" className="w-full h-auto rounded-2xl bg-slate-950/80 border border-slate-800/80">
          
          {/* Background Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* 12 District Rectangles (4 cols x 3 rows grid layout) */}
          {nodes.map((node, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const x = 30 + col * 190;
            const y = 25 + row * 92;
            const width = 170;
            const height = 75;
            const kpiVal = getKPIValue(node);
            const fillColor = getColor(kpiVal);
            const isSelected = selectedDistrictFilter === node.district;

            return (
              <g
                key={node.district}
                onClick={() => setFilter('district', isSelected ? 'ALL' : node.district)}
                onMouseEnter={() => setHoveredDistrict(node)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer transition-all duration-150"
              >
                {/* Node Box */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx="12"
                  fill={fillColor}
                  stroke={isSelected ? '#34d399' : '#334155'}
                  strokeWidth={isSelected ? '2.5' : '1'}
                  className="hover:stroke-emerald-400 transition-colors"
                  opacity={isSelected ? 1.0 : 0.9}
                />

                {/* District Name */}
                <text
                  x={x + 12}
                  y={y + 24}
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="800"
                  fontFamily="sans-serif"
                >
                  {node.district}
                </text>

                {/* State Subtitle */}
                <text
                  x={x + 12}
                  y={y + 40}
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.state} • {node.total_trainees} Trainees
                </text>

                {/* KPI Highlight Pill */}
                <rect
                  x={x + 12}
                  y={y + 48}
                  width={75}
                  height={18}
                  rx="5"
                  fill="rgba(15, 23, 42, 0.75)"
                />
                <text
                  x={x + 18}
                  y={y + 61}
                  fill="#34d399"
                  fontSize="11"
                  fontWeight="800"
                  fontFamily="monospace"
                >
                  {formatValue(kpiVal)}
                </text>

                {/* Sector label */}
                <text
                  x={x + 94}
                  y={y + 61}
                  fill="#cbd5e1"
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {(node.dominant_sector || 'General').split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip Overlay */}
        {hoveredDistrict && (
          <div className="absolute right-4 bottom-4 p-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-xs space-y-1.5 z-20 pointer-events-none animate-in fade-in zoom-in-95 duration-100 min-w-[200px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 font-bold text-white">
              <span>{hoveredDistrict.district}, {hoveredDistrict.state}</span>
              <span className="text-emerald-400 font-mono text-[10px]">Active Node</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-0.5">
              <div>Placement: <span className="font-bold text-white">{hoveredDistrict.placement_rate_pct ?? hoveredDistrict.placement_rate}%</span></div>
              <div>6M Retention: <span className="font-bold text-white">{hoveredDistrict.retention_180d_pct ?? hoveredDistrict.retention_6m_rate}%</span></div>
              <div>Avg Wage: <span className="font-bold text-white">₹{(hoveredDistrict.avg_wage ?? hoveredDistrict.median_wage ?? 16000).toLocaleString()}</span></div>
              <div>Verified: <span className="font-bold text-emerald-400">{hoveredDistrict.verified_rate_pct ?? 85}%</span></div>
            </div>
            <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-1">
              Top Sector: <span className="text-slate-200 font-semibold">{hoveredDistrict.dominant_sector || 'Multi-Sector'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Filter Notice */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
        <div className="flex items-center gap-2">
          <span>Heatmap Intensity:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-500 font-mono">{formatValue(minVal)}</span>
            <div className="h-3 w-28 rounded-full bg-gradient-to-r from-[#062d22] via-[#059669] to-[#10b981] border border-slate-700" />
            <span className="text-[10px] text-emerald-400 font-mono font-bold">{formatValue(maxVal)}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-slate-500" />
          Click any district node to set active filter.
        </div>
      </div>

    </div>
  );
};
