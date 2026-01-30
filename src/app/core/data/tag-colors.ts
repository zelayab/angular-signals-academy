/** Colores por tag para filtrar y distinguir visualmente. Mismo tag = mismo color. */
const TAG_COLOR_NAMES = [
  'tag-1', 'tag-2', 'tag-3', 'tag-4', 'tag-5', 'tag-6', 'tag-7', 'tag-8',
  'tag-9', 'tag-10', 'tag-11', 'tag-12', 'tag-13', 'tag-14', 'tag-15', 'tag-16',
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function getTagColorClass(tag: string): string {
  const index = hashString(tag.toLowerCase()) % TAG_COLOR_NAMES.length;
  return TAG_COLOR_NAMES[index];
}
