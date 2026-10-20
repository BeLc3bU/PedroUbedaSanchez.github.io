# 📋 Especificación Funcional: [NOMBRE_FEATURE]

**Identificador**: `[ID_FEATURE]` (ej. `001-auth-jwt`)  
**Estado**: `[Borrador | En Revisión | Aprobado | En Implementación | Completado]`  
**Fecha de Creación**: `[YYYY-MM-DD]`  
**Última Actualización**: `[YYYY-MM-DD]`  
**Autor/Agente**: `[NOMBRE_DEL_ROL]`

---

## 🎯 1. Resumen Ejecutivo y Objetivo

_Describe en 1 o 2 párrafos concisos qué problema resuelve esta funcionalidad y cuál es el valor esperado para el usuario o sistema._

---

## 👤 2. Historias de Usuario (User Stories)

### Historia 1: [Título Corto de la Historia]

- **Como** [tipo de usuario o rol]
- **Quiero** [acción o capacidad deseada]
- **Para** [beneficio o resultado esperado]

#### Criterios de Aceptación (Gherkin / Given-When-Then)

- **Escenario 1.1**: [Caso de éxito principal]
    - **Dado** [contexto o estado inicial]
    - **Cuando** [el usuario realiza la acción]
    - **Entonces** [se produce el resultado esperado]
    - **Y** [resultado adicional, ej. notificación o cambio de estado]

- **Escenario 1.2**: [Manejo de error o caso alternativo]
    - **Dado** [contexto inicial con datos inválidos o estado no permitido]
    - **Cuando** [se intenta la acción]
    - **Entonces** [el sistema responde con un mensaje claro y código de error específico]

---

## ⚙️ 3. Requisitos Funcionales y No Funcionales

### Requisitos Funcionales (RF)

- `[RF-01]`: [Descripción precisa del requisito funcional]
- `[RF-02]`: [Descripción precisa del requisito funcional]
- `[RF-03]`: [Descripción precisa del requisito funcional]

### Requisitos No Funcionales (RNF)

- `[RNF-01] Rendimiento`: [Ej: Tiempo de respuesta menor a 200ms en p95]
- `[RNF-02] Seguridad`: [Ej: Sanitización estricta de entradas, hashing seguro de credenciales]
- `[RNF-03] Accesibilidad`: [Ej: Cumplimiento WCAG 2.1 AA para elementos interactivos]
- `[RNF-04] Internacionalización`: [Ej: Todo texto de cara al usuario en Español]

---

## 🔍 4. Casos Límite y Reglas de Negocio (Edge Cases)

| ID        | Caso Límite / Condición            | Comportamiento Esperado                              |
| --------- | ---------------------------------- | ---------------------------------------------------- |
| `[EC-01]` | Entrada vacía o nula               | Retornar error de validación 422 con campo detallado |
| `[EC-02]` | Pérdida de conexión / Timeout      | Reintento exponencial con fallback informativo       |
| `[EC-03]` | Concurrencia o conflicto de estado | Manejo de bloqueo optimista o idempotencia           |

---

## 🚫 5. Fuera de Alcance (Out of Scope)

_Lista explícita de lo que NO se incluye en esta especificación para evitar sobre-ingeniería o scope creep:_

- [ ] [Elemento 1 fuera de alcance]
- [ ] [Elemento 2 fuera de alcance]

---

## 📌 6. Dependencias y Bloqueantes

- **Depende de**: `[ID de otra feature o servicio externo]`
- **Bloquea a**: `[ID de features subsiguientes]`
