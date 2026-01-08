import React from 'react';

const Diagrams: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'ai-landscape':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full p-8">
           <g transform="translate(40, 40)">
              <rect width="120" height="120" rx="20" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="30" textAnchor="middle" className="text-[10px] font-black fill-blue-700">PREDICTIVE AI</text>
              <text x="60" y="75" textAnchor="middle" className="text-[30px]">📊</text>
              <text x="60" y="100" textAnchor="middle" className="text-[8px] font-bold fill-blue-500 uppercase tracking-tighter">Logic & Stats</text>
           </g>
           <g transform="translate(240, 40)">
              <rect width="120" height="120" rx="20" fill="#f5f3ff" stroke="#a855f7" strokeWidth="2" />
              <text x="60" y="30" textAnchor="middle" className="text-[10px] font-black fill-purple-700">GENERATIVE AI</text>
              <text x="60" y="75" textAnchor="middle" className="text-[30px]">🎨</text>
              <text x="60" y="100" textAnchor="middle" className="text-[8px] font-bold fill-purple-500 uppercase tracking-tighter">Creation & Magic</text>
           </g>
           <text x="200" y="200" textAnchor="middle" className="text-[10px] font-black fill-slate-400 uppercase tracking-[0.2em]">The Two Main Paths</text>
        </svg>
      );
    case 'llm-rag':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full p-8">
           <rect x="50" y="50" width="80" height="100" rx="20" fill="white" stroke="#e2e8f0" />
           <text x="90" y="100" textAnchor="middle" className="text-[30px]">👤</text>
           <text x="90" y="130" textAnchor="middle" className="text-[8px] font-black uppercase text-slate-400">User</text>

           <path d="M 140 80 L 180 80" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow)" />
           
           <rect x="190" y="40" width="100" height="120" rx="24" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
           <text x="240" y="70" textAnchor="middle" className="text-[10px] font-black fill-orange-700">RAG SYSTEM</text>
           <text x="240" y="100" textAnchor="middle" className="text-[20px]">📚 + 🤖</text>
           <text x="240" y="125" textAnchor="middle" className="text-[8px] font-bold fill-orange-500">Retrieval</text>
           
           <path d="M 300 80 L 340 80" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow)" />
           
           <text x="360" y="85" textAnchor="middle" className="text-[20px]">💬</text>
           
           <defs>
             <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="5" orient="auto">
               <path d="M 0 0 L 8 4 L 0 8 z" fill="#f97316" />
             </marker>
           </defs>
        </svg>
      );
    case 'value-matrix':
        return (
            <svg viewBox="0 0 400 240" className="w-full h-full p-8">
                <line x1="50" y1="200" x2="350" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="50" y1="200" x2="50" y2="20" stroke="#cbd5e1" strokeWidth="2" />
                <text x="200" y="230" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 uppercase">Feasibility</text>
                <text x="20" y="110" textAnchor="middle" transform="rotate(-90, 20, 110)" className="text-[10px] font-bold fill-slate-500 uppercase">User Value</text>
                
                <rect x="200" y="20" width="150" height="90" fill="#dcfce7" rx="10" />
                <text x="275" y="60" textAnchor="middle" className="text-[10px] font-black fill-emerald-600">SWEET SPOT</text>
                <text x="275" y="75" textAnchor="middle" className="text-[8px] font-bold fill-emerald-500">High Value / High Feasibility</text>

                <rect x="50" y="110" width="150" height="90" fill="#fee2e2" rx="10" />
                <text x="125" y="150" textAnchor="middle" className="text-[10px] font-black fill-rose-600">TRAP</text>
                <text x="125" y="165" textAnchor="middle" className="text-[8px] font-bold fill-rose-500">Low Value / Low Feasibility</text>
            </svg>
        );
    case 'wizard-of-oz':
        return (
            <svg viewBox="0 0 400 240" className="w-full h-full p-8">
                <rect x="80" y="60" width="240" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                <rect x="90" y="70" width="100" height="100" rx="4" fill="#f1f5f9" />
                <text x="140" y="125" textAnchor="middle" className="text-3xl">🤖</text>
                <text x="140" y="150" textAnchor="middle" className="text-[8px] font-black uppercase fill-slate-400">Front End</text>
                
                <line x1="190" y1="120" x2="210" y2="120" stroke="#94a3b8" strokeDasharray="4" />
                
                <rect x="210" y="70" width="100" height="100" rx="4" fill="#fff7ed" stroke="#fdba74" strokeDasharray="4" />
                <text x="260" y="125" textAnchor="middle" className="text-3xl">👨‍💻</text>
                <text x="260" y="150" textAnchor="middle" className="text-[8px] font-black uppercase fill-orange-500">Human (Hidden)</text>
                
                <text x="200" y="210" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">Validating without building the AI</text>
            </svg>
        );
    case 'rice-ai':
        return (
             <svg viewBox="0 0 400 240" className="w-full h-full p-8">
                 <text x="200" y="40" textAnchor="middle" className="text-[12px] font-black fill-slate-700">RICE SCORE FORMULA</text>
                 <rect x="50" y="60" width="300" height="80" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
                 
                 <text x="200" y="95" textAnchor="middle" className="text-[14px] font-mono font-bold fill-indigo-600">
                    (Reach × Impact × Confidence) / Effort
                 </text>
                 
                 <path d="M 230 105 L 230 130" stroke="#f43f5e" strokeWidth="2" />
                 <text x="230" y="145" textAnchor="middle" className="text-[9px] font-black fill-rose-500 uppercase">Crucial for AI</text>
                 <text x="230" y="155" textAnchor="middle" className="text-[8px] font-medium fill-slate-400">Do we have data?</text>
             </svg>
        );
    case 'ai-lifecycle':
        return (
            <svg viewBox="0 0 400 240" className="w-full h-full p-8">
                <circle cx="200" cy="120" r="80" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                
                <g transform="translate(200, 40)">
                    <circle r="20" fill="#dbeafe" />
                    <text y="5" textAnchor="middle" className="text-xl">📊</text>
                    <text y="-25" textAnchor="middle" className="text-[8px] font-black uppercase fill-blue-500">Data</text>
                </g>
                <g transform="translate(280, 120)">
                    <circle r="20" fill="#f3e8ff" />
                    <text y="5" textAnchor="middle" className="text-xl">🧠</text>
                    <text x="30" y="5" className="text-[8px] font-black uppercase fill-purple-500">Train</text>
                </g>
                <g transform="translate(200, 200)">
                    <circle r="20" fill="#d1fae5" />
                    <text y="5" textAnchor="middle" className="text-xl">🚀</text>
                    <text y="35" textAnchor="middle" className="text-[8px] font-black uppercase fill-emerald-500">Deploy</text>
                </g>
                <g transform="translate(120, 120)">
                    <circle r="20" fill="#fee2e2" />
                    <text y="5" textAnchor="middle" className="text-xl">📉</text>
                    <text x="-30" y="5" textAnchor="end" className="text-[8px] font-black uppercase fill-rose-500">Monitor</text>
                </g>
                
                <path d="M 225 50 Q 300 50 290 100" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 290 140 Q 300 200 225 200" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 175 200 Q 100 200 110 140" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 110 100 Q 100 50 175 50" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
        );
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-300">
          <span className="text-6xl mb-4 opacity-20">🎨</span>
          <p className="font-black uppercase tracking-widest text-[10px]">{id} Diagram</p>
        </div>
      );
  }
};

export default Diagrams;