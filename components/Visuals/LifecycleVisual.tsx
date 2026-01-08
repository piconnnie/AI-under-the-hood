import React, { useState, useEffect } from 'react';

const LifecycleVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [accuracy, setAccuracy] = useState(95);
  const [weeks, setWeeks] = useState(0);
  const [isRetraining, setIsRetraining] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setInterval(() => {
        if (!isRetraining) {
            setWeeks(w => w + 1);
            setAccuracy(acc => Math.max(50, acc - (Math.random() * 2 + 0.5))); // Drift logic
        }
    }, 500);
    return () => clearInterval(timer);
  }, [isAnimating, isRetraining]);

  const handleRetrain = () => {
    setIsRetraining(true);
    setTimeout(() => {
        setAccuracy(98);
        setWeeks(0);
        setIsRetraining(false);
    }, 2000);
  };

  const getStatusColor = () => {
      if (accuracy > 90) return 'text-emerald-500';
      if (accuracy > 75) return 'text-amber-500';
      return 'text-rose-500';
  };

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
          <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Model Monitor</div>
              <div className="text-white font-bold text-lg">Production Dashboard</div>
          </div>
          <div className="text-right">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time in Prod</div>
              <div className="font-mono text-indigo-400">Week {weeks}</div>
          </div>
      </div>

      <div className="flex items-center gap-8 flex-1">
          {/* Circular Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="12" fill="none" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="none" 
                    strokeDasharray="440" 
                    strokeDashoffset={440 - (440 * accuracy) / 100}
                    className={`transition-all duration-500 ${getStatusColor()}`}
                    strokeLinecap="round"
                  />
              </svg>
              <div className="absolute flex flex-col items-center">
                  <span className={`text-3xl font-black ${getStatusColor()}`}>{Math.round(accuracy)}%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Accuracy</span>
              </div>
          </div>

          {/* Graph & Action */}
          <div className="flex-1 flex flex-col gap-4">
              <div className="h-24 bg-slate-800 rounded-xl border border-slate-700 relative overflow-hidden flex items-end px-2">
                 {/* Visual Drift Graph */}
                 <div className="absolute top-2 left-2 text-[8px] font-bold text-slate-500 uppercase">Performance Trend</div>
                 <div 
                    className="w-full bg-gradient-to-t from-emerald-500/20 to-transparent transition-all duration-500"
                    style={{ height: `${accuracy}%` }} 
                 />
                 <div className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-500/50" style={{ bottom: '75%' }}></div> {/* Threshold */}
              </div>

              <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-slate-400">
                      {accuracy < 75 ? "⚠️ Critical Drift Detected" : "Model Healthy"}
                  </div>
                  <button 
                    onClick={handleRetrain}
                    disabled={isRetraining || accuracy > 90}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${isRetraining ? 'bg-indigo-600 text-white' : (accuracy > 90 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-500 text-white shadow-lg animate-pulse')}`}
                  >
                      {isRetraining ? 'Retraining...' : '🔄 Retrain Model'}
                  </button>
              </div>
          </div>
      </div>

      {isRetraining && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <div className="text-4xl mb-4 animate-spin">⚙️</div>
              <div className="text-white font-black uppercase tracking-widest text-sm">Ingesting New Data...</div>
          </div>
      )}
    </div>
  );
};

export default LifecycleVisual;