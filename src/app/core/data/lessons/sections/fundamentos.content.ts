import type { LessonContent } from '../../../models/lesson.model';
import { SOURCES } from '../../sources.data';

export const FUNDAMENTOS_CONTENT: Record<string, LessonContent> = {
  'fund-1': {
    definition: `signal() es la función constructora que crea un nuevo Signal writable (escribible).

Sintaxis completa:
\`\`\`typescript
const count = signal(0);
const user = signal<User | null>(null);
const items = signal<string[]>([], { equal: customEqualityFn });
\`\`\`

Métodos: .set(value), .update(fn), .asReadonly()`,
    como: `CÓMO: Crear un signal con signal(valorInicial). Usar .set(value) para asignar un valor nuevo o .update(fn) cuando necesitas el valor anterior. Opcional: segundo argumento { equal: (a, b) => boolean } para comparación custom.`,
    porQue: `POR QUÉ: signal() es la primitiva base para estado reactivo en Angular; set/update garantizan una única fuente de verdad y actualizaciones predecibles.`,
    cuando: `CUÁNDO: Estado local en componentes (contador, formulario) o estado en servicios que quieras exponer con asReadonly().`,
    conQue: `CON QUÉ: computed() para derivados, effect() para side effects, template con nombre(), servicios con asReadonly().`,
    paraQue: `PARA QUÉ: Tener una fuente de verdad reactiva que notifique a la UI y a otros signals cuando cambie.`,
    realWorld: `En una app real de gestión de tareas: taskTitle = signal(''), taskPriority = signal<'low'|'medium'|'high'>('medium'). En el template: [value]="taskTitle()" (input)="taskTitle.set($event.target.value)". Los signals te dan control granular sobre qué partes de tu UI se actualizan.`,
    code: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  template: \`
    <input [value]="newTodo()" (input)="newTodo.set($any($event.target).value)" />
    <button (click)="addTodo()" [disabled]="!newTodo().trim()">Agregar</button>
    <ul>
      @for (todo of todos(); track todo.id) {
        <li>{{ todo.text }}</li>
      }
    </ul>
  \`
})
export class TodoListComponent {
  newTodo = signal('');
  todos = signal<Todo[]>([]);
  addTodo() {
    const text = this.newTodo().trim();
    if (!text) return;
    this.todos.update(todos => [...todos, { id: this.nextId++, text, completed: false }]);
    this.newTodo.set('');
  }
}`,
    commonErrors: [
      'Mutar arrays/objetos directamente: todos().push(item) NO funciona',
      'Usar set() cuando update() es más apropiado',
      'No tipar signals que pueden ser null',
    ],
    checklist: [
      '¿Estoy creando copias nuevas de arrays/objetos al actualizar?',
      '¿El tipo del signal está correctamente definido?',
    ],
    explainLikeIm5: `Imagina una caja de juguetes especial. Solo TÚ puedes poner o sacar juguetes, pero todos pueden mirar. signal(0) = caja con 0. miCaja.set(5) = poner 5. miCaja.update(x => x + 1) = mirar y poner uno más. Cada vez que cambias algo, todos los que miran se enteran.`,
    challenge: { description: 'Crea una lista de compras con signals. Input para agregar items y marcar como comprados.', hint: 'items.update(list => [...list, newItem])' },
    sources: [SOURCES.apiSignal, SOURCES.guideSignals],
  },
  'fund-2': {
    definition: `En las plantillas Angular puedes leer un signal llamándolo como función: \`{{ contador() }}\`. El template se suscribe automáticamente: cuando el signal cambia, solo esa parte del DOM se actualiza. No necesitas async pipe para signals.`,
    como: `CÓMO: En el template siempre usa paréntesis: {{ nombre() }}, [value]="nombre()", (input)="nombre.set($any($event.target).value)". Cualquier binding que lea el signal se actualiza solo cuando ese signal cambia.`,
    porQue: `POR QUÉ: Sin () obtienes la referencia al signal, no el valor. Angular rastrea qué bindings leen qué signals y solo re-renderiza esas partes.`,
    cuando: `CUÁNDO: Siempre que quieras mostrar o enlazar un valor reactivo en el template.`,
    conQue: `CON QUÉ: Cualquier directiva o binding ([class], [disabled], @if, @for) que use el valor; no hace falta async pipe.`,
    paraQue: `PARA QUÉ: Que la vista refleje el estado actual y se actualice automáticamente cuando el signal cambie.`,
    realWorld: `En un formulario: \`[value]="nombre()"\` y \`(input)="nombre.set($any($event.target).value)"\`. Cada tecla actualiza el signal y cualquier otro binding que use nombre() se refresca.`,
    code: `template: \`
  <p>Hola, {{ nombre() }}</p>
  <input [value]="nombre()" (input)="nombre.set($any($event.target).value)" />
  <p>Caracteres: {{ nombre().length }}</p>
\`
nombre = signal('');`,
    commonErrors: ['Escribir {{ nombre }} en vez de {{ nombre() }}', 'Usar async pipe con un signal (no hace falta)'],
    checklist: ['Siempre usar () para leer el valor en el template', 'No llamar signals dentro de @if sin ()'],
    explainLikeIm5: `En la plantilla, cada vez que quieras ver el valor de la caja mágica, di su nombre con paréntesis: nombre(). Sin paréntesis Angular no sabe que quieres el valor de dentro.`,
    challenge: { description: 'Muestra en el template el doble del valor de un signal numérico.', hint: '{{ cantidad() * 2 }}' },
    sources: [SOURCES.guideSignals, SOURCES.apiSignal],
  },
  'fund-3': {
    definition: `Los signals pueden vivir en un servicio inyectable (providedIn: 'root' o en un componente). El servicio expone signals readonly (con .asReadonly()) y métodos que actualizan el estado. Así compartes estado entre varios componentes sin prop drilling.`,
    como: `CÓMO: Declara el signal como private en el servicio; expón readonly con asReadonly(). Crea métodos (addItem, removeItem) que llamen a .update() o .set() internamente. Los componentes inyectan el servicio y leen el signal readonly.`,
    porQue: `POR QUÉ: Un solo dueño del estado evita inconsistencias; asReadonly() impide que los consumidores modifiquen por error.`,
    cuando: `CUÁNDO: Estado que varios componentes deben leer o que debe persistir entre navegaciones (carrito, usuario, preferencias).`,
    conQue: `CON QUÉ: providedIn: 'root' o en route; computed en el servicio para derivados; componentes que inyectan y leen.`,
    paraQue: `PARA QUÉ: Compartir estado de forma predecible sin prop drilling y con una única fuente de verdad.`,
    realWorld: `Un CartService con cartItems = signal([]), total = computed(() => ...). Los componentes inyectan el servicio y leen cartItems() o total(); solo el servicio llama a cartItems.update().`,
    code: `@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<Item[]>([]);
  readonly cartItems = this.items.asReadonly();
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price, 0));
  addItem(item: Item) {
    this.items.update(list => [...list, item]);
  }
}`,
    commonErrors: ['Exponer el WritableSignal y que cualquiera haga .set()', 'Crear el signal fuera del servicio (en un componente) y esperar que otros lo vean'],
    checklist: ['¿Varios componentes necesitan este estado? → servicio', 'Exponer solo asReadonly() para quien solo debe leer'],
    explainLikeIm5: `El servicio es el dueño de la caja. Solo él puede meter o sacar cosas. Los demás solo pueden mirar (asReadonly()). Así no se pierden los juguetes.`,
    challenge: { description: 'Crea un servicio con un signal de tema (dark/light) y exponlo como readonly.', hint: 'private theme = signal(\'light\'); readonly themeState = this.theme.asReadonly();' },
    sources: [SOURCES.apiSignal, SOURCES.guideSignals],
  },
  'fund-4': {
    definition: `WritableSignal<T> tiene .set() y .update(). Signal<T> (readonly) solo se puede leer. Para exponer un signal sin que otros lo modifiquen, usa .asReadonly(): devuelve un Signal<T> que no expone set ni update.`,
    como: `CÓMO: private readonly items = signal([]); readonly cartItems = this.items.asReadonly();. Los consumidores solo pueden llamar cartItems(); TypeScript no permite .set() ni .update() en Signal<T>.`,
    porQue: `POR QUÉ: Evitar que cualquier componente o servicio modifique el estado por error; la API queda clara: solo el dueño escribe.`,
    cuando: `CUÁNDO: Siempre que expongas estado desde un servicio o desde un componente padre a hijos que no deben modificar.`,
    conQue: `CON QUÉ: Tipado Signal<T> vs WritableSignal<T>; métodos del servicio para las únicas escrituras permitidas.`,
    paraQue: `PARA QUÉ: Encapsulación y prevención de mutaciones no deseadas; diseño más seguro y fácil de razonar.`,
    realWorld: `En un servicio de usuario: private readonly user = signal<User | null>(null); readonly userState = this.user.asReadonly(). Los componentes leen userState() pero no pueden hacer userState.set(...). Solo el servicio actualiza el usuario.`,
    code: `private readonly count = signal(0);
readonly countReadonly = this.count.asReadonly();
// countReadonly() ✅  countReadonly.set(1) ❌ no existe`,
    commonErrors: ['Exponer el signal writable y depender de "no modificar" por convención', 'Confundir Signal con WritableSignal en tipos'],
    checklist: ['Si solo debe leerse desde fuera → asReadonly()', 'Tipar correctamente en APIs públicas'],
    explainLikeIm5: `asReadonly() es como poner la caja detrás de un cristal: todos pueden ver qué hay dentro, pero nadie puede meter o sacar. Solo tú (el servicio) tienes la llave.`,
    challenge: { description: 'En tu servicio, expón un signal como readonly y comprueba que en el componente no tienes .set().', hint: 'TypeScript te impedirá llamar .set() si el tipo es Signal.' },
    sources: [SOURCES.apiSignal],
  },
  'fund-5': {
    definition: `signal(valorInicial, opciones) acepta un segundo argumento con { equal?: (a, b) => boolean }. Por defecto usa Object.is. Si pasas una función custom, el signal solo "cambia" cuando equal devuelve false. Útil para objetos o arrays cuando quieres comparar por contenido.`,
    como: `CÓMO: signal({ theme: 'dark' }, { equal: (a, b) => a.theme === b.theme }). Si llamas set({ theme: 'dark' }) y el valor actual ya tiene theme 'dark', equal devuelve true y no se dispara actualización.`,
    porQue: `POR QUÉ: Evitar actualizaciones y re-renders cuando el "contenido lógico" no cambió; útil para objetos/arrays que se recrean pero son equivalentes.`,
    cuando: `CUÁNDO: Valores que son objetos o arrays y quieres que el signal solo notifique cuando el contenido relevante cambie.`,
    conQue: `CON QUÉ: Inmutabilidad al actualizar (siempre nuevo objeto/array); equal debe ser pura y consistente.`,
    paraQue: `PARA QUÉ: Menos ciclos de detección y menos trabajo en computed/effect que dependan de ese signal.`,
    realWorld: `Para un signal de configuración (objeto): equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) evita actualizaciones si el contenido es el mismo. Para arrays por referencia, la igualdad por defecto ya evita ruido si no mutas.`,
    code: `const config = signal(
  { theme: 'dark' },
  { equal: (a, b) => a.theme === b.theme }
);
config.set({ theme: 'dark' }); // No dispara actualización (equal devuelve true)`,
    commonErrors: ['Usar equal con objetos y mutar después (rompe inmutabilidad)', 'No usar equal cuando Object.is basta'],
    checklist: ['¿Mi valor es objeto/array y quiero comparar por contenido? → equal', 'Mantener inmutabilidad al actualizar'],
    explainLikeIm5: `equal es la regla que dice "esto cuenta como igual". Si pones la misma foto en el marco, la regla puede decir "no ha cambiado" y no se repinta la pared.`,
    challenge: { description: 'Crea un signal de array con equal que compare por longitud y primer elemento.', hint: 'equal: (a, b) => a.length === b.length && a[0] === b[0]' },
    sources: [SOURCES.apiSignal],
  },
  'fund-6': {
    definition: `Los signals deben tratarse como inmutables: no mutar objetos o arrays directamente. Siempre crea una copia nueva al actualizar. items().push(x) no dispara actualización; items.update(list => [...list, x]) sí. Angular compara por referencia por defecto.`,
    como: `CÓMO: Para arrays: update(list => [...list, x]) o list.filter(...), list.map(...). Para objetos: update(obj => ({ ...obj, key: value })). Nunca hacer valor().prop = x ni valor().push(x).`,
    porQue: `POR QUÉ: Angular (y la igualdad por defecto) detectan cambios por referencia; si mutas en sitio, la referencia es la misma y la UI no se actualiza.`,
    cuando: `CUÁNDO: Siempre que el valor del signal sea un objeto o array.`,
    conQue: `CON QUÉ: Spread operator, filter, map, slice; opcionalmente equal() si quieres comparar por contenido.`,
    paraQue: `PARA QUÉ: Garantizar que los cambios se detecten y que el flujo de datos sea predecible.`,
    realWorld: `En un carrito: carrito.update(list => [...list, newItem]) para agregar; carrito.update(list => list.filter(i => i.id !== id)) para quitar. Nunca carrito().push(newItem).`,
    code: `// Mal: mutación directa
items().push(x);  // no actualiza la UI
// Bien: nueva referencia
items.update(list => [...list, x]);`,
    commonErrors: ['Hacer .push() o .splice() en el valor del signal', 'Mutar propiedades de un objeto dentro del signal'],
    checklist: ['¿Estoy creando una copia nueva al actualizar?', '¿Uso spread o filter/map en lugar de mutar?'],
    explainLikeIm5: `No cambies el juguete por dentro; trae un juguete nuevo y cambia la caja entera. Así Angular se entera de que algo cambió.`,
    challenge: { description: 'Actualiza un signal de array para quitar el primer elemento sin mutar.', hint: 'items.update(list => list.slice(1))' },
    sources: [SOURCES.apiSignal, SOURCES.guideSignals],
  },
  'fund-7': {
    definition: `Los componentes standalone (standalone: true) pueden usar signals igual que los de módulos. No hay diferencia en la API: signal(), computed(), effect() funcionan igual. Los signals se crean en el constructor del componente o del servicio.`,
    como: `CÓMO: En un componente con standalone: true declara count = signal(0) a nivel de clase. No crees signals dentro de métodos ni en bucles; deben ser propiedades estables.`,
    porQue: `POR QUÉ: Los signals deben vivir en un contexto estable para que Angular rastree dependencias; crear uno nuevo en cada render rompe la reactividad.`,
    cuando: `CUÁNDO: Cualquier componente o servicio Angular; standalone es independiente de signals.`,
    conQue: `CON QUÉ: @angular/core (signal, computed, effect); no hace falta NgModule para signals.`,
    paraQue: `PARA QUÉ: Usar signals en proyectos modernos con standalone sin cambios en la API.`,
    realWorld: `En un componente standalone: count = signal(0); en el template {{ count() }}. No necesitas importar ningún módulo extra para signals; @angular/core basta.`,
    code: `@Component({
  standalone: true,
  template: \`<span>{{ count() }}</span>\`
})
export class MyComponent {
  count = signal(0);
}`,
    commonErrors: ['Crear signals en métodos o en bucles (deben ser estables)', 'Confundir standalone con signals (son independientes)'],
    checklist: ['Signals creados a nivel de clase o en constructor', 'standalone: true si no usas NgModule'],
    explainLikeIm5: `Los componentes "solitos" (standalone) pueden tener sus cajas mágicas igual que los que viven en módulos. Las cajas se crean una vez cuando nace el componente.`,
    challenge: { description: 'Crea un componente standalone con un signal y muéstralo en el template.', hint: 'standalone: true, count = signal(0), {{ count() }}' },
    sources: [SOURCES.guideSignals, SOURCES.apiSignal],
  },
  'fund-8': {
    definition: `Los signals se destruyen cuando el componente o servicio que los posee se destruye. No necesitas "desuscribirte" como con Observables: cuando el componente se va, el signal y sus dependencias se limpian. Los effects se destruyen con el contexto de inyección.`,
    como: `CÓMO: Los effects aceptan onCleanup: effect((onCleanup) => { const id = setInterval(...); onCleanup(() => clearInterval(id)); }). Cualquier recurso que crees (timer, subscription) debe limpiarse en el callback de cleanup.`,
    porQue: `POR QUÉ: Evitar memory leaks; si un effect crea un setInterval o una suscripción, sin cleanup seguirían activos tras destruir el componente.`,
    cuando: `CUÁNDO: Siempre que un effect cree recursos (setInterval, subscribe, addEventListener).`,
    conQue: `CON QUÉ: onCleanup dentro del effect; DestroyRef si necesitas registrar limpieza manual.`,
    paraQue: `PARA QUÉ: Que la destrucción del componente libere todos los recursos asociados.`,
    realWorld: `Si un effect hace setInterval, devuelve cleanup (clearInterval) para no dejar timers colgados. El effect en sí se destruye cuando el componente se destruye, pero los recursos que creaste (interval, subscription) debes limpiarlos en onCleanup.`,
    code: `effect((onCleanup) => {
  const id = setInterval(() => {}, 1000);
  onCleanup(() => clearInterval(id));
});`,
    commonErrors: ['No hacer cleanup en effects que crean recursos', 'Asumir que los effects se ejecutan una sola vez'],
    checklist: ['Effects que crean recursos → cleanup', 'No guardar referencias a signals destruidos'],
    explainLikeIm5: `Cuando te vas de la habitación, apagas la luz. Los effects tienen que "apagar" lo que encendieron (timers, suscripciones) cuando Angular los destruye.`,
    challenge: { description: 'Escribe un effect que abra una suscripción y la cancele en el cleanup.', hint: 'onCleanup(() => sub.unsubscribe())' },
    sources: [SOURCES.apiEffect],
  },
  'fund-9': {
    definition: `Con ChangeDetectionStrategy.OnPush, el componente solo se revisa cuando cambian sus inputs (referencia), emite un evento o un Observable emite (async pipe). Con signals, cuando lees un signal en el template, Angular marca el componente para revisión cuando ese signal cambia; OnPush y signals se llevan bien.`,
    como: `CÓMO: Añade changeDetection: ChangeDetectionStrategy.OnPush al componente. Cualquier binding que lea un signal ({{ count() }}) hará que el componente se re-renderice cuando ese signal cambie; no necesitas markForCheck().`,
    porQue: `POR QUÉ: OnPush reduce ciclos de detección; con signals, Angular sabe exactamente qué componentes dependen de qué signals, así que la actualización sigue siendo correcta.`,
    cuando: `CUÁNDO: Componentes que quieran máximo rendimiento y que obtengan su estado vía inputs o signals.`,
    conQue: `CON QUÉ: ChangeDetectionStrategy.OnPush; inputs con referencia nueva o signals que cambien.`,
    paraQue: `PARA QUÉ: Menos ciclos de detección manteniendo la reactividad correcta.`,
    realWorld: `En un componente OnPush que usa count = signal(0) y {{ count() }}, cuando count.set(1) Angular sabe que ese componente depende de count y lo re-renderiza. No necesitas ChangeDetectorRef.markForCheck() si la reactividad viene de signals.`,
    code: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`{{ count() }}\`
})
export class MyComponent {
  count = signal(0);
}`,
    commonErrors: ['Pensar que OnPush y signals no funcionan juntos', 'Mezclar Zone.js con OnPush y esperar que todo se actualice'],
    checklist: ['OnPush + signals = actualización cuando el signal cambia', 'No depender de Zone para actualizar componentes OnPush'],
    explainLikeIm5: `OnPush dice "solo revisa cuando me avisen". Los signals son los que avisan. Cuando cambias un signal que el componente lee, Angular revisa ese componente.`,
    challenge: { description: 'Crea un componente OnPush con un signal y verifica que la UI se actualiza al cambiar el signal.', hint: 'changeDetection: ChangeDetectionStrategy.OnPush' },
    sources: [SOURCES.guideSignals, SOURCES.changeDetection],
  },
  'fund-10': {
    definition: `Para depurar signals: (1) console.log(miSignal()) para ver el valor. (2) Angular DevTools (extensión del navegador) puede mostrar dependencias. (3) effect(() => console.log('changed', miSignal())) para ver cuándo cambia. (4) No hay "breakpoint en signal" nativo; usa logs o DevTools.`,
    como: `CÓMO: En desarrollo añade un effect temporal que haga console.log de los signals que te interesan. Usa Angular DevTools para inspeccionar el árbol y las propiedades. No dejes muchos logs en producción.`,
    porQue: `POR QUÉ: Los signals son valores síncronos; depurar con logs o DevTools es la forma práctica de ver estado y dependencias.`,
    cuando: `CUÁNDO: Cuando la UI no se actualiza como esperas, cuando sospeches de dependencias incorrectas o de efectos que no se ejecutan.`,
    conQue: `CON QUÉ: console.log, effect con log, Angular DevTools, breakpoints en métodos que actualizan el signal.`,
    paraQue: `PARA QUÉ: Encontrar por qué un signal no dispara actualizaciones o por qué un effect se ejecuta de más.`,
    realWorld: `En desarrollo: effect(() => console.log('count', count())) para rastrear cambios. En DevTools, inspecciona el componente y busca las propiedades que son signals (suelen ser funciones).`,
    code: `effect(() => {
  console.log('count', count(), 'double', double());
});`,
    commonErrors: ['Poner console.log en un computed (side effect)', 'No usar effect para debug temporal'],
    checklist: ['Usar effect solo para debug temporal o logging', 'No dejar muchos console.log en producción'],
    explainLikeIm5: `Para ver qué hay en la caja, mira con console.log(miSignal()). Para ver cuándo cambia, pon un ayudante (effect) que grite cada vez que cambie.`,
    challenge: { description: 'Añade un effect temporal que haga console.log cuando un signal cambie; luego quítalo.', hint: 'effect(() => console.log(mySignal()))' },
    sources: [SOURCES.apiSignal, SOURCES.apiEffect],
  },
  'fund-11': {
    definition: `Para testear componentes que usan signals: (1) Crea el componente con TestBed; (2) Los signals se leen llamándolos como función en el test: component.count(); (3) Actualiza con component.count.set(1) o update(); (4) fixture.detectChanges() sigue siendo útil si hay Zone; con zoneless, la actualización puede ser automática al cambiar el signal.`,
    como: `CÓMO: expect(component.count()).toBe(0); component.increment(); expect(component.count()).toBe(1). Para comprobar el template, fixture.detectChanges() y luego expect(fixture.nativeElement.textContent).toContain('1').`,
    porQue: `POR QUÉ: Los signals son síncronos; no necesitas fakeAsync solo para leer o actualizar; sí para operaciones async si las hay.`,
    cuando: `CUÁNDO: En tests unitarios de componentes o servicios que usan signals.`,
    conQue: `CON QUÉ: TestBed, fixture.componentInstance, .set()/.update(), fixture.detectChanges() si compruebas DOM.`,
    paraQue: `PARA QUÉ: Asegurar que el estado y la UI se comportan como esperas al interactuar.`,
    realWorld: `En un test: const c = fixture.componentInstance; expect(c.count()).toBe(0); c.increment(); expect(c.count()).toBe(1). No necesitas fakeAsync para leer o actualizar signals; solo para operaciones asíncronas.`,
    code: `it('should increment count', () => {
  const c = fixture.componentInstance;
  expect(c.count()).toBe(0);
  c.increment();
  expect(c.count()).toBe(1);
});`,
    commonErrors: ['Escribir expect(c.count).toBe(0) sin ()', 'No llamar detectChanges cuando el template depende del signal'],
    checklist: ['Leer signals con () en el test', 'Actualizar estado y comprobar el resultado'],
    explainLikeIm5: `En el test miras la caja con count() y la cambias con set o update; luego miras otra vez para ver si está bien.`,
    challenge: { description: 'Escribe un test que verifique que un botón incrementa un signal y el template muestra el valor.', hint: 'click en el botón, luego expect(comp.count()).toBe(1)' },
    sources: [SOURCES.guideSignals],
  },
  'fund-12': {
    definition: `Puedes usar signals en guards (canActivate, etc.) e interceptors: el guard o interceptor inyecta un servicio que expone signals (p. ej. authState). Lees el signal en el guard y devuelves true/false o UrlTree. Para operaciones asíncronas, el guard puede retornar un Observable que combine el signal con lógica async.`,
    como: `CÓMO: canActivate(): boolean { if (this.auth.isLoggedIn()) return true; return this.router.parseUrl('/login'); }. En un interceptor, lee el signal del token y añade el header. No leas signals que dependan de HTTP sin haber esperado.`,
    porQue: `POR QUÉ: El estado de auth o configuración suele estar en un servicio con signal; el guard necesita ese valor de forma síncrona para decidir.`,
    cuando: `CUÁNDO: Guards que dependan de estado síncrono (logged in, rol); interceptors que añadan headers desde un signal.`,
    conQue: `CON QUÉ: Router, parseUrl; HttpClient con interceptor; servicio con signal readonly.`,
    paraQue: `PARA QUÉ: Proteger rutas y enriquecer peticiones usando estado reactivo sin bloquear.`,
    realWorld: `AuthGuard inyecta AuthService; canActivate() lee authService.isLoggedIn() (signal) y devuelve true o router.parseUrl('/login'). En un interceptor, leer un signal de token para añadir el header.`,
    code: `canActivate(): boolean {
  if (this.auth.isLoggedIn()) return true;
  return this.router.parseUrl('/login');
}`,
    commonErrors: ['Leer un signal que depende de una petición HTTP sin esperar', 'Mezclar signals con Observable en el guard sin toSignal'],
    checklist: ['¿El valor que necesito es síncrono? → signal() en el guard', 'Si es async, considerar toSignal o Observable'],
    explainLikeIm5: `El guard es el portero: mira la caja (signal) para ver si puedes pasar. Si la caja dice "no", te manda a otra habitación.`,
    challenge: { description: 'Crea un guard que lea un signal isAdmin y solo permita acceso si es true.', hint: 'Inject(Router) y parseUrl("/") para redirigir' },
    sources: [SOURCES.guideSignals],
  },
  'fund-13': {
    definition: `En SSR o hidratación: los signals se crean en el servidor con valores iniciales; ese estado puede serializarse (por ejemplo a JSON) y transferirse al cliente para que la app arranque con el mismo estado. Evita leer en el servidor signals que dependan de window o document. Para transferir estado, usa un token/valor que el cliente lea al iniciar.`,
    como: `CÓMO: En el servidor inicializa los signals con valores por defecto seguros. Usa TransferState o un script en el HTML para pasar datos al cliente. En el cliente, un effect o bootstrap puede leer ese estado y actualizar los signals (p. ej. desde localStorage).`,
    porQue: `POR QUÉ: En SSR no existen window ni document; leerlos rompe. Transferir estado evita que el cliente tenga que refetch todo lo que el servidor ya tenía.`,
    cuando: `CUÁNDO: Apps con SSR o hidratación que quieran estado consistente entre servidor y cliente.`,
    conQue: `CON QUÉ: TransferState, PLATFORM_ID, typeof window; effects que solo corran en el cliente.`,
    paraQue: `PARA QUÉ: Evitar errores en SSR y que la primera pintura del cliente coincida con el servidor.`,
    realWorld: `Si tienes un signal de preferencias que se rehidrata desde localStorage, en el servidor ese signal tendrá un valor por defecto; en el cliente, un effect puede leer localStorage después de bootstrap y actualizar el signal.`,
    code: `// En el cliente tras hidratación
effect(() => {
  if (typeof window === 'undefined') return;
  const theme = localStorage.getItem('theme');
  if (theme) themeSignal.set(theme);
});`,
    commonErrors: ['Leer window o document en el servidor', 'Asumir que el signal tiene el mismo valor en servidor y cliente sin transfer'],
    checklist: ['Valores por defecto seguros para SSR', 'Actualizar desde almacenamiento en el cliente si hace falta'],
    explainLikeIm5: `En la tienda (servidor) la caja tiene un valor; cuando te llevas la caja a casa (cliente) puedes poner dentro lo que tenías guardado en el cajón (localStorage).`,
    challenge: { description: 'Documenta cómo transferirías un signal de "user" desde el servidor al cliente en tu app.', hint: 'TransferState o script en el HTML' },
    sources: [SOURCES.guideSignals],
  },
  'fund-14': {
    definition: `Resumen de fundamentos: (1) signal() para estado writable; set() y update(); (2) Leer en template con nombre(); (3) Servicios con asReadonly(); (4) Inmutabilidad en arrays/objetos; (5) equal() para comparación custom; (6) Effects con cleanup; (7) OnPush y signals; (8) Debug con effect + log o DevTools. Siguiente paso: computed() para valores derivados.`,
    como: `CÓMO: Repasa: crear signals, leer con (), actualizar con set/update sin mutar, exponer readonly en servicios, effects con onCleanup. Siguiente: computed() para valores derivados.`,
    porQue: `POR QUÉ: Tener una base sólida antes de computed y effect evita errores típicos (mutación, loops, leer sin ()).`,
    cuando: `CUÁNDO: Antes de pasar a la sección Computed; como checklist al revisar código propio.`,
    conQue: `CON QUÉ: Toda la API de signal(), template, servicios, effect; siguiente bloque computed().`,
    paraQue: `PARA QUÉ: Consolidar fundamentos y preparar el uso de computed para estado derivado.`,
    realWorld: `Antes de pasar a computed, asegúrate de tener claro: crear signals, leer en template, actualizar sin mutar, exponer readonly en servicios, y no escribir en un signal que un effect lee.`,
    code: `// Checklist mental
// signal() + set/update | template: name() | asReadonly() | update(list => [...list])`,
    commonErrors: ['Saltar a computed sin dominar signal() y lectura en template', 'Olvidar inmutabilidad o cleanup en effects'],
    checklist: ['Sé crear y leer signals', 'Sé actualizar sin mutar', 'Sé exponer readonly y usar effects con cuidado'],
    explainLikeIm5: `Ya sabes tener una caja, mirarla con (), cambiarla con set/update sin romper lo que hay dentro, y que el ayudante (effect) no escriba en la caja que lee. Ahora viene el amigo que calcula (computed).`,
    challenge: { description: 'Repasa las lecciones de fundamentos y escribe tres reglas que nunca olvidarás.', hint: 'Ej: siempre () para leer; nunca mutar; effect no escribe lo que lee.' },
    sources: [SOURCES.guideSignals, SOURCES.apiSignal],
  },
  'fund-15': {
    definition: 'Practica en el Lab: contador reactivo con signal(), set() y update(). Refuerza lo visto en las lecciones de fundamentos.',
    como: `CÓMO: Haz clic en "Probar en Lab" para abrir el Lab del contador. Completa los TODOs: incrementar(), decrementar() y reset() usando .update() y .set().`,
    porQue: `POR QUÉ: Practicar en un entorno real consolida la sintaxis y el flujo de lectura/escritura de signals.`,
    cuando: `CUÁNDO: Después de "Crear tu primer Signal" y "Signals en templates".`,
    conQue: `CON QUÉ: signal(0), .update(v => v + 1), .set(0).`,
    paraQue: `PARA QUÉ: Llevar a la práctica el contador reactivo en el Lab.`,
    realWorld: 'Abre el Lab "Contador reactivo" desde el botón de abajo o desde la pestaña Labs.',
    code: 'contador.update(v => v + 1);\ncontador.update(v => v - 1);\ncontador.set(0);',
    commonErrors: ['Mutar el valor en lugar de usar update/set', 'Olvidar los paréntesis al leer: contador()'],
    checklist: ['Abrir el Lab Contador reactivo', 'Completar incrementar, decrementar y reset', 'Ver el resultado en el preview'],
    explainLikeIm5: 'En el Lab juegas con un contador que sube y baja; tú escribes el código para que funcione.',
    challenge: { description: 'Completa el lab del contador en la pestaña Labs.', hint: 'Usa "Probar en Lab" o ve a Labs (Interactivo).' },
    sources: [SOURCES.apiSignal, SOURCES.guideSignals],
  },
};
