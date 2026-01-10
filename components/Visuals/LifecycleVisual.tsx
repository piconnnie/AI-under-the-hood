
import React, { useState, useEffect } from 'react';

type StageId = 1 | 2 | 3 | 4 | 5 | 6;

interface StageConfig {
  id: StageId;
  title: string;
  icon: string;
  color: string;
  desc: string;
}

const STAGES: StageConfig[] = [
  { id: 1, title: "Ideation", icon: "💡", color: "#f59e0b", desc: "Map AI capabilities to pain points" },
  { id: 2, title: "Opportunity", icon: "🎯", color: "#f43f5e", desc: "Assess market fit & value" },
  { id: 3, title: "Prototype", icon: "🛠️", color: "#8b5cf6", desc: "Scope & train models (The AI Loop)" },
  { id: 4, title: "Testing", icon: "🧪", color: "#3b82f6", desc: "Validate hypotheses & quality" },
  { id: 5, title: "Roll-out", icon: "🚀", color: "#10b981", desc: "Productionize & user access" },
  { id: 6, title: "Analysis", icon: "📊", color: "#6366f1", desc: "Gather feedback & iterate" },
];

const SCENARIOS = [
  {
    stageId: 1,
    question: "You're building an AI Travel Planner. What's the core problem?",
    options: [
      { text: "Booking flights is boring", feedback: "High risk. Users don't trust AI with money yet.", score: 5 },
      { text: "Planning an itinerary is overwhelming", feedback: "Great fit! AI excels at synthesis & suggestions.", score: 20 }
    ]
  },
  {
    stageId: 2,
    question: "How do we validate this opportunity?",
    options: [
      { text: "Build the full app immediately", feedback: "Too expensive. Verify demand first.", score: 0 },
      { text: "Wizard of Oz test (Fake it manually)", feedback: "Smart. Validate value before building models.", score: 20 }
    ]
  },
  {
    stageId: 3,
    question: "Prototype Phase: How do we handle the 'AI Lifecycle'?",
    options: [
      { text: "Train a custom LLM from scratch", feedback: "Overkill. Huge cost & time. Start smaller.", score: 5 },
      { text: "RAG (Retrieval Augmented Generation)", feedback: "Excellent. Uses your data + existing models.", score: 20 }
    ]
  },
  {
    stageId: 4,
    question: "Testing reveals the AI suggests closed restaurants. Fix?",
    options: [
      { text: "Prompt Engineering ('Don't lie')", feedback: "Unreliable. Models can't know real-time facts.", score: 5 },
      { text: "Add a Google Maps Tool", feedback: "Correct. Ground the AI in real-time data.", score: 20 }
    ]
  },
  {
    stageId: 5,
    question: "Roll-out Strategy?",
    options: [
      { text: "Global Launch", feedback: "Risky. AI edge cases might tank your brand.", score: 0 },
      { text: "Waitlist / Beta", feedback: "Safe. Allows catching hallucinations early.", score: 20 }
    ]
  },
  {
    stageId: 6,
    question: "Feedback: Users want to book hotels too. What now?",
    options: [
      { text: "Mark project as Done", feedback: "Wrong. AI products need constant evolution.", score: 0 },
      { text: "Restart Cycle (Ideation)", feedback: "Correct! The loop begins again.", score: 20 }
    ]
  }
];

const LifecycleVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [pmfScore, setPmfScore] = useState(50);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  // Reset on animation toggle
  useEffect(() => {
    if (!isAnimating) {
        setActiveStage(1);
        setPmfScore(50);
        setCompletedStages([]);
        setShowFeedback(null);
    }
  }, [isAnimating]);

  const handleOption = (score: number, feedback: string) => {
    setShowFeedback(feedback);
    setPmfScore(prev => Math.min(100, Math.max(0, prev + score)));
    
    setTimeout(() => {
        setShowFeedback(null);
        setCompletedStages(prev => [...prev, activeStage]);
        
        if (activeStage < 6) {
            setActiveStage(prev => prev + 1);
        } else {
            // Loop back
            setTimeout(() => {
                setActiveStage(1);
                setCompletedStages([]);
            }, 1000);
        }
    }, 2000);
  };

  const currentScenario = SCENARIOS.find(s => s.stageId === activeStage);
  const currentStageConfig = STAGES.find(s => s.id === activeStage)!;

  // Calculate rotation to put active stage at top (approx)
  // 6 stages = 60 degrees each.
  // We want active stage at 0deg (top). 
  // Stage 1 (top rightish) -> Rotate -60?
  const rotation = (activeStage - 1) * -60;

  return (
    <div className="relative w-full min-h-[36rem] bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col shadow-2xl font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-slate-800/50 border-b border-slate-800 z-10">
          <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Product Simulator</div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {currentStageConfig.title} Phase
                  <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded text-white font-mono">Stage {activeStage}/6</span>
              </h3>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PMF Score</div>
             <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                 <div 
                    className={`h-full transition-all duration-500 ${pmfScore > 80 ? 'bg-emerald-500' : pmfScore > 40 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                    style={{ width: `${pmfScore}%` }}
                 />
             </div>
          </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
          
          {/* LEFT: The Lifecycle Wheel */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[300px] overflow-hidden">
              <div 
                className="relative w-64 h-64 transition-transform duration-700 ease-in-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                  {/* Connecting Ring */}
                  <div className="absolute inset-0 rounded-full border-[20px] border-slate-800" />
                  
                  {/* Stages */}
                  {STAGES.map((stage, i) => {
                      const angle = i * 60; // 6 segments
                      const isActive = activeStage === stage.id;
                      const isCompleted = completedStages.includes(stage.id);

                      // Calculate position on circle
                      const rad = (angle - 90) * (Math.PI / 180);
                      const x = 128 + 100 * Math.cos(rad);
                      const y = 128 + 100 * Math.sin(rad);

                      return (
                          <div 
                             key={stage.id}
                             className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center border-4 shadow-xl transition-all duration-500 z-10 ${
                                isActive ? `${stage.color} bg-white scale-125 border-current` : 
                                isCompleted ? 'bg-slate-700 border-emerald-500 text-emerald-500' : 
                                'bg-slate-800 border-slate-700 text-slate-600'
                             }`}
                             style={{ left: x, top: y, transform: `rotate(${-rotation}deg)` }} // Counter-rotate icon
                          >
                             <span className="text-xl">{isCompleted ? '✓' : stage.icon}</span>
                          </div>
                      );
                  })}

                  {/* Inner AI Loop (Visible only in Stage 3) */}
                  <div className={`absolute inset-0 m-auto w-32 h-32 rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center transition-all duration-500 ${activeStage === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                      <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                      <div className="text-center">
                          <div className="text-2xl animate-pulse">🤖</div>
                          <div className="text-[8px] font-black uppercase text-indigo-400 mt-1">Data → Train</div>
                      </div>
                  </div>
                  
                  {/* Start/End Label in Center when not Stage 3 */}
                  {activeStage !== 3 && (
                      <div className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none">
                           <div className="text-center transition-all duration-700" style={{ transform: `rotate(${-rotation}deg)` }}>
                               <div className="text-3xl mb-1">{currentStageConfig.icon}</div>
                               <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{currentStageConfig.title}</div>
                           </div>
                      </div>
                  )}

              </div>
              
              {/* Decorative Arrow for Flow */}
              <div className="absolute top-4 right-4 text-slate-700 text-4xl opacity-20 rotate-45 pointer-events-none">
                  <i className="fa-solid fa-arrow-rotate-right"></i>
              </div>
          </div>

          {/* RIGHT: Interaction Card */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-slate-50/5 relative overflow-hidden">
              {showFeedback ? (
                  <div className="animate-enter bg-white p-6 rounded-2xl shadow-xl text-center border-b-4 border-indigo-500">
                      <div className="text-4xl mb-4">
                           {showFeedback.includes("Correct") || showFeedback.includes("Great") || showFeedback.includes("Smart") ? "🎉" : "⚠️"}
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-2">Outcome</h4>
                      <p className="text-slate-600 font-medium">{showFeedback}</p>
                      <div className="mt-4 text-xs font-bold text-indigo-500 uppercase tracking-widest animate-pulse">
                          Advancing to next stage...
                      </div>
                  </div>
              ) : (
                  <div className="animate-enter max-w-sm mx-auto w-full">
                      <div className="mb-6">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest mb-4">
                              Decision Node
                          </span>
                          <h4 className="text-xl font-bold text-white leading-snug">
                              {currentScenario?.question}
                          </h4>
                      </div>

                      <div className="space-y-3">
                          {currentScenario?.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handleOption(opt.score, opt.feedback)}
                                className="w-full p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-left transition-all duration-300 group relative overflow-hidden"
                              >
                                  <div className="relative z-10 flex justify-between items-center">
                                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">{opt.text}</span>
                                      <span className="opacity-0 group-hover:opacity-100 text-white transition-opacity">→</span>
                                  </div>
                              </button>
                          ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-800">
                          <div className="text-[10px] text-slate-500 font-medium flex gap-2 items-center">
                             <span className="text-lg">{currentStageConfig.icon}</span>
                             <span>{currentStageConfig.desc}</span>
                          </div>
                      </div>
                  </div>
              )}
          </div>

      </div>
    </div>
  );
};

export default LifecycleVisual;
