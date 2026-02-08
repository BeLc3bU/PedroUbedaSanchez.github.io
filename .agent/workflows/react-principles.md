---
description: Aplicar principios y patrones avanzados de React
---

Sigue estos principios para asegurar que los componentes de React sean eficientes y fáciles de mantener.

1. **Diseño de Componentes**
   - Composición sobre herencia.
   - Props hacia abajo, eventos hacia arriba.
   - Una sola responsabilidad por componente.

2. **Optimización y Rendimiento**
   - No optimizar prematuramente; perfilar primero con DevTools.
   - Usar `useMemo` y `useCallback` solo ante cuellos de botella reales.
   - Evitar el "drill de props" profundo usando Context o un gestor de estado.

3. **TypeScript + React**
   - Tipar siempre las Props con Interfaces.
   - Usar `ReactNode` para children.
   - Tipar eventos correctamente (`MouseEventHandler`, etc.).

4. **Reglas de Hooks**
   - Solo en el nivel superior.
   - Mantener el orden de renderizado.
   - Limpiar efectos en el desmontaje.
