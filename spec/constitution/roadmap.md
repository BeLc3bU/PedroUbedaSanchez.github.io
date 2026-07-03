# Constitución del Proyecto: Roadmap y Mejoras Futuras

Este documento define la planificación oficial de las funcionalidades y mejoras en el portafolio.

## Prioridades y Características en Curso

### 1. Sistema de Validación del Formulario de Contacto

- **Estado**: Implementado.
- **Detalle**: Sustitución de estados nativos del formulario de contacto por `react-hook-form` + validaciones con `Zod`.

### 2. Suite de Testing y Cobertura

- **Estado**: En curso / Parcial.
- **Detalle**: Escribir pruebas unitarias para componentes críticos de UI (`Hero`, `TimelineItem`, `ProjectCard`) y custom hooks (`useTheme`, `usePrint`).

### 3. Animaciones y UX Premium

- **Estado**: Implementado.
- **Detalle**: Integración de transiciones entre páginas, animaciones de entrada en Bento grid y micro-interacciones hover mediante `framer-motion`.

## Funcionalidades Futuras Planificadas

### 4. Minijuego RPG 2D Embebido (Inspirado en Augusto Polonio)

- **Estado**: Pendiente.
- **Detalle**: Creación de un iframe con un juego RPG 2D en pixel art desarrollado en HTML5/Phaser, donde el usuario controla un personaje WASD e interactúa con NPCs que explican su currículum.

### 5. Optimización SEO

- **Estado**: Pendiente.
- **Detalle**: Creación de sitemap.xml dinámico, estructuración de JSON-LD Schema markup para el perfil profesional, y optimización de meta-tags Open Graph.

### 6. Analíticas Respetuosas con la Privacidad

- **Estado**: Pendiente.
- **Detalle**: Event tracking para clicks de proyectos y descarga del CV PDF mediante Vercel Analytics o Google Analytics 4.
