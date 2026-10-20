# 🧠 Memoria Operativa del Repositorio (MEMORY.md)

Este documento es el **índice canónico y memoria operativa de alto valor** para agentes de IA en **Elite Agent Bootstrap v2**. Proporciona contexto estable y patrones esenciales bajo el principio de **divulgación progresiva (Progressive Disclosure)**.

---

## 🏛️ Jerarquía de Autoridad (Innegociable)

Ante cualquier discrepancia entre fuentes de verdad, la precedencia es estricta:
$$\text{Constitución} > \text{Especificación (specs/)} > \text{Reglas (AGENTS/GEMINI)} > \text{ADR (PROJECT_LOG)} > \text{Memoria} > \text{Contexto de Chat}$$

> [!IMPORTANT]
> **La memoria nunca es normativa**: No puede invalidar reglas de seguridad, relajar políticas de gobernanza ni contradecir una especificación aprobada.

---

## 🗺️ Mapa de Memorias Especializadas (`.agents/memory/`)

Para tareas específicas que requieran mayor profundidad técnica, consulta directamente el archivo modular correspondiente:

| Archivo                                                              | Propósito                                                 | Cuándo Consultar                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| [`.agents/memory/decisions.md`](file:///.agents/memory/decisions.md) | Decisiones operativas y convenciones técnicas no-ADR      | Antes de elegir enfoques de diseño o tooling interno |
| [`.agents/memory/patterns.md`](file:///.agents/memory/patterns.md)   | Patrones de arquitectura e implementación comprobados     | Al escribir código, nuevos comandos CLI o esquemas   |
| [`.agents/memory/lessons.md`](file:///.agents/memory/lessons.md)     | Errores evitados, trampas de entorno y soluciones         | Al depurar, ejecutar tests o manipular scripts       |
| [`.agents/memory/context.md`](file:///.agents/memory/context.md)     | Contexto operacional estable y particularidades del stack | Al inicializar agentes nuevos o consultar entorno    |
| [`.agents/memory/archive/`](file:///.agents/memory/archive/)         | Registro histórico de memorias obsoletas o superadas      | Para arqueología técnica o auditoría retrospectiva   |

---

## 📋 Catálogo de Memorias Activas de Alto Valor

| ID        | Tipo       | Estado   | Confianza | Título                                                                                                |
| --------- | ---------- | -------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `MEM-001` | `pattern`  | `active` | `high`    | [Validación Estructural Nativa en Node.js sin Dependencias](.agents/memory/patterns.md#mem-001)       |
| `MEM-002` | `lesson`   | `active` | `high`    | [Manejo de Scripts Multiplataforma y Codificación en Windows](.agents/memory/lessons.md#mem-002)      |
| `MEM-003` | `decision` | `active` | `high`    | [Desacoplamiento Estricto Core Determinista vs Extended Kev/Jev](.agents/memory/decisions.md#mem-003) |
| `MEM-004` | `context`  | `active` | `high`    | [Estructura del CLI Universal y Wrappers Transparentes](.agents/memory/context.md#mem-004)            |

---

## 🔄 Protocolo de Actualización de Memoria

1. **Evaluar**: Registrar una memoria sólo si es _reutilizable_, _verificable_ y _evita repetir errores o investigaciones_.
2. **Deduplicar**: Comprobar que no exista previamente en `.agents/memory/` ni pertenezca a `PROJECT_LOG.md` (ADR) o la Constitución.
3. **Validar**: Ejecutar `agent memory validate` (o `speckit memory validate`) para garantizar integridad y cumplimiento del esquema JSON.
