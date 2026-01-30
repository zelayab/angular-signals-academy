/**
 * Enlaces externos para la sección Recursos.
 * Cada recurso abre en nueva pestaña (target="_blank").
 */
export interface ExternalResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'docs' | 'blog' | 'video' | 'comunidad' | 'rfc' | 'github' | 'cursos' | 'social';
}

export const RESOURCES: ExternalResource[] = [
  {
    id: 'rec-docs',
    title: 'Documentación oficial: Angular Signals',
    description: 'Guía y API reference en angular.dev',
    url: 'https://angular.dev/guide/signals',
    category: 'docs',
  },
  {
    id: 'rec-api',
    title: 'API Reference: signal, computed, effect',
    description: 'Referencia técnica de la API de Signals',
    url: 'https://angular.dev/api/core/signal',
    category: 'docs',
  },
  {
    id: 'rec-blog',
    title: 'Angular Blog: Signals',
    description: 'Artículos y anuncios del equipo de Angular',
    url: 'https://blog.angular.dev',
    category: 'blog',
  },
  {
    id: 'rec-youtube',
    title: 'Angular YouTube',
    description: 'Charla y tutoriales en el canal oficial',
    url: 'https://www.youtube.com/@Angular',
    category: 'video',
  },
  {
    id: 'rec-rfc',
    title: 'RFC: Angular Signals',
    description: 'Discusión técnica sobre el diseño de Signals',
    url: 'https://github.com/angular/angular/discussions/49685',
    category: 'rfc',
  },
  {
    id: 'rec-discord',
    title: 'Angular Discord',
    description: 'Preguntas, ejemplos y ayuda de la comunidad',
    url: 'https://discord.gg/angular',
    category: 'comunidad',
  },
  {
    id: 'rec-github',
    title: 'Angular en GitHub',
    description: 'Repositorio oficial y ejemplos',
    url: 'https://github.com/angular/angular',
    category: 'github',
  },
  {
    id: 'rec-newsletter',
    title: 'Angular Newsletter',
    description: 'Resumen semanal de novedades',
    url: 'https://blog.angular.dev/newsletter',
    category: 'social',
  },
  {
    id: 'rec-twitter',
    title: 'Angular en X (Twitter)',
    description: 'Seguir al equipo y la comunidad',
    url: 'https://x.com/angular',
    category: 'social',
  },
];
