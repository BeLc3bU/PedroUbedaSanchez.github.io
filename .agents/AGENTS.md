# REGLAS DEL AGENTE (WORKSPACE MIGRADO AI-FIRST)

Este archivo configura el arnés de comportamiento del agente de IA que opera en este workspace. El sistema lee este archivo de forma automática.

## Reglas Principales de Operación

1. **Protocolo de Planificación Obligatorio**:
    - Ante cualquier tarea compleja, detente e inicia el modo Planificación.
    - Crea o actualiza `implementation_plan.md` en el directorio de la conversación.
    - Espera la aprobación del usuario antes de modificar código o ejecutar comandos destructivos.

2. **Desarrollo Guiado por Especificaciones (Spec-Driven Development)**:
    - Consulta y respeta la Constitución del Proyecto en `spec/constitution/`.
    - Para implementar cualquier nueva funcionalidad, define su especificación en `spec/features/<numero>-<nombre>/spec.md` antes de escribir código.
    - Modifica código sólo después de alinear el plan técnico (`plan.md`) y la lista de tareas (`tasks.md`).

3. **Ciclo de Verificación Autónoma (Loop Engineering)**:
    - Al terminar o modificar código, debes correr el script de validación local (`npm run verify` o `node scripts/loop-verify.js`).
    - Si fallan las pruebas, el linter o la compilación, analiza los logs de error, realiza la corrección correspondiente de forma autónoma y vuelve a ejecutar la verificación. No te detengas ante el primer error.

4. **Preservación del Contexto**:
    - Mantén el contexto limpio. No realices lecturas masivas innecesarias de archivos que no vas a modificar.
    - Utiliza las skills modulares bajo `.agent/skills/` y `.opencode/skills/` correspondientes a la tarea en lugar de adivinar patrones.

5. **Restricciones Críticas**:
    - NUNCA instales dependencias sin autorización explícita.
    - NUNCA rompas la compatibilidad con React 19.
    - NUNCA dejes código muerto o archivos huérfanos.
