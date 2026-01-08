
import React, { useState, useEffect } from 'react';

const NaiveBayesVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const clues = [
    { name: 'Red Color', probApple: 0.8, probOrange: 0.1 },
    { name: 'Round Shape', probApple: 0.6, probOrange: 0.7 },
    { name: 'Shiny Skin', probApple: 0.9, probOrange: 0.2 }
  ];

  const progress = isAnimating ? (phase / 100) : 0;

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-6 shadow-2xl">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Independent Clues</div>
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

      <div className="space-y-4 flex-1">
        {clues.map((clue, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center px-2">
                <span className="text-[9px] font-black text-slate-300 uppercase">{clue.name}</span>
                <span className="text-[8px] font-mono text-slate-500">P(Feature|Class)</span>
            </div>
            <div className="h-6 w-full bg-slate-800 rounded-full overflow-hidden flex relative">
                <div 
                    className="h-full bg-rose-500/80 transition-all duration-300 ease-out"
                    style={{ width: `${clue.probApple * 100 * progress}%` }}
                />
                <div 
                    className="h-full bg-orange-500/80 transition-all duration-300 ease-out border-l border-slate-700"
                    style={{ width: `${clue.probOrange * 100 * progress}%` }}
                />
                {isAnimating && (
                    <div className="absolute inset-0 bg-white/5 animate-pulse" />
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
         <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Final Guess</div>
         <div className={`px-4 py-2 rounded-xl border-2 font-black text-sm transition-all duration-700 ${progress > 0.8 ? 'bg-rose-500 border-rose-400 text-white scale-110 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'bg-slate-800 border-slate-700 text-slate-500 opacity-50'}`}>
            🍎 IT'S AN APPLE!
         </div>
      </div>
    </div>
  );
};

export default NaiveBayesVisual;
