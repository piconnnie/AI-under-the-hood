
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
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<{text: string, outcome: string, score: number} | null>(null);

  const activeScenario = industry ? SCENARIOS[industry] : null;
  const currentStage = activeScenario ? activeScenario.stages[stage] : null;

  const handleIndustrySelect = (id: ScenarioId) => {
    setIndustry(id);
    setStage(0);
    setScore(0);
    setFinished(false);
    setFeedback(null);
  };

  const handleChoice = (option: any) => {
    if (!currentStage || !activeScenario) return;
    setFeedback({ text: option.feedback, outcome: option.outcome, score: option.score });
    setScore(s => s + option.score);
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
    setFinished(false);
    setFeedback(null);
  };

  // 1. Industry Selection Screen
  if (!industry) {
    return (
        <div className="w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden border-4 border-slate-100 flex flex-col p-8 shadow-inner relative">
            <div className="text-center mb-6">
                <div className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-3 text-2xl">🏢</div>
                <h2 className="text-2xl font-black text-slate-800">AI Product Simulator</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Select an industry to face real-world trade-offs.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 overflow-y-auto custom-scrollbar p-1">
                {Object.values(SCENARIOS).map((s) => (
                    <button 
                        key={s.id}
                        onClick={() => handleIndustrySelect(s.id)}
                        className="relative bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/10 hover:shadow-xl transition-all text-left group flex flex-col justify-between overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity rotate-12 grayscale group-hover:grayscale-0">{s.icon}</div>
                        
                        <div className="relative z-10">
                            <span className="text-4xl mb-3 block filter drop-shadow-sm">{s.icon}</span>
                            <div className="font-black text-slate-800 text-lg group-hover:text-indigo-700 transition-colors">{s.title}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{s.id} Sector</div>
                        </div>
                        
                        <div className="relative z-10 mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                            Start Simulation <span>→</span>
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
        <div className="z-10 text-center space-y-6 animate-enter w-full max-w-md">
          <div className="text-7xl animate-bounce mb-4">
            {score >= 25 ? '🏆' : score >= 15 ? '📈' : '📚'}
          </div>
          <div>
            <h2 className="text-2xl font-black mb-2">{activeScenario?.title} Complete</h2>
            <div className="inline-block bg-slate-800 px-6 py-2 rounded-full border border-slate-700">
               <span className="text-slate-400 text-sm font-bold uppercase tracking-wider mr-2">Final Score</span>
               <span className={`text-xl font-black ${score >= 25 ? "text-emerald-400" : "text-amber-400"}`}>{score} / 30</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
            {score >= 25 ? "Outstanding! You balanced strategy, ethics, and technical feasibility perfectly." : "Good effort. Review the feedback to understand where the trade-offs led to suboptimal outcomes."}
          </p>
          
          <div className="grid grid-cols-2 gap-3 pt-4">
            <button 
                onClick={() => handleIndustrySelect(industry)}
                className="px-4 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-colors text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/50"
            >
                Retry Scenario
            </button>
            <button 
                onClick={reset}
                className="px-4 py-3 bg-slate-800 rounded-xl font-bold hover:bg-slate-700 transition-colors text-xs uppercase tracking-widest border border-slate-700"
            >
                Change Industry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Game Screen
  if (!activeScenario || !currentStage) return null;

  return (
    <div className="w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden border-4 border-slate-100 flex flex-col relative shadow-inner">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md z-20">
            <div className="flex items-center gap-3">
                <button onClick={reset} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{industry} Sector</div>
                    <div className="font-bold text-sm leading-none">{activeScenario.title}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Score</span>
                <span className="font-mono font-bold text-emerald-400">{score}</span>
            </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            
            {/* Progress Bar */}
            <div className="flex gap-2 mb-6 w-full max-w-2xl mx-auto">
                {[0, 1, 2].map(i => (
                    <div key={i} className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${i < stage ? 'bg-indigo-500' : i === stage ? 'bg-indigo-500 animate-pulse' : 'bg-transparent'}`} 
                            style={{ width: i <= stage ? '100%' : '0%' }}
                        />
                    </div>
                ))}
            </div>

            <div className="flex-1 flex flex-col justify-center w-full max-w-2xl mx-auto h-full">
                {!feedback ? (
                    <div className="space-y-6 animate-enter">
                        {/* Context Card */}
                        <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm flex gap-4 items-start">
                            <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                {activeScenario.icon}
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Mission Context</div>
                                <div className="text-sm text-slate-700 font-medium leading-relaxed">
                                    {activeScenario.context}
                                </div>
                            </div>
                        </div>

                        {/* Question Section */}
                        <div className="space-y-4">
                            <div className="text-center space-y-2 mb-2">
                                <span className="inline-block px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-full">Decision {stage+1}: {currentStage.name}</span>
                                <h3 className="text-xl font-bold text-slate-900">{currentStage.question}</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentStage.options.map((opt, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleChoice(opt)}
                                        className="relative p-6 bg-white border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 rounded-2xl transition-all text-left flex flex-col gap-3 group h-full shadow-sm hover:shadow-md"
                                    >
                                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-500 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-indigo-900 text-base pr-6">{opt.text}</span>
                                        <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 uppercase tracking-widest font-bold mt-auto">Select Option</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full animate-enter gap-8 py-4">
                        {/* Result Card */}
                        <div className={`w-full max-w-md p-8 rounded-3xl border-4 text-center shadow-xl relative overflow-hidden bg-white ${feedback.score > 0 ? 'border-emerald-100' : 'border-rose-100'}`}>
                            {/* Background decoration */}
                            <div className={`absolute top-0 left-0 w-full h-2 ${feedback.score > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            
                            <div className="text-6xl mb-6">{feedback.score > 0 ? '🎯' : '⚠️'}</div>
                            
                            <h3 className={`text-2xl font-black mb-3 ${feedback.score > 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
                                {feedback.score > 0 ? 'Strategic Success!' : 'Critical Error'}
                            </h3>
                            
                            <p className="text-slate-700 font-medium text-lg mb-6 leading-relaxed">
                                {feedback.outcome}
                            </p>
                            
                            <div className={`p-4 rounded-xl text-left flex gap-3 ${feedback.score > 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                                <div className="text-lg mt-0.5">💡</div>
                                <div>
                                    <span className={`font-bold uppercase text-[9px] block mb-1 opacity-70 ${feedback.score > 0 ? 'text-emerald-800' : 'text-rose-800'}`}>Expert Insight</span>
                                    <span className={`text-xs ${feedback.score > 0 ? 'text-emerald-900' : 'text-rose-900'}`}>{feedback.text}</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={nextStage}
                            className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 text-sm uppercase tracking-widest"
                        >
                            {stage < 2 ? "Next Challenge" : "View Final Results"} <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CapstoneVisual;
