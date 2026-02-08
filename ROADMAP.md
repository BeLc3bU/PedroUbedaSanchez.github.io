# 🗺️ Roadmap de Mejoras - Curriculum Vitae Interactivo

Este documento detalla las mejoras, características y utilidades sugeridas para elevar la calidad profesional, la mantenibilidad y la experiencia de usuario del proyecto.

## 🌟 Prioridad Alta (Impacto Inmediato)

### 1. Gestión de Formularios y Validación
Mejorar la robustez y mantenibilidad del formulario de contacto.
- **Herramientas:** `react-hook-form` + `zod`
- **Beneficios:** Validación más limpia, mejor rendimiento (menos re-renders), código más legible.
- **Tareas:**
  - Reemplazar estados manuales (`name`, `email`, `errors`) por `useForm`.
  - Definir esquema de validación con Zod.

### 2. Sistema de Notificaciones (Toasts)
Mejorar el feedback al usuario en el formulario de contacto (éxito/error) eliminando alertas nativas o mensajes simples.
- **Herramienta:** `sonner` o `react-hot-toast`
- **Tareas:**
  - Implementar componente `Toaster` global.
  - Reemplazar mensajes de éxito/error en `Contact.tsx`.

## 🚀 Prioridad Media (Experiencia y PWA)

### 3. Testing Unitario e Integración
Asegurar que el código funciona y facilitar refactorizaciones futuras.
- **Herramientas:** `vitest` + `@testing-library/react`
- **Tareas:**
  - Configurar entorno de test.
  - Testear componentes críticos (`Contact`, `Timeline`, utilidades).
  - Testear hooks personalizados (`useTheme`).

### 4. Mejoras en Animaciones
Hacer la navegación más fluida y profesional.
- **Herramienta:** `framer-motion` (ya instalada)
- **Tareas:**
  - Añadir transiciones de página (Page Transitions) con `AnimatePresence`.
  - Micro-interacciones en botones y tarjetas (hover, tap).

## 🛠️ Prioridad Baja / Mantenimiento (DX y Calidad)

### 5. Calidad de Código y Git Hooks
Automatizar la calidad del código antes de cada commit.
- **Herramientas:** `husky`, `lint-staged`, `prettier`
- **Tareas:**
  - Configurar Prettier para formateo automático.
  - Usar Husky para correr lint y tests antes de pushear (`pre-commit`, `pre-push`).

### 6. Accesibilidad (a11y)
Asegurar que la web sea usable por todos.
- **Herramientas:** `eslint-plugin-jsx-a11y`, Lighthouse
- **Tareas:**
  - Auditoría de contraste de colores.
  - Verificar navegación por teclado completa.
  - Añadir etiquetas `aria` faltantes.

### 7. Analíticas Respetuosas
Saber cuántas personas visitan tu CV sin invadir su privacidad.
- **Herramientas:** Vercel Analytics (si se despliega ahí) o una solución simple.

## 📦 Optimizaciones Técnicas

- **Bundle Analysis:** Usar `rollup-plugin-visualizer` para detectar dependencias pesadas.
- **Image Optimization:** Asegurar que todas las imágenes sean WebP/AVIF y tengan tamaños correctos.
