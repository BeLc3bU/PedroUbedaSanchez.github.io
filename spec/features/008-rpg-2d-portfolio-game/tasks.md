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
