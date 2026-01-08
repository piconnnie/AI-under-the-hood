
import React from 'react';

const CNN: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const gridSize = 8;
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border-4 border-slate-800 p-8">
      <div className="grid grid-cols-8 gap-1 p-2 bg-slate-800 rounded-lg relative">
        {cells.map((_, i) => (
          <div key={i} className="w-5 h-5 bg-slate-700 rounded-sm"></div>
        ))}
        
        <div
          className={`absolute w-11 h-11 border-2 border-yellow-400 bg-yellow-400/10 rounded-sm z-10 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
          style={{
            top: '8px',
            left: '8px',
            animation: isAnimating ? 'stride 4s steps(4) infinite' : 'none'
          }}
        >
          <div className="absolute inset-0 border border-yellow-400/50 animate-pulse"></div>
        </div>
      </div>

      <div className="ml-12 flex flex-col items-center gap-2">
         <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Reduced Map</div>
         <div className="grid grid-cols-4 gap-1 bg-slate-800 p-1 rounded border border-slate-700">
            {Array.from({ length: 16 }).map((_, i) => (
                <div 
                    key={i} 
                    className="w-3 h-3 bg-emerald-500/20 rounded-xs"
                    style={{
                        animation: isAnimating ? `pixelGlow 4s infinite` : 'none',
                        animationDelay: `${i * 0.1}s`
                    }}
                ></div>
            ))}
         </div>
      </div>

      <style>{`
        @keyframes stride {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(100%, 0); }
          50% { transform: translate(100%, 100%); }
          75% { transform: translate(0, 100%); }
        }
        @keyframes pixelGlow {
          0%, 100% { background: rgba(16, 185, 129, 0.1); }
          50% { background: rgba(16, 185, 129, 0.7); }
        }
      `}</style>
    </div>
  );
};

export default CNN;
