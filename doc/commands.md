# Comandos Personalizados de Automatización (AI-First)

Este documento define el protocolo y el flujo de pasos exactos que los agentes de IA deben ejecutar de forma autónoma cuando el usuario invoque un comando personalizado en la conversación.

---

## `/spec <nombre-feature>`

- **Propósito**: Inicializar la especificación técnica de una nueva funcionalidad antes de programar nada.
- **Flujo de ejecución**:
    1.  Crear la carpeta en `spec/features/0XX-<nombre-feature>/`.
    2.  Crear el archivo `spec.md` definiendo el estado en `Specify`, la descripción funcional y los criterios de aceptación.
    3.  Registrar la feature en el roadmap general `spec/constitution/roadmap.md`.
    4.  Presentar el resultado al usuario pidiendo su aprobación y feedback.

## `/feature <nombre-feature>`

- **Propósito**: Preparar el plan de implementación y las tareas técnicas de una funcionalidad especificada.
- **Flujo de ejecución**:
    1.  Verificar que existe la especificación de la feature en `spec/features/0XX-<nombre-feature>/spec.md`.
    2.  Cambiar el estado en la spec a `Plan`.
    3.  Crear el archivo `plan.md` detallando la arquitectura, componentes modificados, dependencias y esquema de datos.
    4.  Crear el archivo `tasks.md` con la lista de tareas de desarrollo y verificación paso a paso.
    5.  Presentar el plan al usuario para su aprobación final antes de programar.

## `/bugfix <descripcion-bug>`

- **Propósito**: Inicializar la especificación y resolución de un bug reportado.
- **Flujo de ejecución**:
    1.  Crear una carpeta bajo `spec/features/bugfix-<fecha>-<nombre-corto>/`.
    2.  Crear un archivo `spec.md` con la descripción del bug, los pasos de reproducción y el comportamiento esperado (Criterios de Aceptación).
    3.  Crear `plan.md` identificando la causa raíz y la solución técnica.
    4.  Crear `tasks.md` para la corrección y los tests unitarios necesarios que validen el arreglo.
    5.  Presentar la propuesta de corrección al usuario.

## `/refactor <objetivo>`

- **Propósito**: Ejecutar una refactorización de código minimizando la deuda técnica.
- **Flujo de ejecución**:
    1.  Identificar y documentar en `spec/features/refactor-<nombre>/spec.md` los componentes que serán afectados y la justificación de la refactorización.
    2.  Detallar en `plan.md` cómo se asegurará que no hay cambios en el comportamiento externo (regresión) y las pruebas afectadas.
    3.  Crear la lista de tareas en `tasks.md`.
    4.  Ejecutar el cambio y verificar en bucle con el script de loop verify.

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
