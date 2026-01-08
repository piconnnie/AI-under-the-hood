import React, { useState, useEffect } from 'react';

const ForwardProp: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [activeInput, setActiveInput] = useState(0); // 0 or 1

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveInput(prev => (prev === 0 ? 1 : 0));
    }, 2000); // Toggle every 2 seconds
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-[2.5rem] overflow-hidden flex items-center justify-around border-4 border-slate-900 shadow-xl">
      <div className="absolute inset-0 opacity-[0.1]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, #6366f1 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }} />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        
        {/* Top Path */}
        <g opacity={activeInput === 0 ? 1 : 0.2} className="transition-opacity duration-500">
            <line x1="20%" y1="35%" x2="50%" y2="35%" stroke="#6366f1" strokeWidth={activeInput === 0 ? 3 : 1} />
            <line x1="20%" y1="35%" x2="50%" y2="65%" stroke="#6366f1" strokeWidth={activeInput === 0 ? 3 : 1} />
        </g>

        {/* Bottom Path */}
        <g opacity={activeInput === 1 ? 1 : 0.2} className="transition-opacity duration-500">
            <line x1="20%" y1="65%" x2="50%" y2="35%" stroke="#6366f1" strokeWidth={activeInput === 1 ? 3 : 1} />
            <line x1="20%" y1="65%" x2="50%" y2="65%" stroke="#6366f1" strokeWidth={activeInput === 1 ? 3 : 1} />
        </g>

        {/* Hidden to Output */}
        <line x1="50%" y1="35%" x2="80%" y2="50%" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
        <line x1="50%" y1="65%" x2="80%" y2="50%" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
        
        {/* Moving Particles */}
        <circle r="6" fill="#10b981" filter="drop-shadow(0 0 4px #10b981)">
            <animateMotion 
                dur="1s" 
                repeatCount="indefinite" 
                path={activeInput === 0 ? "M 80 84 L 200 84 L 320 120" : "M 80 156 L 200 156 L 320 120"} 
                key={activeInput} // restart anim on change
            />
        </circle>
      </svg>

      {/* Inputs */}
      <div className="z-10 flex flex-col gap-12 ml-8">
        <button 
            onClick={() => setActiveInput(0)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all border-2 ${activeInput === 0 ? 'bg-indigo-600 border-indigo-400 scale-110' : 'bg-slate-800 border-slate-700 opacity-50'}`}
        >
          🐱
        </button>
        <button 
            onClick={() => setActiveInput(1)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all border-2 ${activeInput === 1 ? 'bg-indigo-600 border-indigo-400 scale-110' : 'bg-slate-800 border-slate-700 opacity-50'}`}
        >
          🐶
        </button>
      </div>

      {/* Hidden Layer */}
      <div className="z-10 flex flex-col gap-10">
        <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-purple-500/50 flex items-center justify-center transition-all duration-300 transform" style={{ scale: activeInput === 0 ? 1.3 : 1, boxShadow: activeInput === 0 ? '0 0 15px rgba(168,85,247,0.5)' : 'none' }}>
            <div className="w-4 h-4 rounded-full bg-purple-500/40"></div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-purple-500/50 flex items-center justify-center transition-all duration-300 transform" style={{ scale: activeInput === 1 ? 1.3 : 1, boxShadow: activeInput === 1 ? '0 0 15px rgba(168,85,247,0.5)' : 'none' }}>
            <div className="w-4 h-4 rounded-full bg-purple-500/40"></div>
        </div>
      </div>

      {/* Output */}
      <div className="z-10 flex flex-col items-center mr-8">
        <div className={`w-16 h-16 rounded-2xl transition-all duration-500 border-4 flex flex-col items-center justify-center text-white ${activeInput === 0 ? 'border-rose-500 bg-rose-500/20' : 'border-emerald-500 bg-emerald-500/20'}`}>
          <span className="text-3xl animate-[pop_0.3s_ease-out]" key={activeInput}>
            {activeInput === 0 ? 'Cat' : 'Dog'}
          </span>
        </div>
        <span className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest">Prediction</span>
      </div>
      
      <style>{`
        @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ForwardProp;