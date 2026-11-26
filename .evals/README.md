# 🧪 Arnés de Evaluación Sintética (`.evals/`)

Este directorio contiene los escenarios sintéticos deterministas para auditar el enrutamiento de agentes, la separación de autoridad (`Agent ≠ Authority`) y la clasificación de riesgo ODD (Gentle Shell v5).

## Ejecución

```bash
npm run test:evals
# o directamente:
node bin/cli.js eval
```

## Estructura
- `scenarios/routing-scenarios.json`: Casos de prueba que validan la asignación determinista de los 7 roles canónicos, bloqueos constitucionales (`escalate`) y la rúbrica de 6 ítems de alto riesgo ODD.
