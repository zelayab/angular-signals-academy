import type { Lesson } from '../../../models/lesson.model';

export const ANTI_PATRONES_LESSONS: Lesson[] = [
  { id: 'anti-1', title: 'Errores comunes con Signals', description: 'Qué evitar y cómo detectar problemas', difficulty: 'intermedio', duration: '12 min', tags: ['errores', 'debugging'], completed: false },
  { id: 'anti-2', title: 'Mutación directa', description: 'Por qué no hacer array.push() en un signal', difficulty: 'básico', duration: '8 min', tags: ['inmutabilidad', 'errores'], completed: false },
  { id: 'anti-3', title: 'Leer signal fuera de contexto', description: 'Dónde se pueden leer signals y dónde no', difficulty: 'intermedio', duration: '10 min', tags: ['contexto', 'injection'], completed: false },
  { id: 'anti-4', title: 'Loops infinitos en effect()', description: 'Escribir un signal que el effect lee y cómo evitarlo', difficulty: 'intermedio', duration: '11 min', tags: ['effect()', 'loops'], completed: false },
  { id: 'anti-5', title: 'Computed con side effects', description: 'No hacer peticiones HTTP ni DOM dentro de computed', difficulty: 'intermedio', duration: '9 min', tags: ['computed()', 'side-effects'], completed: false },
  { id: 'anti-6', title: 'Demasiados signals granulares', description: 'Equilibrio entre granularidad y mantenibilidad', difficulty: 'avanzado', duration: '10 min', tags: ['arquitectura', 'granularidad'], completed: false },
  { id: 'anti-7', title: 'Crear signals en bucles o condicionales', description: 'Por qué los signals deben crearse de forma estable', difficulty: 'intermedio', duration: '8 min', tags: ['signal()', 'estabilidad'], completed: false },
  { id: 'anti-8', title: 'Leer signals en constructores de servicios', description: 'Inyección y orden de inicialización', difficulty: 'avanzado', duration: '9 min', tags: ['constructor', 'inyección'], completed: false },
  { id: 'anti-9', title: 'Exponer WritableSignal por error', description: 'Cuándo usar asReadonly() en servicios', difficulty: 'intermedio', duration: '7 min', tags: ['asReadonly()', 'API'], completed: false },
  { id: 'anti-10', title: 'Resumen anti-patrones', description: 'Checklist para revisar tu código', difficulty: 'básico', duration: '5 min', tags: ['resumen', 'anti-patrones'], completed: false },
  { id: 'anti-11', title: 'Ejemplos vivos: qué no hacer', description: 'Código real de anti-patrones y cómo corregirlo', difficulty: 'intermedio', duration: '12 min', tags: ['ejemplos', 'errores', 'corrección'], completed: false },
];
