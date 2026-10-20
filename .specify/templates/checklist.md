# 🛡️ Checklist de Calidad y Convergencia: [NOMBRE_FEATURE]

**Feature Ref**: `[ID_FEATURE]`  
**Propósito**: Puerta de calidad obligatoria antes de fusionar o cerrar una especificación.

---

## 🚦 Verificaciones Requeridas

### 1. Alineación con la Especificación

- [ ] Todos los criterios de aceptación (Given-When-Then) están implementados y verificados.
- [ ] Los casos límite (Edge Cases) están cubiertos con pruebas o manejo explícito de errores.
- [ ] No se implementaron características fuera de alcance (Zero Scope Creep).

### 2. Estándares de Código y Guardrails

- [ ] `lint`: 0 advertencias o errores.
- [ ] `typecheck`: 0 errores de tipado estricto.
- [ ] `tests`: 100% de la suite de pruebas pasando localmente.
- [ ] Pruebas unitarias/integración añadidas para el nuevo código.

### 3. Idioma y Documentación

- [ ] Código comentado en Español cuando sea necesario.
- [ ] Mensajes de commit en formato **Conventional Commits** en **Español** (`feat: ...`, `fix: ...`).
- [ ] `PROJECT_LOG.md` actualizado con las decisiones de diseño tomadas.
- [ ] `README.md` o documentación técnica actualizada si hubo cambios de API o configuración.

### 4. Verificación Visual (Si incluye Frontend / UI)

- [ ] Captura de pantalla o grabación adjunta en el Pull Request.
- [ ] Verificado diseño responsive en móvil y escritorio.
- [ ] Accesibilidad comprobada (teclado, contraste).

---

**Resultado de la Convergencia**: `[APROBADO PARA MERGE / PENDIENTE]`
