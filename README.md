# Portfolio Interactivo - Pedro Úbeda Sánchez

Este repositorio contiene el portfolio personal de Pedro Úbeda Sánchez, desarrollado con una estética moderna inspirada en [Augusto Polonio](https://augustopolonio.vercel.app), destacando en desarrollo frontend, IT Infrastructure y Aviónica.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

## ✨ Características Principales

- **Diseño Augusto Polonio Style:** Hero section con avatar, terminal interactivo, animaciones suaves
- **CV/Resume Dinámico:** Generación de PDF con @react-pdf/renderer, vista previa y descarga
- **Arquitectura Moderna:** React 19 + TypeScript + Vite 7
- **Sistema de Agentes IA:** Framework de agentes especializados en `src/agents/`
- **Skills para Agentes:** 8 skills instaladas para desarrollo, testing, SEO, diseño
- **Terminal Interactivo:** Comandos para explorar el portfolio (about, hobbies, skills, projects, etc.)
- **Rendimiento Optimizado:** Code splitting, bundle analyzer, imágenes WebP
- **Dark/Light Mode:** Tema switcher con soporte para ambos modos
- **SEO Avanzado:** sitemap.xml, robots.txt, JSON-LD Schema, Open Graph, Twitter Cards
- **Analytics:** Google Analytics 4 + Google Tag Manager con eventos de tracking
- **Suite de Pruebas:** Vitest + React Testing Library (30 tests)
- **Accesibilidad:** Skip-to-content, focus-visible, aria-labels, prefers-reduced-motion
- **Git Hooks:** Husky + lint-staged + Prettier

## 📂 Estructura del Proyecto

```
portfolio/
├── public/                 # Assets estáticos (imágenes, fuentes, etc.)
├── src/
│   ├── agents/            # Framework de Agentes IA
│   │   ├── core/          # Orchestrator, BaseAgent, types
│   │   └── specialized/   # FrontendAgent, TestingAgent, SeoAgent, etc.
│   ├── components/        # Componentes reutilizables
│   ├── hooks/             # Custom Hooks (useTheme, usePrint, useReducedMotion)
│   ├── layout/            # Layout, Header, Footer
│   ├── pages/             # Páginas (Home, CV, Experience, etc.)
│   ├── data/              # Datos del portfolio (portfolio.tsx)
│   ├── lib/               # Utilidades
│   ├── App.tsx            # Configuración de rutas
│   └── main.tsx           # Punto de entrada
├── .opencode/
│   ├── skills/            # Skills para agentes
│   │   ├── vite-build/
│   │   ├── react-best-practices/
│   │   ├── frontend-design/
│   │   ├── seo-audit/
│   │   ├── systematic-debugging/
│   │   └── webapp-testing/
│   └── opencode.json      # Configuración de agentes
├── .github/workflows/     # GitHub Actions
│   ├── deploy.yml         # Despliegue a GitHub Pages
│   ├── ci-tests.yml       # CI: tests, lint, typecheck
│   ├── release-please.yml # Releases automáticas
│   └── docs-check.yml    # Check de documentación
├── dist/                  # Build de producción
├── AGENTS.md              # Directrices para agentes IA
├── MCPS.md                # Guía de MCPs recomendados
├── ROADMAP.md             # Roadmap de mejoras
└── package.json           # Dependencias y scripts
```

## 🚀 Cómo Empezar

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (gestor de paquetes)

### Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/BeLc3bU/PedroUbedaSanchez.github.io.git
    cd PedroUbedaSanchez.github.io
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 🛠️ Scripts Disponibles

| Comando                | Descripción                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Inicia el servidor de desarrollo                               |
| `npm run build`        | Compila para producción (genera dist/stats.html para análisis) |
| `npm run preview`      | Previsualiza el build                                          |
| `npm run lint`         | Ejecuta ESLint                                                 |
| `npm run typecheck`    | Verifica tipos TypeScript                                      |
| `npm run format`       | Formatea código con Prettier                                   |
| `npm run format:check` | Verifica formato                                               |
| `npx vitest`           | Ejecuta tests en modo watch                                    |
| `npx vitest run`       | Ejecuta tests una vez                                          |

## 🧪 Testing

```bash
# Ejecutar todos los tests
npx vitest

# Ejecutar tests una vez
npx vitest run

# Ejecutar test específico
npx vitest src/components/TimelineItem.test.tsx
```

## ☁️ Despliegue

El proyecto se despliega automáticamente a GitHub Pages mediante GitHub Actions.

### Flujo de Despliegue

1. **Push a main** → Se ejecutan los workflows:
    - `ci-tests.yml` → Tests, lint, typecheck
    - `release-please.yml` → Crea Release PR automáticamente
    - `deploy.yml` → Despliega a GitHub Pages

### Releases Automáticas

El proyecto usa **release-please** para generar releases automáticas:

- Commits con `fix:` → Release patch (1.0.1)
- Commits con `feat:` → Release minor (1.1.0)
- Commits con `feat!:` → Release major (2.0.0)

## 🤖 Sistema de Agentes IA

Este proyecto incluye un framework de agentes IA ubicado en `src/agents/`:

| Agente         | Descripción                                       |
| -------------- | ------------------------------------------------- |
| FrontendAgent  | Desarrollo Frontend (React, TypeScript, Tailwind) |
| TestingAgent   | Testing (Vitest, Playwright)                      |
| DesignAgent    | Diseño UI/UX, animaciones                         |
| SeoAgent       | SEO técnico, sitemap, schema markup               |
| GameDevAgent   | Portfolio game 2D (futuro - repositorio separado) |
| AnalyticsAgent | Google Analytics, tracking de eventos             |

### Sub-Agentes OpenCode

Configurados en `.opencode/opencode.json`:

- react-expert, typescript-expert, testing-expert
- tailwind-expert, seo-expert, gamedev-expert
- analytics-expert, debug

## 📦 Skills Instaladas

Skills disponibles en `.opencode/skills/`:

- vite-build, react-testing, tailwind-styling
- react-best-practices, frontend-design, seo-audit
- systematic-debugging, webapp-testing

## 🔌 MCPs Recomendados

Para funcionalidades avanzadas, ver `MCPS.md`:

- Playwright MCP (testing E2E)
- GitHub MCP (automatización repo)
- Tavily MCP (investigación)
- Puppeteer MCP (automatización)

## 💻 Tecnologías

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite 7** - Build tool
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **@react-pdf/renderer** - Generación PDF
- **Vitest** - Testing
- **React Router v7** - Navegación
- **React Helmet** - Meta tags
- **Lucide React** - Iconos
- **Husky + lint-staged + Prettier** - Calidad de código

## 📅 Roadmap

Ver `ROADMAP.md` para ver el estado de las mejoras:

| #   | Item                    | Estado                              |
| --- | ----------------------- | ----------------------------------- |
| 5   | Portfolio Game 2D       | ⏳ Pendiente (repositorio separado) |
| 6   | SEO Avanzado            | ✅ Completado                       |
| 7   | Analytics y Tracking    | ✅ Completado                       |
| 8   | Testing                 | ✅ Completado                       |
| 9   | Animaciones Avanzadas   | ✅ Completado                       |
| 10  | Accesibilidad           | ✅ Completado                       |
| 11  | Git Hooks y Calidad     | ✅ Completado                       |
| 12  | Optimizaciones Técnicas | ✅ Completado                       |

---

_Desarrollado por Pedro Úbeda Sánchez_
