# AGENTS.md - {{PROJECT_NAME}}

Este archivo define la gobernanza, comandos y orquestación de agentes de IA para este repositorio utilizando la metodología **Spec-Driven Development (Spec-Kit)**.

**REGLA DE ORO**: Toda la comunicación, documentación, mensajes de commit y Pull Requests DEBEN ser exclusivamente en **ESPAÑOL**.

---

## 🛠️ Comandos del Proyecto

| Comando             | Descripción                          |
| ------------------- | ------------------------------------ |
| `{{DEV_COMMAND}}`   | Iniciar servidor de desarrollo       |
| `{{BUILD_COMMAND}}` | Compilar para producción             |
| `{{LINT_COMMAND}}`  | Ejecutar linting y análisis estático |
| `{{TEST_COMMAND}}`  | Ejecutar suite de pruebas            |

---

## 🏗️ Rutas y Estructura

- **Código Fuente**: `{{SRC_PATH}}`
- **Componentes**: `{{COMPONENTS_PATH}}`
- **Especificaciones (SDD)**: `specs/`
- **Configuración Spec-Kit**: `.specify/`
- **Constitución del Proyecto**: `.specify/memory/constitution.md`
- **Memoria de Decisiones**: `PROJECT_LOG.md`

---

## 🔄 Flujo de Trabajo Spec-Kit (SDD)

Los agentes DEBEN seguir este pipeline para cada funcionalidad:

| Comando                 | Acción del Agente                                                 |
| ----------------------- | ----------------------------------------------------------------- |
| `/speckit.constitution` | Establece y valida los principios inmutables del proyecto         |
| `/speckit.specify`      | Crea la especificación funcional en `specs/XXX-feature/spec.md`   |
| `/speckit.clarify`      | Resuelve dudas, ambigüedades y casos límite con el usuario        |
| `/speckit.plan`         | Diseña el plan técnico y diagramas en `specs/XXX-feature/plan.md` |
| `/speckit.tasks`        | Desglosa tareas granulares con IDs `[TASK-XXX]` en `tasks.md`     |
| `/speckit.implement`    | Desarrolla las tareas secuencialmente con TDD                     |
| `/speckit.converge`     | Valida guardrails, actualiza logs y prepara el PR                 |

---

## 👥 Sistema de Agentes Especializados

| Agente                      | Responsabilidad                                         | Skills / Herramientas |
| --------------------------- | ------------------------------------------------------- | --------------------- |
| **Orchestrator**            | Coordinación global, supervisión de fases y delegación  | orchestrator-core     |
| **SpecAgent**               | Guardián de especificaciones, contratos y flujo SDD     | spec-kit              |
| **OptimizationAgent**       | Auditoría de rendimiento, bundle size y refactorización | performance-audit     |
| {{SPECIALIZED_AGENTS_LIST}} |

---

## 🛡️ Guardrails de Calidad (Innegociables)

1. **Zero Errors Policy**: Prohibido abrir PR o integrar si fallan tests, lint o tipado.
2. **Visual Proof**: Adjuntar evidencia visual (captura/video) para cambios en UI.
3. **Docs Sync**: Sincronizar `PROJECT_LOG.md` y `README.md` antes de cerrar cada hito.
4. **Releases Automáticas**: Commits en formato **Conventional Commits** en Español (`feat:`, `fix:`, etc.) para `release-please`.

---

## 🗺️ Plan de Fases del Proyecto

{{PHASE_PLAN_CHECKLIST}}
