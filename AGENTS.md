# AGENTS.md - Directrices para Agentes de Código

Este archivo contiene las directrices para agentes de IA que operan en este repositorio de portfolio personal.

## Comandos de Construcción, Lint y Pruebas

### Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo Vite |
| `npm run build` | Compilar TypeScript + Vite build + copiar 404 |
| `npm run lint` | Ejecutar ESLint |
| `npm run preview` | Previsualizar build de producción |
| `npm run serve` | Previsualizar build de producción |
| `npm run typecheck` | Verificar tipos TypeScript |

### Ejecución de pruebas

| Comando | Descripción |
|---------|-------------|
| `npx vitest` | Ejecutar pruebas en modo watch |
| `npx vitest run` | Ejecutar pruebas una vez |
| `npx vitest src/components/TimelineItem.test.tsx` | Ejecutar un archivo de prueba específico |
| `npx vitest src/hooks/useTheme.test.ts --run` | Ejecutar prueba específica sin watch |

### Rutas del proyecto

- Código fuente: `src/`
- Build de producción: `dist/`
- Activos públicos: `public/`
- Configuración: raíz del proyecto
- Skills: `.opencode/skills/`
- Agentes: `src/agents/`

---

## Sistema de Agentes

### Agentes Especializados

Este proyecto cuenta con un sistema de agentes especializados ubicados en `src/agents/`:

```
src/agents/
├── core/
│   ├── Orchestrator.ts      # Orquestador de tareas
│   ├── BaseAgent.ts         # Clase base
│   └── types.ts            # Tipos TS
├── specialized/
│   ├── FrontendAgent.ts     # Desarrollo Frontend (React, TypeScript)
│   ├── TestingAgent.ts      # Testing (Vitest, Playwright)
│   ├── DesignAgent.ts       # Diseño UI/UX (Tailwind, animaciones)
│   ├── SeoAgent.ts          # SEO (sitemap, meta tags, schema)
│   ├── GameDevAgent.ts      # Desarrollo de juegos 2D (futuro)
│   └── AnalyticsAgent.ts    # Analytics (GA4, Vercel)
└── index.ts                # Configuración
```

### Descripción de Agentes

| Agente | Descripción | Skills |
|--------|-------------|--------|
| FrontendAgent | Desarrollo Frontend con React, TypeScript, Tailwind | react-best-practices, frontend-design, tailwind-styling |
| TestingAgent | Testing con Vitest y Playwright | webapp-testing, systematic-debugging |
| DesignAgent | Diseño UI/UX, Tailwind, animaciones | frontend-design, tailwind-design-system |
| SeoAgent | SEO técnico, sitemap, schema markup | seo-audit |
| GameDevAgent | Portfolio game 2D ( Augusto Polonio style) | game-development |
| AnalyticsAgent | Google Analytics, Vercel Analytics | analytics-tracking |

---

## Skills Disponibles

Este proyecto cuenta con skills personalizadas en `.opencode/skills/`:

| Skill | Descripción | Archivo |
|-------|-------------|---------|
| vite-build | Comandos de build y dev | `.opencode/skills/vite-build/SKILL.md` |
| react-testing | Testing con Vitest | `.opencode/skills/react-testing/SKILL.md` |
| tailwind-styling | Estilos Tailwind | `.opencode/skills/tailwind-styling/SKILL.md` |
| react-best-practices | Mejores prácticas React | `.opencode/skills/react-best-practices/SKILL.md` |
| frontend-design | Diseño UI/UX | `.opencode/skills/frontend-design/SKILL.md` |
| seo-audit | Optimización SEO | `.opencode/skills/seo-audit/SKILL.md` |
| systematic-debugging | Debug sistemático | `.opencode/skills/systematic-debugging/SKILL.md` |
| webapp-testing | Testing web apps | `.opencode/skills/webapp-testing/SKILL.md` |

---

## Sub-Agentes OpenCode

Configurados en `.opencode/opencode.json`:

| Sub-agente | Descripción |
|------------|-------------|
| react-expert | Especializado en React 19, hooks, React Router |
| typescript-expert | TypeScript, tipos, código type-safe |
| testing-expert | Vitest, Playwright, TDD |
| tailwind-expert | Tailwind CSS, diseño responsive |
| seo-expert | SEO técnico, sitemap, schema markup |
| gamedev-expert | Juegos 2D RPG, pixel art |
| analytics-expert | GA4, Vercel Analytics |
| debug | Investigación y debugging |

---

## Convenciones de Código

### Estructura de archivos

- Componentes en `src/components/`, `src/pages/`, `src/layout/`
- Hooks personalizados en `src/hooks/`
- Utilidades en `src/lib/`
- Datos en `src/data/`
- Tests junto al archivo fuente: `*.test.tsx`

### Convenciones de nomenclatura

- **Componentes**: PascalCase, export default (ej: `TimelineItem.tsx`)
- **Hooks**: camelCase con prefijo `use` (ej: `useTheme.ts`, `usePrint.ts`)
- **Utilidades**: camelCase (ej: `utils.ts`)
- **Constantes/Types**: PascalCase (ej: `Project`, `Experience`)
- **Archivos de test**: `*.test.tsx` o `*.spec.tsx`

### TypeScript

- Usar `interface` para props de componentes
- Usar `type` para tipos union, alias simples
- Usar `import type` cuando solo se necesite el tipo
- Definir tipos en el mismo archivo o en `types/` si son reutilizables
- Siempre tipar los props de componentes

