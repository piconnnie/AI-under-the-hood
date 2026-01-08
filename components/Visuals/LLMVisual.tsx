import React, { useState, useEffect } from 'react';

const LLMVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [history, setHistory] = useState<string[]>(["The", "future", "of", "AI", "is"]);
  const [options, setOptions] = useState([
    { word: "exciting", prob: 65, color: "bg-emerald-500" },
    { word: "dangerous", prob: 25, color: "bg-rose-500" },
    { word: "unknown", prob: 10, color: "bg-slate-500" },
  ]);

  const handleSelect = (word: string) => {
    setHistory(prev => [...prev, word]);
    
    // Logic to reset or generate new options
    if (word === "." || history.length > 8) {
        setTimeout(() => {
            setHistory(["The", "future", "of", "AI", "is"]);
            setOptions([
                { word: "bright", prob: 60, color: "bg-emerald-500" },
                { word: "scary", prob: 30, color: "bg-rose-500" },
                { word: "here", prob: 10, color: "bg-slate-500" },
            ]);
        }, 800);
    } else {
        // Mock next options based on randomness to feel dynamic
        const r = Math.random();
        const nextOptions = r > 0.5 ? [
            { word: "and", prob: 45, color: "bg-indigo-500" },
            { word: ".", prob: 35, color: "bg-slate-500" },
            { word: "quickly", prob: 20, color: "bg-indigo-400" },
        ] : [
            { word: "transformative", prob: 50, color: "bg-emerald-500" },
            { word: "complex", prob: 30, color: "bg-amber-500" },
            { word: "uncertain", prob: 20, color: "bg-slate-500" },
        ];
        setOptions(nextOptions);
    }
  };

  useEffect(() => {
      if (!isAnimating) return;
      const interval = setInterval(() => {
          // Auto-select the highest probability word
          // Or weighted random for more "generative" feel
          const best = options.reduce((prev, current) => (prev.prob > current.prob) ? prev : current);
          handleSelect(best.word);
      }, 1500);
      return () => clearInterval(interval);
  }, [isAnimating, options, history]);

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-8 shadow-2xl">
      <div className="mb-6 flex-1">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Context Window</span>
        <div className="text-xl font-medium text-white leading-relaxed">
            {history.map((w, i) => (
                <span key={i} className="inline-block mr-1.5 animate-[fadeIn_0.3s_ease-out]">{w}</span>
            ))}
            <span className="inline-block w-2 h-5 bg-indigo-500 animate-pulse align-middle ml-1"></span>
        </div>
      </div>

      <div className="flex flex-col justify-end gap-3 z-10">
        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
            <span>Predict Next Token {isAnimating && "(Auto-Generating...)"}</span>
            <span>Probability</span>
        </div>
        
        {options.map((p, i) => (
            <button 
                key={i} 
                onClick={() => handleSelect(p.word)}
                className="relative h-10 w-full bg-slate-800 rounded-xl overflow-hidden flex items-center px-4 group hover:ring-2 ring-indigo-500 transition-all text-left"
            >
                {/* Probability Bar */}
                <div 
                    className={`absolute left-0 top-0 bottom-0 ${p.color} opacity-20 group-hover:opacity-40 transition-all duration-500`}
                    style={{ width: `${p.prob}%` }}
                />
                
                <div className="relative z-10 flex justify-between w-full items-center">
                    <span className="font-mono font-bold text-slate-200 group-hover:text-white text-sm">"{p.word}"</span>
                    <span className="font-mono font-bold text-slate-500 group-hover:text-slate-300 text-xs">{p.prob}%</span>
                </div>
            </button>
        ))}
      </div>
    </div>
  );
};

export default LLMVisual;