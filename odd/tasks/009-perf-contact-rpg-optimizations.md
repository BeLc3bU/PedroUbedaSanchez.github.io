# Feature: 009-perf-contact-rpg-optimizations

## Objective and problem

Aprovechar las tecnologías actualizadas del proyecto (`Next.js 16.4`, `React 19.3`, `React Hook Form 7.92`, `Zod 4.6`, `@react-pdf/renderer 4.9`, `@react-three/fiber 9.8`, `Phaser 3.90`) para implementar tres mejoras de producción sin romper compatibilidad:

1. **Lazy loading real y reducción de carga inicial**: diferir la descarga/montaje de los bundles más pesados (`Phaser` ~1.28 MB, `@react-pdf/renderer` ~1.27 MB y `Three.js` ~882 KB).
2. **Formulario de contacto pulido (`Zod 4.6` + `React Hook Form 7.92`)**: validación progresiva en tiempo real (`onTouched`), mensajes de error localizados (`es`/`en`), contador de caracteres y accesibilidad completa (`htmlFor`, `aria-invalid`, `aria-describedby`, `role="alert"`).
3. **Optimización del minijuego RPG con Phaser (`3.90.0`)**: barra de progreso durante la carga de assets, persistencia local de progreso (llaves, cofres abiertos y bienvenida) con opción de reinicio, y controles táctiles móviles multitouch corregidos.

## Scope and constraints

- **Allowed edit surfaces**:
    - `components/GameSection.tsx`
    - `components/ClientBackground.tsx`
    - `app/cv/page.tsx`
    - `components/ContactForm.tsx`
    - `components/ContactForm.test.tsx`
    - `data/locales/es.ts`
    - `data/locales/en.ts`
    - `components/game/PortfolioGameModal.tsx`
    - `components/game/PhaserGame.tsx`
    - `components/game/MobileControls.tsx`
    - `components/game/MobileControls.css`
    - `components/game/RPGGame.test.tsx`
    - `lib/game/progressStorage.ts`
    - `lib/game/progressStorage.test.ts`
    - `lib/game/TiledMapLoader.ts`
    - `lib/game/IslandScene.ts`
    - `lib/game/ExperienceCastleScene.ts`
    - `lib/game/ProjectsCastleScene.ts`
- **Restricciones**: Sin nuevas dependencias en `package.json`. Compatibilidad total con React 19, Next.js static export (`output: "export"`) y suite Vitest/ESLint/TypeScript.

## Tasks

- [x] Auditar chunks y aplicar lazy loading real en `GameSection`, `ClientBackground` y `app/cv/page.tsx`.
- [x] Localizar validación Zod (`es`/`en`), añadir `onTouched`, contador y atributos ARIA en `ContactForm`.
- [x] Implementar `lib/game/progressStorage.ts` + tests unitarios y conectar con escenas Phaser y `PortfolioGameModal`.
- [x] Añadir indicador de progreso de carga en `TiledMapLoader` y escenas Phaser.
- [x] Corregir `MobileControls` (multitouch, `touchcancel`, `backdrop-filter`, doble disparo) y ampliar tests.
- [x] Ejecutar verificación (`prettier`, `lint`, `typecheck`, `vitest`, `build`).
