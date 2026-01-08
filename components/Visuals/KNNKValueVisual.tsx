
import React, { useState } from 'react';

const KNNKValueVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [kValue, setKValue] = useState(1);

  // Points of two classes
  const bluePoints = [
    { x: 50, y: 50 }, { x: 80, y: 70 }, { x: 40, y: 100 }, { x: 100, y: 40 }
  ];
  const redPoints = [
    { x: 300, y: 140 }, { x: 340, y: 110 }, { x: 290, y: 170 }, { x: 350, y: 180 }, { x: 120, y: 130 } // Outlier red
  ];

  // Helper to render paths representing the "decision boundary"
  // For K=1, it should look wiggly around the red outlier near blue territory.
  // For K=Large, it should be a straight-ish divider.
  const getBoundaryPath = () => {
    if (kValue === 1) {
      // Very wiggly boundary that circles the outlier red point
      return "M 150 0 L 150 80 Q 150 150, 100 130 Q 80 120, 140 180 L 160 200 L 400 200 L 400 0 Z";
    } else if (kValue === 5) {
      // Smoother boundary that ignores the outlier red point
      return "M 180 0 L 160 200 L 400 200 L 400 0 Z";
    } else {
      // Very smooth, almost vertical line
      return "M 170 0 L 170 200 L 400 200 L 400 0 Z";
    }
  };

  return (
    <div className="relative w-full h-80 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center p-6 shadow-inner">
      <div className="flex gap-4 mb-6">
        {[1, 5, 15].map(v => (
          <button
            key={v}
            onClick={() => setKValue(v)}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${kValue === v ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
          >
            K = {v}
          </button>
        ))}
      </div>

      <div className="relative flex-1 w-full bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Boundary Colors */}
          <rect x="0" y="0" width="400" height="200" fill="#eff6ff" /> {/* Blue Area */}
          <path 
            d={getBoundaryPath()} 
            fill="#fff1f2" 
            className="transition-all duration-700 ease-in-out" 
          /> {/* Red Area */}

          {/* Points */}
          {bluePoints.map((p, i) => (
            <circle key={`b-${i}`} cx={p.x} cy={p.y} r="6" fill="#3b82f6" />
          ))}
          {redPoints.map((p, i) => (
            <circle 
              key={`r-${i}`} 
              cx={p.x} 
              cy={p.y} 
              r="6" 
              fill="#f43f5e" 
              className={p.x < 150 ? (kValue > 1 ? 'opacity-30' : 'animate-pulse') : ''} 
            />
          ))}

          <text x="50" y="20" className="text-[10px] font-black fill-blue-600">Class Blue</text>
          <text x="300" y="20" className="text-[10px] font-black fill-rose-600">Class Red</text>
        </svg>

        {kValue === 1 && (
          <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-lg border border-slate-200 shadow-sm animate-bounce">
            <span className="text-[8px] font-black text-rose-500">K=1: FOOLED BY NOISE!</span>
          </div>
        )}
        
        {kValue === 15 && (
          <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">K=15: Safe & Smooth</span>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] font-bold text-slate-500 leading-tight">
          {kValue === 1 && "Wiggly: The outlier point forces the boundary to curve weirdly."}
          {kValue === 5 && "Balanced: The outlier is starting to be ignored as it is outvoted."}
          {kValue === 15 && "General: The boundary is stable because of the 'Wisdom of the Crowd'."}
        </p>
      </div>
    </div>
  );
};

export default KNNKValueVisual;
