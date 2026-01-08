
import React, { useState, useEffect } from 'react';

const RLVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(0);

  const path = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
    { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }
  ];

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % path.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    setPos(path[step]);
  }, [step]);

  const gridSize = 4;
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div className="relative w-full h-64 bg-emerald-50 rounded-xl overflow-hidden flex items-center justify-center p-8 border-2 border-emerald-100">
      <div className="grid grid-cols-4 gap-2 bg-emerald-100 p-2 rounded-xl shadow-inner">
        {cells.map((_, i) => {
          const x = i % 4;
          const y = Math.floor(i / 4);
          const isGoal = x === 3 && y === 2;
          const isDog = pos.x === x && pos.y === y;

          return (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 ${isDog ? 'bg-white shadow-md scale-110 z-10' : 'bg-emerald-50/50'}`}
            >
              {isDog ? '🐶' : isGoal ? '🍖' : ''}
              {isGoal && !isDog && <div className="absolute animate-ping w-8 h-8 rounded-full bg-amber-400/20" />}
            </div>
          );
        })}
      </div>

      <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-xl border border-emerald-200 shadow-sm">
        <div className="text-[8px] font-black text-emerald-600 uppercase mb-1">Q-Table Score</div>
        <div className="text-xs font-black text-slate-700">Reward: +{step * 10}</div>
      </div>

      {!isAnimating && (
        <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
          <p className="text-slate-800 font-bold bg-white/90 px-4 py-2 rounded-full border border-slate-200 shadow-md">⏸ Paused</p>
        </div>
      )}
    </div>
  );
};

export default RLVisual;
