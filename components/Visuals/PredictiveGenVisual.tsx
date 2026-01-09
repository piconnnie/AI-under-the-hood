import React, { useState } from 'react';

const PredictiveGenVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [mode, setMode] = useState<'predictive' | 'generative'>('predictive');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSimulate = () => {
    setProcessing(true);
    setResult(null);
    setTimeout(() => {
      setProcessing(false);
      setResult(mode === 'predictive' ? 'LABEL: "Cat" (98%)' : 'IMAGE GENERATED');
    }, 2000);
  };

  return (
    <div className="relative w-full min-h-[24rem] h-auto bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 flex flex-col items-center p-6 shadow-inner">
      {/* Mode Switcher */}
      <div className="flex bg-white rounded-xl p-1 shadow-sm mb-8 z-10 border border-slate-200">
        <button
          onClick={() => { setMode('predictive'); setResult(null); }}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'predictive' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          Predictive
        </button>
        <button
          onClick={() => { setMode('generative'); setResult(null); }}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'generative' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          Generative
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center flex-1">
        {/* Input Side */}
        <div className="flex flex-col items-center gap-3">
           <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center text-4xl shadow-sm bg-white ${mode === 'predictive' ? 'border-blue-200' : 'border-purple-200'}`}>
             {mode === 'predictive' ? '📸' : '⌨️'}
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             {mode === 'predictive' ? 'Input: Image' : 'Input: Text'}
           </span>
        </div>

        {/* The Machine / Arrow */}
        <div className="w-full sm:flex-1 max-w-[120px] h-12 sm:h-auto relative flex flex-col items-center justify-center">
             {/* Flow Line */}
             <div className="w-1 sm:w-full h-full sm:h-1 bg-slate-200 rounded-full overflow-hidden">
                {processing && <div className={`w-full sm:h-full sm:w-1/3 rounded-full animate-[shimmer_1s_infinite] ${mode === 'predictive' ? 'bg-blue-500' : 'bg-purple-500'}`} />}
             </div>
             
             {/* Model Box */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg border-2 shadow-sm whitespace-nowrap z-10 transition-transform ${processing ? 'scale-110' : 'scale-100'} ${mode === 'predictive' ? 'border-blue-500 text-blue-600' : 'border-purple-500 text-purple-600'}`}>
                <span className="text-[10px] font-black uppercase">
                    {mode === 'predictive' ? 'Discriminator' : 'Generator'}
                </span>
             </div>
        </div>

        {/* Output Side */}
        <div className="flex flex-col items-center gap-3">
           <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-500 ${result ? (mode === 'predictive' ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-purple-50 border-purple-500 text-4xl') : 'bg-slate-100 border-dashed border-slate-300'}`}>
             {result ? (mode === 'predictive' ? '🐱' : '🎨') : '?'}
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             {mode === 'predictive' ? 'Output: Class' : 'Output: Creation'}
           </span>
        </div>
      </div>

      <div className="mt-8">
         <button 
            onClick={handleSimulate}
            disabled={processing}
            className={`px-8 py-3 rounded-xl font-black text-white text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${mode === 'predictive' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'}`}
         >
            {processing ? 'Processing...' : (mode === 'predictive' ? 'Classify Input' : 'Generate Content')}
         </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

export default PredictiveGenVisual;