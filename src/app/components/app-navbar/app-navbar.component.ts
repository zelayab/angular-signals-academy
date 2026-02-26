import { ApplicationRef, Component, inject } from '@angular/core';
import { AppStateService } from '../../core/services/app-state.service';
import { SIDEBAR_SECTIONS } from '../../core/data/sidebar.data';
import type { SidebarItem } from '../../core/models/sidebar.model';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.scss',
})
export class AppNavbarComponent {
  private readonly appState = inject(AppStateService);
  private readonly appRef = inject(ApplicationRef);

  readonly activeSection = this.appState.section;
  readonly sections = SIDEBAR_SECTIONS;

  selectItem(item: SidebarItem): void {
    this.appState.setActiveSection(item.id);
    if (item.tab) {
      this.appState.setActiveTab(item.tab);
    } else {
      this.appState.setActiveTab('lecciones');
    }
    this.appRef.tick();
  }
}
