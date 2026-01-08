import React, { useState, useEffect } from 'react';

const RAGVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => (s + 1) % 5);

  useEffect(() => {
    if (!isAnimating) {
        setStep(0);
        return;
    }
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 5);
    }, 1500);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const steps = [
    { label: "User asks Question", icon: "👤" },
    { label: "Convert to Vector", icon: "🔢" },
    { label: "Retrieve Context", icon: "📚" },
    { label: "Augment Prompt", icon: "➕" },
    { label: "LLM Generates Answer", icon: "🤖" }
  ];

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-8 shadow-2xl">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8 relative z-10">
            {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-1/5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500 border-2 ${step >= i ? 'bg-orange-500 border-orange-400 text-white scale-110' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                        {step > i ? '✓' : i + 1}
                    </div>
                    <span className={`text-[8px] font-black uppercase text-center transition-colors duration-500 ${step === i ? 'text-orange-400' : 'text-slate-600'}`}>{s.label}</span>
                </div>
            ))}
            {/* Connecting Line */}
            <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-800 -z-10" />
            <div 
                className="absolute top-4 left-0 h-0.5 bg-orange-500 -z-10 transition-all duration-500 ease-out" 
                style={{ width: `${step * 25}%` }} 
            />
        </div>

        {/* Dynamic Visualization Area */}
        <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center relative overflow-hidden">
            {/* Step 0: User */}
            <div className={`absolute transition-all duration-500 ${step === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="bg-white text-slate-900 px-6 py-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl font-bold shadow-lg">
                    "What is our refund policy?"
                </div>
            </div>

            {/* Step 1: Vector */}
            <div className={`absolute transition-all duration-500 flex flex-col items-center ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="font-mono text-emerald-400 text-xs bg-slate-900 p-2 rounded border border-emerald-500/30">
                    [0.12, -0.45, 0.88, ...]
                </div>
                <div className="text-[10px] text-slate-400 mt-2 font-black uppercase">Embedding</div>
            </div>

            {/* Step 2: Database */}
            <div className={`absolute transition-all duration-500 ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-16 h-20 bg-slate-700 rounded border border-slate-600" />
                    <div className="w-16 h-20 bg-orange-500/20 border-2 border-orange-500 rounded flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                        📄
                    </div>
                    <div className="w-16 h-20 bg-slate-700 rounded border border-slate-600" />
                    <div className="w-16 h-20 bg-slate-700 rounded border border-slate-600" />
                </div>
            </div>

            {/* Step 3: Augment */}
            <div className={`absolute transition-all duration-500 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="bg-slate-900 border border-slate-600 p-4 rounded-xl w-64 text-[10px] text-slate-300 font-mono relative">
                    <span className="text-slate-500">System: Answer using this context.</span><br/>
                    <span className="text-orange-400">Context: Refunds are processed within 14 days via...</span><br/>
                    <span className="text-white">User: What is our refund policy?</span>
                </div>
            </div>

            {/* Step 4: Answer */}
            <div className={`absolute transition-all duration-500 ${step === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="flex gap-4 items-end">
                    <div className="text-4xl">🤖</div>
                    <div className="bg-indigo-600 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl font-medium shadow-xl">
                        Based on your policy, refunds take 14 days.
                    </div>
                </div>
            </div>
        </div>

        {!isAnimating && (
            <button 
                onClick={nextStep}
                className="absolute bottom-6 right-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-colors z-20"
            >
                Step &gt;
            </button>
        )}
    </div>
  );
};

export default RAGVisual;