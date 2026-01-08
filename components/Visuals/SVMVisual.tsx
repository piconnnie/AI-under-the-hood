
import React from 'react';

const SVMVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex items-center justify-center p-8">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Points Group A */}
        <g fill="#3b82f6" fillOpacity="0.6">
          <circle cx="80" cy="50" r="8" />
          <circle cx="120" cy="40" r="8" />
          <circle cx="60" cy="90" r="8" />
          <circle cx="100" cy="80" r="10" stroke="#3b82f6" strokeWidth="2" fillOpacity="1" /> {/* Support Vector */}
        </g>
        
        {/* Points Group B */}
        <g fill="#f43f5e" fillOpacity="0.6">
          <circle cx="280" cy="160" r="8" />
          <circle cx="320" cy="140" r="8" />
          <circle cx="340" cy="180" r="8" />
          <circle cx="260" cy="120" r="10" stroke="#f43f5e" strokeWidth="2" fillOpacity="1" /> {/* Support Vector */}
        </g>

        {/* The "Road" (Margin) */}
        <g transform="rotate(-20, 200, 100)">
          <rect 
            x="0" y="80" width="400" height="40" 
            fill="#6366f1" 
            fillOpacity={isAnimating ? "0.15" : "0.05"} 
            className="transition-all duration-1000"
          />
          {/* Decision Boundary */}
          <line 
            x1="0" y1="100" x2="400" y2="100" 
            stroke="#6366f1" 
            strokeWidth="3" 
            strokeDasharray="8" 
            className={isAnimating ? "animate-[dash_20s_linear_infinite]" : ""}
          />
          {/* Margin Lines */}
          <line x1="0" y1="80" x2="400" y2="80" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />
        </g>
        
        <text x="200" y="180" textAnchor="middle" className="text-[10px] font-black fill-indigo-500 uppercase tracking-widest">
          The Widest Possible Road
        </text>
      </svg>
    </div>
  );
};

export default SVMVisual;
