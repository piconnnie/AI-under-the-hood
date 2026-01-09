
import React, { useState, useEffect } from 'react';

const FeatureEngineeringVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [activeFeatures, setActiveFeatures] = useState<{year: boolean, month: boolean, holiday: boolean, weekend: boolean}>({
    year: false,
    month: false,
    holiday: false,
    weekend: false
  });

  const rawData = "2023-12-25"; // Christmas Example

  const toggleFeature = (key: keyof typeof activeFeatures) => {
    setActiveFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!isAnimating) return;
    
    // Simple sequence animation for the simulation button in parent
    const sequence = ['year', 'month', 'holiday', 'weekend'] as const;
    let idx = 0;

    const interval = setInterval(() => {
        setActiveFeatures(prev => ({
            ...prev,
            [sequence[idx]]: !prev[sequence[idx]]
        }));
        idx = (idx + 1) % sequence.length;
    }, 1200);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative w-full min-h-[26rem] h-auto bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 dark:border-slate-800 flex flex-col p-6 shadow-inner transition-colors">
      <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Raw Input Data</div>
            <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Timestamp String</div>
                    <div className="text-lg font-mono font-black text-slate-800 dark:text-slate-200">"{rawData}"</div>
                </div>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Goal</div>
            <div className="text-xs font-medium text-slate-500 max-w-[150px]">
                Convert string to math signals.
            </div>
          </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-6 items-center">
        {/* Feature Extractors */}
        <div className="flex-1 space-y-2 w-full">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center sm:text-left">Feature Extractors</div>
            
            <button 
                onClick={() => toggleFeature('year')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${activeFeatures.year ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-indigo-300'}`}
            >
                <span className="font-bold text-xs">Extract Year</span>
                <span className={`text-xs ${activeFeatures.year ? 'opacity-100' : 'opacity-0'}`}>➡️</span>
            </button>

            <button 
                onClick={() => toggleFeature('month')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${activeFeatures.month ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-indigo-300'}`}
            >
                <span className="font-bold text-xs">Extract Month</span>
                <span className={`text-xs ${activeFeatures.month ? 'opacity-100' : 'opacity-0'}`}>➡️</span>
            </button>

            <button 
                onClick={() => toggleFeature('holiday')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${activeFeatures.holiday ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-emerald-300'}`}
            >
                <span className="font-bold text-xs">Is Holiday?</span>
                <span className={`text-xs ${activeFeatures.holiday ? 'opacity-100' : 'opacity-0'}`}>➡️</span>
            </button>
        </div>

        {/* Arrow for Desktop */}
        <div className="text-slate-300 dark:text-slate-600 text-2xl hidden sm:block">➔</div>

        {/* Feature Vector Output */}
        <div className="flex-1 w-full h-full min-h-[160px] bg-slate-900 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-center shadow-xl">
            <div className="absolute top-3 left-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Model Input Vector</div>
            
            <div className="font-mono text-sm sm:text-base text-slate-300 space-y-2 mt-4">
                <div>[</div>
                <div className="pl-4 flex items-center gap-2">
                    <span className="text-indigo-400">{activeFeatures.year ? "2023.0," : "0.0,"}</span>
                    <span className="text-slate-600 text-[10px] uppercase">// Year</span>
                </div>
                <div className="pl-4 flex items-center gap-2">
                    <span className="text-indigo-400">{activeFeatures.month ? "12.0," : "0.0,"}</span>
                    <span className="text-slate-600 text-[10px] uppercase">// Month</span>
                </div>
                <div className="pl-4 flex items-center gap-2">
                    <span className="text-emerald-400">{activeFeatures.holiday ? "1.0," : "0.0,"}</span>
                    <span className="text-slate-600 text-[10px] uppercase">// Holiday Flag</span>
                </div>
                <div>]</div>
            </div>

            {activeFeatures.holiday && (
                <div className="absolute bottom-4 right-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
                    Strong Signal Detected!
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FeatureEngineeringVisual;
