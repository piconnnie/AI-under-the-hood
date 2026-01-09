import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CURRICULUM } from './data/curriculum';
import { LevelId, Lesson } from './types';
import ForwardProp from './components/Visuals/ForwardProp';
import BackwardProp from './components/Visuals/BackwardProp';
import GradientDescent from './components/Visuals/GradientDescent';
import LinearRegression from './components/Visuals/LinearRegression';
import KMeans from './components/Visuals/KMeans';
import CNN from './components/Visuals/CNN';
import Diagrams from './components/Visuals/Diagrams';
import BinaryClassification from './components/Visuals/BinaryClassification';
import Activations from './components/Visuals/Activations';
import RLVisual from './components/Visuals/RLVisual';
import DecisionTreeVisual from './components/Visuals/DecisionTreeVisual';
import PCAVisual from './components/Visuals/PCAVisual';
import LogisticRegressionVisual from './components/Visuals/LogisticRegressionVisual';
import LossFunctionVisual from './components/Visuals/LossFunctionVisual';
import FoundationVisual from './components/Visuals/FoundationVisual';
import RegularizationVisual from './components/Visuals/RegularizationVisual';
import KNNVisual from './components/Visuals/KNNVisual';
import KNNKValueVisual from './components/Visuals/KNNKValueVisual';
import SVMVisual from './components/Visuals/SVMVisual';
import HierarchicalClusteringVisual from './components/Visuals/HierarchicalClusteringVisual';
import EnsembleVisual from './components/Visuals/EnsembleVisual';
import BoostingVisual from './components/Visuals/BoostingVisual';
import GainLiftVisual from './components/Visuals/GainLiftVisual';
import NaiveBayesVisual from './components/Visuals/NaiveBayesVisual';
import StackingVisual from './components/Visuals/StackingVisual';
import TokenizationVisual from './components/Visuals/TokenizationVisual';
import EmbeddingsVisual from './components/Visuals/EmbeddingsVisual';
import LLMVisual from './components/Visuals/LLMVisual';
import VectorDBVisual from './components/Visuals/VectorDBVisual';
import NeuralNetworkVisual from './components/Visuals/NeuralNetworkVisual';
import AIVsMLVisual from './components/Visuals/AIVsMLVisual';
import TrainTestVisual from './components/Visuals/TrainTestVisual';
import EDAVisual from './components/Visuals/EDAVisual';
import CapstoneVisual from './components/Visuals/CapstoneVisual';
import XAIVisual from './components/Visuals/XAIVisual';
import PredictiveGenVisual from './components/Visuals/PredictiveGenVisual';
import RAGVisual from './components/Visuals/RAGVisual';
import LifecycleVisual from './components/Visuals/LifecycleVisual';
import EthicsVisual from './components/Visuals/EthicsVisual';
import MasteryQuiz from './components/MasteryQuiz';
import { ConceptExplainer } from './components/ConceptExplainer';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [currentLevelId, setCurrentLevelId] = useState<LevelId>(1);
  const [currentLessonId, setCurrentLessonId] = useState<string>('ai-hierarchy');
  const [showEli5, setShowEli5] = useState(false);
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMasteryQuiz, setShowMasteryQuiz] = useState(false);
  const [showMentorship, setShowMentorship] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const eli5Ref = useRef<HTMLDivElement>(null);
  const analogyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Initialize theme from system preference or local storage could go here
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const allLessons = useMemo(() => {
    return CURRICULUM.flatMap(level => 
      level.lessons.map(lesson => ({ ...lesson, levelId: level.id }))
    );
  }, []);

  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLevel = CURRICULUM.find(l => l.id === currentLevelId) || CURRICULUM[0];
  const currentLesson = currentLevel.lessons.find(l => l.id === currentLessonId) || currentLevel.lessons[0];

  const handleLessonSelect = (levelId: LevelId, lessonId: string) => {
    if (lessonId === currentLessonId) {
       if (window.innerWidth < 1024) setSidebarOpen(false);
       return;
    }
    setCurrentLevelId(levelId);
    setCurrentLessonId(lessonId);
    setShowEli5(false);
    setShowAnalogy(false);
    setIsAnimating(false);
    setQuizAnswered(null);
    setSelectedOptionIndex(null);
    if (window.innerWidth < 1024) setSidebarOpen(false);
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      handleLessonSelect(next.levelId, next.id);
    }
  };

  const goToPrevLesson = () => {
    if (currentIndex > 0) {
      const prev = allLessons[currentIndex - 1];
      handleLessonSelect(prev.levelId, prev.id);
    }
  };

  const handleQuizSubmit = (index: number) => {
    if (quizAnswered !== null) return;
    setSelectedOptionIndex(index);
    setQuizAnswered(currentLesson.quiz.options[index].isCorrect);
  };

  const handleScroll = () => {
    if (mainContentRef.current) {
        setShowScrollTop(mainContentRef.current.scrollTop > 400);
    }
  };

  const scrollToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSimulation = () => {
    const newState = !isAnimating;
    setIsAnimating(newState);
    if (newState) {
        setTimeout(() => {
            visualRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  };

  const toggleEli5 = () => {
    const newState = !showEli5;
    setShowEli5(newState);
    if (newState) {
        setTimeout(() => {
            eli5Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  };

  const toggleAnalogy = () => {
    const newState = !showAnalogy;
    setShowAnalogy(newState);
    if (newState) {
        setTimeout(() => {
            analogyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  };

  const renderVisual = () => {
    switch (currentLesson.id) {
      case 'ai-hierarchy': return <AIVsMLVisual isAnimating={isAnimating} />;
      case 'ai-landscape': return <PredictiveGenVisual isAnimating={isAnimating} />;
      case 'intro': return <FoundationVisual isAnimating={isAnimating} />;
      case 'value-matrix': return <Diagrams id="value-matrix" />;
      case 'train-test': return <TrainTestVisual isAnimating={isAnimating} />;
      case 'eda': return <EDAVisual isAnimating={isAnimating} />;
      case 'wizard-of-oz': return <Diagrams id="wizard-of-oz" />;
      case 'rice-ai': return <Diagrams id="rice-ai" />;
      case 'linear-reg': return <LinearRegression isAnimating={isAnimating} />;
      case 'binary-class': return <BinaryClassification isAnimating={isAnimating} />;
      case 'logistic-reg': return <LogisticRegressionVisual isAnimating={isAnimating} />;
      case 'kmeans': return <KMeans isAnimating={isAnimating} />;
      case 'knn': return <KNNVisual isAnimating={isAnimating} />;
      case 'knn-k-value': return <KNNKValueVisual isAnimating={isAnimating} />;
      case 'svm': return <SVMVisual isAnimating={isAnimating} />;
      case 'naive-bayes': return <NaiveBayesVisual isAnimating={isAnimating} />;
      case 'neural-net-structure': return <NeuralNetworkVisual isAnimating={isAnimating} />;
      case 'activations': return <Activations isAnimating={isAnimating} />;
      case 'forward-prop': return <ForwardProp isAnimating={isAnimating} />;
      case 'loss-function': return <LossFunctionVisual isAnimating={isAnimating} />;
      case 'backward-prop': return <BackwardProp isAnimating={isAnimating} />;
      case 'gradient-descent': return <GradientDescent isAnimating={isAnimating} />;
      case 'regularization': return <RegularizationVisual isAnimating={isAnimating} />;
      case 'decision-trees': return <DecisionTreeVisual isAnimating={isAnimating} />;
      case 'ensemble-basics': return <EnsembleVisual isAnimating={isAnimating} />;
      case 'gradient-boost': return <BoostingVisual isAnimating={isAnimating} />;
      case 'stacking': return <StackingVisual isAnimating={isAnimating} />;
      case 'cnn-conv': return <CNN isAnimating={isAnimating} />;
      case 'rl-intro': return <RLVisual isAnimating={isAnimating} />;
      case 'hierarchical-clustering': return <HierarchicalClusteringVisual isAnimating={isAnimating} />;
      case 'tokenization': return <TokenizationVisual isAnimating={isAnimating} />;
      case 'embeddings': return <EmbeddingsVisual isAnimating={isAnimating} />;
      case 'vector-db': return <VectorDBVisual isAnimating={isAnimating} />;
      case 'llms': return <LLMVisual isAnimating={isAnimating} />;
      case 'llm-rag': return <RAGVisual isAnimating={isAnimating} />;
      case 'ai-lifecycle': return <LifecycleVisual isAnimating={isAnimating} />;
      case 'gain-lift': return <GainLiftVisual isAnimating={isAnimating} />;
      case 'jtbd-agents': return <Diagrams id="jtbd-agents" />;
      case 'ethics-bias': return <EthicsVisual isAnimating={isAnimating} />;
      case 'xai-trust': return <XAIVisual isAnimating={isAnimating} />;
      case 'capstone-simulation': return <CapstoneVisual isAnimating={isAnimating} />;
      default: return <Diagrams id={currentLesson.id} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Quiz Overlay */}
      {showMasteryQuiz && <MasteryQuiz onClose={() => setShowMasteryQuiz(false)} />}

      {/* Mentorship Overlay */}
      {showMentorship && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-enter" onClick={() => setShowMentorship(false)}>
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowMentorship(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center font-bold transition-colors z-20">✕</button>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#f97316_1px, transparent 1px)]" />
                    <div className="text-5xl mb-3 animate-float">🚀</div>
                    <h2 className="text-2xl font-black mb-2">Level Up Your Career</h2>
                    <p className="text-slate-300 font-medium text-sm">Expert 1:1 Coaching for Aspiring AI Product Managers</p>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <a href="mailto:fraz.iimi@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900 hover:bg-orange-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📧</div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Me</div>
                                <div className="font-bold text-slate-800 dark:text-slate-200">fraz.iimi@gmail.com</div>
                            </div>
                        </a>
                        <a href="https://wa.me/919560407405" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-100 dark:hover:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💬</div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Chat</div>
                                <div className="font-bold text-slate-800 dark:text-slate-200">+91 95604 07405</div>
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/alifraz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">in</div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn Profile</div>
                                <div className="font-bold text-slate-800 dark:text-slate-200">Connect with Faraz</div>
                            </div>
                        </a>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Perfect for mock interviews, resume reviews, and building your AI portfolio.
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar Navigation - SLATE-900 DARK THEME (Stays dark in both modes for contrast) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] lg:static lg:translate-x-0 shadow-2xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 bg-slate-900 z-20">
            <h1 className="text-xl font-extrabold gradient-text tracking-tight flex items-center gap-2">AI Under the Hood</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">Interactive Learning Path</p>
        </div>
        
        <div className="p-4 border-b border-slate-800">
            <button onClick={() => setShowMasteryQuiz(true)} className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-lg shadow-orange-900/20 hover:shadow-orange-500/30 transition-all font-bold text-xs flex items-center justify-center gap-2 group">
                <span className="text-base group-hover:scale-110 transition-transform">🏆</span> Test Your Mastery
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar relative">
            {CURRICULUM.map((level) => (
              <div key={level.id} className="mb-2">
                <div className="sticky top-0 z-10 bg-slate-900 py-3 border-b border-slate-800 mb-1">
                   <h3 className="px-2 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                      Level {level.id}: {level.title}
                   </h3>
                </div>
                <div className="space-y-0.5">
                  {level.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(level.id, lesson.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group relative ${isActive ? 'bg-slate-800 text-orange-400 font-bold border-l-2 border-orange-500' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}
                      >
                        <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'opacity-50 group-hover:opacity-100'}`}>{isActive ? '🔹' : '▫️'}</span>
                        <span className="truncate flex-1 text-left">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900 space-y-2">
             <button onClick={() => setShowMentorship(true)} className="w-full py-3 px-4 bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-700 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-2 group">
                <span className="text-base group-hover:translate-x-1 transition-transform">🚀</span> Get 1:1 Mentorship
            </button>
        </div>

        <div className="p-4 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-600 font-medium">© 2025 Faraz Sharique Ali</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative bg-slate-50/50 dark:bg-slate-950/50">
        <header className="flex-shrink-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors text-slate-600 dark:text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:block">Current Progress</span>
                 <div className="hidden sm:flex items-center gap-3 w-48 mt-1">
                     <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-700" style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }} />
                     </div>
                     <span className="text-[10px] font-bold text-orange-600 dark:text-orange-500 w-8 text-right">{Math.round(((currentIndex + 1) / allLessons.length) * 100)}%</span>
                 </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button 
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all mr-2"
                aria-label="Toggle Theme"
             >
                {theme === 'light' ? '🌙' : '☀️'}
             </button>
             <button onClick={goToPrevLesson} disabled={currentIndex === 0} className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-all">←</button>
             <button onClick={goToNextLesson} disabled={currentIndex === allLessons.length - 1} className="h-9 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold rounded-full hover:from-orange-600 hover:to-red-700 transition-all shadow-md shadow-orange-500/20 disabled:opacity-30 flex items-center gap-2">
               <span>Next</span><span>→</span>
             </button>
          </div>
        </header>

        <div id="main-content" ref={mainContentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 custom-scrollbar scroll-smooth">
          <div key={currentLessonId} className="max-w-4xl mx-auto space-y-8 animate-enter pb-20">
            <div className="text-center space-y-4 pt-4">
              <div className="inline-block animate-float">
                <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-100 dark:border-orange-800">Level {currentLevel.id} • {currentLevel.title}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">{currentLesson.title}</h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">{currentLesson.subtitle}</p>
            </div>

            {currentLesson.id !== 'capstone-simulation' && (
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto sticky top-4 z-20 pointer-events-none">
                 <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg flex gap-2 pointer-events-auto transition-colors">
                    {currentLesson.visualType === 'interactive' && (
                       <button 
                           onClick={toggleSimulation} 
                           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                               isAnimating 
                               ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/50' 
                               : 'bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-600 hover:shadow-md'
                           }`}
                       >
                         <span className={isAnimating ? 'animate-pulse' : ''}>{isAnimating ? '⏹' : '▶️'}</span>
                         <span className="hidden sm:inline">{isAnimating ? 'Stop' : 'Simulate'}</span>
                       </button>
                    )}
                    <button onClick={toggleEli5} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${showEli5 ? 'bg-amber-100 text-amber-800' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'}`}>
                      <span>🧸</span><span className="hidden sm:inline">ELI5 On</span>
                    </button>
                    <button onClick={toggleAnalogy} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${showAnalogy ? 'bg-purple-100 text-purple-800' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'}`}>
                      <span>💡</span><span className="hidden sm:inline">Analogy</span>
                    </button>
                 </div>
              </div>
            )}

            <div ref={visualRef} className="relative group max-w-3xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-[2.5rem] blur-xl opacity-20 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl overflow-hidden p-2 sm:p-3 transition-colors">
                <div className={`bg-slate-50 dark:bg-slate-950/50 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 relative transition-colors ${currentLesson.id === 'capstone-simulation' ? 'min-h-[500px]' : 'min-h-[260px] sm:min-h-[320px]'}`}>
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10 w-full p-4 flex justify-center h-full">
                    {/* Wrap visual content in ErrorBoundary with required children provided */}
                    <ErrorBoundary>
                      {renderVisual()}
                    </ErrorBoundary>
                  </div>
                </div>
              </div>

              {/* CONCEPT EXPLAINER - CONTEXTUAL HELP BELOW VISUAL */}
              {currentLesson.id !== 'capstone-simulation' && (
                <div className="max-w-3xl mx-auto mt-6">
                    <ConceptExplainer lessonId={currentLesson.id} />
                </div>
              )}
            </div>

            {currentLesson.id !== 'capstone-simulation' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                 <div className="lg:col-span-2 space-y-6">
                    {showEli5 && (
                      <div ref={eli5Ref} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 rounded-3xl p-6 sm:p-8 shadow-sm animate-enter relative overflow-hidden transition-colors">
                        <div className="absolute -top-4 -right-4 text-8xl opacity-5 rotate-12 pointer-events-none">🧸</div>
                        <h5 className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"/> Simple Explanation
                        </h5>
                        <p className="text-base text-amber-900 dark:text-amber-100 leading-relaxed font-bold italic">"{currentLesson.eli5}"</p>
                      </div>
                    )}
                    {showAnalogy && (
                      <div ref={analogyRef} className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-8 shadow-sm animate-enter relative overflow-hidden transition-colors">
                        <div className="absolute -top-4 -right-4 text-8xl opacity-5 rotate-12 pointer-events-none">💡</div>
                        <h5 className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"/> Real World Analogy
                        </h5>
                        <h6 className="text-base font-black text-purple-900 dark:text-purple-100 mb-2 uppercase tracking-tight">{currentLesson.analogy.title}</h6>
                        <p className="text-sm text-purple-800 dark:text-purple-200 leading-relaxed font-medium">{currentLesson.analogy.description}</p>
                      </div>
                    )}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 uppercase tracking-widest">
                         <span className="text-xl">📖</span> Core Concepts
                      </h4>
                      <ul className="space-y-4">
                        {currentLesson.shortDescription.map((item, idx) => (
                          <li key={idx} className="flex gap-4 items-start group">
                            <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors border border-orange-200 dark:border-orange-800">{idx + 1}</span>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-4">
                         <span className="text-xl animate-bounce">🧠</span>
                         <h4 className="text-[10px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Quick Check</h4>
                      </div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug mb-6">{currentLesson.quiz.question}</p>
                      <div className="space-y-2.5">
                        {currentLesson.quiz.options.map((option, idx) => (
                          <button key={idx} onClick={() => handleQuizSubmit(idx)} disabled={quizAnswered !== null} className={`w-full p-3.5 rounded-xl text-[11px] text-left font-bold transition-all border relative overflow-hidden group ${selectedOptionIndex === idx ? (option.isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-md shadow-emerald-200/50 dark:shadow-none' : 'bg-rose-50 dark:bg-rose-900/30 border-rose-500 text-rose-700 dark:text-rose-400 shadow-md shadow-rose-200/50 dark:shadow-none') : (quizAnswered !== null && option.isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-orange-200 dark:hover:border-orange-800 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-700')}`}>
                            <div className="relative z-10 flex justify-between items-center gap-2">
                              <span>{option.text}</span>
                              {selectedOptionIndex === idx && <span className="text-lg leading-none">{option.isCorrect ? '🎉' : '❌'}</span>}
                            </div>
                          </button>
                        ))}
                      </div>
                      {quizAnswered !== null && (
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 animate-enter">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Insight</p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">{currentLesson.quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl transition-colors duration-500" />
                       <p className="text-[9px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-3 relative z-10">Key Takeaway</p>
                       <p className="text-base font-black leading-tight tracking-tight relative z-10">{currentLesson.takeaway}</p>
                    </div>
                 </div>
              </div>
            )}

            <div className="pt-12 pb-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-sm transition-colors">✨</div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-none mb-1.5">You've Mastered</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{currentLesson.title}</p>
                  </div>
               </div>
               {currentIndex < allLessons.length - 1 ? (
                 <button onClick={goToNextLesson} className="group w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-wide hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-xl hover:shadow-orange-500/10 flex items-center justify-center gap-2">
                   <span>Next Lesson</span><span className="group-hover:translate-x-1 transition-transform">→</span>
                 </button>
               ) : (
                 <div className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl animate-bounce">Course Completed! 🎉</div>
               )}
            </div>
          </div>
        </div>
        
        {/* Scroll To Top Button */}
        <button
            onClick={scrollToTop}
            className={`absolute bottom-8 right-8 z-50 p-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-full shadow-xl hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all duration-300 transform ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label="Scroll to top"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      </div>
    </div>
  );
};

export default App;