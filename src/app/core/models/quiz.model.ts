export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedLesson: string;
  tip?: string;
}

export interface QuizModule {
  id: string;
  name: string;
  questions: QuizQuestion[];
}
