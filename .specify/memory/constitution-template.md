# Constitución del Proyecto: {{NOMBRE_PROYECTO}}

> **Estándar:** GitHub Spec Kit (SDD - Spec-Driven Development) & Decision Architecture (Kev/Jev)  
> **Estado:** Vigente y Obligatorio para todo Agente de IA  
> **Versión:** 1.0.0

---

## 🏛️ 1. Misión y Propósito Central

Este repositorio tiene como propósito:

> **{{DESCRIPCION_PROPOSITO_PROYECTO}}**

Todo desarrollo, refactorización o adición técnica debe estar alineado con la entrega de valor a este propósito sin añadir complejidad accidental innecesaria (Principio YAGNI estricto).

---

## 📜 2. Principios Innegociables (Reglas de Oro)

### 2.1. Cero "Vibe Coding" (Gobernanza Spec-Anchored)

1. **Ningún cambio de código en producción sin especificación:** Queda estrictamente prohibido que un agente de IA cree o modifique lógica funcional en el código fuente sin contar previamente con un archivo `spec.md`, un `plan.md` técnico y una lista de tareas `tasks.md` aprobados en el directorio `specs/NNN-<nombre-feature>/`.
2. **Ciclo de vida cerrado:** Toda tarea debe respetar el orden:
   `Specify` (Qué y Por qué) ➔ `Plan` (Cómo y Riesgos) ➔ `Tasks` (Pasos atómicos) ➔ `Implement` (TDD) ➔ `Converge` (Verificación integral).

### 2.2. Rigor de Calidad y Verificación (TDD & Evidence First)

1. **Pruebas antes de afirmaciones:** Ninguna tarea se considera completa porque el diff "se vea bien". Toda afirmación de éxito debe estar respaldada por la ejecución real del comando de prueba y la inspección de su salida.
2. **Desarrollo Guiado por Pruebas (TDD):** Escribir la prueba unitaria o de integración correspondiente, verificar que falle (RED), implementar el código mínimo para hacerla pasar (GREEN) y refactorizar.
3. **Validación de Regresión:** Antes de cerrar cualquier especificación, debe ejecutarse la suite completa de pruebas del proyecto.

### 2.3. Capa de Decisión y Clasificación Tipada (Kev / Jev Integration)

1. **Decisiones deterministas:** Para tareas de clasificación (ej. enrutamiento de peticiones, moderación, filtrado booleano, etiquetado A/B/C o scoring de datos), se prioriza el uso de modelos de decisión tipada System 1 (estándar **Kev** de Jared Palmer / TypeSafe Jev API `/v1/systemone` o herramientas MCP tipo `jev-classifier`).
2. **Evitar LLMs pesados para decisiones atómicas:** No utilizar prompts generativos masivos para preguntas de respuesta categórica o tipada (`noul` sí/no, `choice` opción múltiple, `score` nivel ordenado).

### 2.4. Higiene de Contexto y Gestión de Arnés

1. **Límite de `AGENTS.md`:** El archivo de arnés y directrices de raíz no debe superar las **500 líneas** para proteger la ventana de atención y evitar saturación del modelo.
2. **Particionamiento de memoria:** Los registros extensos, trazas y análisis pesados deben archivarse en `docs/` o en artefactos efímeros, nunca en el prompt del sistema.
3. **Subagentes especializados:** Delegar exploraciones masivas de código, auditorías de dependencias o lecturas de logs extensos a subagentes de contexto aislado con permisos de solo lectura.

### 2.5. Idioma y Formato Oficial

1. **Español 100%:** Toda la documentación, comentarios, nombres de commits (Conventional Commits), descripciones de Pull Requests y notas de versión (Changelogs vía `release-please`) deben estar redactados obligatoriamente en **Español**.

---

## 🛠️ 3. Stack Tecnológico Base

- **Lenguaje Principal:** {{LENGUAJE_Y_VERSION}}
- **Gestor de Paquetes / Dependencias:** {{GESTOR_PAQUETES}}
- **Framework de Testing:** {{FRAMEWORK_TESTS}}
- **Persistencia / Base de Datos:** {{BASE_DATOS}}
- **Servidores MCP Recomendados:** Context7 (consulta de documentación oficial en tiempo real para evitar alucinaciones) y jev-classifier / Kev (clasificación tipada).

---

## 🚦 4. Criterios de Aceptación para Pull Requests (PR Gates)

Un cambio solo puede fusionarse si cumple simultáneamente:

- [ ] La especificación en `specs/NNN-<feature>/` tiene todas sus tareas marcadas como completadas `[x]`.
- [ ] Los tests automatizados pasan al 100% sin advertencias no controladas.
- [ ] El linter y formateador no arrojan errores.
- [ ] La documentación en `README.md` o `docs/` refleja los cambios realizados.
