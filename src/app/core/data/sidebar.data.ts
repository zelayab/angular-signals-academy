import type { SidebarItem } from '../models/sidebar.model';

export const SIDEBAR_SECTIONS: SidebarItem[] = [
  { id: 'inicio', label: 'Inicio', icon: 'home', progress: 0, status: 'pending' },
  { id: 'introduccion', label: 'Introducción', icon: 'book', progress: 100, status: 'completed' },
  { id: 'fundamentos', label: 'Fundamentos', icon: 'layers', progress: 80, status: 'in-progress' },
  { id: 'computed', label: 'Computed', icon: 'calculator', progress: 50, status: 'in-progress' },
  { id: 'effects', label: 'Effects', icon: 'sparkles', progress: 0, status: 'pending' },
  { id: 'input-output', label: 'Input/Output + Signals', icon: 'arrows', progress: 0, status: 'pending' },
  { id: 'rxjs', label: 'Integración con RxJS', icon: 'git-compare', progress: 0, status: 'pending' },
  { id: 'patrones', label: 'Patrones recomendados', icon: 'check-square', progress: 0, status: 'pending' },
  { id: 'anti-patrones', label: 'Anti-patrones', icon: 'x-square', progress: 0, status: 'pending' },
  { id: 'labs', label: 'Labs / Playground', icon: 'flask', progress: 25, status: 'in-progress', tab: 'labs' },
  { id: 'quiz', label: 'Quiz', icon: 'help-circle', progress: 0, status: 'pending', tab: 'quiz' },
  { id: 'recursos', label: 'Recursos', icon: 'file-text', progress: 0, status: 'pending' },
];
