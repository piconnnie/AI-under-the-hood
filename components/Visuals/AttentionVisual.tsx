
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
  const adjectiveIndex = 10; // Index of 'tired'/'wide'
  const animalIndex = 1;
  const streetIndex = 5;

  // Attention scores
  const getAttention = (targetIdx: number, sourceIdx: number) => {
      // Base noise
      let score = 0.05;

      // Logic: Define strong connections based on scenario
      
      // 1. Hovering "it" (Index 7)
      if (sourceIdx === itIndex) {
          if (targetIdx === adjectiveIndex) score = 0.6; // Connects to adjective context
          
          if (scenario === 'tired') {
              if (targetIdx === animalIndex) score = 0.95; // Strong connection
              if (targetIdx === streetIndex) score = 0.15; // Weak connection
          } else {
              if (targetIdx === streetIndex) score = 0.95; // Strong connection
              if (targetIdx === animalIndex) score = 0.15; // Weak connection
          }
      }
      
      // 2. Hovering the Adjective "tired" or "wide" (Index 10)
      else if (sourceIdx === adjectiveIndex) {
          if (targetIdx === itIndex) score = 0.7; // Relates back to "it"
          
          if (scenario === 'tired') {
              if (targetIdx === animalIndex) score = 0.8; // "Tired" describes "Animal"
              if (targetIdx === streetIndex) score = 0.1;
          } else {
              if (targetIdx === streetIndex) score = 0.8; // "Wide" describes "Street"
              if (targetIdx === animalIndex) score = 0.1;
          }
      }

      // 3. Hovering Antecedents (Animal/Street)
      else if (sourceIdx === animalIndex) {
          // Animal connects to "it" strongly if "tired"
          if (targetIdx === itIndex) score = scenario === 'tired' ? 0.9 : 0.2;
          if (targetIdx === adjectiveIndex && scenario === 'tired') score = 0.5;
      }
      else if (sourceIdx === streetIndex) {
          // Street connects to "it" strongly if "wide"
          if (targetIdx === itIndex) score = scenario === 'wide' ? 0.9 : 0.2;
          if (targetIdx === adjectiveIndex && scenario === 'wide') score = 0.5;
      }

      return score;
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
                            <text x={endX} y={130} textAnchor="middle" className="fill-white text-[10px] font-bold animate-enter">
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
                  const isAdj = i === adjectiveIndex;
                  const isAnimal = i === animalIndex;
                  const isStreet = i === streetIndex;
                  const isKeyWord = isIt || isAdj || isAnimal || isStreet;

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
                            ${isKeyWord && !isHovered ? 'border border-indigo-500/30 text-indigo-400' : ''}
                        `}
                      >
                          <span className={`text-xs sm:text-sm font-bold ${isHovered ? 'text-white' : 'text-slate-400'}`}>
                              {word}
                          </span>
                          
                          {/* "Hover Me" indicator for key words */}
                          {isKeyWord && !isHovered && hoveredWordIndex === null && (
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-indigo-500 uppercase tracking-widest animate-bounce whitespace-nowrap opacity-50">
                                  Hover
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
