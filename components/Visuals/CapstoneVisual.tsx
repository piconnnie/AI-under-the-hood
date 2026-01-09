import React, { useState } from 'react';

type ScenarioId = 'TMT' | 'RETAIL' | 'BFSI' | 'LSHC';

interface Stage {
  id: number;
  name: string;
  question: string;
  options: {
    text: string;
    feedback: string;
    score: number;
    outcome: string;
  }[];
}

interface Scenario {
  id: ScenarioId;
  icon: string;
  title: string;
  context: string;
  stages: Stage[];
}

const SCENARIOS: Record<ScenarioId, Scenario> = {
  TMT: {
    id: 'TMT',
    icon: '📱',
    title: "Streaming Retention Bot",
    context: "You are a PM at 'StreamMax'. Churn is high. Management wants to use AI to keep subscribers hooked.",
    stages: [
      {
        id: 1,
        name: "Strategy",
        question: "Two proposals are on your desk. Which one drives immediate retention?",
        options: [
          {
            text: "Generative AI: Auto-write new show scripts",
            feedback: "Too long-term. Even if it works, producing shows takes years. Won't stop churn now.",
            score: 0,
            outcome: "Cool demo, but subscribers continue to leave while you wait for scripts."
          },
          {
            text: "Predictive AI: 'At-Risk' User Identification",
            feedback: "Spot on. Identifying who is about to cancel allows for targeted discounts/content.",
            score: 10,
            outcome: "You identify 30% of churners before they leave."
          }
        ]
      },
      {
        id: 2,
        name: "Data Strategy",
        question: "To predict churn, you need features. Which data source do you prioritize?",
        options: [
          {
            text: "Explicit Data: User Surveys",
            feedback: "Weak signal. Users rarely fill surveys truthfully or at all.",
            score: 5,
            outcome: "Low coverage. You miss the silent majority of churners."
          },
          {
            text: "Implicit Data: Watch History & Pauses",
            feedback: "Strong signal. Behavior (stopping a show mid-episode) speaks louder than words.",
            score: 10,
            outcome: "High accuracy. The model detects boredom patterns instantly."
          }
        ]
      },
      {
        id: 3,
        name: "UX & Ethics",
        question: "The model flags a user as 'Bored'. How do you intervene?",
        options: [
          {
            text: "Auto-play a 'Guilty Pleasure' show",
            feedback: "Effective but aggressive. Can feel creepy or annoying (Dark Pattern).",
            score: 5,
            outcome: "Short-term engagement up, but trust down."
          },
          {
            text: "Nudge: 'We thought you might like...'",
            feedback: "Good balance. Respects user agency while leveraging the insight.",
            score: 10,
            outcome: "Users feel understood, not manipulated. Retention improves."
          }
        ]
      }
    ]
  },
  RETAIL: {
    id: 'RETAIL',
    icon: '🛍️',
    title: "The AI Stylist",
    context: "You are a PM at 'FashionForward'. Returns are killing margins. You need AI to help people buy the right clothes.",
    stages: [
      {
        id: 1,
        name: "Strategy",
        question: "Which feature tackles the 'Return Rate' problem best?",
        options: [
          {
            text: "Virtual Try-On (GenAI)",
            feedback: "High value. Letting users 'see' the fit reduces sizing errors.",
            score: 10,
            outcome: "Users love the magic. Confidence in purchase increases."
          },
          {
            text: "Aggressive Retargeting Ads",
            feedback: "Wrong metric. This increases sales but doesn't solve returns (might worsen them).",
            score: 0,
            outcome: "Sales go up, but so do returns. Margins stay flat."
          }
        ]
      },
      {
        id: 2,
        name: "Data Quality",
        question: "For Virtual Try-On, you need training images. What's the plan?",
        options: [
          {
            text: "Scrape Instagram Influencers",
            feedback: "Legal/Ethical nightmare. Plus, influencers pose perfectly, unlike real users.",
            score: 0,
            outcome: "Legal issues arise. The model fails on 'normal' body types."
          },
          {
            text: "Incentivize User Selfies",
            feedback: "Harder, but better. Real data ensures the model works for diverse bodies.",
            score: 10,
            outcome: "Robust model handling various lighting and body shapes."
          }
        ]
      },
      {
        id: 3,
        name: "UX Design",
        question: "The generated image looks 95% real but has minor artifacts. Ship it?",
        options: [
          {
            text: "Ship it as 'Beta' with a label",
            feedback: "Good. Managing expectations is key with GenAI.",
            score: 10,
            outcome: "Users forgive the glitches and appreciate the innovation."
          },
          {
            text: "Wait for 100% perfection",
            feedback: "Trap. GenAI is rarely perfect. You'll miss the market window.",
            score: 5,
            outcome: "Competitors launch first. You built a perfect tool nobody uses."
          }
        ]
      }
    ]
  },
  BFSI: {
    id: 'BFSI',
    icon: '🏦',
    title: "Automated Lending",
    context: "You are a PM at 'NeoBank'. Manual loan reviews are too slow. You want to automate approvals.",
    stages: [
      {
        id: 1,
        name: "Strategy",
        question: "Goal: Speed up approvals. Which approach?",
        options: [
          {
            text: "LLM Chatbot for applications",
            feedback: "Wrong tool. Chatbots hallucinate. You need deterministic risk scoring.",
            score: 0,
            outcome: "The bot promises loans you can't fund. Regulatory disaster."
          },
          {
            text: "Predictive Credit Scoring Model",
            feedback: "Correct. A classification model (Default vs Repay) is the industry standard.",
            score: 10,
            outcome: "Approval time drops from 3 days to 3 seconds."
          }
        ]
      },
      {
        id: 2,
        name: "Feature Engineering",
        question: "Your data scientist suggests using 'Zip Code' to improve accuracy. It correlates with wealth.",
        options: [
          {
            text: "Use it. Accuracy is everything.",
            feedback: "Illegal/Unethical. Zip code is a proxy for race/bias (Redlining).",
            score: 0,
            outcome: "Regulators audit you. Massive fine for bias."
          },
          {
            text: "Reject it. Too much bias risk.",
            feedback: "Wise. In Finance, fairness & compliance > marginal accuracy gains.",
            score: 10,
            outcome: "Model is slightly less accurate but compliant and fair."
          }
        ]
      },
      {
        id: 3,
        name: "Explainability (UX)",
        question: "A user is rejected. What do you show them?",
        options: [
          {
            text: "Generic Message: 'Based on our complex algo...'",
            feedback: "Bad UX. Users feel cheated by the 'Black Box'.",
            score: 0,
            outcome: "Support tickets spike. Users leave angry."
          },
          {
            text: "Explainable factors: 'Debt-to-Income too high'",
            feedback: "Excellent. Uses XAI (SHAP values) to give actionable feedback.",
            score: 10,
            outcome: "Users understand and apply again later. Trust built."
          }
        ]
      }
    ]
  },
  LSHC: {
    id: 'LSHC',
    icon: '🏥',
    title: "Radiology Assistant",
    context: "You are a PM at 'HealthAI'. Radiologists are burned out. You want to use Computer Vision (CNNs) to help.",
    stages: [
      {
        id: 1,
        name: "Strategy",
        question: "What is the product's value proposition?",
        options: [
          {
            text: "Autonomous Diagnosis (Replace Doctors)",
            feedback: "Dangerous. AI makes mistakes. Liability is too high.",
            score: 0,
            outcome: "Hospitals refuse to buy. Too risky."
          },
          {
            text: "Triage Assistant (Prioritize Urgent Scans)",
            feedback: "Smart. AI flags 'High Risk' scans for the doctor to review first.",
            score: 10,
            outcome: "Doctors love it. It saves lives by cutting wait times for critical cases."
          }
        ]
      },
      {
        id: 2,
        name: "Data Strategy",
        question: "You have 100k scans from one top-tier hospital. Is this enough?",
        options: [
          {
            text: "Yes, it's high quality data.",
            feedback: "No. It lacks diversity. It won't work on different machines or populations.",
            score: 5,
            outcome: "Model fails when deployed to rural clinics with older machines."
          },
          {
            text: "No, we need diverse sources.",
            feedback: "Correct. Generalization requires varied data (machines, demographics).",
            score: 10,
            outcome: "Model performs robustly across different hospital systems."
          }
        ]
      },
      {
        id: 3,
        name: "UX & Safety",
        question: "The model is 70% sure it's cancer. How do you display this?",
        options: [
          {
            text: "Big Red Alert: 'CANCER DETECTED'",
            feedback: "Too alarmist for low confidence. Creates 'Alert Fatigue'.",
            score: 5,
            outcome: "Doctors start ignoring the tool because of false alarms."
          },
          {
            text: "Subtle Highlight: 'Review Area (Confidence: Low)'",
            feedback: "Perfect. Keeps the human in the loop without panic.",
            score: 10,
            outcome: "Doctors use it as a 'second pair of eyes'."
          }
        ]
      }
    ]
  }
};

const CapstoneVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [industry, setIndustry] = useState<ScenarioId | null>(null);
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{text: string, outcome: string, score: number} | null>(null);

  const activeScenario = industry ? SCENARIOS[industry] : null;
  const currentStage = activeScenario ? activeScenario.stages[stage] : null;

  const handleIndustrySelect = (id: ScenarioId) => {
    setIndustry(id);
    setStage(0);
    setScore(0);
    setHistory([]);
    setFinished(false);
    setFeedback(null);
  };

  const handleChoice = (option: any) => {
    if (!currentStage || !activeScenario) return;
    setFeedback({ text: option.feedback, outcome: option.outcome, score: option.score });
    setScore(s => s + option.score);
    setHistory([...history, { stage: currentStage.name, choice: option.text, score: option.score }]);
  };

  const nextStage = () => {
    setFeedback(null);
    if (activeScenario && stage < activeScenario.stages.length - 1) {
      setStage(s => s + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setIndustry(null);
    setStage(0);
    setScore(0);
    setHistory([]);
    setFinished(false);
    setFeedback(null);
  };

  // 1. Industry Selection Screen
  if (!industry) {
    return (
        <div className="w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden border-4 border-slate-100 flex flex-col p-6 shadow-inner relative">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-slate-800">Select Your Domain</h2>
                <p className="text-slate-500 text-sm font-medium">Choose an industry to start the AI simulation.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 h-full overflow-y-auto pb-4 custom-scrollbar">
                {Object.values(SCENARIOS).map((s) => (
                    <button 
                        key={s.id}
                        onClick={() => handleIndustrySelect(s.id)}
                        className="bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all text-left group flex flex-col gap-2 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity text-6xl transform translate-x-2 -translate-y-2">
                            {s.icon}
                        </div>
                        <span className="text-3xl">{s.icon}</span>
                        <div>
                            <div className="font-black text-slate-700 group-hover:text-indigo-600 text-sm">{s.title}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.id}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
  }

  // 2. Finished Screen
  if (finished) {
    return (
      <div className="w-full h-full bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center justify-center text-white relative overflow-hidden border-4 border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />
        <div className="z-10 text-center space-y-6 animate-enter">
          <div className="text-6xl animate-bounce">
            {score >= 25 ? '🏆' : score >= 15 ? '📈' : '📚'}
          </div>
          <h2 className="text-2xl font-black">{activeScenario?.title} Complete</h2>
          <div className="text-xl">
             Final Score: <span className={score >= 25 ? "text-emerald-400" : "text-amber-400"}>{score} / 30</span>
          </div>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            {score >= 25 ? "You demonstrated excellent product judgment for this industry!" : "Good effort. Each industry has unique constraints. Try again!"}
          </p>
          <div className="flex gap-3 justify-center">
            <button 
                onClick={() => handleIndustrySelect(industry)}
                className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-colors text-xs uppercase tracking-widest"
            >
                Retry {industry}
            </button>
            <button 
                onClick={reset}
                className="px-6 py-3 bg-slate-700 rounded-xl font-bold hover:bg-slate-600 transition-colors text-xs uppercase tracking-widest"
            >
                Choose New Domain
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Game Screen
  if (!activeScenario || !currentStage) return null;

  return (
    <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden border-4 border-slate-100 flex flex-col relative shadow-inner">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center flex-shrink-0">
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1">
                   <button onClick={reset} className="hover:text-white transition-colors">← CHANGE</button>
                   <span>• {industry}</span>
                </div>
                <div className="font-bold text-sm">{activeScenario.title}</div>
            </div>
            <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Score</div>
                <div className="font-mono font-bold text-emerald-400">{score}</div>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center relative bg-slate-50 overflow-y-auto custom-scrollbar">
           {!feedback ? (
             <div className="w-full max-w-lg space-y-4 animate-enter my-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-[10px] font-black uppercase">Decision {stage + 1}/3</span>
                        <span className="text-slate-400 text-xs font-bold uppercase">{currentStage.name}</span>
                    </div>
                    {stage === 0 && (
                        <div className="mb-4 text-xs font-medium text-slate-500 bg-slate-100 p-2 rounded-lg italic">
                            Context: {activeScenario.context}
                        </div>
                    )}
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
             <div className="w-full max-w-lg space-y-6 animate-enter text-center my-auto">
                 <div className={`p-8 rounded-3xl border-4 ${feedback.score > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    <div className="text-4xl mb-4">{feedback.score > 0 ? '✅' : '⚠️'}</div>
                    <h3 className={`text-xl font-black mb-2 ${feedback.score > 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {feedback.score > 0 ? 'Strategic Move!' : 'Risky Choice'}
                    </h3>
                    <p className="text-slate-600 font-medium mb-4">{feedback.outcome}</p>
                    <div className="bg-white/60 p-4 rounded-xl text-xs font-bold text-slate-500 uppercase">
                        Expert Feedback: {feedback.text}
                    </div>
                 </div>
                 <button 
                    onClick={nextStage}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                 >
                    Next Stage →
                 </button>
             </div>
           )}
        </div>
    </div>
  );
};

export default CapstoneVisual;