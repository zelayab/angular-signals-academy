import { Component, inject, signal, effect } from '@angular/core';
import { LABS } from '../../../core/data/labs.data';
import type { Lab } from '../../../core/models/lab.model';
import { AppStateService } from '../../../core/services/app-state.service';
import { openInStackBlitz, embedInPage } from '../../../core/services/stackblitz.service';
import { MonacoEditorComponent } from '../../../shared/monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-labs-tab',
  standalone: true,
  imports: [MonacoEditorComponent],
  templateUrl: './labs-tab.component.html',
  styleUrl: './labs-tab.component.scss',
})
export class LabsTabComponent {
  private readonly appState = inject(AppStateService);

  readonly labs = LABS;
  readonly selectedLab = signal<Lab>(LABS[0]);
  /** Código actual del editor; al cambiar de lab se resetea a initialCode. */
  readonly editorCode = signal<string>(LABS[0].initialCode);
  /** Si hay un iframe de StackBlitz embebido (para ocultar el placeholder). */
  readonly hasEmbed = signal(false);
  /** Cargando el embed (mostrar "Cargando..."). */
  readonly isEmbedLoading = signal(false);
  /** Mensaje de error si el embed falla. */
  readonly embedError = signal<string | null>(null);

  readonly embedContainerId = 'lab-preview-embed';

  constructor() {
    effect(() => {
      const labId = this.appState.labId();
      if (labId) {
        this.onLabSelect(labId);
        this.appState.setSelectedLabId(null);
      }
    });
    effect(() => {
      const lab = this.selectedLab();
      this.editorCode.set(lab.initialCode);
      this.clearEmbed();
      this.scheduleAutoRun();
    });
  }

  /** Programa ejecución automática del preview (al cargar o al cambiar de lab). */
  private scheduleAutoRun(): void {
    setTimeout(() => this.runHere(), 300);
  }

  selectLab(lab: Lab): void {
    this.selectedLab.set(lab);
  }

  restoreCode(): void {
    this.editorCode.set(this.selectedLab().initialCode);
  }

  runInStackBlitz(): void {
    const payload = this.buildStackBlitzPayload();
    openInStackBlitz(payload);
  }

  /** Ejecuta el código del editor aquí mismo, en un iframe embebido (StackBlitz). */
  runHere(): void {
    this.embedError.set(null);
    this.isEmbedLoading.set(true);
    this.clearEmbed();
    setTimeout(() => {
      const el = document.getElementById(this.embedContainerId);
      if (!el) {
        this.isEmbedLoading.set(false);
        return;
      }
      const payload = this.buildStackBlitzPayload();
      embedInPage(el, payload)
        .then(() => {
          this.hasEmbed.set(true);
          this.isEmbedLoading.set(false);
        })
        .catch((err: unknown) => {
          this.isEmbedLoading.set(false);
          const msg = err instanceof Error ? err.message : String(err);
          this.embedError.set(msg || 'Error al cargar el preview.');
          console.error('StackBlitz embed failed', err);
        });
    }, 80);
  }

  private clearEmbed(): void {
    this.hasEmbed.set(false);
    this.embedError.set(null);
    const el = document.getElementById(this.embedContainerId);
    if (el) el.innerHTML = '';
  }

  private buildStackBlitzPayload(): {
    title: string;
    description: string;
    labComponentCode: string;
    labFileName: string;
    selector: string;
    className: string;
  } {
    const lab = this.selectedLab();
    const code = this.editorCode();
    const className = this.getClassNameFromCode(code) ?? 'LabComponent';
    const selector = this.getSelectorFromCode(code) ?? 'app-lab';
    return {
      title: lab.title,
      description: lab.description,
      labComponentCode: code,
      labFileName: 'lab.component.ts',
      selector,
      className,
    };
  }

  private getSelectorFromCode(code: string): string | null {
    const m = code.match(/selector\s*:\s*['"]([^'"]+)['"]/);
    return m ? m[1] : null;
  }

  private getClassNameFromCode(code: string): string | null {
    const m = code.match(/export\s+class\s+(\w+)/);
    return m ? m[1] : null;
  }

  onLabSelect(labId: string): void {
    const lab = this.labs.find((l) => l.id === labId);
    if (lab) this.selectLab(lab);
  }

  getDifficultyClass(d: Lab['difficulty']): string {
    switch (d) {
      case 'básico':
        return 'badge-accent';
      case 'intermedio':
        return 'badge-primary';
      case 'avanzado':
        return 'badge-destructive';
      default:
        return '';
    }
  }
}
