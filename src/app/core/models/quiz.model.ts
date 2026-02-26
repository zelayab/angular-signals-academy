export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedLesson: string;
  tip?: string;
  /** Fuentes oficiales que sustentan la respuesta (angular.dev, RFC, etc.) */
  sources?: { url: string; label: string }[];
}

export interface QuizModule {
  id: string;
  name: string;
  questions: QuizQuestion[];
}
