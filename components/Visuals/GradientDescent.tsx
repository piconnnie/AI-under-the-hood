import React, { useState, useEffect, useRef } from 'react';

const GradientDescent: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [ballX, setBallX] = useState(60);
  const [learningRate, setLearningRate] = useState(0.1);
  const [step, setStep] = useState(0);
  const animationRef = useRef<number>(0);

  // Parabola function approximation for the visual path: y = a(x-h)^2 + k
  // Vertex (h, k) approx at (200, 185)
  // Passes through (40, 40)
  const calculateY = (x: number) => {
    const h = 200;
    const k = 185;
    const a = (40 - k) / Math.pow(40 - h, 2); // approx -0.00566
    return a * Math.pow(x - h, 2) + k;
  };

  const calculateGradient = (x: number) => {
    // Derivative of a(x-h)^2 + k is 2a(x-h)
    const h = 200;
    const k = 185;
    const a = (40 - k) / Math.pow(40 - h, 2);
    return 2 * a * (x - h);
  };

  const stepDescent = () => {
    setBallX(prevX => {
      const gradient = calculateGradient(prevX);
      // Determine direction based on gradient (slope)
      // We want to go opposite to slope. 
      // Visual scaling: The gradient value is small, so we multiply by a factor for visual effect
      const move = gradient * learningRate * 5000; 
      
      let newX = prevX - move;
      
      // Boundaries
      if (newX < 40) newX = 40;
      if (newX > 360) newX = 360;
      
      // Stop if close to bottom
      if (Math.abs(newX - 200) < 1) return 200;
      
      return newX;
    });
    setStep(s => s + 1);
  };

  useEffect(() => {
    if (isAnimating) {
      const loop = () => {
        stepDescent();
        animationRef.current = requestAnimationFrame(loop);
      };
      loop();
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAnimating, learningRate]);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Constrain to curve width roughly
    if (x >= 40 && x <= 360) {
      setBallX(x);
      setStep(0);
    }
  };

  const ballY = calculateY(ballX);

  return (
    <div className="relative w-full h-80 bg-slate-50 rounded-[3rem] overflow-hidden border-4 border-slate-100 shadow-inner flex flex-col">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm w-48">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
          Learning Rate: {learningRate.toFixed(2)}
        </label>
        <input 
          type="range" 
          min="0.01" 
          max="0.5" 
          step="0.01" 
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-bold">
          <span>Cautious</span>
          <span>Reckless</span>
        </div>
      </div>

      <div className="absolute top-4 left-8 pointer-events-none">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Step: {step}
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Loss: {(185 - ballY).toFixed(1)}
          </div>
      </div>

      <svg 
        className="w-full h-full p-8 cursor-crosshair" 
        viewBox="0 0 400 240"
        onClick={handleSvgClick}
      >
        {/* The Main Loss Valley Path - Visual only, math approximated above */}
        <path 
          d="M 40 40 Q 200 330 360 40" 
          fill="none" 
          stroke="#cbd5e1" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeOpacity="0.5"
        />

        {/* The Goal */}
        <g transform="translate(200, 185)">
            <circle r="6" fill="#10b981" />
            <text y="20" textAnchor="middle" className="text-[8px] font-black fill-emerald-600 uppercase tracking-tighter">Minima</text>
        </g>

        {/* The Ball */}
        <g transform={`translate(${ballX}, ${ballY})`} className="transition-transform duration-100 ease-linear">
             <line x1="-15" y1="0" x2="0" y2="0" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.3" transform={`rotate(${ballX < 200 ? 45 : -45})`} />
             <circle r="12" fill="#6366f1" stroke="white" strokeWidth="3" className="shadow-xl" />
        </g>
        
        {/* Helper Text */}
        {!isAnimating && (
          <text x="200" y="220" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold opacity-50">Click anywhere on the curve to place the ball</text>
        )}
      </svg>
    </div>
  );
};

export default GradientDescent;