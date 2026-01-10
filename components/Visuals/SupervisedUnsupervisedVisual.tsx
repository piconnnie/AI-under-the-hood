
import React, { useState } from 'react';

type Mode = 'supervised' | 'unsupervised';

const SupervisedUnsupervisedVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [mode, setMode] = useState<Mode>('supervised');
  const [step, setStep] = useState(0); 

  // Cluster Data
  // Cluster A (Top Left)
  const clusterA = [
    { id: 1, x: 80, y: 60 }, { id: 2, x: 120, y: 80 }, { id: 3, x: 60, y: 100 }, { id: 4, x: 100, y: 120 }, { id: 5, x: 140, y: 50 }
  ];
  // Cluster B (Bottom Right)
  const clusterB = [
    { id: 6, x: 280, y: 160 }, { id: 7, x: 320, y: 140 }, { id: 8, x: 260, y: 180 }, { id: 9, x: 340, y: 170 }, { id: 10, x: 300, y: 200 }
  ];

  // Test point for Supervised
  const testPoint = { x: 90, y: 90 };

  const handleReset = (newMode: Mode) => {
    setMode(newMode);
    setStep(0);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  return (
    <div className="relative w-full min-h-[34rem] bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col p-6 shadow-inner transition-all font-sans">
      
      {/* Header / Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 z-10">
          <div className="bg-slate-100 p-1.5 rounded-xl flex w-full sm:w-auto shadow-sm">
              <button 
                onClick={() => handleReset('supervised')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${mode === 'supervised' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Supervised
              </button>
              <button 
                onClick={() => handleReset('unsupervised')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${mode === 'unsupervised' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Unsupervised
              </button>
          </div>
          <div className="text-center sm:text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {mode === 'supervised' ? "The Teacher" : "The Explorer"}
              </div>
              <div className="text-xs font-bold text-slate-700">
                  {mode === 'supervised' ? "Input: Data + Answers" : "Input: Raw Data Only"}
              </div>
          </div>
      </div>

      {/* Main Visual Stage */}
      <div className="flex-1 relative bg-slate-50 rounded-3xl border-2 border-slate-100 overflow-hidden min-h-[220px] shadow-inner">
          <svg viewBox="0 0 400 240" className="w-full h-full preserve-3d">
              
              {/* Background Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <rect x="0" y="0" width="400" height="240" fill="url(#grid)" opacity="0.4" />

              {/* === SUPERVISED CONTENT === */}
              {mode === 'supervised' && (
                  <>
                    {/* Data Points - Always colored/shaped because labeled */}
                    {clusterA.map(p => (
                        <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                            <rect x="-6" y="-6" width="12" height="12" fill="#6366f1" className="shadow-sm" />
                            {step === 0 && <text y="-12" textAnchor="middle" fontSize="8" fill="#6366f1" fontWeight="bold">Cat</text>}
                        </g>
                    ))}
                    {clusterB.map(p => (
                        <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                            <circle r="6" fill="#f43f5e" className="shadow-sm" />
                            {step === 0 && <text y="-12" textAnchor="middle" fontSize="8" fill="#f43f5e" fontWeight="bold">Dog</text>}
                        </g>
                    ))}

                    {/* Step 1: Decision Boundary */}
                    {step >= 1 && (
                        <path 
                            d="M 400 0 L 0 240" 
                            stroke="#cbd5e1" strokeWidth="4" strokeDasharray="8" 
                            className="animate-[draw_0.8s_ease-out]"
                        />
                    )}

                    {/* Step 2: New Test Point */}
                    {step >= 2 && (
                        <g transform={`translate(${testPoint.x}, ${testPoint.y})`} className="animate-[pop_0.5s_ease-out]">
                            <rect x="-8" y="-8" width="16" height="16" fill={step >= 3 ? "#6366f1" : "#94a3b8"} stroke="white" strokeWidth="2" />
                            <text y="-15" textAnchor="middle" fontSize="10" fontWeight="bold" fill={step >= 3 ? "#6366f1" : "#94a3b8"}>
                                {step >= 3 ? "It's a Cat!" : "?"}
                            </text>
                        </g>
                    )}
                  </>
              )}

              {/* === UNSUPERVISED CONTENT === */}
              {mode === 'unsupervised' && (
                  <>
                    {/* Data Points - Start Generic, become Colored */}
                    {[...clusterA, ...clusterB].map((p, i) => {
                        // In step 0 & 1: Gray. In step 2: Colored by cluster.
                        const isClusterA = i < 5;
                        const color = step >= 2 ? (isClusterA ? '#10b981' : '#f59e0b') : '#94a3b8';
                        const scale = step === 2 ? 'scale-110' : 'scale-100';
                        
                        return (
                            <circle 
                                key={p.id} 
                                cx={p.x} cy={p.y} 
                                r="6" 
                                fill={color} 
                                className={`transition-all duration-1000 ${scale}`}
                            />
                        );
                    })}

                    {/* Step 1: Scanning/Connection Lines */}
                    {step === 1 && (
                        <g>
                            <circle cx="100" cy="80" r="60" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4" className="animate-[spin_4s_linear_infinite] opacity-50" />
                            <circle cx="300" cy="170" r="60" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" className="animate-[spin_4s_linear_infinite] opacity-50" />
                        </g>
                    )}

                    {/* Step 2: Clusters Identified */}
                    {step >= 2 && (
                        <>
                            <ellipse cx="100" cy="80" rx="70" ry="50" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeDasharray="4" />
                            <text x="100" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10b981" className="uppercase">Cluster 1</text>
                            
                            <ellipse cx="300" cy="170" rx="70" ry="50" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeDasharray="4" />
                            <text x="300" y="235" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f59e0b" className="uppercase">Cluster 2</text>
                        </>
                    )}
                  </>
              )}
          </svg>

          {/* Legend / Status Overlay */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-[8px] font-black uppercase text-slate-400 mb-1">Legend</div>
              <div className="flex flex-col gap-1.5">
                  {mode === 'supervised' ? (
                      <>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-sm"></div><span className="text-[9px] font-bold text-slate-600">Cat (Label A)</span></div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full"></div><span className="text-[9px] font-bold text-slate-600">Dog (Label B)</span></div>
                      </>
                  ) : (
                      step < 2 ? (
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div><span className="text-[9px] font-bold text-slate-600">Unknown Data</span></div>
                      ) : (
                        <>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div><span className="text-[9px] font-bold text-slate-600">Group 1</span></div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div><span className="text-[9px] font-bold text-slate-600">Group 2</span></div>
                        </>
                      )
                  )}
              </div>
          </div>
      </div>

      {/* Progress Bar & Controls */}
      <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 w-full max-w-md">
              {[0, 1, 2, 3].map((s) => (
                  <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${s <= step ? (mode === 'supervised' ? 'bg-indigo-500' : 'bg-emerald-500') : 'bg-slate-200'}`} />
              ))}
          </div>

          <div className="h-10 mb-4">
            <p className="text-sm font-bold text-slate-700 text-center animate-enter" key={step}>
                {mode === 'supervised' ? (
                    step === 0 ? "1. We start with Labeled Data (we know what is what)." :
                    step === 1 ? "2. The model learns a line to separate the classes." :
                    step === 2 ? "3. A new unknown point appears..." :
                    "4. Based on the line, the model predicts 'Cat'!"
                ) : (
                    step === 0 ? "1. We start with Raw Data (no labels, just points)." :
                    step === 1 ? "2. The algorithm looks for proximity and patterns." :
                    step === 2 ? "3. It identifies distinct clusters automatically." :
                    "4. Structure found without human labels."
                )}
            </p>
          </div>

          <button 
            onClick={step >= 3 ? () => setStep(0) : nextStep}
            className={`px-8 py-3 rounded-xl font-bold text-white text-xs uppercase tracking-widest shadow-lg transition-all transform active:scale-95 flex items-center gap-2 ${
                mode === 'supervised' 
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
            }`}
          >
              {step >= 3 ? "Replay" : "Next Step"} <i className="fa-solid fa-arrow-right"></i>
          </button>
      </div>
    </div>
  );
};

export default SupervisedUnsupervisedVisual;
