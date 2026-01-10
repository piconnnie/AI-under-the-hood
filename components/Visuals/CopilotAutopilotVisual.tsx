
import React, { useState } from 'react';

const CopilotAutopilotVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [autonomyLevel, setAutonomyLevel] = useState(0); // 0, 1, 2, 3

  const LEVELS = [
    { label: "Manual", role: "Driver", desc: "Human does everything. AI is absent.", icon: "🚗" },
    { label: "Copilot", role: "Assistant", desc: "Human drives. AI suggests routes/edits.", icon: "✈️" },
    { label: "Autopilot", role: "Supervisor", desc: "AI drives. Human watches and approves.", icon: "🛳️" },
    { label: "Agent", role: "Passenger", desc: "AI sets goals and executes. Human sleeps.", icon: "🚀" }
  ];

  const current = LEVELS[autonomyLevel];

  // Simulation Data
  const EMAIL_CONTENT = "Hi Team, here is the report.";
  const CO_SUGGESTION = " Would you like to add the Q3 chart?";
  const AGENT_LOGS = [
      "Scanning Inbox...", 
      "Found 'Report Request' from Boss", 
      "Generating Q3 Data...", 
      "Drafting Reply...", 
      "Email Sent."
  ];

  return (
    <div className="relative w-full h-[32rem] bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 flex flex-col p-6 shadow-inner font-sans">
      
      {/* Slider Control */}
      <div className="mb-8">
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 px-1">
              <span>Manual</span>
              <span>Copilot</span>
              <span>Autopilot</span>
              <span>Agent</span>
          </div>
          <input 
            type="range" 
            min="0" max="3" step="1"
            value={autonomyLevel} 
            onChange={(e) => setAutonomyLevel(parseInt(e.target.value))}
            className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 transition-all hover:bg-slate-300"
          />
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col sm:flex-row gap-6">
          
          {/* Left: Role Card */}
          <div className="w-full sm:w-1/3 bg-white border-2 border-slate-100 p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm">
              <div className="text-6xl mb-4 animate-[bounce_2s_infinite]">{current.icon}</div>
              <h3 className="text-2xl font-black text-slate-800 mb-1">{current.label}</h3>
              <div className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  Your Role: {current.role}
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {current.desc}
              </p>
          </div>

          {/* Right: Interaction Simulator */}
          <div className="flex-1 bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-2xl border border-slate-800">
              <div className="absolute top-0 left-0 w-full bg-slate-800 p-2 flex items-center gap-2 border-b border-slate-700">
                  <div className="flex gap-1.5 ml-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 ml-2">Task: Send_Email_Update</div>
              </div>

              {/* Screen Content based on Level */}
              <div className="flex-1 pt-8 font-mono text-sm text-slate-300">
                  {autonomyLevel === 0 && (
                      <div className="animate-enter">
                          <span className="text-white">User typing:</span> {EMAIL_CONTENT}<span className="animate-pulse">|</span>
                          <div className="mt-8 text-slate-500 italic text-xs">
                              (You are typing every character manually.)
                          </div>
                      </div>
                  )}

                  {autonomyLevel === 1 && (
                      <div className="animate-enter">
                          <span className="text-white">User typing:</span> {EMAIL_CONTENT}
                          <span className="text-indigo-400 bg-indigo-900/30 px-1 rounded mx-1 animate-pulse">{CO_SUGGESTION}</span>
                          <div className="mt-8 flex gap-2">
                              <div className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-400">
                                  Press <span className="font-bold text-white">TAB</span> to accept
                              </div>
                          </div>
                      </div>
                  )}

                  {autonomyLevel === 2 && (
                      <div className="animate-enter space-y-4">
                          <div className="p-3 border border-indigo-500/30 bg-indigo-900/10 rounded-lg relative">
                              <div className="absolute -top-3 left-3 px-1 bg-slate-900 text-[10px] text-indigo-400 font-bold uppercase">AI Draft</div>
                              <p className="text-indigo-100">"Hi Team, attaching the Q3 report as requested. Let me know if you need edits. Best, User."</p>
                          </div>
                          <div className="flex gap-3 justify-end">
                               <button className="px-4 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-500">Approve</button>
                               <button className="px-4 py-1.5 bg-slate-700 text-white rounded text-xs font-bold hover:bg-slate-600">Edit</button>
                          </div>
                      </div>
                  )}

                  {autonomyLevel === 3 && (
                      <div className="space-y-2 animate-enter">
                          {AGENT_LOGS.map((log, i) => (
                              <div key={i} className="flex items-center gap-2" style={{ animation: `fadeIn 0.5s ease-out ${i * 0.5}s forwards`, opacity: 0 }}>
                                  <span className="text-emerald-500">➜</span>
                                  <span>{log}</span>
                              </div>
                          ))}
                          <div className="mt-6 p-2 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-xs rounded text-center font-bold animate-pulse">
                              Task Completed Successfully
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default CopilotAutopilotVisual;
