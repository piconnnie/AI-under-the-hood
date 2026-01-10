
import React, { useState } from 'react';

const NaiveBayesVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [features, setFeatures] = useState({
    red: true,
    round: true,
    shiny: false
  });

  const probs = {
    red: { label: "Red Color", apple: 0.8, orange: 0.1 },
    round: { label: "Round Shape", apple: 0.6, orange: 0.7 },
    shiny: { label: "Shiny Texture", apple: 0.9, orange: 0.2 }
  };

  // Calculate posterior (simplified Naive Bayes)
  // Start with 50/50 prior
  let scoreApple = 0.5;
  let scoreOrange = 0.5;

  if (features.red) { scoreApple *= probs.red.apple; scoreOrange *= probs.red.orange; }
  if (features.round) { scoreApple *= probs.round.apple; scoreOrange *= probs.round.orange; }
  if (features.shiny) { scoreApple *= probs.shiny.apple; scoreOrange *= probs.shiny.orange; }

  const total = scoreApple + scoreOrange;
  const pApple = (scoreApple / total) * 100;
  const pOrange = (scoreOrange / total) * 100;

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full h-auto min-h-[24rem] bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Observations</div>
        <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-[8px] font-bold text-slate-400">APPLE</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-[8px] font-bold text-slate-400">ORANGE</span>
            </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 flex-1">
        {/* Features Toggles */}
        <div className="flex flex-col gap-3 w-full sm:w-1/2">
            {(Object.keys(features) as Array<keyof typeof features>).map((key) => (
                <button 
                    key={key}
                    onClick={() => toggleFeature(key)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${features[key] ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                >
                    <span className="text-[10px] font-bold uppercase">{probs[key].label}</span>
                    <div className={`w-4 h-4 rounded-full border border-white/50 flex items-center justify-center ${features[key] ? 'bg-white text-indigo-600' : 'bg-transparent'}`}>
                        {features[key] && <span className="text-[8px]">✓</span>}
                    </div>
                </button>
            ))}
        </div>

        {/* Probabilities */}
        <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Apple Probability</span>
                    <span>{Math.round(pApple)}%</span>
                </div>
                <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${pApple}%` }} />
                </div>
            </div>
            
            <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Orange Probability</span>
                    <span>{Math.round(pOrange)}%</span>
                </div>
                <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${pOrange}%` }} />
                </div>
            </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center">
         <div className={`px-6 py-2 rounded-xl border-2 font-black text-sm transition-all duration-500 transform ${pApple > pOrange ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-900/50' : 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-900/50'}`}>
            {pApple > pOrange ? "🍎 IT'S AN APPLE" : "🍊 IT'S AN ORANGE"}
         </div>
      </div>
    </div>
  );
};

export default NaiveBayesVisual;
