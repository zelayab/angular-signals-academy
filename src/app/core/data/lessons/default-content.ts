import type { LessonContent } from '../../models/lesson.model';

export const DEFAULT_LESSON_CONTENT: LessonContent = {
  definition: 'Contenido de la lección en desarrollo...',
  como: '',
  porQue: '',
  cuando: '',
  conQue: '',
  paraQue: '',
  realWorld: 'Ejemplos prácticos próximamente.',
  code: `// Ejemplo de código
import { signal, computed, effect } from '@angular/core';

const miSignal = signal(0);
console.log(miSignal()); // 0`,
  commonErrors: ['Contenido en desarrollo'],
  checklist: ['Contenido en desarrollo'],
  explainLikeIm5: 'Esta explicación simplificada estará disponible pronto.',
  challenge: { description: 'Desafío próximamente', hint: 'Hint próximamente' },
};
