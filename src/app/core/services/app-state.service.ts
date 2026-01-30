import { Injectable, signal, computed } from '@angular/core';
import type { ActiveTab, SidebarSection } from '../models/sidebar.model';
import { getSectionForLessonId } from '../data/lessons.data';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly activeTab = signal<ActiveTab>('lecciones');
  private readonly activeSection = signal<SidebarSection>('inicio');
  private readonly searchQuery = signal('');
  private readonly focusMode = signal(false);
  private readonly sidebarCollapsed = signal(false);
  private readonly darkMode = signal(true);
  private readonly selectedLabId = signal<string | null>(null);
  private readonly selectedQuizModuleId = signal<string | null>(null);
  private readonly selectedLessonId = signal<string | null>(null);

  readonly tab = this.activeTab.asReadonly();
  readonly section = this.activeSection.asReadonly();
  readonly labId = this.selectedLabId.asReadonly();
  readonly quizModuleId = this.selectedQuizModuleId.asReadonly();
  readonly lessonId = this.selectedLessonId.asReadonly();
  readonly search = this.searchQuery.asReadonly();
  readonly focus = this.focusMode.asReadonly();
  readonly sidebarCollapsedState = this.sidebarCollapsed.asReadonly();
  readonly dark = this.darkMode.asReadonly();

  readonly isFocusMode = computed(() => this.focusMode());

  setActiveTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  setActiveSection(section: SidebarSection): void {
    this.activeSection.set(section);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setFocusMode(value: boolean): void {
    this.focusMode.set(value);
  }

  toggleFocusMode(): void {
    this.focusMode.update(v => !v);
  }

  setSidebarCollapsed(value: boolean): void {
    this.sidebarCollapsed.set(value);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  setDarkMode(value: boolean): void {
    this.darkMode.set(value);
  }

  toggleDarkMode(): void {
    this.darkMode.update(v => !v);
  }

  setSelectedLabId(id: string | null): void {
    this.selectedLabId.set(id);
  }

  setSelectedQuizModuleId(id: string | null): void {
    this.selectedQuizModuleId.set(id);
  }

  goToLab(labId: string): void {
    this.activeTab.set('labs');
    this.activeSection.set('labs');
    this.selectedLabId.set(labId);
  }

  goToQuiz(moduleId: string): void {
    this.activeTab.set('quiz');
    this.activeSection.set('quiz');
    this.selectedQuizModuleId.set(moduleId);
  }

  setSelectedLessonId(id: string | null): void {
    this.selectedLessonId.set(id);
  }

  goToLesson(lessonId: string): void {
    const section = getSectionForLessonId(lessonId);
    if (section) {
      this.activeTab.set('lecciones');
      this.activeSection.set(section as SidebarSection);
      this.selectedLessonId.set(lessonId);
    }
  }

  /** Vuelve al inicio: tab Lecciones, sección Inicio, sin búsqueda ni selección. */
  goHome(): void {
    this.activeTab.set('lecciones');
    this.activeSection.set('inicio');
    this.searchQuery.set('');
    this.selectedLessonId.set(null);
    this.selectedLabId.set(null);
    this.selectedQuizModuleId.set(null);
  }
}
