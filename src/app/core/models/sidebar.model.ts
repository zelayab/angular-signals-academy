export type ActiveTab = 'lecciones' | 'labs' | 'quiz';

export type SidebarSection =
  | 'inicio'
  | 'introduccion'
  | 'fundamentos'
  | 'computed'
  | 'effects'
  | 'input-output'
  | 'rxjs'
  | 'patrones'
  | 'anti-patrones'
  | 'labs'
  | 'quiz'
  | 'recursos';

export type SectionStatus = 'completed' | 'in-progress' | 'pending';

export interface SidebarItem {
  id: SidebarSection;
  label: string;
  icon: string; // icon name for simple rendering
  progress: number;
  status: SectionStatus;
  tab?: ActiveTab;
}
