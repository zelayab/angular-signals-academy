import type { LessonContent } from '../../../models/lesson.model';
import { SOURCES } from '../../sources.data';

export const ANTI_PATRONES_CONTENT: Record<string, LessonContent> = {
  'anti-1': {
    definition: `Errores comunes: (1) Olvidar () al leer: {{ count }} en vez de {{ count() }}. (2) Mutar directamente: items().push(x). (3) Escribir en un signal que el effect lee → loop infinito. (4) Hacer side effects en computed. (5) Crear signals dentro de bucles o condicionales (deben ser estables).`,
    como: `CÓMO evitarlos: Siempre {{ count() }}; items.update(list => [...list, x]); effect solo lee, no escribe en lo que lee; computed solo return; signals a nivel de clase o constructor.`,
    porQue: `POR QUÉ: (1) Sin () no obtienes el valor. (2) Mutación no dispara actualización. (3) Escribir lo que lees dispara de nuevo el effect. (4) computed debe ser puro. (5) Referencia estable para el tracking.`,
    cuando: `CUÁNDO: Revisar al escribir código; al depurar "no se actualiza" o "app se congela".`,
    conQue: `CON QUÉ: () para leer; update/spread; effect sin escribir lo que lee; computed sin I/O; signals estables.`,
    paraQue: `PARA QUÉ: Evitar los cinco errores más frecuentes con signals.`,
    realWorld: `En producción: "la UI no se actualiza" → muchas veces es (1). "La app se congela" → a menudo (3). "Comportamiento raro" → (5). Revisa la consola y los logs; Angular puede avisar en desarrollo.`,
    code: `// Mal
{{ count }}
items().push(x);
effect(() => { count.set(count() + 1); });
computed(() => { fetch(...); return x; });
// Bien
{{ count() }}
items.update(list => [...list, x]);
effect(() => { console.log(count()); });
computed(() => count() * 2);`,
    commonErrors: ['No revisar la documentación cuando algo falla', 'No usar TypeScript estricto (detecta algunos errores)'],
    checklist: ['¿Uso () para leer?', '¿Creo copias al actualizar?', '¿Evito escribir en signals que el effect lee?'],
    explainLikeIm5: `Los errores típicos son: no mirar con () la caja, meter la mano y cambiar la caja por dentro, o hacer que el ayudante (effect) escriba en la caja que él mismo lee (se vuelve loco).`,
    challenge: { description: 'Lista los 5 errores de esta lección y escribe un ejemplo "bien" para cada uno.', hint: 'Revisa la sección de código.' },
    sources: [SOURCES.guideSignals],
  },
  'anti-2': {
    definition: `Mutación directa: nunca hagas array.push(), array.splice(), obj.prop = x sobre el valor que devuelve un signal. Angular no detecta cambios por referencia si la referencia es la misma. Siempre items.update(list => [...list, x]) o list.filter(...) para crear una nueva referencia.`,
    como: `CÓMO: items.update(list => [...list, newItem]); config.update(c => ({ ...c, theme: 'dark' })); para quitar: items.update(list => list.filter(i => i.id !== id)). Nunca items().push(x).`,
    porQue: `POR QUÉ: Angular (y equal por defecto) comparan por referencia; mutar en sitio no cambia la referencia y la UI no se actualiza.`,
    cuando: `CUÁNDO: Siempre que el valor del signal sea objeto o array.`,
    conQue: `CON QUÉ: update con función que devuelve nuevo array/objeto; spread, filter, map.`,
    paraQue: `PARA QUÉ: Que los cambios se detecten correctamente.`,
    realWorld: `Si haces cart().push(item), el array interno cambia pero la referencia es la misma. El template que lee cart() no se re-renderiza. Debes hacer cart.update(c => [...c, item]).`,
    code: `// Mal
this.items().push(newItem);
this.config().theme = 'dark';
// Bien
this.items.update(list => [...list, newItem]);
this.config.update(c => ({ ...c, theme: 'dark' }));`,
    commonErrors: ['Mutar "un poco" pensando que no importa', 'Olvidar spread en objetos anidados'],
    checklist: ['¿Estoy creando una copia nueva?', '¿Uso spread o filter/map en lugar de mutar?'],
    explainLikeIm5: `No cambies el juguete por dentro; trae un juguete nuevo y sustituye la caja entera. Así Angular ve que algo cambió.`,
    challenge: { description: 'Refactoriza código que hace items().splice(i, 1) para usar update + filter.', hint: 'items.update(list => list.filter((_, idx) => idx !== i))' },
    sources: [SOURCES.apiSignal],
  },
  'anti-3': {
    definition: `Los signals solo pueden leerse dentro de un "contexto de reactividad": en el cuerpo de un computed o effect, o durante la ejecución del template (cuando Angular está evaluando bindings). No los leas en el constructor de un servicio antes de que Angular haya establecido el contexto, ni en callbacks de setTimeout/setInterval sin que formen parte de un effect. Si necesitas leer un signal "fuera" de contexto, usa untracked o asegúrate de estar dentro de un effect.`,
    como: `CÓMO: No leer en constructor(); leer en effect(() => { ... }), en computed, o en métodos llamados desde template/effect. Si necesitas leer en callback async, hazlo dentro de un effect que registre ese callback.`,
    porQue: `POR QUÉ: Angular necesita un contexto de reactividad para rastrear dependencias; fuera de ese contexto el valor puede ser incorrecto o romper.`,
    cuando: `CUÁNDO: Al inyectar servicios que tienen signals; al usar setTimeout/setInterval que lean estado.`,
    conQue: `CON QUÉ: effect, computed, template; no constructor ni callbacks "sueltos".`,
    paraQue: `PARA QUÉ: Evitar errores de contexto y valores incorrectos.`,
    realWorld: `En un servicio: constructor() { console.log(this.count()); } puede fallar o dar valor incorrecto si count depende de algo que aún no está. Lee en effect(() => ...) o en un método llamado desde el template o desde un effect.`,
    code: `// Mal: leer en constructor
constructor() { this.user(); }
// Bien: leer en effect o en método invocado tras init
effect(() => { this.doSomething(this.user()); });`,
    commonErrors: ['Leer signal en constructor de servicio', 'Leer en callback de setTimeout sin estar en effect'],
    checklist: ['Leer signals en template, computed, effect o métodos llamados desde ellos', 'No leer en constructor ni en callbacks "sueltos"'],
    explainLikeIm5: `Solo puedes mirar la caja cuando estás en la habitación de Angular (template, effect, computed). Si miras desde la calle (constructor), puede que la caja aún no esté.`,
    challenge: { description: 'Mueve una lectura de signal del constructor a un effect que se ejecute al iniciar.', hint: 'effect(() => { ... this.mySignal(); })' },
    sources: [SOURCES.apiEffect],
  },
  'anti-4': {
    definition: `Loop infinito en effect: el effect lee count() y hace count.set(count() + 1). El effect se ejecuta, lee count, escribe count, Angular detecta cambio y vuelve a ejecutar el effect. Solución: no escribir en un signal que el effect lee. Si necesitas escribir, hazlo en otro signal que el effect no lea, o usa allowSignalWrites con mucho cuidado.`,
    como: `CÓMO: Effect solo lee; si escribes, hazlo en un signal que no leas en el mismo effect (ej. routeParams → selectedId). Nunca count.set(count() + 1) dentro de un effect que lee count.`,
    porQue: `POR QUÉ: Leer → escribir en lo leído → Angular detecta cambio → re-ejecuta effect → loop infinito.`,
    cuando: `CUÁNDO: Al diseñar effects; al depurar "la app se congela".`,
    conQue: `CON QUÉ: allowSignalWrites solo si escribes en signal que no lees; revisar dependencias.`,
    paraQue: `PARA QUÉ: Evitar bucles infinitos.`,
    realWorld: `Ejemplo típico: effect(() => { router.navigate([], { queryParams: { q: query() } }); }) y dentro del effect también lees algo que se actualiza con la navegación y escribes en query. Asegúrate de que el effect no lee el signal en el que escribe.`,
    code: `// Loop
effect(() => count.set(count() + 1));
// Bien
effect(() => { console.log(count()); });
// O escribir en otro: effect(() => { other.set(count()); })`,
    commonErrors: ['Escribir en el mismo signal que se lee', 'allowSignalWrites sin revisar dependencias'],
    checklist: ['El effect no escribe en lo que lee', 'Si escribe, ese signal no está en el cuerpo del effect'],
    explainLikeIm5: `El ayudante no puede escribir en la pizarra que está mirando. Si escribe "1", mira "1", escribe "2", mira "2"... nunca para.`,
    challenge: { description: 'Encuentra (o escribe) un effect que cause loop y corrígelo.', hint: 'Quita la escritura o muévela a un signal que no leas.' },
    sources: [SOURCES.apiEffect],
  },
  'anti-5': {
    definition: `Computed con side effects: no hagas peticiones HTTP, localStorage.setItem, console.log, ni manipulación DOM dentro de un computed. El computed debe ser una función pura de los signals que lee. Si necesitas "hacer algo" cuando cambie un valor, usa effect().`,
    como: `CÓMO: computed(() => count() * 2); bien. computed(() => { localStorage.setItem('x', count()); return count(); }); mal → effect(() => localStorage.setItem('x', count())); bien.`,
    porQue: `POR QUÉ: Los computed pueden ejecutarse más de una vez; los side effects deben estar en effect.`,
    cuando: `CUÁNDO: Al revisar: "¿este computed hace algo más que return?" → si sí, mover a effect.`,
    conQue: `CON QUÉ: effect() para persistir, log, DOM; computed solo lectura y return.`,
    paraQue: `PARA QUÉ: Comportamiento predecible del computed.`,
    realWorld: `computed(() => { this.http.get(...).subscribe(...); return x; }) es incorrecto. computed(() => fetch(...)) también. Para reaccionar a un id y cargar datos: resource(id, () => this.http.get(...)) o toSignal(toObservable(id).pipe(switchMap(...))).`,
    code: `// Mal
computed(() => { localStorage.setItem('x', count()); return count(); });
// Bien
computed(() => count() * 2);
effect(() => localStorage.setItem('x', count()));`,
    commonErrors: ['Poner cualquier I/O o escritura en computed', 'Confundir "derivar" con "reaccionar"'],
    checklist: ['Computed = solo lectura de signals y return', 'Cualquier acción = effect'],
    explainLikeIm5: `El amigo que calcula no puede ir a la tienda ni escribir en el cajón. Solo mira la pizarra y te dice un número. Para hacer cosas usa el ayudante (effect).`,
    challenge: { description: 'Busca en tu código un computed que haga algo más que return y muévelo a effect o a un método.', hint: 'Cualquier cosa que no sea "leer signals y devolver valor".' },
    sources: [SOURCES.apiComputed, SOURCES.apiEffect],
  },
  'anti-6': {
    definition: `Demasiados signals granulares: tener un signal por cada campo de un formulario (nombre, apellido, email, ...) puede funcionar pero genera mucho boilerplate. Considera un signal de objeto (formState = signal({ nombre, apellido, email })) o FormGroup con valueChanges y toSignal. Equilibrio: granularidad donde necesites re-renders finos; agrupación donde sea un solo "bloque" lógico.`,
    como: `CÓMO: Si 10 campos solo se usan juntos (submit), form = signal({ name: '', surname: '' }) o FormGroup + toSignal. Si un campo se usa en muchos sitios (tema), un signal por tema está bien.`,
    porQue: `POR QUÉ: Demasiados signals = mucho boilerplate; un objeto o FormGroup puede ser más práctico para formularios completos.`,
    cuando: `CUÁNDO: Formularios con muchos campos; revisar si siempre se actualizan juntos.`,
    conQue: `CON QUÉ: signal({ ... }), FormGroup, toSignal(valueChanges).`,
    paraQue: `PARA QUÉ: Equilibrio entre granularidad y simplicidad.`,
    realWorld: `Si 10 campos solo se usan juntos (submit del formulario), un signal con objeto o un formulario reactivo puede ser mejor. Si un campo se usa en muchos sitios (ej. tema), un signal por tema está bien.`,
    code: `// Muchos signals
name = signal(''); surname = signal('');
// Agrupado
form = signal({ name: '', surname: '' });
// O formulario reactivo + toSignal(valueChanges)`,
    commonErrors: ['Crear signal por cada propiedad "por si acaso"', 'Un solo signal gigante que cambia todo el tiempo'],
    checklist: ['Agrupar lo que se usa junto', 'Granularidad donde el re-render fino importe'],
    explainLikeIm5: `No necesitas una caja por cada lápiz si siempre usas la caja de lápices entera. Pero si una lucecita es independiente, su caja está bien.`,
    challenge: { description: 'Revisa si tienes muchos signals que siempre se actualizan juntos y considera agruparlos.', hint: 'signal({ a, b, c }) o FormGroup.' },
    sources: [SOURCES.apiSignal],
  },
  'anti-7': {
    definition: `Los signals deben crearse de forma estable: en el cuerpo de la clase del componente o del servicio, o en el constructor. No crees signals dentro de bucles (for, map) ni dentro de condicionales (if) que se ejecuten en cada render. Cada ejecución crearía un signal nuevo y se pierde la referencia reactiva.`,
    como: `CÓMO: count = signal(0); a nivel de clase. No: getSignal() { return signal(0); } ni @for (...) { const s = signal(...); }. Si necesitas estado por ítem, usa Map o signal de objeto con ids.`,
    porQue: `POR QUÉ: Angular rastrea dependencias por referencia; un signal nuevo en cada render rompe el tracking.`,
    cuando: `CUÁNDO: Al crear signals; no dentro de métodos llamados desde template ni en *ngFor/@for.`,
    conQue: `CON QUÉ: Propiedades de clase o constructor; no dentro de funciones que se ejecuten en cada render.`,
    paraQue: `PARA QUÉ: Referencias estables y reactividad correcta.`,
    realWorld: `Mal: @for (item of items(); track item.id) { const s = signal(item); } — cada item tendría un signal nuevo en cada render. Bien: los items vienen de un signal de array; si necesitas "estado por ítem", puede ser un Map o un signal de objeto con ids como clave.`,
    code: `// Mal
getSignal() { return signal(0); }  // nuevo cada vez
// Bien
count = signal(0);  // una sola vez
// Mal en template
@for (...) { {{ getSignal()() }} }`,
    commonErrors: ['Crear signal dentro de función llamada desde template', 'Crear signal en *ngFor o @for'],
    checklist: ['Signals creados una vez (clase o constructor)', 'No crear en funciones que se llaman en cada render'],
    explainLikeIm5: `La caja mágica tiene que estar en un sitio fijo. No puedes crear una caja nueva cada vez que alguien entra; si no, nadie sabe qué caja mirar.`,
    challenge: { description: 'Comprueba que no tienes signal() dentro de un método que se llama desde el template.', hint: 'Busca signal( en métodos.' },
    sources: [SOURCES.apiSignal],
  },
  'anti-8': {
    definition: `Leer signals en el constructor de un servicio puede ser problemático: el orden de inyección y la inicialización de otros servicios puede hacer que el signal aún no tenga el valor esperado. Si un servicio A inyecta un servicio B y en el constructor de A lees B.someSignal(), B puede no estar listo. Preferir effect() o inicialización en un método que se llame después (ej. desde un componente en ngOnInit).`,
    como: `CÓMO: No leer otherService.signal() en constructor. Usar effect(() => { if (this.auth.user()) this.doSomething(); }) o un método init() que el componente llame en ngOnInit.`,
    porQue: `POR QUÉ: El orden de inyección y bootstrap puede hacer que el signal del otro servicio aún no tenga valor; effect se ejecuta cuando el contexto está listo.`,
    cuando: `CUÁNDO: Servicios que dependen de signals de otros servicios.`,
    conQue: `CON QUÉ: effect() o método init() llamado desde componente; no constructor.`,
    paraQue: `PARA QUÉ: Evitar valores incorrectos por orden de inicialización.`,
    realWorld: `AuthService tiene user = signal(null). Otro servicio en constructor lee user(). Si AuthService aún no ha hecho la petición, user() es null. Mejor: ese otro servicio no lee user en constructor; lee en un effect o cuando un componente llame a un método que use user().`,
    code: `// Riesgoso
    constructor(private auth: AuthService) {
    if (this.auth.user()) this.doSomething();
    }
    // Mejor
    constructor(private auth: AuthService) {
    effect(() => { if (this.auth.user()) this.doSomething(); });
    }`,
    commonErrors: ['Depender del valor de un signal en constructor', 'Orden de inyección implícito'],
    checklist: ['No leer signals de otros servicios en constructor', 'Usar effect o llamada diferida'],
    explainLikeIm5: `En el constructor aún no están todas las cajas de los demás. Mejor mirar las cajas cuando ya esté todo (effect o cuando te llamen).`,
    challenge: { description: 'Si tienes un servicio que lee otro signal en constructor, mueve esa lógica a un effect.', hint: 'effect(() => { ... otherService.signal(); })' },
    sources: [SOURCES.apiEffect],
  },
  'anti-9': {
    definition: `Exponer WritableSignal por error: si un servicio tiene items = signal([]) y lo expone como público, cualquier componente puede hacer items().push(x) (mutación) o items.set(...). Mejor: private items = signal([]); readonly items = this.items.asReadonly(); y métodos addItem, removeItem. Así la API es clara y evitas mutaciones desde fuera.`,
    como: `CÓMO: private items = signal<Item[]>([]); readonly cartItems = this.items.asReadonly(); addItem(item) { this.items.update(...); }. TypeScript impide .set()/.update() fuera del servicio.`,
    porQue: `POR QUÉ: Exponer writable permite mutaciones o .set() por error; asReadonly() documenta y garantiza solo lectura.`,
    cuando: `CUÁNDO: Siempre que expongas estado desde un servicio.`,
    conQue: `CON QUÉ: private + asReadonly(); métodos públicos para modificar.`,
    paraQue: `PARA QUÉ: API clara y sin mutaciones no deseadas.`,
    realWorld: `CartService: si expones cartItems como WritableSignal, alguien puede hacer cartItems.set([]) por error y vaciar el carrito. Con asReadonly() TypeScript impide .set() y .update() fuera del servicio.`,
    code: `// Frágil
readonly items = signal([]);  // sigue siendo WritableSignal
// Bien
private items = signal<Item[]>([]);
readonly cartItems = this.items.asReadonly();`,
    commonErrors: ['Exponer signal writable "por comodidad"', 'No tipar el readonly como Signal<T>'],
    checklist: ['Servicios exponen asReadonly()', 'Solo métodos para modificar'],
    explainLikeIm5: `No des la llave de la caja a todo el mundo. Pon un cristal (asReadonly()) para que solo miren; solo tú tienes la llave (métodos del servicio).`,
    challenge: { description: 'Revisa tus servicios: ¿algún signal público tiene .set/.update? Cámbialo a asReadonly().', hint: 'Busca signal( en servicios y que sea readonly sin asReadonly.' },
    sources: [SOURCES.apiSignal],
  },
  'anti-10': {
    definition: `Checklist anti-patrones: (1) ¿Leo signals con () en template y código? (2) ¿Actualizo arrays/objetos con update/spread, no mutando? (3) ¿Leo signals solo en contexto (template, computed, effect)? (4) ¿Mi effect no escribe en lo que lee? (5) ¿Mis computed no tienen side effects? (6) ¿No tengo demasiados signals granulares sin necesidad? (7) ¿Creo signals solo en clase/constructor? (8) ¿No leo signals de otros en constructor? (9) ¿Expongo asReadonly() en servicios?`,
    como: `CÓMO: Repasa los 9 puntos antes de un PR; documenta en el equipo o en el README. Un linter o comentario puede recordar "no mutar", "computed puro", "effect no escribe lo que lee".`,
    porQue: `POR QUÉ: Revisar la lista evita reintroducir anti-patrones y mantiene la calidad.`,
    cuando: `CUÁNDO: Antes de merge; al revisar código; al onboarding de nuevos.`,
    conQue: `CON QUÉ: Los 9 puntos de la definición; documentación del equipo.`,
    paraQue: `PARA QUÉ: Código consistente y sin anti-patrones típicos.`,
    realWorld: `Repasa la lista antes de un PR. Un linter o comentario en el README del equipo puede recordar "no mutar", "computed puro", "effect no escribe lo que lee".`,
    code: `// Checklist rápido
// () para leer | update() para arrays | effect sin escribir lo que lee
// computed sin I/O | signals estables | asReadonly() en servicios`,
    commonErrors: ['No revisar nunca la lista', 'Asumir que "no me pasa" sin comprobar'],
    checklist: ['Revisar los 9 puntos periódicamente', 'Documentar en el equipo'],
    explainLikeIm5: `Antes de entregar el trabajo, repasa: ¿miro con ()? ¿No cambio la caja por dentro? ¿El ayudante no escribe en lo que mira? ¿El amigo que calcula no hace trampas?`,
    challenge: { description: 'Imprime o guarda esta checklist y aplícala a un componente tuyo.', hint: 'Los 9 puntos de la definición.' },
    sources: [SOURCES.guideSignals],
  },
  'anti-11': {
    definition: `Ejemplos vivos de qué no hacer: (1) Mutación: items().push(x) en lugar de update(list => [...list, x]). (2) Loop en effect: effect que lee count() y hace count.set(count() + 1). (3) Side effect en computed: computed que hace fetch() o document.querySelector. (4) Signal en condicional: if (flag) const s = signal(0) crea signal inestable. (5) Exponer writable: servicio que devuelve el signal sin asReadonly(). Cada uno tiene una corrección clara.`,
    como: `CÓMO corregir: Mutación → update con copia. Loop → no escribir lo que el effect lee. Side effect en computed → mover a effect. Signal en condicional → crear siempre en el mismo orden. Writable expuesto → asReadonly().`,
    porQue: `POR QUÉ ver ejemplos: el código incorrecto es fácil de escribir; ver el error y la corrección ayuda a no repetirlo.`,
    cuando: `CUÁNDO: Al revisar código propio o de equipo; después de leer los anti-patrones 1-10.`,
    conQue: `CON QUÉ: update(), effect sin escribir dependencias, computed puro, signals en nivel estable, asReadonly().`,
    paraQue: `PARA QUÉ: Reconocer y corregir anti-patrones en código real.`,
    realWorld: `En code review: busca mutaciones (push, splice), effects que hacen set en lo que leen, computed con fetch o DOM, y servicios que exponen WritableSignal.`,
    code: `// Mal: mutación
items().push(x);
// Bien: update
items.update(list => [...list, x]);
// Mal: loop en effect
effect(() => count.set(count() + 1));
// Bien: no escribir lo que lees`,
    commonErrors: ['Corregir solo uno y dejar otros anti-patrones', 'No añadir tests tras corregir'],
    checklist: ['Revisar mutaciones', 'Revisar effects que escriben lo que leen', 'Revisar computed con I/O', 'Revisar estabilidad de signals', 'Revisar asReadonly() en servicios'],
    explainLikeIm5: 'Estos son los errores que más se cometen. Si ves uno en tu código, cámbialo por la versión buena.',
    challenge: { description: 'Busca en tu código un update() que podría ser una mutación disfrazada.', hint: 'Cualquier .push o .splice dentro de update puede ser sospechoso si no devuelves copia.' },
    sources: [SOURCES.apiSignal],
  },
};
