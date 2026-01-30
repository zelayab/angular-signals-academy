import { ApplicationRef, Component, inject, signal } from '@angular/core';
import { AppStateService } from '../../core/services/app-state.service';
import { SIDEBAR_SECTIONS } from '../../core/data/sidebar.data';
import type { SidebarItem } from '../../core/models/sidebar.model';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
})
export class MobileNavComponent {
  private readonly appState = inject(AppStateService);
  private readonly appRef = inject(ApplicationRef);

  readonly activeSection = this.appState.section;
  readonly open = signal(false);
  readonly sections = SIDEBAR_SECTIONS;

  selectItem(item: SidebarItem): void {
    this.appState.setActiveSection(item.id);
    if (item.tab) {
      this.appState.setActiveTab(item.tab);
    } else {
      this.appState.setActiveTab('lecciones');
    }
    this.open.set(false);
    this.appRef.tick();
  }

  toggle(): void {
    this.open.update(v => !v);
  }
}
