import React, { useState } from 'react';

const EthicsVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [balancedData, setBalancedData] = useState(false);
  const [results, setResults] = useState<{male: number, female: number} | null>(null);
  const [processing, setProcessing] = useState(false);

  // Mock candidates
  const candidates = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      gender: i < 14 ? 'male' : 'female', // 70% male in biased set
      skill: Math.random() * 100
  }));

  const runSimulation = () => {
    setProcessing(true);
    setResults(null);
    
    setTimeout(() => {
        // Logic: If unbalanced, model overweights "Male" traits due to historical bias
        // If balanced, model looks purely at "Skill"
        let hiredMale = 0;
        let hiredFemale = 0;

        if (!balancedData) {
            // Biased Model
            hiredMale = 8;
            hiredFemale = 1;
        } else {
            // Fair Model
            hiredMale = 5;
            hiredFemale = 4;
        }

        setResults({ male: hiredMale, female: hiredFemale });
        setProcessing(false);
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-[26rem] h-auto bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col p-6 shadow-inner">
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scenario</div>
                  <div className="font-bold text-slate-800">AI Hiring Manager</div>
              </div>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => { setBalancedData(false); setResults(null); }}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${!balancedData ? 'bg-rose-500 text-white shadow-md' : 'text-slate-500'}`}
              >
                Biased
              </button>
              <button 
                onClick={() => { setBalancedData(true); setResults(null); }}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${balancedData ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500'}`}
              >
                Fair
              </button>
          </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Training Data View */}
          <div className="w-full sm:w-1/3 bg-slate-50 rounded-xl border border-slate-100 p-3 flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase mb-2">Training Set</span>
              <div className="flex flex-wrap content-start gap-1 flex-1">
                  {(balancedData ? Array.from({ length: 20 }) : candidates).map((_, i) => {
                      // Visual representation of dataset balance
                      const isMale = balancedData ? i % 2 === 0 : i < 14; 
                      return (
                          <div key={i} className={`w-3 h-3 rounded-full ${isMale ? 'bg-blue-400' : 'bg-purple-400'}`} />
                      );
                  })}
              </div>
              <div className="mt-2 text-[9px] font-bold text-slate-500">
                  {balancedData ? "50% Men / 50% Women" : "70% Men / 30% Women"}
              </div>
          </div>

          {/* Process Arrow */}
          <div className="flex flex-col justify-center items-center py-2 sm:py-0">
              <button 
                onClick={runSimulation}
                disabled={processing}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-all active:scale-95 ${processing ? 'bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                {processing ? '⚙️' : '▶'}
              </button>
          </div>

          {/* Results View */}
          <div className="flex-1 bg-white border-2 border-slate-100 rounded-xl p-4 flex flex-col justify-center items-center relative overflow-hidden min-h-[140px]">
              {results ? (
                  <div className="w-full space-y-4 animate-enter">
                      <div>
                          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                              <span>Men Hired</span>
                              <span>{results.male}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: `${(results.male / 9) * 100}%` }} />
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                              <span>Women Hired</span>
                              <span>{results.female}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: `${(results.female / 9) * 100}%` }} />
                          </div>
                      </div>
                      <div className={`mt-4 text-center text-xs font-black uppercase px-3 py-1 rounded-lg ${balancedData ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {balancedData ? "Result: Fair Outcome" : "Result: Gender Bias Detected"}
                      </div>
                  </div>
              ) : (
                  <div className="text-center text-slate-300">
                      <div className="text-4xl mb-2">📊</div>
                      <span className="text-[10px] font-black uppercase">Run Simulation to see impact</span>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default EthicsVisual;