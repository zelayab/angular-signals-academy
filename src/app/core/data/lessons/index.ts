import type { Lesson } from '../../models/lesson.model';
import type { LessonContent } from '../../models/lesson.model';
import { DEFAULT_LESSON_CONTENT } from './default-content';
import { INTRODUCCION_LESSONS } from './sections/introduccion.lessons';
import { INTRODUCCION_CONTENT } from './sections/introduccion.content';
import { FUNDAMENTOS_LESSONS } from './sections/fundamentos.lessons';
import { FUNDAMENTOS_CONTENT } from './sections/fundamentos.content';
import { COMPUTED_LESSONS } from './sections/computed.lessons';
import { COMPUTED_CONTENT } from './sections/computed.content';
import { EFFECTS_LESSONS } from './sections/effects.lessons';
import { EFFECTS_CONTENT } from './sections/effects.content';
import { INPUT_OUTPUT_LESSONS } from './sections/input-output.lessons';
import { INPUT_OUTPUT_CONTENT } from './sections/input-output.content';
import { RXJS_LESSONS } from './sections/rxjs.lessons';
import { RXJS_CONTENT } from './sections/rxjs.content';
import { PATRONES_LESSONS } from './sections/patrones.lessons';
import { PATRONES_CONTENT } from './sections/patrones.content';
import { ANTI_PATRONES_LESSONS } from './sections/anti-patrones.lessons';
import { ANTI_PATRONES_CONTENT } from './sections/anti-patrones.content';
import { LABS_LESSONS } from './sections/labs.lessons';
import { LABS_CONTENT } from './sections/labs.content';
import { QUIZ_LESSONS } from './sections/quiz.lessons';
import { QUIZ_CONTENT } from './sections/quiz.content';
import { RECURSOS_LESSONS } from './sections/recursos.lessons';

/** Todas las lecciones agrupadas por sección. Para editar una sección, modifica el archivo en sections/. */
export const LESSONS_BY_SECTION: Record<string, Lesson[]> = {
  inicio: [],
  introduccion: INTRODUCCION_LESSONS,
  fundamentos: FUNDAMENTOS_LESSONS,
  computed: COMPUTED_LESSONS,
  effects: EFFECTS_LESSONS,
  'input-output': INPUT_OUTPUT_LESSONS,
  rxjs: RXJS_LESSONS,
  patrones: PATRONES_LESSONS,
  'anti-patrones': ANTI_PATRONES_LESSONS,
  labs: LABS_LESSONS,
  quiz: QUIZ_LESSONS,
  recursos: RECURSOS_LESSONS,
};

/** Contenido detallado por id de lección. Para editar, modifica el .content.ts de la sección. */
export const LESSON_CONTENT: Record<string, LessonContent> = {
  ...INTRODUCCION_CONTENT,
  ...FUNDAMENTOS_CONTENT,
  ...COMPUTED_CONTENT,
  ...EFFECTS_CONTENT,
  ...INPUT_OUTPUT_CONTENT,
  ...RXJS_CONTENT,
  ...PATRONES_CONTENT,
  ...ANTI_PATRONES_CONTENT,
  ...LABS_CONTENT,
  ...QUIZ_CONTENT,
};

export function getLessonContent(lessonId: string): LessonContent {
  return LESSON_CONTENT[lessonId] ?? DEFAULT_LESSON_CONTENT;
}

/** Devuelve el id de la sección que contiene la lección con ese id, o null. */
export function getSectionForLessonId(lessonId: string): string | null {
  for (const [section, lessons] of Object.entries(LESSONS_BY_SECTION)) {
    if (lessons.some((l) => l.id === lessonId)) return section;
  }
  return null;
}
