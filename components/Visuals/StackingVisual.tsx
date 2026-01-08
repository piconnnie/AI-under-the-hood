
import React from 'react';

const StackingVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col items-center justify-center p-6 shadow-2xl">
      {/* Level Label */}
      <div className="absolute top-4 left-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Layered Meta-Learning</div>

      <div className="flex justify-around w-full relative">
        {/* Base Models */}
        {['Expert A', 'Expert B', 'Expert C'].map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-2 z-10">
            <div className={`w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center transition-all duration-500 ${isAnimating ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : ''}`}>
              <span className="text-xl">{i === 0 ? '🌲' : i === 1 ? '📈' : '📐'}</span>
              <span className="text-[7px] font-black text-slate-400 mt-1 uppercase">{name}</span>
            </div>
            {isAnimating && (
              <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse" />
            )}
          </div>
        ))}

        {/* Connection Lines to Meta Model */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '60px' }}>
          <g stroke="#334155" strokeWidth="2" fill="none" className={isAnimating ? 'stroke-indigo-500/30' : ''}>
            <path d="M 65 0 L 200 80" />
            <path d="M 200 0 L 200 80" />
            <path d="M 335 0 L 200 80" />
          </g>
          {isAnimating && (
            <g fill="#6366f1">
              <circle r="3">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 65 0 L 200 80" />
              </circle>
              <circle r="3">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 200 0 L 200 80" />
              </circle>
              <circle r="3">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 335 0 L 200 80" />
              </circle>
            </g>
          )}
        </svg>
      </div>

      {/* The Meta Model (The Judge) */}
      <div className="mt-12 z-20">
        <div className={`w-24 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isAnimating ? 'bg-indigo-600 border-indigo-400 shadow-xl scale-110' : 'bg-slate-800 border-slate-700'}`}>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-indigo-200 uppercase tracking-tighter">Meta-Model</span>
            <span className="text-white font-black text-xs">THE JUDGE</span>
          </div>
        </div>
      </div>

      <div className={`mt-6 text-2xl transition-all duration-1000 transform ${isAnimating ? 'opacity-100 translate-y-0 scale-125' : 'opacity-0 translate-y-4 scale-50'}`}>
        🎯
      </div>

      <style>{`
        @keyframes pulse-line {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
};

export default StackingVisual;
