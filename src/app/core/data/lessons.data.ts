/**
 * Punto de entrada único para lecciones.
 * Las lecciones están organizadas por sección en:
 *   core/data/lessons/sections/<seccion>.lessons.ts   → lista de lecciones
 *   core/data/lessons/sections/<seccion>.content.ts   → contenido detallado (opcional)
 * Para editar una lección, modifica el archivo correspondiente en lessons/sections/.
 */
export { LESSONS_BY_SECTION, getLessonContent, LESSON_CONTENT, getSectionForLessonId } from './lessons/index';
