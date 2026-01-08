
import React, { useState, useEffect } from 'react';

const PCAVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
        setProgress(0);
        return;
    }
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 101);
    }, 40);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const points = [
    { x: 100, y: 150 }, { x: 120, y: 140 }, { x: 150, y: 120 },
    { x: 180, y: 110 }, { x: 220, y: 90 }, { x: 250, y: 70 },
    { x: 280, y: 50 }, { x: 300, y: 40 }
  ];

  const t = Math.min(progress / 100, 1);
  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 border-4 border-slate-800">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <line x1="50" y1="180" x2="350" y2="20" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" opacity="0.2" />
        
        {points.map((p, i) => {
          const targetX = p.x;
          const targetY = 200 - (p.x * 0.53 + 30); 
          const curX = isAnimating ? lerp(p.x, targetX, t) : p.x;
          const curY = isAnimating ? lerp(p.y, targetY, t) : p.y;

          return (
            <circle
              key={i}
              cx={curX}
              cy={curY}
              r={isAnimating ? 4 : 6}
              fill={isAnimating ? "#6366f1" : "#94a3b8"}
              className="transition-all duration-300"
            />
          );
        })}

        <text x="200" y="190" textAnchor="middle" className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">
          {isAnimating ? `Compressing: ${Math.round(t * 100)}%` : "High Dimensional Data"}
        </text>
      </svg>
    </div>
  );
};

export default PCAVisual;
