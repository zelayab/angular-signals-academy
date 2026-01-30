import type { LessonContent } from '../../../models/lesson.model';

export const COMPUTED_CONTENT: Record<string, LessonContent> = {
  'comp-1': {
    definition: `computed() crea un signal de solo lectura cuyo valor se calcula a partir de otros signals. Cuando alguna dependencia cambia, el computed se recalcula la próxima vez que alguien lo lea (evaluación perezosa).`,
    como: `CÓMO: Declara total = computed(() => quantity() * unitPrice()). Dentro de la función lee solo signals (o otros computed); devuelve el valor derivado. No hagas side effects.`,
    porQue: `POR QUÉ: Evitar duplicar lógica y mantener un único lugar para el valor derivado; Angular rastrea dependencias y solo recalcula cuando cambian.`,
    cuando: `CUÁNDO: Cualquier valor que se calcule a partir de otros signals (total, lista filtrada, validación).`,
    conQue: `CON QUÉ: signal() como dependencias; template u otros computed que lean el resultado; no usar con effect para "disparar" algo (eso es effect).`,
    paraQue: `PARA QUÉ: Valores derivados reactivos sin boilerplate ni sincronización manual.`,
    realWorld: `Ejemplo: tienes signal(quantity) y signal(unitPrice). Un computed total = computed(() => quantity() * unitPrice()) se actualiza solo cuando quantity o unitPrice cambian, y solo cuando algo lee total().`,
    code: `const quantity = signal(2);
const unitPrice = signal(10);
const total = computed(() => quantity() * unitPrice());
// total() === 20; si quantity.set(3), total() === 30 en la siguiente lectura`,
    commonErrors: ['Hacer side effects dentro de computed (HTTP, DOM)', 'Leer diferentes signals en ramas condicionales de forma que rompa el tracking'],
    checklist: ['El computed solo deriva valores', 'No modificar estado ni llamar APIs dentro del computed'],
    explainLikeIm5: `Computed es como un amigo que siempre te dice el total de la compra cuando tú le preguntas. Él solo mira la cantidad y el precio y te responde. No va a la tienda ni escribe en la pizarra.`,
    challenge: { description: 'Crea un computed que devuelva el doble de un signal numérico.', hint: 'computed(() => valor() * 2)' },
  },
  'comp-2': {
    definition: `Angular rastrea automáticamente qué signals lees dentro de la función pasada a computed(). Esas lecturas (las llamadas signal()) registran dependencias. Cuando alguna dependencia cambia, el computed se marca como "sucio" y se recalcula en la siguiente lectura.`,
    como: `CÓMO: Dentro del computed solo lee signals llamándolos: a(), b(). Cada lectura se registra como dependencia. No leas en ramas condicionales que cambien el set de dependencias entre ejecuciones.`,
    porQue: `POR QUÉ: El tracking automático evita declarar dependencias a mano y reduce errores; las dependencias dinámicas pueden dar comportamientos raros.`,
    cuando: `CUÁNDO: Siempre que uses computed; evita if (flag()) return a(); else return b(); si en una rama no lees b() y en otra sí.`,
    conQue: `CON QUÉ: Cualquier signal() o computed() que leas; el orden y estabilidad de las lecturas importan.`,
    paraQue: `PARA QUÉ: Que el computed se recalcule solo cuando cambien las fuentes que realmente usa.`,
    realWorld: `Si tienes computed(() => a() + b()), Angular sabe que el computed depende de a y b. Si solo a cambia, al leer el computed se re-ejecuta la función y se lee a() y b() de nuevo. No necesitas declarar dependencias a mano.`,
    code: `const a = signal(1);
const b = signal(2);
const sum = computed(() => {
  return a() + b(); // dependencias: a, b
});
// Si a.set(2), la próxima vez que leas sum() se recalcula`,
    commonErrors: ['Leer un signal dentro de un if que a veces no se ejecuta (dependencias dinámicas)', 'Leer en un bucle y esperar que cada iteración sea dependencia'],
    checklist: ['Todas las lecturas de signals deben ser estables (mismas en cada ejecución)', 'No leer signals condicionalmente de forma que cambie el set de dependencias'],
    explainLikeIm5: `El computed tiene una libreta donde apunta de quién se entera. Cada vez que mira un signal, lo apunta. Cuando uno de esos cambia, borra el resultado y la próxima vez que le pregunten vuelve a calcular.`,
    challenge: { description: 'Escribe un computed que dependa de dos signals y verifica que al cambiar solo uno se recalcula.', hint: 'Pon un console.log dentro del computed y cambia cada signal por separado.' },
  },
  'comp-3': {
    definition: `Para evitar recálculos innecesarios: (1) no leas más signals de los necesarios; (2) evita lógica pesada dentro del computed; (3) si una rama lee signals distintos según condición, el tracking puede ser impredecible — mejor derivar en pasos con varios computed.`,
    como: `CÓMO: Mantén el computed puro: mismas lecturas en cada ejecución, sin I/O ni side effects. Si la lógica es costosa, considera memoización o varios computed encadenados.`,
    porQue: `POR QUÉ: Un computed que lee de más se recalcula más de lo necesario; uno con ramas que cambian dependencias puede dar resultados incorrectos o recálculos extra.`,
    cuando: `CUÁNDO: Al diseñar computed con condicionales o con muchos signals; al notar rendimiento pobre.`,
    conQue: `CON QUÉ: Lecturas estables; evitar flag() ? a() : b() si en una rama no lees todos los que influyen.`,
    paraQue: `PARA QUÉ: Rendimiento y comportamiento predecible del computed.`,
    realWorld: `En una lista filtrada: un computed que lee items() y filtro() y devuelve items().filter(...) está bien. Si además lees sortOrder() solo cuando filtro() no está vacío, las dependencias pueden cambiar entre ejecuciones y causar recálculos extra.`,
    code: `// Bien: dependencias claras
const filtered = computed(() => items().filter(i => i.name.includes(query())));
// Evitar: ramas que leen signals distintos
const value = computed(() => flag() ? a() : b()); // dependencias: flag, a, b`,
    commonErrors: ['Poner peticiones HTTP o DOM dentro del computed', 'Leer en ramas condicionales signals diferentes y esperar "solo lo necesario"'],
    checklist: ['El computed es puro (mismas entradas → mismo resultado)', 'No side effects; no I/O'],
    explainLikeIm5: `El computed tiene que ser un amigo que solo mira y calcula. No puede ir a la tienda (HTTP) ni tocar la pizarra (escribir signals). Si hace trampas, Angular se puede confundir.`,
    challenge: { description: 'Mueve una comparación costosa (p. ej. filtro sobre 1000 ítems) a un computed y mide que solo se ejecuta cuando cambian items o filtro.', hint: 'Usa console.time/timeEnd dentro del computed.' },
  },
  'comp-4': {
    definition: `Un computed puede depender de otro computed. Angular rastrea la cadena: si cambia un signal base, se marcan como sucios los computed que lo leen y los que leen a esos. La evaluación sigue siendo perezosa: solo se recalcula cuando alguien lee el computed final.`,
    como: `CÓMO: filtered = computed(() => items().filter(...)); sorted = computed(() => [...filtered()].sort(...)). El segundo lee al primero; cuando items cambia, ambos se marcan sucios; sorted() se evalúa cuando lo leas.`,
    porQue: `POR QUÉ: Encadenar computed mantiene la lógica en pasos claros y reutilizables; la pereza evita trabajo innecesario.`,
    cuando: `CUÁNDO: Listas que primero se filtran y luego se ordenan o paginan; varios niveles de derivación.`,
    conQue: `CON QUÉ: computed que lee signal u otro computed; no leer Observables ni I/O.`,
    paraQue: `PARA QUÉ: Organizar derivaciones complejas y que solo se recalcule lo necesario.`,
    realWorld: `items = signal([]); filtered = computed(() => items().filter(...)); sorted = computed(() => [...filtered()].sort(...)). Cuando items cambia, filtered y sorted se marcan sucios; sorted() se recalcula cuando lo leas.`,
    code: `const items = signal<Item[]>([]);
const filtered = computed(() => items().filter(i => i.active));
const sorted = computed(() => [...filtered()].sort((a,b) => a.name.localeCompare(b.name)));`,
    commonErrors: ['Crear cadenas muy largas de computed y no medir rendimiento', 'Leer en un computed algo que no es signal ni computed'],
    checklist: ['Computed anidados están bien si la cadena es clara', 'No leer Observables ni I/O dentro del computed'],
    explainLikeIm5: `Un amigo (computed) puede preguntar a otro amigo (otro computed) que a su vez mira la pizarra. Cuando la pizarra cambia, ambos se actualizan cuando tú preguntas.`,
    challenge: { description: 'Crea filtered y sorted como dos computed; filtered filtra por texto y sorted ordena filtered().', hint: 'sorted = computed(() => [...filtered()].sort(...))' },
  },
  'comp-5': {
    definition: `Puedes leer varios signals dentro del mismo computed. Todas las lecturas se registran como dependencias. total = computed(() => quantity() * unitPrice() - discount()) depende de quantity, unitPrice y discount. Cuando cualquiera cambia, total se recalcula al leerse.`,
    como: `CÓMO: Dentro de un mismo computed lee todos los signals que necesites: a(), b(), c(). Todas las lecturas forman el set de dependencias; si cualquiera cambia, el computed se recalcula al leerse.`,
    porQue: `POR QUÉ: Un solo computed puede combinar varias fuentes; el resultado es un valor derivado coherente.`,
    cuando: `CUÁNDO: Totales, promedios, cadenas de texto (nombre + apellido), cualquier fórmula con varias variables.`,
    conQue: `CON QUÉ: Varios signal() en la misma función; evita leer solo "a veces" uno de ellos (ramas que cambien el set).`,
    paraQue: `PARA QUÉ: Un único punto de verdad para el valor combinado.`,
    realWorld: `En un formulario de pedido: total = computed(() => quantity() * price() * (1 - coupon() ? 0.1 : 0)). Tres signals; el computed devuelve el total con descuento si hay cupón.`,
    code: `const a = signal(1);
const b = signal(2);
const c = signal(3);
const sum = computed(() => a() + b() + c());`,
    commonErrors: ['Leer un signal solo a veces (rama condicional que cambia el set de dependencias)', 'Poner lógica pesada sin necesidad'],
    checklist: ['Todas las lecturas de signals en cada ejecución son estables', 'El resultado es una función pura de las dependencias'],
    explainLikeIm5: `El amigo mira varias pizarras (varios signals) y te da un número que depende de todas. Si cualquiera cambia, la próxima vez que preguntes te recalcula.`,
    challenge: { description: 'Crea un computed que combine tres signals (nombre, apellido, título) en una cadena "título nombre apellido".', hint: 'computed(() => `${title()} ${name()} ${surname()}`)' },
  },
  'comp-6': {
    definition: `Lazy evaluation: un computed solo se recalcula cuando alguien lee su valor (o cuando un effect lo lee). Si nadie lee total(), aunque quantity() cambie, el computed no ejecuta la función hasta que llames total(). Así se evita trabajo innecesario.`,
    como: `CÓMO: No asumas que el computed "se ejecuta en cada cambio"; se ejecuta la próxima vez que algo lea su valor. Si el computed está en un @if que a veces es false, no se evaluará mientras no se muestre.`,
    porQue: `POR QUÉ: Evitar trabajo innecesario; si nadie usa el valor, no tiene sentido calcularlo.`,
    cuando: `CUÁNDO: Completeds costosos que solo se usan en ciertas vistas o bajo condición.`,
    conQue: `CON QUÉ: Template que lee el computed; effect que lo lee; si nadie lo lee, no se evalúa.`,
    paraQue: `PARA QUÉ: Mejor rendimiento cuando hay muchos computed o lógica pesada.`,
    realWorld: `Tienes un computed muy costoso (filtrar 10.000 ítems). Si ese computed solo se usa en una vista que está oculta (por pestañas), no se recalcula hasta que el usuario abra esa vista y el template lea el computed.`,
    code: `const heavy = computed(() => expensiveFilter(items()));
// heavy() no se ejecuta hasta que alguien llame heavy()
// Si nadie lo lee, expensiveFilter no corre`,
    commonErrors: ['Asumir que el computed se ejecuta en cada cambio de dependencia siempre', 'Leer el computed en un effect solo para "disparar" algo (mejor effect que lea los signals directamente si solo quieres side effect)'],
    checklist: ['Computed = valor derivado; se evalúa cuando se lee', 'Si solo quieres reaccionar, usa effect'],
    explainLikeIm5: `El amigo no calcula hasta que tú le preguntas. Si no preguntas, no calcula. Así no se cansa por nada.`,
    challenge: { description: 'Comprueba con console.log dentro de un computed que no se ejecuta hasta que lo lees en el template.', hint: 'Pon el computed en un @if que a veces sea false.' },
  },
  'comp-7': {
    definition: `Evita ramas que lean signals diferentes según condición. Ejemplo: computed(() => flag() ? a() : b()). Las dependencias son flag, a y b; está bien. Pero si haces computed(() => { if (flag()) return a(); return b(); }) y en una rama no lees b(), en la primera ejecución b no se registra y luego puede haber comportamientos raros. Lee siempre los mismos signals en cada "tipo" de ejecución.`,
    como: `CÓMO: En condicionales, lee todos los signals que puedan influir en el resultado en cada rama, o lee los mismos al inicio. Así el set de dependencias es estable.`,
    porQue: `POR QUÉ: Si en una ejecución no lees b() y en otra sí, Angular puede no re-ejecutar cuando b cambie hasta que flag cambie; comportamiento impredecible.`,
    cuando: `CUÁNDO: Completeds con if/else o switch que devuelvan valores de signals distintos.`,
    conQue: `CON QUÉ: flag() ? a() : b() lee los tres; o lee a() y b() al inicio y luego usa el que corresponda.`,
    paraQue: `PARA QUÉ: Dependencias correctas y recálculo cuando cualquiera de las fuentes cambie.`,
    realWorld: `Si tienes computed(() => mode() === 'full' ? fullList() : partialList()), ambas ramas leen mode; una lee fullList y otra partialList. Las dependencias son las tres. Si cambias a "solo leer fullList cuando mode === full", las dependencias son estables.`,
    code: `// Dependencias claras: flag, a, b
const value = computed(() => flag() ? a() : b());
// Evitar: en una rama no leer b(), en otra sí
const bad = computed(() => { if (flag()) return a(); return b(); }); // OK, pero no hagas return a() sin leer b() en alguna rama`,
    commonErrors: ['Leer solo a() en un if y solo b() en el else y esperar que no se recalcule cuando b cambie', 'Cambiar el set de dependencias entre ejecuciones'],
    checklist: ['En todas las ramas, las lecturas de signals deben ser predecibles', 'Si dudas, lee todos los signals que puedan influir al inicio'],
    explainLikeIm5: `El amigo tiene que mirar siempre las mismas pizarras cuando tú preguntas por el mismo tipo de cosa. Si a veces mira una y a veces otra sin avisar, se confunde.`,
    challenge: { description: 'Escribe un computed que devuelva a() o b() según flag() y verifica en DevTools que las dependencias son flag, a, b.', hint: 'Lee los tres en el computed de forma estable.' },
  },
  'comp-8': {
    definition: `Patrón típico: list = signal([]), query = signal(''), sortBy = signal('name'). filtered = computed(() => list().filter(i => i.name.includes(query()))). sorted = computed(() => [...filtered()].sort((a,b) => ...)). En el template usas sorted() y la lista se filtra y ordena de forma reactiva.`,
    como: `CÓMO: items() y query() en el primer computed (filter); filtered() en el segundo (sort sobre copia con [...filtered()].sort(...)). Template: @for (item of sorted(); track item.id).`,
    porQue: `POR QUÉ: Separar filter y sort en dos computed hace el código claro y evita mutar (sort muta; por eso [...].sort).`,
    cuando: `CUÁNDO: Listas con búsqueda y orden; tablas de datos con filtros y columnas ordenables.`,
    conQue: `CON QUÉ: signal de lista, signal de query, signal de sortBy; filter y spread+sort en computed.`,
    paraQue: `PARA QUÉ: Lista filtrada y ordenada reactiva sin lógica en el template.`,
    realWorld: `Lista de productos: products = signal([]), search = signal(''), category = signal('all'). filtered = computed(() => products().filter(p => p.name.includes(search()) && (category() === 'all' || p.category === category())). La tabla muestra filtered().`,
    code: `const filtered = computed(() =>
  items().filter(i => i.name.toLowerCase().includes(query().toLowerCase()))
);
const sorted = computed(() =>
  [...filtered()].sort((a,b) => (a[sortBy()] as string).localeCompare(b[sortBy()] as string))
);`,
    commonErrors: ['Mutar el array dentro del computed (filter devuelve nuevo array; sort muta, usa [...].sort)', 'Leer sortBy() en un orden que cambie según query()'],
    checklist: ['Filtrar devuelve nuevo array', 'Ordenar sobre una copia: [...filtered()].sort()'],
    explainLikeIm5: `Primero filtras los juguetes (computed filtered), luego los ordenas en una fila (computed sorted). Cada vez que cambia la caja de juguetes o la regla de filtro, se vuelve a filtrar y ordenar cuando miras.`,
    challenge: { description: 'Implementa filtered y sorted para una lista de ítems con query y sortBy como signals.', hint: 'filter + spread + sort en dos computed.' },
  },
  'comp-9': {
    definition: `Un computed puede devolver una Promise; para datos async, Angular ofrece resource() (y antes resourceLoader) que trabaja con funciones que devuelven Promise. computed(() => fetch(...)) no es ideal porque fetch es side effect; mejor usar resource() que lee un signal (ej. id) y devuelve la promesa. Así el "recurso" se recalcula cuando id cambia.`,
    como: `CÓMO: Para datos async no uses computed con fetch dentro. Usa resource(userId, () => userId() ? this.http.get(\`/user/\${userId()}\`) : of(null)) o toSignal(observable$) con initialValue.`,
    porQue: `POR QUÉ: computed debe ser puro; fetch y HTTP son side effects. resource() está diseñado para "recurso que depende de un signal".`,
    cuando: `CUÁNDO: Cargar datos que dependen de un id o filtro (usuario, detalle de ítem).`,
    conQue: `CON QUÉ: resource() (Angular 19+), toSignal(observable$.pipe(switchMap(...))), { initialValue: null }.`,
    paraQue: `PARA QUÉ: Datos async reactivos sin meter I/O dentro de computed.`,
    realWorld: `resource(getUser) donde getUser lee userId() y devuelve http.get(\`/user/\${userId()}\`). Cuando userId cambia, se pide el nuevo usuario. La API resource() está diseñada para esto.`,
    code: `// Con resource (Angular 19+)
const userId = signal<string | null>(null);
const user = resource(userId, () =>
  userId() ? this.http.get<User>(\`/api/user/\${userId()}\`) : of(null)
);`,
    commonErrors: ['Hacer fetch o HTTP dentro de computed (side effect)', 'Usar computed para algo que es claramente async sin resource'],
    checklist: ['Datos async: resource() o toSignal(observable$)', 'computed solo para valores síncronos derivados'],
    explainLikeIm5: `El amigo que calcula no puede ir a la tienda (HTTP). Para cosas que vienen de la tienda hay otro ayudante (resource o toSignal).`,
    challenge: { description: 'Busca en la documentación la API resource() y cómo se usa con un signal de id.', hint: 'angular.dev → resource' },
  },
  'comp-10': {
    definition: `No uses computed para: (1) Side effects (HTTP, localStorage, DOM). (2) I/O o llamadas que no son puras. (3) Lógica que depende de estado externo no signal. (4) Cuando quieres "ejecutar algo cuando cambie" (eso es effect). El computed debe ser una función pura de los signals que lee.`,
    como: `CÓMO: Si dentro del computed haces setItem, fetch, console.log o manipulas DOM, sácalo a un effect(). El computed solo debe leer signals y devolver un valor.`,
    porQue: `POR QUÉ: Los computed pueden ejecutarse más de una vez o en momentos inesperados; los side effects deben estar en effect.`,
    cuando: `CUÁNDO: Al revisar código: "¿este computed hace algo más que return?" → si sí, mover a effect.`,
    conQue: `CON QUÉ: effect() para persistir, log, navegar; resource() o toSignal para async.`,
    paraQue: `PARA QUÉ: Comportamiento predecible y sin efectos secundarios no deseados.`,
    realWorld: `Si quieres guardar en localStorage cuando cambia un valor, usa effect(). Si quieres filtrar una lista, usa computed(). Si quieres hacer una petición cuando cambia un id, usa resource() o toSignal(switchMap(...)).`,
    code: `// Mal: side effect en computed
const bad = computed(() => { localStorage.setItem('x', count()); return count(); });
// Bien: effect para persistir
effect(() => { localStorage.setItem('x', count()); });`,
    commonErrors: ['Poner console.log o fetch dentro de computed', 'Usar computed para "disparar" una acción'],
    checklist: ['Computed = puro, sin side effects', 'Si hace I/O o escribe en algún lado → effect'],
    explainLikeIm5: `El amigo que calcula solo mira y responde. No puede guardar en el cajón ni llamar por teléfono. Para eso está el ayudante (effect).`,
    challenge: { description: 'Identifica en tu código si hay algún computed que haga side effect y muévelo a un effect.', hint: 'Cualquier cosa que no sea "leer signals y devolver un valor" es side effect.' },
  },
  'comp-11': {
    definition: `Para testear un computed: (1) Crea el componente o servicio que tiene el computed; (2) Actualiza los signals de los que depende; (3) Lee el computed y verifica el valor. expect(component.total()).toBe(20). No necesitas fixture.detectChanges() solo para leer el computed; sí si quieres comprobar el template.`,
    como: `CÓMO: component.quantity.set(2); component.unitPrice.set(10); expect(component.total()).toBe(20). El computed se evalúa al leerlo. Para el template, detectChanges() y comprobar el DOM.`,
    porQue: `POR QUÉ: El computed es síncrono; actualizas dependencias y al leer obtienes el valor recalculado.`,
    cuando: `CUÁNDO: Tests unitarios de componentes o servicios con computed.`,
    conQue: `CON QUÉ: TestBed, set/update en dependencias, expect(component.computed()).`,
    paraQue: `PARA QUÉ: Asegurar que el valor derivado es correcto ante distintos estados.`,
    realWorld: `En un test: component.quantity.set(2); component.unitPrice.set(10); expect(component.total()).toBe(20). El computed se recalcula al leerlo.`,
    code: `it('should compute total', () => {
  comp.quantity.set(2);
  comp.unitPrice.set(10);
  expect(comp.total()).toBe(20);
});`,
    commonErrors: ['No actualizar los signals antes de leer el computed', 'Esperar que el computed se ejecute sin leerlo'],
    checklist: ['Actualiza dependencias con set/update', 'Lee el computed y haz expect'],
    explainLikeIm5: `En el test cambias las pizarras (signals) y luego preguntas al amigo (computed); compruebas que te responde bien.`,
    challenge: { description: 'Escribe un test para un computed que combine firstName y lastName en fullName.', hint: 'set ambos signals y expect(comp.fullName()).toBe("Juan Pérez")' },
  },
  'comp-12': {
    definition: `Resumen computed: (1) computed() para valores derivados; (2) Dependencias automáticas al leer signals dentro; (3) Lazy: solo se recalcula cuando se lee; (4) Sin side effects; (5) Pueden anidarse; (6) Evitar ramas que cambien el set de dependencias. Siguiente: effect() para side effects.`,
    como: `CÓMO: Repasa: derivado → computed; leer solo signals; no I/O; dependencias estables. Siguiente bloque: effect() para persistir, log, navegar.`,
    porQue: `POR QUÉ: Tener claro "calcular valor" (computed) vs "hacer algo cuando cambie" (effect) evita errores de diseño.`,
    cuando: `CUÁNDO: Antes de pasar a Effects; como checklist al escribir código.`,
    conQue: `CON QUÉ: computed(), effect(); siguiente sección effect().`,
    paraQue: `PARA QUÉ: Consolidar computed y preparar el uso correcto de effect.`,
    realWorld: `Antes de pasar a effects: asegúrate de usar computed para todo lo que sea "valor derivado" y effect solo para "hacer algo cuando cambie" (persistir, log, navegar).`,
    code: `// Checklist: derivado → computed; reaccionar → effect
const total = computed(() => price() * qty());
effect(() => { save(total()); });`,
    commonErrors: ['Usar effect donde basta un computed', 'Usar computed para side effects'],
    checklist: ['Derivado = computed', 'Acción al cambiar = effect'],
    explainLikeIm5: `El amigo que calcula (computed) ya lo dominas. Ahora viene el ayudante que hace cosas cuando cambia la pizarra (effect).`,
    challenge: { description: 'Lista tres ejemplos en tu app: uno que debe ser computed y uno que debe ser effect.', hint: 'computed: total, filteredList. effect: guardar en localStorage, analytics.' },
  },
  'comp-13': {
    definition: 'Practica en el Lab: lista filtrada con computed(). Un signal de items y un signal de búsqueda; un computed que filtra en tiempo real.',
    como: `CÓMO: Haz clic en "Probar en Lab" para abrir el Lab de lista filtrada. Verás cómo un computed combina items() y filtro() para mostrar solo los que coinciden.`,
    porQue: `POR QUÉ: Ver computed() en acción con dependencias automáticas y evaluación perezosa.`,
    cuando: `CUÁNDO: Después de "Introducción a computed()" y "Dependencias automáticas".`,
    conQue: `CON QUÉ: signal([]), signal(''), computed(() => items().filter(...)).`,
    paraQue: `PARA QUÉ: Practicar el patrón filtro reactivo con computed.`,
    realWorld: 'Abre el Lab "Lista filtrada con computed" desde el botón o la pestaña Labs.',
    code: 'itemsFiltrados = computed(() =>\n  this.items().filter(i => i.toLowerCase().includes(this.filtro().toLowerCase())));',
    commonErrors: ['Hacer side effects dentro del computed', 'Leer cosas que no son signals'],
    checklist: ['Abrir el Lab Lista filtrada', 'Escribir en el input y ver el filtro en tiempo real', 'Entender las dependencias del computed'],
    explainLikeIm5: 'En el Lab escribes y la lista se filtra sola porque el computed mira lo que escribes.',
    challenge: { description: 'Completa el lab de lista filtrada en Labs.', hint: 'Probar en Lab o pestaña Labs.' },
  },
  'comp-14': {
    definition: 'Practica en el Lab: formulario con validación usando computed(). signals para email y password; computed para isEmailValid, strength y canSubmit.',
    como: `CÓMO: Haz clic en "Probar en Lab" para abrir el Lab de formulario. El botón Enviar solo se habilita cuando el email es válido y la contraseña tiene al menos 6 caracteres.`,
    porQue: `POR QUÉ: La validación derivada con computed evita lógica duplicada y se actualiza automáticamente.`,
    cuando: `CUÁNDO: Después de "Computed con múltiples signals" y "Computed para listas filtradas".`,
    conQue: `CON QUÉ: signal(''), computed(() => /regex/.test(email())), computed(() => canSubmit).`,
    paraQue: `PARA QUÉ: Practicar validación reactiva con computed.`,
    realWorld: 'Abre el Lab "Formulario con validación" desde el botón o la pestaña Labs.',
    code: 'isEmailValid = computed(() => /^[^@]+@[^@]+\\.[^@]+$/.test(this.email()));\ncanSubmit = computed(() => this.isEmailValid() && this.password().length >= 6);',
    commonErrors: ['Hacer setItem o DOM dentro del computed', 'Validar en el template en lugar de computed'],
    checklist: ['Abrir el Lab Formulario con validación', 'Probar email válido/inválido y longitud de contraseña', 'Ver canSubmit habilitar/deshabilitar el botón'],
    explainLikeIm5: 'En el Lab el formulario te dice si el email está bien y si la contraseña es fuerte.',
    challenge: { description: 'Completar el lab de validación en Labs.', hint: 'Probar en Lab o pestaña Labs.' },
  },
};
