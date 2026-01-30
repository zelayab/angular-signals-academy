import type { LessonContent } from '../../../models/lesson.model';

export const INPUT_OUTPUT_CONTENT: Record<string, LessonContent> = {
  'io-1': {
    definition: `input() es la nueva forma de declarar inputs en Angular: devuelve un Signal. En el template lees el valor con inputName(). Puedes usar input.required() para marcar un input como obligatorio.`,
    como: `CÓMO: title = input<string>(); en el componente; en el template {{ title() }}. El padre pasa [title]="item.title". Para obligatorio: title = input.required<string>().`,
    porQue: `POR QUÉ: input() integra con signals: el valor es reactivo y la UI se actualiza cuando el padre cambia el binding.`,
    cuando: `CUÁNDO: Cualquier prop que el padre pase al hijo; reemplaza @Input() en componentes nuevos.`,
    conQue: `CON QUÉ: Template del hijo con nombre(); padre con [nombre]="valor".`,
    paraQue: `PARA QUÉ: Props reactivos y tipados sin decoradores.`,
    realWorld: `En un componente de tarjeta: title = input<string>(); en el template: <h2>{{ title() }}</h2>. El padre pasa [title]="item.title". El componente recibe el valor como signal y la UI se actualiza cuando el padre cambia el binding.`,
    code: `@Component({ ... })
export class CardComponent {
  title = input<string>();           // opcional
  count = input.required<number>();  // obligatorio
}
// Template: {{ title() }} {{ count() }}`,
    commonErrors: ['Leer el input sin () en el template', 'Usar input() cuando el valor puede ser undefined y no usar optional chaining'],
    checklist: ['¿El input es obligatorio? → input.required()', 'En template siempre inputName()'],
    explainLikeIm5: `input() es como una ventanita por la que tu papá te pasa un juguete. Tú solo puedes mirar (leer con ()); no puedes devolverlo por la ventana. El juguete puede cambiar y tú lo ves al instante.`,
    challenge: { description: 'Crea un componente con un input title y muéstralo en el template.', hint: 'title = input<string>(); en el template: {{ title() }}' },
  },
  'io-2': {
    definition: `output() declara un evento que el componente puede emitir. Se usa con emit(): outputName.emit(value). El padre escucha con (outputName)="handler($event)". Es la evolución de EventEmitter con una API más simple.`,
    como: `CÓMO: delete = output<number>(); en el template del hijo: (click)="delete.emit(item.id)". Padre: (delete)="removeItem($event)".`,
    porQue: `POR QUÉ: output() reemplaza EventEmitter con una API más ligera; el padre escucha igual.`,
    cuando: `CUÁNDO: Cualquier evento que el hijo deba emitir al padre (click, cambio, cierre).`,
    conQue: `CON QUÉ: emit(valor); padre (outputName)="handler($event)".`,
    paraQue: `PARA QUÉ: Comunicación hijo → padre tipada y simple.`,
    realWorld: `Un botón "Eliminar" que emite output('delete').emit(item.id). El padre tiene (delete)="onDelete($event)" y elimina el ítem. Mismo patrón que EventEmitter pero con output().`,
    code: `@Component({ ... })
export class ItemComponent {
  delete = output<number>();
}
// En template del componente:
// <button (click)="delete.emit(item.id)">Eliminar</button>
// Padre: <app-item [item]="item" (delete)="removeItem($event)" />`,
    commonErrors: ['Llamar emit() en el constructor o en un effect sin cuidado', 'Confundir output() con input()'],
    checklist: ['El nombre del output describe el evento', 'Emitir valores tipados (number, string, objeto)'],
    explainLikeIm5: `output() es como un timbre que tú pulsas para avisar a tu papá. Tú emites (emit) y él escucha (delete)="hacerAlgo". No pasas el juguete por la ventana; avisas que algo pasó.`,
    challenge: { description: 'Crea un componente con un output clicked que emita un número al hacer clic en un botón.', hint: 'clicked = output<number>(); (click)="clicked.emit(1)"' },
  },
  'io-3': {
    definition: `input.required() declara un input obligatorio. Si el padre no lo pasa, Angular lanza en desarrollo. Úsalo cuando el componente no tenga sentido sin ese valor.`,
    como: `CÓMO: title = input.required<string>(); El padre debe pasar [title]="...". Sin él, en desarrollo Angular avisa. En template siempre title() (no será undefined si el padre cumple).`,
    porQue: `POR QUÉ: Documentar y exigir que un input sea obligatorio; evita undefined en runtime si el padre cumple.`,
    cuando: `CUÁNDO: Inputs sin los cuales el componente no funciona (título de tarjeta, id de detalle).`,
    conQue: `CON QUÉ: input.required<T>(); padre [prop]="valor".`,
    paraQue: `PARA QUÉ: API clara y menos comprobaciones de undefined.`,
    realWorld: `Un CardComponent que siempre debe tener título: title = input.required<string>(). El padre debe pasar [title]="item.title"; si no, error.`,
    code: `title = input.required<string>();
// Padre: <app-card [title]="item.title" />`,
    commonErrors: ['Usar required() cuando el input puede ser opcional', 'No pasar el input desde el padre'],
    checklist: ['¿El componente necesita siempre este valor? → required()', 'El padre debe pasar el binding'],
    explainLikeIm5: `required() es como decir "sin este juguete no juego". El papá tiene que darte el juguete siempre.`,
    challenge: { description: 'Crea un componente con un input required y otro opcional.', hint: 'title = input.required<string>(); count = input<number>();' },
  },
  'io-4': {
    definition: `Puedes pasar una función transform al input: input({ transform: (v) => ... }). El valor que recibe el componente es el resultado de la transformación. Útil para convertir strings a números, parsear fechas, etc.`,
    como: `CÓMO: count = input(0, { transform: (v: string | number) => Number(v) }); El padre puede pasar count="42" (string) y el componente recibe 42 (number).`,
    porQue: `POR QUÉ: Los atributos HTML son strings; la transform centraliza la conversión en el componente.`,
    cuando: `CUÁNDO: Atributos que deben ser número, boolean o objeto (ej. "true"/"false" → boolean).`,
    conQue: `CON QUÉ: input(valorDefault, { transform: (v) => ... }); transform pura, sin side effects.`,
    paraQue: `PARA QUÉ: Tipado correcto y menos lógica en el padre.`,
    realWorld: `input que viene como string desde el atributo y quieres número: count = input(0, { transform: (v) => Number(v) }). O input que viene "true"/"false" y quieres boolean.`,
    code: `count = input(0, { transform: (v: string | number) => Number(v) });
// En template del padre: count="42" (string) → el componente recibe 42 (number)`,
    commonErrors: ['Transform que puede lanzar (ej. Number("abc"))', 'No tipar el valor de entrada en la transform'],
    checklist: ['La transform debe ser pura y sin side effects', 'Manejar valores inválidos si el atributo puede ser incorrecto'],
    explainLikeIm5: `La transform es como un traductor: el papá te pasa "cinco" y tú lo traduces a 5 antes de guardarlo en la caja.`,
    challenge: { description: 'Crea un input que transforme "true"/"false" (string) a boolean.', hint: 'input(false, { transform: (v) => v === "true" })' },
  },
  'io-5': {
    definition: `model() declara un two-way binding: el componente recibe un valor y puede emitir cambios. model(\'value\') en el hijo; en el padre [(value)]="miSignal". Internamente es un input + output que emite cuando el valor cambia. El hijo lee con value() y actualiza con valueChange.emit(nuevoValor) o usando el binding de modelo.`,
    como: `CÓMO: value = model(''); en el hijo. Template hijo: (input)="valueChange.emit($any($event.target).value)". Padre: [(value)]="searchQuery".`,
    porQue: `POR QUÉ: Two-way binding sin ngModel en el hijo; el padre usa un signal y el hijo lo lee y emite cambios.`,
    cuando: `CUÁNDO: Controles que el padre quiere enlazar en ambos sentidos (búsqueda, filtro, contador).`,
    conQue: `CON QUÉ: model(nombre); nombreChange.emit(valor); padre [(nombre)]="signal".`,
    paraQue: `PARA QUÉ: Sincronización bidireccional con signals.`,
    realWorld: `Un input de texto que el padre quiere enlazar: value = model(\'\'); en el template del hijo [ngModel]="value()" (ngModelChange)="valueChange.emit($event)". O con la sintaxis de model: el padre [(value)]="searchQuery".`,
    code: `// Hijo
value = model('');
// Template hijo: (input)="valueChange.emit($any($event.target).value)"
// Padre: <app-search [(value)]="searchQuery" />`,
    commonErrors: ['Confundir model() con input() + output() a mano', 'No emitir en valueChange cuando el valor cambie'],
    checklist: ['model() para two-way', 'Padre usa [(nombre)]'],
    explainLikeIm5: `model es una ventanita por la que pasas algo y tu papá puede pasarte algo nuevo; cuando tú cambias lo que ves, se lo dices (emit) y él actualiza.`,
    challenge: { description: 'Crea un componente con model(\'count\') y un botón que emita count + 1 al hacer clic.', hint: 'countChange.emit(count() + 1)' },
  },
  'io-6': {
    definition: `Puedes derivar estado del componente a partir de inputs usando computed(). fullName = computed(() => \`\${firstName()} \${lastName()}\`) donde firstName y lastName son inputs. Cualquier computed que lea inputs se actualizará cuando el padre cambie los bindings.`,
    como: `CÓMO: displayTitle = computed(() => \`\${this.title()} - \${this.subtitle()}\`); El template usa displayTitle(). Cuando el padre cambie title o subtitle, el computed se recalcula.`,
    porQue: `POR QUÉ: Valores derivados de inputs sin escribir en signals; un solo lugar para la lógica.`,
    cuando: `CUÁNDO: Combinar varios inputs en un texto, formato o validación derivada.`,
    conQue: `CON QUÉ: input() que leas dentro del computed(); no effect para "copiar" input a signal.`,
    paraQue: `PARA QUÉ: UI derivada de props sin estado local redundante.`,
    realWorld: `CardComponent con title = input(), subtitle = input(). displayTitle = computed(() => title() ? \`\${title()} - \${subtitle()}\` : subtitle()). El template usa displayTitle().`,
    code: `title = input<string>('');
subtitle = input<string>('');
displayTitle = computed(() => \`\${this.title()} - \${this.subtitle()}\`);`,
    commonErrors: ['Crear signals writable que "copien" el input en lugar de computed', 'Leer input en un effect para escribir en un signal (mejor computed)'],
    checklist: ['Valor derivado de inputs = computed que lee inputs', 'No escribir en signals desde effect que solo lee inputs'],
    explainLikeIm5: `Lo que tu papá te pasa (inputs) lo puedes combinar en tu cabeza (computed) y mostrar el resultado. Cuando él cambie lo que te pasa, tu resultado se actualiza solo.`,
    challenge: { description: 'Tienes input min e input max; crea un computed range que devuelva "min - max".', hint: 'computed(() => `${min()} - ${max()}`)' },
  },
  'io-7': {
    definition: `Puedes dar un alias al input: input({ alias: \'nombrePublico\' }). Desde el template del padre usas [nombrePublico]="valor". Útil para mantener nombres internos cortos o para compatibilidad con nombres que ya usaba el componente.`,
    como: `CÓMO: avatar = input<string>({ alias: 'avatar' }); El padre usa [avatar]="user.avatarUrl". Internamente lees avatar().`,
    porQue: `POR QUÉ: Nombre público distinto al interno; compatibilidad con APIs existentes o nombres más claros fuera.`,
    cuando: `CUÁNDO: Cuando el nombre del atributo debe ser distinto al de la propiedad (ej. "disabled" vs isDisabled).`,
    conQue: `CON QUÉ: input({ alias: 'nombrePublico' }); documentar en la API del componente.`,
    paraQue: `PARA QUÉ: API pública clara y nombres internos cómodos.`,
    realWorld: `Internamente quieres userAvatarUrl; hacia fuera expones "avatar": avatar = input({ alias: \'avatar\' }). El padre escribe [avatar]="user.avatarUrl".`,
    code: `avatar = input<string>({ alias: 'avatar' });
// Padre: <app-profile [avatar]="user.avatarUrl" />`,
    commonErrors: ['Confundir alias con el nombre de la propiedad', 'No documentar el alias en la API del componente'],
    checklist: ['alias para nombre público distinto', 'Documentar en comentarios o doc'],
    explainLikeIm5: `Por fuera la ventanita se llama "avatar"; por dentro tú la llamas "foto". Es la misma ventanita con dos nombres.`,
    challenge: { description: 'Crea un input con alias "disabled" que internamente se llame isDisabled.', hint: 'input({ alias: \'disabled\' })' },
  },
  'io-8': {
    definition: `output() reemplaza a EventEmitter en la API moderna. Si migras: antes tenías @Output() delete = new EventEmitter<number>(); ahora delete = output<number>(). Emitir sigue siendo delete.emit(id). El padre escucha igual: (delete)="onDelete($event)". No necesitas EventEmitter ni subscribe; output() devuelve un objeto con emit().`,
    como: `CÓMO: Quitar @Output() y new EventEmitter; poner delete = output<number>(). El resto (emit, listener del padre) se mantiene.`,
    porQue: `POR QUÉ: Menos boilerplate; output() es la API recomendada en componentes nuevos.`,
    cuando: `CUÁNDO: Al migrar componentes o crear nuevos; el padre no tiene que cambiar.`,
    conQue: `CON QUÉ: output<T>(); emit(valor); (outputName)="handler($event)" en el padre.`,
    paraQue: `PARA QUÉ: Migración gradual sin romper padres.`,
    realWorld: `Componente antiguo: @Output() closed = new EventEmitter<void>(). Nuevo: closed = output<void>(). En el template (closed)="handleClose()" sigue igual. Migra por componentes: cambia la declaración y deja los listeners del padre como están.`,
    code: `// Antes
@Output() delete = new EventEmitter<number>();
// Ahora
delete = output<number>();
// Emit: igual
this.delete.emit(id);`,
    commonErrors: ['Mezclar EventEmitter y output() en el mismo componente sin motivo', 'Pensar que el padre tiene que cambiar la forma de escuchar'],
    checklist: ['output() reemplaza EventEmitter', 'Padre (evento)="handler" igual'],
    explainLikeIm5: `Antes el timbre era un EventEmitter; ahora es output(). Sigue siendo un timbre: pulsas emit y tu papá escucha igual.`,
    challenge: { description: 'Migra un componente que tenga un @Output() EventEmitter a output().', hint: 'Quita @Output() y new EventEmitter; pon output<T>().' },
  },
  'io-9': {
    definition: `content() y contentChildren() pueden usarse con signals en componentes que proyectan contenido. content() devuelve el contenido proyectado (TemplateRef o similar); contentChildren() con read puede devolver una lista. La integración con signals puede ser mediante queries que se exponen como signals en APIs más recientes. Consulta la documentación de tu versión para content() como signal.`,
    como: `CÓMO: tabs = contentChildren(TabComponent); en el template @for (tab of tabs(); track tab). Verifica en angular.dev si la API expone signal para content/contentChildren en tu versión.`,
    porQue: `POR QUÉ: Proyección de contenido y acceso a hijos proyectados; la API signal permite reactividad cuando los hijos cambian.`,
    cuando: `CUÁNDO: Tabs, acordeones, listas de ítems proyectados que el contenedor debe leer.`,
    conQue: `CON QUÉ: contentChildren, content; documentación de la versión de Angular.`,
    paraQue: `PARA QUÉ: Componentes que proyectan y manipulan contenido hijo de forma reactiva.`,
    realWorld: `Un tab panel que proyecta tabs: contentChildren(TabComponent) para obtener los hijos. Si la API expone contentChildren como signal, lo leerías en el template o en computed.`,
    code: `// Ejemplo conceptual
tabs = contentChildren(TabComponent);
// En template: @for (tab of tabs(); track tab) { ... }`,
    commonErrors: ['Asumir que contentChildren devuelve signal sin verificar la versión', 'Leer content antes de que el contenido esté disponible'],
    checklist: ['Verificar API de content/contentChildren en tu versión', 'Leer después de que la vista esté estable'],
    explainLikeIm5: `content es lo que tu papá te mete dentro del sobre (proyección). Puedes mirar cuántas cosas te metió (contentChildren) y usarlas.`,
    challenge: { description: 'Busca en la documentación contentChildren y si hay versión signal.', hint: 'angular.dev → contentChildren' },
  },
  'io-10': {
    definition: `viewChild() y viewChildren() en Angular pueden devolver signals cuando usas la opción signal: true (o la API equivalente en tu versión). viewChild(MyDirective, { signal: true }) devuelve un Signal que se actualiza cuando la vista está lista. Así evitas undefined en el primer render si lees en un effect.`,
    como: `CÓMO: inputRef = viewChild<ElementRef>('inputRef', { signal: true }); En effect: if (this.inputRef()) this.inputRef()!.nativeElement.focus(); Comprueba siempre undefined antes de usar.`,
    porQue: `POR QUÉ: La vista puede no estar en el primer render; el signal se actualiza cuando el elemento existe.`,
    cuando: `CUÁNDO: Referencias a elementos o directivas del template que necesites en effect o después de init.`,
    conQue: `CON QUÉ: viewChild(selector, { signal: true }); comprobar undefined al leer.`,
    paraQue: `PARA QUÉ: Acceso seguro a elementos del template de forma reactiva.`,
    realWorld: `Necesitas una referencia a un elemento del template: inputRef = viewChild(\'inputRef\', { signal: true }). inputRef() es undefined hasta que la vista se renderiza; luego tiene el elemento. En un effect puedes leer inputRef() y hacer focus cuando esté definido.`,
    code: `inputRef = viewChild<ElementRef>('inputRef', { signal: true });
// En effect: if (this.inputRef()) this.inputRef()!.nativeElement.focus();`,
    commonErrors: ['Leer viewChild() en constructor (aún no está)', 'No comprobar undefined antes de usar'],
    checklist: ['viewChild con signal: true si quieres Signal', 'Comprobar undefined al leer'],
    explainLikeIm5: `viewChild es mirar dentro de tu habitación y encontrar un juguete por nombre. Al principio puede no estar; cuando Angular pone la habitación, ya está y el signal te avisa.`,
    challenge: { description: 'Usa viewChild con signal para obtener un input y haz focus cuando el componente se inicie.', hint: 'effect con read del signal y focus si existe' },
  },
  'io-11': {
    definition: `En listas: cada ítem puede tener input (item, selected) y output (itemClick, remove). El padre mantiene items = signal([]) y selectedId = signal<string | null>(null). Pasa [item]="item" [selected]="selectedId() === item.id" y (itemClick)="selectedId.set(item.id)" (remove)="removeItem(item.id)". Los hijos son "presentacionales"; el estado vive en el padre.`,
    como: `CÓMO: Padre: items(), selectedId(); hijo con input item, input selected, output toggle, output delete. (toggle)="selectedId.set($event)" (delete)="remove($event)". Hijo no tiene signal de selección.`,
    porQue: `POR QUÉ: Una sola fuente de verdad (padre); los hijos solo muestran y emiten eventos.`,
    cuando: `CUÁNDO: Listas con selección, carrito, tareas; estado en el padre, hijos presentacionales.`,
    conQue: `CON QUÉ: input(), output(), signals en el padre; track en @for.`,
    paraQue: `PARA QUÉ: Listas reactivas y fáciles de mantener.`,
    realWorld: `Lista de tareas: TaskComponent con input task y input selected; output toggle, output delete. El padre tiene tasks = signal([]), selectedId = signal(null). (toggle)="selectedId.set($event)" (delete)="remove($event)".`,
    code: `// Padre
<app-task *ngFor="let t of tasks(); track t.id"
  [task]="t" [selected]="selectedId() === t.id"
  (toggle)="selectedId.set(t.id)" (delete)="remove(t.id)" />
// Hijo: task = input(), selected = input(), toggle = output(), delete = output()`,
    commonErrors: ['Mantener estado de selección en el hijo y no subir al padre', 'No usar track en *ngFor o @for'],
    checklist: ['Estado de lista en el padre (signals)', 'Hijo solo inputs y outputs'],
    explainLikeIm5: `El padre tiene la lista de juguetes y cuál está elegido. A cada hijo le pasa su juguete y "¿estás elegido?". El hijo solo avisa: "me tocaron" o "me borraron".`,
    challenge: { description: 'Implementa una lista con selección: el padre tiene selectedId signal; los hijos emiten select y el padre actualiza selectedId.', hint: '(select)="selectedId.set(item.id)"' },
  },
  'io-12': {
    definition: `Resumen Input/Output con Signals: (1) input() y input.required(); (2) output() con emit(); (3) model() para two-way; (4) transform y alias en input; (5) computed para derivar de inputs; (6) viewChild/contentChildren con signal cuando aplique. Migración: reemplazar @Input/@Output por input()/output(); el padre puede seguir igual.`,
    como: `CÓMO: Repasa: input()/output()/model(); transform y alias; computed que lee inputs; viewChild con signal. Migrar por componentes.`,
    porQue: `POR QUÉ: API moderna y consistente con signals; migración gradual sin romper padres.`,
    cuando: `CUÁNDO: Componentes nuevos; migración de @Input/@Output.`,
    conQue: `CON QUÉ: input(), output(), model(); documentación angular.dev.`,
    paraQue: `PARA QUÉ: Comunicación padre-hijo y two-way con signals.`,
    realWorld: `Checklist: todos los inputs como input(); todos los outputs como output(); two-way con model(); valores derivados con computed(). Sin EventEmitter ni @Input/@Output en componentes nuevos.`,
    code: `// Nueva API
title = input.required<string>();
count = output<number>();
value = model('');
display = computed(() => title() + ': ' + value());`,
    commonErrors: ['Mezclar @Input con input() en el mismo componente sin motivo', 'Olvidar () al leer inputs en template'],
    checklist: ['input()/output()/model() en componentes nuevos', 'Siempre () para leer inputs'],
    explainLikeIm5: `Resumen: ventanitas (input), timbre (output), ventanita que se puede pasar cosas para allá y para acá (model). Y el amigo que calcula (computed) con lo que te pasan.`,
    challenge: { description: 'Revisa un componente tuyo y lista qué tendría que ser input(), output() o model().', hint: 'Cada @Input → input(); cada @Output → output().' },
  },
  'io-13': {
    definition: 'Practica en el Lab: formulario con validación. Combina inputs (email, password) con computed (isEmailValid, strength, canSubmit) para un formulario reactivo.',
    como: `CÓMO: Haz clic en "Probar en Lab" para abrir el Lab de formulario con validación. Los valores del formulario son signals; las validaciones y el estado del botón son computed.`,
    porQue: `POR QUÉ: Un formulario con inputs y computed muestra cómo derivar estado de UI (validación, habilitar botón) sin lógica duplicada.`,
    cuando: `CUÁNDO: Después de "input() como Signal" y "Composición con inputs y computed".`,
    conQue: `CON QUÉ: signal(''), computed(() => /regex/.test(email())), computed(() => canSubmit).`,
    paraQue: `PARA QUÉ: Llevar a la práctica input + computed en el Lab.`,
    realWorld: 'Abre el Lab "Formulario con validación" desde el botón o la pestaña Labs.',
    code: 'email = signal(\'\');\npassword = signal(\'\');\nisEmailValid = computed(() => /^[^@]+@[^@]+\\.[^@]+$/.test(this.email()));\ncanSubmit = computed(() => this.isEmailValid() && this.password().length >= 6);',
    commonErrors: ['Validar en el template en lugar de computed', 'Hacer setItem o DOM dentro del computed'],
    checklist: ['Abrir el Lab Formulario con validación', 'Ver cómo computed deriva isEmailValid y canSubmit', 'Probar email válido/inválido'],
    explainLikeIm5: 'En el Lab el formulario te dice si el email está bien y si puedes enviar.',
    challenge: { description: 'Completar el lab de validación en Labs.', hint: 'Probar en Lab o pestaña Labs.' },
  },
};
