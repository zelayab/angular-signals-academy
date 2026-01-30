# Signals Academy – Angular

Página interactiva educativa para aprender **Angular Signals** con ejemplos reales. Usa **Signals** para todo el estado de la UI (tabs, sección, búsqueda, modo enfoque, tema).

## ¿Qué es la app?

- **Lecciones**: Más de **130 lecciones** en 12 secciones (Inicio, Introducción, Fundamentos, Computed, Effects, Input/Output, RxJS, Patrones, Anti-patrones, Labs, Quiz, Recursos). Cada lección tiene definición, Cómo/Por qué/Cuándo/Con qué/Para qué, código, errores comunes, checklist, “Explícamelo como si tuviera 5” y mini desafío. **Filtro por tags** y **búsqueda** por texto. Muchas lecciones incluyen **“Probar en Lab”** para ir directo al Lab correspondiente.
- **Labs**: **7 laboratorios** interactivos (Contador, Lista filtrada, localStorage, Carrito, Formulario con validación, Theme switcher, Búsqueda y orden) con editor Monaco, preview embebido (StackBlitz) y “Abrir en StackBlitz”.
- **Quiz**: Módulos de preguntas (Fundamentos, Effects, Avanzado) con opciones, feedback y resultados.
- **Recursos**: Enlaces externos funcionales (documentación, blog, YouTube, RFC, Discord, GitHub, newsletter, X).

Todo el estado (tab activo, sección, búsqueda, modo enfoque, tema claro/oscuro, sidebar colapsado) está manejado con **Signals** en `AppStateService`.

## Cómo correrla

```bash
cd angular-signals-academy
npm install   # si no lo has hecho
npm start     # ng serve
```

Abre `http://localhost:4200`.

Build de producción:

```bash
npm run build
```

Los artefactos estarán en `dist/angular-signals-academy/browser/`.

## Deep-linking (URLs)

La app sincroniza el estado con la URL mediante **query params**:

- **`/?leccion=intro-1`** – Abre la pestaña Lecciones, la sección correspondiente y esa lección.
- **`/?lab=lab-1`** – Abre la pestaña Labs y el lab indicado.
- **`/?quiz=fundamentos`** – Abre la pestaña Quiz y ese módulo.

Al seleccionar una lección, ir a un lab o abrir un quiz desde una lección de tipo lab/quiz, la URL se actualiza para poder compartir el enlace.

## Angular Signals (resumen)

- **`signal(initialValue)`**: valor reactivo que se lee con `signal()` y se actualiza con `.set()` o `.update(fn)`.
- **`computed(() => ...)`**: valor derivado que se recalcula cuando cambian los signals que lee (lazy, solo cuando alguien lee el computed).
- **`effect(() => ...)`**: efecto secundario (logging, localStorage, DOM) que se ejecuta cuando cambian los signals que lee dentro del effect.

En esta app se usan signals para: tab/sección activa, búsqueda, modo enfoque, tema oscuro/claro, sidebar colapsado; y en los tabs para lección seleccionada, lab seleccionado, código del lab, índice de pregunta del quiz, respuestas, etc.

## Estructura del proyecto

- **`src/app/core`**: modelos, datos (`lessons.data`, `labs.data`, `resources.data`, `quiz.data`, `sidebar.data`) y servicios (`AppStateService`, `StackBlitzService`).
- **`src/app/core/data/lessons/`**: lecciones por sección. Cada sección tiene `sections/<seccion>.lessons.ts` (lista) y `sections/<seccion>.content.ts` (contenido detallado).
- **`src/app/components`**: `app-header`, `app-sidebar`, `mobile-nav`, `lesson-detail` y tabs `lessons-tab`, `labs-tab`, `quiz-tab`.
- **`src/app/shared`**: `icon`, `highlight-code.pipe`, `monaco-editor`.
- **`src/styles.scss`**: tema “Liquid Glass”, tags, skip link, focus visible, `prefers-reduced-motion`.

## Guía rápida de Labs

1. **Contador reactivo**: `signal(0)`, botones +/- y reset con `.update()` y `.set(0)`.
2. **Lista filtrada**: `signal` de items y `signal` de filtro; `computed` que filtra por el texto.
3. **localStorage**: `effect` que lee el signal de notas y hace `localStorage.setItem`.
4. **Carrito**: signals de ítems; `computed` para subtotal, IVA, total y cantidad.
5. **Formulario con validación**: signals para email/password; `computed` para isEmailValid, strength, canSubmit.
6. **Theme switcher**: `effect` que aplica clase al `document` según un signal `dark`.
7. **Búsqueda y orden**: `computed` que filtra y ordena una lista según query y sort.

En cada lab puedes editar el código en el editor, ejecutar “Aquí” para ver el preview embebido o “Abrir en StackBlitz” para trabajar en una pestaña externa.

## Tests

```bash
npm test
```

Tests unitarios (Karma + Jasmine) para `AppStateService`, `getTagColorClass` y utilidades de lecciones (`getSectionForLessonId`, `getLessonContent`, `LESSONS_BY_SECTION`). Para ejecutar una sola vez: `ng test --no-watch --browsers=ChromeHeadless`.

## Despliegue

Build de producción:

```bash
npm run build
```

La salida está en `dist/angular-signals-academy/browser/`. Puedes desplegarla en cualquier hosting estático (Vercel, Netlify, Firebase Hosting, GitHub Pages, etc.).

### PWA (opcional)

```bash
ng add @angular/pwa
```

---

Desarrollado con **Angular 21**, componentes **standalone** y **SCSS** (sin Tailwind). Sin NgRx; estado 100% con Signals. Accesibilidad: skip link, focus visible, `prefers-reduced-motion`.
