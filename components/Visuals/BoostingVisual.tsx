
import React, { useState } from 'react';

const BoostingVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [step, setStep] = useState(0); // 0: Start, 1: Weak Learner 1, 2: Calculate Error, 3: Weak Learner 2 (Corrected)

  const nextStep = () => setStep(s => (s + 1) % 4);

  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-8">
      <div className="absolute top-4 w-full flex justify-center z-10">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
             {[0, 1, 2, 3].map(s => (
                 <div key={s} className={`w-8 h-1 rounded-full transition-colors ${step >= s ? 'bg-indigo-600' : 'bg-slate-300'}`} />
             ))}
          </div>
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Ground Truth - faint background */}
        <path d="M 50 150 Q 200 20 350 150" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        
        {/* Model 1: Weak Learner (Straight Lineish) */}
        <path 
          d="M 50 150 L 200 100 L 350 150" 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="3" 
          className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}
        />
        {step >= 1 && (
            <text x="280" y="130" className="text-[10px] fill-slate-400 font-bold">Model 1</text>
        )}

        {/* Error Highlighting */}
        <circle 
            cx="200" cy="60" r="20" 
            fill="#f43f5e" 
            fillOpacity="0.2" 
            stroke="#f43f5e" 
            strokeDasharray="4"
            className={`transition-opacity duration-500 ${step === 2 ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
        />
        {step === 2 && (
            <text x="200" y="30" textAnchor="middle" className="text-[10px] font-black fill-rose-500 uppercase">Error High Weight</text>
        )}

        {/* Model 2: Correction */}
        <path 
          d="M 50 150 Q 200 60 350 150" 
          fill="none" 
          stroke="#6366f1" 
          strokeWidth="4" 
          className={`transition-all duration-1000 ease-out ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}
          strokeDasharray={step >= 3 ? "0" : "1000"}
          strokeDashoffset={step >= 3 ? "0" : "1000"}
        />
        {step >= 3 && (
            <g className="animate-enter">
                <circle cx="200" cy="85" r="4" fill="#6366f1" />
                <text x="200" y="180" textAnchor="middle" className="text-[12px] font-black fill-indigo-600 uppercase tracking-widest">
                Ensemble Improved!
                </text>
            </g>
        )}
      </svg>

      <div className="absolute bottom-6">
        <button 
            onClick={nextStep}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
            {step === 0 ? "Start Training" : 
             step === 1 ? "Identify Errors" : 
             step === 2 ? "Train Fixer" : "Reset"}
             <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default BoostingVisual;
