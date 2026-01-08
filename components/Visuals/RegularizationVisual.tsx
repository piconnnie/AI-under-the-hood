import React, { useState } from 'react';

const RegularizationVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [lambda, setLambda] = useState(0.1);

  const initialWeights = [
    { label: 'Feature A', val: 95 }, // Overfit feature
    { label: 'Feature B', val: 80 },
    { label: 'Feature C', val: 40 },
    { label: 'Feature D', val: 15 }
  ];

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 p-8 flex flex-col justify-between shadow-2xl">
      
      <div className="flex justify-between items-start">
        <div>
           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">L2 Regularization</div>
           <div className={`text-xl font-black transition-colors ${lambda > 0.6 ? 'text-emerald-400' : 'text-rose-400'}`}>
             {lambda > 0.6 ? 'Model: Generalized' : 'Model: Overfitting'}
           </div>
        </div>
        
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 w-40">
            <label className="text-[8px] font-black text-slate-400 uppercase block mb-2">Penalty Strength (Lambda)</label>
            <input 
                type="range" 
                min="0" max="1" step="0.05" 
                value={lambda} 
                onChange={(e) => setLambda(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
        </div>
      </div>

      <div className="flex items-end justify-around gap-4 h-32 mb-4">
        {initialWeights.map((bar, i) => {
          // Logic: Higher lambda suppresses high weights more aggressively
          const suppressedVal = bar.val * (1 - (lambda * 0.8));
          const color = lambda > 0.6 ? '#10b981' : '#6366f1';

          return (
            <div key={i} className="flex flex-col items-center flex-1 max-w-[50px] gap-2">
                <div className="w-full relative bg-slate-800/50 rounded-t-lg overflow-hidden h-32 flex flex-col justify-end border-b border-slate-700">
                    <div 
                    className="w-full transition-all duration-300 ease-out"
                    style={{ 
                        height: `${suppressedVal}%`,
                        background: color,
                        boxShadow: `0 0 ${suppressedVal/5}px ${color}`
                    }}
                    />
                </div>
                <span className="text-[8px] font-bold text-slate-500 uppercase">{bar.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
         <p className="text-[10px] text-slate-400 font-medium">
            Higher penalty forces the model to ignore noise (large weights), reducing complexity.
         </p>
      </div>
    </div>
  );
};

export default RegularizationVisual;