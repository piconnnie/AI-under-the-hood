
import React, { useState } from 'react';

const TokenizationVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [text, setText] = useState("Generative AI is amazing");
  const [view, setView] = useState<'tokens' | 'ids'>('tokens');

  // Fake tokenizer for demo purposes
  const tokenize = (input: string) => {
    // Split by space, but also split off punctuation basically
    return input.trim().split(/(\s+)/).filter(t => t.trim().length > 0).flatMap(word => {
        if (word.length > 8) {
            // Visualize splitting long words (sub-word tokenization)
            const mid = Math.ceil(word.length / 2);
            return [word.slice(0, mid) + "-", "-" + word.slice(mid)];
        }
        return word;
    });
  };

  const tokens = tokenize(text);
  
  // Deterministic fake IDs based on string hash
  const getId = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 50000);
  };

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Input Text
            </div>
            <div className="flex bg-slate-800 rounded-lg p-1">
                <button onClick={() => setView('tokens')} className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${view === 'tokens' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Tokens</button>
                <button onClick={() => setView('ids')} className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${view === 'ids' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>IDs</button>
            </div>
        </div>

        <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white font-medium focus:ring-2 focus:ring-indigo-500 outline-none mb-8 placeholder-slate-600"
            placeholder="Type something..."
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex gap-2 flex-wrap justify-center items-start content-start">
                {tokens.map((t, i) => (
                    <div 
                        key={i} 
                        className={`px-3 py-2 rounded-lg font-bold text-sm shadow-lg transform transition-all duration-300 hover:scale-110 cursor-default ${
                            view === 'tokens' 
                            ? (i % 2 === 0 ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/50" : "bg-purple-500/20 text-purple-200 border border-purple-500/50")
                            : "bg-slate-800 text-slate-400 border border-slate-700 font-mono"
                        }`}
                    >
                        {view === 'tokens' ? t : getId(t)}
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-4 text-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                {tokens.length} Tokens ≈ {Math.round(tokens.length * 0.75)} Words
            </span>
        </div>
    </div>
  );
};

export default TokenizationVisual;
    