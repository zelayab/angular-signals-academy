import type { Lesson } from '../../../models/lesson.model';

export const PATRONES_LESSONS: Lesson[] = [
  { id: 'pat-1', title: 'State management con Signals', description: 'Patrones probados para gestionar estado complejo', difficulty: 'avanzado', duration: '20 min', tags: ['state', 'arquitectura'], completed: false },
  { id: 'pat-2', title: 'Servicio de estado con signals', description: 'Un único servicio que expone signals readonly', difficulty: 'intermedio', duration: '15 min', tags: ['servicios', 'estado'], completed: false },
  { id: 'pat-3', title: 'Feature stores con signals', description: 'Estado por feature sin NgRx', difficulty: 'avanzado', duration: '18 min', tags: ['stores', 'feature'], completed: false },
  { id: 'pat-4', title: 'Computed para vistas derivadas', description: 'Listas filtradas, ordenadas y paginadas con computed', difficulty: 'intermedio', duration: '14 min', tags: ['computed()', 'listas'], completed: false },
  { id: 'pat-5', title: 'Signals y rutas', description: 'Reaccionar a params o data del router con signals', difficulty: 'intermedio', duration: '12 min', tags: ['router', 'signals'], completed: false },
  { id: 'pat-6', title: 'Patrón reducer con update()', description: 'Actualizaciones complejas con funciones puras', difficulty: 'avanzado', duration: '16 min', tags: ['update()', 'reducer'], completed: false },
  { id: 'pat-7', title: 'Capa de presentación y estado', description: 'Separar UI de estado con signals en servicios', difficulty: 'avanzado', duration: '15 min', tags: ['arquitectura', 'presentación'], completed: false },
  { id: 'pat-8', title: 'Patrón "source of truth"', description: 'Un solo lugar que posee el estado y el resto deriva', difficulty: 'intermedio', duration: '11 min', tags: ['estado', 'single source'], completed: false },
  { id: 'pat-9', title: 'Signals en librerías reutilizables', description: 'Exponer API con signals para consumidores', difficulty: 'avanzado', duration: '13 min', tags: ['librerías', 'API'], completed: false },
  { id: 'pat-10', title: 'Resumen de patrones', description: 'Cuándo aplicar cada patrón en tu app', difficulty: 'intermedio', duration: '6 min', tags: ['resumen', 'patrones'], completed: false },
  { id: 'pat-11', title: 'Practica: Carrito con computed', description: 'Estado derivado complejo en el Lab del carrito', difficulty: 'avanzado', duration: '18 min', tags: ['computed()', 'lab', 'carrito'], completed: false, labId: 'lab-4' },
];
