
import React, { useState, useEffect, useRef } from 'react';

// Simplified Knowledge Base
const DOCUMENTS = [
  { 
    id: 'doc1', 
    title: 'Refund Policy', 
    content: 'Refunds are processed within 3-5 business days to original method.', 
    color: 'bg-rose-500',
    borderColor: 'border-rose-400',
    textColor: 'text-rose-100'
  },
  { 
    id: 'doc2', 
    title: 'Technical Support', 
    content: 'Restart the device. If issue persists, hold power button for 10s.', 
    color: 'bg-indigo-500',
    borderColor: 'border-indigo-400',
    textColor: 'text-indigo-100'
  },
  { 
    id: 'doc3', 
    title: 'Pricing Tiers', 
    content: 'Basic: $10/mo, Pro: $25/mo, Enterprise: Contact Sales.', 
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-100'
  }
];

const QUERIES = [
  { text: "How much is the Pro plan?", matchId: 'doc3', response: "The Pro plan costs $25 per month." },
  { text: "My screen is frozen.", matchId: 'doc2', response: "Try holding the power button for 10 seconds to force a restart." },
  { text: "When will I get my money back?", matchId: 'doc1', response: "Refunds typically take 3-5 business days." }
];

type Step = 'idle' | 'vectorizing' | 'searching' | 'augmenting' | 'generating';

const RAGVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [step, setStep] = useState<Step>('idle');
  const [activeQuery, setActiveQuery] = useState<typeof QUERIES[0] | null>(null);
  const [highlightedDoc, setHighlightedDoc] = useState<string | null>(null);
  const [contextContent, setContextContent] = useState<string | null>(null);
  
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-run simulation loop if isAnimating is true
  useEffect(() => {
      if (isAnimating && step === 'idle') {
          const timer = setTimeout(() => {
              const randomQ = QUERIES[Math.floor(Math.random() * QUERIES.length)];
              handleQuery(randomQ);
          }, 1500);
          return () => clearTimeout(timer);
      }
  }, [isAnimating, step]);

  const handleQuery = (q: typeof QUERIES[0]) => {
    if (step !== 'idle') return;
    
    setActiveQuery(q);
    setMessages(prev => [...prev, { role: 'user', text: q.text }]);
    setStep('vectorizing');
    setHighlightedDoc(null);
    setContextContent(null);

    // Sequence
    setTimeout(() => {
        setStep('searching');
        setTimeout(() => {
            setHighlightedDoc(q.matchId);
            setTimeout(() => {
                setStep('augmenting');
                const doc = DOCUMENTS.find(d => d.id === q.matchId);
                setTimeout(() => {
                    setContextContent(doc?.content || "");
                    setStep('generating');
                    setTimeout(() => {
                        setMessages(prev => [...prev, { role: 'bot', text: q.response }]);
                        setStep('idle');
                        setActiveQuery(null);
                    }, 1500);
                }, 1000);
            }, 1000);
        }, 1500);
    }, 1500);
  };

  return (
    <div className="w-full h-auto min-h-[40rem] bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 flex flex-col shadow-2xl relative">
      
      {/* --- TOP: RAG ENGINE --- */}
      <div className="flex-1 p-6 relative overflow-hidden flex flex-col min-h-[300px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 z-10 gap-2">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">RAG Engine Visualization</span>
             </div>
             <div className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {step === 'idle' && "Waiting for Query"}
                    {step === 'vectorizing' && "Step 1: Convert Text to Vector"}
                    {step === 'searching' && "Step 2: Similarity Search (Vector DB)"}
                    {step === 'augmenting' && "Step 3: Augment Prompt Context"}
                    {step === 'generating' && "Step 4: LLM Generation"}
                 </span>
             </div>
        </div>

        {/* Engine Components - Stacks on mobile, Row on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 relative z-10">
            
            {/* LEFT: Vector DB */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2 relative">
                <span className="text-[9px] font-black uppercase text-slate-500 text-center">Vector Database</span>
                <div className="flex flex-col gap-2">
                    {DOCUMENTS.map(doc => (
                        <div 
                            key={doc.id}
                            className={`p-3 rounded-xl border-2 transition-all duration-500 relative overflow-hidden ${
                                highlightedDoc === doc.id 
                                ? `${doc.borderColor} bg-slate-800 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]` 
                                : 'border-slate-800 bg-slate-800/50 opacity-60'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={`text-[10px] font-bold uppercase ${highlightedDoc === doc.id ? 'text-white' : 'text-slate-500'}`}>{doc.title}</span>
                                {/* Vector Representation */}
                                <div className="flex gap-0.5">
                                    {[1,2,3,4].map(i => <div key={i} className={`w-1 h-3 rounded-full ${doc.color} opacity-80`} />)}
                                </div>
                            </div>
                            <div className="text-[8px] text-slate-400 truncate">{doc.content}</div>
                            
                            {/* Search Scanner Effect */}
                            {step === 'searching' && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1s_infinite]" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* MIDDLE: Process Visualization */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center relative min-h-[100px]">
                
                {/* 1. Query Vector Flying */}
                <div 
                    className={`absolute transition-all duration-1000 ease-in-out flex flex-col items-center gap-2 z-20
                    ${step === 'vectorizing' ? 'opacity-100 scale-100 top-1/2 -translate-y-1/2' : ''}
                    ${step === 'searching' ? 'opacity-100 lg:top-10 top-0 scale-75' : ''}
                    ${['idle', 'augmenting', 'generating'].includes(step) ? 'opacity-0 scale-50 top-1/2' : ''}
                    `}
                >
                    <div className="bg-white text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold shadow-lg whitespace-nowrap mb-2 max-w-[200px] truncate">
                        {activeQuery?.text}
                    </div>
                    <div className="text-xl">⬇️</div>
                    <div className="flex gap-1 p-2 bg-slate-800 rounded-lg border border-slate-600">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-1.5 h-6 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />
                        ))}
                    </div>
                    <span className="text-[8px] font-bold text-indigo-400 uppercase bg-slate-900/80 px-2 rounded">Vector Embedding</span>
                </div>

                {/* 2. Document Flying to Context */}
                {step === 'augmenting' && highlightedDoc && (
                    <div className="absolute top-10 left-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
                         <div className={`p-4 rounded-xl bg-emerald-500 text-white shadow-2xl animate-[flyToContext_1s_ease-in-out_forwards] flex items-center gap-3`}>
                            <span className="text-xl">📄</span>
                            <div>
                                <div className="text-[10px] font-black uppercase">Relevant Context Found</div>
                                <div className="text-xs font-medium">Injecting into LLM...</div>
                            </div>
                         </div>
                    </div>
                )}

                {/* Arrow Flow Lines (Desktop Only) */}
                {step === 'searching' && (
                   <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
                       <path d="M 50 150 Q 100 150 100 50" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" fill="none" className="animate-[dash_1s_linear_infinite]" />
                   </svg>
                )}
            </div>

            {/* RIGHT: LLM Context Window */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2 relative">
                <span className="text-[9px] font-black uppercase text-slate-500 text-center">LLM Prompt Window</span>
                <div className={`flex-1 bg-slate-800 border-2 ${step === 'generating' ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-slate-700'} rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 min-h-[180px]`}>
                    
                    {/* System Prompt */}
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-600 opacity-60">
                        <span className="text-[8px] font-black text-slate-500 block">SYSTEM</span>
                        <div className="h-1 w-2/3 bg-slate-600 rounded"></div>
                    </div>

                    {/* Injected Context Slot */}
                    <div className={`p-2 rounded border border-dashed transition-all duration-500 ${contextContent ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-slate-900/30 border-slate-700'}`}>
                        <span className="text-[8px] font-black text-slate-500 block mb-1">RETRIEVED CONTEXT</span>
                        {contextContent ? (
                            <div className="text-[9px] text-emerald-300 font-mono leading-tight animate-[fadeIn_0.5s_ease-out]">
                                "{contextContent}"
                            </div>
                        ) : (
                            <div className="text-[8px] text-slate-600 italic">Waiting for search...</div>
                        )}
                    </div>

                    {/* User Prompt */}
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-600 mt-auto">
                        <span className="text-[8px] font-black text-slate-500 block mb-1">USER</span>
                        <div className="text-[9px] text-slate-300 truncate">{activeQuery?.text || "..."}</div>
                    </div>

                </div>
            </div>
        </div>
      </div>

      {/* --- BOTTOM: CHAT INTERFACE --- */}
      <div className="h-48 bg-white flex flex-col">
          {/* Message Area */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 scroll-smooth">
              {messages.length === 0 && (
                  <div className="text-center text-slate-400 text-xs mt-4">
                      Select a query below to start the RAG process.
                  </div>
              )}
              {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                          m.role === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                      }`}>
                          {m.text}
                      </div>
                  </div>
              ))}
              {step === 'generating' && (
                  <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl rounded-bl-none shadow-sm flex gap-1 items-center">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                  </div>
              )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {QUERIES.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuery(q)}
                        disabled={step !== 'idle'}
                        className="flex-shrink-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-xs font-bold text-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                          {q.text}
                      </button>
                  ))}
              </div>
          </div>
      </div>

      <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes dash {
            to { stroke-dashoffset: -20; }
        }
        @keyframes flyToContext {
            0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
            50% { transform: translate(50%, -20%) scale(0.8); opacity: 0.8; }
            100% { transform: translate(150px, 0) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default RAGVisual;
