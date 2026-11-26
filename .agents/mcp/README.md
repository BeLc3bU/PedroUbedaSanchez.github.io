# 🔌 Catálogo de Servidores MCP Esenciales

Este directorio documenta el **Pack de Servidores MCP (Model Context Protocol)** preconfigurado para **Elite Agent Bootstrap v2** y optimizado para **Antigravity**.

---

## 🛠️ Servidores Incluidos

| Servidor | Proveedor | Transporte | Propósito Principal | Variables de Entorno |
|---|---|---|---|---|
| **`chrome-devtools`** | Google | Stdio (Local) | Navegación autónoma, pruebas interactivas, inspección de consola y capturas visuales | Ninguna requerida por defecto |
| **`context7`** | Upstash | SSE / Remote | Consulta de documentación actualizada de librerías y APIs en tiempo real | `CONTEXT7_API_KEY` |
| **`github`** | GitHub | Stdio (Local) | Gestión de repositorios, creación de PRs, issues y ramas desde el agente | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **`figma`** | Figma | Stdio (Local) | Extracción de metadatos de diseño, tokens y maquetación fiel a componentes | `FIGMA_ACCESS_TOKEN` |
| **`supabase`** | Supabase | SSE / Remote | Gestión de bases de datos Postgres, SQL, autenticación y storage | `SUPABASE_ACCESS_TOKEN` (o login OAuth) |

---

## 🚀 Instalación y Sincronización Automática

Para instalar o fusionar estos servidores en tu configuración global de Antigravity (`~/.gemini/config/mcp_config.json`):

```bash
# Mediante alias directo:
install-mcp-pack

# O mediante el CLI del agente:
agent install-mcp-pack
```

> 🛡️ **Garantía Zero-Overwrite**: La instalación realiza una fusión no destructiva (*deep merge*). Cualquier clave de API preexistente (como `CONTEXT7_API_KEY`) o servidor customizado (como `jev-classifier`) se preserva intacto.

---

## 🔑 Configuración de Credenciales
Para servidores que requieren autenticación, define las variables en tu entorno de usuario del sistema (Windows/Linux/macOS) o en tu `.env` de confianza:
* `GITHUB_PERSONAL_ACCESS_TOKEN`: Token generado en [github.com/settings/tokens](https://github.com/settings/tokens) con permisos de `repo`.
* `FIGMA_ACCESS_TOKEN`: Token generado en los ajustes de tu cuenta de Figma.
* `SUPABASE_ACCESS_TOKEN`: Token de acceso personal generado en el dashboard de Supabase.
