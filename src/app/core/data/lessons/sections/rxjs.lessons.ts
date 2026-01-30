import type { Lesson } from '../../../models/lesson.model';

export const RXJS_LESSONS: Lesson[] = [
  { id: 'rx-1', title: 'toSignal() y toObservable()', description: 'Convertir entre Signals y Observables', difficulty: 'intermedio', duration: '15 min', tags: ['rxjs', 'interop'], completed: false },
  { id: 'rx-2', title: 'toSignal() con initialValue', description: 'Manejar Observables que no emiten de inmediato', difficulty: 'intermedio', duration: '8 min', tags: ['toSignal()', 'rxjs'], completed: false },
  { id: 'rx-3', title: 'toObservable() y efecto en template', description: 'Exponer un signal como Observable para operadores', difficulty: 'intermedio', duration: '11 min', tags: ['toObservable()', 'rxjs'], completed: false },
  { id: 'rx-4', title: 'Combinar Observables y Signals', description: 'Patrones para usar ambos en el mismo componente', difficulty: 'avanzado', duration: '14 min', tags: ['rxjs', 'signals', 'combinar'], completed: false },
  { id: 'rx-5', title: 'Migrar de Observable a Signal', description: 'Reemplazar async pipe por toSignal() paso a paso', difficulty: 'intermedio', duration: '12 min', tags: ['migración', 'toSignal()'], completed: false },
  { id: 'rx-6', title: 'toSignal() y manejo de errores', description: 'Opción requireSync y manejo de errores en Observables', difficulty: 'intermedio', duration: '10 min', tags: ['toSignal()', 'errores'], completed: false },
  { id: 'rx-7', title: 'DestroyRef y suscripciones', description: 'Cuándo seguir usando subscribe() junto a signals', difficulty: 'intermedio', duration: '9 min', tags: ['DestroyRef', 'rxjs'], completed: false },
  { id: 'rx-8', title: 'Resumen RxJS + Signals', description: 'Cuándo usar cada uno y puentes recomendados', difficulty: 'básico', duration: '6 min', tags: ['resumen', 'rxjs', 'signals'], completed: false },
  { id: 'rx-9', title: 'Decisión rápida: Signal u Observable', description: 'Árbol de decisión y ejemplos para elegir en tu código', difficulty: 'intermedio', duration: '10 min', tags: ['rxjs', 'toSignal', 'decisión'], completed: false },
];
