import { ApplicationRef, Component, inject, signal, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  private readonly appState = inject(AppStateService);
  private readonly appRef = inject(ApplicationRef);
  private readonly router = inject(Router);

  readonly searchQuery = this.appState.search;
  readonly searchFocused = signal(false);
  readonly focusMode = this.appState.focus;
  readonly darkMode = this.appState.dark;
  readonly layoutMode = this.appState.layoutMode;

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      const input = document.querySelector<HTMLInputElement>('.search-input');
      input?.focus();
    }
  }

  onSearchChange(value: string): void {
    this.appState.setSearchQuery(value);
    this.appRef.tick();
  }

  clearSearch(): void {
    this.appState.setSearchQuery('');
    this.appRef.tick();
  }

  goHome(): void {
    this.appState.goHome();
    this.router.navigate(['/'], { queryParams: {} });
    this.appRef.tick();
  }

  toggleFocus(): void {
    this.appState.toggleFocusMode();
  }

  toggleDark(): void {
    this.appState.toggleDarkMode();
  }

  toggleLayout(): void {
    this.appState.toggleLayoutMode();
  }
}
