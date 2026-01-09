
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
    if (score <= 5) return { title: "AI Curious", color: "bg-slate-500", emoji: "🌱" };
    if (score <= 9) return { title: "AI-Aware PM", color: "bg-blue-500", emoji: "⚡" };
    if (score <= 12) return { title: "AI-Savvy PM", color: "bg-indigo-500", emoji: "🚀" };
    return { title: "AI Product Leader", color: "bg-emerald-500", emoji: "👑" };
  };

  const badge = getBadge();

  const handleShare = () => {
    const url = window.location.href;
    const text = `I just completed the “AI Product Manager – How Models Learn” quiz 🚀\n\nScore: ${score}/${MASTERY_QUIZ.length} (${percentage}%)\nBadge: ${badge.title} ${badge.emoji}\n\nTake the quiz here: ${url}\n\n#AIProductManagement #MachineLearning #TechLearning`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-enter">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
                <div className="text-6xl mb-4 animate-bounce">{badge.emoji}</div>
                <h2 className="text-2xl font-bold text-white mb-1">{badge.title}</h2>
                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Final Score: {score} / {MASTERY_QUIZ.length} ({percentage}%)</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-slate-900">Share your achievement!</h3>
                <p className="text-sm text-slate-500">Copy the text below to post on LinkedIn or Twitter.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 font-mono relative group cursor-pointer hover:border-indigo-300 transition-colors" onClick={handleShare}>
                <p>I just completed the “AI Product Manager – How Models Learn” quiz 🚀</p>
                <p className="mt-2">Score: {score}/{MASTERY_QUIZ.length} ({percentage}%)</p>
                <p>Badge: {badge.title} {badge.emoji}</p>
                <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <span className="bg-white shadow-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600">Click to Copy</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={handleShare}
                    className={`flex-1 py-3 rounded-lg font-bold text-white transition-all shadow-md ${copied ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {copied ? 'Copied! ✓' : 'Copy Share Text'}
                </button>
                <button 
                    onClick={onClose}
                    className="px-6 py-3 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-enter">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-white px-8 py-6 border-b border-slate-200 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Mastery Quiz</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{currentQuestion.section}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>

        {/* Progress */}
        <div className="h-1 w-full bg-slate-100">
            <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-8 leading-relaxed">
                {currentQuestion.question}
            </h3>

            <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(idx)}
                        className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border relative overflow-hidden ${
                            isAnswered
                                ? (option.isCorrect 
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                    : (selectedOption === idx ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white border-slate-200 text-slate-400 opacity-60'))
                                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-sm'
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{option.text}</span>
                            {isAnswered && (
                                <span>{option.isCorrect ? <i className="fa-solid fa-check"></i> : (selectedOption === idx ? <i className="fa-solid fa-xmark"></i> : '')}</span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mt-6 p-5 bg-indigo-50 rounded-xl border border-indigo-100 animate-enter">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <span className="text-xs font-bold text-indigo-800 uppercase tracking-widest">Why this matters</span>
                    </div>
                    <p className="text-sm text-indigo-900 leading-relaxed">
                        {currentQuestion.explanation}
                    </p>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
            <button
                disabled={!isAnswered}
                onClick={handleNext}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md disabled:opacity-50 disabled:shadow-none hover:bg-indigo-700 hover:translate-y-[-1px] active:translate-y-0 transition-all text-sm"
            >
                {currentQuestionIdx === MASTERY_QUIZ.length - 1 ? "Finish Quiz" : "Next Question →"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default MasteryQuiz;
