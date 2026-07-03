# Plan Técnico: Formulario de Contacto con Validación Zod

## Arquitectura y Componentes

La lógica se concentra en el componente de página de contacto:

- [Contact.tsx](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/pages/Contact.tsx): Página contenedora del formulario de contacto.

## Diseño de Datos y Esquemas

Se define un esquema de Zod para validar la estructura:

```typescript
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Introduce un correo electrónico válido" }),
    message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

type ContactFormData = z.infer<typeof contactSchema>;
```

## Dependencias

- `react-hook-form` para la gestión del estado de los inputs y envío.
- `@hookform/resolvers/zod` para vincular Zod con React Hook Form.
- `sonner` para disparar el toast de éxito/error.
