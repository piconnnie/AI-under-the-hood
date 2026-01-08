import React, { useState } from 'react';

const CAPSTONE_SCENARIO = {
  title: "Case Study: The Legal Tech Disruptor",
  context: "You are a Senior PM at 'LegalEase', a startup with 6 months of runway. Your CEO wants to launch an AI feature to help lawyers draft contracts.",
  stages: [
    {
      id: 1,
      name: "Discovery & Strategy",
      question: "The CEO wants a 'One-click Contract Generator'. User research reveals lawyers don't trust auto-generated drafts. What do you build?",
      options: [
        {
          id: 'A',
          text: "Build the Generator (CEO's Vision)",
          feedback: "Risky. Lawyers won't use a tool they don't trust. High churn risk.",
          score: 0,
          outcome: "The product launches but lawyers ignore it. Churn is high."
        },
        {
          id: 'B',
          text: "Pivot: 'Smart Clause Search' (RAG)",
          feedback: "Excellent. Solves the 'Trust' problem. High-value, low-risk start.",
          score: 10,
          outcome: "Lawyers love finding old clauses instantly. Engagement soars."
        }
      ]
    },
    {
      id: 2,
      name: "Data Strategy",
      question: "You need data for the Smart Clause Search. Engineering suggests training on public internet legal data (Common Crawl) to save money.",
      options: [
        {
          id: 'A',
          text: "Use Public Data (Cheap)",
          feedback: "Poor choice. Generic contracts are low quality. No competitive advantage.",
          score: 0,
          outcome: "The AI suggests irrelevant clauses. Lawyers complain it's 'amateur'."
        },
        {
          id: 'B',
          text: "Ingest Firm's Private Archives",
          feedback: "Correct. Your 'Data Moat' is the firm's specific, high-quality data.",
          score: 10,
          outcome: "The search results are perfectly tailored to the firm's style."
        }
      ]
    },
    {
      id: 3,
      name: "Risk & UX",
      question: "The prototype sometimes retrieves outdated clauses. How do you handle this in the UI?",
      options: [
        {
          id: 'A',
          text: "Filter low-confidence results silently",
          feedback: "Confusing. Users might think the system is broken if nothing appears.",
          score: 5,
          outcome: "Users are unsure if the tool is working or just empty."
        },
        {
          id: 'B',
          text: "Show clause with 'Source & Date' citation",
          feedback: "Perfect. This is 'Explainability'. The lawyer can verify the context.",
          score: 10,
          outcome: "Lawyers catch outdated clauses easily and trust the tool more."
        }
      ]
    }
  ]
};

const CapstoneVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{text: string, outcome: string, score: number} | null>(null);

  const currentStage = CAPSTONE_SCENARIO.stages[stage];

  const handleChoice = (option: any) => {
    setFeedback({ text: option.feedback, outcome: option.outcome, score: option.score });
    setScore(s => s + option.score);
    setHistory([...history, { stage: currentStage.name, choice: option.text, score: option.score }]);
  };

  const nextStage = () => {
    setFeedback(null);
    if (stage < CAPSTONE_SCENARIO.stages.length - 1) {
      setStage(s => s + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStage(0);
    setScore(0);
    setHistory([]);
    setFinished(false);
    setFeedback(null);
  };

  if (finished) {
    return (
      <div className="w-full h-full bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center justify-center text-white relative overflow-hidden border-4 border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />
        <div className="z-10 text-center space-y-6">
          <div className="text-6xl animate-bounce">
            {score >= 25 ? '🏆' : score >= 15 ? '👏' : '📚'}
          </div>
          <h2 className="text-3xl font-black">Simulation Complete</h2>
          <div className="text-xl">
             Final Score: <span className={score >= 25 ? "text-emerald-400" : "text-amber-400"}>{score} / 30</span>
          </div>
          <p className="text-slate-400 max-w-md mx-auto">
            {score >= 25 ? "You're a strategic AI Product Leader!" : "Good effort. Review the concepts to improve your strategy."}
          </p>
          <button 
            onClick={restart}
            className="px-8 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-colors"
          >
            Replay Simulation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden border-4 border-slate-100 flex flex-col relative shadow-inner">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Capstone Project</div>
                <div className="font-bold text-sm">{CAPSTONE_SCENARIO.title}</div>
            </div>
            <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Runway</div>
                <div className="font-mono font-bold text-emerald-400">{6 - stage} Months</div>
            </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center relative bg-slate-50">
           {!feedback ? (
             <div className="w-full max-w-lg space-y-6 animate-enter">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-[10px] font-black uppercase">Decision {stage + 1}/3</span>
                        <span className="text-slate-400 text-xs font-bold uppercase">{currentStage.name}</span>
                    </div>
                    <p className="text-slate-800 font-medium text-lg leading-snug">
                        {currentStage.question}
                    </p>
                </div>
                
                <div className="grid gap-3">
                    {currentStage.options.map((opt, i) => (
                        <button 
                            key={i}
                            onClick={() => handleChoice(opt)}
                            className="text-left p-4 bg-white border-2 border-slate-200 hover:border-indigo-500 hover:shadow-md rounded-xl transition-all group"
                        >
                            <span className="font-bold text-slate-700 group-hover:text-indigo-700">{opt.text}</span>
                        </button>
                    ))}
                </div>
             </div>
           ) : (
             <div className="w-full max-w-lg space-y-6 animate-enter text-center">
                 <div className={`p-8 rounded-3xl border-4 ${feedback.score > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    <div className="text-4xl mb-4">{feedback.score > 0 ? '✅' : '⚠️'}</div>
                    <h3 className={`text-xl font-black mb-2 ${feedback.score > 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {feedback.score > 0 ? 'Good Choice!' : 'Risky Move'}
                    </h3>
                    <p className="text-slate-600 font-medium mb-4">{feedback.outcome}</p>
                    <div className="bg-white/60 p-4 rounded-xl text-sm font-medium text-slate-500">
                        Using Concept: {feedback.text}
                    </div>
                 </div>
                 <button 
                    onClick={nextStage}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                 >
                    Next Challenge →
                 </button>
             </div>
           )}
        </div>
    </div>
  );
};

export default CapstoneVisual;