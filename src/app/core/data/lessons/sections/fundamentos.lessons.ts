import type { Lesson } from '../../../models/lesson.model';

export const FUNDAMENTOS_LESSONS: Lesson[] = [
  { id: 'fund-1', title: 'Crear tu primer Signal', description: 'Aprende la sintaxis básica: signal(), set(), update()', difficulty: 'básico', duration: '10 min', tags: ['signal()', 'set()', 'update()'], completed: false, labId: 'lab-1' },
  { id: 'fund-2', title: 'Signals en templates', description: 'Cómo usar signals directamente en tus plantillas Angular', difficulty: 'básico', duration: '8 min', tags: ['templates', 'binding'], completed: false, labId: 'lab-1' },
  { id: 'fund-3', title: 'Signals en servicios', description: 'Patrones para gestionar estado global con signals', difficulty: 'intermedio', duration: '15 min', tags: ['servicios', 'estado'], completed: false },
  { id: 'fund-4', title: 'WritableSignal y ReadonlySignal', description: 'Tipos y asReadonly() para exponer solo lectura', difficulty: 'básico', duration: '7 min', tags: ['tipos', 'readonly'], completed: false },
  { id: 'fund-5', title: 'Valor inicial y equal()', description: 'Opciones de signal(): valor por defecto y comparación personalizada', difficulty: 'intermedio', duration: '11 min', tags: ['signal()', 'equal', 'opciones'], completed: false },
  { id: 'fund-6', title: 'Signals con objetos y arrays', description: 'Inmutabilidad: por qué no mutar y cómo actualizar correctamente', difficulty: 'intermedio', duration: '14 min', tags: ['inmutabilidad', 'arrays', 'objetos'], completed: false },
  { id: 'fund-7', title: 'Signals en componentes standalone', description: 'Uso típico en componentes sin módulos', difficulty: 'básico', duration: '6 min', tags: ['standalone', 'componentes'], completed: false },
  { id: 'fund-8', title: 'Destrucción y ciclo de vida', description: 'Cuándo se liberan los signals y buenas prácticas', difficulty: 'intermedio', duration: '10 min', tags: ['lifecycle', 'memory'], completed: false },
  { id: 'fund-9', title: 'Signals y OnPush', description: 'Comportamiento con ChangeDetectionStrategy.OnPush', difficulty: 'intermedio', duration: '9 min', tags: ['OnPush', 'change detection'], completed: false },
  { id: 'fund-10', title: 'Debugging de signals', description: 'DevTools y técnicas para inspeccionar valores y dependencias', difficulty: 'intermedio', duration: '8 min', tags: ['debugging', 'devtools'], completed: false },
  { id: 'fund-11', title: 'Testing de componentes con signals', description: 'Cómo escribir tests cuando tu componente usa signals', difficulty: 'intermedio', duration: '12 min', tags: ['testing', 'jest'], completed: false },
  { id: 'fund-12', title: 'Signals en guards e interceptors', description: 'Estado reactivo en servicios de routing y HTTP', difficulty: 'avanzado', duration: '13 min', tags: ['guards', 'interceptors'], completed: false },
  { id: 'fund-13', title: 'Serialización y hidratación', description: 'Consideraciones para SSR y transferencia de estado', difficulty: 'avanzado', duration: '14 min', tags: ['SSR', 'hidratación'], completed: false },
  { id: 'fund-14', title: 'Resumen de fundamentos', description: 'Checklist y mejores prácticas antes de pasar a computed', difficulty: 'básico', duration: '5 min', tags: ['resumen', 'checklist'], completed: false },
  { id: 'fund-15', title: 'Practica: Contador reactivo', description: 'Lleva a la práctica signal(), set() y update() en el Lab', difficulty: 'básico', duration: '10 min', tags: ['signal()', 'lab', 'práctica'], completed: false, labId: 'lab-1' },
];
