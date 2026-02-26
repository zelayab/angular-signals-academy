import type { LessonContent } from '../../../models/lesson.model';
import { SOURCES } from '../../sources.data';

export const INTRODUCCION_CONTENT: Record<string, LessonContent> = {
  'intro-1': {
    definition: `Los Signals son primitivas reactivas que representan un valor que puede cambiar con el tiempo. Cuando el valor cambia, Angular actualiza automáticamente cualquier parte de la aplicación que dependa de ese valor. La sintaxis básica: \`signal(valorInicial)\`, \`miSignal()\` para leer, \`miSignal.set(nuevoValor)\` o \`miSignal.update(fn)\` para actualizar.`,
    como: `CÓMO se usan los Signals en la práctica:

1. Crear un signal: en el componente o servicio, declara \`contador = signal(0)\`. El valor inicial puede ser número, string, array u objeto.

2. Leer el valor: siempre con paréntesis, p. ej. en el template \`{{ contador() }}\` o en la clase \`this.contador()\`. Sin paréntesis no obtienes el valor, sino la referencia al signal.

3. Actualizar el valor: con \`set()\` para un valor nuevo directo (\`contador.set(5)\`) o con \`update()\` cuando necesitas el valor anterior (\`contador.update(v => v + 1)\`). Nunca mutes el valor directamente (p. ej. no hagas \`contador().prop = x\`).

4. En el template: cualquier binding que use \`contador()\` se re-renderiza solo cuando \`contador\` cambia. No necesitas async pipe ni suscripciones manuales.`,
    porQue: `POR QUÉ Angular introdujo Signals:

- Rendimiento: la detección de cambios con Zone.js recorre el árbol de componentes ante muchos eventos. Con Signals, solo se actualiza lo que realmente depende del valor que cambió (actualización granular).

- Menos bugs: el flujo de datos es explícito: un valor, una fuente de verdad. No hay suscripciones que olvidar ni memory leaks por desuscripción.

- Mejor DX: menos boilerplate que Observables para estado local o derivado. \`computed()\` y \`effect()\` encajan de forma natural con el modelo de Angular.

- Camino a zoneless: las apps pueden prescindir de Zone.js y seguir actualizando la UI correctamente gracias a Signals.`,
    cuando: `CUÁNDO usar Signals:

- Estado local en un componente: contador, formulario, filtros, tema. Cualquier dato que "viva" en la pantalla y cambie con la interacción del usuario.

- Estado compartido en un servicio: carrito, usuario logueado, preferencias. El servicio posee el signal y lo expone como \`readonly\` con \`asReadonly()\`.

- Valores derivados: cuando un valor se calcula a partir de otros, usa \`computed()\` en lugar de mantenerlo manualmente sincronizado.

- Efectos secundarios: cuando quieres reaccionar a un cambio (guardar en localStorage, log, navegar), usa \`effect()\`.

No uses Signals para flujos de eventos continuos (teclado, WebSocket): ahí RxJS sigue siendo más adecuado; puedes puentear con \`toSignal()\` o \`toObservable()\`.`,
    conQue: `CON QUÉ se combinan los Signals:

- Con el template: directamente \`{{ miSignal() }}\`, \`[value]="miSignal()"\`, \`(click)="miSignal.set(x)"\`. No hace falta async pipe.

- Con \`computed()\`: para valores derivados que se recalculan cuando cambian sus dependencias.

- Con \`effect()\`: para side effects (persistencia, logging, sincronización con APIs).

- Con RxJS: \`toSignal(observable$)\` para usar un Observable en el template como signal; \`toObservable(miSignal)\` para aplicar operadores (debounce, switchMap) a un signal.

- Con servicios: inyecta el servicio que posee los signals y lee \`servicio.miSignal()\` o llama a métodos que actualicen el estado.`,
    paraQue: `PARA QUÉ sirven los Signals en tu aplicación:

- Tener una única fuente de verdad por dato: un signal por concepto (contador, carrito, usuario). Todo lo que depende de ese dato se actualiza solo.

- Reducir re-renders innecesarios: solo los componentes (o nodos del template) que leen un signal se actualizan cuando ese signal cambia.

- Facilitar testing y razonamiento: el estado es síncrono y predecible; no hay suscripciones asíncronas que mockear.

- Preparar la app para modo zoneless y mejor rendimiento a largo plazo.`,
    realWorld: `Imagina un carrito de compras: en lugar de decirle manualmente a cada componente "el carrito cambió", el Signal notifica a todos los que lo leen. En un e-commerce real: el badge del carrito, el total y el botón de checkout se actualizan solos sin código extra de sincronización.`,
    code: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: \`
    <div class="contador">
      <span>{{ contador() }}</span>
      <button (click)="incrementar()">+</button>
      <button (click)="decrementar()">-</button>
    </div>
  \`
})
export class ContadorComponent {
  contador = signal(0);

  incrementar() {
    this.contador.update(valor => valor + 1);
  }

  decrementar() {
    this.contador.set(this.contador() - 1);
  }
}`,
    commonErrors: [
      'Olvidar los paréntesis al leer: contador en vez de contador()',
      'Mutar el valor directamente en vez de usar set() o update()',
      'Crear signals fuera del contexto de inyección sin untracked()',
      'Confundir signal() con computed() - signals son valores base, computed son derivados',
    ],
    checklist: [
      '¿Estoy usando los paréntesis para leer el valor?',
      '¿Necesito el valor anterior? Entonces uso update(), no set()',
      '¿Este valor depende de otros? Quizás debería ser un computed()',
      '¿Estoy modificando el signal en un effect()? Cuidado con loops infinitos',
    ],
    explainLikeIm5: `Imagina que tienes una pizarra mágica. Cuando escribes algo en ella, todos tus amigos que están mirando la pizarra ven el cambio automáticamente. No tienes que gritarles "¡hey, cambié algo!".

Un Signal es esa pizarra mágica para tu código. Cuando cambias el número en la pizarra (con set() o update()), todas las partes de tu app que miran esa pizarra se actualizan solitas.

Y cuando quieres ver qué hay en la pizarra, solo tienes que poner los paréntesis: pizarra()`,
    challenge: { description: "Crea un Signal que almacene un nombre y un botón que agregue ' Angular' al final cada vez que se presione.", hint: "Usa update() con una función flecha: nombre.update(n => n + ' Angular')" },
    sources: [SOURCES.guideSignals, SOURCES.apiSignal],
  },
  'intro-2': {
    definition: `Angular adoptó Signals para mejorar el rendimiento y la experiencia de desarrollo. Antes, la detección de cambios dependía de Zone.js y recorría el árbol de componentes; con Signals, solo se actualiza lo que realmente cambió. En esta lección verás por qué el equipo de Angular apostó por esta primitiva y qué problemas resuelve en aplicaciones grandes.`,
    como: `CÓMO llegó Angular a Signals: el equipo evaluó el coste de Zone.js (detección en cascada en todo el árbol), probó alternativas en frameworks como Vue y Solid, y diseñó una API que encajara con la inyección de dependencias y los templates de Angular. La evolución fue gradual: primero experimental en Angular 16, luego estable en 17.`,
    porQue: `POR QUÉ Angular adoptó Signals: (1) Rendimiento: Zone.js dispara detección en toda la app ante cualquier evento asíncrono; con signals solo se actualiza lo que depende del valor que cambió. (2) Menos bugs: flujo de datos explícito, sin suscripciones que olvidar. (3) Mejor DX: menos boilerplate que Observables para estado local. (4) Camino a zoneless: poder ejecutar sin Zone.js.`,
    cuando: `CUÁNDO tiene sentido hablar de "historia y motivación": cuando migras una app existente a signals, cuando evalúas si adoptar Angular para un proyecto nuevo, o cuando quieres entender el roadmap del framework. Conocer el porqué te ayuda a priorizar qué migrar primero.`,
    conQue: `CON QUÉ se relaciona: Zone.js (el modelo anterior), detección de cambios, RxJS (convivencia), y las guías oficiales de angular.dev. La documentación de "Signals" y los RFCs del blog de Angular explican la motivación con más detalle.`,
    paraQue: `PARA QUÉ sirve entender la motivación: para tomar decisiones de arquitectura (zoneless o no, qué estado llevar a signals), para explicar a tu equipo por qué migrar, y para seguir las mejores prácticas que el equipo de Angular recomienda.`,
    realWorld: `En apps grandes, Zone.js puede provocar muchos ciclos de detección innecesarios. Signals permite actualizaciones granulares: si cambias un contador, solo los componentes que leen ese contador se re-renderizan.`,
    code: `// Antes (Zone.js): cualquier evento podía disparar detección en toda la app
// Ahora (Signals): solo se actualiza lo que depende del valor que cambió
const count = signal(0);
// Solo los templates que usan count() se actualizan cuando count cambia`,
    commonErrors: ['Pensar que Signals reemplazan todo RxJS de golpe', 'No migrar gradualmente y mezclar mal con Zone.js'],
    checklist: ['Entender por qué Angular apostó por Signals', 'Conocer el coste de Zone.js en apps grandes'],
    explainLikeIm5: `Antes Angular miraba toda la casa cada vez que sonaba el timbre. Ahora solo mira la habitación donde alguien abrió la puerta. Así gasta menos energía.`,
    challenge: { description: 'Busca en la documentación cuándo se anunciaron los Signals en Angular.', hint: 'Angular 16 introdujo Signals como experimental.' },
    sources: [SOURCES.guideSignals, SOURCES.rfcSignals],
  },
  'intro-3': {
    definition: `Zone.js intercepta eventos asíncronos (clicks, setTimeout, HTTP) y dispara la detección de cambios en toda la aplicación. Signals permiten un modelo "zoneless": solo lo que depende de un signal que cambió se actualiza, sin necesidad de Zone.js. En esta lección verás las diferencias concretas y cuándo cada modelo tiene sentido.`,
    como: `CÓMO funciona Zone.js: parchea APIs del navegador (setTimeout, addEventListener, XHR, etc.) para que, cuando se ejecuten, Angular sepa que "algo pasó" y ejecute un ciclo de detección de cambios. Con signals, en cambio, la actualización se dispara cuando tú llamas a set() o update() en un signal; no hace falta que Zone "avise".`,
    porQue: `POR QUÉ importa la diferencia: en apps con mucho estado local, Zone puede provocar ciclos de detección innecesarios (cualquier setTimeout puede disparar una revisión completa). Con signals, solo se re-evalúa lo que lee ese signal. Menos trabajo, mejor rendimiento y menos sorpresas al integrar librerías que usan muchas APIs asíncronas.`,
    cuando: `CUÁNDO pensar en Zone vs signals: al diseñar una app nueva (¿activamos zoneless?), al migrar una existente (¿qué componentes ya usan signals?), o al depurar por qué la UI no se actualiza (en zoneless, si no tocas un signal, la UI no se refresca).`,
    conQue: `CON QUÉ se combina: provideZonelessChangeDetection() en app.config para quitar Zone; ApplicationRef.tick() si en zoneless necesitas forzar un ciclo manualmente; y el resto del estado en signals para que la UI reaccione.`,
    paraQue: `PARA QUÉ dominar este tema: para elegir el modelo de detección de cambios de tu app, para depurar problemas de actualización, y para preparar la migración a zoneless cuando tu código esté listo.`,
    realWorld: `En modo zoneless, Angular no parchea el event loop. Menos "magia", menos sorpresas al integrar librerías de terceros, y mejor rendimiento en aplicaciones muy dinámicas.`,
    code: `// Con Zone.js: ngZone.run() o fuera de Angular
// Con Signals: el template que lee count() se actualiza cuando count.set() o count.update()
// No hace falta Zone para que la UI reaccione`,
    commonErrors: ['Activar zoneless sin haber migrado estado a signals', 'Confundir Zone.js con la detección de cambios'],
    checklist: ['Saber qué hace Zone.js', 'Entender que signals pueden vivir sin Zone'],
    explainLikeIm5: `Zone.js es como un vigilante que grita "¡algo pasó!" y Angular revisa todo. Con Signals, cada cosa dice "yo cambié" y solo los que la miran se asoman.`,
    challenge: { description: 'En tu proyecto, revisa si usas provideZonelessChangeDetection().', hint: 'Está en app.config.ts o main.ts.' },
    sources: [SOURCES.guideSignals, SOURCES.changeDetection],
  },
  'intro-4': {
    definition: `Signals son ideales para: (1) estado local en componentes (contador, formulario), (2) valores derivados con computed(), (3) sincronización con APIs o almacenamiento con effect(). No sustituyen RxJS en flujos de eventos complejos; conviven con toSignal() y toObservable(). En esta lección verás exactamente en qué situaciones usar cada herramienta.`,
    como: `CÓMO decidir: si el valor "vive" en la pantalla y cambia con la interacción del usuario (contador, filtro, tema), usa signal(). Si el valor se calcula a partir de otros (total del carrito, lista filtrada), usa computed(). Si solo quieres reaccionar a un cambio (guardar en localStorage, log, navegar), usa effect(). Para flujos de eventos (teclado, WebSocket), sigue usando RxJS y opcionalmente toSignal().`,
    porQue: `POR QUÉ esta separación: signal es la fuente de verdad; computed evita duplicar lógica y se recalcula solo cuando cambian sus dependencias; effect es para side effects y no para derivar valor. Mezclar responsabilidades (p. ej. escribir en un signal dentro de un effect sin cuidado) puede causar loops infinitos.`,
    cuando: `CUÁNDO usar cada uno: estado de UI (formulario, carrito, preferencias) → signal. Total, lista filtrada, validación derivada → computed. Persistencia, logging, sincronización con API → effect. Stream de teclas, WebSocket, debounce → RxJS.`,
    conQue: `CON QUÉ se combinan: con el template ({{ miSignal() }}), con input()/output()/model(), con servicios (inyección y exposición con asReadonly()), y con RxJS (toSignal, toObservable).`,
    paraQue: `PARA QUÉ tener claro el criterio: para escribir código predecible, evitar efectos secundarios en computed, y elegir la primitiva correcta desde el diseño.`,
    realWorld: `Usa signals para el estado que "vive" en la pantalla: filtros, carrito, preferencias. Usa RxJS para streams de eventos (teclado, WebSocket, debounce). Combina con toSignal(observable$) cuando necesites el valor en un template.`,
    code: `// Estado local: signal
const filtro = signal('');
// Derivado: computed
const resultados = computed(() => filtrar(items(), filtro()));
// Side effect: effect
effect(() => { guardarPreferencia('filtro', filtro()); });`,
    commonErrors: ['Usar solo signals para todo (p. ej. WebSockets)', 'Mezclar mal con RxJS sin toSignal/toObservable'],
    checklist: ['¿Este valor es estado de UI? → signal', '¿Se calcula de otros? → computed', '¿Solo reacciono (guardar, log)? → effect'],
    explainLikeIm5: `Signals son para las cosas que tú controlas en tu app: el número del contador, lo que escribes. No son para "cada vez que alguien pulse una tecla en el mundo"; eso es más para RxJS.`,
    challenge: { description: 'Lista tres cosas en tu app que serían signal y una que sería mejor como Observable.', hint: 'Ejemplo: signal = tema oscuro; Observable = posición del scroll.' },
    sources: [SOURCES.guideSignals, SOURCES.apiSignal, SOURCES.apiComputed, SOURCES.apiEffect],
  },
  'intro-5': {
    definition: `Signals conviven con RxJS: toSignal(observable$) convierte un Observable en un signal; toObservable(signal) hace lo contrario. Puedes usar NgRx u otros stores y exponer slices como signals. La migración es gradual: no hace falta reescribir todo. En esta lección verás cómo integrar ambos mundos.`,
    como: `CÓMO integrar: importa toSignal y toObservable desde @angular/core/rxjs-interop. toSignal(observable$, { initialValue: null }) te da un signal que se actualiza con cada emisión. toObservable(miSignal) te da un Observable que emite cuando el signal cambia; útil para aplicar operadores (debounce, switchMap). En NgRx, expones toSignal(store.select(...)) para consumir el estado como signal.`,
    porQue: `POR QUÉ conviven: muchas apps ya usan RxJS para HTTP, router, formularios reactivos. Signals no reemplazan esos flujos; los complementan. toSignal/toObservable son el puente para no reescribir todo de golpe y para usar lo mejor de cada mundo.`,
    cuando: `CUÁNDO usar toSignal: cuando tienes un Observable (HTTP, router, store) y quieres consumir su valor en un template o en un computed/effect. CUÁNDO usar toObservable: cuando necesitas operadores (debounce, distinctUntilChanged) sobre un signal.`,
    conQue: `CON QUÉ: @angular/core/rxjs-interop (toSignal, toObservable), NgRx (store.select), HttpClient (get().pipe(...)), Router (events, url). Siempre usa initialValue en toSignal si el Observable no emite de inmediato.`,
    paraQue: `PARA QUÉ: migración gradual sin romper código existente, uso de signals en templates donde antes usabas async pipe, y aplicación de operadores RxJS sobre estado en signals cuando haga falta.`,
    realWorld: `En una app con NgRx: expones un selector como signal con toSignal(store.select(...)). En componentes nuevos usas solo signals; en los antiguos sigues con async pipe hasta migrarlos.`,
    code: `import { toSignal } from '@angular/core/rxjs-interop';
// Observable → Signal
const user = toSignal(userService.getUser$(), { initialValue: null });
// En template: {{ user()?.name }}`,
    commonErrors: ['Reescribir toda la app a signals de golpe', 'No usar initialValue en toSignal cuando el Observable no emite de inmediato'],
    checklist: ['Saber que toSignal y toObservable existen', 'Migrar por partes: estado crítico primero'],
    explainLikeIm5: `Es como tener dos idiomas en casa: a veces hablas en "signal" y a veces en "Observable". Las traductoras son toSignal y toObservable. No tienes que tirar todo lo viejo.`,
    challenge: { description: 'Busca toSignal en la documentación y mira el parámetro initialValue.', hint: 'angular.dev o angular.io → toSignal' },
    sources: [SOURCES.rxjsInterop, SOURCES.guideSignals],
  },
  'intro-6': {
    definition: `Con Signals, Angular puede actualizar solo los nodos del DOM que dependen de un valor que cambió (granularidad fina). Se reducen ciclos de detección completos y se facilita el modo zoneless, lo que mejora el rendimiento en aplicaciones grandes. En esta lección verás qué implica esto en la práctica.`,
    como: `CÓMO funciona la granularidad: cuando llamas a signal.set() o signal.update(), Angular marca como "sucio" solo lo que leyó ese signal (template bindings, computed, effect). En el siguiente ciclo solo se re-evalúan esas dependencias; el resto del árbol no se toca. Con Zone.js, en cambio, un solo evento podía disparar detección en toda la app.`,
    porQue: `POR QUÉ mejora el rendimiento: menos nodos revisados = menos trabajo para el motor de renderizado. En listas largas o formularios complejos, la diferencia se nota en FPS y tiempo de respuesta. En modo zoneless, además, se elimina el coste de parchear el event loop.`,
    cuando: `CUÁNDO notarás la diferencia: en listas de muchos ítems, en dashboards con muchos bindings, o en apps con mucho estado que cambia con frecuencia. En componentes pequeños y poco dinámicos, el beneficio es menor.`,
    conQue: `CON QUÉ medir: DevTools de rendimiento del navegador, Angular DevTools (Change Detection), y pruebas de carga. Compara antes/después al migrar un componente a signals.`,
    paraQue: `PARA QUÉ: justificar la migración a signals en equipos, priorizar qué partes de la app migrar primero, y entender el valor de zoneless en proyectos grandes.`,
    realWorld: `En una lista de 1000 ítems, si solo cambia el precio de uno, con signals solo ese ítem se re-renderiza. Con Zone.js a veces se revisaba todo el árbol. Menos trabajo = mejor FPS y menos consumo de batería.`,
    code: `// Solo este binding se actualiza cuando count() cambia
<span>{{ count() }}</span>
// Los demás no se tocan
<span>{{ nombre() }}</span>`,
    commonErrors: ['Creer que Zone.js ya no se usa en ningún proyecto', 'No medir antes/después al migrar'],
    checklist: ['Entender actualización granular', 'Conocer el coste de Zone.js en apps grandes'],
    explainLikeIm5: `Antes, si cambiaba una lucecita, se revisaban todas las luces de la casa. Ahora solo se revisa la lucecita que cambió. Menos trabajo para el cerebro de la app.`,
    challenge: { description: 'En DevTools, observa cuántos nodos se repintan al cambiar un signal frente a disparar un evento con Zone.', hint: 'Usa las herramientas de rendimiento del navegador.' },
    sources: [SOURCES.guideSignals, SOURCES.changeDetection],
  },
  'intro-7': {
    definition: `Glosario: (1) WritableSignal: signal con .set() y .update(). (2) ReadonlySignal / Signal: solo lectura, p. ej. computed(). (3) computed(): valor derivado, solo lectura. (4) effect(): función que se ejecuta cuando cambian los signals que lee. (5) asReadonly(): convierte un WritableSignal en Signal. En esta lección fijamos la terminología para el resto del curso.`,
    como: `CÓMO se llaman en código: count = signal(0) es un WritableSignal<number>. total = computed(() => count() * 2) es un Signal<number> (readonly). effect(() => console.log(count())) es un effect. count.asReadonly() devuelve un Signal que no expone set/update. En TypeScript, WritableSignal<T> extiende Signal<T>.`,
    porQue: `POR QUÉ distinguir: al exponer estado desde un servicio, quieres que los consumidores no modifiquen directamente; asReadonly() lo garantiza. computed y effect son de solo lectura o side-effect; no son "writable". Saber la diferencia evita errores de tipos y de diseño.`,
    cuando: `CUÁNDO usar cada término: al leer documentación, al tipar funciones (recibo Signal<T> o WritableSignal<T>?), al exponer estado (asReadonly()) o al explicar a tu equipo qué hace cada primitiva.`,
    conQue: `CON QUÉ se relacionan: Signal es la interfaz base; WritableSignal añade set/update; computed() y effect() devuelven o usan Signals. La documentación de angular.dev usa estos nombres de forma consistente.`,
    paraQue: `PARA QUÉ: comunicación clara en el equipo, tipado correcto en TypeScript, y uso correcto de asReadonly() al diseñar servicios.`,
    realWorld: `En código: count = signal(0) es WritableSignal; total = computed(() => ...) es Signal; effect(() => ...) es un effect. Al exponer desde un servicio usas asReadonly() para que los consumidores no modifiquen.`,
    code: `const count = signal(0);           // WritableSignal<number>
const total = computed(() => count() * 2); // Signal<number>
effect(() => console.log(count()));        // effect
const readOnly = count.asReadonly();       // Signal<number>`,
    commonErrors: ['Confundir Signal con WritableSignal', 'No usar asReadonly() al exponer estado'],
    checklist: ['Conocer writable vs readonly', 'Saber qué es computed y effect'],
    explainLikeIm5: `Writable = puedes escribir en la pizarra. Readonly = solo mirar. Computed = un amigo que calcula cuando le preguntas. Effect = un ayudante que hace algo cada vez que cambia la pizarra.`,
    challenge: { description: 'Explica con tus palabras la diferencia entre signal(), computed() y effect().', hint: 'signal = valor; computed = valor derivado; effect = acción.' },
    sources: [SOURCES.apiSignal, SOURCES.apiComputed, SOURCES.apiEffect],
  },
  'intro-8': {
    definition: `Angular puede ejecutarse sin Zone.js (zoneless) usando provideZonelessChangeDetection() en app.config. En ese modo, la detección de cambios se dispara cuando los signals cambian o cuando hay eventos que Angular conoce. Signals son la base para que la UI se actualice correctamente. En esta lección verás cómo activarlo y qué implica.`,
    como: `CÓMO activar zoneless: en app.config.ts (o main.ts) añade provideZonelessChangeDetection() a los providers. A partir de ahí, Angular no parchea Zone; la UI se actualiza cuando tú actualizas un signal o cuando usas APIs que notifican a Angular (eventos de template, HttpClient con interceptor, etc.). Si algo no se actualiza, asegúrate de que ese estado esté en un signal y de que lo actualices explícitamente.`,
    porQue: `POR QUÉ zoneless: menos "magia" en el event loop, mejor rendimiento, menos conflictos con librerías que usan muchas APIs asíncronas, y control explícito sobre cuándo se detectan cambios.`,
    cuando: `CUÁNDO usarlo: en proyectos nuevos que quieran máximo rendimiento, o en migraciones cuando ya hay suficiente estado en signals. No actives zoneless sin tener el estado crítico en signals; si no, la UI puede quedarse desactualizada.`,
    conQue: `CON QUÉ: provideZonelessChangeDetection(), ApplicationRef.tick() si necesitas forzar un ciclo, y todo el estado reactivo en signals. Las guías de angular.dev explican el modo zoneless paso a paso.`,
    paraQue: `PARA QUÉ: reducir el coste de Zone.js, tener control explícito sobre la detección de cambios, y preparar la app para futuras optimizaciones del framework.`,
    realWorld: `En una app zoneless, no hay Zone.js parcheando setTimeout, fetch, etc. Solo se detectan cambios cuando tú actualizas un signal o cuando usas APIs que notifican a Angular. Menos "magia", más control y mejor rendimiento.`,
    code: `// app.config.ts
import { provideZonelessChangeDetection } from '@angular/core';
providers: [provideZonelessChangeDetection(), ...]`,
    commonErrors: ['Activar zoneless sin tener estado en signals', 'Esperar que setTimeout actualice la UI sin tocar un signal'],
    checklist: ['Saber qué es zoneless', 'Entender que sin Zone hay que usar signals para reactividad'],
    explainLikeIm5: `Sin Zone.js, nadie grita "algo pasó". Tú tienes que decir "cambié esto" con set() o update(). La app solo se entera cuando tú avisas.`,
    challenge: { description: 'Busca provideZonelessChangeDetection en la documentación.', hint: 'angular.dev → Change Detection' },
    sources: [SOURCES.guideSignals, SOURCES.changeDetection],
  },
  'intro-9': {
    definition: `Comparación breve: (1) React: useState/useReducer son estado local; Signals son más granulares y no necesitan Provider. (2) Vue: reactivity similar con ref/computed; Angular signals son análogos. (3) Solid: Signals como primitiva; Angular se inspiró en ideas similares. Cada framework tiene su estilo; Angular signals encajan en la inyección y el ecosistema existente. En esta lección verás las similitudes y diferencias.`,
    como: `CÓMO se comparan: en React, useState(0) ≈ signal(0); useMemo(() => count * 2, [count]) ≈ computed(() => count() * 2). En Vue, ref(0) ≈ signal(0); computed(() => ...) es muy similar. En Solid, createSignal y createMemo son conceptualmente cercanos. La diferencia está en la integración: Angular signals funcionan con DI, templates y Zone/zoneless.`,
    porQue: `POR QUÉ comparar: si vienes de otro framework, te ayuda a mapear conceptos y a no esperar una API idéntica. Si diseñas APIs, te inspira en patrones ya probados.`,
    cuando: `CUÁNDO útil: al migrar desde React/Vue/Solid, al explicar signals a alguien que conoce otro framework, o al elegir patrones (p. ej. "como en Vue pero con servicios de Angular").`,
    conQue: `CON QUÉ: documentación de React (hooks), Vue (reactivity), Solid (signals), y angular.dev (Signals). Hay artículos y vídeos que comparan Angular signals con otros frameworks.`,
    paraQue: `PARA QUÉ: acelerar el aprendizaje si vienes de otro framework, y aprovechar la integración específica de Angular (DI, templates, formularios) en lugar de copiar tal cual otro ecosistema.`,
    realWorld: `Si vienes de React: signal(0) ≈ useState(0), computed(() => ...) ≈ useMemo. Si vienes de Vue: signal ≈ ref, computed ≈ computed. La idea de "valor reactivo que notifica a los que leen" es común.`,
    code: `// Angular
const count = signal(0);
const double = computed(() => count() * 2);
// React: useState + useMemo
// Vue: ref + computed`,
    commonErrors: ['Esperar exactamente la misma API que en otro framework', 'No aprovechar la inyección de Angular'],
    checklist: ['Conocer similitudes con otros frameworks', 'Aprovechar la integración con Angular (DI, templates)'],
    explainLikeIm5: `Otros frameworks también tienen "cajas mágicas" que avisan cuando cambian. Angular tiene las suyas y se llevan bien con el resto de Angular (inyección, plantillas).`,
    challenge: { description: 'Compara en una tabla signal/computed/effect con tu framework anterior (si tienes).', hint: 'Busca "Angular signals vs React" o "vs Vue".' },
    sources: [SOURCES.guideSignals],
  },
  'intro-10': {
    definition: `Roadmap: input() y output() ya son signals/funciones en Angular 17+. model() para two-way binding. Futuras APIs pueden incluir más integración con el router y formularios. La documentación oficial (angular.dev) y el blog de Angular anuncian novedades. En esta lección verás qué está disponible hoy y qué puede venir.`,
    como: `CÓMO usar las APIs actuales: title = input<string>() para leer props como signal; count = output<number>() para emitir eventos; value = model<string>('') para two-way binding. Son la evolución de @Input(), @Output() y ngModel, integrados con signals. Las futuras APIs (router, formularios) se anuncian en el blog y en RFCs.`,
    porQue: `POR QUÉ un roadmap: signals están en evolución; input/output/model ya están estables. Saber qué viene ayuda a planificar migraciones y a no depender de APIs experimentales en producción sin saberlo.`,
    cuando: `CUÁNDO revisar: al empezar un proyecto nuevo (qué versión y qué APIs usar), al actualizar Angular (changelog y blog), y cuando necesites two-way binding o inputs avanzados (model(), input required).`,
    conQue: `CON QUÉ: angular.dev (docs de input, output, model), Angular Blog, y el repositorio de Angular en GitHub (CHANGELOG, RFCs).`,
    paraQue: `PARA QUÉ: usar las APIs recomendadas hoy, evitar deprecaciones sorpresa, y seguir la evolución del ecosistema de signals.`,
    realWorld: `Hoy ya puedes usar input(), output(), model() en componentes. El equipo de Angular sigue ampliando la integración de signals con el resto del framework. Mantente al día en angular.dev/blog.`,
    code: `// Ya disponibles
title = input<string>();
count = output<number>();
value = model<string>('');`,
    commonErrors: ['Asumir que todo está estable sin revisar la versión', 'No seguir el blog para breaking changes'],
    checklist: ['Revisar angular.dev para la versión que usas', 'Seguir el blog para novedades'],
    explainLikeIm5: `Angular va añadiendo más piezas para que las cajas mágicas funcionen con todo: formularios, rutas, etc. La documentación te dice qué hay hoy.`,
    challenge: { description: 'Visita angular.dev y localiza la guía de Signals.', hint: 'Docs → Guides → Signals' },
    sources: [SOURCES.guideSignals, SOURCES.apiInput, SOURCES.apiOutput, SOURCES.apiModel],
  },
  'intro-11': {
    definition: `Requisitos: Angular 16+ para signals (experimental), Angular 17+ para estabilidad. No necesitas instalar nada extra; signal, computed y effect vienen en @angular/core. Para zoneless necesitas provideZonelessChangeDetection() y asegurarte de que el estado reactivo esté en signals. En esta lección verás cómo dar los primeros pasos en tu proyecto.`,
    como: `CÓMO empezar: ejecuta ng version y verifica @angular/core >= 17. En cualquier componente o servicio, importa signal, computed, effect desde @angular/core y declara, por ejemplo, count = signal(0). En el template usa {{ count() }} y en métodos count.set(...) o count.update(...). No hace falta configurar nada más para usar signals. Para zoneless, añade provideZonelessChangeDetection() en app.config.`,
    porQue: `POR QUÉ estos requisitos: Angular 16 introdujo signals como experimental; en 17 se estabilizaron. Usar una versión anterior limita las APIs disponibles. Zoneless requiere que la detección de cambios no dependa de Zone, por eso el estado debe estar en signals.`,
    cuando: `CUÁNDO verificar: al crear un proyecto nuevo, al unirte a un equipo que ya usa Angular, o antes de seguir un tutorial (asegúrate de que la versión coincida).`,
    conQue: `CON QUÉ: ng new, ng version, app.config.ts, y la guía "Introduction to Angular Signals" en angular.dev.`,
    paraQue: `PARA QUÉ: evitar errores de versión, tener un entorno listo para practicar, y poder seguir el resto del curso y la documentación oficial.`,
    realWorld: `En un proyecto nuevo: ng new y ya puedes usar signal(), computed(), effect(). En uno existente: empieza por un componente o servicio, migra estado a signals y conecta la UI. Migración gradual.`,
    code: `import { Component, signal, computed, effect } from '@angular/core';
// Listo para usar en cualquier componente o servicio`,
    commonErrors: ['Usar una versión de Angular anterior a 16', 'Activar zoneless sin plan de migración'],
    checklist: ['Verificar versión de Angular (ng version)', 'Empezar por un módulo pequeño'],
    explainLikeIm5: `Solo necesitas tener Angular actualizado. Las cajas mágicas ya vienen en la caja de herramientas. Abre el manual (docs) y empieza por una pieza.`,
    challenge: { description: 'Ejecuta ng version y anota la versión de @angular/core.', hint: 'Debe ser 17 o superior para producción con signals.' },
    sources: [SOURCES.guideSignals],
  },
  'intro-12': {
    definition: `Recursos: (1) angular.dev - documentación oficial y guías. (2) Angular Blog - anuncios y RFCs. (3) YouTube - canal de Angular. (4) Comunidad en Discord/X. (5) Repositorios de ejemplo en GitHub. Usa la búsqueda del sitio y las etiquetas "signals" para filtrar. En esta lección tienes todo lo necesario para seguir aprendiendo.`,
    como: `CÓMO usar los recursos: en angular.dev busca "Signals" para la guía oficial; en el blog revisa las entradas sobre signals y zoneless. En YouTube, el canal de Angular publica conferencias y tutoriales. En Discord y X (@angular) puedes preguntar a la comunidad. En GitHub, busca "angular signals example" para proyectos de ejemplo.`,
    porQue: `POR QUÉ tener referencias: la documentación se actualiza con cada versión; el blog anuncia breaking changes y mejores prácticas. La comunidad resuelve dudas que la documentación no cubre.`,
    cuando: `CUÁNDO consultar: cuando tengas una duda concreta (doc), cuando actualices Angular (blog), cuando quieras ejemplos (GitHub, YouTube), o cuando necesites ayuda (Discord, X).`,
    conQue: `CON QUÉ: angular.dev, blog.angular.io, YouTube "Angular", Discord Angular, X @angular, GitHub angular/angular y repos de ejemplo.`,
    paraQue: `PARA QUÉ: seguir actualizado, resolver problemas rápido, y profundizar en temas que este curso solo introduce.`,
    realWorld: `Para dudas concretas: busca "Angular signals [tu pregunta]" en la doc. Para ejemplos: GitHub "angular signals example". Para discutir: Discord Angular o Twitter/X @angular.`,
    code: `// No hay código; es una lección de recursos
// angular.dev → Signals
// GitHub: angular/angular → docs`,
    commonErrors: ['No consultar la doc oficial primero', 'Confiar solo en tutoriales desactualizados'],
    checklist: ['Tener angular.dev en favoritos', 'Seguir al menos un canal de la comunidad'],
    explainLikeIm5: `Cuando no sepas algo, pregunta en la documentación o a la comunidad. Hay mucha gente que ya usó las cajas mágicas y te puede ayudar.`,
    challenge: { description: 'Abre angular.dev, busca "Signals" y guarda el enlace de la guía.', hint: 'Guía: Introduction to Angular Signals' },
    sources: [SOURCES.guideSignals, SOURCES.blogAngular],
  },
  'intro-13': {
    definition: `Esta academia tiene tres pilares: Lecciones (teoría y ejemplos), Labs (código interactivo con editor y preview) y Quiz (preguntas para afianzar). Usa el menú lateral para cambiar de sección; la barra superior para cambiar entre Lecciones, Labs y Quiz. Las lecciones con botón "Probar en Lab" te llevan directamente al Lab correspondiente.`,
    como: `CÓMO navegar: (1) Sidebar: elige una sección (Inicio, Introducción, Fundamentos, etc.). (2) Pestañas: Lecciones, Labs, Quiz. (3) En Lecciones, haz clic en una card para ver el detalle; usa "Probar en Lab" si aparece. (4) En Labs, elige un lab, edita el código y ejecuta. (5) En Quiz, elige un módulo y responde.`,
    porQue: `POR QUÉ esta estructura: la teoría en lecciones, la práctica en labs y la verificación en quiz cubren aprendizaje completo.`,
    cuando: `CUÁNDO usar cada parte: lee lecciones en orden sugerido; después de cada bloque, practica en el Lab indicado; al final de una sección, haz el Quiz si existe.`,
    conQue: `CON QUÉ: sidebar (secciones), pestañas (Lecciones/Labs/Quiz), búsqueda en el header, modo oscuro/claro, modo enfoque (oculta sidebar).`,
    paraQue: `PARA QUÉ: Sacar el máximo partido a la academia sin perderte.`,
    realWorld: `Empieza por Inicio → Explorar lecciones → Introducción. Luego Fundamentos y sus labs. Alterna lectura y Labs. Recursos tiene enlaces externos.`,
    code: `// Navegación: sidebar + pestañas
// Lecciones → detalle → "Probar en Lab" si aparece
// Labs → elegir lab → editar → Ejecutar`,
    commonErrors: ['Saltar directo a Labs sin leer la lección relacionada', 'No usar el sidebar para cambiar de sección'],
    checklist: ['Conocer las tres pestañas', 'Saber que "Probar en Lab" abre el Lab', 'Saber que Recursos tiene enlaces externos'],
    explainLikeIm5: 'Esta academia tiene tres habitaciones: una para leer, una para programar y una para responder preguntas. El menú lateral te lleva a cada tema.',
    challenge: { description: 'Abre una lección de Fundamentos y haz clic en "Probar en Lab" para ir al Lab del contador.', hint: 'Lecciones → Fundamentos → Crear tu primer Signal.' },
    sources: [SOURCES.guideSignals],
  },
};
