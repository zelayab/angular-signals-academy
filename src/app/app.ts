import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppStateService } from './core/services/app-state.service';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { LessonsTabComponent } from './components/tabs/lessons-tab/lessons-tab.component';
import { LabsTabComponent } from './components/tabs/labs-tab/labs-tab.component';
import { QuizTabComponent } from './components/tabs/quiz-tab/quiz-tab.component';
import type { ActiveTab } from './core/models/sidebar.model';

const TABS: { id: ActiveTab; label: string; shortLabel: string }[] = [
  { id: 'lecciones', label: 'Lecciones', shortLabel: 'Lecciones' },
  { id: 'labs', label: 'Labs (Interactivo)', shortLabel: 'Labs' },
  { id: 'quiz', label: 'Quiz', shortLabel: 'Quiz' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppHeaderComponent,
    AppFooterComponent,
    AppNavbarComponent,
    AppSidebarComponent,
    MobileNavComponent,
    LessonsTabComponent,
    LabsTabComponent,
    QuizTabComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly appState = inject(AppStateService);
  private readonly route = inject(ActivatedRoute);

  readonly queryParams = toSignal(this.route.queryParams, { initialValue: {} as Record<string, string> });

  readonly activeTab = this.appState.tab;
  readonly focusMode = this.appState.focus;
  readonly darkMode = this.appState.dark;
  readonly layoutMode = this.appState.layoutMode;
  readonly tabs = TABS;

  constructor() {
    effect(() => {
      const dark = this.appState.dark();
      const doc = typeof document !== 'undefined' ? document.documentElement : null;
      if (doc) {
        doc.classList.toggle('light', !dark);
        doc.classList.toggle('dark', dark);
      }
    });

    effect(() => {
      const q = this.queryParams();
      const leccion = q['leccion'];
      const lab = q['lab'];
      const quiz = q['quiz'];
      if (leccion) this.appState.goToLesson(leccion);
      else if (lab) this.appState.goToLab(lab);
      else if (quiz) this.appState.goToQuiz(quiz);
    });
  }

  setTab(tab: ActiveTab): void {
    this.appState.setActiveTab(tab);
  }
}
