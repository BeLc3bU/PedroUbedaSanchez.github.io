# Feature: 007-hangar-tactico-evolution

## Objective and problem

Migrado desde especificación SDD original en spec/features/007-hangar-tactico-evolution.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# SPEC-007: Evolución del Hangar Táctico - Hub Interactivo y Navegable del Currículum

**Feature Branch**: `007-hangar-tactico-evolution`  
**Created**: 2026-08-26  
**Status**: In Review  
**Concepto Central**: _"Explora mi currículum como si estuvieras navegando por mi carrera profesional dentro de un hangar táctico."_

---

## 1. Contexto & Diagnóstico del Estado Actual

El Hangar actual está implementado como un minijuego 2D pixel-art embebido en un canvas HTML5 modal (`HangarGame.tsx`), con un avatar desplazable y 4 estaciones con cuadros de diálogo secuenciales.
Aunque funcional, presenta limitaciones clave respecto a la visión del producto:

1. **Desconexión con la navegación global**: La información se lee en diálogos modales estáticos sin capacidad de interactuar profundamente con las secciones reales del portafolio (proyectos, trayectoria en línea temporal, visualización/descarga de CV en PDF, formulario de contacto seguro).
2. **Metáfora táctica subutilizada**: No transmite completamente la sensación de un sistema de operaciones de ingeniería y aviónica militar de alta precisión (aviónica, cockpit, sistemas de misión, flight log, terminal técnica, telemetría).
3. **Dualidad interactiva limitada**: Carece de un selector fluido entre modo de exploración guiada e inmersiva y modo de acceso directo instantáneo para reclutadores que buscan datos concretos en segundos.

---

## 2. Visión del Producto y Principios Rectores

El Hangar Táctico no es un videojuego militar (cero armas, cero combate, cero niveles/XP artificiales). Es el **HUB INTERACTIVO DEL CURRÍCULUM** de Pedro Úbeda Sánchez.

### Principios Fundamentales:

- **Gamificar la navegación, no inventar un videojuego**: Todo elemento interactivo debe responder a: _"¿Esto ayuda al visitante a conocer mejor la trayectoria técnica y humana de Pedro?"_
- **Contenido 100% verídico y riguroso**: Datos reales basados estrictamente en sus +20 años en aviónica de combate, simuladores de vuelo, administración IT y desarrollo de software moderno.
- **Doble Modo (Inmersivo vs. Acceso Directo)**: El reclutador puede explorar libremente o saltar directamente a la sección mediante HUD / Telemetría.
- **Game Feel Táctico Profesional**: Feedback sonoro sutil (opcional y accesible), microanimaciones mecánicas precisas con Framer Motion, estética técnica de cockpit/HUD aeroespacial, cero latencia y tolerancia a fallos.
- **Accesibilidad Total (WCAG 2.1 AA)**: Soporte completo de teclado (`Tab`, `Enter`, `WASD`, `Arrows`, `Space`, `Escape`), modo `prefers-reduced-motion`, compatibilidad mobile/tablet y soporte offline/fallback.

---

## 3. Alcance del Proyecto

### En Alcance (IN-SCOPE):

- **Evolución del Hangar a un Centro Táctico Integral**:
    - Bahía de Aviónica & Hardware Crítico (Mantenimiento de electrónica de vuelo, simuladores FAS).
    - Cockpit & Identidad Profesional (Perfil, mentalidad militar de tolerancia cero a fallos).
    - Flight Log & Trayectoria (Timeline interactivo de misiones profesionales 2002-2026).
    - Mission Database (Catálogo interactivo de proyectos técnicos y software).
    - Mission Control & Reconocimientos (Certificaciones, Cruz del Mérito Aeronáutico, Cruz a la Constancia, DANA 2024).
    - Communications Array (Contacto táctico directo, enlaces a LinkedIn, GitHub y WhatsApp).
    - Briefing Room (Previsualización y descarga inmediata del CV Oficial en PDF con @react-pdf/renderer).
- **HUD Táctico T-AERO**:
    - Telemetría de estado del sistema (SYSTEM ONLINE, coordenadas, selector de subsistema).
    - Feedback sonoro sintético vía Web Audio API nativo (sin dependencias pesadas, <3KB, conmutador on/off y volumen).
    - Transiciones cinemáticas fluidas entre estaciones y modal de detalle.
- **Navegación Táctica Rápida (Direct Route Matrix)**:
    - Panel flotante para saltar a cualquier subsistema con un solo clic o atajo de teclado (`1`..`6`).
- **Integración Bidireccional Completa**:
    - Sincronización con i18n (`useLanguage` ES/EN).
    - Invocación desde Terminal (`hangar`, `tactical`, `flightlog`).

### Fuera de Alcance (OUT-OF-SCOPE):

- Mecánicas de combate, armas, enemigos o colisiones lesivas.
- Niveles, inventarios de objetos fantásticos, barras de salud o monedas.
- Dependencias pesadas o motores de juegos 3D de cientos de megabytes.

---

## 4. Usuarios y Casos de Uso

1. **Reclutador / Headhunter Tech**: Desea evaluar rápidamente si Pedro encaja en un rol sénior de infraestructura, sistemas o desarrollo frontend/fullstack. Busca acceso instantáneo a tecnologías, años de experiencia y CV en PDF.
2. **Director de Ingeniería / Tech Lead**: Desea comprobar la solidez técnica, capacidad de diseño de interacción, atención al detalle y rigurosidad en TypeScript y arquitectura.
3. **Visitante General / Colega de la Industria**: Quiere vivir una experiencia inspiradora, navegable y visualmente atractiva en un portfolio tecnológico diferenciado.

---

## 5. Riesgos y Mitigaciones

| Riesgo                                                        | Impacto | Mitigación                                                                                                                                                |
| :------------------------------------------------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Saturación visual o ruido de interfaz tipo "sci-fi exagerado" | Medio   | Paleta táctica oscura sobria (Sky Cyan `#38bdf8`, Emerald `#22c55e`, Amber `#f59e0b`, Slate `#0f172a`), tipografía monoespaciada legible y diseño limpio. |
| Inaccesibilidad en móviles                                    | Alto    | Layout adaptable con selector táctil directo y control D-Pad/Cards responsivo.                                                                            |
| Bloqueo por animaciones lentas                                | Alto    | Animaciones rápidas (150ms-250ms), botón de omisión instantánea y respeto estricto a `prefers-reduced-motion`.                                            |
| Carga de dependencias innecesarias                            | Alto    | Cero paquetes npm nuevos; utilización de Canvas 2D nativo, Framer Motion y Lucide Icons ya instalados.                                                    |

---

## 6. Criterios de Éxito

- **CS-1**: El 100% de la información profesional de Pedro es accesible desde el Hangar en menos de 2 clics.
- **CS-2**: El Hangar ofrece alternancia instantánea entre exploración interactiva y modo directo.
- **CS-3**: Renderizado a 60 FPS estables en Canvas y Framer Motion en desktop y mobile.
- **CS-4**: Bilingüe completo (Español / Inglés) conmutando en tiempo real sin recargar.
- **CS-5**: Cero regresiones en la suite de pruebas unitarias (`npx vitest run`) y verificación de compilación (`npm run build`).

## Tasks

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

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/007-hangar-tactico-evolution.md.
