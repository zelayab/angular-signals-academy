import { Component, input } from '@angular/core';
import type { SectionStatus } from '../../core/models/sidebar.model';

@Component({
  selector: 'app-status-icon',
  standalone: true,
  template: `
    @switch (status()) {
      @case ('completed') {
        <svg class="icon-accent" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
      }
      @case ('in-progress') {
        <svg class="icon-primary" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      }
      @default {
        <svg class="icon-muted" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
      }
    }
  `,
  styles: [`
    :host { display: inline-flex; }
    .icon-accent { color: var(--accent); }
    .icon-primary { color: var(--primary); }
    .icon-muted { color: var(--muted-foreground); opacity: 0.5; }
  `],
})
export class StatusIconComponent {
  status = input.required<SectionStatus>();
}
