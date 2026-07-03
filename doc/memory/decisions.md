# Registro de Decisiones de Arquitectura (ADR)

Este documento registra de forma estructurada las decisiones técnicas significativas tomadas en el proyecto, junto con su contexto, justificación e implicaciones.

## ADR 001: Desacoplamiento del Sistema de Agentes Virtuales de las Guías del Repositorio

- **Fecha**: 2026-07-03
- **Estado**: Aceptado
- **Contexto**: El archivo `AGENTS.md` original del repositorio mezclaba directrices de codificación para desarrolladores/IAs y especificaciones del sistema de simulación de agentes interactivos que se ejecuta _en el propio frontend_ (dentro de `src/agents`). Esto provocaba solapamientos de contexto en agentes LLM que modificaban el código.
- **Decisión**: Mover toda la documentación descriptiva y especificación técnica de la simulación de agentes a [src/agents/README.md](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/agents/README.md), dejando el archivo [AGENTS.md](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/AGENTS.md) de la raíz reservado estrictamente al flujo de trabajo, convenciones e instrucciones para agentes LLM en la fase de desarrollo.
- **Implicaciones**:
    - Mejor legibilidad tanto para humanos como para modelos.
    - Eliminación de falsos positivos en el prompt de la IA al leer directrices de desarrollo generales.
    - Estructura más limpia alineada con la arquitectura modular del código.

---

## ADR 002: Implementación de Spec-Driven Development

- **Fecha**: 2026-07-03
- **Estado**: Aceptado
- **Contexto**: Para evitar la degradación del diseño y código ad-hoc, se requiere un flujo estricto que obligue a especificar y planificar técnicamente antes de codificar.
- **Decisión**: Introducir el directorio [spec/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum typescrpit/spec/) con una Constitución inalterable (Misión, Stack y Roadmap) y subcarpetas para cada funcionalidad bajo `spec/features/`, utilizando el ciclo Specify -> Plan -> Tasks -> Implement -> Verify.
- **Implicaciones**:
    - Cualquier agente que trabaje en el repo estará anclado a la especificación, lo que reduce el riesgo de errores de diseño y malas interpretaciones.
    - Documentación técnica siempre actualizada en sincronía con el código fuente.

---

## ADR 003: Migración a Next.js (App Router) en modo estático

- **Fecha**: 2026-07-03
- **Estado**: Aceptado
- **Contexto**: El portafolio de origen usaba React 19 + Vite + React Router DOM. Para mejorar el rendimiento, carga de fuentes, SEO y la estructuración del código, el usuario solicitó migrar todo el proyecto a Next.js (App Router). Adicionalmente, al hospedarse en GitHub Pages, requiere compilación estática.
- **Decisión**: Migrar la lógica a Next.js (App Router) bajo la carpeta `app/`, estructurar componentes en Server/Client Components, inyectar el fondo 3D y simulaciones (Three.js, React Flow, React PDF) de forma segura en cliente para evitar fallos de hidratación, y definir la exportación estática con `output: 'export'`. Un script final en Node.js copia la salida `out/` a `dist/` para compatibilidad de despliegue en GitHub Pages de forma multiplataforma.
- **Implicaciones**:
    - Rendimiento optimizado con Server Components y fuentes precargadas localmente.
    - SEO robusto nativo mediante Metadata API, eliminando `react-helmet`.
    - Generación automática de `sitemap.xml` y `robots.txt` durante el build.
    - Compatibilidad continua con la acción de GitHub para despliegue automático.
