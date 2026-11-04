# Feature: 001-contact-form

## Objective and problem

Migrado desde especificación SDD original en spec/features/001-contact-form.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# Especificación: Formulario de Contacto con Validación Zod

## Estado

- **Fase**: `Verify` (Implementado y verificado en la base de código actual).

## Descripción Funcional

Permite a los usuarios enviar un mensaje de contacto directo desde el portafolio. Debe asegurar la validez de los datos introducidos (nombre, correo electrónico y mensaje) antes del envío, impidiendo el envío de datos corruptos o vacíos y proporcionando retroalimentación de error y éxito de forma visualmente atractiva.

## Requerimientos y Criterios de Aceptación

1. **Validaciones estrictas**:
    - **Nombre**: Mínimo 2 caracteres, no vacío.
    - **Email**: Formato de correo electrónico válido (`usuario@dominio.com`).
    - **Mensaje**: Mínimo 10 caracteres, no vacío.
2. **Retroalimentación en Tiempo Real**:
    - Mostrar mensajes de error de validación debajo de cada campo correspondiente si el usuario interactúa e introduce datos incorrectos.
    - Desactivar el botón de envío durante el proceso de envío del formulario para evitar envíos duplicados.
3. **Notificaciones (Toasts)**:
    - Notificar con un toast elegante en caso de éxito en el envío del formulario.
    - Notificar con un toast de error en caso de fallo en el envío o conexión fallida.
4. **Diseño Visual**:
    - Alineado con el tema oscuro, con transiciones de color de borde (azul-cyan) en focus, y bordes rojos sutiles en error.

## Tasks

# Lista de Tareas: Formulario de Contacto

## Desarrollo

- [x] Integrar `react-hook-form` en [Contact.tsx](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/pages/Contact.tsx)
- [x] Crear el esquema de validación Zod (`contactSchema`)
- [x] Conectar los inputs con el controlador `register`
- [x] Implementar la visualización condicional de errores debajo de cada input
- [x] Configurar el estado de loading durante el envío para deshabilitar el botón submit
- [x] Añadir notificaciones con `sonner` (`toast.success` y `toast.error`)

## Verificación

- [x] Ejecutar la suite de tests unitarios asociados a la página de contacto (`Contact.test.tsx`)
- [x] Ejecutar `npm run build` para asegurar la compilación correcta sin errores de TypeScript
- [x] Probar manualmente el flujo en el servidor de desarrollo local

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/001-contact-form.md.