```typescript
// ✅ Correcto
interface TimelineItemProps {
    title: string;
    subtitle: string;
    icon: string | ReactNode;
    children: ReactNode;
}

export default function TimelineItem({ title, subtitle, icon, children }: TimelineItemProps) {
    // ...
}
```

### React y Hooks

- Usar componentes funcionales con arrow functions o function declarations
- Preferir `useState`, `useEffect`, `useContext`, `useRef`
- Usar `useMemo` y `useCallback` solo cuando hay problema de rendimiento
- Crear hooks personalizados para lógica reutilizable
- Siempre incluir `key` en elementos de listas

### Imports

Orden recomendado:
1. React/core imports
2. Librerías externas (react-router, lucide-react, etc.)
3. Imports absolutos (@/...)
4. Imports relativos (../, ./)
5. Tipos (import type)

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

import { useTheme } from '@/hooks/useTheme';
import TimelineItem from '@/components/TimelineItem';
import type { Project } from '@/data/portfolio';
```

### Tailwind CSS

- Usar enfoque mobile-first
- Soporte dark mode con prefijo `dark:`
- Usar clases de utilidad composables
- Separar clases con espacios, mantener orden lógico
- Usar tokens de color: `cyan-400`, `cyan-600`, `cyan-700`
- Usar `text-accent-gradient` para texto con gradiente
- Usar `bg-grid-pattern` para fondos con patrón

```tsx
// ✅ Correcto
<div className="card-tech animate-in fade-in duration-1000">
    <h3 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
        <span className="text-cyan-600 dark:text-cyan-400">
            {icon}
        </span>
    </h3>
</div>
```

### Convenciones de estilo

- Usar indentación con 4 espacios
- Comillas simples para strings en JSX
- Punto y coma al final de statements
- Máximo ~100-120 caracteres por línea
- Agrupar imports relacionados
- Una línea en blanco entre grupos de imports

---

## Patrones de Testing

### Estructura de tests

- Usar Vitest con describe/it/expect
- @testing-library/react para componentes
- @testing-library/jest-dom para matchers
- Mocks con `vi.fn()` de Vitest

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useTheme hook', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';
    });

    it('should default to light theme', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light');
    });
});
```

### Mejores prácticas de testing

- Tests deben ser independientes entre sí
- Limpiar estado en beforeEach
- Mockear APIs externas (localStorage, matchMedia, fetch)
- Nombrar tests descriptivamente: "debería hacer X cuando Y"
- Un archivo de test por cada archivo de código

---

## Manejo de Errores

- Usar try/catch para operaciones asíncronas
- Mostrar mensajes de error claros al usuario
- Logging apropiado sin exponer datos sensibles
- Validar inputs con Zod cuando sea necesario

---

## Configuración del Proyecto

- **Vite**: `vite.config.ts` - plugins React, path alias
- **TypeScript**: `tsconfig.app.json` - configuración de compilación
- **ESLint**: `eslint.config.js` - reglas de linting
- **Tailwind**: `tailwind.config.js` - configuración de themes
- **Vitest**: `vitest.config.ts` - configuración de tests
- Path alias: `@/` apunta a `src/`

---

## Inspiración: Augusto Polonio

Este portfolio está inspirado en el diseño de [Augusto Polonio](https://augustopolonio.vercel.app):

### Características adoptadas
- Hero section con foto avatar (arriba centrado)
- Terminal interactivo para explorar contenido
- Esquema de colores minimalista
- Animaciones suaves
- Social links en hero section
- Grid de tarjetas de proyectos
- Botón de CV/Resume con icono de documento

### Referencias
- Web: https://github.com/augustopolonio/augustopolonio-website
- Juego 2D: https://github.com/augustopolonio/portfolio-game-2d

---

## Roadmap: Funcionalidades Futuras

### Portfolio Game 2D (Pendiente)
- Juego estilo RPG embebido (iframe)
- Personaje con controles WASD
- NPCs con información del portfolio
- Pixel art tilesets
- Música de fondo (Suno AI)

### Mejoras SEO
- sitemap.xml dinámico
- robots.txt
- JSON-LD schema markup
- Open Graph tags

### Analytics
- Google Analytics 4
- Vercel Analytics
- Event tracking

---

## MCPs Recomendados

Este proyecto recomienda los siguientes Model Context Protocols (MCPs):

### MCPs de Alta Prioridad

| MCP | Descripción | Paquete |
|-----|-------------|---------|
| Playwright MCP | Testing E2E y automatización de navegador | `@playwright/mcp` |
| GitHub MCP | Integración con GitHub API | `github-mcp` |

### MCPs de Prioridad Media

| MCP | Descripción | Paquete |
|-----|-------------|---------|
| Tavily MCP | Búsqueda web estructurada | `tavily-mcp` |
| Puppeteer MCP | Control de navegador headless | `@hisma/server-puppeteer` |

### Configuración

Ver archivo `MCPS.md` para instrucciones de instalación y configuración.

---

## Recursos útiles

- React 19: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Vitest: https://vitest.dev
- Testing Library: https://testing-library.com
- Lucide React (iconos): https://lucide.dev
- Skills.sh: https://skills.sh
- MCP Market: https://mcpmarket.com
- Augusto Polonio: https://augustopolonio.vercel.app
