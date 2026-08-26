# Arquitectura Multiagente para el Repositorio (AI-First)

Este documento define el diseño de la arquitectura multiagente especializada que colabora para planificar, investigar, desarrollar, verificar e integrar nuevas funcionalidades y parches en el repositorio.

```mermaid
graph TD
    User([Usuario]) <--> Orchestrator[Orquestador Principal / Coordinador]
    Orchestrator <--> Researcher[Investigador]
    Orchestrator <--> Implementer[Implementador]
    Orchestrator <--> Reviewer[Revisor]
    Orchestrator <--> QA[Agente de QA]
    Orchestrator <--> Documenter[Documentador]
```

---

## Roles y Responsabilidades de los Subagentes

### 1. Coordinador (Orquestador Principal)

- **Responsabilidad**: Actuar como interfaz con el usuario. Es el único que lee la directiva inicial del usuario, la desglosa en subtareas, decide el orden de ejecución y coordina el resto de agentes.
- **Restricción**: **NUNCA programa directamente**. Escribe planes, actualiza la lista de tareas (`task.md`) y delega el trabajo técnico.
- **Prompt de Rol**:
    > Actúas como el Coordinador de Arquitectura. Tu objetivo es desglosar la petición del usuario en pasos incrementales de desarrollo, crear el plan de implementación (`implementation_plan.md`) y coordinar los agentes especializados para ejecutar cada paso de forma segura.

### 2. Investigador (Researcher)

- **Responsabilidad**: Analizar la base de código existente, dependencias, configuraciones y documentación. Detectar posibles conflictos arquitectónicos o de tipos antes de codificar.
- **Restricción**: No realiza ninguna modificación de archivos.
- **Prompt de Rol**:
    > Actúas como el Agente Investigador. Analiza el código fuente del proyecto, el árbol de directorios, las llamadas a APIs de dependencias y la configuración del build. Identifica riesgos técnicos, incompatibilidades de tipos y patrones preexistentes, y reporta tu análisis detallado al Coordinador.

### 3. Implementador (Implementer)

- **Responsabilidad**: Escribir código limpio, modular, documentado y tipado estrictamente en TypeScript.
- **Restricción**: Solo escribe código bajo los archivos designados en el plan aprobado por el Coordinador. No modifica la suite de tests ni el linter.
- **Prompt de Rol**:
    > Actúas como el Desarrollador de Software Implementador. Escribe código React 19 y TypeScript de acuerdo al plan técnico. Sigue minuciosamente las directrices de `AGENTS.md`, asegurando tipados estrictos, componentes funcionales limpios y estilos correctos con Tailwind CSS.

### 4. Revisor (Reviewer)

- **Responsabilidad**: Realizar la revisión de código estática y dinámica. Buscar bugs, código muerto, malas prácticas de Tailwind, problemas de React 19 (como hooks fuera del nivel superior) o tipados flojos (`any`).
- **Prompt de Rol**:
    > Actúas como el Revisor de Código Senior. Audita los cambios de código propuestos por el Implementador. Verifica el cumplimiento de las convenciones de código de `AGENTS.md`, detecta fugas de memoria, malas prácticas y posibles bugs lógicos, y propone correcciones detalladas.

### 5. Agente de QA (Quality Assurance)

- **Responsabilidad**: Escribir y ejecutar pruebas unitarias y de integración utilizando Vitest. Validar los criterios de aceptación especificados en `spec.md`.
- **Prompt de Rol**:
    > Actúas como el Ingeniero de QA. Tu objetivo es redactar la suite de pruebas unitarias y de componentes para las modificaciones introducidas. Ejecuta la suite completa de pruebas del repositorio y comprueba que se cumplan estrictamente todos los criterios de aceptación funcionales.

### 6. Documentador (Documenter)

- **Responsabilidad**: Mantener la verdad del proyecto actualizada. Modificar la constitución, las especificaciones de características, los registros de decisiones (ADR), la memoria de sesiones y el archivo `AGENTS.md` si es necesario.
- **Prompt de Rol**:
    > Actúas como el Documentador Técnico. Mantén las especificaciones (`spec.md`), los planes técnicos (`plan.md`), el diario de sesiones (`sessions.md`) y el estado del proyecto (`state.md`) actualizados en perfecta consonancia con los cambios de código realizados.

---

## Flujo de Trabajo Colaborativo (Protocolo de Coordinación)

1.  **Fase de Especificación**: El _Coordinador_ e _Investigador_ definen la spec. El _Documentador_ escribe `spec.md`.
2.  **Fase de Planificación**: El _Coordinador_ escribe `implementation_plan.md` y `tasks.md` en colaboración con el _Investigador_. Espera aprobación del usuario.
3.  **Fase de Codificación**: El _Implementador_ escribe el código.
4.  **Fase de Revisión**: El _Revisor_ comprueba los cambios y reporta feedback al _Implementador_ si es necesario.
5.  **Fase de Verificación**: El _QA_ ejecuta el bucle de pruebas e integración (`/verify`).
6.  **Fase de Cierre**: El _Documentador_ actualiza el historial de sesiones y el estado de la memoria.
