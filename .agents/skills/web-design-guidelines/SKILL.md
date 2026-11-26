---
name: web-design-guidelines
description: "Revisa la interfaz y detecta problemas de accesibilidad (a11y), UX, espaciado, tipografía y cumplimiento de directrices web modernas."
---

# 📐 Skill: Web Design Guidelines (Vercel Labs - skills.sh)

Esta habilidad proporciona una guía de auditoría y revisión de código frontend alineada con las **Web Interface Guidelines de Vercel** para garantizar máxima accesibilidad, ergonomía, consistencia y rendimiento en interfaces web.

---

## 🎯 ¿Cuándo usar esta skill?
* En revisiones de código de frontend (Pull Requests o fase `/converge`).
* Antes de dar por finalizada la implementación de componentes o vistas interactivas.
* Al auditar aplicaciones para cumplimiento de accesibilidad (WCAG 2.1 AA/AAA) y rendimiento Core Web Vitals.

---

## 🔍 Lista de Verificación de Auditoría (file:line)

Al revisar código frontend, el agente debe verificar metódicamente:

### 1. Accesibilidad (a11y)
- [ ] **Contraste de Color:** Razón de contraste mínima de 4.5:1 para texto normal y 3:1 para texto grande.
- [ ] **Semántica HTML:** Uso de `<button>` para acciones, `<a>` para navegación, encabezados estructurados (`h1`-`h6`).
- [ ] **Etiquetas ARIA:** `aria-label` en botones con solo icono, `aria-expanded` en menús desplegables.
- [ ] **Navegación por Teclado:** Todos los elementos interactivos deben ser alcanzables por Tab y mostrar un anillo de foco visible (`focus-visible`).

### 2. Ergonomía y Usabilidad (UX)
- [ ] **Área de Toque (Touch Targets):** Mínimo de 44x44px (o 48x48px) para botones y elementos interactivos en dispositivos móviles.
- [ ] **Prevención de Saltos de Diseño (CLS):** Atributos `width` y `height` en imágenes y contenedores para reservar espacio.
- [ ] **Manejo de Errores en Formularios:** Mensajes de error asociados mediante `aria-describedby` y enfoque al primer campo con error.
- [ ] **Feedback de Interacción:** Estados deshabilitados (`disabled`) con spinner en botones durante mutaciones asíncronas para evitar doble clic.

### 3. Tipografía y Espaciado
- [ ] Escalas de espaciado basadas en una cuadrícula consistente (ej. sistema Tailwind de 4px).
- [ ] Longitud de línea de lectura óptima (entre 45 y 75 caracteres por línea).
- [ ] Textos nunca cortados o desbordados sin control en resoluciones móviles.

---

## 📋 Formato de Informe de Auditoría
Las observaciones se reportan en formato conciso:
```text
[ARCHIVO:LINEA] - [SEVERIDAD: ALTA|MEDIA|BAJA] - [DESCRIPCIÓN DEL HALLAZGO Y SOLUCIÓN RECOMENDADA]
```
