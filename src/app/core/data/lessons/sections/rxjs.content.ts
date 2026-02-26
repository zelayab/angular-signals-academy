import type { LessonContent } from '../../../models/lesson.model';
import { SOURCES } from '../../sources.data';

export const RXJS_CONTENT: Record<string, LessonContent> = {
  'rx-1': {
    definition: `toSignal(observable$) convierte un Observable en un Signal que se actualiza con cada emisión. toObservable(signal) convierte un Signal en un Observable. Así puedes usar Observables donde necesites operadores (debounceTime, switchMap) y exponer el resultado como signal en el template.`,
    como: `CÓMO: import { toSignal, toObservable } from '@angular/core/rxjs-interop'; user = toSignal(userService.getUser$(), { initialValue: null }); count$ = toObservable(count); En template: {{ user()?.name }}.`,
    porQue: `POR QUÉ: El template y computed/effect trabajan con signals; los flujos async y operadores siguen en RxJS. toSignal/toObservable son el puente.`,
    cuando: `CUÁNDO: Consumir Observable en template (toSignal); aplicar operadores a un signal (toObservable).`,
    conQue: `CON QUÉ: @angular/core/rxjs-interop; initialValue cuando el Observable no emite de inmediato.`,
    paraQue: `PARA QUÉ: Integrar RxJS con signals sin reescribir todo.`,
    realWorld: `Tienes un Observable de búsqueda (HTTP). toSignal(search$) te da un signal que el template puede leer con search(). Tienes un signal de filtro y quieres pasarlo a un operador: toObservable(filtro$).pipe(debounceTime(300)).`,
    code: `import { toSignal, toObservable } from '@angular/core/rxjs-interop';
const user = toSignal(userService.getUser$(), { initialValue: null });
const count$ = toObservable(count);`,
    commonErrors: ['No usar initialValue cuando el Observable no emite de inmediato', 'Suscribirse manualmente al Observable y no usar toSignal'],
    checklist: ['toSignal para usar Observable en template', 'toObservable para usar operadores con un signal'],
    explainLikeIm5: `toSignal es el traductor de "idioma Observable" a "idioma signal". toObservable es al revés. Así los dos mundos se entienden.`,
    challenge: { description: 'Convierte un Observable de timer(0, 1000) en un signal y muéstralo en el template.', hint: 'toSignal(timer(0, 1000), { initialValue: 0 })' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-2': {
    definition: `toSignal(observable$, { initialValue: valor }) es necesario cuando el Observable no emite de inmediato (p. ej. HTTP). Sin initialValue, el signal sería undefined hasta la primera emisión y podría romper el template. Con initialValue, el signal tiene ese valor hasta que el Observable emita.`,
    como: `CÓMO: user = toSignal(http.get<User>('/api/user'), { initialValue: null }); En template: {{ user()?.name }}. Tipar correctamente (User | null).`,
    porQue: `POR QUÉ: HTTP no emite hasta que responde; sin initialValue el signal sería undefined y bindings como user().name fallarían.`,
    cuando: `CUÁNDO: Cualquier Observable que no emita de inmediato (HTTP, timer, flujos async).`,
    conQue: `CON QUÉ: toSignal(obs, { initialValue: valor }); optional chaining en template si el valor puede ser null.`,
    paraQue: `PARA QUÉ: Evitar undefined en template y errores en desarrollo.`,
    realWorld: `getUser$() no emite hasta que la petición termina. toSignal(getUser$(), { initialValue: null }) devuelve un signal que empieza en null y luego tiene el usuario. En el template: {{ user()?.name }}.`,
    code: `const user = toSignal(http.get<User>('/api/user'), { initialValue: null });
// user() es null hasta que la petición responde`,
    commonErrors: ['No pasar initialValue y usar user() en template sin optional chaining', 'Pasar initialValue que no coincida con el tipo del Observable'],
    checklist: ['¿El Observable emite de inmediato? Si no, initialValue', 'Tipar correctamente (User | null)'],
    explainLikeIm5: `initialValue es como poner un "pronto llega" en la caja mientras el cartero trae el paquete. Así la caja no está vacía al principio.`,
    challenge: { description: 'Usa toSignal con un HttpClient.get y initialValue null; muestra user()?.name en el template.', hint: 'toSignal(this.http.get(...), { initialValue: null })' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-3': {
    definition: `toObservable(signal) convierte un signal en un Observable. Cada vez que el signal cambia, el Observable emite. Útil cuando necesitas operadores RxJS (debounceTime, switchMap, combineLatest). Ejemplo: toObservable(searchQuery).pipe(debounceTime(300), distinctUntilChanged()).subscribe(...).`,
    como: `CÓMO: query$ = toObservable(searchQuery); query$.pipe(debounceTime(300), switchMap(q => http.get(...))).subscribe(r => results.set(r)); Gestiona la suscripción con takeUntilDestroyed o usa toSignal del resultado.`,
    porQue: `POR QUÉ: Los operadores (debounce, switchMap) viven en RxJS; el signal sigue siendo la fuente de verdad y el Observable es el "tubo" para transformar.`,
    cuando: `CUÁNDO: Búsqueda con debounce, peticiones que dependen de un signal, combineLatest con signals.`,
    conQue: `CON QUÉ: toObservable(signal); pipe(debounceTime, switchMap, ...); takeUntilDestroyed o toSignal.`,
    paraQue: `PARA QUÉ: Aprovechar operadores RxJS sobre estado en signals.`,
    realWorld: `Tienes searchQuery = signal(''). Quieres hacer búsqueda al servidor con debounce. query$ = toObservable(searchQuery); query$.pipe(debounceTime(300), switchMap(q => http.get(...))). Así el signal sigue siendo la fuente de verdad y RxJS se usa solo para el flujo.`,
    code: `const query$ = toObservable(searchQuery);
query$.pipe(
  debounceTime(300),
  switchMap(q => this.http.get(\`/api/search?q=\${q}\`))
).subscribe(results => this.results.set(results));`,
    commonErrors: ['Suscribirte sin gestionar la destrucción (takeUntilDestroyed)', 'No usar toObservable y crear Observable manual que no se actualiza'],
    checklist: ['toObservable(signal) para operadores', 'Gestionar suscripción (takeUntilDestroyed o DestroyRef)'],
    explainLikeIm5: `toObservable es el traductor de "caja mágica" a "tubo que suelta bolitas". Así puedes usar filtros y retrasos (debounce) en el tubo.`,
    challenge: { description: 'Convierte un signal de búsqueda en Observable, aplica debounceTime(400) y actualiza un signal results.', hint: 'toObservable(search).pipe(debounceTime(400), ...).subscribe(r => results.set(r))' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-4': {
    definition: `Puedes combinar Observables y signals en el mismo componente: estado "vivo" en signals (filtros, tema); flujos de eventos en Observables (WebSocket, teclado). Usa toSignal(observable$) para exponer el Observable en el template como signal. Usa toObservable(signal) cuando necesites operadores. Mantén una sola fuente de verdad por concepto.`,
    como: `CÓMO: filters = signal({}); results = toSignal(toObservable(filters).pipe(debounceTime(300), switchMap(f => api.search(f))), { initialValue: [] }); No dupliques: un signal o un Observable por dato, no ambos con el mismo valor.`,
    porQue: `POR QUÉ: Duplicar estado (signal + Observable con el mismo valor) genera inconsistencias; una fuente de verdad y el puente (toSignal/toObservable) evita eso.`,
    cuando: `CUÁNDO: Estado de UI en signals; flujos async en Observables; resultado final en template como signal.`,
    conQue: `CON QUÉ: toSignal, toObservable; initialValue; una fuente por concepto.`,
    paraQue: `PARA QUÉ: Coherencia y menos bugs al combinar ambos mundos.`,
    realWorld: `Componente con filters = signal({}), datos$ = http.get(...).pipe(map(...)). filteredData = toSignal(datos$) en el template. O: filters$ = toObservable(filters).pipe(debounceTime(200)); results$ = filters$.pipe(switchMap(f => search(f))); results = toSignal(results$, { initialValue: [] }).`,
    code: `// Estado en signal
filters = signal({});
// Flujo en Observable, resultado en signal
results = toSignal(
  toObservable(this.filters).pipe(
    debounceTime(300),
    switchMap(f => this.api.search(f))
  ),
  { initialValue: [] }
);`,
    commonErrors: ['Duplicar estado: un signal y un Observable con el mismo valor', 'No usar initialValue en toSignal y tener undefined en template'],
    checklist: ['Una fuente de verdad por dato', 'toSignal para llevar Observable al template'],
    explainLikeIm5: `En la misma habitación puedes tener cajas mágicas (signals) y tubos (Observables). Los traductores (toSignal, toObservable) hacen que se entiendan.`,
    challenge: { description: 'Combina un signal de "userId" con un Observable de getUser(userId) y expón el usuario como signal.', hint: 'toSignal(toObservable(userId).pipe(switchMap(id => getUser(id))), { initialValue: null })' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-5': {
    definition: `Para migrar de Observable a Signal: (1) Identifica dónde usas async pipe con un Observable. (2) Convierte a signal con toSignal(observable$, { initialValue: ... }) en el componente. (3) En el template reemplaza observable$ | async por signal(). (4) Si el Observable se crea en el componente, puede seguir siendo la fuente; el signal es la "vista" para el template.`,
    como: `CÓMO: Antes: user$ = getUser$(); {{ (user$ | async)?.name }}. Después: user = toSignal(getUser$(), { initialValue: null }); {{ user()?.name }}. El servicio puede seguir devolviendo Observable.`,
    porQue: `POR QUÉ: Migración gradual sin romper el resto; el template pasa a usar signal() y no async pipe.`,
    cuando: `CUÁNDO: Al migrar componentes que usan async pipe; al unificar con el resto de la app en signals.`,
    conQue: `CON QUÉ: toSignal con initialValue; template con signal(); el Observable puede seguir en el servicio.`,
    paraQue: `PARA QUÉ: Migrar por componentes sin reescribir todo.`,
    realWorld: `Antes: user$ = this.userService.getUser$(); template: {{ (user$ | async)?.name }}. Después: user = toSignal(this.userService.getUser$(), { initialValue: null }); template: {{ user()?.name }}. El servicio puede seguir devolviendo Observable.`,
    code: `// Antes
user$ = this.userService.getUser$();
// {{ (user$ | async)?.name }}
// Después
user = toSignal(this.userService.getUser$(), { initialValue: null });
// {{ user()?.name }}`,
    commonErrors: ['No pasar initialValue y romper el template', 'Eliminar el Observable del servicio si otros lo usan'],
    checklist: ['toSignal con initialValue adecuado', 'Template usa signal()'],
    explainLikeIm5: `Antes mirabas el tubo con async; ahora guardas lo que sale del tubo en una caja (toSignal) y miras la caja con ().`,
    challenge: { description: 'Migra un componente que use async pipe a toSignal y actualiza el template.', hint: 'toSignal(obs, { initialValue: null }) y user()?.prop' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-6': {
    definition: `toSignal(observable$, { requireSync: true }) exige que el Observable emita de inmediato (síncrono); si no, lanza. Útil cuando sabes que la fuente siempre tiene valor (ej. BehaviorSubject). Para manejo de errores: el Observable puede usar catchError; el signal reflejará el valor o el estado de error según cómo lo manejes (algunos patrones exponen result: { data, error }).`,
    como: `CÓMO: sync = toSignal(behavior$, { requireSync: true }); Para errores: toSignal(fetch$.pipe(catchError(e => of({ error: e }))), { initialValue: { error: null } }).`,
    porQue: `POR QUÉ: requireSync evita undefined cuando la fuente emite ya (BehaviorSubject); catchError en el pipe para que el signal tenga un valor de error en lugar de romper.`,
    cuando: `CUÁNDO: Fuentes que siempre tienen valor (BehaviorSubject); Observables que pueden fallar (HTTP).`,
    conQue: `CON QUÉ: requireSync: true; catchError en pipe; initialValue con forma { data, error }.`,
    paraQue: `PARA QUÉ: Tipado y manejo de errores correctos.`,
    realWorld: `Si getUser$() es un BehaviorSubject con valor inicial, requireSync: true evita undefined. Para errores: result$ = getUser$().pipe(catchError(err => of({ error: err }))); result = toSignal(result$, { initialValue: { error: null } }).`,
    code: `const sync = toSignal(behavior$, { requireSync: true });
// Para errores: manejar en el Observable
const withError = toSignal(
  fetch$.pipe(catchError(e => of({ error: e }))),
  { initialValue: { error: null } }
);`,
    commonErrors: ['requireSync: true con Observable que no emite de inmediato', 'No manejar error y dejar el signal en estado inconsistente'],
    checklist: ['requireSync solo si la fuente emite ya', 'Errores: catchError en pipe o exponer { data, error }'],
    explainLikeIm5: `requireSync es "el tubo tiene que soltar una bolita ya". Si no, Angular se queja. Para los errores, el tubo puede soltar una bolita que diga "error" y la caja la guarda.`,
    challenge: { description: 'Usa toSignal con un Observable que puede fallar y expon un signal con { data, error }.', hint: 'pipe(catchError(e => of({ error: e }))), initialValue: { data: null, error: null }' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-7': {
    definition: `DestroyRef permite registrar callbacks cuando el componente o servicio se destruye. Útil para takeUntilDestroyed() o para limpiar suscripciones manuales. Si usas subscribe() en un componente, usa takeUntilDestroyed() (necesita DestroyRef o injection context) para que la suscripción se cancele al destruir el componente. No mezcles subscribe() sin cancelar con signals; puede haber memory leaks.`,
    como: `CÓMO: destroyRef = inject(DestroyRef); toObservable(query).pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(...); O preferir toSignal del resultado para que Angular gestione la suscripción.`,
    porQue: `POR QUÉ: subscribe() sin cancelar deja suscripciones activas tras destruir el componente; memory leak. takeUntilDestroyed o toSignal evitan eso.`,
    cuando: `CUÁNDO: Siempre que uses subscribe() en un componente; toSignal gestiona por ti si solo necesitas el valor en template.`,
    conQue: `CON QUÉ: inject(DestroyRef), takeUntilDestroyed(destroyRef); o toSignal.`,
    paraQue: `PARA QUÉ: Evitar memory leaks al destruir componentes.`,
    realWorld: `En un componente: private destroyRef = inject(DestroyRef); ngOntInit() { toObservable(query).pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(...). } Así la suscripción se destruye con el componente. O usa toSignal que gestiona la suscripción por ti.`,
    code: `private destroyRef = inject(DestroyRef);
query$ = toObservable(this.query).pipe(
  debounceTime(300),
  takeUntilDestroyed(this.destroyRef)
);
// o: results = toSignal(this.query$.pipe(switchMap(...)), { initialValue: [] });`,
    commonErrors: ['subscribe() sin takeUntilDestroyed o unsubscribe', 'No usar DestroyRef cuando se inyecta en constructor'],
    checklist: ['Si usas subscribe(), cancelar con takeUntilDestroyed', 'Preferir toSignal cuando solo necesitas el valor en template'],
    explainLikeIm5: `Cuando te vas de la habitación (destruir componente), tienes que colgar el teléfono (cancelar suscripción). DestroyRef es el que avisa de que te vas.`,
    challenge: { description: 'Reemplaza un subscribe() por toSignal o añade takeUntilDestroyed(destroyRef) al pipe.', hint: 'inject(DestroyRef) y takeUntilDestroyed(this.destroyRef)' },
    sources: [SOURCES.rxjsInterop],
  },
  'rx-8': {
    definition: `Resumen RxJS + Signals: (1) Estado "vivo" y valor actual en UI → signals. (2) Flujos de eventos (teclado, WebSocket, HTTP que se cancela) → Observables. (3) Puente: toSignal(observable$) para usar en template; toObservable(signal) para operadores. (4) Migración: async pipe → toSignal. (5) Siempre initialValue cuando el Observable no emite de inmediato; gestionar errores en el pipe.`,
    como: `CÓMO: Repasa: estado en signals; flujos en Observables; toSignal/toObservable como puente; initialValue; cancelar suscripciones.`,
    porQue: `POR QUÉ: No sustituir RxJS por signals en todo; cada uno tiene su sitio y el puente permite convivir.`,
    cuando: `CUÁNDO: Checklist al diseñar estado y flujos; antes de mezclar Observable y signals.`,
    conQue: `CON QUÉ: toSignal, toObservable, initialValue, takeUntilDestroyed, catchError.`,
    paraQue: `PARA QUÉ: Integración correcta y sin memory leaks.`,
    realWorld: `Usa signals para lo que el usuario ve y cambia (filtros, tema, carrito). Usa Observables para lo que "llega del mundo" (HTTP, eventos). Conecta con toSignal/toObservable. Evita duplicar estado.`,
    code: `// Estado → signal. Flujo → Observable. Template → toSignal.
filters = signal({});
results = toSignal(
  toObservable(this.filters).pipe(switchMap(f => this.api.search(f))),
  { initialValue: [] }
);`,
    commonErrors: ['Usar solo Observables y no aprovechar signals en template', 'Usar solo signals para todo y no aprovechar operadores'],
    checklist: ['Signals para estado y vista', 'toSignal/toObservable como puente', 'Cancelar suscripciones'],
    explainLikeIm5: `Cajas mágicas para lo que tienes en la mano; tubos para lo que viene de fuera. Los traductores (toSignal, toObservable) hacen que trabajen juntos.`,
    challenge: { description: 'Escribe en una frase cuándo usar signal y cuándo Observable en tu app.', hint: 'signal = valor actual; Observable = flujo de eventos.' },
    sources: [SOURCES.rxjsInterop, SOURCES.guideSignals],
  },
  'rx-9': {
    definition: `Decisión rápida: ¿Signal u Observable? (1) ¿Necesitas un valor actual que la UI lee? → signal (o toSignal si viene de Observable). (2) ¿Es un flujo de eventos (HTTP, teclado, WebSocket)? → Observable. (3) ¿Quieres usar operadores (debounce, switchMap)? → toObservable(signal) o mantener Observable. (4) ¿Solo mostrar en template? → toSignal(observable$).`,
    como: `CÓMO decidir: Valor único en UI → signal. Flujo de eventos → Observable. Combinar ambos → toSignal/toObservable.`,
    porQue: `POR QUÉ: Evitar usar Observable para todo (template se complica) o signal para todo (pierdes operadores).`,
    cuando: `CUÁNDO: Al diseñar un nuevo componente o servicio; al migrar código existente.`,
    conQue: `CON QUÉ: toSignal, toObservable, initialValue, operadores RxJS.`,
    paraQue: `PARA QUÉ: Elegir la primitiva correcta y reducir complejidad.`,
    realWorld: `Ejemplo: filtros de búsqueda → signal(filters). Petición HTTP al cambiar filtros → toObservable(filters).pipe(switchMap(...)). Resultado en template → toSignal(result$).`,
    code: `// ¿Valor en UI? → signal
count = signal(0);
// ¿Flujo de eventos? → Observable + toSignal
results = toSignal(this.search$.pipe(switchMap(q => this.api.search(q))), { initialValue: [] });`,
    commonErrors: ['Usar Observable para estado que solo se muestra en template', 'Usar signal para flujos que necesitan debounce/switchMap'],
    checklist: ['Valor actual → signal o toSignal', 'Flujo → Observable', 'Puente según necesidad'],
    explainLikeIm5: '¿Tienes una caja con un número? Usa signal. ¿Llegan mensajes por el tubo? Usa Observable. ¿Quieres poner el tubo en una caja? Usa toSignal.',
    challenge: { description: 'En tu app, identifica un Observable que podría ser toSignal() en el template.', hint: 'Cualquier async pipe puede ser toSignal con initialValue.' },
    sources: [SOURCES.rxjsInterop],
  },
};
