# MCPs Recomendados para el Proyecto

## ¿Qué son los MCPs?

Los Model Context Protocols (MCPs) son extensiones que permiten a los agentes de IA acceder a herramientas y servicios externos. Son como "plugins" que añaden capacidades adicionales.

---

## MCPs Recomendados

### 1. Playwright MCP (Testing E2E)

**Descripción**: Automatización de navegador para testing E2E y web scraping.

**Instalación**:
```bash
npm install -g @playwright/mcp
```

**Configuración**:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

**Uso**:
- Testing E2E del portfolio game
- Verificación de funcionamiento después de cambios
- Automatización de pruebas en múltiples navegadores

---

### 2. GitHub MCP

**Descripción**: Integración con GitHub API para gestionar repositorios, issues, y más.

**Instalación**:
```bash
npm install -g github-mcp
```

**Configuración**:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

**Uso**:
- Gestión del repositorio del portfolio
- Crear releases automáticamente
- Gestión de issues

---

### 3. Tavily MCP (Búsqueda)

**Descripción**: Búsqueda web estructurada para investigación.

**Instalación**:
```bash
npm install -g tavily-mcp
```

**Configuración**:
```json
{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp"],
      "env": {
        "TAVILY_API_KEY": "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"
      }
    }
  }
}
```

**Uso**:
- Investigación de tendencias en desarrollo web
- Búsqueda de información técnica
- Staying updated con tecnologías

---

### 4. Puppeteer MCP

**Descripción**: Control de navegador headless para automatización.

**Instalación**:
```bash
npm install -g @hisma/server-puppeteer
```

**Configuración**:
```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@hisma/server-puppeteer"]
    }
  }
}
```

**Uso**:
- Testing visual del portfolio
- Screenshots automáticos
- Automatización de tareas web

---

## Configuración Global de MCPs

Para configurar MCPs globalmente en tu sistema, crea un archivo `mcp.json` en tu directorio de configuración:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp"],
      "env": {
        "TAVILY_API_KEY": "${TAVILY_API_KEY}"
      }
    }
  }
}
```

---

## Variables de Entorno Necesarias

Crea un archivo `.env` en tu proyecto:

```env
# GitHub
GITHUB_TOKEN=ghp_tu_token_de_github

# Tavily (para búsqueda)
TAVILY_API_KEY=tu_api_key_de_tavily
```

---

## MCPs para Futuros Proyectos

### Portfolio Game 2D

Cuando implementes el portfolio game 2D, considera añadir:

- **Godot MCP** - Si existe para controlar Godot engine
- **FFmpeg MCP** - Para procesamiento de video/audio
- **Redis MCP** - Para caché y estado del juego

---

## Recursos

- MCP Market: https://mcpmarket.com
- Lista de MCPs: https://github.com/topics/model-context-protocol
- Documentación oficial: https://modelcontextprotocol.io

---

## Recomendación para Este Proyecto

**Prioridad alta**:
1. **Playwright MCP** - Para testing E2E del portfolio game futuro
2. **GitHub MCP** - Para gestión automatizada del repositorio

**Prioridad media**:
3. **Tavily MCP** - Para investigación de tendencias

**Prioridad baja** (para futuro):
4. Puppeteer MCP - Para automatización adicional
