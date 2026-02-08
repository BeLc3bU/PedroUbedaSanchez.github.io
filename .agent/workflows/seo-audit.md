---
description: Realizar una auditoría SEO completa del portfolio
---

Utiliza este flujo para asegurar que el portfolio esté optimizado para buscadores (Google, Bing).

1. **Auditoría Técnica**
   - Verificar `Title Tags` únicos y descriptivos.
   - Comprobar hierarchy de encabezados (`H1` -> `H2` -> `H3`).
   - Validar tiempos de carga (Vite/React optimization).
   - Asegurar que las imágenes tengan atributos `alt`.

2. **Calidad de Contenido (E-E-A-T)**
   - Verificar que la experiencia técnica sea evidente.
   - Validar que los enlaces externos (LinkedIn, GitHub) funcionen.

3. **Verificación de Despliegue**
   - Comprobar archivo `CNAME` y `robots.txt`.
   - Validar etiquetas `canonical` en cada página.

// turbo
4. Ejecutar build para validar sitemap (si existe)
```bash
npm run build
```
