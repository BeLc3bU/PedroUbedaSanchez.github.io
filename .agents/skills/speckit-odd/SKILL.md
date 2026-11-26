---
name: speckit-odd
description: "Trigger: /odd, /specify, /plan, /tasks, /implement, /converge, odd/tasks, desarrollo ODD. Orquesta el protocolo Organic-Driven Development (ODD) de Gentle Shell v5, gobernanza (.agents/registry.json), traspasos, evidencias y guardrails."
license: MIT
metadata:
  author: BeLc3bU
  version: "2.0"
---

## Activation Contract

Activa esta skill en tareas de desarrollo, arquitectura o gobernanza dentro de repositorios con `odd/tasks/`, `.agents/registry.json` o `specs/`. No la actives para consultas triviales de una sola lectura que no requieran flujo ODD.

## Hard Rules

- **Idioma estricto:** Comunicación, comentarios, docs, commits y documentos ODD en **Español** (respetando identificadores técnicos).
- **Separación de autoridad (`Agent ≠ Authority`):** Ningún agente puede auto-aprobarse ni fusionar a ramas protegidas sin aprobación humana explícita. Consultar `.agents/registry.json`.
- **Evidencia antes de afirmaciones:** Prohibido marcar una tarea completada (`[x]`) sin ejecutar su verificación observando `exit_code: 0`. Registrar evidencias formales en `.evidence/`.
- **Línea de riesgo obligatoria:** Cerrar cada cambio de código con `Risk: item N (razón)` o `Risk: none` según los 6 ítems de alto riesgo; antes de escribir `Risk: none`, verificar si el diff toca código compartido usado por otros flujos (ítem 3).
- **Guardrails previos al commit:** Ejecutar `agent guard --conflicts` y respetar la política de rutas sensibles (`.env*`, `.envrc`, `.netrc`, `.ssh/`, `secrets/`, `auth.json`, `*.pem|key|p12|pfx`).
- **Continuidad acotada:** Ante un fallo en scope, diagnosticar la causa desde la salida y cambiar la solución sin parar por conteos arbitrarios; no preguntar al usuario salvo decisión real de producto/negocio o permiso bloqueante.

## Decision Gates

| Criterio / Situación | Acción |
|---|---|
| Petición de solo lectura (explicar, comparar, auditar) | Permanecer read-only; no crear documentos ODD ni editar código |
| Intención de cambio ambigua o decisión de producto abierta | Hacer 1 pregunta enfocada y esperar |
| Tarea **pequeña** (entendida en ≤3 lecturas/~10k tokens, riesgo contenido, reanudable desde el diff) | Ruta inline: leer batch acotado, observar RED, implementar GREEN, verificar suite inline |
| Tarea **grande** (falla el *resume test*: multi-sesión, esperas externas, requisitos largos) | Crear `odd/tasks/NNN-<feature>.md` (vía `agent create`) antes de editar código |
| Entendimiento supera presupuesto (>3 lecturas o >10k tokens) | Delegar exploración read-only (handoff ≤2k tokens con `path:line`) |
| Unidad delegada a writer (`parallel` ≥2 unidades disjuntas o *context backstop*) | Declarar `## Allowed edit surfaces` no vacío (nunca `.` ni rutas absolutas) |
| Cambio toca alguno de los 6 ítems de alto riesgo | Escalar verificación independiente (`agent route` / `reviewer`) y separar su commit |

### Rúbrica de Alto Riesgo (Ítems 1–6)
1. **Datos irreversibles:** Migraciones, borrado o cambio de formato persistido no reconstruible.
2. **Seguridad:** Auth, permisos, credenciales, secretos, guardias o sandbox.
3. **Contratos compartidos:** API pública, flags CLI, esquemas, prompts o código compartido tocado sin solicitud explícita.
4. **Concurrencia:** Locks, condiciones de carrera u orden asíncrono.
5. **Entrega / entorno:** Instaladores, release, CI/CD, deploy o dependencias.
6. **Sin cobertura:** Ningún test detectaría regresiones en lo modificado.

## Execution Steps

1. **Authorize:** Confirmar si hay autorización de cambio; si es solo análisis, mantener read-only.
2. **Explore:** Inspeccionar código y requisitos en 1 batch acotado (≤3 llamadas).
3. **Resolve uncertainty:** Resolver ambigüedades reales o validar premisas de alto riesgo; continuar si no queda decisión humana.
4. **Classify:** Determinar `small` vs `large` mediante el *resume test* (la cantidad de archivos o tests por sí sola no hace grande una tarea).
5. **Track (solo tareas grandes):** Crear `odd/tasks/NNN-<feature>.md` con orden fijo: cabecera (objetivo, rama, estrategia de entrega, runner), `## Specs` (`S1`..`Sn` verbatim), `## Tasks` (`T1`..`Tn` con `S#`, ruta `inline|delegated`, riesgo) y `## Log` (`L1` petición original verbatim). Si aplica memoria local, consultar `MEMORY.md` y `.agents/memory/`.
6. **Implement task by task:**
   - Aplicar TDD aplicable (`RED` observado -> `GREEN` mínimo -> `TRIANGULATE` -> `REFACTOR`); si no aplica (docs pasivas, sin runner), documentar la excepción y ejecutar verificación estructural.
   - Ejecutar verificación diferencial (`PRESERVE`) cuando se toque código compartido y mantener scratch temporal fuera del worktree (`mktemp`).
   - Realizar *work-unit commits* coherentes (~400 líneas código + tests + docs juntos; ver skill `work-unit-commits`).
   - Actualizar estado de tareas y registrar traspasos en `.agents/handoffs/` cuando se delegue entre roles.
7. **Close:** Ejecutar `agent verify`, `agent registry validate`, `agent handoff validate`, `agent evidence verify`, `agent memory validate`, `agent eval` y `agent guard`; registrar evidencia en `.evidence/` y ADR en `PROJECT_LOG.md` si hubo cambios de arquitectura.

## Output Contract

Al concluir una tarea ODD reportar de forma concisa:
- Archivos creados o modificados y estado de `odd/tasks/NNN-<feature>.md`.
- Comandos de verificación ejecutados con sus resultados reales observados.
- Línea de cierre de riesgo (`Risk: item N (razón)` o `Risk: none`).
- Bloqueos pendientes o decisiones humanas requeridas (si existen).

## References

- `../../docs/gentle-shell-odd-v5.md` — resumen técnico de ODD v5, continuidad y guardrails.
- `../../docs/skill-style-guide.md` — guía normativa de diseño de skills LLM-first.
- `../work-unit-commits/SKILL.md` — reglas de slicing por unidades de trabajo (~400 líneas).
- `../../.agents/registry.json` — catálogo de roles, permisos y rutas permitidas/prohibidas.
