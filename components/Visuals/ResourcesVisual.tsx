
import React from 'react';

const RESOURCES = [
  {
    name: "Andrej Karpathy",
    url: "https://www.youtube.com/andrejkarpathy",
    desc: "Former Director of AI at Tesla & OpenAI. Builds GPT from scratch. The gold standard for code-first LLM learning.",
    icon: "🧑‍💻",
    color: "bg-indigo-500"
  },
  {
    name: "3Blue1Brown",
    url: "https://www.youtube.com/c/3blue1brown",
    desc: "The most beautiful mathematical visualizations of Neural Networks, Calculus, and Transformers.",
    icon: "📐",
    color: "bg-sky-500"
  },
  {
    name: "Machine Learning Street Talk",
    url: "https://www.youtube.com/@MachineLearningStreetTalk",
    desc: "Uncut technical interviews with the brightest minds in AI. Deep philosophy and engineering discussions.",
    icon: "🎙️",
    color: "bg-rose-500"
  },
  {
    name: "Julia Turc",
    url: "https://www.youtube.com/@juliaturc1",
    desc: "Ex-Google AI. Explains complex GenAI, BERT, and NLP concepts with incredible clarity and visuals.",
    icon: "👩‍🏫",
    color: "bg-purple-500"
  },
  {
    name: "StatQuest with Josh Starmer",
    url: "https://www.youtube.com/@statquest",
    desc: "Machine Learning and Statistics broken down into simple, visual steps. 'Triple Bam!'",
    icon: "💥",
    color: "bg-amber-500"
  },
  {
    name: "Two Minute Papers",
    url: "https://www.youtube.com/@TwoMinutePapers",
    desc: "Visual summaries of the latest AI research papers. Keep up with the bleeding edge of innovation.",
    icon: "📰",
    color: "bg-emerald-500"
  }
];

const ResourcesVisual: React.FC<{ isAnimating: boolean }> = () => {
  return (
    <div className="w-full h-[32rem] bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border-4 border-slate-100 dark:border-slate-800 p-6 overflow-y-auto custom-scrollbar shadow-inner">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RESOURCES.map((r, i) => (
              <a 
                key={i} 
                href={r.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all group"
              >
                  <div className={`w-12 h-12 rounded-full ${r.color} flex items-center justify-center text-2xl shadow-sm text-white group-hover:scale-110 transition-transform flex-shrink-0`}>
                      {r.icon}
                  </div>
                  <div>
                      <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm">
                          {r.name}
                          <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">{r.desc}</p>
                  </div>
              </a>
          ))}
          
          {/* Footer Card */}
          <div className="col-span-1 sm:col-span-2 mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-center">
              <div>
                  <div className="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">Never Stop Learning</div>
                  <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">The field of AI changes every week. Curate your feed with these creators to stay ahead.</p>
              </div>
          </div>
       </div>
    </div>
  );
};

export default ResourcesVisual;
