import React, { useState } from 'react';

const AIVsMLVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const INFO = {
    AI: { 
        title: "Artificial Intelligence", 
        pm: "Scope: Market Strategy, Ethical Guidelines, UX Narratives.",
        desc: "The big umbrella. Solving complex problems that usually require human smarts."
    },
    ML: { 
        title: "Machine Learning", 
        pm: "Scope: Data Sourcing, Labeling Quality, Model Drift Monitoring.",
        desc: "The 'Engine'. Learning patterns from data instead of hard-coded rules."
    },
    DL: { 
        title: "Deep Learning", 
        pm: "Scope: Compute Costs (GPUs), Latency Tradeoffs, Massive Datasets.",
        desc: "The 'Fuel'. Using multi-layered brain-like networks for complex vision/text."
    }
  };

  const toggleSelect = (type: string) => {
    if (selected === type) {
      setSelected(null);
    } else {
      setSelected(type);
    }
  };

  return (
    <div 
      className="relative w-full h-80 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-4 cursor-pointer"
      onClick={() => setSelected(null)}
    >
      <svg viewBox="0 0 400 340" className="w-full h-full">
        {/* Layer: AI */}
        <circle 
          cx="200" cy="170" r="140" 
          fill={selected === 'AI' ? '#f97316' : '#f8fafc'} 
          stroke="#f97316" strokeWidth="2" 
          className="transition-all duration-500 hover:stroke-[3px]" 
          onClick={(e) => { e.stopPropagation(); toggleSelect('AI'); }} 
        />
        {/* Layer: ML */}
        <circle 
          cx="200" cy="190" r="90" 
          fill={selected === 'ML' ? '#3b82f6' : '#eff6ff'} 
          stroke="#3b82f6" strokeWidth="2" 
          className="transition-all duration-500 hover:stroke-[3px]" 
          onClick={(e) => { e.stopPropagation(); toggleSelect('ML'); }} 
        />
        {/* Layer: DL */}
        <circle 
          cx="200" cy="210" r="45" 
          fill={selected === 'DL' ? '#a855f7' : '#f5f3ff'} 
          stroke="#a855f7" strokeWidth="2" 
          className="transition-all duration-500 hover:stroke-[3px]" 
          onClick={(e) => { e.stopPropagation(); toggleSelect('DL'); }} 
        />
        
        <text 
          x="200" y="55" textAnchor="middle" 
          className={`text-[10px] font-black uppercase tracking-widest transition-all pointer-events-none ${selected === 'AI' ? 'fill-white' : 'fill-orange-600'}`}
        >
          Artificial Intelligence
        </text>
        <text 
          x="200" y="125" textAnchor="middle" 
          className={`text-[10px] font-black uppercase tracking-widest transition-all pointer-events-none ${selected === 'ML' ? 'fill-white' : 'fill-blue-600'}`}
        >
          Machine Learning
        </text>
        <text 
          x="200" y="215" textAnchor="middle" 
          className={`text-[8px] font-black uppercase tracking-widest transition-all pointer-events-none ${selected === 'DL' ? 'fill-white' : 'fill-purple-600'}`}
        >
          Deep Learning
        </text>
      </svg>

      {selected ? (
        <div 
          className="absolute inset-x-8 bottom-8 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl animate-enter border border-slate-700 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            <h4 className="text-orange-400 text-[10px] font-black uppercase mb-1">{INFO[selected as keyof typeof INFO].title}</h4>
            <p className="text-xs text-slate-400 mb-2">{INFO[selected as keyof typeof INFO].desc}</p>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] font-black text-emerald-400 uppercase block mb-1">PM Focus Area</span>
                <p className="text-[11px] font-medium leading-relaxed">{INFO[selected as keyof typeof INFO].pm}</p>
            </div>
        </div>
      ) : (
        <div className="absolute bottom-8 animate-bounce bg-white shadow-lg border border-slate-200 px-6 py-2 rounded-full pointer-events-none">
            <span className="text-xs font-black text-slate-500 uppercase">Click a layer to explore</span>
        </div>
      )}
    </div>
  );
};

export default AIVsMLVisual;