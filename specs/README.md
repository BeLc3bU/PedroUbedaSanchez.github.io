# 📚 Directorio de Especificaciones (`specs/`)

Este directorio contiene las especificaciones funcionales, planes técnicos y listas de tareas para cada funcionalidad del proyecto, siguiendo la metodología **Spec-Driven Development (SDD)** con Spec-Kit.

---

## 🗂️ Estructura de una Feature

Cada funcionalidad se organiza en una subcarpeta numerada:

```text
specs/
├── 000-ejemplo-autenticacion/     # Ejemplo de referencia
│   ├── spec.md                   # Especificación funcional y criterios de aceptación
│   ├── clarify.md                # Preguntas resueltas y decisiones
│   ├── plan.md                   # Plan de arquitectura técnica y diagramas
│   ├── tasks.md                  # Lista de tareas atómicas y ejecutables
│   └── checklist.md              # Validación de calidad y convergencia
└── 001-nombre-funcionalidad/     # Tu siguiente feature
```

---

## 🚀 Cómo Crear una Nueva Feature

### Opción 1: Con Comando del Agente

Escribe en el chat con tu IA:

```text
/speckit.specify
```

o indícale:

```text
Crea una nueva especificación para la funcionalidad [Nombre] con ID 001.
```

### Opción 2: Con Script Automatizado

- **En Windows (PowerShell)**:
    ```powershell
    .\.specify\scripts\create-feature.ps1 -FeatureId "001" -FeatureName "perfil-usuario"
    ```
- **En Linux / macOS (Bash)**:
    ```bash
    ./.specify/scripts/create-feature.sh 001 perfil-usuario
    ```

---

## 📊 Cómo Verificar el Estado de las Especificaciones

- **En Windows (PowerShell)**:
    ```powershell
    .\.specify\scripts\verify-spec.ps1
    ```
- **En Linux / macOS (Bash)**:
    ```bash
    ./.specify/scripts/verify-spec.sh
    ```
