
import React, { useState, useEffect, useRef } from 'react';

interface WordPoint {
  id: string;
  label: string;
  category: 'food' | 'tech' | 'animal' | 'home';
  x: number;
  y: number;
}

// 4 Dimensions of meaning for our demo
const CATEGORIES = {
  food: { color: '#10b981', label: 'Food', vec: [0.9, 0.1, 0.1, 0.2] },
  tech: { color: '#6366f1', label: 'Tech', vec: [0.1, 0.9, 0.1, 0.3] },
  animal: { color: '#f43f5e', label: 'Living', vec: [0.2, 0.1, 0.9, 0.2] },
  home: { color: '#f59e0b', label: 'Home', vec: [0.1, 0.3, 0.2, 0.9] },
};

const INITIAL_WORDS: WordPoint[] = [
  // Food
  { id: '1', label: 'Pizza', category: 'food', x: 50, y: 50 },
  { id: '2', label: 'Burger', category: 'food', x: 80, y: 50 },
  { id: '3', label: 'Apple', category: 'food', x: 50, y: 80 },
  { id: '4', label: 'Samosa', category: 'food', x: 80, y: 80 },
  // Tech
  { id: '5', label: 'Laptop', category: 'tech', x: 300, y: 200 },
  { id: '6', label: 'Phone', category: 'tech', x: 330, y: 200 },
  { id: '7', label: 'WiFi', category: 'tech', x: 300, y: 230 },
  { id: '8', label: 'Code', category: 'tech', x: 330, y: 230 },
  // Animal
  { id: '9', label: 'Cat', category: 'animal', x: 300, y: 50 },
  { id: '10', label: 'Dog', category: 'animal', x: 330, y: 50 },
  { id: '11', label: 'Lion', category: 'animal', x: 300, y: 80 },
  { id: '12', label: 'Bird', category: 'animal', x: 330, y: 80 },
  // Home
  { id: '13', label: 'Table', category: 'home', x: 50, y: 200 },
  { id: '14', label: 'Chair', category: 'home', x: 80, y: 200 },
  { id: '15', label: 'Bed', category: 'home', x: 50, y: 230 },
  { id: '16', label: 'Lamp', category: 'home', x: 80, y: 230 },
];

const EmbeddingsVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [words, setWords] = useState<WordPoint[]>(INITIAL_WORDS);
  const [isTrained, setIsTrained] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Initialize with random positions
  useEffect(() => {
    setWords(prev => prev.map(w => ({
      ...w,
      x: Math.random() * 300 + 40,
      y: Math.random() * 200 + 40
    })));
  }, []);

  // Animation Loop for Training
  useEffect(() => {
    if (isTrained || isAnimating) {
      const interval = setInterval(() => {
        setWords(prevWords => prevWords.map(w => {
          // Define targets based on category quadrants
          let targetX = 0, targetY = 0;
          switch (w.category) {
            case 'food': targetX = 80; targetY = 80; break; // Top Left
            case 'animal': targetX = 320; targetY = 80; break; // Top Right
            case 'home': targetX = 80; targetY = 220; break; // Bottom Left
            case 'tech': targetX = 320; targetY = 220; break; // Bottom Right
          }
          
          // Add some jitter/spread so they don't stack perfectly
          const jitterX = (parseInt(w.id) % 2 === 0 ? 20 : -20) + Math.sin(parseInt(w.id)) * 20;
          const jitterY = (parseInt(w.id) % 3 === 0 ? 20 : -20) + Math.cos(parseInt(w.id)) * 20;

          // If being dragged, don't animate
          if (w.id === draggedId) return w;

          const dx = (targetX + jitterX) - w.x;
          const dy = (targetY + jitterY) - w.y;
          
          return {
            ...w,
            x: w.x + dx * 0.05,
            y: w.y + dy * 0.05
          };
        }));
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isTrained, isAnimating, draggedId]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    setDraggedId(id);
    setHoveredId(id);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggedId || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Scale coordinates to SVG viewBox (400x300)
    const scaleX = 400 / rect.width;
    const scaleY = 300 / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    setWords(prev => prev.map(w => w.id === draggedId ? { ...w, x, y } : w));
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const activeWord = words.find(w => w.id === (hoveredId || draggedId));
  const activeCategory = activeWord ? CATEGORIES[activeWord.category] : null;

  return (
    <div 
      className="relative w-full h-[32rem] bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col shadow-2xl"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Header */}
      <div className="absolute top-4 left-6 z-20 pointer-events-none">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Vector Space</div>
        <h3 className="text-xl font-black text-white">Meaning as Distance</h3>
      </div>

      <div className="absolute top-4 right-6 z-20 flex gap-2">
         <button 
           onClick={() => { setIsTrained(false); setWords(prev => prev.map(w => ({...w, x: Math.random()*300+40, y: Math.random()*200+40}))); }}
           className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase"
         >
            Scramble
         </button>
         <button 
           onClick={() => setIsTrained(true)}
           className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${isTrained ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
         >
            {isTrained ? 'Training Active' : 'Train Model'}
         </button>
      </div>

      {/* Main Graph Area */}
      <div ref={containerRef} className="relative flex-1 cursor-crosshair">
         <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Grid Lines */}
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />

            {/* Connection Lines (when hovering) */}
            {activeWord && words.map((w) => {
               if (w.id === activeWord.id) return null;
               // Calculate distance
               const dist = Math.sqrt(Math.pow(w.x - activeWord.x, 2) + Math.pow(w.y - activeWord.y, 2));
               // Only show line if close or same category
               if (dist < 100 || w.category === activeWord.category) {
                   const opacity = Math.max(0.1, 1 - dist / 150);
                   return (
                       <line 
                         key={w.id}
                         x1={activeWord.x} y1={activeWord.y}
                         x2={w.x} y2={w.y}
                         stroke={w.category === activeWord.category ? CATEGORIES[activeWord.category].color : '#475569'}
                         strokeWidth={w.category === activeWord.category ? 2 : 1}
                         opacity={opacity}
                         strokeDasharray={w.category === activeWord.category ? "0" : "4"}
                       />
                   );
               }
               return null;
            })}

            {/* Words */}
            {words.map((w) => {
              const isActive = w.id === (hoveredId || draggedId);
              return (
                <g 
                  key={w.id} 
                  transform={`translate(${w.x}, ${w.y})`} 
                  onMouseDown={(e) => handleDragStart(e, w.id)}
                  onTouchStart={(e) => handleDragStart(e, w.id)}
                  onMouseEnter={() => !draggedId && setHoveredId(w.id)}
                  onMouseLeave={() => !draggedId && setHoveredId(null)}
                  className="cursor-pointer transition-transform duration-75"
                  style={{ zIndex: isActive ? 100 : 1 }}
                >
                  {/* Glow if active */}
                  {isActive && <circle r="25" fill={CATEGORIES[w.category].color} opacity="0.2" className="animate-pulse" />}
                  
                  {/* Node Circle */}
                  <circle 
                    r={isActive ? 8 : 5} 
                    fill={CATEGORIES[w.category].color} 
                    stroke="white" 
                    strokeWidth="2" 
                    className="transition-all duration-300"
                  />
                  
                  {/* Label */}
                  <text 
                    y={-12} 
                    textAnchor="middle" 
                    className={`text-[10px] font-bold pointer-events-none transition-all duration-300 ${isActive ? 'fill-white text-[12px]' : 'fill-slate-400'}`}
                  >
                    {w.label}
                  </text>
                </g>
              );
            })}
         </svg>
      </div>

      {/* Vector Inspector Panel */}
      <div className="bg-slate-950 border-t border-slate-800 p-6 h-32 flex items-center justify-between">
         {!activeWord ? (
             <div className="flex items-center gap-4 opacity-50">
                 <div className="text-3xl">👆</div>
                 <div className="text-sm font-bold text-slate-400">Hover over a word to inspect its vector embedding</div>
             </div>
         ) : (
             <div className="flex w-full gap-8 animate-enter">
                 <div className="flex flex-col justify-center min-w-[100px]">
                     <div className="text-2xl font-black text-white mb-1">{activeWord.label}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeCategory?.color }}>{activeCategory?.label} Cluster</div>
                 </div>

                 {/* Vector Bars */}
                 <div className="flex-1 flex gap-2 items-end pb-2">
                     {['Food', 'Tech', 'Living', 'Home'].map((dim, i) => {
                         // Mock vector value: High if matches category, low otherwise
                         // We add some random noise based on word ID to make it look "real"
                         const isMatch = activeCategory?.label === (dim === 'Living' ? 'Living' : dim); // Fix 'Animal' vs 'Living' mapping
                         const baseVal = isMatch ? 0.85 : 0.1;
                         const noise = (parseInt(activeWord.id) + i) % 3 * 0.05;
                         const val = baseVal + noise;
                         
                         return (
                            <div key={dim} className="flex-1 flex flex-col gap-2 group">
                                <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden h-16">
                                    <div 
                                      className="absolute bottom-0 w-full transition-all duration-300"
                                      style={{ 
                                          height: `${val * 100}%`, 
                                          backgroundColor: isMatch ? activeCategory?.color : '#475569',
                                          opacity: isMatch ? 1 : 0.3
                                      }}
                                    />
                                    <div className="absolute top-1 left-0 w-full text-center text-[8px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {val.toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-[8px] font-bold text-slate-500 uppercase text-center">{dim}</div>
                            </div>
                         );
                     })}
                 </div>
                 
                 <div className="hidden sm:block w-32 text-[9px] text-slate-500 leading-relaxed font-medium border-l border-slate-800 pl-4">
                     The <b>Embedding</b> is a list of numbers representing the word's position in meaning-space.
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default EmbeddingsVisual;
