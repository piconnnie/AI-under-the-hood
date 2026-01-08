
import React from 'react';

const GainLiftVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex items-center justify-center p-8">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Axes */}
        <line x1="50" y1="170" x2="350" y2="170" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="170" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Random Guess Line */}
        <line x1="50" y1="170" x2="350" y2="30" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
        
        {/* Model Performance Curve */}
        <path 
          d="M 50 170 Q 80 30 350 30" 
          fill="none" 
          stroke="#6366f1" 
          strokeWidth="4" 
          strokeLinecap="round"
          className={isAnimating ? "animate-[glow_2s_infinite]" : ""}
        />

        {/* Area of Lift */}
        {isAnimating && (
          <path 
            d="M 50 170 Q 80 30 350 30 L 50 170" 
            fill="#6366f1" 
            fillOpacity="0.1" 
          />
        )}

        <text x="50" y="20" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Target %</text>
        <text x="350" y="185" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Sample %</text>
        
        <g transform="translate(100, 70)">
            <text className="text-[12px] font-black fill-indigo-600">LIFT!</text>
        </g>
      </svg>
      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 2px #6366f1); }
          50% { filter: drop-shadow(0 0 8px #6366f1); }
        }
      `}</style>
    </div>
  );
};

export default GainLiftVisual;
