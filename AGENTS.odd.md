# AGENTS.md — temp_app

Este proyecto opera bajo **Organic-Driven Development (ODD) — Gentle Shell v5** y gobernanza de agentes tipados.
Idioma obligatorio: **Español**.

## Comandos Principales
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests: `npm test`
- Verificar ODD: `agent verify`
- Guardrails: `agent guard`

## Reglas ODD (Gentle Shell v5)
1. **Task Size & Resume Test**: Pequeña si está entendida, tiene riesgo contenido y es reanudable desde el diff; grande si requiere `odd/tasks/<feature>.md`.
2. **Separación de Autoridad (Agent ≠ Authority)**: Ningún agente puede auto-aprobarse ni hacer merge sin aprobación humana.
3. **Allowed edit surfaces**: Toda delegación a writer debe declarar rutas relativas acotadas (nunca `.`).
4. **Work-Unit Commits**: Commits coherentes (~400 líneas con código + pruebas + docs) y línea `Risk: item N` o `Risk: none`.
