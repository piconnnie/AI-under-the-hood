import React, { useState } from 'react';

type DecisionNode = { label: string; x: number; y: number; yes: number; no: number; isLeaf: false };
type LeafNode = { label: string; x: number; y: number; isLeaf: true };
type TreeNode = DecisionNode | LeafNode;

const DecisionTreeVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [path, setPath] = useState<number[]>([0]);

  // Tree structure: 
  // Node 0 -> (1, 2)
  // Node 1 -> (3, 4)
  // Node 2 -> (5, 6)
  
  const nodes: Record<number, TreeNode> = {
    0: { label: "Has Fur?", x: 200, y: 40, yes: 1, no: 2, isLeaf: false },
    1: { label: "Barks?", x: 100, y: 100, yes: 3, no: 4, isLeaf: false },
    2: { label: "Feathers?", x: 300, y: 100, yes: 5, no: 6, isLeaf: false },
    3: { label: "🐶 Dog", x: 50, y: 180, isLeaf: true },
    4: { label: "🐱 Cat", x: 150, y: 180, isLeaf: true },
    5: { label: "🦅 Bird", x: 250, y: 180, isLeaf: true },
    6: { label: "🐸 Frog", x: 350, y: 180, isLeaf: true },
  };

  const handleNodeClick = (id: number) => {
    // If clicking root, reset
    if (id === 0) {
        setPath([0]);
        return;
    }
    // Logic handles in SVG buttons below
  };

  const traverse = (nextId: number) => {
    setPath([...path, nextId]);
  };

  const currentNodeId = path[path.length - 1];
  const currentNode = nodes[currentNodeId];

  return (
    <div className="relative w-full h-80 bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col items-center justify-center p-8 shadow-inner">
      <svg viewBox="0 0 400 240" className="w-full h-full pointer-events-auto">
        {/* Connections */}
        <g stroke="#e2e8f0" strokeWidth="2">
          <line x1="200" y1="40" x2="100" y2="100" />
          <line x1="200" y1="40" x2="300" y2="100" />
          <line x1="100" y1="100" x2="50" y2="180" />
          <line x1="100" y1="100" x2="150" y2="180" />
          <line x1="300" y1="100" x2="250" y2="180" />
          <line x1="300" y1="100" x2="350" y2="180" />
        </g>

        {/* Highlight Path */}
        <g stroke="#6366f1" strokeWidth="4" strokeLinecap="round" fill="none" className="transition-all duration-500">
            {path.map((nodeId, i) => {
                if (i === 0) return null;
                const prevNode = nodes[path[i-1]];
                const currNode = nodes[nodeId];
                if (!prevNode || !currNode) return null;
                return <line key={i} x1={prevNode.x} y1={prevNode.y} x2={currNode.x} y2={currNode.y} className="animate-[draw_0.5s_ease-out_forwards]" />;
            })}
        </g>

        {/* Nodes */}
        {Object.entries(nodes).map(([idStr, n]) => {
            const id = parseInt(idStr);
            const isActive = path.includes(id);
            const isLeaf = n.isLeaf;

            return (
                <g key={id} transform={`translate(${n.x}, ${n.y})`} onClick={() => handleNodeClick(id)} className="cursor-pointer transition-all duration-300 hover:scale-110">
                    <circle
                        r={isLeaf ? 25 : 20}
                        fill={isActive ? (isLeaf ? '#10b981' : '#6366f1') : '#f1f5f9'}
                        stroke={isActive ? 'white' : '#cbd5e1'}
                        strokeWidth="3"
                        className="shadow-sm"
                    />
                    <text y={isLeaf ? 5 : 35} textAnchor="middle" className={`text-[8px] font-black uppercase ${isActive ? (isLeaf ? 'fill-white' : 'fill-slate-800') : 'fill-slate-400'}`}>
                        {n.label}
                    </text>
                </g>
            );
        })}
      </svg>

      {/* Decision Buttons */}
      {/* Fix: cast currentNode to DecisionNode as narrowing is sometimes lost in closures */}
      {!currentNode.isLeaf && (
          <div className="absolute bottom-6 flex gap-8">
              <button 
                onClick={() => traverse((currentNode as DecisionNode).yes)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                Yes
              </button>
              <button 
                onClick={() => traverse((currentNode as DecisionNode).no)}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-rose-200 transition-all active:scale-95"
              >
                No
              </button>
          </div>
      )}

      {currentNode.isLeaf && (
          <div className="absolute bottom-6">
              <button 
                onClick={() => setPath([0])}
                className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                🔄 Play Again
              </button>
          </div>
      )}
    </div>
  );
};

export default DecisionTreeVisual;