
import React, { useState, useEffect } from 'react';

type Category = 'STRATEGY' | 'DISCOVERY' | 'DEFINITION' | 'GTM';

interface PromptTemplate {
  title: string;
  icon: string;
  template: string;
  outputPreview: string;
}

const TOOLBOX: Record<Category, PromptTemplate[]> = {
  STRATEGY: [
    {
      title: "Draft OKRs",
      icon: "🎯",
      template: "Act as a CPO. Based on our company goal to [Goal: e.g., Increase Retention], draft 3 Objectives and 3 Key Results (OKRs) for the Product Team. Ensure KRs are measurable, time-bound, and ambitious but realistic.",
      outputPreview: "Objective 1: Maximize User Value...\nKR 1: Increase WAU by 15%.\nKR 2: Reduce churn to <2%..."
    },
    {
      title: "Competitive Analysis",
      icon: "⚔️",
      template: "Analyze the competitive landscape for [Product Category]. Compare [My Product] vs [Competitor A] and [Competitor B]. Create a table comparing Pricing, Core Features, and UX nuances. Identify one 'Blue Ocean' opportunity.",
      outputPreview: "| Feature | Us | Comp A | Comp B |\n|---------|----|--------|--------|\n| Pricing | $$ | $$$    | $      |\n\nOpportunity: No one is addressing..."
    },
    {
      title: "Pre-Mortem",
      icon: "💀",
      template: "Imagine it is one year from now and our launch of [Feature Name] was a total disaster. List 10 detailed reasons why it failed, focusing on risks we might be ignoring today. Prioritize by likelihood.",
      outputPreview: "1. Integration Complexity: API latency was too high.\n2. User Apathy: The problem wasn't urgent enough.\n3. Sales Misalignment..."
    }
  ],
  DISCOVERY: [
    {
      title: "Synthetic User Interview",
      icon: "🤖",
      template: "Act as a [Persona: e.g., Busy HR Manager] who is frustrated with [Current Problem]. I am going to interview you about your pain points. Please answer candidly, staying in character. Start by telling me about your day.",
      outputPreview: "*Sigh* Well, I spend half my morning just sorting resumes manually. It's a nightmare because..."
    },
    {
      title: "Summarize Feedback",
      icon: "📝",
      template: "Here are 20 raw user transcripts [Paste Text]. \n1. Summarize the top 3 recurring pain points.\n2. Extract 5 direct quotes that represent strong emotion.\n3. Suggest 1 feature that would solve the majority of complaints.",
      outputPreview: "Top Pain Point: Navigation confusion.\nQuote: 'I literally can't find the settings button.'\nSuggestion: Global Search Bar."
    },
    {
      title: "JTBD Framework",
      icon: "🥛",
      template: "Convert the following feature request list into Jobs-To-Be-Done (JTBD) format using the structure: 'When I [Situation], I want to [Motivation], so that I can [Outcome]'. \n[Insert Features]",
      outputPreview: "1. When I am commuting, I want to edit docs offline, so that I don't lose productivity..."
    }
  ],
  DEFINITION: [
    {
      title: "Draft PRD",
      icon: "📄",
      template: "Write a Product Requirement Document (PRD) for [Feature Name]. Include sections for: Problem Statement, User Stories, Functional Requirements, Non-Functional Requirements (Latency/Security), and Success Metrics.",
      outputPreview: "# PRD: Magic Search\n## Problem\nUsers spend 10s finding files.\n\n## Requirements\n- FR1: Search must support fuzzy matching.\n- NFR1: Results in <200ms."
    },
    {
      title: "User Stories",
      icon: "📖",
      template: "Generate 5 User Stories for [Feature] with Acceptance Criteria (Gherkin syntax: Given/When/Then). Focus on edge cases.",
      outputPreview: "Story 1: As an Admin...\nScenario: Invalid Login\nGiven I am on the login page\nWhen I enter wrong password 3 times\nThen lock account for 5 mins."
    },
    {
      title: "SQL Generator",
      icon: "💾",
      template: "I have a table 'users' (id, email, signup_date) and 'orders' (id, user_id, amount). Write a SQL query to find the average LTV of users who signed up in 2023.",
      outputPreview: "SELECT AVG(total_spend) \nFROM (\n  SELECT user_id, SUM(amount) \n  FROM orders..."
    }
  ],
  GTM: [
    {
      title: "Release Notes",
      icon: "📢",
      template: "Write release notes for version 2.0. \nAudience: Non-technical users. \nTone: Exciting and friendly. \nKey changes: [List Features]. \nUse emojis.",
      outputPreview: "🎉 Version 2.0 is here!\n\n✨ Dark Mode: Easy on the eyes.\n🚀 2x Speed: We re-wrote the backend.\n\nUpdate now!"
    },
    {
      title: "Value Prop Canvas",
      icon: "🎨",
      template: "Create a Value Proposition Canvas for [Customer Segment]. List their Pains, Gains, and Customer Jobs, then map our [Product Features] to Pain Relievers and Gain Creators.",
      outputPreview: "Customer Job: Payroll.\nPain: Compliance fears.\nPain Reliever: Auto-Tax Calculation Engine."
    },
    {
      title: "FAQ Generator",
      icon: "❓",
      template: "Based on this feature description [Paste Desc], generate the top 5 questions a confused user might ask, and write clear, empathetic answers.",
      outputPreview: "Q: Will I lose my data?\nA: No! We automatically back up everything before the migration."
    }
  ]
};

