# Plan Técnico: SPEC-004 Minijuego RPG 2D Embebido

## 1. Arquitectura del Motor y Módulos

El minijuego se implementa con arquitectura limpia y modular en TypeScript utilizando Canvas 2D nativo sin dependencias de terceros:

1. **`lib/game/types.ts`**:
    - Definición de tipos: `GameState`, `Player`, `Position`, `Direction`, `InteractiveZone`, `DialogState`, `NpcCharacter`.

2. **`lib/game/engine.ts`**:
    - Motor de bucle de juego con `requestAnimationFrame` y delta time independiente de la tasa de refresco.
    - Bounding-box AABB collision manager.
    - Renderizador procedimental del Hangar espacial/tecnológico (baldosas de cuadrícula cibernética, estaciones de trabajo con luces de estado, terminales y avatar animado).

3. **`lib/game/dialogs.ts`**:
    - Estructura de diálogos bilingües (ES / EN) para las 4 estaciones temáticas:
        1. `avionics`: Aviónica militar, simuladores de vuelo, telemetría y sistemas críticos.
        2. `agents`: Ecosistema de agentes IA, arquitectura Next.js 16 y TypeScript.
        3. `infra`: Active Directory, administración de servidores, redes y soporte +20 años.
        4. `command`: Centro de mando general, enlace a CV en PDF y contacto.

4. **`components/game/HangarGame.tsx` & `components/game/HangarModal.tsx`**:
    - Componente visual interactivo con Canvas adaptable, HUD de controles (teclado + controles táctiles D-Pad para móviles), barra de interacción y ventana de diálogo modal RPG retro.
    - Carga diferida en cliente (`dynamic import` con `ssr: false`).

5. **Integración en la Aplicación**:
    - `components/HomeContent.tsx`: Añadir tarjeta/sección interactiva para lanzar el Hangar RPG 2D.
    - `components/Terminal.tsx`: Integrar comandos `game` y `play` para abrir el modal del minijuego desde la CLI.
    - `data/locales/es.ts` y `data/locales/en.ts`: Añadir traducciones para textos del minijuego, controles y diálogos.

## 2. Plan de Pruebas y QA

- **`lib/game/engine.test.ts`**: Tests unitarios de detección de colisiones, cálculo de movimiento y lógica de proximidad a estaciones.
- **`components/game/HangarGame.test.tsx`**: Tests de renderizado de Canvas, controles y apertura de diálogos.
- **Ciclo `npm run verify`**: Formato Prettier, ESLint, TypeScript compilation, Vitest y Next.js export build.
