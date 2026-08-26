# Requisitos: Evolución del Hangar Táctico

Este documento formaliza los requisitos funcionales, no funcionales, de accesibilidad y de contenido para la feature `007-hangar-tactico-evolution`.

---

## 1. Requisitos de Experiencia & HUD (REQ-HUD)

### REQ-HUD-001: Telemetría de Cabecera Táctica

- **Prioridad**: MUST
- **Descripción**: El Hangar debe incorporar una barra superior con estado operacional del sistema (`SYSTEM: OPERATIONAL`), coordenadas de navegación, conmutador de audio táctico (Mute/Unmute) y botón de cierre/retorno claro.
- **Criterio de Aceptación**:
    - _Given_ el usuario abre el Hangar Táctico,
    - _When_ se inicializa la vista,
    - _Then_ se visualiza el HUD superior con indicadores de telemetría y controles accesibles.

### REQ-HUD-002: Matriz de Acceso Directo (Direct Route Matrix)

- **Prioridad**: MUST
- **Descripción**: El HUD debe proveer un selector flotante lateral o inferior con botones directos para los 6 subsistemas: Cockpit (Perfil), Aviónica (Skills Críticas), Flight Log (Experiencia), Mission DB (Proyectos), Honors (Formación y Condecoraciones), Comms (Contacto) y Briefing (CV PDF).
- **Criterio de Aceptación**:
    - _Given_ el usuario en cualquier punto del Hangar,
    - _When_ pulsa un botón de la matriz de acceso o usa los atajos numéricos `1` a `6`,
    - _Then_ el avatar o el visor salta inmediatamente al subsistema correspondiente y abre su panel detallado.

---

## 2. Requisitos de Navegación & Hotspots (REQ-NAV)

### REQ-NAV-001: Hotspots Tácticos Ampliados y Reconocibles

- **Prioridad**: MUST
- **Descripción**: Cada estación debe contar con un hotspot con halo pulsante, etiqueta descriptiva bilingüe, icono aeronáutico e indicador claro de tecla interactiva (`[E]`).
- **Criterio de Aceptación**:
    - _Given_ el avatar se aproxima al radio de interacción (65px) de una estación,
    - _When_ entra en el rango,
    - _Then_ se resalta el contorno luminoso con el color de la estación, aparece el indicador flotante de acción y se emite feedback visual.

### REQ-NAV-002: Paneles Tácticos de Sub-Sistema (Tactical Detail Panels)

- **Prioridad**: MUST
- **Descripción**: Al interactuar con una estación, se debe desplegar un panel táctico temático enriquecido que permita no solo leer texto secuencial, sino también ejecutar acciones directas (ej. descargar CV, abrir enlace de GitHub, saltar al formulario de contacto, ver tecnologías).
- **Criterio de Aceptación**:
    - _Given_ una estación abierta,
    - _When_ el usuario consulta la información,
    - _Then_ puede ver insignias de tecnologías, roles específicos, botones de acción directa y botón de cierre rápido (`ESC` o botón X).

---

## 3. Requisitos de Contenido e Información Profesional (REQ-CONTENT)

### REQ-CONTENT-001: Fidelidad de Datos Profesionales

- **Prioridad**: MUST
- **Descripción**: Todos los textos mostrados en el Hangar deben provenir de las fuentes de verdad autorizadas (`data/portfolio.tsx` y `data/locales/`):
    - +20 años de experiencia técnica en sistemas e IT.
    - Trayectoria militar en las Fuerzas Armadas (aviónica, simuladores de vuelo, mantenimiento electrónico, control de calidad).
    - Experiencia administrativa previa (ICONO Telecom, TRUCCSA, etc.).
    - Formación técnica oficial (Informática de Gestión, Ciberseguridad INCIBE, NATO HPS CRYPTO).
    - Distinciones militares oficiales (Cruz del Mérito Aeronáutico con Distintivo Blanco, Cruz a la Constancia en el Servicio, Reconocimiento Operativo DANA 2024).
