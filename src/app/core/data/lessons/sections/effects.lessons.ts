import type { Lesson } from '../../../models/lesson.model';

export const EFFECTS_LESSONS: Lesson[] = [
  { id: 'eff-1', title: 'Introducción a effect()', description: 'Ejecutar efectos secundarios cuando cambian los signals', difficulty: 'básico', duration: '10 min', tags: ['effect()', 'side-effects'], completed: false },
  { id: 'eff-2', title: 'Cleanup y ciclo de vida', description: 'Gestionar recursos y evitar memory leaks en effects', difficulty: 'intermedio', duration: '14 min', tags: ['cleanup', 'lifecycle'], completed: false },
  { id: 'eff-3', title: 'Effect y allowSignalWrites', description: 'Cuándo y cómo escribir signals dentro de un effect', difficulty: 'avanzado', duration: '12 min', tags: ['effect()', 'allowSignalWrites'], completed: false },
  { id: 'eff-4', title: 'Persistencia con effect()', description: 'Guardar en localStorage o sincronizar con backend', difficulty: 'intermedio', duration: '11 min', tags: ['effect()', 'localStorage'], completed: false, labId: 'lab-3' },
  { id: 'eff-5', title: 'untracked() dentro de effect', description: 'Leer un signal sin suscribir el effect a él', difficulty: 'intermedio', duration: '10 min', tags: ['untracked()', 'effect()'], completed: false },
  { id: 'eff-6', title: 'Efectos y formularios', description: 'Reaccionar a cambios de signals para validación o submit', difficulty: 'intermedio', duration: '13 min', tags: ['effect()', 'formularios'], completed: false },
  { id: 'eff-7', title: 'Effect para analytics y logging', description: 'Registrar eventos cuando cambian ciertos signals', difficulty: 'intermedio', duration: '9 min', tags: ['effect()', 'analytics'], completed: false },
  { id: 'eff-8', title: 'Effect y sincronización con URL', description: 'Mantener query params o hash en sync con estado', difficulty: 'avanzado', duration: '12 min', tags: ['effect()', 'router'], completed: false },
  { id: 'eff-9', title: 'Evitar loops en effects', description: 'Diseño seguro para no crear ciclos infinitos', difficulty: 'intermedio', duration: '10 min', tags: ['effect()', 'loops'], completed: false },
  { id: 'eff-10', title: 'Resumen de effects', description: 'Cuándo usar effect vs computed vs subscription', difficulty: 'básico', duration: '5 min', tags: ['resumen', 'effect()'], completed: false },
  { id: 'eff-11', title: 'Practica: Theme switcher', description: 'Aplica effect() para cambiar tema en el Lab', difficulty: 'intermedio', duration: '12 min', tags: ['effect()', 'lab', 'práctica'], completed: false, labId: 'lab-6' },
];
