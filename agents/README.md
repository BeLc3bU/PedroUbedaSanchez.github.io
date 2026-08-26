# Sistema de Agentes del Portafolio

Este directorio contiene el código y la lógica de simulación para el sistema de agentes virtuales especializados que se muestran y ejecutan dentro del portafolio interactivo.

## Estructura del Sistema

```
src/agents/
├── core/
│   ├── Orchestrator.ts      # Orquestador de tareas en la UI
│   ├── BaseAgent.ts         # Clase base para agentes virtuales
│   └── types.ts            # Tipos de TypeScript
├── specialized/
│   ├── FrontendAgent.ts     # Agente virtual de Frontend
│   ├── TestingAgent.ts      # Agente virtual de Testing
│   ├── DesignAgent.ts       # Agente virtual de Diseño UI/UX
│   ├── SeoAgent.ts          # Agente virtual de SEO técnico
│   ├── GameDevAgent.ts      # Agente virtual de Desarrollo de Juegos
│   └── AnalyticsAgent.ts    # Agente virtual de Analytics
└── index.ts                # Configuración e inicialización del sistema
```

## Agentes Especializados Virtuales

| Agente             | Descripción                                                         | Habilidades Simuladas                                   |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------- |
| **FrontendAgent**  | Desarrollo Frontend con React, TypeScript y Tailwind CSS            | react-best-practices, frontend-design, tailwind-styling |
| **TestingAgent**   | Diseño y ejecución de pruebas con Vitest y Playwright               | webapp-testing, systematic-debugging                    |
| **DesignAgent**    | Diseño de interfaces de usuario, layouts interactivos y animaciones | frontend-design, tailwind-design-system                 |
| **SeoAgent**       | Auditorías de SEO técnico, estructura de metadatos y schemas        | seo-audit                                               |
| **GameDevAgent**   | Desarrollo de la experiencia de juego RPG 2D integrada              | game-development                                        |
| **AnalyticsAgent** | Configuración de analíticas e integración con GA4 / Vercel          | analytics-tracking                                      |

## Funcionalidades Futuras (Roadmap del Sistema)

### Portfolio Game 2D

- Integrar un minijuego RPG 2D embebido.
- Controles del personaje interactivo mediante teclas WASD.
- Interactuación con NPCs representados por cada uno de estos agentes virtuales.
