
import React, { useState, useRef } from 'react';

const LossFunctionVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [predX, setPredX] = useState(100);
  const targetX = 300;
  const targetY = 100;
  const predY = 100;
  const svgRef = useRef<SVGSVGElement>(null);
  
  const distance = Math.abs(targetX - predX);
  const lossValue = Math.pow(distance/10, 2).toFixed(1); // MSE-ish visualization
  const red = Math.min(255, distance * 2);
  const green = Math.max(0, 255 - distance * 2);
  const colorSeverity = `rgb(${red}, ${green}, 100)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only drag when clicked
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    let newX = (e.clientX - rect.left) * (400 / rect.width);
    
    // Constraints
    if (newX < 20) newX = 20;
    if (newX > 380) newX = 380;
    
    setPredX(newX);
  };

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex items-center justify-center p-8 shadow-2xl">
      <svg 
        ref={svgRef}
        viewBox="0 0 400 200" 
        className="w-full h-full cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseMove} // Allow click to jump
      >
        {/* Target */}
        <circle cx={targetX} cy={targetY} r="30" fill="#10b981" fillOpacity="0.1" className="animate-pulse" />
        <circle cx={targetX} cy={targetY} r="6" fill="#10b981" />
        <text x={targetX} y={targetY - 40} textAnchor="middle" className="text-[10px] font-black fill-emerald-500 uppercase tracking-widest">Truth</text>
        
        {/* Prediction */}
        <g className="transition-transform duration-75 ease-out">
          <line x1={predX} y1={0} x2={predX} y2={200} stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.3" />
          <circle cx={predX} cy={predY} r="14" fill="#6366f1" stroke="white" strokeWidth="3" className="shadow-lg" />
          <text x={predX} y={predY - 40} textAnchor="middle" className="text-[10px] font-black fill-indigo-400 uppercase tracking-widest">Prediction</text>
        </g>

        {/* Error Line */}
        <line 
          x1={predX} y1={predY} 
          x2={targetX} y2={targetY} 
          stroke={colorSeverity} 
          strokeWidth="6" 
          strokeDasharray="6"
          opacity="0.8"
        />
        
        {/* Loss Label */}
        <g transform={`translate(${(predX + targetX) / 2}, ${predY + 40})`}>
          <rect x="-40" y="-15" width="80" height="30" rx="8" fill={colorSeverity} />
          <text textAnchor="middle" y="5" className="text-[12px] font-black fill-white">Loss: {lossValue}</text>
        </g>
      </svg>

      <div className="absolute top-8 left-8 pointer-events-none">
          <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Drag to Minimize</div>
          <div className="text-3xl font-black italic transition-colors duration-300" style={{ color: colorSeverity }}>
            {distance < 20 ? 'PERFECT!' : distance < 100 ? 'OKAY' : 'BAD'}
          </div>
      </div>
    </div>
  );
};

export default LossFunctionVisual;
    