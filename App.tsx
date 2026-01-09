
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CURRICULUM } from './data/curriculum';
import { LevelId } from './types';
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
import FeatureEngineeringVisual from './components/Visuals/FeatureEngineeringVisual';
import CopilotAutopilotVisual from './components/Visuals/CopilotAutopilotVisual';
import ResourcesVisual from './components/Visuals/ResourcesVisual';
import MasteryQuiz from './components/MasteryQuiz';
import { ConceptExplainer } from './components/ConceptExplainer';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [currentLevelId, setCurrentLevelId] = useState<LevelId>(1);
  const [currentLessonId, setCurrentLessonId] = useState<string>('ai-hierarchy');
  const [isAnimating, setIsAnimating] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMasteryQuiz, setShowMasteryQuiz] = useState(false);
  const [showMentorship, setShowMentorship] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggles for simplistic UI
  const [showEli5, setShowEli5] = useState(false);
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const mainContentRef = useRef<HTMLDivElement>(null);
  const conceptsRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  const allLessons = useMemo(() => {
    return CURRICULUM.flatMap(level => 
      level.lessons.map(lesson => ({ ...lesson, levelId: level.id }))
    );
  }, []);

  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLevel = CURRICULUM.find(l => l.id === currentLevelId) || CURRICULUM[0];
  const currentLesson = currentLevel.lessons.find(l => l.id === currentLessonId) || currentLevel.lessons[0];
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  useEffect(() => {
    const handleScroll = () => {
        if (mainContentRef.current) {
            setShowScrollTop(mainContentRef.current.scrollTop > 300);
        }
    };
    const div = mainContentRef.current;
    if (div) div.addEventListener('scroll', handleScroll);
    return () => div?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLessonSelect = (levelId: LevelId, lessonId: string) => {
    if (lessonId === currentLessonId) {
       if (window.innerWidth < 1024) setSidebarOpen(false);
       return;
    }
    setCurrentLevelId(levelId);
    setCurrentLessonId(lessonId);
    setIsAnimating(false);
    setQuizAnswered(null);
    setSelectedOptionIndex(null);
    // Reset view toggles
    setShowEli5(false);
    setShowAnalogy(false);
    
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

  const scrollToTop = () => {
      mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current && mainContentRef.current) {
        // Simple offset calculation handling container scroll
        // The container is relative, so we use offsetTop
        // Note: This assumes the ref is inside the scrollable container
        // We might need to account for the sticky header in mobile if not handled by CSS
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFloatingNav = (type: 'concepts' | 'eli5' | 'analogy') => {
      if (type === 'concepts') {
          scrollToRef(conceptsRef);
      } else if (type === 'eli5') {
          if (!showEli5) setShowEli5(true);
          setTimeout(() => scrollToRef(extrasRef), 100);
      } else if (type === 'analogy') {
          if (!showAnalogy) setShowAnalogy(true);
          setTimeout(() => scrollToRef(extrasRef), 100);
      }
  };

  const handleQuizSubmit = (index: number) => {
    if (quizAnswered !== null) return;
    setSelectedOptionIndex(index);
    setQuizAnswered(currentLesson.quiz.options[index].isCorrect);
  };

  const toggleSimulation = () => {
    setIsAnimating(!isAnimating);
  };

  const renderVisual = () => {
    switch (currentLesson.id) {
      case 'ai-hierarchy': return <AIVsMLVisual isAnimating={isAnimating} />;
      case 'ai-landscape': return <PredictiveGenVisual isAnimating={isAnimating} />;
      case 'intro': return <FoundationVisual isAnimating={isAnimating} />;
      case 'value-matrix': return <Diagrams id="value-matrix" />;
      case 'train-test': return <TrainTestVisual isAnimating={isAnimating} />;
      case 'eda': return <EDAVisual isAnimating={isAnimating} />;
      case 'feature-engineering': return <FeatureEngineeringVisual isAnimating={isAnimating} />;
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
      case 'jtbd-agents': return <CopilotAutopilotVisual isAnimating={isAnimating} />;
      case 'ethics-bias': return <EthicsVisual isAnimating={isAnimating} />;
      case 'xai-trust': return <XAIVisual isAnimating={isAnimating} />;
      case 'capstone-simulation': return <CapstoneVisual isAnimating={isAnimating} />;
      case 'learning-resources': return <ResourcesVisual isAnimating={isAnimating} />;
      default: return <Diagrams id={currentLesson.id} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-500 dark:text-slate-400 transition-colors duration-300">
      {/* Quiz Overlay */}
      {showMasteryQuiz && <MasteryQuiz onClose={() => setShowMasteryQuiz(false)} />}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg shadow-md">
                        <i className="fa-solid fa-brain"></i>
                    </div>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">AI Hood</h1>
                </div>
                <p className="text-xs text-slate-400 font-medium ml-1">Interactive Learning</p>
            </div>
            <button 
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Toggle Theme"
            >
                <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
        </div>
        
        <div className="p-4">
            <button onClick={() => setShowMasteryQuiz(true)} className="w-full py-3 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all font-bold text-xs flex items-center justify-center gap-2 group">
                <i className="fa-solid fa-trophy text-amber-500"></i>
                <span>Mastery Quiz</span>
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
            {CURRICULUM.map((level) => (
              <div key={level.id} className="mb-6">
                 <h3 className="px-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    Level {level.id}
                 </h3>
                <div className="space-y-1">
                  {level.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(level.id, lesson.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`}
                      >
                        <i className={`fa-solid fa-circle text-[6px] ${isActive ? 'text-indigo-500' : 'text-slate-300 dark:text-slate-600'}`}></i>
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
             <button onClick={() => setShowMentorship(true)} className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all font-bold text-xs flex items-center justify-center gap-2">
                <i className="fa-solid fa-rocket"></i> Get Mentorship
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 h-full lg:ml-64 bg-slate-50 dark:bg-slate-950">
        
        {/* Mobile Header */}
        <header className="lg:hidden flex-shrink-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between z-30 sticky top-0">
            <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                    <i className="fa-solid fa-bars text-lg"></i>
                </button>
                <span className="font-bold text-slate-900 dark:text-white">AI Under the Hood</span>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                    <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                </button>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                    {Math.round(((currentIndex + 1) / allLessons.length) * 100)}%
                </div>
            </div>
        </header>

        {/* Scrollable Content Area */}
        <div id="main-content" ref={mainContentRef} className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar scroll-smooth relative">
          <div className="max-w-5xl mx-auto pb-32 space-y-8">
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded">Level {currentLevel.id}</span>
                        <span className="text-slate-400 text-xs font-medium">Lesson {currentIndex + 1} of {allLessons.length}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{currentLesson.title}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">{currentLesson.subtitle}</p>
                </div>
                
                <div className="flex gap-2">
                    <button onClick={goToPrevLesson} disabled={currentIndex === 0} className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 transition-all shadow-sm">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button onClick={goToNextLesson} disabled={currentIndex === allLessons.length - 1} className="h-10 px-6 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2">
                        <span>Next</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            {/* Main Visual Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <i className="fa-solid fa-eye text-indigo-500"></i> Interactive Simulation
                    </h2>
                    {currentLesson.visualType === 'interactive' && (
                       <button 
                           onClick={toggleSimulation} 
                           className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                               isAnimating 
                               ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900' 
                               : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900'
                           }`}
                       >
                         <i className={`fa-solid ${isAnimating ? 'fa-stop' : 'fa-play'}`}></i>
                         <span>{isAnimating ? 'Stop' : 'Run Simulation'}</span>
                       </button>
                    )}
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                    <ErrorBoundary>
                      {renderVisual()}
                    </ErrorBoundary>
                </div>

                {/* Concept Explainer */}
                {currentLesson.id !== 'capstone-simulation' && currentLesson.id !== 'learning-resources' && (
                    <div ref={conceptsRef} className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 scroll-mt-20">
                        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Key Concepts</h3>
                        <ConceptExplainer lessonId={currentLesson.id} />
                    </div>
                )}
            </div>

            {/* Action Buttons Row (Simplistic UI) */}
            {currentLesson.id !== 'capstone-simulation' && currentLesson.id !== 'learning-resources' && (
                <div ref={extrasRef} className="flex flex-wrap gap-4 mb-2 animate-enter scroll-mt-20">
                    <button 
                        onClick={() => setShowEli5(!showEli5)}
                        className={`flex-1 py-4 px-6 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-3 transition-all ${showEli5 ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 shadow-inner' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-amber-300 dark:hover:border-amber-700 hover:text-amber-600 dark:hover:text-amber-400 shadow-sm hover:shadow-md'}`}
                    >
                        <i className="fa-solid fa-child-reaching text-lg"></i>
                        <span>Simple Explanation (ELI5)</span>
                        <i className={`fa-solid fa-chevron-down transition-transform ${showEli5 ? 'rotate-180' : ''}`}></i>
                    </button>

                    <button 
                        onClick={() => setShowAnalogy(!showAnalogy)}
                        className={`flex-1 py-4 px-6 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-3 transition-all ${showAnalogy ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 shadow-inner' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 shadow-sm hover:shadow-md'}`}
                    >
                        <i className="fa-solid fa-lightbulb text-lg"></i>
                        <span>Real World Analogy</span>
                        <i className={`fa-solid fa-chevron-down transition-transform ${showAnalogy ? 'rotate-180' : ''}`}></i>
                    </button>
                </div>
            )}

            {/* Expandable Content Area */}
            {(showEli5 || showAnalogy) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-enter">
                    {showEli5 && (
                        <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 p-6 shadow-sm">
                            <h4 className="text-xs font-black text-amber-400 dark:text-amber-500 uppercase tracking-widest mb-3">Explain Like I'm 5</h4>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">"{currentLesson.eli5}"</p>
                        </div>
                    )}
                    {showAnalogy && (
                        <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30 p-6 shadow-sm">
                            <h4 className="text-xs font-black text-purple-400 dark:text-purple-500 uppercase tracking-widest mb-3">Analogy: {currentLesson.analogy.title}</h4>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{currentLesson.analogy.description}</p>
                        </div>
                    )}
                </div>
            )}

            {currentLesson.id !== 'capstone-simulation' && currentLesson.id !== 'learning-resources' && (
              <div className="grid grid-cols-1 gap-6">
                 {/* Quiz Card */}
                 <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-full hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-6">
                         <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm"><i className="fa-solid fa-clipboard-question"></i></span>
                         <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quick Check</h4>
                      </div>
                      
                      <p className="text-base font-bold text-slate-900 dark:text-white mb-6">{currentLesson.quiz.question}</p>
                      
                      <div className="space-y-3 flex-1">
                        {currentLesson.quiz.options.map((option, idx) => {
                            const isSelected = selectedOptionIndex === idx;
                            const isCorrect = option.isCorrect;
                            let btnClass = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-300";
                            
                            if (isSelected) {
                                if (isCorrect) btnClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                                else btnClass = "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400";
                            } else if (quizAnswered !== null && isCorrect) {
                                btnClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 opacity-60";
                            }

                            return (
                                <button key={idx} onClick={() => handleQuizSubmit(idx)} disabled={quizAnswered !== null} className={`w-full p-4 rounded-xl text-sm text-left font-medium border transition-all flex justify-between items-center ${btnClass}`}>
                                    <span>{option.text}</span>
                                    {isSelected && <i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}`}></i>}
                                </button>
                            );
                        })}
                      </div>

                      {quizAnswered !== null && (
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 animate-enter">
                          <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Insight</p>
                          <p className="text-xs text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">{currentLesson.quiz.explanation}</p>
                        </div>
                      )}
                 </div>
              </div>
            )}

            {/* Takeaway */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl transform translate-x-10 -translate-y-10">
                    <i className="fa-solid fa-quote-right"></i>
                </div>
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-3 relative z-10">Key Takeaway</p>
                <p className="text-lg sm:text-xl font-bold leading-relaxed relative z-10">{currentLesson.takeaway}</p>
            </div>

            {/* Next Lesson Navigation */}
            {nextLesson && (
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Up Next</span>
                    <button 
                        onClick={goToNextLesson}
                        className="group w-full max-w-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex items-center justify-between text-left"
                    >
                        <div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Lesson {currentIndex + 2}</div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{nextLesson.title}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </button>
                </div>
            )}
            
          </div>
        </div>
      </div>
      
      {/* Scroll To Top Button (Hidden on mobile if conflicting) */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-8 lg:bottom-8 lg:right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-50 hover:bg-indigo-700 hover:scale-110 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* Floating Nav Bar - Less Intrusive Version */}
      {currentLesson.id !== 'capstone-simulation' && currentLesson.id !== 'learning-resources' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-1 bg-slate-900/80 dark:bg-white/90 backdrop-blur-md p-1 rounded-full shadow-lg border border-slate-700/30 dark:border-slate-200/50 transition-all hover:scale-105 hover:bg-slate-900 dark:hover:bg-white animate-enter">
            <button 
                onClick={() => handleFloatingNav('concepts')}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white dark:text-slate-900 hover:bg-white/10 dark:hover:bg-slate-200/50 transition-colors flex items-center gap-1.5"
            >
                <i className="fa-solid fa-layer-group"></i>
                <span>Concepts</span>
            </button>
            <div className="w-px h-3 bg-white/20 dark:bg-slate-900/20"></div>
            <button 
                onClick={() => handleFloatingNav('eli5')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors flex items-center gap-1.5 ${showEli5 ? 'bg-indigo-500 text-white' : 'text-white dark:text-slate-900 hover:bg-white/10 dark:hover:bg-slate-200/50'}`}
            >
                <i className="fa-solid fa-child-reaching"></i>
                <span>ELI5</span>
            </button>
            <button 
                onClick={() => handleFloatingNav('analogy')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors flex items-center gap-1.5 ${showAnalogy ? 'bg-purple-500 text-white' : 'text-white dark:text-slate-900 hover:bg-white/10 dark:hover:bg-slate-200/50'}`}
            >
                <i className="fa-solid fa-lightbulb"></i>
                <span>Analogy</span>
            </button>
        </div>
      )}

      {/* Mentorship Modal */}
      {showMentorship && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-enter" onClick={() => setShowMentorship(false)}>
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Career Mentorship</h2>
                    <button onClick={() => setShowMentorship(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                            <i className="fa-solid fa-user-astronaut"></i>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Connect with Faraz for 1:1 coaching.</p>
                    </div>
                    <a href="mailto:fraz.iimi@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group">
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400"><i className="fa-solid fa-envelope"></i></div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase">Email</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">fraz.iimi@gmail.com</div>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/alifraz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:text-blue-600 dark:group-hover:text-blue-400"><i className="fa-brands fa-linkedin"></i></div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase">LinkedIn</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Connect Profile</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;
