
import React from 'react';

const EmbeddingsVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex items-center justify-center p-8">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Grid lines */}
        <line x1="200" y1="0" x2="200" y2="200" stroke="#f1f5f9" strokeWidth="2" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="2" />

        {/* Cluster 1: Royalty */}
        <g className={`transition-transform duration-[2s] ease-in-out ${isAnimating ? 'translate-x-4 translate-y-4' : ''}`}>
            <circle cx="80" cy="60" r="25" fill="#6366f1" fillOpacity="0.1" />
            <text x="80" y="60" textAnchor="middle" className="text-[10px] font-bold fill-indigo-800">King</text>
        </g>
        <g className={`transition-transform duration-[2s] ease-in-out ${isAnimating ? '-translate-x-4 -translate-y-2' : ''}`}>
            <circle cx="100" cy="80" r="25" fill="#6366f1" fillOpacity="0.1" />
            <text x="100" y="80" textAnchor="middle" className="text-[10px] font-bold fill-indigo-800">Queen</text>
        </g>

        {/* Cluster 2: Tech */}
        <g className={`transition-transform duration-[2s] ease-in-out ${isAnimating ? '-translate-x-2 translate-y-4' : ''}`}>
            <circle cx="300" cy="50" r="25" fill="#10b981" fillOpacity="0.1" />
            <text x="300" y="50" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">Computer</text>
        </g>
        <g className={`transition-transform duration-[2s] ease-in-out ${isAnimating ? 'translate-x-2 -translate-y-2' : ''}`}>
            <circle cx="320" cy="70" r="25" fill="#10b981" fillOpacity="0.1" />
            <text x="320" y="70" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">Code</text>
        </g>

        {/* Cluster 3: Food */}
        <g className={`transition-transform duration-[2s] ease-in-out ${isAnimating ? 'translate-x-5' : ''}`}>
            <circle cx="200" cy="160" r="25" fill="#f59e0b" fillOpacity="0.1" />
            <text x="200" y="160" textAnchor="middle" className="text-[10px] font-bold fill-amber-800">Pizza</text>
        </g>

        {/* Vector Math Visual */}
        {isAnimating && (
            <path 
                d="M 80 60 L 100 80" 
                stroke="#6366f1" 
                strokeWidth="2" 
                strokeDasharray="4"
                className="animate-pulse"
            />
        )}
        
        <text x="200" y="190" textAnchor="middle" className="text-[8px] font-black fill-slate-400 uppercase tracking-widest">
            Semantic Vector Space
        </text>
      </svg>
    </div>
  );
};

export default EmbeddingsVisual;
