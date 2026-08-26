# Desglose de Tareas: 007-hangar-tactico-evolution

Este archivo define la secuencia ordenada de tareas verificables e independientes requeridas para completar la evolución del Hangar Táctico.

---

## FASE 1: Motor & Infraestructura de Audio Táctico

- [x] **TASK-007-1: Crear Módulo de Audio Táctico Nativo (Web Audio API)**
    - **Objetivo**: Implementar `lib/game/audio.ts` con sintetizadores ligeros de ondas senoidales/triangulares para micro-feedback sonoro (hover, select, open, close, error) sin cargar archivos de audio externos.
    - **Requisitos**: REQ-FEEL-001, REQ-PERF-001
    - **Archivos**: `lib/game/audio.ts`, `lib/game/audio.test.ts`
    - **Verificación**: Tests unitarios de síntesis y fallback seguro en entornos sin AudioContext (SSR/Node).

---

## FASE 2: Telemetría & Componentes del HUD Táctico

- [x] **TASK-007-2: Implementar HUD Táctico T-AERO (`TacticalHUD.tsx`)**
    - **Objetivo**: Crear componente overlay con barra superior de telemetría (estado operacional, coordenadas en tiempo real, conmutador de audio, selector de idioma sincronizado con `useLanguage`, botón de salida).
    - **Requisitos**: REQ-HUD-001, REQ-A11Y-001
    - **Archivos**: `components/game/TacticalHUD.tsx`
    - **Verificación**: Renderizado responsivo y conmutación de estado.

- [x] **TASK-007-3: Implementar Matriz de Acceso Directo (Direct Route Dock)**
    - **Objetivo**: Añadir selector de estaciones tácticas con atajos de teclado (`1` a `4`) y botones rápidos para permitir que el reclutador salte instantáneamente a cualquier área del CV sin requerir desplazamiento manual del avatar.
    - **Requisitos**: REQ-HUD-002, REQ-NAV-002
    - **Archivos**: `components/game/TacticalHUD.tsx`, `components/game/HangarGame.tsx`
    - **Verificación**: Pruebas con teclado y clics.

---

## FASE 3: Enriquecimiento de Contenido y Acciones Rápidas

- [x] **TASK-007-4: Enriquecer Paneles de Estaciones con Acciones Profesionales**
    - **Objetivo**: Actualizar los paneles tácticos para incluir botones de acción directa en el Puente de Mando (descarga de CV en PDF mediante enlace a `/cv`, salto a formulario de contacto, enlaces a GitHub y proyectos destacados).
    - **Requisitos**: REQ-NAV-002, REQ-CONTENT-001
    - **Archivos**: `components/game/HangarGame.tsx`, `lib/game/dialogs.ts`
    - **Verificación**: Pruebas interactivas de descarga y navegación sin romper la experiencia.

---

## FASE 4: Pulido de Game Feel, Canvas 2D & Animaciones

- [x] **TASK-007-5: Pulido de Renderizado en Canvas 2D & Feedback Táctico**
    - **Objetivo**: Mejorar los halos de interacción en `renderGameScene`, añadir coordenadas en pantalla, suavizado de movimiento y scanlines CRT aeronáuticas.
    - **Requisitos**: REQ-FEEL-002, REQ-PERF-002
    - **Archivos**: `lib/game/engine.ts`
    - **Verificación**: Rendimiento a 60 FPS y cero fugas de memoria.

---

## FASE 5: Pruebas, Verificación Integral y QA

- [x] **TASK-007-6: Pruebas Unitarias de Regresión y Validación General**
    - **Objetivo**: Actualizar y ejecutar la suite de tests en Vitest (`npx vitest run`), linter (`npm run lint`) y compilación para producción (`npm run build`).
    - **Requisitos**: REQ-PERF-001, REQ-PERF-002
    - **Archivos**: `components/game/HangarGame.test.tsx`, `lib/game/engine.test.ts`
    - **Verificación**: `npm run verify` pasa al 100%.
