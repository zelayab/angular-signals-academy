import type { Lesson } from '../../../models/lesson.model';

export const QUIZ_LESSONS: Lesson[] = [
  { id: 'quiz-fundamentos', title: 'Quiz: Fundamentos de Signals', description: 'Preguntas sobre signal(), set(), update() y buenas prácticas', difficulty: 'básico', duration: '5 min', tags: ['quiz', 'fundamentos'], completed: false },
  { id: 'quiz-effects', title: 'Quiz: Effects y side effects', description: 'Preguntas sobre effect(), cleanup y loops', difficulty: 'intermedio', duration: '6 min', tags: ['quiz', 'effects'], completed: false },
  { id: 'quiz-computed', title: 'Quiz: Computed', description: 'Preguntas sobre computed(), lazy evaluation y listas derivadas', difficulty: 'intermedio', duration: '5 min', tags: ['quiz', 'computed'], completed: false },
  { id: 'quiz-input-output', title: 'Quiz: Input/Output + Signals', description: 'Preguntas sobre input(), output(), model()', difficulty: 'básico', duration: '5 min', tags: ['quiz', 'input', 'output'], completed: false },
  { id: 'quiz-anti-patrones', title: 'Quiz: Anti-patrones', description: 'Preguntas sobre errores comunes, mutación y loops en effects', difficulty: 'intermedio', duration: '6 min', tags: ['quiz', 'anti-patrones'], completed: false },
  { id: 'quiz-avanzado', title: 'Quiz: Patrones avanzados', description: 'RxJS, anti-patrones y patrones recomendados', difficulty: 'avanzado', duration: '8 min', tags: ['quiz', 'avanzado'], completed: false },
];
