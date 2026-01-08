
export type LevelId = number;

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string[];
  eli5: string;
  analogy: {
    title: string;
    description: string;
  };
  visualType: 'animation' | 'diagram' | 'interactive';
  animationPrompt: string;
  takeaway: string;
  quiz: Quiz;
}

export interface Level {
  id: LevelId;
  title: string;
  lessons: Lesson[];
  unlocked: boolean;
}
