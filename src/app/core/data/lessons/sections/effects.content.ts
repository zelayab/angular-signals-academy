import type { LessonContent } from '../../../models/lesson.model';

export const EFFECTS_CONTENT: Record<string, LessonContent> = {
  'eff-1': {
    definition: `effect() registra una función que se ejecuta cuando cambia algún signal que se lee dentro de ella. Sirve para efectos secundarios: logging, persistencia en localStorage, sincronización con el servidor, etc. Se ejecuta después de que los signals hayan sido actualizados.`,
    como: `CÓMO: effect(() => { const v = miSignal(); localStorage.setItem('key', v); }). Dentro del effect solo lee signals y haz side effects (setItem, log, navigate). No escribas en un signal que el effect lee.`,
    porQue: `POR QUÉ: Los side effects (I/O, DOM) no deben estar en computed; effect es el lugar para "reaccionar" a cambios.`,
    cuando: `CUÁNDO: Persistir estado, logging, analytics, sincronizar con URL o API cuando cambie un signal.`,
    conQue: `CON QUÉ: signal() que leas dentro; no escribir en esos signals (evitar loops).`,
    paraQue: `PARA QUÉ: Reaccionar a cambios de estado con acciones (guardar, enviar, mostrar) sin mezclar con computed.`,
    realWorld: `Ejemplo: un effect que lee filtros() y hace una petición HTTP para buscar. Otro que lee carrito() y guarda en localStorage para recuperar al recargar.`,
    code: `effect(() => {
  const user = this.user();
  if (user) {
    console.log('Usuario actual:', user.name);
    localStorage.setItem('lastUser', user.id);
  }
});`,
    commonErrors: ['Escribir un signal que el effect lee (loop infinito)', 'Hacer demasiado trabajo síncrono en el effect'],
    checklist: ['Solo usar effect para side effects', 'No modificar signals que el effect lee sin allowSignalWrites'],
    explainLikeIm5: `Un effect es un ayudante que cada vez que cambias algo en la pizarra (el signal), va y hace una tarea: guardar en un cajón, avisar a alguien, etc. No debe escribir en la pizarra él mismo o se volvería loco.`,
    challenge: { description: 'Crea un effect que guarde el valor de un signal de texto en localStorage cuando cambie.', hint: 'effect(() => { localStorage.setItem("key", miSignal()); });' },
  },
  'eff-2': {
    definition: `Un effect puede devolver una función de cleanup. Angular la ejecuta antes de la próxima ejecución del effect o cuando el effect se destruye. Úsala para cancelar suscripciones, timers o listeners y evitar memory leaks.`,
    como: `CÓMO: effect((onCleanup) => { const id = setInterval(...); onCleanup(() => clearInterval(id)); }). Cualquier recurso que crees (interval, subscription, listener) debe limpiarse en onCleanup.`,
    porQue: `POR QUÉ: Si no limpias, al re-ejecutar el effect o al destruir el componente quedarían timers o suscripciones activos.`,
    cuando: `CUÁNDO: Siempre que el effect cree setInterval, subscribe(), addEventListener u otro recurso.`,
    conQue: `CON QUÉ: onCleanup(callback); clearInterval, unsubscribe(), removeEventListener.`,
    paraQue: `PARA QUÉ: Evitar memory leaks y comportamientos raros al destruir o re-ejecutar.`,
    realWorld: `Si dentro del effect te suscribes a un Observable, devuelve () => subscription.unsubscribe(). Si abres un setInterval, devuelve () => clearInterval(id). Así al cambiar el signal o al destruir el componente no quedan suscripciones colgadas.`,
    code: `effect((onCleanup) => {
  const id = setInterval(() => console.log('tick'), 1000);
  onCleanup(() => clearInterval(id));
});
// o: return () => clearInterval(id); (según API)`,
    commonErrors: ['No hacer cleanup de setInterval o subscriptions', 'Asumir que el effect solo se ejecuta una vez'],
    checklist: ['Cada recurso creado en el effect → cleanup', 'Documentar qué se limpia'],
    explainLikeIm5: `Cuando el effect termina o se va, tiene que recoger sus juguetes: parar el reloj, colgar el teléfono. Si no, los juguetes siguen ahí y la memoria se llena.`,
    challenge: { description: 'Escribe un effect que abra setInterval y devuelva una función que haga clearInterval en el cleanup.', hint: 'onCleanup(() => clearInterval(timerId));' },
  },
  'eff-3': {
    definition: `Por defecto no puedes escribir en un signal dentro de un effect (evita loops). Si necesitas hacerlo, usa effect(..., { allowSignalWrites: true }). Usa esto solo cuando sepas lo que haces: escribir un signal que el effect lee puede causar un bucle infinito.`,
    como: `CÓMO: effect(() => { const id = routeParams()['id']; if (id) selectedId.set(id); }, { allowSignalWrites: true }). El effect lee routeParams pero escribe en selectedId; no leas selectedId en el mismo effect.`,
    porQue: `POR QUÉ: Escribir en lo que lees dispara de nuevo el effect → loop. allowSignalWrites permite escribir solo en signals que el effect no lee.`,
    cuando: `CUÁNDO: Sincronizar URL con signal, escribir en un signal "destino" que no lees en el effect.`,
    conQue: `CON QUÉ: { allowSignalWrites: true }; asegurar que el signal que escribes no está en las dependencias.`,
    paraQue: `PARA QUÉ: Poder sincronizar estado (ej. URL ↔ signal) sin provocar loops.`,
    realWorld: `Ejemplo válido: un effect que lee routeParams() y escribe selectedId.set(params.id). El effect no lee selectedId, así que no hay ciclo. Peligroso: effect que lee count() y hace count.set(count() + 1).`,
    code: `effect(() => {
  const id = this.routeParams()['id'];
  if (id) this.selectedId.set(id);
}, { allowSignalWrites: true });
// Asegúrate de no leer selectedId en este effect`,
    commonErrors: ['Poner allowSignalWrites: true sin necesidad', 'Escribir un signal que el effect también lee'],
    checklist: ['¿Realmente necesito escribir un signal aquí?', 'El signal que escribo no debe ser leído por este effect'],
    explainLikeIm5: `allowSignalWrites es un permiso especial: "puedo escribir en la pizarra". Si escribes algo que tú mismo lees, te preguntas "¿qué puse?" y vuelves a escribir y nunca acabas. Solo escribe cosas que no vayas a leer en el mismo effect.`,
    challenge: { description: 'Identifica un caso donde allowSignalWrites sea seguro (ej: sincronizar URL con un signal) y otro donde cause loop.', hint: 'Seguro: escribir en un signal que el effect no lee. Loop: escribir en el mismo que lees.' },
  },
  'eff-4': {
    definition: `Usa effect() para persistir estado en localStorage o sincronizar con el backend. Dentro del effect lees los signals que quieres persistir y llamas a localStorage.setItem o a un servicio HTTP. Opcional: onCleanup no suele hacer falta para localStorage; sí para cancelar peticiones HTTP si el effect se re-ejecuta antes de que termine la anterior.`,
    como: `CÓMO: effect(() => { localStorage.setItem('theme', theme()); }); o effect(() => { api.sync(cart()).subscribe(); }); Para HTTP, en onCleanup cancela la suscripción si el effect se re-ejecuta.`,
    porQue: `POR QUÉ: Persistir o sincronizar es un side effect; debe vivir en effect, no en computed.`,
    cuando: `CUÁNDO: Guardar preferencias, carrito, último filtro; enviar estado al servidor cuando cambie.`,
    conQue: `CON QUÉ: localStorage, HttpClient; onCleanup para cancelar peticiones si hace falta.`,
    paraQue: `PARA QUÉ: Que el estado sobreviva recargas o se mantenga en sync con el backend.`,
    realWorld: `effect(() => { localStorage.setItem('theme', theme()); }); para guardar el tema. Para el carrito: effect(() => { api.syncCart(cart()).subscribe(); }); si quieres enviar al servidor; considera cancelar la petición anterior en cleanup.`,
    code: `effect(() => {
  const prefs = { theme: theme(), lang: lang() };
  localStorage.setItem('prefs', JSON.stringify(prefs));
});`,
    commonErrors: ['Persistir en un computed (side effect)', 'No cancelar peticiones HTTP si el effect se re-ejecuta'],
    checklist: ['Persistencia = effect', 'Si usas HTTP, considera cleanup para cancelar'],
    explainLikeIm5: `Cada vez que cambias la pizarra (theme, lang), el ayudante (effect) va al cajón (localStorage) y guarda una foto. Así cuando vuelves, la foto está ahí.`,
    challenge: { description: 'Crea un effect que guarde en localStorage un signal de "última búsqueda" cuando cambie.', hint: 'effect(() => localStorage.setItem("lastSearch", search()))' },
  },
  'eff-5': {
    definition: `untracked(fn) ejecuta fn sin registrar las lecturas de signals que haya dentro como dependencias del effect. Útil cuando quieres leer un signal "solo para decidir" pero no quieres que el effect se re-ejecute cuando ese signal cambie.`,
    como: `CÓMO: effect(() => { const list = items(); if (untracked(() => mode()) === 'batch') return; process(list); }). mode() no se registra como dependencia; el effect solo reacciona a items().`,
    porQue: `POR QUÉ: A veces necesitas un valor "de contexto" (modo, enabled) sin que un cambio en ese valor dispare el effect.`,
    cuando: `CUÁNDO: Leer un signal solo para condicionar la lógica del effect sin suscribirte a ese signal.`,
    conQue: `CON QUÉ: untracked(() => miSignal()); no uses para el signal del que sí quieres reaccionar.`,
    paraQue: `PARA QUÉ: Control fino sobre qué signals disparan el effect.`,
    realWorld: `Tienes un effect que debe reaccionar a items(); pero dentro quieres leer mode() solo para elegir qué hacer, sin que un cambio de mode() dispare el effect. Lees mode dentro de untracked(() => mode()).`,
    code: `effect(() => {
  const list = items(); // dependencia
  const mode = untracked(() => mode()); // no dependencia
  if (mode === 'batch') return;
  process(list);
});`,
    commonErrors: ['Usar untracked para el signal del que sí quieres reaccionar', 'Leer en untracked algo que luego usas para escribir y crear inconsistencias'],
    checklist: ['untracked solo para lecturas que no deben disparar el effect', 'Documentar por qué ese signal no es dependencia'],
    explainLikeIm5: `A veces el ayudante mira una pizarra solo para decidir qué hacer, pero no quiere que cuando esa pizarra cambie tenga que volver a trabajar. Esa mirada "no cuenta" (untracked).`,
    challenge: { description: 'Escribe un effect que reaccione a count() pero lea enabled() con untracked para decidir si hace log.', hint: 'if (untracked(() => enabled())) console.log(count())' },
  },
  'eff-6': {
    definition: `Puedes reaccionar a signals de formulario (valores, touched, errors) con effect(). Por ejemplo: effect(() => { if (form.valid()) submitButton.disabled = false; }) para habilitar un botón. O effect que lee email() y password() y llama a un servicio de validación. No abuses: la validación reactiva suele ir mejor en computed (isValid) y el effect solo para side effects (habilitar/deshabilitar algo externo).`,
    como: `CÓMO: Validación derivada → computed (canSubmit, isEmailValid). Efectos secundarios (habilitar botón, focus, mensaje) → effect que lee ese computed. No pongas toda la validación en effect.`,
    porQue: `POR QUÉ: computed es para "valor derivado"; effect es para "hacer algo" (DOM, atributos). Mezclar complica y puede dar loops.`,
    cuando: `CUÁNDO: Formularios con signals; habilitar/deshabilitar controles o mostrar mensajes según validación.`,
    conQue: `CON QUÉ: computed para canSubmit; effect para manipular DOM o atributos según ese computed.`,
    paraQue: `PARA QUÉ: UI reactiva en formularios sin lógica de validación en effect.`,
    realWorld: `Signals de formulario: email = signal(''), password = signal(''). computed isEmailValid = computed(() => ...). effect que cuando canSubmit() sea true muestre un mensaje o habilite el botón.`,
    code: `effect(() => {
  if (canSubmit()) {
    this.submitEl?.nativeElement.removeAttribute('disabled');
  } else {
    this.submitEl?.nativeElement.setAttribute('disabled', '');
  }
});`,
    commonErrors: ['Poner toda la lógica de validación en effect en vez de computed', 'Escribir en el formulario dentro del effect y crear ciclos'],
    checklist: ['Validación derivada = computed', 'Efectos secundarios (DOM, mensaje) = effect'],
    explainLikeIm5: `El ayudante mira si el formulario está listo (computed) y cuando está listo hace algo: quitar el candado del botón. No escribe en el formulario él mismo.`,
    challenge: { description: 'Combina computed canSubmit (email válido y password largo) y un effect que haga focus en el primer error cuando canSubmit pase a false.', hint: 'effect que lee canSubmit() y si es false hace focus en el primer invalid.' },
  },
  'eff-7': {
    definition: `effect() es adecuado para analytics y logging: cuando cambien ciertos signals (p. ej. página actual, filtros aplicados), registrar un evento. Dentro del effect lees los signals y llamas a tu servicio de analytics. Evita loggear en cada cambio si es muy frecuente; puedes usar untracked para leer un "contexto" que no dispare el effect.`,
    como: `CÓMO: effect(() => { analytics.track('filter_changed', { query: query(), category: category() }); }). Si un signal cambia muy seguido (teclado), considera debounce con toObservable o solo track al blur.`,
    porQue: `POR QUÉ: Analytics es un side effect; debe estar en effect. Evitar eventos por tecla mejora rendimiento y no satura el backend.`,
    cuando: `CUÁNDO: Track de vistas, filtros, conversiones; logs de depuración en desarrollo.`,
    conQue: `CON QUÉ: Servicio de analytics; untracked si algo no debe disparar el track.`,
    paraQue: `PARA QUÉ: Métricas y debugging sin mezclar con computed.`,
    realWorld: `effect(() => { analytics.track('filter_changed', { query: query(), category: category() }); }); para enviar eventos cuando el usuario cambie filtros. No loggear en cada tecla; quizás un debounce con otro signal o solo al blur.`,
    code: `effect(() => {
  const page = pageId();
  const filters = { q: query(), cat: category() };
  analyticsService.track('page_view', { page, filters });
});`,
    commonErrors: ['Loggear en un computed', 'Enviar demasiados eventos (cada keystroke) sin debounce'],
    checklist: ['Analytics = effect', 'Considerar debounce o solo eventos relevantes'],
    explainLikeIm5: `El ayudante cada vez que cambias la pizarra (página o filtros) manda una postal a la oficina de estadísticas. Así saben qué hace la gente.`,
    challenge: { description: 'Añade un effect que envíe un evento "lab_completed" cuando completedLabs() tenga un nuevo id.', hint: 'Comparar longitud o último id; log solo cuando cambie.' },
  },
  'eff-8': {
    definition: `Puedes mantener la URL (query params o hash) en sync con signals usando effect() y allowSignalWrites: true. El effect lee los signals (filtro, orden) y llama a router.navigate con queryParams. O al revés: leer route.queryParams (con toSignal) y escribir en signals; entonces el effect lee la ruta y escribe en tus signals.`,
    como: `CÓMO: effect(() => { router.navigate([], { queryParams: { q: query() }, queryParamsHandling: 'merge' }); }, { allowSignalWrites: true }). No leas en el effect el signal que actualizas desde la URL (evitar loop).`,
    porQue: `POR QUÉ: La URL como reflejo del estado permite compartir enlaces y refrescar; effect es el puente.`,
    cuando: `CUÁNDO: Filtros, orden, página actual que quieras en la URL.`,
    conQue: `CON QUÉ: Router.navigate, queryParams; allowSignalWrites; no leer en el effect el signal que la URL escribe.`,
    paraQue: `PARA QUÉ: Deep linking y estado compartible vía URL.`,
    realWorld: `effect(() => { router.navigate([], { queryParams: { q: query(), sort: sortBy() }, queryParamsHandling: 'merge' }); }, { allowSignalWrites: true }); para que la URL refleje el estado. El effect no debe leer los signals que escribe (no escribir query/sortBy dentro del effect).`,
    code: `effect(() => {
  const q = query();
  this.router.navigate([], { queryParams: { q }, queryParamsHandling: 'merge' });
}, { allowSignalWrites: true });`,
    commonErrors: ['Escribir en el mismo signal que el effect lee (loop)', 'Navegar en cada keystroke sin debounce (muchas navegaciones)'],
    checklist: ['URL desde signals: effect + navigate', 'No leer en el effect los signals que actualizas desde la URL'],
    explainLikeIm5: `El ayudante escribe en la barra de direcciones (URL) lo que ve en la pizarra (query). No lee la barra de direcciones para escribir en la pizarra en el mismo effect o se enreda.`,
    challenge: { description: 'Sincroniza un signal search con queryParam "q"; al cargar la página lee "q" y pone search; al cambiar search actualiza la URL.', hint: 'Un effect para URL → signal; otro para signal → URL (sin leer el que escribe).' },
  },
  'eff-9': {
    definition: `Para evitar loops: (1) No escribas en un signal que el effect lee. (2) Si necesitas escribir, usa allowSignalWrites pero escribe solo en signals que el effect no lee. (3) Usa untracked para leer algo "solo para decidir" si no quieres que ese algo dispare el effect. (4) Si escribes en un signal, asegúrate de que esa escritura no vuelva a disparar este effect (no leer ese signal en el effect).`,
    como: `CÓMO: Dibuja mentalmente: "qué signals leo" y "en cuáles escribo". La intersección debe ser vacía. Si escribes en selectedId, no leas selectedId en el mismo effect.`,
    porQue: `POR QUÉ: Leer → escribir en lo leído → Angular detecta cambio → re-ejecuta effect → loop infinito.`,
    cuando: `CUÁNDO: Al diseñar cualquier effect que use allowSignalWrites; al depurar "la app se congela".`,
    conQue: `CON QUÉ: allowSignalWrites, untracked; revisar dependencias del effect.`,
    paraQue: `PARA QUÉ: Evitar bucles infinitos y comportamiento estable.`,
    realWorld: `Ejemplo seguro: effect lee routeParams(), escribe selectedId.set(id). No lee selectedId. Ejemplo loop: effect lee count(), hace count.set(count()+1). El diseño "solo lectura en effect, escritura en métodos" evita la mayoría de loops.`,
    code: `// Seguro: escribe en algo que no lee
effect(() => {
  const id = routeParams()['id'];
  if (id) selectedId.set(id);
}, { allowSignalWrites: true });
// Loop: no hacer
effect(() => count.set(count() + 1));`,
    commonErrors: ['allowSignalWrites: true y escribir en el signal que lees', 'No revisar las dependencias del effect'],
    checklist: ['El effect no escribe en lo que lee', 'Si escribe, ese signal no está en las dependencias'],
    explainLikeIm5: `El ayudante no puede escribir en la misma pizarra que está mirando; si no, mira, escribe, mira otra vez, escribe otra vez y no para. Escribe en otra pizarra que no mire.`,
    challenge: { description: 'Dibuja en un papel: qué signals lee tu effect y en cuáles escribe. Verifica que no haya intersección.', hint: 'Conjunto de dependencias ∩ conj. de escritura = ∅' },
  },
  'eff-10': {
    definition: `Resumen effects: (1) effect() para side effects (persistir, log, navegar). (2) computed() para valores derivados; no uses effect para "calcular algo". (3) Cleanup para recursos (timers, suscripciones). (4) allowSignalWrites solo si escribes en signals que el effect no lee. (5) untracked para leer sin suscribir. (6) Evitar loops: no escribir lo que lees.`,
    como: `CÓMO: Repasa: effect = hacer algo; computed = calcular valor; cleanup si creas recursos; no escribir lo que lees.`,
    porQue: `POR QUÉ: Separar "calcular" (computed) de "reaccionar con acción" (effect) mantiene el código predecible.`,
    cuando: `CUÁNDO: Checklist al escribir effects; antes de pasar a Input/Output o RxJS.`,
    conQue: `CON QUÉ: effect(), computed(), onCleanup, allowSignalWrites, untracked.`,
    paraQue: `PARA QUÉ: Consolidar effects y evitar errores típicos (loops, side effects en computed).`,
    realWorld: `Regla rápida: ¿quieres un valor derivado? → computed. ¿Quieres hacer algo cuando cambie (guardar, enviar, mostrar)? → effect.`,
    code: `// Valor derivado → computed
const total = computed(() => price() * qty());
// Hacer algo cuando cambie → effect
effect(() => { persist(total()); });`,
    commonErrors: ['Usar effect para derivar valor (usar computed)', 'Usar computed para side effect (usar effect)'],
    checklist: ['effect = side effect', 'computed = valor derivado', 'Cleanup si creas recursos'],
    explainLikeIm5: `El ayudante (effect) hace cosas cuando cambia la pizarra; el amigo (computed) solo calcula cuando preguntas. No los intercambies.`,
    challenge: { description: 'Escribe en una frase cuándo usar effect y cuándo computed.', hint: 'effect: hacer. computed: calcular.' },
  },
  'eff-11': {
    definition: 'Practica en el Lab: theme switcher con effect(). Un signal dark; un effect que aplica la clase al document cuando cambia.',
    como: `CÓMO: Haz clic en "Probar en Lab" para abrir el Lab del theme. Un effect lee dark() y hace document.documentElement.classList.toggle('dark', d). Al hacer clic en el botón, el tema cambia.`,
    porQue: `POR QUÉ: Cambiar el DOM (clase en document) es un side effect; effect() es el lugar correcto.`,
    cuando: `CUÁNDO: Después de "Introducción a effect()" y "Persistencia con effect()".`,
    conQue: `CON QUÉ: signal(true), effect(() => document.documentElement.classList.toggle('dark', this.dark())).`,
    paraQue: `PARA QUÉ: Ver effect() aplicando cambios al DOM según un signal.`,
    realWorld: 'Abre el Lab "Theme switcher con effect" desde el botón o la pestaña Labs.',
    code: 'effect(() => {\n  const d = this.dark();\n  document.documentElement.classList.toggle(\'dark\', d);\n  document.documentElement.classList.toggle(\'light\', !d);\n});',
    commonErrors: ['Escribir en el signal que el effect lee (loop)', 'Hacer esto en un computed en lugar de effect'],
    checklist: ['Abrir el Lab Theme switcher', 'Hacer clic y ver el cambio de clase en el documento', 'Entender que es un side effect'],
    explainLikeIm5: 'En el Lab tocas el botón y la página cambia de oscuro a claro porque el effect "escucha" el signal.',
    challenge: { description: 'Completar el lab del theme en Labs.', hint: 'Probar en Lab o pestaña Labs.' },
  },
};
