import type { Lesson } from '../../../models/lesson.model';

export const LABS_LESSONS: Lesson[] = [
  { id: 'lab-1', title: 'Lab 1: Contador reactivo', description: 'Crea un contador que se actualice en tiempo real usando signal()', difficulty: 'básico', duration: '10 min', tags: ['signal()', 'lab'], completed: false },
  { id: 'lab-2', title: 'Lab 2: Lista filtrada con computed', description: 'Implementa un filtro de búsqueda usando computed()', difficulty: 'intermedio', duration: '12 min', tags: ['computed()', 'lab'], completed: false },
  { id: 'lab-3', title: 'Lab 3: Sincronización con localStorage', description: 'Usa effect() para persistir el estado automáticamente', difficulty: 'intermedio', duration: '14 min', tags: ['effect()', 'lab'], completed: false },
  { id: 'lab-4', title: 'Lab 4: Estado derivado (carrito)', description: 'Calcula totales y promedios con múltiples computed', difficulty: 'avanzado', duration: '18 min', tags: ['computed()', 'lab', 'carrito'], completed: false },
  { id: 'lab-5', title: 'Lab 5: Formulario con validación', description: 'Validación reactiva con signals y computed', difficulty: 'intermedio', duration: '14 min', tags: ['computed()', 'lab', 'formularios'], completed: false },
  { id: 'lab-6', title: 'Lab 6: Theme switcher con effect', description: 'Cambiar tema claro/oscuro usando effect()', difficulty: 'intermedio', duration: '12 min', tags: ['effect()', 'lab', 'tema'], completed: false },
  { id: 'lab-7', title: 'Lab 7: Búsqueda y orden', description: 'Filtrar y ordenar una lista con computed', difficulty: 'básico', duration: '10 min', tags: ['computed()', 'lab', 'búsqueda'], completed: false },
];
