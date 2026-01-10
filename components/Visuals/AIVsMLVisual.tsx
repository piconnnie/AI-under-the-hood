
import React, { useState } from 'react';

const AIVsMLVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [selected, setSelected] = useState<'AI' | 'ML' | 'DL' | null>(null);

  const DATA = {
    AI: {
      color: 'bg-orange-500',
      borderColor: 'border-orange-500',
      stroke: '#f97316', // orange-500
      fill: '#fff7ed', // orange-50
      title: "Artificial Intelligence",
      subtitle: "The Broad Concept",
      desc: "Any technique that enables computers to mimic human intelligence. It includes logic, rules, and learning.",
      pm_focus: "Market strategy, user trust, ethical guidelines."
    },
    ML: {
      color: 'bg-blue-500',
      borderColor: 'border-blue-500',
      stroke: '#3b82f6', // blue-500
      fill: '#eff6ff', // blue-50
      title: "Machine Learning",
      subtitle: "The Subset that Learns",
      desc: "Algorithms that improve at tasks with experience (data) rather than explicit programming.",
      pm_focus: "Data sourcing, labeling, model evaluation, handling drift."
    },
    DL: {
      color: 'bg-purple-500',
      borderColor: 'border-purple-500',
      stroke: '#a855f7', // purple-500
      fill: '#faf5ff', // purple-50
      title: "Deep Learning",
      subtitle: "The Powerful Engine",
      desc: "A specialized subset of ML using neural networks with many layers to learn complex patterns (vision, language).",
      pm_focus: "Compute costs (GPUs), latency, massive datasets."
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: 'AI' | 'ML' | 'DL') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setSelected(key);
    }
  };

  const activeData = selected ? DATA[selected] : null;

  return (
    <div className="flex flex-col md:flex-row w-full h-[32rem] md:h-96 bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 shadow-inner">
      
      {/* Visual Area (Left/Top) */}
      <div className="flex-1 relative flex items-center justify-center p-4 bg-white md:bg-transparent" onClick={() => setSelected(null)}>
         <svg viewBox="0 0 400 400" className="w-full h-full max-w-[300px] md:max-w-[350px] drop-shadow-xl" role="group" aria-label="AI Hierarchy Diagram">
            {/* AI Layer (Outer) */}
            <circle 
              cx="200" cy="200" r="190" 
              role="button"
              tabIndex={0}
              aria-label="Select Artificial Intelligence Layer"
              aria-pressed={selected === 'AI'}
              fill={selected === 'AI' ? '#fff7ed' : '#fff'}
              stroke={DATA.AI.stroke} 
              strokeWidth={selected === 'AI' ? 6 : 2}
              strokeDasharray="8 4"
              className="cursor-pointer transition-all duration-300 hover:stroke-[4px] hover:stroke-orange-400 focus:outline-none focus:stroke-[4px] focus:stroke-orange-400"
              onClick={(e) => { e.stopPropagation(); setSelected('AI'); }}
              onKeyDown={(e) => handleKeyPress(e, 'AI')}
            />
            
            {/* ML Layer (Middle) */}
            <circle 
              cx="200" cy="200" r="130" 
              role="button"
              tabIndex={0}
              aria-label="Select Machine Learning Layer"
              aria-pressed={selected === 'ML'}
              fill={selected === 'ML' ? '#eff6ff' : '#fff'}
              stroke={DATA.ML.stroke} 
              strokeWidth={selected === 'ML' ? 6 : 2}
              className="cursor-pointer transition-all duration-300 hover:stroke-[4px] hover:stroke-blue-400 focus:outline-none focus:stroke-[4px] focus:stroke-blue-400"
              onClick={(e) => { e.stopPropagation(); setSelected('ML'); }}
              onKeyDown={(e) => handleKeyPress(e, 'ML')}
            />

            {/* DL Layer (Inner) */}
            <circle 
              cx="200" cy="200" r="70" 
              role="button"
              tabIndex={0}
              aria-label="Select Deep Learning Layer"
              aria-pressed={selected === 'DL'}
              fill={selected === 'DL' ? '#faf5ff' : '#fff'}
              stroke={DATA.DL.stroke} 
              strokeWidth={selected === 'DL' ? 6 : 2}
              className="cursor-pointer transition-all duration-300 hover:stroke-[4px] hover:stroke-purple-400 focus:outline-none focus:stroke-[4px] focus:stroke-purple-400"
              onClick={(e) => { e.stopPropagation(); setSelected('DL'); }}
              onKeyDown={(e) => handleKeyPress(e, 'DL')}
            />

            {/* Labels - Positioned to not overlap when nested */}
            <text 
                x="200" y="50" 
                textAnchor="middle" 
                className={`text-[11px] font-black uppercase tracking-widest pointer-events-none transition-all duration-300 ${selected === 'AI' ? 'fill-orange-600 scale-110' : 'fill-orange-300'}`}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                aria-hidden="true"
            >
                Artificial Intelligence
            </text>
            
            <text 
                x="200" y="110" 
                textAnchor="middle" 
                className={`text-[11px] font-black uppercase tracking-widest pointer-events-none transition-all duration-300 ${selected === 'ML' ? 'fill-blue-600 scale-110' : 'fill-blue-300'}`}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                aria-hidden="true"
            >
                Machine Learning
            </text>

            <text 
                x="200" y="205" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className={`text-[11px] font-black uppercase tracking-widest pointer-events-none transition-all duration-300 ${selected === 'DL' ? 'fill-purple-600 scale-110' : 'fill-purple-300'}`}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                aria-hidden="true"
            >
                Deep Learning
            </text>
         </svg>
         
         {!selected && (
             <div className="absolute bottom-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse pointer-events-none">
                 Select a circle to explore
             </div>
         )}
      </div>

      {/* Info Panel (Right/Bottom) */}
      <div className="h-48 md:h-auto md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-100 p-6 flex flex-col justify-center relative overflow-hidden" aria-live="polite">
         {activeData ? (
             <div className="animate-enter relative z-10">
                 <button 
                    onClick={() => setSelected(null)} 
                    className="absolute -top-2 -right-2 text-slate-300 hover:text-slate-500 md:hidden"
                    aria-label="Close details"
                 >
                    <i className="fa-solid fa-xmark text-xl" aria-hidden="true"></i>
                 </button>
                 
                 <div className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white mb-3 shadow-md ${activeData.color}`}>
                     {selected} Layer
                 </div>
                 <h3 className="text-xl font-black text-slate-800 mb-1 leading-tight">{activeData.title}</h3>
                 <p className="text-xs font-bold text-slate-400 mb-4">{activeData.subtitle}</p>
                 
                 <div className="space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {activeData.desc}
                    </p>
                    
                    <div className={`p-3 rounded-lg border-l-4 bg-slate-50 ${activeData.borderColor}`}>
                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">PM Focus</div>
                        <p className="text-[10px] text-slate-700 font-bold leading-relaxed">
                            {activeData.pm_focus}
                        </p>
                    </div>
                 </div>
             </div>
         ) : (
            <div className="text-center opacity-40">
                <div className="text-5xl mb-4" aria-hidden="true">🧅</div>
                <p className="font-bold text-slate-800">The Hierarchy of AI</p>
                <p className="text-xs text-slate-500 mt-2 max-w-[200px] mx-auto">Like Russian dolls, each layer is a subset of the previous one.</p>
            </div>
         )}
         
         {/* Background Decoration */}
         <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 pointer-events-none rotate-12" aria-hidden="true">
            🧠
         </div>
      </div>

    </div>
  );
};

export default AIVsMLVisual;
