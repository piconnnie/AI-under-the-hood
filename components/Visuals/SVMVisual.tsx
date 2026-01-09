
import React, { useState } from 'react';

const SVMVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [marginWidth, setMarginWidth] = useState(40);

  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-8">
      <div className="absolute top-4 right-4 z-10 w-48 bg-white/90 p-3 rounded-xl border border-slate-100 shadow-sm backdrop-blur-sm">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 flex justify-between">
              <span>Margin Width</span>
              <span>{marginWidth}px</span>
          </label>
          <input 
            type="range" 
            min="10" max="80" 
            value={marginWidth} 
            onChange={(e) => setMarginWidth(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-bold">
            <span>Hard (Strict)</span>
            <span>Soft (Flexible)</span>
          </div>
      </div>

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
        <g transform="rotate(-20, 200, 100)" className="transition-all duration-300 ease-out">
          <rect 
            x="0" y={100 - marginWidth/2} width="400" height={marginWidth} 
            fill="#6366f1" 
            fillOpacity="0.1" 
          />
          {/* Decision Boundary */}
          <line 
            x1="0" y1="100" x2="400" y2="100" 
            stroke="#6366f1" 
            strokeWidth="3" 
            strokeDasharray="8" 
          />
          {/* Margin Lines */}
          <line x1="0" y1={100 - marginWidth/2} x2="400" y2={100 - marginWidth/2} stroke="#6366f1" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="0" y1={100 + marginWidth/2} x2="400" y2={100 + marginWidth/2} stroke="#6366f1" strokeWidth="1" strokeOpacity="0.5" />
        </g>
        
        {/* Violation Indicator */}
        {marginWidth > 60 && (
            <g className="animate-pulse">
                <circle cx="100" cy="80" r="14" fill="none" stroke="#rose-500" strokeWidth="2" opacity="0.5" />
                <text x="200" y="190" textAnchor="middle" className="text-[10px] font-black fill-rose-500 uppercase tracking-widest">
                    Margin Violation (Soft Margin)
                </text>
            </g>
        )}
      </svg>
    </div>
  );
};

export default SVMVisual;
