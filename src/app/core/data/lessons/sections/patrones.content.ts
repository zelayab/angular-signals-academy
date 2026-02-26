import type { LessonContent } from '../../../models/lesson.model';
import { SOURCES } from '../../sources.data';

export const PATRONES_CONTENT: Record<string, LessonContent> = {
  'pat-1': {
    definition: `State management con signals: (1) Un servicio "store" que posee los signals (writable) y expone readonly + computed. (2) Los componentes solo leen y llaman métodos del servicio para actualizar. (3) Sin NgRx: menos boilerplate, mismo concepto de "single source of truth".`,
    como: `CÓMO: Servicio con private items = signal([]); readonly cartItems = this.items.asReadonly(); readonly total = computed(() => ...); addItem(item) { this.items.update(...); }. Componentes inyectan, leen cartItems() y llaman addItem().`,
    porQue: `POR QUÉ: Un solo dueño del estado evita inconsistencias; métodos públicos documentan las acciones permitidas.`,
    cuando: `CUÁNDO: Estado compartido (carrito, usuario, preferencias) que varios componentes leen o modifican.`,
    conQue: `CON QUÉ: providedIn: 'root', asReadonly(), computed(), métodos que llaman update/set.`,
    paraQue: `PARA QUÉ: Single source of truth sin NgRx.`,
    realWorld: `CartService con items = signal([]), total = computed(() => ...), addItem(item). Los componentes inyectan el servicio, leen items() y total(), y llaman addItem(). Un solo lugar posee el estado del carrito.`,
    code: `@Injectable({ providedIn: 'root' })
export class CartStore {
  private items = signal<Item[]>([]);
  readonly cartItems = this.items.asReadonly();
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price, 0));
  addItem(item: Item) { this.items.update(list => [...list, item]); }
}`,
    commonErrors: ['Exponer el WritableSignal y que cualquiera haga set()', 'Múltiples "stores" que duplican estado'],
    checklist: ['Un solo lugar posee el estado', 'Exponer solo readonly y métodos'],
    explainLikeIm5: `El store es el dueño del carrito. Solo él puede meter o sacar cosas. Los demás solo miran y dicen "añade esto" (llamando a addItem).`,
    challenge: { description: 'Crea un servicio "store" con un signal de ítems y un computed de total; expón solo readonly.', hint: 'private items = signal([]); readonly items = this.items.asReadonly();' },
    sources: [SOURCES.guideSignals, SOURCES.apiSignal],
  },
  'pat-2': {
    definition: `Un servicio de estado centralizado expone signals de solo lectura (asReadonly()) y métodos que actualizan el estado. Los componentes inyectan el servicio y leen los signals; no tienen acceso a set() o update(). Así evitas que cualquier componente modifique el estado por error.`,
    como: `CÓMO: private user = signal<User | null>(null); readonly userState = this.user.asReadonly(); login(creds), logout() que llaman this.user.set(...). Componentes leen userState() y llaman login()/logout(); nadie hace userState.set().`,
    porQue: `POR QUÉ: Encapsulación: solo el servicio modifica; la API queda clara (métodos, no set directo).`,
    cuando: `CUÁNDO: Cualquier estado compartido; siempre exponer readonly y métodos.`,
    conQue: `CON QUÉ: asReadonly(), métodos públicos; no exponer WritableSignal.`,
    paraQue: `PARA QUÉ: Evitar mutaciones no deseadas y API clara.`,
    realWorld: `AuthService con user = signal<User | null>(null), readonly userState = user.asReadonly(), login(credentials), logout(). Los componentes leen userState() y llaman login()/logout(); nadie hace userState.set(...).`,
    code: `private readonly user = signal<User | null>(null);
readonly userState = this.user.asReadonly();
login(creds: Credentials) { ... this.user.set(await api.login(creds)); }`,
    commonErrors: ['Exponer el signal writable', 'Tener lógica de actualización repartida en varios servicios'],
    checklist: ['Un único servicio para ese estado', 'Solo métodos públicos para modificar'],
    explainLikeIm5: `El servicio es el guardián. Tú le dices "quiero hacer login" y él actualiza la caja. Nadie más puede abrir la caja.`,
    challenge: { description: 'Refactoriza un servicio que expone un signal writable para exponer solo readonly y un método setValue().', hint: 'asReadonly() + método que hace this.privateSignal.set(v)' },
    sources: [SOURCES.apiSignal],
  },
  'pat-3': {
    definition: `Feature stores: en vez de un solo servicio global, un servicio por "feature" (carrito, usuario, preferencias). Cada feature store tiene sus signals y métodos; se inyecta solo donde hace falta. Así el estado está cerca de quien lo usa y no todo en root.`,
    como: `CÓMO: CartStore, UserStore, SettingsStore; cada uno con private state, readonly + computed, métodos. Inyectar solo CartStore en componentes del carrito; no un "AppStore" gigante.`,
    porQue: `POR QUÉ: Un store gigante es difícil de mantener; feature stores acotan responsabilidad y dependencias.`,
    cuando: `CUÁNDO: Apps medianas o grandes; por dominio (carrito, usuario, configuración).`,
    conQue: `CON QUÉ: Un servicio por feature; providedIn: 'root' o en route; inyectar solo donde se usa.`,
    paraQue: `PARA QUÉ: Escalabilidad y mantenibilidad.`,
    realWorld: `CartStore (providedIn: 'root' o en route), UserStore (root), SettingsStore (root). Cada uno con private state, readonly + computed y métodos. Los componentes inyectan solo CartStore o solo UserStore.`,
    code: `@Injectable({ providedIn: 'root' })
export class CartStore {
  private items = signal<Item[]>([]);
  readonly cartItems = this.items.asReadonly();
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price, 0));
  addItem(item: Item) { this.items.update(l => [...l, item]); }
}`,
    commonErrors: ['Un solo store gigante con todo', 'Stores que dependen uno del otro de forma circular'],
    checklist: ['Un store por feature lógico', 'Inyectar solo donde se usa'],
    explainLikeIm5: `En vez de una caja enorme con todo, tienes una caja para el carrito, otra para el usuario. Cada una en su habitación.`,
    challenge: { description: 'Divide un servicio grande en dos feature stores (ej. CartStore y WishlistStore).', hint: 'Cada store con sus signals y métodos.' },
    sources: [SOURCES.guideSignals],
  },
  'pat-4': {
    definition: `Usa computed para vistas derivadas: listas filtradas, ordenadas, paginadas. items = signal([]); query = signal(''); filtered = computed(() => items().filter(...)); sorted = computed(() => [...filtered()].sort(...)); paginated = computed(() => sorted().slice(offset(), offset() + pageSize()). Así la UI solo lee paginated() y todo es reactivo.`,
    como: `CÓMO: filtered, sorted, paginated como computed encadenados; template usa paginated(). Controles actualizan query, sortBy, page. No filter/sort en template ni en métodos que devuelven valor.`,
    porQue: `POR QUÉ: Una sola cadena reactiva; el template solo lee el último computed; cambios en query/sort/page se propagan solos.`,
    cuando: `CUÁNDO: Tablas, listas con búsqueda, orden y paginación.`,
    conQue: `CON QUÉ: signal de lista, query, sortBy, page; computed filter, sort (sobre copia), slice.`,
    paraQue: `PARA QUÉ: Listas derivadas reactivas sin lógica en template.`,
    realWorld: `Tabla de productos: products = signal([]), search = signal(''), sortBy = signal('name'), page = signal(0). filtered, sorted, paginated como computed. El template usa paginated() y los controles actualizan search, sortBy, page.`,
    code: `filtered = computed(() => items().filter(i => i.name.includes(query())));
sorted = computed(() => [...filtered()].sort(...));
paginated = computed(() => sorted().slice(page() * size(), (page() + 1) * size()));`,
    commonErrors: ['Hacer filter/sort en el template o en métodos que devuelven valores', 'Mutar arrays dentro del computed'],
    checklist: ['Cada paso (filter, sort, slice) en computed', 'Template lee el último computed'],
    explainLikeIm5: `Primero filtras, luego ordenas, luego coges una página. Cada paso es un amigo (computed) que calcula cuando preguntas.`,
    challenge: { description: 'Implementa filtered, sorted y paginated con signals query, sortBy, page, pageSize.', hint: 'Tres computed encadenados.' },
    sources: [SOURCES.apiComputed],
  },
  'pat-5': {
    definition: `Reaccionar a params o data del router: usa toSignal(route.paramMap) o toSignal(route.data). params = toSignal(route.paramMap, { initialValue: ... }). id = computed(() => params().get('id')). Navegar con router.navigate cuando un signal cambie puede hacerse con effect (allowSignalWrites) o desde un método que lee el signal.`,
    como: `CÓMO: params = toSignal(route.paramMap, { initialValue: new Map() }); id = computed(() => params().get('id')); item = resource(id, (id) => id ? api.getItem(id) : of(null)). Usa initialValue para paramMap.`,
    porQue: `POR QUÉ: La ruta es async; toSignal la convierte en signal y computed deriva el id para resource o peticiones.`,
    cuando: `CUÁNDO: Detalle de ítem por id en la URL; datos que dependen de la ruta.`,
    conQue: `CON QUÉ: toSignal(route.paramMap), computed para id, resource o toSignal(switchMap).`,
    paraQue: `PARA QUÉ: Datos reactivos a la ruta.`,
    realWorld: `Detalle de ítem: route.paramMap tiene id. id = toSignal(route.paramMap).pipe(map(p => p.get('id'))). O en el componente: params = toSignal(route.paramMap); id = computed(() => params()?.get('id')). Cuando id() cambie, cargas el ítem (con resource o toSignal(switchMap)).`,
    code: `params = toSignal(this.route.paramMap, { initialValue: new Map() });
id = computed(() => this.params().get('id'));
item = resource(this.id, (id) => id ? this.api.getItem(id) : of(null));`,
    commonErrors: ['Leer route.params en el constructor (aún no está)', 'No usar initialValue en toSignal(route.paramMap)'],
    checklist: ['toSignal(route.paramMap) o route.data', 'computed para derivar id o datos'],
    explainLikeIm5: `La ruta (URL) te dice en qué habitación estás. Con toSignal miras esa información como una caja que cambia cuando navegas.`,
    challenge: { description: 'Lee el param "id" de la ruta como signal y usa ese id para cargar un recurso.', hint: 'toSignal(route.paramMap), computed para id.' },
    sources: [SOURCES.rxjsInterop],
  },
  'pat-6': {
    definition: `Patrón reducer: en vez de varias actualizaciones ad hoc, una función pura (reducer) que recibe estado y acción y devuelve nuevo estado. items.update(state => reducer(state, action)). Así la lógica de actualización está centralizada y es fácil de testear.`,
    como: `CÓMO: function cartReducer(state, action) { switch (action.type) { case 'add': return [...state, action.payload]; case 'remove': return state.filter(...); default: return state; } } addItem(item) { this.items.update(s => cartReducer(s, { type: 'add', payload: item })); }`,
    porQue: `POR QUÉ: Reducer puro es fácil de testear; todas las transiciones de estado en un solo lugar.`,
    cuando: `CUÁNDO: Estado con varias acciones (add, remove, toggle); cuando la lógica de actualización crece.`,
    conQue: `CON QUÉ: reducer(state, action) puro; update(s => reducer(s, action)); no mutar state.`,
    paraQue: `PARA QUÉ: Lógica de actualización centralizada y testeable.`,
    realWorld: `Carrito: reducer(state: Item[], action: AddItem | RemoveItem): Item[]. addItem(item) llama items.update(s => reducer(s, { type: 'add', item })). removeItem(id) llama items.update(s => reducer(s, { type: 'remove', id })).`,
    code: `function cartReducer(state: Item[], action: { type: 'add'|'remove'; payload?: Item|string }): Item[] {
  switch (action.type) {
    case 'add': return [...state, action.payload as Item];
    case 'remove': return state.filter(i => i.id !== action.payload);
    default: return state;
  }
}
addItem(item: Item) { this.items.update(s => cartReducer(s, { type: 'add', payload: item })); }`,
    commonErrors: ['Mutación dentro del reducer', 'Acciones con lógica async dentro del reducer'],
    checklist: ['Reducer puro', 'update(state => reducer(state, action))'],
    explainLikeIm5: `En vez de "mete esto" y "saca aquello", tienes un libro de reglas (reducer): "si me dicen add, devuelvo la caja con uno más". Así todas las reglas están en un sitio.`,
    challenge: { description: 'Implementa un reducer para una lista de tareas (add, toggle, remove) y úsalo con update().', hint: 'tasks.update(s => taskReducer(s, { type, payload }))' },
    sources: [SOURCES.apiSignal],
  },
  'pat-7': {
    definition: `Separar capa de presentación y estado: los componentes "tontos" reciben inputs y emiten outputs; el estado (signals) vive en un servicio o en un componente contenedor. El contenedor inyecta el store, lee signals y pasa valores a los hijos; los hijos emiten eventos y el contenedor llama al store.`,
    como: `CÓMO: CartPage (contenedor) inyecta CartStore; lee cartItems(), total(); pasa [items]="cartItems()" a CartList. CartList solo input items, output remove. (remove)="cartStore.removeItem($event)".`,
    porQue: `POR QUÉ: Presentacionales son reutilizables y fáciles de testear; el contenedor conecta con el store.`,
    cuando: `CUÁNDO: Listas, formularios, páginas; estado en store/contenedor, hijos solo input/output.`,
    conQue: `CON QUÉ: Contenedor con store; hijo con input(), output(); (evento)="store.método($event)".`,
    paraQue: `PARA QUÉ: Componentes reutilizables y estado claro.`,
    realWorld: `CartPage (contenedor) inyecta CartStore; lee cartItems() y total(); pasa [items]="cartItems()" al CartList. CartList es presentacional: [items] input, (remove) output. CartPage en (remove) llama cartStore.removeItem($event).`,
    code: `// Contenedor
readonly items = this.cartStore.cartItems;
readonly total = this.cartStore.total;
remove(id: string) { this.cartStore.removeItem(id); }
// Template: <app-cart-list [items]="items()" (remove)="remove($event)" />
// Presentacional: solo input/output`,
    commonErrors: ['Estado en el componente presentacional', 'Contenedor que no delega en el store'],
    checklist: ['Estado en store o contenedor', 'Presentacional solo input/output'],
    explainLikeIm5: `El contenedor tiene las cajas (store); el hijo solo muestra lo que le pasan y avisa cuando tocan algo. Las cajas no están en el hijo.`,
    challenge: { description: 'Refactoriza un componente que tenga signals internos a: contenedor con store + hijo presentacional.', hint: 'Mover signals al store; hijo con input/output.' },
    sources: [SOURCES.guideSignals],
  },
  'pat-8': {
    definition: `Source of truth: un solo lugar posee cada dato. Si el carrito vive en CartStore, todos leen cartItems() de ahí; nadie tiene una copia local del carrito que pueda desincronizarse. Si necesitas "copia para editar", puede ser un signal derivado o un snapshot al abrir un modal.`,
    como: `CÓMO: UserStore tiene user(); Navbar y Profile leen user(). No "mi copia del usuario" en cada componente. Para editar: formValues = signal({ ...user() }) local al modal; al guardar, UserStore.updateUser(formValues()).`,
    porQue: `POR QUÉ: Varias copias del mismo dato se desincronizan; una fuente evita bugs.`,
    cuando: `CUÁNDO: Siempre; identificar "dueño" de cada dato y leer solo de ahí.`,
    conQue: `CON QUÉ: Un store o servicio por dato; no duplicar estado entre componentes.`,
    paraQue: `PARA QUÉ: Consistencia y menos bugs.`,
    realWorld: `Usuario: UserStore tiene user = signal(null). Navbar y Profile leen user(). No hay "mi copia del usuario" en cada componente. Si abres "editar perfil", puedes tener formValues = signal({ ...user() }) local al modal; al guardar, UserStore.updateUser(formValues()).`,
    code: `// Un solo lugar
@Injectable({ providedIn: 'root' })
export class UserStore {
  private user = signal<User | null>(null);
  readonly userState = this.user.asReadonly();
}
// Todos leen del mismo sitio
user = this.userStore.userState;`,
    commonErrors: ['Duplicar estado en varios componentes', 'Sincronizar manualmente entre copias'],
    checklist: ['Un dueño por dato', 'Leer siempre del mismo sitio'],
    explainLikeIm5: `Solo hay una pizarra del carrito. Todos miran esa pizarra. No tengas fotos de la pizarra en cada habitación que luego no coincidan.`,
    challenge: { description: 'Identifica en tu app un dato que esté en dos sitios y refactoriza a una sola fuente.', hint: 'Un store o un servicio con signal.' },
    sources: [SOURCES.guideSignals],
  },
  'pat-9': {
    definition: `Si construyes una librería reutilizable, expón API con signals: inputs como input(), estado interno como signals, valores derivados como computed. Así los consumidores usan tu componente o servicio con la misma mentalidad que el resto de Angular. Documenta qué signals son readonly y cuáles son writable (si aplica).`,
    como: `CÓMO: data = input.required<Item[]>(); selection = model<Item[]>([]); filtered = computed(() => this.data().filter(...)). No exponer WritableSignals internos; solo input, model, computed útiles.`,
    porQue: `POR QUÉ: API consistente con Angular; el consumidor no necesita saber si internamente usas signals u otra cosa.`,
    cuando: `CUÁNDO: Componentes o servicios que expongas como librería o en varios proyectos.`,
    conQue: `CON QUÉ: input(), output(), model(); computed para derivados; documentar API.`,
    paraQue: `PARA QUÉ: Librerías fáciles de usar y consistentes.`,
    realWorld: `Un DataGridComponent: data = input.required(), sortBy = model('id'), filteredData = computed(() => ...). El consumidor pasa [data]="items()" y [(sortBy)]="sortField". La librería no expone WritableSignals internos; solo inputs, model y computed útiles.`,
    code: `// En tu librería
export class MyLibComponent {
  data = input.required<Item[]>();
  selection = model<Item[]>([]);
  filtered = computed(() => this.data().filter(...));
}`,
    commonErrors: ['Exponer signals internos writable', 'API con Observables cuando signals serían más simples para el consumidor'],
    checklist: ['input/output/model para API', 'computed para derivados expuestos'],
    explainLikeIm5: `Cuando vendes un juguete (librería), la caja que das tiene ventanitas (inputs) y timbre (outputs). No des la llave de la caja (writable) a cualquiera.`,
    challenge: { description: 'Diseña la API pública de un componente de lista (inputs, outputs, computed expuestos).', hint: 'data input, selection model, filtered computed.' },
    sources: [SOURCES.apiInput, SOURCES.apiOutput],
  },
  'pat-10': {
    definition: `Resumen patrones: (1) State en servicio con asReadonly(); (2) Feature stores por dominio; (3) Computed para vistas derivadas (filter, sort, paginate); (4) Router con toSignal(paramMap); (5) Reducer con update(); (6) Presentación vs contenedor; (7) Una sola fuente de verdad; (8) Librerías con API en signals. Elige según tamaño de app y equipo.`,
    como: `CÓMO: Repasa: store con readonly; feature stores; computed para filtered/sorted/paginated; toSignal(route); reducer con update(); contenedor vs presentacional; una fuente por dato; API en signals para librerías.`,
    porQue: `POR QUÉ: No aplicar todos los patrones en una app tiny; no tener ninguna estructura en una app grande.`,
    cuando: `CUÁNDO: Al diseñar o refactorizar; elegir patrones según tamaño y equipo.`,
    conQue: `CON QUÉ: asReadonly(), computed(), toSignal(route), reducer, input/output.`,
    paraQue: `PARA QUÉ: Código mantenible y escalable.`,
    realWorld: `Apps pequeñas: un servicio o dos. Apps grandes: feature stores, reducer donde la lógica sea compleja, capa presentacional clara. Siempre una fuente de verdad y computed para derivados.`,
    code: `// Resumen mental
// Store: private state, readonly + computed, métodos
// Vistas: computed(filtered, sorted, paginated)
// Router: toSignal(route.paramMap)
// Reducer: update(s => reducer(s, action))`,
    commonErrors: ['Aplicar todos los patrones en una app tiny', 'No tener ninguna estructura en una app grande'],
    checklist: ['Una fuente de verdad', 'Computed para derivados', 'Exponer readonly'],
    explainLikeIm5: `Resumen: una caja por cosa importante, un amigo (computed) que calcula listas, y que solo el dueño (store) pueda escribir. Elige cuántas cajas según lo grande que sea la casa.`,
    challenge: { description: 'Escribe en tres líneas qué patrones usas ya en tu app y cuál añadirías primero.', hint: 'Ej: store con readonly; falta reducer para el carrito.' },
    sources: [SOURCES.guideSignals],
  },
  'pat-11': {
    definition: 'Practica en el Lab: estado derivado complejo (carrito). signal de items; computed para subtotal, IVA y total. Refuerza el patrón "una fuente de verdad + vistas derivadas".',
    como: `CÓMO: Haz clic en "Probar en Lab" para abrir el Lab del carrito. El carrito es un signal; subtotal, IVA y total son computed que se recalculan automáticamente.`,
    porQue: `POR QUÉ: El carrito es el ejemplo clásico de estado base + múltiples computed; practicarlo en el Lab consolida el patrón.`,
    cuando: `CUÁNDO: Después de "Computed para vistas derivadas" y "Patrón source of truth".`,
    conQue: `CON QUÉ: signal([]), computed(() => reduce), computed anidados (subtotal, iva, total).`,
    paraQue: `PARA QUÉ: Llevar a la práctica el patrón carrito con computed en el Lab.`,
    realWorld: 'Abre el Lab "Estado derivado complejo" desde el botón o la pestaña Labs.',
    code: 'carrito = signal<Producto[]>([]);\nsubtotal = computed(() => this.carrito().reduce((s, p) => s + p.precio * p.cantidad, 0));\ntotal = computed(() => this.subtotal() + this.iva());',
    commonErrors: ['Calcular totales en el template o en métodos', 'Mutar el array del carrito en lugar de update'],
    checklist: ['Abrir el Lab Estado derivado complejo', 'Ver subtotal, IVA y total como computed', 'Entender dependencias automáticas'],
    explainLikeIm5: 'En el Lab el total del carrito se calcula solo cuando cambian los items.',
    challenge: { description: 'Completar el lab del carrito en Labs.', hint: 'Probar en Lab o pestaña Labs.' },
    sources: [SOURCES.guideSignals],
  },
};
