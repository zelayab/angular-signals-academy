import type { Lesson } from '../../../models/lesson.model';

export const COMPUTED_LESSONS: Lesson[] = [
  { id: 'comp-1', title: 'Introducción a computed()', description: 'Crear valores derivados que se actualizan automáticamente', difficulty: 'básico', duration: '10 min', tags: ['computed()', 'derivado'], completed: false, labId: 'lab-2' },
  { id: 'comp-2', title: 'Dependencias automáticas', description: 'Cómo Angular rastrea las dependencias de tus computed signals', difficulty: 'intermedio', duration: '12 min', tags: ['tracking', 'dependencias'], completed: false, labId: 'lab-2' },
  { id: 'comp-3', title: 'Optimización de computed', description: 'Estrategias para evitar recálculos innecesarios', difficulty: 'avanzado', duration: '18 min', tags: ['performance', 'memoization'], completed: false },
  { id: 'comp-4', title: 'Computed anidados', description: 'Computed que dependen de otros computed', difficulty: 'intermedio', duration: '10 min', tags: ['computed()', 'anidado'], completed: false },
  { id: 'comp-5', title: 'Computed con múltiples signals', description: 'Combinar varios signals en un solo valor derivado', difficulty: 'básico', duration: '8 min', tags: ['computed()', 'combinar'], completed: false },
  { id: 'comp-6', title: 'Lazy evaluation', description: 'Por qué los computed solo se recalculan cuando se leen', difficulty: 'intermedio', duration: '9 min', tags: ['lazy', 'performance'], completed: false },
  { id: 'comp-7', title: 'Computed y condicionales', description: 'Evitar ramas que lean signals diferentes según condición', difficulty: 'avanzado', duration: '12 min', tags: ['computed()', 'condicionales'], completed: false },
  { id: 'comp-8', title: 'Computed para listas filtradas', description: 'Patrón: filtrar y ordenar listas reactivamente', difficulty: 'intermedio', duration: '11 min', tags: ['computed()', 'listas'], completed: false, labId: 'lab-7' },
  { id: 'comp-9', title: 'Computed con async (promesas)', description: 'Computed que devuelve Promise y resource() en Angular', difficulty: 'avanzado', duration: '15 min', tags: ['computed()', 'async', 'resource'], completed: false },
  { id: 'comp-10', title: 'Cuándo NO usar computed', description: 'Side effects, I/O y lógica que no es pura', difficulty: 'intermedio', duration: '8 min', tags: ['computed()', 'anti-patrones'], completed: false },
  { id: 'comp-11', title: 'Testing de computed signals', description: 'Cómo verificar que un computed devuelve lo esperado', difficulty: 'intermedio', duration: '10 min', tags: ['testing', 'computed()'], completed: false },
  { id: 'comp-12', title: 'Resumen de computed', description: 'Checklist antes de pasar a effects', difficulty: 'básico', duration: '4 min', tags: ['resumen', 'computed()'], completed: false },
  { id: 'comp-13', title: 'Practica: Lista filtrada', description: 'Implementa un filtro con computed() en el Lab', difficulty: 'intermedio', duration: '12 min', tags: ['computed()', 'lab', 'práctica'], completed: false, labId: 'lab-2' },
  { id: 'comp-14', title: 'Practica: Formulario con validación', description: 'Validación reactiva con computed en el Lab', difficulty: 'intermedio', duration: '14 min', tags: ['computed()', 'lab', 'validación'], completed: false, labId: 'lab-5' },
];
