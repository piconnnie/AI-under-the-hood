import React, { useState, useEffect } from 'react';

const EnsembleVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  // State for 3 trees: true = correct prediction, false = error
  const [votes, setVotes] = useState([true, false, true]);

  const toggleVote = (index: number) => {
    const newVotes = [...votes];
    newVotes[index] = !newVotes[index];
    setVotes(newVotes);
  };

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
        // Randomly flip votes to simulate different inputs/models
        // Bias towards correct (true) to show ensemble usually works
        setVotes([
            Math.random() > 0.3,
            Math.random() > 0.3,
            Math.random() > 0.3
        ]);
    }, 1200);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Majority vote logic
  const yesVotes = votes.filter(v => v).length;
  const finalOutcome = yesVotes >= 2;

  return (
    <div className="relative w-full h-72 bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col items-center justify-center p-6">
      
      <div className="absolute top-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        {isAnimating ? "Simulating Model Consensus..." : "Click trees to toggle their prediction"}
      </div>

      <div className="flex justify-around w-full mb-8 z-10">
        {votes.map((isCorrect, i) => (
          <button 
            key={i} 
            onClick={() => toggleVote(i)}
            disabled={isAnimating}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center relative transition-all duration-300 ${isCorrect ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-rose-900/20 border-rose-500/50'} ${isAnimating ? 'scale-110' : ''}`}>
              <span className="text-2xl filter drop-shadow-lg">🌲</span>
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 border-slate-900 transition-colors duration-300 ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isCorrect ? '✓' : '✗'}
              </div>
            </div>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Tree {i + 1}</span>
          </button>
        ))}
      </div>

      {/* Voting Pipes */}
      <div className="w-full h-12 relative flex justify-center mb-2">
         <div className="absolute top-0 w-[80%] h-0.5 bg-slate-800" />
         <div className="absolute top-0 left-[16%] w-0.5 h-8 bg-slate-800" />
         <div className="absolute top-0 left-[50%] w-0.5 h-8 bg-slate-800" />
         <div className="absolute top-0 right-[16%] w-0.5 h-8 bg-slate-800" />
         
         {/* Flow Animation */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2">
             <div className={`w-4 h-4 rounded-full animate-[ping_1s_infinite] ${finalOutcome ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`} style={{ animationDuration: '1.2s' }} />
         </div>
      </div>

      <div className="flex flex-col items-center">
        <div className={`w-32 h-12 rounded-xl flex items-center justify-center border-2 shadow-2xl transition-all duration-500 ${finalOutcome ? 'bg-emerald-600 border-emerald-400' : 'bg-rose-600 border-rose-400'}`}>
          <span className="text-white font-black text-xs uppercase tracking-widest">
            {finalOutcome ? 'Correct ✅' : 'Wrong ❌'}
          </span>
        </div>
        <div className="mt-4 text-[10px] font-bold text-slate-500">
            Majority Vote: {yesVotes} vs {3 - yesVotes}
        </div>
      </div>
    </div>
  );
};

export default EnsembleVisual;