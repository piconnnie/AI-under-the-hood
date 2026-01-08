import React, { useState, useRef, useEffect } from 'react';

const BinaryClassification: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [lineX, setLineX] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);

  const bluePoints = [
    { x: 50, y: 50 }, { x: 80, y: 40 }, { x: 40, y: 90 }, { x: 100, y: 60 }, { x: 70, y: 110 }, { x: 160, y: 30 }
  ];
  const redPoints = [
    { x: 300, y: 150 }, { x: 340, y: 180 }, { x: 280, y: 120 }, { x: 350, y: 100 }, { x: 250, y: 170 }, { x: 220, y: 140 }
  ];

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = (clientX - rect.left) * (400 / rect.width);
    const constrainedX = Math.max(50, Math.min(350, x));
    setLineX(constrainedX);
  };

  const misclassifiedBlue = bluePoints.filter(p => p.x > lineX).length;
  const misclassifiedRed = redPoints.filter(p => p.x < lineX).length;

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-80 bg-white rounded-[2.5rem] overflow-hidden border-2 border-slate-100 flex flex-col items-center justify-center cursor-ew-resize select-none touch-none"
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        onMouseDown={handleDrag}
        onTouchMove={handleDrag}
    >
      <div className="absolute top-4 w-full px-8 flex justify-between z-20 pointer-events-none">
          <div className={`p-2 rounded-xl transition-all border ${misclassifiedBlue > 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className="text-[8px] font-black uppercase text-slate-500 mb-1">Class Blue Errors</div>
              <div className="text-xl font-black">{misclassifiedBlue}</div>
          </div>
          <div className={`p-2 rounded-xl transition-all border ${misclassifiedRed > 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className="text-[8px] font-black uppercase text-slate-500 mb-1">Class Red Errors</div>
              <div className="text-xl font-black">{misclassifiedRed}</div>
          </div>
      </div>

      <svg className="w-full h-full p-8" viewBox="0 0 400 200">
        <rect x="0" y="0" width={lineX} height="200" fill="#eff6ff" className="transition-all duration-300" />
        <rect x={lineX} y="0" width={400 - lineX} height="200" fill="#fff1f2" className="transition-all duration-300" />

        <line x1={lineX} y1="20" x2={lineX} y2="180" stroke="#334155" strokeWidth="4" strokeDasharray="8" />
        <circle cx={lineX} cy="100" r="12" fill="#334155" stroke="white" strokeWidth="2" />
        <text x={lineX} y="105" textAnchor="middle" fill="white" fontSize="10" className="pointer-events-none">↔</text>

        {bluePoints.map((p, i) => (
          <circle key={`b-${i}`} cx={p.x} cy={p.y} r="8" fill="#3b82f6" className="shadow-sm transition-all duration-300" style={{ opacity: p.x > lineX ? 1 : 0.8 }} />
        ))}
        {redPoints.map((p, i) => (
          <circle key={`r-${i}`} cx={p.x} cy={p.y} r="8" fill="#f43f5e" className="shadow-sm transition-all duration-300" style={{ opacity: p.x < lineX ? 1 : 0.8 }} />
        ))}
      </svg>
      
      <div className="absolute bottom-4 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          Drag the line to find the best split
      </div>
    </div>
  );
};

export default BinaryClassification;