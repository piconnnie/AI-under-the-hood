import React from 'react';

const FoundationVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-64 bg-white rounded-2xl overflow-hidden flex flex-col p-4 gap-4 border border-slate-100">
      {/* Traditional Programming */}
      <div className="flex-1 flex items-center gap-4 bg-slate-50 rounded-xl p-4 relative overflow-hidden border border-slate-100">
        <div className="text-[8px] font-black text-slate-400 absolute top-2 left-4 uppercase tracking-widest">Rules</div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm">📥</div>
        </div>
        <div className="w-4 h-0.5 bg-slate-200 rounded-full"></div>
        <div className="flex-1 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white border-2 border-slate-700 shadow-sm relative overflow-hidden">
          <span className="text-[8px] font-mono font-bold text-emerald-400">IF data THEN rule</span>
          {isAnimating && (
            <div className="absolute inset-0 bg-white/5 -translate-x-full animate-[shimmer_1.5s_infinite]" />
          )}
        </div>
        <div className="w-4 h-0.5 bg-slate-200 rounded-full"></div>
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm">📤</div>
      </div>

      {/* Machine Learning */}
      <div className="flex-1 flex items-center gap-4 bg-indigo-50/30 rounded-xl p-4 relative overflow-hidden border border-indigo-100">
        <div className="text-[8px] font-black text-indigo-400 absolute top-2 left-4 uppercase tracking-widest">Learning</div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm border border-indigo-100">📊</div>
        </div>
        <div className="w-4 h-0.5 bg-indigo-200/50 rounded-full"></div>
        <div className="flex-1 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white border-2 border-white/20 shadow-md">
          <span className="text-[8px] font-black uppercase tracking-widest">Evolving...</span>
        </div>
        <div className="w-4 h-0.5 bg-indigo-200/50 rounded-full"></div>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-lg shadow-md border border-indigo-400 text-white">🧠</div>
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