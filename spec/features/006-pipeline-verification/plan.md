# Plan Técnico: SPEC-006 Sincronización de Pipeline CI/CD

## Arquitectura y Componentes Afectados

1. `scripts/loop-verify.js`:
    - Corregir el paso 5 renombrándolo a "Next.js Compilación de Producción (`npm run build`)".
    - Utilizar argumentos robustos con `npm` y `npx`.
2. `.github/workflows/ci-tests.yml`:
    - Garantizar que el workflow instale dependencias con `npm ci --legacy-peer-deps` y valide Prettier, ESLint, TypeScript, Vitest y Build.

## Análisis de Riesgos

- Cero impacto en código de producción.
- Mejora directa en el bucle de feedback del agente y CI.
