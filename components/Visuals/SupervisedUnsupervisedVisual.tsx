
import React, { useState } from 'react';

const SupervisedUnsupervisedVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [mode, setMode] = useState<'supervised' | 'unsupervised'>('supervised');
  const [step, setStep] = useState(0); // 0: Raw, 1: Process, 2: Result

  // Data points: mix of squares (class A) and circles (class B)
  // Positions are roughly separable
  const points = [
    { id: 1, x: 80, y: 60, type: 'square' },
    { id: 2, x: 110, y: 80, type: 'square' },
    { id: 3, x: 60, y: 100, type: 'square' },
    { id: 4, x: 90, y: 120, type: 'square' },
    
    { id: 5, x: 280, y: 140, type: 'circle' },
    { id: 6, x: 310, y: 120, type: 'circle' },
    { id: 7, x: 260, y: 160, type: 'circle' },
    { id: 8, x: 330, y: 150, type: 'circle' },
    
    // Some noise/middle points
    { id: 9, x: 180, y: 180, type: 'square' },
    { id: 10, x: 200, y: 50, type: 'circle' },
  ];

  const handleProcess = () => {
    setStep(1);
    setTimeout(() => {
        setStep(2);
    }, 1500);
  };

  const reset = (newMode: 'supervised' | 'unsupervised') => {
      setMode(newMode);
      setStep(0);
  };

  return (
    <div className="relative w-full h-[28rem] bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col p-6 shadow-inner">
      
      {/* Header / Toggle */}
      <div className="flex justify-between items-start mb-6 z-10">
          <div className="bg-slate-100 p-1 rounded-xl flex">
              <button 
                onClick={() => reset('supervised')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${mode === 'supervised' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Supervised
              </button>
              <button 
                onClick={() => reset('unsupervised')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${mode === 'unsupervised' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Unsupervised
              </button>
          </div>
          <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Goal</div>
              <div className="text-xs font-bold text-slate-700">
                  {mode === 'supervised' ? "Predict Labels (Cat vs Dog)" : "Find Patterns (Grouping)"}
              </div>
          </div>
      </div>

      {/* Main Visual Area */}
      <div className="flex-1 relative bg-slate-50 rounded-2xl border-2 border-slate-100 overflow-hidden">
          <svg viewBox="0 0 400 220" className="w-full h-full">
              {/* Decision Boundary (Supervised Only) */}
              {mode === 'supervised' && step >= 2 && (
                  <path 
                    d="M 120 220 L 250 0" 
                    stroke="#cbd5e1" 
                    strokeWidth="4" 
                    strokeDasharray="8" 
                    className="animate-[draw_0.5s_ease-out]"
                  />
              )}

              {/* Clustering Circles (Unsupervised Only) */}
              {mode === 'unsupervised' && step >= 2 && (
                  <>
                    <circle cx="100" cy="100" r="80" fill="#6366f1" opacity="0.1" className="animate-[pulse_2s_infinite]" />
                    <circle cx="280" cy="120" r="80" fill="#10b981" opacity="0.1" className="animate-[pulse_2s_infinite]" />
                  </>
              )}

              {/* Data Points */}
              {points.map((p, i) => {
                  // Style logic
                  let fill = '#94a3b8'; // Default Gray
                  let shape = 'circle';

                  if (mode === 'supervised') {
                      // In supervised, we KNOW the labels (shapes/colors) usually
                      // But let's show them gray first, then colored after labeling?
                      // Actually, Supervised training data IS labeled. So show labels.
                      // But show the "Learning" process as fitting the line.
                      fill = p.type === 'square' ? '#6366f1' : '#f43f5e';
                      shape = p.type;
                  } else {
                      // Unsupervised: All look same initially (Gray Circles)
                      // After clustering, they get assigned colors based on group
                      if (step >= 2) {
                          // Simple clustering logic based on x position
                          fill = p.x < 180 ? '#6366f1' : '#10b981';
                      }
                  }

                  const isAnimatingPoint = step === 1;

                  return (
                      <g 
                        key={i} 
                        transform={`translate(${p.x}, ${p.y})`}
                        className={`transition-all duration-700 ease-in-out ${isAnimatingPoint ? 'scale-110' : 'scale-100'}`}
                      >
                          {shape === 'square' && mode === 'supervised' ? (
                              <rect x="-6" y="-6" width="12" height="12" fill={fill} className="shadow-sm" />
                          ) : (
                              <circle r="6" fill={fill} className="shadow-sm" />
                          )}
                          
                          {/* Label Tag (Supervised) */}
                          {mode === 'supervised' && (
                              <text y="-10" textAnchor="middle" className="text-[8px] font-bold fill-slate-400 opacity-0 animate-[fadeIn_0.5s_delay-100ms_forwards]">
                                  {p.type === 'square' ? 'A' : 'B'}
                              </text>
                          )}
                      </g>
                  );
              })}
          </svg>

          {/* Overlay Text for Steps */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {step === 1 && (
                  <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border border-slate-200 animate-bounce">
                      <span className="text-xs font-black uppercase text-indigo-600">
                          {mode === 'supervised' ? "Training..." : "Clustering..."}
                      </span>
                  </div>
              )}
          </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center">
          <button 
            onClick={handleProcess}
            disabled={step !== 0}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                step === 0 
                ? (mode === 'supervised' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-emerald-600 text-white hover:bg-emerald-700')
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
              {step === 0 ? "Run Algorithm" : step === 1 ? "Processing..." : "Done"}
          </button>
      </div>

      <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
              {mode === 'supervised' 
                ? "In Supervised Learning, you provide the answers (Labels A/B) so the model can learn the boundary." 
                : "In Unsupervised Learning, you provide NO answers. The model must discover the groups itself."}
          </p>
      </div>
    </div>
  );
};

export default SupervisedUnsupervisedVisual;
