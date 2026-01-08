
import React from 'react';

const VectorDBVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex items-center justify-center p-8 shadow-2xl">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Database Points (Documents) */}
        {[...Array(20)].map((_, i) => {
            const x = (Math.sin(i * 132) * 160) + 200;
            const y = (Math.cos(i * 53) * 80) + 100;
            const isMatch = isAnimating && Math.abs(x - 200) < 50 && Math.abs(y - 100) < 50;
            
            return (
                <circle 
                    key={i} 
                    cx={x} 
                    cy={y} 
                    r={isMatch ? 6 : 3} 
                    fill={isMatch ? "#10b981" : "#475569"} 
                    className="transition-all duration-300"
                />
            );
        })}

        {/* Search Query */}
        <g transform="translate(200, 100)">
            {isAnimating && (
                <circle r="60" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" className="animate-[spin_4s_linear_infinite]" />
            )}
            {isAnimating && (
                <circle r="0" fill="#6366f1" fillOpacity="0.2">
                    <animate attributeName="r" values="0;60" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
            )}
            <circle r="8" fill="#6366f1" stroke="white" strokeWidth="2" />
            <text y="-15" textAnchor="middle" className="text-[10px] font-black fill-white uppercase tracking-widest">Query</text>
        </g>

        {isAnimating && (
            <text x="200" y="180" textAnchor="middle" className="text-[10px] font-black fill-emerald-500 uppercase tracking-widest animate-pulse">
                3 Matches Found
            </text>
        )}
      </svg>
    </div>
  );
};

export default VectorDBVisual;