- **Criterio de Aceptación**:
    - _Given_ cualquier panel táctico desplegado,
    - _When_ se examina el contenido,
    - _Then_ no existe información inventada, fechas erróneas o habilidades no certificadas.

---

## 4. Requisitos de Game Feel & Audio Táctico (REQ-FEEL)

### REQ-FEEL-001: Subsistema de Audio Sintético Ligero (Web Audio API)

- **Prioridad**: SHOULD
- **Descripción**: Implementar un sintetizador de audio táctico ultraliviano nativo (`AudioContext`) con micro-sonidos para: `hover` (bip sutil 800Hz), `select` / `confirm` (tono ascendente táctico), `open_panel` y `close_panel`. Desactivado por defecto o con interruptor global guardado en estado.
- **Criterio de Aceptación**:
    - _Given_ el audio habilitado por el usuario,
    - _When_ se interactúa con un hotspot o botón del HUD,
    - _Then_ se reproduce un tono de micro-feedback de duración menor a 60ms sin latencia ni carga de archivos MP3/WAV externos pesados.

### REQ-FEEL-002: Microinteracciones Mecánicas y CRT Visual

- **Prioridad**: SHOULD
- **Descripción**: La escena en Canvas y los paneles superpuestos deben incorporar sutil efecto de líneas de barrido CRT, viñeta táctica, partículas de energía en el núcleo del hangar y transiciones cinemáticas fluidas.
- **Criterio de Aceptación**:
    - _Given_ el usuario navegando por el Hangar,
    - _When_ se mueve o interactúa,
    - _Then_ la experiencia transmite una sensación coherente de consola aeroespacial técnica.

---

## 5. Requisitos de Accesibilidad & Responsividad (REQ-A11Y)

### REQ-A11Y-001: Navegación Total por Teclado

- **Prioridad**: MUST
- **Descripción**: Todo el Hangar debe poderse operar sin ratón mediante teclado estándar (`W/A/S/D`, Flechas, `E`, `Space`, `Enter`, `Esc`, `1-6`, `Tab`).
- **Criterio de Aceptación**:
    - _Given_ un usuario que solo utiliza teclado,
    - _When_ navega por el Hangar,
    - _Then_ puede ingresar, desplazarse, activar estaciones, leer paneles y cerrar la experiencia de manera accesible.

### REQ-A11Y-002: Adaptabilidad en Dispositivos Móviles y Táctiles

- **Prioridad**: MUST
- **Descripción**: En pantallas táctiles, se debe mostrar un D-Pad táctil ergonómico de 4 direcciones, botón de acción [E] y panel de acceso directo a subsistemas.
- **Criterio de Aceptación**:
    - _Given_ un dispositivo móvil o tablet,
    - _When_ se abre el Hangar,
    - _Then_ los controles táctiles responden con precisión y la interfaz se redimensiona proporcionalmente al viewport.

---

## 6. Requisitos de Rendimiento y Calidad de Código (REQ-PERF)

### REQ-PERF-001: Cero Nuevas Dependencias Pesadas

- **Prioridad**: MUST
- **Descripción**: Toda la funcionalidad debe construirse sobre las dependencias existentes (`react 19`, `framer-motion`, `lucide-react`, Canvas 2D nativo, Web Audio API).
- **Criterio de Aceptación**:
    - _Given_ el archivo `package.json`,
    - _When_ se audita el proyecto,
    - _Then_ no se ha instalado ninguna dependencia redundante.

### REQ-PERF-002: Tasa de Refresco de 60 FPS

- **Prioridad**: MUST
- **Descripción**: El bucle de animación (`requestAnimationFrame`) y el renderizado de partículas/sprites deben mantener 60 FPS estables sin fugas de memoria.
- **Criterio de Aceptación**:
    - _Given_ la ejecución del Hangar durante más de 2 minutos continuos,
    - _When_ se monitorea el frametime,
    - _Then_ se mantiene por debajo de 16.6ms promedio.
