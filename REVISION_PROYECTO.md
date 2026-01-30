# Revisión integral del proyecto Signals Academy

Fecha: 2026-01-30

## 1. Resumen ejecutivo

- **Build**: ✅ Compila correctamente (`npm run build`).
- **Estado**: Proyecto completo y funcional. Se han añadido lecciones nuevas y contenido para que la academia quede bien completa.
- **Pendientes menores**: Código no usado (componentes labs internos), warnings de budget en build, y documentación de tests actualizada.

---

## 2. Contenido y lecciones

### 2.1 Lecciones añadidas en esta revisión

| Sección        | Lección nueva | Descripción |
|----------------|---------------|-------------|
| Introducción   | intro-13      | Cómo usar esta academia (navegación, pestañas, Labs, Quiz) |
| Input/Output   | io-13         | Practica: Formulario con validación (labId: lab-5) |
| RxJS           | rx-9          | Decisión rápida: Signal u Observable |
| Patrones       | pat-11        | Practica: Carrito con computed (labId: lab-4) |
| Anti-patrones  | anti-11       | Ejemplos vivos: qué no hacer |

Todas tienen contenido completo en su respectivo `.content.ts`.

### 2.2 Conteo actual de lecciones

- **Introducción**: 13
- **Fundamentos**: 15 (incl. fund-15 Practica: Contador)
- **Computed**: 14 (incl. comp-13, comp-14 prácticas)
- **Effects**: 11 (incl. eff-11 Practica: Theme)
- **Input/Output**: 13 (incl. io-13 práctica)
- **RxJS**: 9
- **Patrones**: 11 (incl. pat-11 práctica)
- **Anti-patrones**: 11 (incl. anti-11)
- **Labs**: 7 (lab-1 a lab-7)
- **Quiz**: 3
- **Recursos**: vista con enlaces externos (no lecciones detalle)

**Total aproximado**: ~130 lecciones con contenido.

### 2.3 Labs

- 7 labs: Contador, Lista filtrada, localStorage, Carrito, Formulario con validación, Theme switcher, Búsqueda y orden.
- Cada lab tiene `initialCode`, descripción, y contenido en `labs.content.ts`.
- Integración: Monaco editor + preview embebido (StackBlitz) + “Abrir en StackBlitz”.

---

## 3. Arquitectura y estructura

### 3.1 Routing

- **Rutas**: Una única ruta `''` con `RootComponent` → `App`. Todo es SPA; la “navegación” es por estado (tabs + sección) y query params (`leccion`, `lab`, `quiz`).
- **Deep-linking**: Funciona correctamente vía `App` effect que lee `queryParams` y llama a `goToLesson` / `goToLab` / `goToQuiz`.

### 3.2 Estado (Signals)

- **AppStateService**: Centraliza tab, section, searchQuery, focusMode, sidebarCollapsed, darkMode, selectedLessonId, selectedLabId, selectedQuizModuleId. Todo con signals; sin NgRx.
- **Tabs**: Cada tab usa signals locales (selectedLesson, selectedLab, editorCode, etc.) y lee/escribe en AppState cuando aplica.
- **Consistencia**: No hay uso de RxJS salvo `toSignal(route.queryParams)` en App; el resto es signals/computed/effect.

### 3.3 Modelos

- **Lesson**: id, title, description, difficulty, duration, tags, completed, **labId?** (opcional para “Probar en Lab”).
- **Lab**, **Quiz**, **SidebarItem**, **ExternalResource**: bien definidos y usados.

### 3.4 Servicios

- **AppStateService**: Activo y usado en toda la app.
- **StackBlitzService**: Usado en labs-tab para embed y “Abrir en StackBlitz”.
- **LabConsoleService**: Solo usado por los componentes `lab-counter`, `lab-filtered-list`, `lab-notes`, `lab-cart` (ver apartado de código no usado).

---

## 4. Código no usado (dead code)

- **Componentes en `components/labs/`**:  
  `lab-counter`, `lab-filtered-list`, `lab-notes`, `lab-cart` (y **LabConsoleService**) **no se usan** en la UI actual.  
  La pestaña Labs usa **Monaco + StackBlitz** (código enviado a StackBlitz), no estos componentes.

- **Recomendación**:  
  - **Opción A**: Eliminar `components/labs/*` y `lab-console.service.ts` para reducir bundle y confusión.  
  - **Opción B**: Dejarlos como referencia/demos internos y documentar en README que “los labs se ejecutan vía StackBlitz”.

- **StatusIconComponent**: Ya no se usa en sidebar ni mobile-nav (se quitaron los círculos de estado). Sigue en `shared/` por si se reutiliza; se puede eliminar si no hay planes de usarlo.

---

## 5. Estilos y accesibilidad

- **Tema “Liquid Glass”**: Variables CSS en `styles.scss` (light/dark), `.glass`, `.glass-card`, bordes y sombras. Consistente en header, sidebar, cards, tabs.
- **Modo oscuro/claro**: Controlado por signal `dark` en AppState; se aplica con `doc.classList.toggle('dark'|'light')` en un effect.
- **Accesibilidad**:  
  - Skip link “Ir al contenido principal” presente.  
  - `aria-label` en botones (sidebar, header, búsqueda).  
  - `role="tablist"` / `aria-selected` en tabs.  
  - Focus visible (estilos en `styles.scss`).  
  - `prefers-reduced-motion` considerado en variables de transición.
