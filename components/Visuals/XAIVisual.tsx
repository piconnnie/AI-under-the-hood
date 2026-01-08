import React, { useState, useEffect } from 'react';

const XAIVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [showXAI, setShowXAI] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setPrediction(82);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setPrediction(null);
      setShowXAI(false);
    }
  }, [isAnimating]);

  const features = [
    { name: "Credit Score", impact: 45, type: 'positive', description: "High score increases approval" },
    { name: "Income Level", impact: 30, type: 'positive', description: "Stable income is good" },
    { name: "Existing Debt", impact: -25, type: 'negative', description: "High debt lowers chance" },
    { name: "Loan Amount", impact: -12, type: 'negative', description: "Asking for too much is risky" }
  ];

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-8 shadow-2xl">
      <div className="flex justify-between items-start mb-6 z-10">
        <div>
          <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">XAI Debugger (LIME/SHAP)</div>
          <h3 className="text-xl font-black text-white">Loan Approval Model</h3>
        </div>
        <button 
          onClick={() => setShowXAI(!showXAI)}
          disabled={!prediction}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            showXAI 
            ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' 
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          } ${!prediction && 'opacity-30 cursor-not-allowed'}`}
        >
          {showXAI ? 'Hide Explainer' : 'Explain Why'}
        </button>
      </div>

      <div className="flex-1 flex gap-8 items-center justify-center relative">
        {/* The Black Box */}
        <div className={`relative z-20 w-32 h-32 rounded-3xl border-4 transition-all duration-700 flex flex-col items-center justify-center ${
            prediction ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_40px_rgba(249,115,22,0.2)]' : 'border-slate-700 bg-slate-800'
          }`}>
          <div className="text-3xl mb-1">{prediction ? '✅' : '⚙️'}</div>
          {prediction ? (
            <div className="text-center">
              <div className="text-white font-black text-lg">{prediction}%</div>
              <div className="text-[8px] font-bold text-orange-400 uppercase tracking-tighter leading-none">Approved</div>
            </div>
          ) : (
            <div className="text-[10px] font-black text-slate-500 uppercase">Processing</div>
          )}
          {isAnimating && !prediction && <div className="absolute inset-0 bg-white/5 animate-pulse rounded-3xl" />}
        </div>

        {/* XAI Visualization - Feature Importance Bars */}
        <div className={`flex-1 space-y-3 transition-all duration-700 ${showXAI ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Feature Contribution</div>
          {features.map((f, i) => (
            <div key={i} className="group relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-300">{f.name}</span>
                <span className={`text-[9px] font-black ${f.type === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                   {f.type === 'positive' ? '+' : ''}{f.impact}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex relative">
                 <div 
                  className={`h-full transition-all duration-1000 delay-${i*100} ${f.type === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.abs(f.impact)}%`, marginLeft: f.type === 'negative' ? 'auto' : '0' }}
                 />
              </div>
              {/* Tooltip on hover */}
              <div className="absolute left-0 -top-8 bg-slate-800 text-[9px] text-white px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none whitespace-nowrap">
                {f.description}
              </div>
            </div>
          ))}
          <div className="pt-2 text-[8px] font-medium text-slate-500 italic">
            * This explains WHY this specific individual got this result.
          </div>
        </div>
      </div>

      {!isAnimating && (
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-40 flex items-center justify-center">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-enter">
            <span className="text-xl">🔬</span>
            <span className="text-xs font-black text-slate-900 uppercase">Press Simulate to Inspect the Box</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default XAIVisual;