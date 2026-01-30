import { NgClass } from '@angular/common';
import { Component, input, output, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import type { Lesson } from '../../core/models/lesson.model';
import { getLessonContent, getSectionForLessonId, LESSONS_BY_SECTION } from '../../core/data/lessons.data';
import { getTagColorClass } from '../../core/data/tag-colors';
import { AppStateService } from '../../core/services/app-state.service';
import { HighlightCodePipe } from '../../shared/highlight-code.pipe';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [NgClass, HighlightCodePipe],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
  lesson = input.required<Lesson>();
  back = output<void>();

  private readonly appState = inject(AppStateService);
  private readonly router = inject(Router);

  readonly content = computed(() => getLessonContent(this.lesson().id));

  /** Siguiente lección en la misma sección, o null si es la última. */
  readonly nextLesson = computed(() => {
    const current = this.lesson();
    const section = getSectionForLessonId(current.id);
    if (!section) return null;
    const list = LESSONS_BY_SECTION[section] ?? [];
    const idx = list.findIndex((l) => l.id === current.id);
    if (idx < 0 || idx >= list.length - 1) return null;
    return list[idx + 1];
  });

  readonly isLabLesson = computed(() => this.lesson().id.startsWith('lab-'));
  /** Id del lab al que enlazar: lección lab-* usa su id, otras usan labId si existe. */
  readonly labIdToOpen = computed(() => {
    const l = this.lesson();
    if (l.id.startsWith('lab-')) return l.id;
    return l.labId ?? null;
  });
  readonly isQuizLesson = computed(() => this.lesson().id.startsWith('quiz-'));
  readonly quizModuleId = computed(() => {
    const id = this.lesson().id;
    if (id === 'quiz-fundamentos') return 'fundamentos';
    if (id === 'quiz-effects') return 'effects';
    if (id === 'quiz-computed') return 'computed';
    if (id === 'quiz-input-output') return 'input-output';
    if (id === 'quiz-anti-patrones') return 'anti-patrones';
    if (id === 'quiz-avanzado') return 'avanzado';
    return '';
  });

  goToLab(): void {
    const id = this.labIdToOpen();
    if (!id) return;
    this.appState.goToLab(id);
    this.router.navigate([], { queryParams: { lab: id }, queryParamsHandling: '' });
  }

  goToQuiz(): void {
    const id = this.quizModuleId();
    if (id) {
      this.appState.goToQuiz(id);
      this.router.navigate([], { queryParams: { quiz: id }, queryParamsHandling: '' });
    }
  }
  readonly eli5Open = signal(false);
  readonly challengeOpen = signal(false);
  readonly showHint = signal(false);
  readonly copied = signal(false);

  getTagColor = getTagColorClass;

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

  toggleEli5(): void {
    this.eli5Open.update((v) => !v);
  }

  toggleChallenge(): void {
    this.challengeOpen.update((v) => !v);
  }

  revealHint(): void {
    this.showHint.set(true);
  }

  async copyCode(): Promise<void> {
    const code = this.content().code;
    await navigator.clipboard.writeText(code);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  goBack(): void {
    this.back.emit();
  }

  goNext(): void {
    const next = this.nextLesson();
    if (!next) return;
    this.appState.goToLesson(next.id);
    this.router.navigate([], { queryParams: { leccion: next.id }, queryParamsHandling: '' });
  }
}
