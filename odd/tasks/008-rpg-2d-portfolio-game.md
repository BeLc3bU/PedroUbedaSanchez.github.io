# Feature: 008-rpg-2d-portfolio-game

## Objective and problem

Migrado desde especificación SDD original en spec/features/008-rpg-2d-portfolio-game.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# Especificación Funcional: Sustitución de Minijuego de Hangar por Juego 2D RPG de Portafolio

**Identificador**: `008-rpg-2d-portfolio-game`  
**Estado**: `Aprobado`  
**Fecha de Creación**: `2026-10-20`  
**Última Actualización**: `2026-10-20`  
**Autor/Agente**: `Elite Agent Bootstrap v2 (SDD)`

---

## 1. Resumen Ejecutivo y Objetivo

El objetivo de esta funcionalidad es sustituir el minijuego de cabina táctica espacial actual (`HangarGame.tsx`) por un juego de exploración y aventuras RPG 2D interactivo, inspirado en el diseño y arquitectura técnica de `augustopolonio/portfolio-game-2d` y adaptado al stack existente en `PedroUbedaSanchez.github.io` (Next.js 16 + React 19 + Tailwind CSS + Phaser 3).

El nuevo juego permitirá al usuario explorar un mapa tipo isla con áreas temáticas (Proyectos, Experiencia, Certificaciones y Contacto), interactuar con edificios y cofres para desplegar información real del portafolio en español e inglés, soportar controles tanto de escritorio (teclado) como móviles (joystick táctil + botón de acción), modo de pantalla completa y carga diferida (lazy load) para no penalizar el rendimiento ni el SEO del sitio web principal.

---

## 2. Historias de Usuario (User Stories)

### Historia 1: Exploración interactiva del portafolio en 2D

- **Como** visitante del portafolio,
- **Quiero** controlar un avatar en un mundo 2D interactivo con zonas diferenciadas para proyectos y trayectoria,
- **Para** conocer las habilidades y experiencia de Pedro de una forma entretenida, lúdica e interactiva.

#### Criterios de Aceptación (Given-When-Then)

- **Escenario 1.1: Inicio y carga bajo demanda**:
    - **Dado** que el usuario llega a la sección `#game` en la página principal,
    - **Cuando** ve la tarjeta del juego,
    - **Entonces** se muestra un panel con vista previa, descripción y botón de "Iniciar Juego / Jugar". Los recursos pesados de audio y escenas solo se inicializan al pulsar dicho botón.
- **Escenario 1.2: Movimiento e interacción en escritorio**:
    - **Dado** que el juego está en ejecución en escritorio,
    - **Cuando** el usuario presiona las teclas W/A/S/D o cursores,
    - **Entonces** el avatar se mueve con animación fluida de caminado y colisiones correctas con los límites y obstáculos del mapa.
- **Escenario 1.3: Interacción con elementos de información**:
    - **Dado** que el avatar se aproxima a un cartel, edificio o cofre interactivo,
    - **Cuando** presiona la tecla `E` o barra espaciadora,
    - **Entonces** se abre el diálogo/modal temático con la información detallada (resumen del proyecto, empresa, tecnologías, enlace a GitHub/web).

### Historia 2: Soporte móvil y modo pantalla completa

- **Como** usuario desde un teléfono móvil o tablet,
- **Quiero** contar con controles táctiles en pantalla y opción de pantalla completa,
- **Para** poder disfrutar de la experiencia del juego sin necesidad de teclado físico.

#### Criterios de Aceptación (Given-When-Then)

- **Escenario 2.1: Controles táctiles en móvil**:
    - **Dado** que se detecta un dispositivo táctil/móvil,
    - **Cuando** se inicia el juego,
    - **Entonces** se renderizan en pantalla un joystick virtual analógico para el movimiento y un botón de acción táctil para interactuar.
- **Escenario 2.2: Pantalla completa nativa**:
    - **Dado** que el juego está en ejecución,
    - **Cuando** el usuario pulsa el icono de pantalla completa,
    - **Entonces** el contenedor se expande en modo `requestFullscreen` manteniendo la relación de aspecto y ajustando la escala de Phaser.

---

## 3. Requisitos Funcionales y No Funcionales

### Requisitos Funcionales (RF)

