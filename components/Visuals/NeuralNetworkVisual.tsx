
import React, { useState, useEffect } from 'react';

const NeuralNetworkVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
        setActiveLayer(0);
        return;
    }
    const interval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % 5); // 0: Input, 1: Conn1, 2: Hidden, 3: Conn2, 4: Output
    }, 800);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const layers = [
    { x: 50, nodes: 3, label: "Input Layer", color: "#6366f1" },
    { x: 200, nodes: 4, label: "Hidden Layer", color: "#8b5cf6" },
    { x: 350, nodes: 2, label: "Output Layer", color: "#10b981" }
  ];

  // Generate connections
  const connections1 = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      connections1.push({ start: i, end: j });
    }
  }
  const connections2 = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      connections2.push({ start: i, end: j });
    }
  }

  const getNodeY = (index: number, total: number) => {
    const height = 200;
    const spacing = height / (total + 1);
    return spacing * (index + 1);
  };

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex items-center justify-center p-4 shadow-2xl">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Connections Input -> Hidden */}
        {connections1.map((c, i) => (
            <line 
                key={`c1-${i}`}
                x1={layers[0].x} 
                y1={getNodeY(c.start, layers[0].nodes)} 
                x2={layers[1].x} 
                y2={getNodeY(c.end, layers[1].nodes)} 
                stroke={activeLayer === 1 || activeLayer === 2 || activeLayer === 3 || activeLayer === 4 ? "#8b5cf6" : "#334155"}
                strokeWidth={activeLayer === 1 ? "3" : "1"}
                strokeOpacity={activeLayer === 1 ? "1" : "0.3"}
                className="transition-all duration-500"
            />
        ))}

        {/* Connections Hidden -> Output */}
        {connections2.map((c, i) => (
            <line 
                key={`c2-${i}`}
                x1={layers[1].x} 
                y1={getNodeY(c.start, layers[1].nodes)} 
                x2={layers[2].x} 
                y2={getNodeY(c.end, layers[2].nodes)} 
                stroke={activeLayer === 3 || activeLayer === 4 ? "#10b981" : "#334155"}
                strokeWidth={activeLayer === 3 ? "3" : "1"}
                strokeOpacity={activeLayer === 3 ? "1" : "0.3"}
                className="transition-all duration-500"
            />
        ))}

        {/* Nodes */}
        {layers.map((layer, lIndex) => (
            <g key={lIndex}>
                {Array.from({ length: layer.nodes }).map((_, nIndex) => {
                    const isActive = (lIndex === 0 && activeLayer >= 0) || 
                                     (lIndex === 1 && activeLayer >= 2) || 
                                     (lIndex === 2 && activeLayer >= 4);
                    
                    // Specific highlight logic for animation steps
                    const isPulse = (lIndex === 0 && activeLayer === 0) ||
                                    (lIndex === 1 && activeLayer === 2) ||
                                    (lIndex === 2 && activeLayer === 4);

                    return (
                        <circle 
                            key={nIndex}
                            cx={layer.x}
                            cy={getNodeY(nIndex, layer.nodes)}
                            r={isPulse ? 12 : 8}
                            fill={isActive ? layer.color : "#1e293b"}
                            stroke={isActive ? "white" : "#475569"}
                            strokeWidth="2"
                            className="transition-all duration-300 ease-out"
                        />
                    );
                })}
                <text 
                    x={layer.x} 
                    y="190" 
                    textAnchor="middle" 
                    className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${activeLayer >= lIndex * 2 ? 'fill-white' : 'fill-slate-600'}`}
                >
                    {layer.label}
                </text>
            </g>
        ))}
      </svg>
      
      {isAnimating && (
          <div className="absolute top-4 left-4 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <span className="text-[9px] font-mono text-indigo-300">
                  {activeLayer === 0 && "Receiving Data..."}
                  {activeLayer === 1 && "Weights Processing..."}
                  {activeLayer === 2 && "Hidden Layer Activation"}
                  {activeLayer === 3 && "Final Calculation..."}
                  {activeLayer === 4 && "Output Prediction"}
              </span>
          </div>
      )}
    </div>
  );
};

export default NeuralNetworkVisual;
