export type LessonDifficulty = 'básico' | 'intermedio' | 'avanzado';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: LessonDifficulty;
  duration: string;
  tags: string[];
  completed: boolean;
  /** Si está definido, la lección muestra "Probar en Lab" y enlaza a este lab. */
  labId?: string;
}

export interface LessonContent {
  definition: string;
  /** CÓMO: explicación paso a paso, uso práctico */
  como?: string;
  /** POR QUÉ: motivación, beneficios, razones */
  porQue?: string;
  /** CUÁNDO: en qué situaciones usarlo */
  cuando?: string;
  /** CON QUÉ: APIs, herramientas, combinaciones */
  conQue?: string;
  /** PARA QUÉ: objetivo, resultado esperado */
  paraQue?: string;
  realWorld: string;
  code: string;
  commonErrors: string[];
  checklist: string[];
  explainLikeIm5: string;
  challenge: { description: string; hint: string };
}
