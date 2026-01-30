import type { Lesson } from '../../../models/lesson.model';

export const INTRODUCCION_LESSONS: Lesson[] = [
  { id: 'intro-1', title: '¿Qué son los Signals?', description: 'Una introducción al sistema de reactividad primitiva de Angular', difficulty: 'básico', duration: '8 min', tags: ['conceptos', 'reactividad'], completed: false },
  { id: 'intro-2', title: 'Historia y motivación', description: 'Por qué Angular adoptó Signals y cómo mejora el rendimiento', difficulty: 'básico', duration: '5 min', tags: ['historia', 'rendimiento'], completed: false },
  { id: 'intro-3', title: 'Signals vs Zone.js', description: 'Comparación del modelo de detección de cambios tradicional con Signals', difficulty: 'intermedio', duration: '12 min', tags: ['zone.js', 'comparación'], completed: false },
  { id: 'intro-4', title: 'Cuándo usar Signals', description: 'Casos de uso ideales: estado local, derivados, sincronización', difficulty: 'básico', duration: '6 min', tags: ['conceptos', 'casos de uso'], completed: false },
  { id: 'intro-5', title: 'Ecosistema y compatibilidad', description: 'Signals con RxJS, con NgRx, migración gradual', difficulty: 'intermedio', duration: '10 min', tags: ['ecosistema', 'rxjs'], completed: false },
  { id: 'intro-6', title: 'Rendimiento y detección de cambios', description: 'Granularidad fina y menos ciclos de detección', difficulty: 'intermedio', duration: '9 min', tags: ['rendimiento', 'change detection'], completed: false },
  { id: 'intro-7', title: 'Glosario de Signals', description: 'Términos clave: writable, readonly, computed, effect', difficulty: 'básico', duration: '6 min', tags: ['conceptos', 'glosario'], completed: false },
  { id: 'intro-8', title: 'De Zone.js a zoneless', description: 'Cómo Angular permite ejecutar sin Zone.js usando Signals', difficulty: 'intermedio', duration: '11 min', tags: ['zone.js', 'zoneless'], completed: false },
  { id: 'intro-9', title: 'Comparación con otros frameworks', description: 'Signals vs React hooks, Vue reactivity, Solid', difficulty: 'intermedio', duration: '14 min', tags: ['comparación', 'frameworks'], completed: false },
  { id: 'intro-10', title: 'Roadmap y futuras APIs', description: 'input(), model(), output() y evolución del ecosistema', difficulty: 'básico', duration: '7 min', tags: ['roadmap', 'api'], completed: false },
  { id: 'intro-11', title: 'Primeros pasos en tu proyecto', description: 'Requisitos de versión y habilitar signals en Angular', difficulty: 'básico', duration: '5 min', tags: ['setup', 'migración'], completed: false },
  { id: 'intro-12', title: 'Recursos de aprendizaje', description: 'Documentación, cursos y comunidad para seguir aprendiendo', difficulty: 'básico', duration: '4 min', tags: ['recursos', 'comunidad'], completed: false },
  { id: 'intro-13', title: 'Cómo usar esta academia', description: 'Navegación, pestañas, Labs y Quiz para sacar el máximo partido', difficulty: 'básico', duration: '4 min', tags: ['guía', 'navegación'], completed: false },
];
