---
name: work-unit-commits
description: "Trigger: work-unit commits, dividir commits, chained PR, tamaño de PR, ~400 líneas, tests con código. Planifica commits y entregas como unidades de trabajo coherentes y revisables."
license: Apache-2.0
metadata:
  author: gentleman-programming-adapted
  version: "1.0"
---

## Activation Contract

Activa esta skill al planificar commits en una rama de trabajo ODD, dividir una entrega que supera ~400 líneas autoradas o preparar Pull Requests encadenadas (`chained-pr`).

## Hard Rules

- **Unidad de trabajo coherente:** Cada commit representa un comportamiento, corrección, migración o bloque documental completo con sus pruebas y documentación en el mismo commit.
- **Nunca dividir por tipo de archivo:** Evitar commits separados de solo `models`, luego `services`, luego `tests` si ninguno funciona de forma aislada.
- **Presupuesto no es code-golf:** Nunca borrar comentarios, líneas en blanco, tests o documentación, ni minificar código para encajar artificialmente en ~400 líneas.
- **Unidades de alto riesgo aisladas:** Toda unidad cuya línea `Risk:` nombre un ítem `1..6` obtiene su propio commit para revisión independiente.
- **Cero conflictos o secretos:** Ejecutar `agent guard --conflicts` antes de comitear y verificar que no se incluyan rutas sensibles.
- **Conventional Commits en Español:** Todos los mensajes de commit siguen el estándar (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`) en español.

## Decision Gates

| Situación | Acción (`delivery_strategy`) |
|---|---|
| Cambio total ≤ ~400 líneas (adiciones + eliminaciones, sin generados) | Mantener commits de unidad de trabajo dentro de una sola PR |
| Cambio > ~400 líneas con `ask-on-risk` (por defecto) | Preguntar una vez al publicar: `feature-branch-chain`, `stacked-to-main` o `single-pr` (menos recomendada) |
| Cambio > ~400 líneas con `auto-chain` | Dividir automáticamente en slices según estrategia de cadena cacheada |
| Cambio > ~400 líneas con `single-pr` o `exception-ok` | Mantener 1 PR siguiendo la política del repositorio destino y reportar carga de revisión |
| No existe partición honesta ≤400 líneas tras 1 pasada | Detener el re-corte, reportar el tamaño mínimo honesto y su justificación |

## Execution Steps

1. Estimar líneas modificadas al crear `odd/tasks/NNN-<feature>.md` y llevar conteo acumulado por commit.
2. Verificar por cada unidad de trabajo: propósito único, tests y docs incluidos, rollback limpio sin revertir trabajo ajeno y verificación verde.
3. Ejecutar `node bin/cli.js guard --conflicts` antes de confirmar el commit.
4. Registrar el hash o referencia del commit en `odd/tasks/NNN-<feature>.md` junto a la tarea correspondiente.
5. No hacer `push`, crear PR ni `merge` salvo autorización explícita del usuario (`Agent ≠ Authority`).

## Output Contract

Devolver:
- Lista de unidades de trabajo / slices definidos y su conteo aproximado de líneas.
- Estrategia de entrega aplicada (`ask-on-risk` | `auto-chain` | `single-pr` | `exception-ok`).
- Confirmación de `agent guard --conflicts` y comandos de prueba ejecutados por unidad.

## References

- `../speckit-odd/SKILL.md` — protocolo ODD completo de 7 pasos.
- `../../docs/gentle-shell-odd-v5.md` — política de entrega y guardrails de Gentle Shell v5.
