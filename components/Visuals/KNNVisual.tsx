
import React, { useState, useRef } from 'react';

const KNNVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [queryPoint, setQueryPoint] = useState({ x: 180, y: 110 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  const points = [
    { x: 50, y: 50, type: 'A' }, { x: 80, y: 70, type: 'A' }, { x: 40, y: 100, type: 'A' },
    { x: 320, y: 140, type: 'B' }, { x: 350, y: 110, type: 'B' }, { x: 290, y: 170, type: 'B' }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (400 / rect.width);
    const y = (e.clientY - rect.top) * (200 / rect.height);
    setQueryPoint({ x, y });
  };

  return (
    <div className="relative w-full h-72 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex items-center justify-center p-8">
      <svg 
        ref={svgRef}
        viewBox="0 0 400 200" 
        className="w-full h-full cursor-none" // Hide default cursor for immersion
        onMouseMove={handleMouseMove}
      >
        {points.map((p, i) => {
          const dist = Math.sqrt(Math.pow(p.x - queryPoint.x, 2) + Math.pow(p.y - queryPoint.y, 2));
          // Find 2 nearest? simple visual logic: highlight if close
          const isActive = dist < 120;

          return (
            <g key={i}>
              {isActive && (
                <line 
                  x1={queryPoint.x} y1={queryPoint.y} x2={p.x} y2={p.y} 
                  stroke={p.type === 'A' ? '#6366f1' : '#f43f5e'} 
                  strokeWidth={isActive ? 2 : 1} 
                  strokeDasharray="4"
                  className="transition-all duration-100"
                />
              )}
              <circle cx={p.x} cy={p.y} r="8" fill={p.type === 'A' ? '#6366f1' : '#f43f5e'} className="transition-all duration-300" />
            </g>
          );
        })}

        {/* The User Cursor */}
        <g transform={`translate(${queryPoint.x}, ${queryPoint.y})`} className="transition-transform duration-75 ease-out">
            <circle r="120" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
            <circle r="12" fill="white" stroke="#334155" strokeWidth="3" className="shadow-xl" />
            <text y="-20" textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest bg-white">YOU</text>
        </g>
      </svg>
      
      <div className="absolute bottom-4 pointer-events-none bg-white/80 px-4 py-1 rounded-full border border-slate-100">
        <span className="text-[9px] font-bold text-slate-400">Move mouse to classify</span>
      </div>
    </div>
  );
};

export default KNNVisual;
    