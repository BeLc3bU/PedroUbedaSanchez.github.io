# Plan Técnico: SPEC-005 Blindaje Anti-Spam en Formulario

## Arquitectura y Componentes Afectados

1. `components/ContactForm.tsx`:
    - Añadir al esquema Zod: `website_hp: z.string().optional()`.
    - Renderizar el input oculto:
      `<input {...register("website_hp")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />`
    - En `onSubmit`: verificar si `data.website_hp` tiene contenido. Si es así, resetear formulario y retornar inmediatamente con toast sin enviar `fetch`.
2. `components/ContactForm.test.tsx`:
    - Pruebas unitarias de renderizado, validación de campos obligatorios, detección de bot y simulación de envío exitoso.
