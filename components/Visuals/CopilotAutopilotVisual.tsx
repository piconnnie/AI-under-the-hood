
import React, { useState, useEffect } from 'react';

const CopilotAutopilotVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [mode, setMode] = useState<'copilot' | 'autopilot' | 'agent'>('copilot');
  const [progress, setProgress] = useState(0);

  // Reset progress when mode changes
  useEffect(() => {
    setProgress(0);
  }, [mode]);

  // Auto-animate loop
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0; // Loop
        return p + 0.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Manual Control for non-animating state
  useEffect(() => {
    if (!isAnimating && progress < 100) {
        // Just jump to end or start for static view? 
        // Let's set it to a "completed" state for static viewing or user interactive
        setProgress(100); 
    }
  }, [isAnimating]);

  const MODES = {
    copilot: {
      title: "Level 1: Copilot",
      desc: "Human in the loop. You drive, AI assists.",
      role: "Assistant"
    },
    autopilot: {
      title: "Level 2: Autopilot",
      desc: "Human on the loop. You review, AI drives.",
      role: "Delegated"
    },
    agent: {
      title: "Level 3: Agent",
      desc: "Human out of the loop. You set goals, AI executes.",
      role: "Autonomous"
    }
  };

  const renderCopilot = () => {
     const fullText = "Hi Team, wanted to share the Q3 metrics.";
     const typedLength = Math.floor((Math.min(progress, 60) / 60) * fullText.length);
     const currentText = fullText.slice(0, typedLength);
     const suggestion = fullText.slice(typedLength);
     
     return (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase">Email Client</span>
            </div>
            <div className="p-6 h-40 font-mono text-sm text-slate-800 relative">
                <span className="text-slate-400 block mb-4">To: Boss<br/>Subject: Update</span>
                {currentText}
                <span className="text-slate-300">{suggestion}</span>
                <span className="animate-pulse border-r-2 border-indigo-500 ml-0.5 h-4 inline-block align-middle"></span>
                
                {progress > 10 && progress < 90 && (
                    <div className="absolute bottom-4 right-4 bg-indigo-50 border border-indigo-200 text-indigo-600 px-2 py-1 rounded text-[10px] font-bold shadow-sm animate-bounce">
                        TAB to autocomplete
                    </div>
                )}
            </div>
            <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-between items-center">
                 <div className="text-[10px] font-bold text-slate-400">AI suggests text</div>
                 <div className="text-[10px] font-bold text-indigo-600">User presses Tab</div>
            </div>
        </div>
     );
  };

  const renderAutopilot = () => {
      const isGenerating = progress < 40;
      const isReviewing = progress >= 40 && progress < 80;
      const isApproved = progress >= 80;

      return (
          <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col relative">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="text-xs font-bold text-slate-700">Task: "Draft Monthly Report"</span>
                  <div className={`w-2 h-2 rounded-full ${isApproved ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
              </div>
              
              <div className="p-6 h-40 flex flex-col items-center justify-center relative">
                  {isGenerating ? (
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                          <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest">Generating Draft...</span>
                      </div>
                  ) : (
                      <div className={`w-full h-full bg-slate-50 border-2 border-dashed rounded-lg p-3 transition-all duration-500 ${isApproved ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300'}`}>
                          <div className="h-2 w-1/3 bg-slate-200 rounded mb-2"></div>
                          <div className="h-2 w-3/4 bg-slate-200 rounded mb-2"></div>
                          <div className="h-2 w-1/2 bg-slate-200 rounded mb-2"></div>
                          <div className="h-2 w-full bg-slate-200 rounded mb-2"></div>
                          
                          {isApproved && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                                  <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform scale-110">
                                      ✓ Approved
                                  </div>
                              </div>
                          )}
                      </div>
                  )}
              </div>

              <div className="p-3 border-t border-slate-100 flex justify-end gap-2 bg-slate-50 h-14 items-center">
                  {isReviewing && (
                      <>
                        <button className="px-3 py-1 bg-white border border-slate-300 text-slate-500 rounded text-xs font-bold hover:bg-slate-50">Edit</button>
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold shadow-md hover:bg-indigo-700">Approve & Send</button>
                      </>
                  )}
                  {isGenerating && <span className="text-[10px] text-slate-400 italic">AI working...</span>}
                  {isApproved && <span className="text-[10px] text-emerald-600 font-bold">Sent successfully</span>}
              </div>
          </div>
      );
  };

  const renderAgent = () => {
      const steps = [
          { text: "Analyzing Server Usage", time: 20 },
          { text: "Identifying Idle Instances", time: 50 },
          { text: "Terminating 4 Clusters", time: 80 },
      ];

      return (
          <div className="w-full max-w-sm bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                  <div className="flex items-center gap-2">
                      <span className="text-xl">🤖</span>
                      <span className="text-xs font-bold text-slate-300">InfraGuard Agent</span>
                  </div>
                  <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-black uppercase border border-emerald-500/50">
                      Active
                  </div>
              </div>
              
              <div className="p-6 h-40 font-mono text-xs space-y-4 relative">
                  <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2">
                      &gt; Goal: Optimize cloud spend
                  </div>
                  
                  {steps.map((s, i) => {
                      const isActive = progress >= s.time && (i === steps.length - 1 || progress < steps[i+1].time);
                      const isDone = progress >= s.time + 15; // linger a bit
                      
                      return (
                          <div key={i} className={`flex items-center gap-3 transition-opacity duration-500 ${progress >= s.time ? 'opacity-100' : 'opacity-20'}`}>
                              <span className={isDone ? "text-emerald-500" : isActive ? "text-indigo-400" : "text-slate-700"}>
                                  {isDone ? '✓' : isActive ? '▶' : '○'}
                              </span>
                              <span className={isActive ? "text-white font-bold" : "text-slate-400"}>
                                  {s.text}
                              </span>
                          </div>
                      );
                  })}

                  {progress > 95 && (
                      <div className="absolute bottom-4 left-6 right-6 bg-emerald-900/50 border border-emerald-700/50 text-emerald-200 p-2 rounded text-center animate-enter">
                          Saved $450/mo
                      </div>
                  )}
              </div>
          </div>
      );
  };

  return (
    <div className="relative w-full min-h-[30rem] bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 flex flex-col shadow-inner">
      {/* Tab Switcher */}
      <div className="flex p-2 bg-white m-6 mb-2 rounded-2xl shadow-sm border border-slate-200">
          {(Object.keys(MODES) as Array<keyof typeof MODES>).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
              >
                {MODES[m].role}
              </button>
          ))}
      </div>

      <div className="text-center mb-6 px-6">
          <h3 className="text-xl font-black text-slate-800 mb-1">{MODES[mode].title}</h3>
          <p className="text-sm font-medium text-slate-500">{MODES[mode].desc}</p>
      </div>

      <div className="flex-1 flex items-center justify-center bg-slate-100/50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="z-10 w-full flex justify-center px-4 pb-8 animate-enter" key={mode}>
              {mode === 'copilot' && renderCopilot()}
              {mode === 'autopilot' && renderAutopilot()}
              {mode === 'agent' && renderAgent()}
          </div>
      </div>
    </div>
  );
};

export default CopilotAutopilotVisual;
