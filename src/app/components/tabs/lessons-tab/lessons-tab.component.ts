import { NgClass } from '@angular/common';
import { ApplicationRef, Component, inject, computed, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../../core/services/app-state.service';
import { LESSONS_BY_SECTION } from '../../../core/data/lessons.data';
import { RESOURCES } from '../../../core/data/resources.data';
import { getTagColorClass } from '../../../core/data/tag-colors';
import type { Lesson } from '../../../core/models/lesson.model';
import { LessonDetailComponent } from '../../lesson-detail/lesson-detail.component';

@Component({
  selector: 'app-lessons-tab',
  standalone: true,
  imports: [NgClass, LessonDetailComponent],
  templateUrl: './lessons-tab.component.html',
  styleUrl: './lessons-tab.component.scss',
})
export class LessonsTabComponent {
  private readonly appState = inject(AppStateService);
  private readonly router = inject(Router);
  private readonly appRef = inject(ApplicationRef);

  readonly activeSection = this.appState.section;
  readonly searchQuery = this.appState.search;
  readonly selectedLesson = signal<Lesson | null>(null);
  readonly selectedTag = signal<string>('');

  /** Pantalla de inicio: solo cuando la sección es Inicio (no Introducción). */
  readonly showHomeScreen = computed(
    () => this.activeSection() === 'inicio' && !this.selectedLesson()
  );

  /** Vista de Recursos: enlaces externos funcionales. */
  readonly showRecursosView = computed(() => this.activeSection() === 'recursos');

  readonly resources = RESOURCES;

  getTagColor = getTagColorClass;

  readonly lessons = computed(() => {
    const section = this.activeSection();
    return LESSONS_BY_SECTION[section] ?? [];
  });

  /** Tags únicos de la sección actual (orden alfabético) para el filtro. */
  readonly availableTags = computed(() => {
    const list = this.lessons();
    const set = new Set<string>();
    for (const lesson of list) {
      for (const tag of lesson.tags) set.add(tag);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  readonly filteredLessons = computed(() => {
    const list = this.lessons();
    const q = this.searchQuery().toLowerCase().trim();
    const tag = this.selectedTag().toLowerCase().trim();
    let result = list;
    if (q) {
      result = result.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(q) ||
          lesson.description.toLowerCase().includes(q) ||
          lesson.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (tag) {
      result = result.filter((lesson) =>
        lesson.tags.some((t) => t.toLowerCase() === tag)
      );
    }
    return result;
  });

  setTagFilter(tag: string): void {
    const current = this.selectedTag();
    this.selectedTag.set(current === tag ? '' : tag);
  }

  onTagSelect(value: string): void {
    this.selectedTag.set(value ?? '');
  }

  clearTagFilter(): void {
    this.selectedTag.set('');
  }

  goToLabs(): void {
    this.appState.setActiveTab('labs');
    this.appState.setActiveSection('labs');
    this.appRef.tick();
  }

  goToQuiz(): void {
    this.appState.setActiveTab('quiz');
    this.appState.setActiveSection('quiz');
    this.appRef.tick();
  }

  /** Ir a la sección Introducción (lista de lecciones). */
  showLessonsList(): void {
    this.appState.setActiveSection('introduccion');
    this.appRef.tick();
  }

  constructor() {
    effect(() => {
      this.activeSection();
      this.selectedTag.set('');
    });
    effect(() => {
      const lessonId = this.appState.lessonId();
      if (!lessonId) return;
      const list = this.lessons();
      const lesson = list.find((l) => l.id === lessonId) ?? null;
      if (lesson) this.selectedLesson.set(lesson);
      this.appState.setSelectedLessonId(null);
    });
  }

  selectLesson(lesson: Lesson): void {
    this.selectedLesson.set(lesson);
    this.router.navigate([], { queryParams: { leccion: lesson.id }, queryParamsHandling: '' });
  }

  back(): void {
    this.selectedLesson.set(null);
    this.router.navigate([], { queryParams: {} });
  }

  getDifficultyClass(d: Lesson['difficulty']): string {
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

  getSectionLabel(section: string): string {
    return section
      .charAt(0)
      .toUpperCase()
      .concat(section.slice(1).replace('-', ' & '));
  }
}