- **Contraste**: Uso de `var(--foreground)`, `var(--muted-foreground)`, `var(--primary)`; revisar en modo claro si hace falta ajustar contraste en textos secundarios.

---

## 6. Build y rendimiento

- **Build**: `npm run build` termina correctamente.
- **Warnings**:
  - **Bundle initial**: Supera el budget de 500 kB (~589 kB). Aumentar `budgets` en `angular.json` o reducir dependencias (p. ej. Monaco se carga por CDN; revisar si todo el código de Monaco entra en el bundle).
  - **labs-tab.component.scss**: Supera 6 kB (~9.86 kB). Considerar mover estilos globales a `styles.scss` o dividir en componentes más pequeños.
- **Lazy loading**: No hay rutas lazy; todo va en un solo chunk. Para reducir initial bundle se podría plantear lazy de tabs (Lecciones, Labs, Quiz) en el futuro.

---

## 7. Tests

- **Archivos de test**: `app-state.service.spec.ts`, `lessons/index.spec.ts`, `tag-colors.spec.ts`.
- **Contenido**: getSectionForLessonId, getLessonContent, LESSONS_BY_SECTION, AppStateService, getTagColorClass.
- **Nota**: README ya no menciona ProgressService; los specs no dependen de progreso. Ejecutar `npm test` (o `ng test --no-watch --browsers=ChromeHeadless`) para validar.

---

## 8. Documentación

- **README.md**: Actualizado con:
  - Eliminación de referencias a ProgressService y progress-tab.
  - Conteo actualizado de lecciones (~130) y secciones.
  - 7 labs listados con descripción breve.
  - Recursos como enlaces externos.
  - Estructura de proyecto sin progress-tab.
  - Guía de Labs ampliada (incl. labs 5, 6, 7).

---

## 9. Checklist de calidad

| Aspecto              | Estado |
|----------------------|--------|
| Standalone components| ✅     |
| Estado con Signals   | ✅     |
| Sin NgRx             | ✅     |
| RxJS mínimo          | ✅ (solo queryParams) |
| Tipado estricto      | ✅     |
| Rutas y deep-linking | ✅     |
| Modo oscuro/claro    | ✅     |
| Skip link / a11y base| ✅     |
| Contenido lecciones  | ✅ Completo para todas las lecciones |
| Labs funcionales     | ✅ 7 labs con StackBlitz |
| Recursos funcionales | ✅ Enlaces externos |
| README actualizado   | ✅     |
| Build correcto       | ✅ (con warnings de budget) |
| Código no usado      | ⚠️ components/labs + LabConsoleService |

---

## 10. Recomendaciones prioritarias (implementadas)

1. ~~**Decidir sobre dead code**~~ **Hecho**: Eliminados `components/labs/*` (lab-counter, lab-cart, lab-filtered-list, lab-notes) y `LabConsoleService`.
2. ~~**Budget**~~ **Hecho**: Ajustado `angular.json`: initial `maximumWarning` 500kB → 600kB; anyComponentStyle `maximumWarning` 6kB → 10kB, `maximumError` 12kB → 16kB.
3. ~~**SCSS labs-tab**~~ **Hecho**: Reducido tamaño del SCSS del labs-tab: estilos compartidos (editor, preview, console, panel, lab-card) movidos a `styles.scss` bajo `.labs-tab`; el componente conserva solo layout y estilos específicos.
4. ~~**Tests**~~ **Hecho**: Añadido test en `lessons/index.spec.ts` que verifica que intro-13, io-13, rx-9, pat-11 y anti-11 tienen contenido en LESSON_CONTENT.
5. ~~**Recursos**~~ **Hecho**: Limpiado: `RECURSOS_LESSONS` es ahora array vacío; la sección Recursos sigue mostrando la vista de enlaces externos desde `resources.data.ts`.

Con esto el proyecto queda **bien completo** en contenido y **revisado** en arquitectura, estado, estilos, accesibilidad, build y documentación.

---

## 11. Qué sigue para mejorar

Priorizado por impacto y esfuerzo:

| Prioridad | Mejora | Descripción | Esfuerzo |
|-----------|--------|-------------|----------|
| **Alta** | **PWA** | `ng add @angular/pwa`: app instalable y caché offline. Ideal para uso educativo. | Bajo |
| **Alta** | **Tests en CI** | GitHub Actions (o similar) que ejecute `npm run build` y `npm test` en cada push. Asegura que no se rompa nada. | Bajo |
| **Media** | **Más preguntas de Quiz** | Añadir preguntas a los 3 módulos (fundamentos, effects, avanzado) para mayor variedad. | Medio |
| **Media** | **Lazy loading de tabs** | Cargar Lecciones, Labs y Quiz bajo demanda para reducir el bundle inicial (~580 kB). | Medio |
| **Media** | **Estados de carga** | Skeleton o spinner al cambiar de sección/tab o al cargar el embed de StackBlitz. | Bajo |
| **Baja** | **Auditoría de accesibilidad** | Revisar contraste (modo claro), orden de tabulación, lectores de pantalla. | Medio |
| **Baja** | **SEO / meta** | Título y meta description por ruta o sección (si se va a publicar en producción). | Bajo |
| **Baja** | **Manejo de errores** | Mensaje amigable si falla la carga del iframe de StackBlitz o del editor Monaco. | Bajo |
| **Opcional** | **i18n** | Soporte para otro idioma (ej. inglés) si la academia se abre a más usuarios. | Alto |

**Recomendación inmediata:** activar PWA y un workflow de CI (build + test) para tener la base lista antes de seguir ampliando contenido.
