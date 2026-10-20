# 📝 Lista de Tareas Accionables: [NOMBRE_FEATURE]

**Feature Ref**: `[ID_FEATURE]` (enlace a `spec.md` y `plan.md`)  
**Progreso Total**: `[0 / N tareas completadas] (0%)`  
**Última Actualización**: `[YYYY-MM-DD]`

---

## 🚦 Fases de Implementación

### 🔹 Fase 1: Configuración, Modelos y Contratos Base

- [ ] **`[TASK-001]`**: Crear interfaces, tipos y esquemas de validación.
    - **Archivos**: `src/types/...`, `src/schemas/...`
    - **Dependencias**: Ninguna
    - **Criterio de Verificación**: `npm run typecheck` pasa sin errores.

- [ ] **`[TASK-002]`**: Escribir pruebas unitarias iniciales (TDD Red-Green).
    - **Archivos**: `tests/unit/...`
    - **Dependencias**: `TASK-001`
    - **Criterio de Verificación**: Las pruebas fallan por la razón esperada antes de implementar.

---

### 🔹 Fase 2: Implementación de Lógica de Negocio y Servicios

- [ ] **`[TASK-003]`**: Implementar servicio principal y reglas de negocio.
    - **Archivos**: `src/services/...`
    - **Dependencias**: `TASK-001`, `TASK-002`
    - **Criterio de Verificación**: Las pruebas unitarias pasan (`npm test`).

- [ ] **`[TASK-004]`**: Implementar adaptadores de datos / repositorio.
    - **Archivos**: `src/repositories/...` o `src/api/...`
    - **Dependencias**: `TASK-003`
    - **Criterio de Verificación**: Pruebas de integración superadas.

---

### 🔹 Fase 3: Integración de UI / Capa de Presentación (Si aplica)

- [ ] **`[TASK-005]`**: Crear componentes visuales e interactivos.
    - **Archivos**: `src/components/...`
    - **Dependencias**: `TASK-003`
    - **Criterio de Verificación**: Renderizado correcto, accesibilidad y captura de pantalla de prueba.

---

### 🔹 Fase 4: QA, Convergencia y Guardrails Finales

- [ ] **`[TASK-006]`**: Ejecutar suite completa de calidad (`lint`, `test`, `typecheck`, `build`).
    - **Archivos**: N/A
    - **Dependencias**: Todas las anteriores
    - **Criterio de Verificación**: 0 errores en todos los checks.

- [ ] **`[TASK-007]`**: Actualizar documentación (`PROJECT_LOG.md`, `README.md` si aplica) y preparar PR.
    - **Archivos**: `PROJECT_LOG.md`, `specs/...`
    - **Dependencias**: `TASK-006`
    - **Criterio de Verificación**: PR creado con descripción detallada en Español y changelog listo.
