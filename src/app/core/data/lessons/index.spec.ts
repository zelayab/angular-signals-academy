import { getSectionForLessonId, getLessonContent, LESSONS_BY_SECTION, LESSON_CONTENT } from './index';

describe('lessons index', () => {
  describe('getSectionForLessonId', () => {
    it('should return introduccion for intro-1', () => {
      expect(getSectionForLessonId('intro-1')).toBe('introduccion');
    });

    it('should return fundamentos for fund-1', () => {
      expect(getSectionForLessonId('fund-1')).toBe('fundamentos');
    });

    it('should return computed for comp-1', () => {
      expect(getSectionForLessonId('comp-1')).toBe('computed');
    });

    it('should return labs for lab-1', () => {
      expect(getSectionForLessonId('lab-1')).toBe('labs');
    });

    it('should return quiz for quiz-fundamentos', () => {
      expect(getSectionForLessonId('quiz-fundamentos')).toBe('quiz');
    });

    it('should return null for unknown id', () => {
      expect(getSectionForLessonId('unknown-xyz')).toBeNull();
    });
  });

  describe('getLessonContent', () => {
    it('should return content for intro-1 with definition', () => {
      const content = getLessonContent('intro-1');
      expect(content.definition).toBeTruthy();
      expect(content.definition.length).toBeGreaterThan(0);
      expect(content.checklist.length).toBeGreaterThan(0);
    });

    it('should return default content for unknown lesson id', () => {
      const content = getLessonContent('unknown-xyz');
      expect(content.definition).toContain('desarrollo');
      expect(content.checklist).toEqual(['Contenido en desarrollo']);
    });

    it('should return content for comp-1 (computed)', () => {
      const content = getLessonContent('comp-1');
      expect(content.definition).toBeTruthy();
      expect(content.definition).toContain('computed');
    });

    it('should return content for new lessons (intro-13, io-13, rx-9, pat-11, anti-11)', () => {
      const newLessonIds = ['intro-13', 'io-13', 'rx-9', 'pat-11', 'anti-11'];
      for (const id of newLessonIds) {
        expect(LESSON_CONTENT[id]).toBeDefined();
        expect(LESSON_CONTENT[id].definition).toBeTruthy();
        expect(LESSON_CONTENT[id].definition.length).toBeGreaterThan(0);
        expect(getLessonContent(id).definition).toBe(LESSON_CONTENT[id].definition);
      }
    });
  });

  describe('LESSONS_BY_SECTION', () => {
    it('should have all expected section keys', () => {
      const keys = Object.keys(LESSONS_BY_SECTION);
      expect(keys).toContain('introduccion');
      expect(keys).toContain('fundamentos');
      expect(keys).toContain('computed');
      expect(keys).toContain('effects');
      expect(keys).toContain('labs');
      expect(keys).toContain('quiz');
      expect(keys).toContain('recursos');
    });

    it('should have non-empty lesson arrays for main sections', () => {
      expect(LESSONS_BY_SECTION['introduccion'].length).toBeGreaterThan(0);
      expect(LESSONS_BY_SECTION['fundamentos'].length).toBeGreaterThan(0);
      expect(LESSONS_BY_SECTION['labs'].length).toBeGreaterThan(0);
      expect(LESSONS_BY_SECTION['quiz'].length).toBeGreaterThan(0);
    });
  });
});
