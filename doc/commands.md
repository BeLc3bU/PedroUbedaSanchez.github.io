# Comandos Personalizados de Automatización (AI-First)

Este documento define el protocolo y el flujo de pasos exactos que los agentes de IA deben ejecutar de forma autónoma cuando el usuario invoque un comando personalizado en la conversación.

---

## `/speckit-specify`

- **Propósito**: Crear o actualizar la especificación funcional de una nueva característica en `spec/features/<numero>-<nombre>/spec.md`.

## `/speckit-plan`

- **Propósito**: Generar el plan técnico de implementación, diseño de arquitectura, esquemas y componentes afectados (`plan.md`).

## `/speckit-tasks`

- **Propósito**: Crear el desglose de tareas ejecutables y secuenciales con sus criterios de prueba (`tasks.md`).

## `/speckit-implement`

- **Propósito**: Ejecutar la implementación en el código fuente procesando la lista de tareas definida.

## `/speckit-converge`

- **Propósito**: Evaluar la coincidencia entre el código actual y la especificación, y agregar cualquier tarea pendiente a `tasks.md`.

## `/verify`

- **Propósito**: Ejecutar el pipeline de validación completo del proyecto.
- **Flujo de ejecución**:
    1.  Ejecutar `npm run lint` para análisis estático.
    2.  Ejecutar verificación de compilación.
    3.  Ejecutar `npx vitest run` para tests unitarios.
    4.  Ejecutar `npm run build` para la compilación de producción.
    5.  Reportar un resumen detallado de cada paso.

## `/review`

- **Propósito**: Ejecutar una auto-auditoría sobre el código modificado.
- **Flujo de ejecución**:
    1.  Escanear los archivos modificados con `git diff`.
    2.  Comprobar cada cambio contra las directrices de `AGENTS.md` (naming, tipos, imports, testing, estilos).
    3.  Generar un reporte detallado con las desviaciones detectadas (si las hay) y las correcciones a aplicar de forma automática.

## `/deploy`

- **Propósito**: Automatizar la verificación y subida de los cambios locales al repositorio remoto de producción.
- **Flujo de ejecución**:
    1.  Ejecutar la validación completa del proyecto (`npm run verify` o comando `/verify`).
    2.  Verificar que no existan errores de compilación, de tipado o pruebas rotas.
    3.  Añadir los archivos locales al área de preparación de Git (`git add .`).
    4.  Crear un commit limpio siguiendo el formato Conventional Commits en base a los cambios realizados.
    5.  Hacer push a la rama principal (`git push origin main`), lo cual desencadenará el workflow de despliegue automático en GitHub Actions.
    6.  Reportar el resultado de la subida al usuario.
