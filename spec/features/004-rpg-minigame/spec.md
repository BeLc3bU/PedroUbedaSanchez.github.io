# SPEC-004: Minijuego RPG 2D Embebido (Experiencia de Hangar & Agentes)

**Feature Branch**: `004-rpg-minigame`

**Created**: 2026-08-25

**Status**: Ready for Planning

**Input**: User description: "vamos a intentar el juego a ver que sale"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Acceso y Exploración del Hangar Retro 2D (Priority: P1)

Como visitante del portafolio web, quiero poder abrir un minijuego interactivo 2D de temática hangar tecnológico retro (pixel-art) y controlar a un avatar de Pedro Úbeda para explorar el entorno de manera fluida y responsiva.

**Why this priority**: Es el núcleo de la experiencia interactiva gamificada que sorprende al usuario ("wow factor") y sirve de base para el resto de interacciones lúdicas.

**Independent Test**: Puede abrirse la vista/sección o modal del juego, renderizar el mapa en Canvas 2D a 60 FPS y permitir desplazarse con teclado (WASD / Flechas) o botones en pantalla para móviles.

**Acceptance Scenarios**:

1. **Given** el usuario se encuentra en la página principal o pulsa "Explorar Hangar 2D" / ejecuta `game` en la terminal, **When** se inicia el juego, **Then** se muestra el lienzo del Canvas con el avatar en la posición inicial del hangar y controles listos.
2. **Given** el juego activo, **When** el usuario presiona las teclas W/A/S/D o los controles táctiles, **Then** el avatar se desplaza en las 4 direcciones con animación respetando las colisiones con los muros y objetos del hangar.

---

### User Story 2 - Interacción con Estaciones y Agentes Especializados (Priority: P2)

Como reclutador o visitante técnico, quiero acercarme a distintos NPCs / estaciones de trabajo (Agente Frontend, Agente DevOps/Aviónica, Terminal Central, Sala de Servidores) para detonar diálogos interactivos y descubrir facetas del currículum de Pedro.

**Why this priority**: Conecta el juego directamente con el objetivo profesional del CV, convirtiendo la gamificación en una herramienta de exploración de perfil.

**Independent Test**: Acercarse a una estación/NPC y presionar la tecla 'E', 'Espacio' o el botón de acción en pantalla para abrir un cuadro de diálogo tipado y conmutar información.

**Acceptance Scenarios**:

1. **Given** el avatar se encuentra a menos de 40px de una estación/agente con indicador flotante "[E] Interactuar", **When** presiona la tecla de acción, **Then** se congela el movimiento del avatar y se despliega un cuadro de diálogo con avatar del agente y texto explicativo en el idioma activo (ES/EN).
2. **Given** un diálogo abierto, **When** el usuario pulsa Continuar o 'E', **Then** avanza el texto y al finalizar se restaura el control de movimiento.

---

### User Story 3 - Integración Bidireccional con la Web (Terminal & i18n) (Priority: P3)

Como usuario del portafolio, quiero que el juego respete el idioma seleccionado (ES/EN), el tema visual de la web, y que pueda lanzarse o cerrarse fácilmente desde la interfaz o la Terminal CLI.

**Why this priority**: Mantiene la consistencia del sistema completo (i18n, terminal, arquitectura Next.js) sin romper el rendimiento de la aplicación.

**Independent Test**: Conmutar de idioma en la web y verificar que los textos del juego cambian de inmediato; invocar `game` en la Terminal y validar apertura.

**Acceptance Scenarios**:

1. **Given** el idioma configurado en Inglés, **When** se inicia el minijuego, **Then** todos los diálogos, HUD y controles se muestran en inglés.
2. **Given** la terminal abierta, **When** el usuario escribe `game` o `play`, **Then** la interfaz despliega la ventana del minijuego.

---

### Edge Cases

- ¿Qué ocurre en pantallas móviles o táctiles sin teclado físico?
    - El sistema detecta dispositivos táctiles y superpone un D-Pad virtual y botón de acción flotante semitransparente.
- ¿Qué ocurre si la pestaña pierde el foco o el usuario presiona Escape?
    - El bucle de juego pausa automáticamente el tiempo delta para evitar saltos bruscos y ofrece botón para pausar/reanudar o salir.
- ¿Cómo impacta en el rendimiento y bundle del sitio principal?
    - Carga diferida (`dynamic import` con `ssr: false`), spritesheets vectoriales y renderizado optimizado en Canvas 2D nativo sin dependencias pesadas adicionales (cero paquetes npm nuevos).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-004-1**: El sistema DEBE proveer un componente de juego 2D renderizado en HTML5 Canvas con bucle de animación a 60 FPS mediante `requestAnimationFrame`.
- **FR-004-2**: El avatar del jugador DEBE poder moverse en 4 direcciones (arriba, abajo, izquierda, derecha) con velocidad constante y detección de colisiones bounding-box bidimensionales.
- **FR-004-3**: El mapa DEBE representar un Hangar de Ingeniería Tecnológica con 4 zonas de interacción:
    1. _Estación de Aviónica & Hardware_ (Experiencia militar y sistemas críticos).
    2. _Laboratorio de Agentes & Software_ (Skills de desarrollo, TypeScript, Next.js, AI Agents).
    3. _Sala de Operaciones & Servidores_ (Infraestructura IT, redes, Active Directory).
    4. _Terminal de Mando_ (Logros, contacto y currículum).
- **FR-004-4**: El sistema DEBE soportar diálogos interactivos estilo RPG con máquina de estados (idle, typing, waiting_input, closed).
- **FR-004-5**: El juego DEBE estar 100% sincronizado con el sistema de internacionalización `useLanguage` (ES/EN).
- **FR-004-6**: La Terminal interactiva (`components/Terminal.tsx`) DEBE incorporar el comando `game` / `play` para lanzar el minijuego directamente.
- **FR-004-7**: Se DEBE incluir una tarjeta o sección interactiva accesible en `HomeContent.tsx` con botón para abrir el juego, controles en pantalla e instrucciones claras.

### Key Entities

- **PlayerState**: Coordenadas `(x, y)`, dirección cardinal (`up`, `down`, `left`, `right`), velocidad, estado de animación (`idle`, `walking`).
- **InteractiveZone**: Posición, dimensiones `(w, h)`, identificador de NPC/estación, etiqueta flotante, diálogo asociado (multilingüe).
- **GameDialog**: Título del hablante, avatar/icono, texto traducible, opciones de respuesta o cierre.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El motor en Canvas mantiene 60 FPS estables en navegadores de escritorio y móviles sin tirones (frametime < 16.6ms).
- **SC-002**: Tiempo de carga inicial del componente de juego inferior a 200ms mediante renderizado diferido (lazy loading).
- **SC-003**: 0 dependencias externas añadidas a `package.json`, utilizando la API nativa de Canvas 2D y TypeScript estricto.
- **SC-004**: 100% de los tests unitarios y validaciones del proyecto pasan con éxito (`npm run verify`).

## Assumptions

- No se requiere un motor de física complejo (la detección de colisiones AABB rectangulares es óptima y liviana).
- Los gráficos se renderizan procedimentalmente o mediante sprites vectoriales/pixel-art integrados en Canvas para evitar dependencias de red pesadas.
- El minijuego es accesible desde la página principal y desde la terminal para potenciar el engagement sin obligar a la navegación forzada.
