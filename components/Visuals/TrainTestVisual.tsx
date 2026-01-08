import React, { useState, useEffect } from 'react';

const TrainTestVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [seed, setSeed] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
        setSeed(prev => prev + 1);
        setIsShuffling(false);
    }, 600);
  };

  const dataPoints = Array.from({ length: 60 }).map((_, i) => {
    // Deterministic but "shuffled-looking" positions based on index and seed
    const x = ((i * 137 + seed * 45) % 360) + 20;
    const y = ((i * 223 + seed * 89) % 160) + 20;
    return { id: i, x, y, isTest: (i % 5 === 0) }; // 20% test
  });

  return (
    <div className="relative w-full h-80 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-8">
      <div className="absolute top-4 w-full flex justify-between px-12 z-20">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Train (80%)</span>
        </div>
        <button 
            onClick={handleShuffle}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
        >
            🔀 Reshuffle Split
        </button>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Test (20%)</span>
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
        </div>
      </div>
      
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {dataPoints.map((p) => (
          <circle 
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={isShuffling ? 2 : 6}
            fill={p.isTest ? '#f43f5e' : '#3b82f6'}
            className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ opacity: isShuffling ? 0.2 : 1 }}
          />
        ))}

        {/* Legend Overlay */}
        {!isShuffling && (
            <g className="animate-[fadeIn_0.5s_ease-out]">
                <text x="200" y="110" fontSize="60" textAnchor="middle" opacity="0.05" pointerEvents="none">📚</text>
            </g>
        )}
      </svg>
      
      <div className="absolute bottom-4 bg-white/80 border border-slate-100 px-6 py-2 rounded-2xl shadow-sm text-center">
        <p className="text-[10px] font-bold text-slate-500 leading-tight">
            Randomly splitting ensures the model doesn't just memorize specific data sequences.
        </p>
      </div>
    </div>
  );
};

export default TrainTestVisual;