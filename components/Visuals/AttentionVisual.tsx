
import React, { useState } from 'react';

const AttentionVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [scenario, setScenario] = useState<'tired' | 'wide'>('tired');
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  // Example sentences
  // 1: The animal didn't cross the street because it was too tired. ('it' refers to animal)
  // 2: The animal didn't cross the street because it was too wide. ('it' refers to street)
  
  const wordsTired = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired."];
  const wordsWide = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "wide."];
  
  const words = scenario === 'tired' ? wordsTired : wordsWide;
  const itIndex = 7; // Index of 'it'

  // Attention scores for "it" (index 7)
  const getAttention = (targetIdx: number, sourceIdx: number) => {
      // We only care about attention FROM "it" (source=7) TO other words
      if (sourceIdx !== itIndex) return 0.1; // Default low attention for visual noise

      if (scenario === 'tired') {
          if (targetIdx === 1) return 0.9; // animal (high)
          if (targetIdx === 5) return 0.2; // street (low)
          if (targetIdx === 10) return 0.6; // tired (context)
      } else {
          if (targetIdx === 1) return 0.2; // animal (low)
          if (targetIdx === 5) return 0.9; // street (high)
          if (targetIdx === 10) return 0.6; // wide (context)
      }
      return 0.1; // Base attention
  };

  return (
    <div className="relative w-full h-[28rem] bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-10">
          <div>
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Self-Attention Mechanism</div>
              <h3 className="text-lg font-bold text-white">Who is "it"?</h3>
          </div>
          
          <div className="flex bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setScenario('tired')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${scenario === 'tired' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Context: Tired
              </button>
              <button 
                onClick={() => setScenario('wide')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${scenario === 'wide' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Context: Wide
              </button>
          </div>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 relative flex items-center justify-center">
          
          {/* Connection Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              {hoveredWordIndex !== null && words.map((_, i) => {
                  if (i === hoveredWordIndex) return null;
                  
                  const attention = getAttention(i, hoveredWordIndex);
                  if (attention < 0.2) return null; // Don't draw weak lines to reduce clutter

                  // Calculate rough positions (Assuming uniform distribution for simplicity in this demo)
                  // In a real app, we'd use refs to get exact element coordinates.
                  // Visual HACK: approximate % positions based on word count
                  const startX = (hoveredWordIndex / words.length) * 100 + 4 + '%'; // +4 for centering
                  const endX = (i / words.length) * 100 + 4 + '%';
                  
                  const controlY = 100 - (attention * 50); // Higher attention = higher arc

                  return (
                      <g key={i}>
                        <path 
                            d={`M ${startX} 140 Q 50% ${controlY} ${endX} 140`}
                            fill="none"
                            stroke={attention > 0.5 ? '#6366f1' : '#94a3b8'}
                            strokeWidth={attention * 6}
                            strokeOpacity={attention}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                        {/* Score Label */}
                        {attention > 0.5 && (
                            <text x={endX} y={130} textAnchor="middle" className="fill-white text-[10px] font-bold">
                                {Math.round(attention * 100)}%
                            </text>
                        )}
                      </g>
                  );
              })}
          </svg>

          {/* Words Layer */}
          <div className="relative z-10 flex justify-between w-full px-4">
              {words.map((word, i) => {
                  const isIt = i === itIndex;
                  const isHovered = i === hoveredWordIndex;
                  const isRelated = hoveredWordIndex !== null && getAttention(i, hoveredWordIndex) > 0.5;

                  return (
                      <div 
                        key={i}
                        onMouseEnter={() => setHoveredWordIndex(i)}
                        onMouseLeave={() => setHoveredWordIndex(null)}
                        className={`relative cursor-pointer transition-all duration-300 px-2 py-1 rounded-lg
                            ${isHovered ? 'bg-indigo-600 -translate-y-1 shadow-lg shadow-indigo-500/50 scale-110' : ''}
                            ${isRelated ? 'bg-slate-700 text-indigo-300' : ''}
                            ${isIt && !isHovered ? 'border border-indigo-500/50 text-indigo-400' : ''}
                        `}
                      >
                          <span className={`text-xs sm:text-sm font-bold ${isHovered ? 'text-white' : 'text-slate-400'}`}>
                              {word}
                          </span>
                          
                          {/* "It" indicator */}
                          {isIt && !isHovered && (
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-indigo-500 uppercase tracking-widest animate-bounce">
                                  Hover Me
                              </div>
                          )}
                      </div>
                  );
              })}
          </div>
      </div>

      <div className="mt-8 p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">
          <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed">
              {scenario === 'tired' 
               ? <span>When the sentence ends with <b>"tired"</b>, the model pays attention to <b>"animal"</b> because streets don't get tired.</span>
               : <span>When the sentence ends with <b>"wide"</b>, the model pays attention to <b>"street"</b> because animals aren't usually described as wide.</span>
              }
          </p>
      </div>
    </div>
  );
};

export default AttentionVisual;
