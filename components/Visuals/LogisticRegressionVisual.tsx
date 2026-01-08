import React, { useState, useRef } from 'react';

const LogisticRegressionVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [inputX, setInputX] = useState(200);
  const svgRef = useRef<SVGSVGElement>(null);

  const sigmoid = (x: number) => {
    // Map visual range [50, 350] to sigmoid domain [-6, 6] approx
    const k = 0.04; 
    const x0 = 200;
    return 1 / (1 + Math.exp(-k * (x - x0)));
  };

  const prob = sigmoid(inputX);
  const probPercent = Math.round(prob * 100);
  const prediction = prob > 0.5 ? "Positive (1)" : "Negative (0)";
  const sigmoidPath = "M 50 170 C 150 170 250 30 350 30";

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = svgRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) * (400 / rect.width);
    const constrainedX = Math.max(50, Math.min(350, x));
    setInputX(constrainedX);
  };

  // Calculate Y position on the visual curve for the dot
  // Simplified visual approximation of sigmoid for the dot Y
  // 50->170 (y=1), 350->30 (y=0)
  // Let's use the actual sigmoid math to mix between 170 and 30
  const dotY = 170 - (prob * 140);

  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-8 touch-none">
      <div className="absolute top-4 w-full flex justify-between px-8 z-10 pointer-events-none">
         <div className="bg-white/80 backdrop-blur border border-slate-100 px-3 py-1 rounded-lg">
            <div className="text-[8px] font-black uppercase text-slate-400">Score</div>
            <div className="text-lg font-black text-slate-700">{(inputX - 50).toFixed(0)}</div>
         </div>
         <div className={`bg-white/80 backdrop-blur border px-3 py-1 rounded-lg transition-colors ${prob > 0.5 ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
            <div className="text-[8px] font-black uppercase text-slate-400">Probability</div>
            <div className={`text-lg font-black ${prob > 0.5 ? 'text-emerald-600' : 'text-rose-600'}`}>{probPercent}%</div>
         </div>
      </div>

      <svg 
        ref={svgRef}
        viewBox="0 0 400 200" 
        className="w-full h-full cursor-ew-resize"
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        onMouseDown={handleDrag}
        onTouchMove={handleDrag}
      >
        <line x1="50" y1="180" x2="350" y2="180" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="50" y1="20" x2="350" y2="20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
        
        {/* The Curve */}
        <path
          d={sigmoidPath}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* User Input Line */}
        <line x1={inputX} y1={20} x2={inputX} y2={180} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2" />
        
        {/* The Dot */}
        <circle 
            cx={inputX} cy={dotY} r="10" 
            fill={prob > 0.5 ? "#10b981" : "#f43f5e"} 
            stroke="white" strokeWidth="3" 
            className="shadow-xl"
        />

        <text x="360" y="30" className="text-[10px] font-black fill-emerald-600">Yes</text>
        <text x="360" y="180" className="text-[10px] font-black fill-rose-600">No</text>
      </svg>
      
      <div className="absolute bottom-4 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg pointer-events-none">
          Drag to see Classification
      </div>
    </div>
  );
};

export default LogisticRegressionVisual;