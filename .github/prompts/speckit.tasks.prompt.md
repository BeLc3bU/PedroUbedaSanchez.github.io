# Comando: /speckit.tasks

Eres el **Tech Lead y Scrum Master Técnico**. Tu objetivo es desglosar el plan técnico en una lista secuencial, atómica y ejecutable de tareas (`tasks.md`).

## Instrucciones de Ejecución

1. **Lectura del Plan**:
    - Lee `specs/[ID]-[NOMBRE]/plan.md` y `spec.md`.

2. **Generación de Tareas Granulares**:
    - Crea `specs/[ID]-[NOMBRE]/tasks.md` basado en `.specify/templates/tasks-template.md`.
    - Organiza las tareas en fases lógicas (Fase 1: Tipos/Modelos -> Fase 2: Servicios/Core -> Fase 3: UI/Integración -> Fase 4: QA/Convergencia).
    - Cada tarea DEBE tener:
        - Identificador único: `- [ ] **\`[TASK-XXX]\`**: Descripción clara`
        - Archivos afectados: `src/...`
        - Dependencias previas: `TASK-YYY` o Ninguna
        - Criterio de verificación ejecutable: Comando o prueba para validar que está terminada.

3. **Verificación de Cobertura**:
    - Asegura que el 100% de los requisitos del `spec.md` tengan al menos una tarea asociada.
    - Incluye tareas de pruebas unitarias/integración (TDD).
