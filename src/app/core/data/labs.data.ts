import type { Lab } from '../models/lab.model';

export const LABS: Lab[] = [
  {
    id: 'lab-1',
    title: 'Contador reactivo',
    description: 'Crea un contador que se actualice en tiempo real usando signals',
    difficulty: 'básico',
    category: 'Fundamentos',
    initialCode: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: \`
    <div class="contador">
      <h2>Contador: {{ contador() }}</h2>
      <button (click)="incrementar()">+</button>
      <button (click)="decrementar()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  \`
})
export class ContadorComponent {
  contador = signal(0);

  incrementar() {
    // TODO: this.contador.update(v => v + 1);
  }

  decrementar() {
    // TODO: this.contador.update(v => v - 1);
  }

  reset() {
    // TODO: this.contador.set(0);
  }
}`,
    expectedOutput: 'El contador debe incrementar, decrementar y resetearse correctamente',
  },
  {
    id: 'lab-2',
    title: 'Lista filtrada con computed',
    description: 'Implementa un filtro de búsqueda usando computed signals',
    difficulty: 'intermedio',
    category: 'Computed',
    initialCode: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-lista-filtrada',
  template: \`
    <input [value]="filtro()" (input)="filtro.set($any($event.target).value)" placeholder="Buscar..." />
    <ul>
      @for (item of itemsFiltrados(); track item) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>Mostrando {{ itemsFiltrados().length }} de {{ items().length }}</p>
  \`
})
export class ListaFiltradaComponent {
  items = signal(['Angular', 'React', 'Vue', 'Svelte', 'SolidJS']);
  filtro = signal('');

  itemsFiltrados = computed(() => {
    const q = this.filtro().toLowerCase();
    return this.items().filter(i => i.toLowerCase().includes(q));
  });
}`,
    expectedOutput: 'La lista debe filtrarse en tiempo real mientras escribes',
  },
  {
    id: 'lab-3',
    title: 'Sincronización con localStorage',
    description: 'Usa effect() para persistir el estado automáticamente',
    difficulty: 'intermedio',
    category: 'Effects',
    initialCode: `import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-notas',
  template: \`
    <textarea [value]="notas()" (input)="notas.set($any($event.target).value)" placeholder="Escribe tus notas..."></textarea>
    <p class="status">{{ guardado() ? '✓ Guardado' : 'Sin guardar' }}</p>
  \`
})
export class NotasComponent {
  notas = signal('');
  guardado = signal(true);

  constructor() {
    effect(() => {
      const n = this.notas();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('notas', n);
        this.guardado.set(true);
      }
    });
  }
}`,
    expectedOutput: 'Las notas deben persistir después de recargar la página',
  },
  {
    id: 'lab-4',
    title: 'Estado derivado complejo',
    description: 'Calcula totales y promedios con múltiples computed signals',
    difficulty: 'avanzado',
    category: 'Computed',
    initialCode: `import { Component, signal, computed } from '@angular/core';

interface Producto { nombre: string; precio: number; cantidad: number; }

@Component({
  selector: 'app-carrito',
  template: \`
    @for (item of carrito(); track item.nombre) {
      <div>{{ item.nombre }} {{ item.precio | currency }} x {{ item.cantidad }}</div>
    }
    <p>Subtotal: {{ subtotal() | currency }}</p>
    <p>IVA (21%): {{ iva() | currency }}</p>
    <p><strong>Total: {{ total() | currency }}</strong></p>
    <p>Items: {{ totalItems() }}</p>
  \`
})
export class CarritoComponent {
  carrito = signal<Producto[]>([
    { nombre: 'Laptop', precio: 999, cantidad: 1 },
    { nombre: 'Mouse', precio: 29, cantidad: 2 },
    { nombre: 'Teclado', precio: 79, cantidad: 1 },
  ]);

  subtotal = computed(() => this.carrito().reduce((s, p) => s + p.precio * p.cantidad, 0));
  iva = computed(() => this.subtotal() * 0.21);
  total = computed(() => this.subtotal() + this.iva());
  totalItems = computed(() => this.carrito().reduce((s, p) => s + p.cantidad, 0));
}`,
    expectedOutput: 'Los totales deben calcularse automáticamente basándose en el carrito',
  },
  {
    id: 'lab-5',
    title: 'Formulario con validación',
    description: 'Validación reactiva con signals y computed',
    difficulty: 'intermedio',
    category: 'Computed',
    initialCode: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-form',
  template: \`
    <input [value]="email()" (input)="email.set($any($event.target).value)" placeholder="Email" />
    <input type="password" [value]="password()" (input)="password.set($any($event.target).value)" placeholder="Contraseña" />
    @if (!isEmailValid() && email().length) {
      <p>Email no válido</p>
    }
    <p>Fortaleza: {{ strength() }}</p>
    <button [disabled]="!canSubmit()">Enviar</button>
  \`
})
export class FormComponent {
  email = signal('');
  password = signal('');

  isEmailValid = computed(() => {
    const e = this.email();
    return /^[^@]+@[^@]+\\.[^@]+$/.test(e);
  });

  strength = computed(() => {
    const len = this.password().length;
    if (len === 0) return '—';
    if (len < 6) return 'Débil';
    if (len < 10) return 'Media';
    return 'Fuerte';
  });

  canSubmit = computed(() => this.isEmailValid() && this.password().length >= 6);
}`,
    expectedOutput: 'El botón Enviar se habilita solo con email válido y contraseña ≥ 6 caracteres',
  },
  {
    id: 'lab-6',
    title: 'Theme switcher con effect',
    description: 'Cambiar tema claro/oscuro usando effect()',
    difficulty: 'intermedio',
    category: 'Effects',
    initialCode: `import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-theme',
  template: \`
    <button (click)="toggle()">{{ dark() ? 'Modo claro' : 'Modo oscuro' }}</button>
    <p>Tema actual: {{ dark() ? 'Oscuro' : 'Claro' }}</p>
  \`
})
export class ThemeComponent {
  dark = signal(true);

  constructor() {
    effect(() => {
      const d = this.dark();
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', d);
        document.documentElement.classList.toggle('light', !d);
      }
    });
  }

  toggle() {
    this.dark.update(v => !v);
  }
}`,
    expectedOutput: 'Al hacer clic, el tema (clase en html) debe cambiar entre dark y light',
  },
  {
    id: 'lab-7',
    title: 'Búsqueda y orden',
    description: 'Filtrar y ordenar una lista con computed',
    difficulty: 'básico',
    category: 'Computed',
    initialCode: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-search',
  template: \`
    <input [value]="query()" (input)="query.set($any($event.target).value)" placeholder="Buscar..." />
    <select [value]="sort()" (change)="sort.set($any($event.target).value)">
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
    <ul>
      @for (item of results(); track item) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>{{ results().length }} resultados</p>
  \`
})
export class SearchComponent {
  items = signal(['Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Qwik', 'Ember', 'Backbone']);
  query = signal('');
  sort = signal<'asc' | 'desc'>('asc');

  results = computed(() => {
    const q = this.query().toLowerCase().trim();
    const list = this.items().filter(i => i.toLowerCase().includes(q));
    return this.sort() === 'desc' ? [...list].reverse() : list;
  });
}`,
    expectedOutput: 'La lista se filtra por búsqueda y se ordena A-Z o Z-A',
  },
];