- `[RF-01]`: Motor Phaser 3 integrado limpiamente mediante React 19 (`next/dynamic` con `ssr: false`).
- `[RF-02]`: Mapeo de escenas 2D basado en Tiled (`IslandScene`, `CastleScene` / `RoomScene`, `HUDScene`).
- `[RF-03]`: Sistema de diálogo e información modal para presentar: Proyectos, Experiencia, Habilidades y Contacto.
- `[RF-04]`: Soporte bilingüe sincronizado con el contexto de idioma del portafolio (`useLanguage`).
- `[RF-05]`: Controles duales: Teclado (WASD / Flechas + E) y controles virtuales en pantalla táctil (MobileControls).
- `[RF-06]`: Botón de alternancia de pantalla completa (`Fullscreen`) y botón de silenciar/activar audio.
- `[RF-07]`: Reemplazo limpio de los componentes heredados de `HangarGame.tsx` sin dejar código muerto.

### Requisitos No Funcionales (RNF)

- `[RNF-01] Rendimiento`: Zero overhead en el First Contentful Paint (FCP) del sitio web gracias a lazy loading de Phaser y audio.
- `[RNF-02] Compatibilidad`: Compatibilidad total con exportación estática (`output: 'export'`) y despliegue en GitHub Pages.
- `[RNF-03] Accesibilidad`: El usuario puede cerrar el juego en cualquier momento mediante la tecla `Escape` o botón de cierre accesible.
- `[RNF-04] Cero regresiones`: Todos los tests unitarios (`vitest`) y comprobaciones de ESLint deben pasar limpiamente.

---

## 4. Casos Límite y Reglas de Negocio (Edge Cases)

| ID        | Caso Límite / Condición                    | Comportamiento Esperado                                                                          |
| :-------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `[EC-01]` | Navegador bloquea autoplay de audio        | El audio permanece silenciado hasta el primer click/interacción del usuario.                     |
| `[EC-02]` | Cambio de orientación de pantalla en móvil | El listener de resize de Phaser ajusta el canvas (`game.scale.resize`) sin deformar los sprites. |
| `[EC-03]` | Salida de pantalla completa mediante ESC   | Se captura el evento `fullscreenchange` y se restaura el estado del botón en la UI de React.     |
| `[EC-04]` | Colisiones con bordes del mapa             | El personaje no debe poder salirse de los límites ni atravesar muros o agua.                     |

---

## 5. Fuera de Alcance (Out of Scope)

- Sistema multijugador online o sincronización backend en tiempo real.
- Combate o mecánicas complejas de combate/vida (el foco es exploración y visualización de CV).
- Modificación del diseño global del sitio web fuera de la sección y modal del juego.

---

## 6. Dependencias y Bloqueantes

- **Depende de**: Paquete `phaser` y assets gráficos 2D en `public/assets/game/`.
- **Bloquea a**: Despliegue de la versión subsiguiente del portafolio.

## Tasks

# Lista de Tareas Accionables: Sustitución por Juego 2D RPG de Portafolio

**Feature Ref**: `spec/features/008-rpg-2d-portfolio-game/spec.md` y `plan.md`  
**Progreso Total**: `[10 / 10 tareas completadas] (100%)`  
**Última Actualización**: `2026-10-21`

---

## Fases de Implementación

### Fase 1: Dependencias y Assets Gráficos

- [x] **`[TASK-001]`**: Instalar dependencias de Phaser y preparar estructura de assets 2D.
    - **Archivos**: `package.json`, `public/assets/game/`
    - **Dependencias**: Ninguna
    - **Criterio de Verificación**: `phaser` instalado y assets (sprites del personaje, tilesets y mapas) ubicados en `public/assets/game/`.

---

### Fase 2: Motor de Juego y Escenas Phaser

- [x] **`[TASK-002]`**: Implementar entidades, cargador de mapas y configuración base de Phaser.
    - **Archivos**: `lib/game/types.ts`, `lib/game/config.ts`, `lib/game/Player.ts`, `lib/game/TiledMapLoader.ts`
    - **Dependencias**: `TASK-001`
    - **Criterio de Verificación**: Tipos definidos y compilación sin errores de TypeScript.

- [x] **`[TASK-003]`**: Implementar escenas de Phaser (`IslandScene`, `InteriorScene`, `HUDScene`).
    - **Archivos**: `lib/game/scenes/IslandScene.ts`, `lib/game/scenes/InteriorScene.ts`, `lib/game/scenes/HUDScene.ts`
    - **Dependencias**: `TASK-002`
    - **Criterio de Verificación**: El jugador se mueve, colisiona con el entorno y dispara eventos al tocar objetos interactivos.

