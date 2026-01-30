import { getTagColorClass } from './tag-colors';

describe('getTagColorClass', () => {
  it('should return a tag class from tag-1 to tag-16', () => {
    const result = getTagColorClass('conceptos');
    expect(result).toMatch(/^tag-\d+$/);
    const num = parseInt(result.replace('tag-', ''), 10);
    expect(num).toBeGreaterThanOrEqual(1);
    expect(num).toBeLessThanOrEqual(16);
  });

  it('should return the same class for the same tag (case insensitive)', () => {
    expect(getTagColorClass('reactividad')).toBe(getTagColorClass('REACTIVIDAD'));
    expect(getTagColorClass('signal()')).toBe(getTagColorClass('signal()'));
  });

  it('should return different classes for different tags (usually)', () => {
    const a = getTagColorClass('conceptos');
    const b = getTagColorClass('rxjs');
    const c = getTagColorClass('effect()');
    const classes = [a, b, c];
    const unique = new Set(classes);
    expect(unique.size).toBeGreaterThanOrEqual(1);
    expect(unique.size).toBeLessThanOrEqual(3);
  });

  it('should handle empty string', () => {
    const result = getTagColorClass('');
    expect(result).toMatch(/^tag-\d+$/);
  });

  it('should be deterministic for a given tag', () => {
    const r1 = getTagColorClass('foo');
    const r2 = getTagColorClass('foo');
    expect(r1).toBe(r2);
    const r3 = getTagColorClass('testing');
    const r4 = getTagColorClass('testing');
    expect(r3).toBe(r4);
  });
});
