import React, { useState, useEffect, useMemo } from 'react';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

interface Centroid {
  x: number;
  y: number;
  color: string;
}

const COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#06b6d4', // Cyan
];

const KMeans: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [k, setK] = useState(3);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [iteration, setIteration] = useState(0);

  // 1. Generate static raw data points (blobs) on mount
  const rawData = useMemo(() => {
    const data: {x: number, y: number}[] = [];
    // Helper to add a blob
    const addBlob = (centerX: number, centerY: number, count: number, spread: number) => {
      for (let i = 0; i < count; i++) {
        data.push({
          x: centerX + (Math.random() - 0.5) * spread,
          y: centerY + (Math.random() - 0.5) * spread
        });
      }
    };

    // Create 4 distinct natural groups to make clustering interesting
    addBlob(100, 80, 15, 60);  // Top Left
    addBlob(300, 60, 15, 60);  // Top Right
    addBlob(120, 150, 15, 50); // Bottom Left
    addBlob(280, 140, 15, 60); // Bottom Right
    addBlob(200, 100, 10, 180); // Noise/Middle

    return data;
  }, []);

  // Initialize
  useEffect(() => {
    // A. Initialize Centroids (pick random points from data)
    const currentCentroids: Centroid[] = [];
    const usedIndices = new Set<number>();
    
    for (let i = 0; i < k; i++) {
      let idx;
      do {
        idx = Math.floor(Math.random() * rawData.length);
      } while (usedIndices.has(idx));
      usedIndices.add(idx);
      
      currentCentroids.push({
        x: rawData[idx].x,
        y: rawData[idx].y,
        color: COLORS[i % COLORS.length]
      });
    }
    setCentroids(currentCentroids);
    setPoints(rawData.map(p => ({ ...p, cluster: -1 })));
    setIteration(0);
  }, [k, rawData]);

  // Animation Loop: Alternates between Assigning Points and Updating Centroids
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setInterval(() => {
        setIteration(prev => prev + 1);
    }, 1000); // 1 second per step

    return () => clearInterval(timer);
  }, [isAnimating]);

  // Logic for each step
  useEffect(() => {
      if (iteration === 0) return;

      if (iteration % 2 !== 0) {
          // Odd Step: Assign Points to Nearest Centroid
          setPoints(prevPoints => prevPoints.map(p => {
            let minDist = Infinity;
            let clusterIdx = p.cluster; // default to current
            
            centroids.forEach((c, idx) => {
                const dist = Math.sqrt(Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2));
                if (dist < minDist) {
                    minDist = dist;
                    clusterIdx = idx;
                }
            });
            return { ...p, cluster: clusterIdx };
          }));
      } else {
          // Even Step: Update Centroids to Mean position
          setCentroids(prevCentroids => prevCentroids.map((c, idx) => {
              const clusterPoints = points.filter(p => p.cluster === idx);
              if (clusterPoints.length === 0) return c; // Don't move if empty

              const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
              const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
              return { ...c, x: avgX, y: avgY };
          }));
      }
  }, [iteration]); // Depend on iteration to trigger updates

  return (
    <div className="relative w-full h-80 bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 flex flex-col items-center shadow-inner">
      
      {/* Controls */}
      <div className="absolute top-4 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl border border-slate-200 shadow-sm flex gap-2">
        <span className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 flex items-center">Clusters (K):</span>
        {[2, 3, 4, 5].map(val => (
          <button
            key={val}
            onClick={() => { setK(val); setIteration(0); }}
            className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${k === val ? 'bg-indigo-600 text-white shadow-md scale-110' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            {val}
          </button>
        ))}
      </div>

      <svg className="w-full h-full" viewBox="0 0 400 220">
        {/* Connection Lines (Optional, only show during assignment step for flair?) - maybe too messy */}
        
        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={p.cluster === -1 ? '#cbd5e1' : centroids[p.cluster]?.color}
            className="transition-colors duration-500 ease-in-out"
          />
        ))}

        {/* Centroids */}
        {centroids.map((c, i) => (
          <g 
            key={i} 
            style={{ 
              transform: `translate(${c.x}px, ${c.y}px)`, 
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            }}
          >
            {/* Pulse effect */}
            <circle r="30" fill={c.color} opacity="0.1" className={isAnimating ? "animate-ping" : ""} />
            <circle r="60" fill={c.color} opacity="0.05" className={isAnimating ? "animate-pulse" : ""} />
            
            {/* The Centroid Marker */}
            <rect 
              x="-8" y="-8" width="16" height="16" 
              fill={c.color} 
              stroke="white" strokeWidth="3" 
              rx="4" 
              className="shadow-xl"
            />
            <text y="-14" textAnchor="middle" className="text-[10px] font-black fill-slate-700 select-none uppercase tracking-widest bg-white">
              Mean
            </text>
          </g>
        ))}
      </svg>
      
      <div className="absolute bottom-4 text-center pointer-events-none">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/90 px-4 py-2 rounded-full border border-slate-100 shadow-sm">
           {iteration === 0 ? "Ready to Cluster" : (iteration % 2 !== 0 ? "Step 1: Assigning Points..." : "Step 2: Updating Centroids...")}
        </p>
      </div>
    </div>
  );
};

export default KMeans;