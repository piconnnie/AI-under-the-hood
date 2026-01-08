
import React, { useState, useEffect } from 'react';

const HierarchicalClusteringVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative w-full h-72 bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 flex items-center justify-center p-8">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Points and merging bubbles */}
        <g className="transition-all duration-700">
          <circle cx="80" cy="80" r="8" fill="#6366f1" />
          <circle cx="110" cy="70" r="8" fill="#6366f1" />
          {step >= 1 && <circle cx="95" cy="75" r="30" fill="#6366f1" fillOpacity="0.1" stroke="#6366f1" strokeWidth="1" />}
          
          <circle cx="280" cy="120" r="8" fill="#f43f5e" />
          <circle cx="310" cy="130" r="8" fill="#f43f5e" />
          {step >= 2 && <circle cx="295" cy="125" r="30" fill="#f43f5e" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="1" />}

          {step >= 3 && <ellipse cx="200" cy="100" rx="160" ry="70" fill="#94a3b8" fillOpacity="0.05" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />}
        </g>

        {/* The Dendrogram (Tree) building at bottom */}
        <g transform="translate(100, 160)" stroke="#cbd5e1" strokeWidth="2" fill="none">
          <path d="M 20 20 L 20 10 M 50 20 L 50 10" />
          {step >= 1 && <path d="M 20 10 L 50 10 M 35 10 L 35 0" stroke="#6366f1" />}
          
          <path d="M 150 20 L 150 10 M 180 20 L 180 10" />
          {step >= 2 && <path d="M 150 10 L 180 10 M 165 10 L 165 0" stroke="#f43f5e" />}

          {step >= 3 && <path d="M 35 0 L 165 0 M 100 0 L 100 -10" stroke="#94a3b8" />}
        </g>
        
        <text x="200" y="30" textAnchor="middle" className="text-[10px] font-black fill-slate-400 uppercase tracking-[0.2em]">
          Building the Family Tree
        </text>
      </svg>
    </div>
  );
};

export default HierarchicalClusteringVisual;
