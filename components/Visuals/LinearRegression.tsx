import React, { useState, useEffect } from 'react';

const LinearRegression: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [points, setPoints] = useState<{x: number, y: number}[]>([
    { x: 50, y: 150 }, { x: 80, y: 130 }, { x: 120, y: 140 },
    { x: 160, y: 100 }, { x: 200, y: 110 }
  ]);

  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  // Auto-add points when animating
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      // Add a point that roughly follows a trend but with noise
      const x = Math.random() * 360 + 20;
      // Trend: y = -0.3x + 180 (visual coords)
      const trendY = -0.3 * x + 180;
      const noise = (Math.random() - 0.5) * 60;
      const y = Math.max(20, Math.min(180, trendY + noise));
      
      setPoints(prev => {
          const newPoints = [...prev, { x, y }];
          if (newPoints.length > 15) return newPoints.slice(1); // Keep count manageable
          return newPoints;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Simple Linear Regression OLS
  useEffect(() => {
    if (points.length < 2) return;

    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    points.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const x1 = 0;
    const y1 = slope * x1 + intercept;
    const x2 = 400;
    const y2 = slope * x2 + intercept;

    setLine({ x1, y1, x2, y2 });

  }, [points]);

  const handleAddPoint = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (400 / rect.width);
    const y = (e.clientY - rect.top) * (200 / rect.height);
    
    setPoints([...points, { x, y }]);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPoints([]);
  };

  return (
    <div className="relative w-full h-64 bg-white rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
         <button 
            onClick={reset}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-500 transition-colors"
         >
            Reset
         </button>
      </div>
      
      <svg 
        className="w-full h-full cursor-crosshair" 
        viewBox="0 0 400 200"
        onClick={handleAddPoint}
      >
        <line x1="20" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="20" y1="20" x2="20" y2="180" stroke="#cbd5e1" strokeWidth="2" />

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366f1" className="animate-[pop_0.3s_ease-out]" />
        ))}

        {points.length >= 2 && (
            <line
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="#f43f5e"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
            />
        )}
        
        {points.length < 2 && (
            <text x="200" y="100" textAnchor="middle" className="text-xs fill-slate-400 font-bold pointer-events-none">
                Click to add points
            </text>
        )}
      </svg>
      
      <style>{`
        @keyframes pop {
          0% { transform: scale(0); }
          80% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LinearRegression;