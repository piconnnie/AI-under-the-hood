
import React from 'react';

const BackwardProp: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const pulseCount = 6;
  const pulses = Array.from({ length: pulseCount }).map((_, i) => ({
    id: i,
    delay: i * 0.6,
    path: i % 2 === 0 ? 'top' : 'bottom'
  }));

  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-[2.5rem] overflow-hidden flex items-center justify-around border-4 border-rose-900/40 shadow-2xl">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #f43f5e 1px, transparent 1px), linear-gradient(#f43f5e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Network Connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="errorGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g stroke="#334155" strokeWidth="3" strokeLinecap="round">
          <line x1="20%" y1="50%" x2="50%" y2="40%" />
          <line x1="20%" y1="50%" x2="50%" y2="60%" />
          <line x1="50%" y1="40%" x2="80%" y2="50%" />
          <line x1="50%" y1="60%" x2="80%" y2="50%" />
        </g>
        {/* Active Feedback Lines */}
        <g stroke="#f43f5e" strokeWidth="2" filter="url(#errorGlow)" className={isAnimating ? 'opacity-30' : 'opacity-0'}>
          <line x1="20%" y1="50%" x2="50%" y2="40%" />
          <line x1="20%" y1="50%" x2="50%" y2="60%" />
          <line x1="50%" y1="40%" x2="80%" y2="50%" />
          <line x1="50%" y1="60%" x2="80%" y2="50%" />
        </g>
      </svg>

      {/* Weight Adjustments (Inputs) */}
      <div className="z-10 flex flex-col gap-6 items-center">
        <div className="text-[7px] font-black text-slate-500 uppercase">Updating</div>
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-indigo-700/50 flex items-center justify-center shadow-lg relative group">
           <div className={`absolute inset-0 bg-indigo-500/20 rounded-2xl transition-opacity ${isAnimating ? 'animate-pulse' : 'opacity-0'}`} />
           <span className="text-xl relative z-10">🔧</span>
        </div>
      </div>

      {/* Middle Layer (Learning) */}
      <div className="z-10 flex flex-col gap-14">
        <div className="w-12 h-12 rounded-full bg-purple-900/30 border-2 border-purple-500/50 flex items-center justify-center relative">
            <div className={`absolute inset-0 bg-rose-500/20 rounded-full ${isAnimating ? 'animate-ping' : ''}`} style={{ animationDuration: '3s' }} />
            <span className="text-[10px] text-purple-200 font-black">W1</span>
        </div>
        <div className="w-12 h-12 rounded-full bg-purple-900/30 border-2 border-purple-500/50 flex items-center justify-center relative">
            <div className={`absolute inset-0 bg-rose-500/20 rounded-full ${isAnimating ? 'animate-ping' : ''}`} style={{ animationDuration: '3s', animationDelay: '1s' }} />
            <span className="text-[10px] text-purple-200 font-black">W2</span>
        </div>
      </div>

      {/* Error Origin (The Truth) */}
      <div className="z-10 flex flex-col items-center">
        <div className="text-[8px] font-black text-rose-400 mb-2 tracking-widest uppercase">Target Missed</div>
        <div className="w-20 h-20 rounded-[2rem] bg-rose-600 border-4 border-rose-400 flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(244,63,94,0.5)]">
          <span className="text-3xl mb-1">🎯</span>
          <span className="text-[9px] font-black uppercase">Mistake!</span>
        </div>
      </div>

      {/* Feedback Waves */}
      {pulses.map((p) => (
        <div
          key={p.id}
          className="absolute w-12 h-12 border-4 border-rose-500/40 rounded-full z-20"
          style={{
            animation: `backflow${p.path} 3s ease-out infinite`,
            animationDelay: `${p.delay}s`,
            animationPlayState: isAnimating ? 'running' : 'paused',
            right: '20%',
            top: '50%',
            opacity: isAnimating ? 1 : 0,
            pointerEvents: 'none'
          }}
        />
      ))}

      <style>{`
        @keyframes backflowtop {
          0% { right: 20%; top: 50%; transform: translate(50%, -50%) scale(0.2); opacity: 0; }
          20% { opacity: 1; }
          45% { top: 40%; right: 50%; }
          90% { right: 80%; top: 50%; transform: translate(50%, -50%) scale(1.5); opacity: 0.1; }
          100% { right: 80%; top: 50%; transform: translate(50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes backflowbottom {
          0% { right: 20%; top: 50%; transform: translate(50%, -50%) scale(0.2); opacity: 0; }
          20% { opacity: 1; }
          45% { top: 60%; right: 50%; }
          90% { right: 80%; top: 50%; transform: translate(50%, -50%) scale(1.5); opacity: 0.1; }
          100% { right: 80%; top: 50%; transform: translate(50%, -50%) scale(2); opacity: 0; }
        }
      `}</style>

      {!isAnimating && (
        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
          <div className="bg-rose-900/80 px-6 py-3 rounded-2xl border border-rose-700/50 shadow-2xl flex flex-col items-center">
            <span className="text-white font-black text-xs uppercase tracking-[0.2em] mb-1">Feedback Paused</span>
            <span className="text-[10px] text-rose-200/60 font-medium">Model is not adjusting weights</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackwardProp;
