
import React, { useState } from 'react';

const Activations: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [type, setType] = useState<'step' | 'sigmoid' | 'relu'>('sigmoid');

  const renderPath = () => {
    switch (type) {
      case 'step':
        return "M 50 150 L 200 150 L 200 50 L 350 50";
      case 'sigmoid':
        return "M 50 150 C 150 150 250 50 350 50";
      case 'relu':
        return "M 50 150 L 200 150 L 350 30";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-64 bg-white rounded-xl overflow-hidden border-2 border-slate-100 flex flex-col items-center p-4">
      <div className="flex gap-2 mb-4">
        {(['step', 'sigmoid', 'relu'] as const).map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg border-2 transition-all ${type === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid */}
        <line x1="200" y1="20" x2="200" y2="180" stroke="#f1f5f9" strokeWidth="1" />
        <line x1="50" y1="100" x2="350" y2="100" stroke="#f1f5f9" strokeWidth="1" />

        {/* Axes */}
        <line x1="50" y1="180" x2="350" y2="180" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="180" stroke="#cbd5e1" strokeWidth="2" />

        {/* Graph Path */}
        <path
          d={renderPath()}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Moving Input Indicator */}
        {isAnimating && (
          <circle r="6" fill="#f43f5e">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={renderPath()}
            />
          </circle>
        )}
      </svg>

      <div className="mt-2 text-[10px] font-bold text-slate-400">
        {type === 'step' && "Strict Yes/No"}
        {type === 'sigmoid' && "Smooth Probability (0 to 1)"}
        {type === 'relu' && "Ignore negative, keep positive"}
      </div>
    </div>
  );
};

export default Activations;
