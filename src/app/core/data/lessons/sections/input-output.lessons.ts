import type { Lesson } from '../../../models/lesson.model';

export const INPUT_OUTPUT_LESSONS: Lesson[] = [
  { id: 'io-1', title: 'input() como Signal', description: 'La nueva forma de declarar inputs en Angular', difficulty: 'básico', duration: '8 min', tags: ['input()', 'componentes'], completed: false },
  { id: 'io-2', title: 'output() y comunicación', description: 'Emitir eventos con la nueva API de outputs', difficulty: 'básico', duration: '10 min', tags: ['output()', 'eventos'], completed: false },
  { id: 'io-3', title: 'input required()', description: 'Marcar un input como obligatorio', difficulty: 'básico', duration: '5 min', tags: ['input()', 'required'], completed: false },
  { id: 'io-4', title: 'input transform', description: 'Transformar el valor del input al leerlo', difficulty: 'intermedio', duration: '9 min', tags: ['input()', 'transform'], completed: false },
  { id: 'io-5', title: 'Model inputs (two-way binding)', description: 'model() para two-way binding con signals', difficulty: 'intermedio', duration: '12 min', tags: ['model()', 'two-way'], completed: false },
  { id: 'io-6', title: 'Composición con inputs y computed', description: 'Derivar estado del componente a partir de inputs', difficulty: 'intermedio', duration: '10 min', tags: ['input()', 'computed()'], completed: false },
  { id: 'io-7', title: 'input() con alias', description: 'Nombres públicos distintos a propiedades internas', difficulty: 'básico', duration: '5 min', tags: ['input()', 'alias'], completed: false },
  { id: 'io-8', title: 'output() con EventEmitter', description: 'Compatibilidad y migración desde EventEmitter', difficulty: 'intermedio', duration: '8 min', tags: ['output()', 'EventEmitter'], completed: false },
  { id: 'io-9', title: 'Inputs y contenido proyectado', description: 'content() y contentChildren() con signals', difficulty: 'avanzado', duration: '14 min', tags: ['content()', 'proyección'], completed: false },
  { id: 'io-10', title: 'Queries como signals', description: 'viewChild() y viewChildren() que devuelven signals', difficulty: 'intermedio', duration: '11 min', tags: ['viewChild', 'viewChildren'], completed: false },
  { id: 'io-11', title: 'Patrones input/output en listas', description: 'Componentes de lista con selección y eventos', difficulty: 'intermedio', duration: '12 min', tags: ['input()', 'output()', 'listas'], completed: false },
  { id: 'io-12', title: 'Resumen Input/Output + Signals', description: 'Checklist de la nueva API de componentes', difficulty: 'básico', duration: '5 min', tags: ['resumen', 'input()', 'output()'], completed: false },
  { id: 'io-13', title: 'Practica: Formulario con validación', description: 'Aplica input() y computed() en el Lab de validación', difficulty: 'intermedio', duration: '14 min', tags: ['input()', 'computed()', 'lab'], completed: false, labId: 'lab-5' },
];
