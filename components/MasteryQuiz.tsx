
import React, { useState } from 'react';
import { MASTERY_QUIZ } from '../data/masteryQuiz';

interface MasteryQuizProps {
  onClose: () => void;
}

const MasteryQuiz: React.FC<MasteryQuizProps> = ({ onClose }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQuestion = MASTERY_QUIZ[currentQuestionIdx];
  const progress = ((currentQuestionIdx) / MASTERY_QUIZ.length) * 100;
  
  // Calculate percentage
  const percentage = Math.round((score / MASTERY_QUIZ.length) * 100);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (currentQuestion.options[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < MASTERY_QUIZ.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const getBadge = () => {
    if (score <= 5) return { title: "🤔 AI Curious", color: "bg-slate-500", emoji: "🌱" };
    if (score <= 9) return { title: "📘 AI-Aware PM", color: "bg-blue-500", emoji: "⚡" };
    if (score <= 12) return { title: "🧠 AI-Savvy PM", color: "bg-indigo-500", emoji: "🚀" };
    return { title: "🚀 AI Product Leader", color: "bg-emerald-500", emoji: "👑" };
  };

  const badge = getBadge();

  const handleShare = () => {
    const url = window.location.href;
    const text = `I just completed the “AI Product Manager – How Models Learn” quiz 🚀\n\nScore: ${score}/${MASTERY_QUIZ.length} (${percentage}%)\nBadge: ${badge.title} ${badge.emoji}\n\nLoved how complex ML concepts like forward/backprop, learning rate, and model tradeoffs were explained visually.\n\nTake the quiz here: ${url}\n\n#AIProductManagement #MachineLearning #TechLearning`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-enter">
        <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative">
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
                <div className="text-6xl mb-4 animate-bounce">{badge.emoji}</div>
                <h2 className="text-2xl font-black text-white mb-2">{badge.title}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Final Score: {score} / {MASTERY_QUIZ.length} ({percentage}%)</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-slate-800">Share your achievement!</h3>
                <p className="text-sm text-slate-500">Copy the text below to post on LinkedIn or Twitter.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 font-mono relative group cursor-pointer" onClick={handleShare}>
                <p>I just completed the “AI Product Manager – How Models Learn” quiz 🚀</p>
                <p className="mt-2">Score: {score}/{MASTERY_QUIZ.length} ({percentage}%)</p>
                <p>Badge: {badge.title} {badge.emoji}</p>
                <p className="mt-4 text-xs text-indigo-500 break-all">{window.location.href}</p>
                <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <span className="bg-white shadow-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600">Click to Copy</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={handleShare}
                    className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${copied ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {copied ? 'Copied to Clipboard! ✓' : 'Copy Share Text'}
                </button>
                <button 
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-enter">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-black text-slate-900">AI PM Mastery Quiz</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{currentQuestion.section}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 flex items-center justify-center font-bold">✕</button>
        </div>

        {/* Progress */}
        <div className="h-1.5 w-full bg-slate-100">
            <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-8 leading-tight">
                {currentQuestion.question}
            </h3>

            <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(idx)}
                        className={`w-full p-4 rounded-xl text-left font-bold transition-all border-2 relative overflow-hidden ${
                            isAnswered
                                ? (option.isCorrect 
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                                    : (selectedOption === idx ? 'bg-rose-50 border-rose-500 text-rose-800' : 'bg-slate-50 border-slate-100 text-slate-400 opacity-60'))
                                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-900 hover:shadow-md'
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{option.text}</span>
                            {isAnswered && (
                                <span>{option.isCorrect ? '✅' : (selectedOption === idx ? '❌' : '')}</span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 animate-enter">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Why this matters</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {currentQuestion.explanation}
                    </p>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white flex justify-end">
            <button
                disabled={!isAnswered}
                onClick={handleNext}
                className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none hover:bg-indigo-700 hover:translate-y-[-2px] active:translate-y-0 transition-all"
            >
                {currentQuestionIdx === MASTERY_QUIZ.length - 1 ? "Finish Quiz" : "Next Question →"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default MasteryQuiz;
