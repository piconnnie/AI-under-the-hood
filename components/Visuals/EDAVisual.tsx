import React, { useState, useEffect } from 'react';

const EDAVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [hasOutlier, setHasOutlier] = useState(true);

  // Histogram data updates based on outlier presence
  const bars = hasOutlier 
    ? [10, 25, 45, 80, 50, 30, 15, 5] // Skewed
    : [15, 40, 60, 90, 60, 40, 15, 0]; // Normalized

  const handleClean = () => {
    setHasOutlier(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasOutlier(true);
  };

  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex items-center justify-center p-8">
      <div className="absolute top-4 right-4 z-10">
        {!hasOutlier && (
          <button 
            onClick={handleReset}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-[10px] font-bold uppercase transition-colors"
          >
            Reset Data
          </button>
        )}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Scatter Plot representation on left */}
        <g transform="translate(0, 0)">
            <text x="60" y="20" className="text-[8px] font-bold fill-slate-400 uppercase">Distribution (Histogram)</text>
            {/* Histogram Bars */}
            {bars.map((h, i) => (
                <rect 
                    key={i}
                    x={20 + i * 15}
                    y={150 - h}
                    width="10"
                    height={h}
                    fill={hasOutlier ? "#cbd5e1" : "#6366f1"}
                    className="transition-all duration-500"
                />
            ))}
            <line x1="10" y1="150" x2="150" y2="150" stroke="#94a3b8" strokeWidth="2" />
        </g>

        {/* Outlier Detection on right */}
        <g transform="translate(200, 0)">
            <text x="60" y="20" className="text-[8px] font-bold fill-slate-400 uppercase">Raw Data Scatter</text>
            <line x1="20" y1="150" x2="180" y2="150" stroke="#94a3b8" strokeWidth="2" />
            <line x1="20" y1="20" x2="20" y2="150" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Normal points */}
            {[...Array(15)].map((_, i) => (
                <circle 
                    key={i}
                    cx={30 + (i * 7) + Math.random() * 20}
                    cy={140 - Math.random() * 80}
                    r="4"
                    fill="#64748b"
                />
            ))}

            {/* The Outlier */}
            {hasOutlier && (
              <g onClick={handleClean} className="cursor-pointer group">
                <circle 
                    cx="160" cy="40" r="20" 
                    fill="transparent" 
                /> {/* Click target extender */}
                <circle 
                    cx="160" cy="40" r="6" 
                    fill="#f43f5e" 
                    className="animate-pulse group-hover:scale-125 transition-transform"
                />
                <circle cx="160" cy="40" r="10" stroke="#f43f5e" strokeWidth="1" fill="none" className="opacity-50 animate-ping" />
                <text x="160" y="25" textAnchor="middle" className="text-[8px] font-black fill-rose-500 uppercase">Click to Clean</text>
              </g>
            )}
        </g>
        
        {/* Divider */}
        <line x1="180" y1="20" x2="180" y2="180" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="4" />
      </svg>

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] font-bold text-slate-400">
          {hasOutlier ? "Outliers skew the distribution model." : "Clean data leads to a balanced model."}
        </p>
      </div>
    </div>
  );
};

export default EDAVisual;