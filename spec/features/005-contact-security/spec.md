# SPEC-005: Blindaje Anti-Spam en Formulario de Contacto (Honeypot + Sanitización)

## Problema

El formulario de contacto en `components/ContactForm.tsx` envía peticiones directamente a FormSubmit.co. Los scrapers y bots automatizados pueden leer el DOM o enviar peticiones directas de spam, saturando el buzón de correo.

## Objetivo

1. Implementar un campo señuelo invisible (_honeypot_, ej: `_gotcha` o `website_hp`) que solo los bots automáticos rellenan.
2. Si el honeypot contiene datos, simular éxito inmediato para el bot sin disparar la petición HTTP hacia el endpoint externo.
3. Prevenir doble envío accidental mediante deshabilitación reactiva de botón y estado `isSubmitting`.
4. Añadir tests unitarios para verificar el comportamiento con envíos legítimos y envíos de bots.

## Requisitos Funcionales

- **FR-005-1**: El formulario debe contener un input accesible únicamente para scrapers (`aria-hidden="true"`, clase oculta).
- **FR-005-2**: Si el input señuelo tiene valor, `onSubmit` debe retornar éxito simulado sin llamar a `fetch()`.
- **FR-005-3**: Si el input señuelo está vacío, el envío se procesa normalmente.

## Criterios de Aceptación

- **Given** un bot que completa el campo `website_hp`
- **When** se envía el formulario
- **Then** no se realiza ninguna petición de red y se muestra el toast de éxito simulado.
- **Given** un usuario humano con el campo `website_hp` vacío
- **When** introduce nombre, email y mensaje válidos
- **Then** se realiza la petición POST y se muestra el toast de confirmación.
