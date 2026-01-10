
import React, { useState } from 'react';

const GainLiftVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [modelType, setModelType] = useState<'safe' | 'useful'>('safe');

  // Scenario: 20 Days. 
  // 17 Days = Sun (Normal)
  // 3 Days = Storm (Critical Event)
  const DAYS = Array.from({ length: 20 }, (_, i) => {
     // Days 4, 11, 18 are storms
     const isStorm = [4, 11, 18].includes(i);
     return { id: i, type: isStorm ? 'storm' : 'sun' };
  });

  const getPrediction = (dayType: string) => {
      if (modelType === 'safe') {
          // Safe model always predicts Sun. 
          // Accuracy: 17/20 = 85%. Utility: 0 (Misses all storms).
          return 'sun'; 
      } else {
          // Useful model tries to catch storms but has false alarms.
          // Predicts storm if it's a storm, but also randomly on 2 sunny days (false alarm)
          if (dayType === 'storm') return 'storm';
          // Simulate simple deterministic false alarms for visual stability
          // e.g. Day 2 and 15 are false alarms
          // We need to check day index, but here we only have type.
          // Let's hardcode false alarms in the render loop for stability.
          return 'sun'; 
      }
  };

  const calculateMetrics = () => {
      let correct = 0;
      let criticalCatches = 0;
      let falseAlarms = 0;

      DAYS.forEach((d) => {
          let pred = 'sun';
          if (modelType === 'safe') {
              pred = 'sun';
          } else {
              if (d.type === 'storm') pred = 'storm';
              if (d.id === 6 || d.id === 14) pred = 'storm'; // False alarms
          }

          if (pred === d.type) correct++;
          if (d.type === 'storm' && pred === 'storm') criticalCatches++;
          if (d.type === 'sun' && pred === 'storm') falseAlarms++;
      });

      return {
          accuracy: Math.round((correct / 20) * 100),
          recall: Math.round((criticalCatches / 3) * 100), // 3 storms total
          utilityScore: criticalCatches * 10 - falseAlarms * 2 // Arbitrary utility points
      };
  };

  const metrics = calculateMetrics();

  return (
    <div className="relative w-full min-h-[28rem] bg-white rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex flex-col p-6 shadow-inner font-sans">
      
      <div className="flex justify-between items-start mb-6">
          <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Concept: Accuracy vs Utility</div>
              <h3 className="text-xl font-black text-slate-800">The Weather Predictor</h3>
              <p className="text-xs text-slate-500 mt-1">Which model would you trust for a picnic?</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <button 
               onClick={() => setModelType('safe')}
               className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${modelType === 'safe' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
             >
               "Safe" Model
             </button>
             <button 
               onClick={() => setModelType('useful')}
               className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${modelType === 'useful' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
             >
               "Useful" Model
             </button>
          </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <div className="text-2xl font-black text-slate-800">{metrics.accuracy}%</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Accuracy</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <div className={`text-2xl font-black ${metrics.recall === 100 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {metrics.recall}%
              </div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Storms Caught</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center relative overflow-hidden">
               <div className={`absolute top-0 left-0 h-1 w-full ${metrics.utilityScore > 20 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              <div className="text-2xl font-black text-slate-800">{metrics.utilityScore > 20 ? 'High' : 'Low'}</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Real Utility</div>
          </div>
      </div>

      {/* Days Grid */}
      <div className="flex-1 grid grid-cols-5 sm:grid-cols-10 gap-2">
          {DAYS.map((d) => {
              let pred = 'sun';
              if (modelType === 'useful') {
                  if (d.type === 'storm') pred = 'storm';
                  if (d.id === 6 || d.id === 14) pred = 'storm';
              }

              const isCorrect = pred === d.type;
              const isCriticalMiss = d.type === 'storm' && pred === 'sun';
              const isFalseAlarm = d.type === 'sun' && pred === 'storm';

              return (
                  <div key={d.id} className="relative flex flex-col items-center group">
                      {/* Prediction Bubble */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-300 z-10 ${
                          isCorrect ? 'bg-white border-slate-200' : 
                          isCriticalMiss ? 'bg-rose-100 border-rose-500' : 
                          'bg-amber-100 border-amber-500' // False Alarm
                      }`}>
                          {pred === 'sun' ? '☀️' : '⛈️'}
                      </div>
                      
                      {/* Truth Line */}
                      <div className="h-4 w-0.5 bg-slate-200 my-1"></div>
                      
                      {/* Actual Event */}
                      <div className="text-xs opacity-50 grayscale group-hover:grayscale-0 transition-all">
                          {d.type === 'sun' ? '☀️' : '⛈️'}
                      </div>

                      {/* Tooltip */}
                      {isCriticalMiss && (
                          <div className="absolute -top-8 bg-rose-600 text-white text-[9px] px-2 py-1 rounded shadow-lg font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              Danger Missed!
                          </div>
                      )}
                      {isFalseAlarm && (
                          <div className="absolute -top-8 bg-amber-500 text-white text-[9px] px-2 py-1 rounded shadow-lg font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              False Alarm
                          </div>
                      )}
                  </div>
              );
          })}
      </div>

      {/* Explanation Footer */}
      <div className="mt-6 bg-slate-900 text-slate-300 p-4 rounded-xl text-xs leading-relaxed">
          {modelType === 'safe' ? (
              <p>
                  <strong className="text-white">Analysis:</strong> The "Safe" model has <b>85% accuracy</b> because it predicts "Sun" every day, and most days are sunny. But it is <b>useless</b> because it misses every storm. High accuracy ≠ High Value.
              </p>
          ) : (
              <p>
                  <strong className="text-white">Analysis:</strong> The "Useful" model has <b>lower accuracy</b> because it sometimes predicts storms when it's sunny (False Alarms). However, it catches <b>100% of storms</b>, making it infinitely more valuable to the user.
              </p>
          )}
      </div>

    </div>
  );
};

export default GainLiftVisual;
