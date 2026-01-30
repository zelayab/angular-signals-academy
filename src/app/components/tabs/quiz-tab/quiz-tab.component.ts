import { Component, inject, signal, computed, effect } from '@angular/core';
import { QUIZ_MODULES } from '../../../core/data/quiz.data';
import type { QuizModule, QuizQuestion } from '../../../core/models/quiz.model';
import { AppStateService } from '../../../core/services/app-state.service';

@Component({
  selector: 'app-quiz-tab',
  standalone: true,
  templateUrl: './quiz-tab.component.html',
  styleUrl: './quiz-tab.component.scss',
})
export class QuizTabComponent {
  private readonly appState = inject(AppStateService);

  readonly modules = QUIZ_MODULES;
  readonly selectedModule = signal<QuizModule>(QUIZ_MODULES[0]);
  readonly currentIndex = signal(0);

  constructor() {
    effect(() => {
      const moduleId = this.appState.quizModuleId();
      if (moduleId) {
        this.selectModule(moduleId);
        this.appState.setSelectedQuizModuleId(null);
      }
    });
  }
  readonly selectedAnswer = signal<number | null>(null);
  readonly showFeedback = signal(false);
  readonly answers = signal<Record<string, number>>({});
  readonly quizCompleted = signal(false);

  readonly currentQuestion = computed(() => {
    const mod = this.selectedModule();
    const idx = this.currentIndex();
    return mod.questions[idx] ?? null;
  });

  readonly totalQuestions = computed(() => this.selectedModule().questions.length);

  readonly answeredCount = computed(() => {
    const modId = this.selectedModule().id;
    return Object.keys(this.answers()).filter((k) => k.startsWith(modId)).length;
  });

  readonly correctCount = computed(() => {
    const mod = this.selectedModule();
    return mod.questions.filter(
      (q) => this.answers()[`${mod.id}-${q.id}`] === q.correctAnswer
    ).length;
  });

  readonly isCorrect = computed(() => {
    const q = this.currentQuestion();
    const sel = this.selectedAnswer();
    return q && sel !== null && sel === q.correctAnswer;
  });

  readonly scorePercentage = computed(() => {
    const total = this.totalQuestions();
    if (total === 0) return 0;
    return Math.round((this.correctCount() / total) * 100);
  });

  selectModule(moduleId: string): void {
    const mod = this.modules.find((m) => m.id === moduleId);
    if (mod) {
      this.selectedModule.set(mod);
      this.currentIndex.set(0);
      this.selectedAnswer.set(null);
      this.showFeedback.set(false);
      this.quizCompleted.set(false);
    }
  }

  readonly hasNextModule = computed(() => {
    const idx = this.modules.findIndex((m) => m.id === this.selectedModule().id);
    return idx >= 0 && idx < this.modules.length - 1;
  });

  goToNextModule(): void {
    const idx = this.modules.findIndex((m) => m.id === this.selectedModule().id);
    if (idx >= 0 && idx < this.modules.length - 1) {
      this.selectModule(this.modules[idx + 1].id);
    } else {
      this.selectModule(this.modules[0].id);
    }
  }

  selectAnswer(index: number): void {
    if (this.showFeedback()) return;
    this.selectedAnswer.set(index);
  }

  submitAnswer(): void {
    const sel = this.selectedAnswer();
    const q = this.currentQuestion();
    if (sel === null || !q) return;
    this.answers.update((prev) => ({
      ...prev,
      [`${this.selectedModule().id}-${q.id}`]: sel,
    }));
    this.showFeedback.set(true);
  }

  nextQuestion(): void {
    const total = this.totalQuestions();
    const idx = this.currentIndex();
    if (idx < total - 1) {
      this.currentIndex.update((i) => i + 1);
      this.selectedAnswer.set(null);
      this.showFeedback.set(false);
    } else {
      this.quizCompleted.set(true);
    }
  }

  retry(): void {
    const mod = this.selectedModule();
    this.answers.update((prev) => {
      const next = { ...prev };
      mod.questions.forEach((q) => delete next[`${mod.id}-${q.id}`]);
      return next;
    });
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.showFeedback.set(false);
    this.quizCompleted.set(false);
  }

  reviewErrors(): void {
    const mod = this.selectedModule();
    const firstWrong = mod.questions.findIndex(
      (q) => this.answers()[`${mod.id}-${q.id}`] !== q.correctAnswer
    );
    if (firstWrong !== -1) {
      this.currentIndex.set(firstWrong);
      const q = mod.questions[firstWrong];
      this.selectedAnswer.set(this.answers()[`${mod.id}-${q.id}`] ?? null);
      this.showFeedback.set(true);
      this.quizCompleted.set(false);
    }
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getOptionClass(optionIndex: number): string {
    const q = this.currentQuestion();
    const show = this.showFeedback();
    const selected = this.selectedAnswer();
    if (!q) return '';
    const isCorrectOption = optionIndex === q.correctAnswer;
    if (show) {
      if (isCorrectOption) return 'option-correct';
      if (selected === optionIndex && !isCorrectOption) return 'option-wrong';
    }
    if (selected === optionIndex) return 'option-selected';
    return '';
  }
}
