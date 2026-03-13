# Portfolio Interactivo - Pedro Úbeda Sánchez

Este repositorio contiene el portfolio personal de Pedro Úbeda Sánchez, desarrollado con una estética moderna inspirada en [Augusto Polonio](https://augustopolonio.vercel.app), destacando en desarrollo frontend, IT Infrastructure y Aviónica.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

## ✨ Características Principales

- **Diseño Augusto Polonio Style:** Hero section con avatar, terminal interactivo, animaciones suaves
- **CV/Resume Dinámico:** Generación de PDF con @react-pdf/renderer, vista previa y descarga
- **Arquitectura Moderna:** React 19 + TypeScript + Vite
- **Sistema de Agentes IA:** Framework de agentes especializados en `src/agents/`
- **Skills para Agentes:** 8 skills instaladas para desarrollo, testing, SEO, diseño
- **Terminal Interactivo:** Comandos para explorar el portfolio (about, hobbies, skills, projects, etc.)
- **Rendimiento Optimizado:** Vite 7 para builds instantáneos
- **Dark/Light Mode:** Tema switcher con soporte para ambos modos
- **SEO & Accesibilidad:** Metaetiquetas dinámicas, estructura semántica
- **Suite de Pruebas:** Vitest + React Testing Library

## 📂 Estructura del Proyecto

```
portfolio/
├── public/                 # Assets estáticos (imágenes, fuentes, etc.)
├── src/
│   ├── agents/            # Framework de Agentes IA
│   │   ├── core/         # Orchestrator, BaseAgent, types
│   │   └── specialized/   # FrontendAgent, TestingAgent, SeoAgent, etc.
│   ├── components/       # Componentes reutilizables
│   ├── hooks/           # Custom Hooks (useTheme, etc.)
│   ├── layout/          # Layout, Header, Footer
│   ├── pages/           # Páginas (Home, CV, Experience, etc.)
│   ├── data/            # Datos del portfolio (portfolio.tsx)
│   ├── lib/             # Utilidades
│   ├── App.tsx          # Configuración de rutas
│   └── main.tsx         # Punto de entrada
├── .opencode/
│   ├── skills/          # Skills para agentes
│   │   ├── vite-build/
│   │   ├── react-best-practices/
│   │   ├── frontend-design/
│   │   ├── seo-audit/
│   │   ├── systematic-debugging/
│   │   └── webapp-testing/
│   └── opencode.json    # Configuración de agentes
├── dist/                # Build de producción
├── AGENTS.md            # Directrices para agentes IA
├── MCPS.md              # Guía de MCPs recomendados
├── ROADMAP.md           # Roadmap de mejoras
└── package.json         # Dependencias y scripts
```

## 🚀 Cómo Empezar

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (gestor de paquetes)

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/pedroubeda/portfolio.git
   cd portfolio
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

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Ejecuta ESLint |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npx vitest` | Ejecuta tests en modo watch |

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

El proyecto está optimizado para desplegarse en GitHub Pages, Vercel o Netlify.

### GitHub Pages

1. Ejecuta `npm run build`
2. Sube el contenido de la carpeta `dist/` a tu rama de despliegue

## 🤖 Sistema de Agentes IA

Este proyecto incluye un framework de agentes IA ubicado en `src/agents/`:

| Agente | Descripción |
|--------|-------------|
| FrontendAgent | Desarrollo Frontend (React, TypeScript, Tailwind) |
| TestingAgent | Testing (Vitest, Playwright) |
| DesignAgent | Diseño UI/UX, animaciones |
| SeoAgent | SEO técnico, sitemap, schema markup |
| GameDevAgent | Portfolio game 2D (futuro) |
| AnalyticsAgent | Google Analytics, Vercel Analytics |

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

## 📅 Roadmap

Ver `ROADMAP.md` para ver las mejoras planned:
- ✅ Sistema de CV/Resume completado
- ✅ Sistema de Agentes implementado
- 🔄 Portfolio Game 2D (próximo)
- 🔄 SEO Avanzado
- 🔄 Analytics

---

*Desarrollado por Pedro Úbeda Sánchez*
