---
name: frontend-design
description: "Crea interfaces de usuario con diseño cuidado, profesional, estética distintiva y patrones de producción libres de clichés genéricos."
---

# 🎨 Skill: Frontend Design (Anthropic - skills.sh)

Esta habilidad guía la creación de componentes visuales, interfaces y aplicaciones web con un estándar de **diseño profesional de alto impacto**, erradicando patrones genéricos, componentes aburridos ("AI slop") y maquetaciones sin jerarquía tipográfica ni contraste visual.

---

## 🎯 ¿Cuándo usar esta skill?
* Al diseñar o maquetar componentes, páginas, paneles de administración o landing pages.
* Al refactorizar interfaces para mejorar su pulido visual, ergonomía y sofisticación.
* Al construir sistemas de diseño con tokens CSS, Tailwind o bibliotecas modernas.

---

## 💎 Principios Fundamentales de Diseño

### 1. Intencionalidad Estética y Personalidad
* Evitar la apariencia predeterminada y monótona de librerías sin estilizar.
* Elegir paletas de colores coherentes: fondos profundos con sutiles contrastes, acentos cromáticos vibrantes pero medidos.
* Evitar fondos blancos planos con sombras excesivas; preferir bordes sutiles con translucidez (`backdrop-blur`), elevación controlada y jerarquía limpia.

### 2. Jerarquía Tipográfica Impecable
* Proporciones tipográficas armónicas (escala modular).
* Diferenciación visual no solo por tamaño, sino por peso, tracking e interlineado (`leading`).
* Uso de fuentes legibles para contenido denso y fuentes con carácter para encabezados.

### 3. Densidad de Información y Espaciado
* Microespaciado consistente (múltiplos de 4px / 8px).
* Densidad adecuada al contexto: aplicaciones de análisis de datos requieren compactación elegante; flujos onboarding requieren respiración y foco.
* Estados de carga (skeletons), estados vacíos (empty states) atractivos y retroalimentación interactiva inmediata (hover, focus, active).

### 4. Microinteracciones y Fluidez
* Transiciones cortas y suaves (150ms - 250ms con curvas `ease-out`).
* Estados activos visualmente claros en botones y campos de formulario.
* Indicadores contextuales de foco accesibles para navegación por teclado.