---

### Fase 3: Integración de UI, Controles Móviles y Datos Reales

- [x] **`[TASK-004]`**: Implementar controles móviles (`MobileControls.tsx`) y diálogo de información (`GameInfoDialog.tsx`).
    - **Archivos**: `components/game/MobileControls.tsx`, `components/game/GameInfoDialog.tsx`
    - **Dependencias**: `TASK-003`
    - **Criterio de Verificación**: El modal muestra los proyectos y experiencia real de Pedro al interactuar en el juego.

- [x] **`[TASK-005]`**: Conectar contenedor en React (`RPGGameContainer.tsx`), modal (`PortfolioGameModal.tsx`) y actualizar `components/GameSection.tsx`.
    - **Archivos**: `components/game/RPGGameContainer.tsx`, `components/game/PortfolioGameModal.tsx`, `components/GameSection.tsx`
    - **Dependencias**: `TASK-004`
    - **Criterio de Verificación**: El juego se abre fluidamente desde la sección principal y se destruye limpiamente al cerrar.

---

### Fase 4: Limpieza de Código Antiguo y Tests

- [x] **`[TASK-006]`**: Depurar y sustituir componentes antiguos de Hangar espacial y actualizar suite de tests unitarios.
    - **Archivos**: `components/game/HangarGame.tsx` (reemplazo/eliminación), `components/game/HangarGame.test.tsx` $\rightarrow$ `components/game/RPGGame.test.tsx`
    - **Dependencias**: `TASK-005`
    - **Criterio de Verificación**: Todos los tests en `npx vitest run` pasan al 100%.

---

### Fase 5: QA, Convergencia y Guardrails Finales

- [x] **`[TASK-007]`**: Ejecutar suite completa de verificación (`npm run lint`, `npm run build`, `npx vitest run`).
    - **Archivos**: Todo el workspace
    - **Dependencias**: Todas las tareas anteriores
    - **Criterio de Verificación**: 0 errores de ESLint, build de producción en `dist` generado con éxito y tests pasando.

---

### Fase 6: Enriquecimiento de Contenidos, Corrección Tipográfica y Optimización de Rendimiento

- [x] **`[TASK-008]`**: Completar las 6 experiencias del Castillo de Experiencia, refactorizar el modal de proyectos sin gamepad parpadeante, corregir el texto con caracteres corruptos y optimizar el rendimiento y fluidez del motor Phaser.
    - **Archivos**: `public/data/experiences.json`, `public/data/games.json`, `lib/game/InfoPanel.ts`, `lib/game/IslandScene.ts`, `lib/game/BaseScene.ts`, `components/game/PhaserGame.tsx`
    - **Dependencias**: `TASK-007`
    - **Criterio de Verificación**: Todos los escritorios y proyectos muestran información real en español; eliminación de solicitudes externas y parpadeo; framerate estable a 60 FPS con cámara lerp suave y sin mojibake.

---

### Fase 7: Filtrado Exclusivo de Repositorios de GitHub en Castillo de Proyectos

- [x] **`[TASK-009]`**: Actualizar datos de proyectos para mostrar única y exclusivamente repositorios de GitHub de BeLc3bU y contextualizar botón del modal.
    - **Archivos**: `public/data/games.json`, `lib/game/InfoPanel.ts`
    - **Dependencias**: `TASK-008`
    - **Criterio de Verificación**: Los 6 escritorios del Castillo de Proyectos corresponden a repositorios de GitHub válidos (`elite-agent-bootstrap`, `PedroUbedaSanchez.github.io`, `SeartchJobs`, `CommonPay`, `Suboficiales2026`, `test-Cabo1`), y el botón muestra 'Ver GitHub' dirigiendo a la URL del repositorio.

- [x] **`[TASK-010]`**: Actualizar la Mesa 6 del Castillo de Experiencia para mostrar Habilidades y Competencias en lugar de estudios previos.
    - **Archivos**: `public/data/experiences.json`
    - **Dependencias**: `TASK-009`
    - **Criterio de Verificación**: La mesa 6 muestra el panel de Habilidades & Competencias con capacidades clave y tecnologías alineadas con el portfolio.

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/008-rpg-2d-portfolio-game.md.
