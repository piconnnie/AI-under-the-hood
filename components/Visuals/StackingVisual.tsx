
import React from 'react';

const StackingVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col items-center justify-center p-6 shadow-2xl">
      {/* Level Label */}
      <div className="absolute top-4 left-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Layered Meta-Learning</div>

      <svg viewBox="0 0 400 240" className="w-full h-full">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>

        {/* Connections Layer 1 to Layer 2 */}
        <g stroke="#334155" strokeWidth="2" fill="none" className={isAnimating ? 'stroke-indigo-500/30' : ''}>
            <path d="M 80 80 L 200 160" />
            <path d="M 200 80 L 200 160" />
            <path d="M 320 80 L 200 160" />
        </g>

        {/* Animation Particles */}
        {isAnimating && (
            <g fill="#6366f1" filter="url(#glow)">
              <circle r="3">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 80 80 L 200 160" />
              </circle>
              <circle r="3">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 200 80 L 200 160" />
              </circle>
              <circle r="3">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 320 80 L 200 160" />
              </circle>
            </g>
        )}

        {/* Level 1: Weak Learners */}
        <g transform="translate(0, 40)">
            {/* Model A */}
            <g transform="translate(80, 0)">
                <rect x="-25" y="0" width="50" height="50" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" className={`transition-colors ${isAnimating ? 'stroke-indigo-500' : ''}`} />
                <text x="0" y="30" textAnchor="middle" fontSize="20">🌲</text>
                <text x="0" y="65" textAnchor="middle" className="text-[8px] font-black fill-slate-400 uppercase" style={{fontSize: '8px'}}>Expert A</text>
            </g>
            {/* Model B */}
            <g transform="translate(200, 0)">
                <rect x="-25" y="0" width="50" height="50" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" className={`transition-colors ${isAnimating ? 'stroke-indigo-500' : ''}`} />
                <text x="0" y="30" textAnchor="middle" fontSize="20">📈</text>
                <text x="0" y="65" textAnchor="middle" className="text-[8px] font-black fill-slate-400 uppercase" style={{fontSize: '8px'}}>Expert B</text>
            </g>
            {/* Model C */}
            <g transform="translate(320, 0)">
                <rect x="-25" y="0" width="50" height="50" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" className={`transition-colors ${isAnimating ? 'stroke-indigo-500' : ''}`} />
                <text x="0" y="30" textAnchor="middle" fontSize="20">📐</text>
                <text x="0" y="65" textAnchor="middle" className="text-[8px] font-black fill-slate-400 uppercase" style={{fontSize: '8px'}}>Expert C</text>
            </g>
        </g>

        {/* Level 2: Meta Model */}
        <g transform="translate(200, 160)">
            <rect x="-60" y="0" width="120" height="40" rx="20" fill={isAnimating ? '#4f46e5' : '#1e293b'} stroke={isAnimating ? '#818cf8' : '#334155'} strokeWidth="2" className="transition-colors duration-500" />
            <text x="0" y="15" textAnchor="middle" className="text-[8px] font-black fill-indigo-200 uppercase tracking-tighter" style={{fontSize: '8px'}}>Meta-Model</text>
            <text x="0" y="28" textAnchor="middle" className="text-[12px] font-black fill-white" style={{fontSize: '12px'}}>THE JUDGE</text>
        </g>

        {/* Output */}
        <g transform="translate(200, 220)" opacity={isAnimating ? 1 : 0} className="transition-opacity duration-1000">
             <text x="0" y="10" textAnchor="middle" fontSize="24">🎯</text>
        </g>

      </svg>
    </div>
  );
};

export default StackingVisual;
