# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

---

## 🚀 Inicio Rápido

### Requisitos Previos

- {{PREREQUISITES}}

### Instalación

```bash
{{INSTALL_COMMAND}}
```

### Desarrollo Local

```bash
{{DEV_COMMAND}}
```

### Compilación para Producción

```bash
{{BUILD_COMMAND}}
```

### Pruebas y Calidad

```bash
{{TEST_COMMAND}}
{{LINT_COMMAND}}
```

---

## 🏗️ Arquitectura y Estructura del Proyecto

```text
{{PROJECT_TREE}}
```

- **`src/`**: Código fuente principal de la aplicación.
- **`specs/`**: Especificaciones funcionales y técnicas según la metodología **Spec-Driven Development (SDD)**.
- **`.specify/`**: Plantillas, constitución y scripts del ciclo de vida SDD.
- **`PROJECT_LOG.md`**: Registro inmutable de decisiones de arquitectura y memoria del proyecto.

---

## 🤖 Desarrollo Guiado por IA (Spec-Driven Development)

Este proyecto utiliza **Spec-Kit** para el desarrollo asistido por Inteligencia Artificial. Los agentes de IA siguen contratos formales en Markdown antes de implementar código:

| Comando                 | Función                                                  |
| ----------------------- | -------------------------------------------------------- |
| `/speckit.constitution` | Consulta o ajusta los principios inmutables del proyecto |
| `/speckit.specify`      | Crea la especificación funcional de una nueva feature    |
| `/speckit.clarify`      | Resuelve dudas y casos límite antes de diseñar           |
| `/speckit.plan`         | Genera la arquitectura técnica y contratos               |
| `/speckit.tasks`        | Desglosa la lista atómica de tareas `[TASK-XXX]`         |
| `/speckit.implement`    | Escribe el código paso a paso con TDD                    |
| `/speckit.converge`     | Valida calidad (cero errores) y prepara el Pull Request  |

---

## 🛡️ Estándares de Calidad

- **Zero Errors**: Cero errores en tests, linting y chequeo de tipos.
- **Commits**: Formato Conventional Commits en español (`feat:`, `fix:`, `refactor:`, `docs:`).

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
