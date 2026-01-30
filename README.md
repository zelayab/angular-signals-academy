# Signals Academy

Página interactiva educativa para aprender **Angular Signals** con lecciones, labs y quizzes. Desarrollada con **Angular 21**, componentes **standalone**, **SCSS** y estado 100% con **Signals** (sin NgRx).

## ¿Qué incluye?

| Sección | Contenido |
|--------|------------|
| **Lecciones** | ~130 lecciones en 12 secciones: Inicio, Introducción, Fundamentos, Computed, Effects, Input/Output, RxJS, Patrones, Anti-patrones, Labs, Quiz, Recursos. Cada una con definición, Cómo/Por qué/Cuándo/Con qué/Para qué, código, errores comunes, checklist, “Explícamelo más simple” y mini desafío. Filtro por tags y búsqueda. Muchas incluyen **“Probar en Lab”**. |
| **Labs** | 7 laboratorios interactivos con editor Monaco y preview (StackBlitz): Contador, Lista filtrada, localStorage, Carrito, Formulario con validación, Theme switcher, Búsqueda y orden. |
| **Quiz** | 6 módulos de preguntas: Fundamentos, Effects, Computed, Input/Output + Signals, Anti-patrones, Patrones Avanzados. Selector por pills, feedback por pregunta y resultados al finalizar. |
| **Recursos** | Enlaces externos (documentación, blog, YouTube, RFC, Discord, GitHub, newsletter, X). |

El estado de la app (tab, sección, búsqueda, modo enfoque, tema claro/oscuro, sidebar) se gestiona con **Signals** en `AppStateService`.

## Cómo correrla

```bash
cd angular-signals-academy
npm install
npm start
```

Abre **http://localhost:4200**.

### Build de producción

```bash
npm run build
```

Salida en `dist/angular-signals-academy/browser/`.

## Deep-linking (URLs)

La app sincroniza estado con la URL mediante **query params**:

| URL | Acción |
|-----|--------|
| `/?leccion=intro-1` | Abre Lecciones, sección correspondiente y esa lección. |
| `/?lab=lab-1` | Abre Labs y el lab indicado (`lab-1` … `lab-7`). |
| `/?quiz=fundamentos` | Abre Quiz y ese módulo (`fundamentos`, `effects`, `computed`, `input-output`, `anti-patrones`, `avanzado`). |

Al elegir lección, lab o quiz, la URL se actualiza para poder compartir el enlace.

## Angular Signals (resumen)

- **`signal(valor)`**: valor reactivo; se lee con `signal()` y se actualiza con `.set()` o `.update(fn)`.
- **`computed(() => ...)`**: valor derivado que se recalcula cuando cambian los signals que lee (lazy).
- **`effect(() => ...)`**: efecto secundario (logging, localStorage, DOM) que se ejecuta cuando cambian los signals que lee.

En esta app se usan signals para: tab/sección, búsqueda, modo enfoque, tema, sidebar, lección/lab/quiz seleccionados, respuestas del quiz, etc.

## Estructura del proyecto

```
src/app/
├── core/           # Modelos, datos (lessons, labs, quiz, resources, sidebar), servicios (AppStateService, StackBlitzService)
├── components/     # app-header, app-sidebar, mobile-nav, lesson-detail, tabs (lessons-tab, labs-tab, quiz-tab)
├── shared/         # icon, highlight-code.pipe, monaco-editor
├── app.ts, app.html, app.routes.ts, app.config.ts
└── root.component.ts
```

- **Lecciones**: `core/data/lessons/sections/<seccion>.lessons.ts` (lista) y `<seccion>.content.ts` (contenido).
- **Estilos**: `src/styles.scss` — tema “Liquid Glass”, variables light/dark, skip link, focus visible, `prefers-reduced-motion`.

## Guía rápida de Labs

1. **Contador** — `signal(0)`, `.update()` y `.set(0)`.
2. **Lista filtrada** — `signal` de items + `signal` de filtro; `computed` que filtra.
3. **localStorage** — `effect` que hace `localStorage.setItem` al cambiar el signal.
4. **Carrito** — signals de ítems; `computed` para subtotal, IVA, total.
5. **Formulario con validación** — signals email/password; `computed` isEmailValid, canSubmit.
6. **Theme switcher** — `effect` que aplica clase al `document` según signal `dark`.
7. **Búsqueda y orden** — `computed` que filtra y ordena la lista.

En cada lab: editar código en el editor, “Ejecutar aquí” para preview embebido o “Abrir en StackBlitz” para abrirlo en una pestaña.

## Tests

```bash
npm test
```

Tests (Karma + Jasmine): `AppStateService`, `getTagColorClass`, lecciones (`getSectionForLessonId`, `getLessonContent`, `LESSONS_BY_SECTION`, contenido de lecciones nuevas). Una sola ejecución: `ng test --no-watch --browsers=ChromeHeadless`.

## Despliegue

Tras `npm run build`, la carpeta `dist/angular-signals-academy/browser/` se puede desplegar en cualquier hosting estático: **Vercel**, **Netlify**, **Firebase Hosting**, **GitHub Pages**, etc.

### PWA (opcional)

```bash
ng add @angular/pwa
```

## Publicar en GitHub

Si el repo aún no está en GitHub, en la raíz del proyecto está **`PUBLICAR_GITHUB.md`** con los pasos para crear el repositorio y hacer el primer `git push`.

---

**Stack:** Angular 21 · Standalone · SCSS (sin Tailwind) · Signals (sin NgRx) · Accesibilidad: skip link, focus visible, `prefers-reduced-motion`.
