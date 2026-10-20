# 📖 Guía de Integración Spec-Kit (SDD)

Este proyecto cuenta con la metodología **Spec-Driven Development (Spec-Kit)** para desarrollo con inteligencia artificial.

> **Nota**: Este archivo fue generado automáticamente para no sobreescribir el `README.md` original de tu proyecto.

---

## 🤖 ¿Cómo trabajar con la IA en este proyecto?

En el chat de tu IA (Cursor, Windsurf, Claude Code, Antigravity, VS Code), dispones de los siguientes comandos slash:

1. **`/speckit.specify`**: Describe lo que quieres construir. La IA creará `specs/XXX-feature/spec.md` con historias de usuario y criterios de aceptación.
2. **`/speckit.clarify`**: La IA detectará posibles lagunas o ambigüedades técnicas y te preguntará antes de avanzar.
3. **`/speckit.plan`**: Generará el diseño técnico, modelos de datos y diagramas en `specs/XXX-feature/plan.md`.
4. **`/speckit.tasks`**: Desglosará las tareas atómicas `[TASK-001]` en `specs/XXX-feature/tasks.md`.
5. **`/speckit.implement`**: Desarrollará el código tarea a tarea usando TDD.
6. **`/speckit.converge`**: Verificará que no haya errores de lint, tipos o pruebas antes de finalizar.

---

## 📂 Estructura Añadida

- **`.specify/`**: Contiene la constitución base (`memory/constitution.md`), plantillas y scripts.
- **`specs/`**: Carpeta donde se guardarán las especificaciones de cada funcionalidad.
- **`PROJECT_LOG.md`**: Registro inmutable de decisiones técnicas.
- **`.github/prompts/`**: Definición de los comandos `/speckit.*`.

---

## 🛠️ Comandos de Mantenimiento

- Validar especificaciones: `powershell .\.specify\scripts\verify-spec.ps1` (o `./.specify/scripts/verify-spec.sh`)
- Crear nueva spec: `powershell .\.specify\scripts\create-feature.ps1 -Name "mi-feature"`
