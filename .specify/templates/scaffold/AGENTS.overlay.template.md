<!-- SPECKIT-INTEGRATION-START -->

## 🔄 Integración Spec-Driven Development (Spec-Kit)

Este proyecto ha integrado **Spec-Kit** para el desarrollo asistido por IA mediante contratos formales:

### Comandos SDD para Agentes de IA

| Comando                 | Acción                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `/speckit.constitution` | Consulta o valida los principios inmutables del proyecto (`.specify/memory/constitution.md`) |
| `/speckit.specify`      | Crea especificación funcional en `specs/XXX-feature/spec.md`                                 |
| `/speckit.clarify`      | Resuelve dudas y casos límite                                                                |
| `/speckit.plan`         | Diseña arquitectura técnica en `specs/XXX-feature/plan.md`                                   |
| `/speckit.tasks`        | Desglosa tareas atómicas en `specs/XXX-feature/tasks.md`                                     |
| `/speckit.implement`    | Escribe código guiado por pruebas                                                            |
| `/speckit.converge`     | Valida calidad y prepara el PR                                                               |

### Estructura SDD

- **Especificaciones**: `specs/`
- **Configuración y plantillas**: `.specify/`
- **Registro de decisiones**: `PROJECT_LOG.md`

<!-- SPECKIT-INTEGRATION-END -->
