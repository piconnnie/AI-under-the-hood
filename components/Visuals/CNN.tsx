
import React, { useState } from 'react';

const CNN: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [filterPos, setFilterPos] = useState(0);
  const gridSize = 8;
  const cells = Array.from({ length: gridSize * gridSize });
  
  // Create a path of the filter moving (just simple sequential scanning for demo)
  const getFilterCoordinates = (index: number) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      return { x: col * 2, y: row * 2 }; // Stride of 2 roughly
  };

  const { x, y } = getFilterCoordinates(filterPos);

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800 p-6">
      
      <div className="flex items-center gap-8">
        {/* Input Image Grid */}
        <div className="relative">
            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Input Image (Pixels)</div>
            <div className="grid grid-cols-8 gap-0.5 p-1 bg-slate-800 rounded border border-slate-700">
                {cells.map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-[1px] transition-colors duration-300 ${Math.random() > 0.7 ? 'bg-slate-600' : 'bg-slate-700'}`}></div>
                ))}
                
                {/* The Filter Window */}
                <div
                className="absolute w-[34px] h-[34px] border-2 border-yellow-400 bg-yellow-400/20 z-10 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                style={{
                    top: `${4 + y * 18}px`,
                    left: `${4 + x * 18}px`,
                }}
                >
                    <div className="absolute -top-3 -left-1 text-[8px] font-bold text-yellow-400 uppercase">Filter</div>
                </div>
            </div>
        </div>

        <div className="text-2xl text-slate-600">➔</div>

        {/* Feature Map */}
        <div className="flex flex-col items-center gap-2">
            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">Feature Map</div>
            <div className="grid grid-cols-4 gap-1 bg-slate-800 p-2 rounded border border-slate-700">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-6 h-6 rounded-sm border transition-all duration-300 ${i === filterPos ? 'bg-emerald-500 border-emerald-400 shadow-lg scale-110' : 'bg-emerald-900/20 border-slate-700'}`}
                    ></div>
                ))}
            </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="mt-8 w-64 bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col gap-2">
          <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase">
              <span>Scan Position</span>
              <span>{filterPos + 1} / 16</span>
          </div>
          <input 
            type="range" 
            min="0" max="15" 
            value={filterPos} 
            onChange={(e) => setFilterPos(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-yellow-400"
          />
      </div>
    </div>
  );
};

export default CNN;
