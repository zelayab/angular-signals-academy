import {
  Component,
  ElementRef,
  input,
  output,
  effect,
  viewChild,
  afterNextRender,
  OnDestroy,
} from '@angular/core';

declare const monaco: typeof import('monaco-editor');

const MONACO_LOADER_URL =
  'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
const MONACO_BASE = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  template: `<div #container class="monaco-container"></div>`,
  styles: [
    `
      .monaco-container {
        width: 100%;
        min-height: 320px;
        height: 100%;
      }
    `,
  ],
})
export class MonacoEditorComponent implements OnDestroy {
  readonly value = input<string>('');
  /** Cuando cambia, se reaplica value al editor (p. ej. al cambiar de lab). */
  readonly resetKey = input<string>('');
  readonly valueChange = output<string>();

  private readonly container = viewChild<ElementRef<HTMLDivElement>>('container');
  private editor: import('monaco-editor').editor.IStandaloneCodeEditor | null = null;
  private ignoreNextChange = false;
  private loadPromise: Promise<typeof monaco> | null = null;
  private lastResetKey = '';

  constructor() {
    afterNextRender(() => this.initEditor());
    effect(() => {
      const key = this.resetKey();
      if (key && key !== this.lastResetKey) {
        this.lastResetKey = key;
        this.setEditorValue(this.value() ?? '');
      }
    });
  }

  ngOnDestroy(): void {
    this.editor?.dispose();
    this.editor = null;
  }

  private loadMonaco(): Promise<typeof monaco> {
    if (this.loadPromise) return this.loadPromise;
    this.loadPromise = new Promise((resolve, reject) => {
      if (typeof (window as unknown as { monaco?: typeof monaco }).monaco !== 'undefined') {
        resolve((window as unknown as { monaco: typeof monaco }).monaco);
        return;
      }
      const script = document.createElement('script');
      script.src = MONACO_LOADER_URL;
      script.async = true;
      script.onload = () => {
        const w = window as unknown as {
          require: {
            config: (cfg: { baseUrl?: string; paths?: Record<string, string> }) => void;
            (deps: string[], cb: () => void): void;
          };
          MONACO_ENV?: { getWorkerUrl?: (module: string, label: string) => string };
        };
        w.MONACO_ENV = w.MONACO_ENV ?? {};
        w.MONACO_ENV.getWorkerUrl = () =>
          `${MONACO_BASE}/vs/base/worker/workerMain.js`;
        w.require.config({ baseUrl: MONACO_BASE, paths: { vs: 'vs' } });
        w.require(['vs/editor/editor.main'], () => {
          resolve((window as unknown as { monaco: typeof monaco }).monaco);
        });
      };
      script.onerror = () => reject(new Error('Failed to load Monaco'));
      document.head.appendChild(script);
    });
    return this.loadPromise;
  }

  private initEditor(): void {
    const el = this.container()?.nativeElement;
    if (!el) return;
    this.loadMonaco().then((monacoInstance) => {
      if (!el.isConnected) return;
      this.editor = monacoInstance.editor.create(el, {
        value: this.value() ?? '',
        language: 'typescript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 13,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
      });
      this.editor.getModel()?.onDidChangeContent(() => {
        if (this.ignoreNextChange) {
          this.ignoreNextChange = false;
          return;
        }
        const v = this.editor?.getValue() ?? '';
        this.valueChange.emit(v);
      });
    });
  }

  /** Llamado cuando resetKey cambia para sincronizar value al editor. */
  setEditorValue(val: string): void {
    if (!this.editor) return;
    this.ignoreNextChange = true;
    this.editor.setValue(val ?? '');
  }
}
