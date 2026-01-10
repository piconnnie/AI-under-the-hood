
import React from 'react';

const FoundationVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-auto min-h-[28rem] bg-white rounded-[2.5rem] overflow-hidden flex flex-col p-6 gap-6 border-4 border-slate-50 shadow-inner justify-center">
      {/* Traditional Programming */}
      <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 relative overflow-hidden border-2 border-slate-100 shadow-sm h-24">
        <div className="text-[8px] font-black text-slate-400 absolute top-2 left-4 uppercase tracking-widest">Rules</div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">📥</div>
        </div>
        <div className="w-6 h-1 bg-slate-200 rounded-full"></div>
        <div className="flex-1 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white border-2 border-slate-700 shadow-md relative overflow-hidden">
          <span className="text-[10px] font-mono font-bold text-emerald-400">IF data THEN rule</span>
          {isAnimating && (
            <div className="absolute inset-0 bg-white/5 -translate-x-full animate-[shimmer_1.5s_infinite]" />
          )}
        </div>
        <div className="w-6 h-1 bg-slate-200 rounded-full"></div>
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">📤</div>
      </div>

      {/* Machine Learning */}
      <div className="flex items-center gap-4 bg-indigo-50/30 rounded-2xl p-4 relative overflow-hidden border-2 border-indigo-100 shadow-sm h-24">
        <div className="text-[8px] font-black text-indigo-400 absolute top-2 left-4 uppercase tracking-widest">Learning</div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-indigo-100">📊</div>
        </div>
        <div className="w-6 h-1 bg-indigo-200/50 rounded-full"></div>
        <div className="flex-1 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white border-2 border-white/20 shadow-lg relative overflow-hidden">
          <span className="text-[10px] font-black uppercase tracking-widest">Evolving...</span>
          {isAnimating && (
             <div className="absolute inset-0 bg-white/20 animate-pulse" />
          )}
        </div>
        <div className="w-6 h-1 bg-indigo-200/50 rounded-full"></div>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-md border border-indigo-400 text-white">🧠</div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default FoundationVisual;
