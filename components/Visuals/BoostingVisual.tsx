
import React from 'react';

const BoostingVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-8">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Ground Truth */}
        <path d="M 50 150 Q 200 20 350 150" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
        
        {/* Model 1: Rough guess */}
        <path 
          d="M 50 150 L 200 100 L 350 150" 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="2" 
          strokeOpacity={isAnimating ? "0.3" : "1"} 
        />

        {/* Correction sequence */}
        {isAnimating && (
          <g>
            {/* Model 2: Fixing errors */}
            <path 
              d="M 50 150 Q 200 60 350 150" 
              fill="none" 
              stroke="#6366f1" 
              strokeWidth="4" 
              className="animate-[draw_2s_ease-out_forwards]"
            />
            <circle cx="200" cy="60" r="4" fill="#f43f5e">
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        <text x="200" y="180" textAnchor="middle" className="text-[10px] font-black fill-slate-400 uppercase tracking-widest">
          Sequential Correction
        </text>
      </svg>
      <style>{`
        @keyframes draw {
          from { stroke-dasharray: 0 400; }
          to { stroke-dasharray: 400 0; }
        }
      `}</style>
    </div>
  );
};

export default BoostingVisual;
