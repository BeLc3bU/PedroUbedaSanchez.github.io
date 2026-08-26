# Plan Técnico: SPEC-001 Limpieza y Modularización

## Arquitectura y Componentes Afectados

1. `components/TimelineItem.tsx`:
    - Redefinir props para adaptarse a `Experience`: `title`, `company`, `period`, `highlights`, `technologies`.
    - Renderizar la estructura semántica de línea temporal.
2. `app/page.tsx`:
    - Importar y usar `<TimelineItem />` en el mapeo de `portfolioData.experience`.
3. `components/TimelineItem.test.tsx`:
    - Actualizar tests para comprobar títulos, empresa, periodo, highlights y tags tecnológicos.
4. Borrado de archivos obsoletos:
    - `components/FeatureCards.tsx`
    - `components/SkillsMap.tsx`
    - `components/ClientSkillsMap.tsx`
    - `index.html`