const DayToDayVisual: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('STRATEGY');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate>(TOOLBOX['STRATEGY'][0]);
  const [simulatedOutput, setSimulatedOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset when category changes
    setSelectedPrompt(TOOLBOX[activeCategory][0]);
    setSimulatedOutput("");
    setIsTyping(false);
  }, [activeCategory]);

  const handleSimulate = () => {
    setIsTyping(true);
    setSimulatedOutput("");
    let i = 0;
    const text = selectedPrompt.outputPreview;
    const interval = setInterval(() => {
        setSimulatedOutput(text.slice(0, i + 1));
        i++;
        if (i > text.length) {
            clearInterval(interval);
            setIsTyping(false);
        }
    }, 20); // Typing speed
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedPrompt.template);
  };

  return (
    <div className="relative w-full min-h-[36rem] bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 dark:border-slate-800 flex flex-col shadow-inner transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
              <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">The AI PM Toolbox</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Day-to-Day Workflows</h3>
          </div>
          <div className="hidden sm:flex gap-2">
             {(Object.keys(TOOLBOX) as Category[]).map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                 >
                    {cat}
                 </button>
             ))}
          </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
          
          {/* LEFT: Prompt Selector */}
          <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto custom-scrollbar">
              <div className="sm:hidden flex gap-2 overflow-x-auto mb-4 pb-2">
                 {(Object.keys(TOOLBOX) as Category[]).map(cat => (
                     <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500'}`}
                     >
                        {cat}
                     </button>
                 ))}
              </div>
              
              <div className="space-y-3">
                  {TOOLBOX[activeCategory].map((p, i) => (
                      <button 
                        key={i}
                        onClick={() => { setSelectedPrompt(p); setSimulatedOutput(""); setIsTyping(false); }}
                        className={`w-full p-4 rounded-xl text-left border-2 transition-all group ${selectedPrompt.title === p.title ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md' : 'bg-white dark:bg-slate-800 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800'}`}
                      >
                          <div className="flex items-center gap-3">
                              <span className="text-2xl group-hover:scale-110 transition-transform">{p.icon}</span>
                              <div>
                                  <div className={`font-bold text-sm ${selectedPrompt.title === p.title ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200'}`}>{p.title}</div>
                                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">Click to load template</div>
                              </div>
                          </div>
                      </button>
                  ))}
              </div>
          </div>

          {/* RIGHT: Workspace */}
          <div className="flex-1 p-6 flex flex-col bg-slate-100 dark:bg-slate-950">
              
              {/* Prompt Box */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Input Prompt Template</span>
                      <button onClick={copyToClipboard} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 active:scale-95 transition-transform">
                          <i className="fa-regular fa-copy"></i> Copy
                      </button>
                  </div>
                  <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap overflow-y-auto border border-slate-100 dark:border-slate-800">
                      {selectedPrompt.template}
                  </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-center mb-4">
                  <button 
                    onClick={handleSimulate}
                    disabled={isTyping}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                      {isTyping ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                      <span>Generate Output</span>
                  </button>
              </div>

              {/* Output Box */}
              <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 p-4 h-40 flex flex-col relative overflow-hidden">
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI Response Preview</span>
                   <div className="font-mono text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed whitespace-pre-wrap">
                       {simulatedOutput}
                       {isTyping && <span className="inline-block w-2 h-4 bg-indigo-500 align-middle ml-1 animate-pulse"/>}
                   </div>
                   {!simulatedOutput && !isTyping && (
                       <div className="absolute inset-0 flex items-center justify-center text-indigo-300/50 text-4xl pointer-events-none">
                           🤖
                       </div>
                   )}
              </div>

          </div>
      </div>
    </div>
  );
};

export default DayToDayVisual;
