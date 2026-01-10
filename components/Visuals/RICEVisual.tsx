
import React, { useState } from 'react';

const RICEVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [reach, setReach] = useState(500);
  const [impact, setImpact] = useState(2); // 3 = High, 2 = Medium, 1 = Low, 0.5 = Minimal
  const [confidence, setConfidence] = useState(80);
  const [effort, setEffort] = useState(4); // Person-months

  const score = (reach * impact * (confidence / 100)) / effort;

  const getImpactLabel = (val: number) => {
    if (val >= 3) return "Massive (3x)";
    if (val >= 2) return "High (2x)";
    if (val >= 1) return "Medium (1x)";
    return "Low (0.5x)";
  };

  const getVerdict = () => {
    if (confidence < 50) return { text: "Too Risky (Low Confidence)", color: "text-rose-500" };
    if (score > 500) return { text: "Must Do! 🚀", color: "text-emerald-500" };
    if (score > 200) return { text: "Good Bet 👍", color: "text-indigo-500" };
    if (score > 50) return { text: "Maybe Later 🗓️", color: "text-amber-500" };
    return { text: "Don't Do It 🚫", color: "text-slate-400" };
  };

  const verdict = getVerdict();

  return (
    <div className="relative w-full min-h-[32rem] bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 flex flex-col p-6 shadow-inner font-sans">
      
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prioritization Framework</div>
            <h3 className="text-xl font-black text-slate-800">R.I.C.E. Score Calculator</h3>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Score</div>
            <div className={`text-2xl font-black ${verdict.color}`}>{Math.round(score)}</div>
            <div className={`text-[10px] font-bold ${verdict.color}`}>{verdict.text}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        
        {/* Sliders */}
        <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* Reach */}
            <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Reach (Users/mo)</span>
                    <span className="text-indigo-600">{reach}</span>
                </div>
                <input 
                    type="range" min="100" max="2000" step="50" 
                    value={reach} onChange={(e) => setReach(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            {/* Impact */}
            <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Impact</span>
                    <span className="text-purple-600">{getImpactLabel(impact)}</span>
                </div>
                <input 
                    type="range" min="0.5" max="3" step="0.5" 
                    value={impact} onChange={(e) => setImpact(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600"
                />
            </div>

            {/* Confidence */}
            <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Confidence (%)</span>
                    <span className={`${confidence < 50 ? 'text-rose-500' : 'text-emerald-600'}`}>{confidence}%</span>
                </div>
                <input 
                    type="range" min="10" max="100" step="10" 
                    value={confidence} onChange={(e) => setConfidence(Number(e.target.value))}
                    className={`w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer ${confidence < 50 ? 'accent-rose-500' : 'accent-emerald-500'}`}
                />
                {confidence < 50 && <p className="text-[9px] text-rose-500 font-bold mt-1">⚠️ Low confidence kills the score.</p>}
            </div>

            {/* Effort */}
            <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Effort (Person-Months)</span>
                    <span className="text-amber-600">{effort}</span>
                </div>
                <input 
                    type="range" min="0.5" max="10" step="0.5" 
                    value={effort} onChange={(e) => setEffort(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-amber-500"
                />
            </div>

        </div>

        {/* Formula Visual */}
        <div className="flex flex-col items-center justify-center p-4">
            <div className="font-mono text-sm text-slate-400 mb-4">The Math</div>
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{reach}</span>
                    <span>×</span>
                    <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded">{impact}</span>
                    <span>×</span>
                    <span className={`${confidence < 50 ? 'text-rose-500 bg-rose-50' : 'text-emerald-600 bg-emerald-50'} px-2 py-1 rounded`}>{confidence}%</span>
                </div>
                <div className="w-full h-0.5 bg-slate-300 rounded-full"></div>
                <div className="text-lg font-bold text-amber-600 bg-amber-50 px-4 py-1 rounded">
                    {effort} <span className="text-xs text-amber-800/60 font-normal ml-1">(Effort)</span>
                </div>
            </div>
            
            <div className="mt-8 bg-indigo-900 text-indigo-100 p-4 rounded-xl text-xs leading-relaxed text-center">
                <p>
                    <strong>Why AI projects fail:</strong> High Impact (cool tech) but Low Confidence (no data) or High Effort (custom models).
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RICEVisual;
