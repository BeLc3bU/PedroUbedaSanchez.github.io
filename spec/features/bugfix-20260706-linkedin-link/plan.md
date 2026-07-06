# Plan: Bugfix LinkedIn Link

## Causa Raíz
Se detectó que el enlace de LinkedIn estaba configurado de forma inconsistente en varios archivos:
1. `data/portfolio.tsx` apuntaba a `https://www.linkedin.com/in/pubesan/`.
2. `components/ContactForm.tsx` mostraba en texto plano `linkedin.com/in/peubesa`.
3. `index.html` (JSON-LD) apuntaba a `https://www.linkedin.com/in/pedro-úbeda-sánchez`.

## Solución Propuesta
Actualizar las 3 ocurrencias del enlace e identificadores de LinkedIn al correcto: `https://www.linkedin.com/in/pedroubedasanchez`.
- [data/portfolio.tsx](file:///c:/Proyectos/PedroUbedaSanchez.github.io-main/data/portfolio.tsx)
- [components/ContactForm.tsx](file:///c:/Proyectos/PedroUbedaSanchez.github.io-main/components/ContactForm.tsx)
- [index.html](file:///c:/Proyectos/PedroUbedaSanchez.github.io-main/index.html)
