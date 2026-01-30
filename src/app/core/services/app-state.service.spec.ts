import { TestBed } from '@angular/core/testing';
import { AppStateService } from './app-state.service';

describe('AppStateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set active tab', () => {
    expect(service.tab()).toBe('lecciones');
    service.setActiveTab('labs');
    expect(service.tab()).toBe('labs');
    service.setActiveTab('quiz');
    expect(service.tab()).toBe('quiz');
    service.setActiveTab('lecciones');
    expect(service.tab()).toBe('lecciones');
  });

  it('should set active section', () => {
    service.setActiveSection('fundamentos');
    expect(service.section()).toBe('fundamentos');
  });

  it('should set search query', () => {
    service.setSearchQuery('signals');
    expect(service.search()).toBe('signals');
  });

  it('should toggle dark mode', () => {
    const initial = service.dark();
    service.toggleDarkMode();
    expect(service.dark()).toBe(!initial);
  });

  it('goToLab should set tab, section and labId', () => {
    service.goToLab('lab-2');
    expect(service.tab()).toBe('labs');
    expect(service.section()).toBe('labs');
    expect(service.labId()).toBe('lab-2');
  });

  it('goToQuiz should set tab, section and quizModuleId', () => {
    service.goToQuiz('fundamentos');
    expect(service.tab()).toBe('quiz');
    expect(service.section()).toBe('quiz');
    expect(service.quizModuleId()).toBe('fundamentos');
  });

  it('goToLesson should set tab, section and lessonId when lesson exists', () => {
    service.goToLesson('intro-1');
    expect(service.tab()).toBe('lecciones');
    expect(service.section()).toBe('introduccion');
    expect(service.lessonId()).toBe('intro-1');
  });

  it('goToLesson should not change state for unknown lesson id', () => {
    service.setActiveTab('labs');
    service.goToLesson('unknown-id-xyz');
    expect(service.tab()).toBe('labs');
    expect(service.lessonId()).toBe(null);
  });
});
