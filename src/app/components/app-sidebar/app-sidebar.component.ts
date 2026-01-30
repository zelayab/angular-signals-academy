import { ApplicationRef, Component, inject } from '@angular/core';
import { AppStateService } from '../../core/services/app-state.service';
import { SIDEBAR_SECTIONS } from '../../core/data/sidebar.data';
import type { SidebarItem } from '../../core/models/sidebar.model';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-app-sidebar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss',
})
export class AppSidebarComponent {
  private readonly appState = inject(AppStateService);
  private readonly appRef = inject(ApplicationRef);

  readonly collapsed = this.appState.sidebarCollapsedState;
  readonly activeSection = this.appState.section;
  readonly focusMode = this.appState.focus;
  readonly sections = SIDEBAR_SECTIONS;

  toggleCollapse(): void {
    this.appState.toggleSidebar();
  }

  selectItem(item: SidebarItem): void {
    this.appState.setActiveSection(item.id);
    if (item.tab) {
      this.appState.setActiveTab(item.tab);
    } else {
      this.appState.setActiveTab('lecciones');
    }
    // Zoneless: forzar detección de cambios para que el main (tab/sección) se actualice
    this.appRef.tick();
  }
}
