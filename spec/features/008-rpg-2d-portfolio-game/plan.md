# Plan de Implementación Técnica: Sustitución por Juego 2D RPG de Portafolio

**Feature Ref**: `spec/features/008-rpg-2d-portfolio-game/spec.md`  
**Estado**: `Aprobado`  
**Arquitecto/Líder Técnico**: `Elite Agent Bootstrap v2 (SDD)`  
**Fecha de Aprobación**: `2026-10-20`

---

## 1. Arquitectura de la Solución

```mermaid
graph TD
    Page[app/page.tsx / HomeContent.tsx] --> GameSec[components/GameSection.tsx]
    GameSec --> Modal[components/game/PortfolioGameModal.tsx]
    Modal --> PhaserWrapper[components/game/RPGGameContainer.tsx (dynamic ssr:false)]

    PhaserWrapper --> Controls[components/game/MobileControls.tsx]
    PhaserWrapper --> PhaserEngine[Phaser.Game Instance]

    PhaserEngine --> Island[lib/game/scenes/IslandScene.ts]
    PhaserEngine --> Castle[lib/game/scenes/InteriorScene.ts]
    PhaserEngine --> HUD[lib/game/scenes/HUDScene.ts]

    Island --> TiledLoader[lib/game/TiledMapLoader.ts]
    TiledLoader --> Maps[public/assets/game/tiled/maps/*.json]
    TiledLoader --> Tilesets[public/assets/game/tiled/tilesets/*.png]

    PhaserEngine --> Emitter[Custom Events / Registry Bridge]
    Emitter --> ReactModal[components/game/GameInfoDialog.tsx]
    ReactModal --> Data[data/portfolio.tsx & data/locales/]
```

### Descripción de Componentes y Capas

1. **`components/GameSection.tsx`**: Sección con vista previa, banner temático y botón para lanzar el juego (bien dentro del modal o inline con pantalla completa).
2. **`components/game/PortfolioGameModal.tsx`**: Contenedor modal con cabecera de controles (silenciar audio, pantalla completa, cerrar).
3. **`components/game/RPGGameContainer.tsx`**: Componente cliente que inicializa la instancia `Phaser.Game`, gestiona el ResizeObserver y monta los controles móviles.
4. **`components/game/MobileControls.tsx`**: Joystick analógico virtual y botón táctil `ACTION` para móviles.
5. **`components/game/GameInfoDialog.tsx`**: Ventana modal interactiva en React que muestra la información detallada del hito/proyecto al interactuar con un objeto en el juego.
6. **`lib/game/scenes/`**:
    - `IslandScene.ts`: Mapa exterior con colisiones, vegetación, caminos y entradas a edificios.
    - `InteriorScene.ts`: Interior de los edificios (sala de proyectos, sala de trayectoria/experiencia).
    - `HUDScene.ts`: Escena de superposición para mensajes rápidos y botón de ayuda.
7. **`lib/game/TiledMapLoader.ts` y entidades**: Gestión de capas de Tiled, colisiones arcade y animación de movimiento del avatar (`Player.ts`).

---

## 2. Modelos de Datos e Interfaces

```typescript
export interface GameRoomObject {
    id: string;
    name: string;
    type: "project" | "experience" | "skills" | "contact" | "easter_egg";
    title: string;
    description: string;
    details?: {
        company?: string;
        period?: string;
        technologies?: string[];
        link?: string;
        repoLink?: string;
    };
}

export interface MobileInputState {
    x: number;
    y: number;
    interact: boolean;
}
```

---

## 3. Estrategia de Testing (TDD & Guardrails)

1. **Pruebas Unitarias (`vitest`)**:
    - `components/GameSection.test.tsx`: Verifica renderizado del botón de inicio y apertura del modal.
    - `components/game/MobileControls.test.tsx`: Verifica emisión de eventos táctiles en joystick y botón.
    - `lib/game/engine.test.ts`: Actualizado para verificar inicialización de configuración de Phaser y mapeo de datos de portafolio.
2. **Validación de Compilación y Tipado**:
    - `npx tsc --noEmit`
    - `npm run lint`
    - `npm run build`
3. **Verificación de Despliegue**:
    - Cero dependencias nativas incompatibles con el entorno del navegador.
    - Compatibilidad estricta con Next.js export (`out` $\rightarrow$ `dist`).

---

## 4. Consideraciones de Seguridad y Rendimiento

- **Lazy Loading**: `next/dynamic` carga los scripts y dependencias de Phaser sólo cuando el usuario decide jugar, manteniendo la página inicial ultraligera.
- **Optimización de Assets**: Mapas JSON y spritesheet PNG comprimidos en formato optimizado en `public/assets/game/`.
- **Limpieza de Recursos**: Desmontar adecuadamente la instancia de Phaser (`game.destroy(true)`) al cerrar el modal para liberar memoria y evitar memory leaks de WebGL/Canvas.

---

## 5. Dependencias y Paquetes

- **`phaser`** (v3.87+): Ya probado y validado en `C:\Proyectos\Juego 2d`. Se agrega al `package.json` del proyecto.
- **`phaser3-rex-plugins`**: Utilizado para estilos de texto BBCode opcionales, o bien renderizado reactivo de diálogos con React/Tailwind.
