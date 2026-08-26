# Documento de Diseño Arquitectónico: Hangar Táctico Evolution

Este documento especifica la arquitectura de componentes, flujo de datos, sistema de eventos, interfaz gráfica y experiencia de usuario (Game Feel) del Hangar Táctico.

---

## 1. Arquitectura del Sistema

```
                      ┌────────────────────────────────────────┐
                      │              Page Route                │
                      │       app/page.tsx (HomeContent)       │
                      └───────────────────┬────────────────────┘
                                          │
                        ┌─────────────────┴─────────────────┐
                        │        GameSection.tsx            │
                        │    (Hero Entry & Trigger CTA)     │
                        └─────────────────┬─────────────────┘
                                          │ [isOpen state]
                        ┌─────────────────┴─────────────────┐
                        │        HangarModal.tsx            │
                        └─────────────────┬─────────────────┘
                                          │
               ┌──────────────────────────┴──────────────────────────┐
               │                                                     │
 ┌─────────────▼────────────┐                           ┌────────────▼─────────────┐
 │    TacticalHUD.tsx       │                           │      HangarGame.tsx      │
 │ - System Telemetry Bar   │                           │ - Canvas 2D World Engine │
 │ - Audio Synthesizer (FX) │                           │ - Player Avatar Control  │
 │ - Direct Navigation Bar  │                           │ - Hotspot Zone Detection │
 │ - Shortcuts Overlay      │                           │ - Ambient Particles / FX │
 └─────────────┬────────────┘                           └────────────┬─────────────┘
               │                                                     │
               └──────────────────────────┬──────────────────────────┘
                                          │
                         ┌────────────────▼────────────────┐
                         │   TacticalStationModal.tsx      │
                         │ - Station Dossier Header        │
                         │ - Step-by-step Briefing Log     │
                         │ - Interactive Quick Actions     │
                         │   (Download CV, GitHub, Contact)│
                         └─────────────────────────────────┘
```

---

## 2. Mapa Conceptual de Estaciones & Metáforas

| Estación ID | Metáfora Aeronáutica / Táctica           | Contenido Profesional Real                                                                                 | Color & Código       | Acción Rápida                    |
| :---------- | :--------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------- | :------------------------------- |
| `avionics`  | **Bahía de Aviónica & Hardware Crítico** | Mantenimiento de aviónica militar, simuladores de vuelo, electrónica de combate, tolerancia cero a fallos. | Sky Cyan (`#38bdf8`) | Ver Especialidades               |
| `agents`    | **Laboratorio de Software & IA**         | Arquitectura AI-First, TypeScript estricto, React 19, Next.js 16, CI/CD, Spec-Driven Development.          | Violet (`#a855f7`)   | Explorar Stack                   |
| `infra`     | **Centro de Datos & Servidores**         | Active Directory, Windows Server, redes empresariales, soporte IT avanzado, estabilidad operacional.       | Emerald (`#22c55e`)  | Ver Certificaciones              |
| `command`   | **Puente de Mando & Briefing**           | Resumen integral del perfil, descarga directa de CV Oficial en PDF, enlace directo a canales de contacto.  | Amber (`#f59e0b`)    | [Descargar CV PDF] / [Contactar] |

---

## 3. Sistema de Audio Táctico Sintético (Web Audio API)

Para cumplir con la directriz de **cero dependencias pesadas** y **cero latencia de red**:

- Módulo: `lib/game/audio.ts`
- Utiliza la API nativa del navegador `window.AudioContext`.
- Sonidos generados mediante osciladores matemáticos (`OscillatorNode`) y rampas de ganancia (`GainNode`):
    - **`playHoverSound()`**: Onda sinusoidal a 880Hz, duración 35ms, decay rápido.
    - **`playSelectSound()`**: Onda triangular con modulación de frecuencia ascendente 440Hz -> 880Hz, duración 70ms.
    - **`playOpenSound()`**: Acorde sintético dual de apertura de compuerta táctica (520Hz + 780Hz), 90ms.
    - **`playCloseSound()`**: Tono descendente 600Hz -> 300Hz, 80ms.
- **Control de Usuario**: Interruptor en el HUD persistente y mudo por defecto o con activación explícita.

---

## 4. Sistema de Estados de la Estación (Station Lifecycle)

```
       [IDLE / STANDBY]
              │
              ▼ (Player enters collision radius < 65px)
       [HOTSPOT DETECTED]  ───> Emite pulso visual y sonido sutil
              │
              ▼ (Player presses [E], [Space], or clicks Station / HUD)
       [ACCESSING / BRIEFING]
              │
              ├───> Diálogo guiado / Transcripción paso a paso
              ├───> Badges técnicas con tecnologías reales
              └───> Botones de acción directa (PDF, Proyectos, Contacto)
              │
              ▼ (User finishes dialog, presses [ESC], or clicks [EXIT])
       [STANDBY / RESUMED]
```

---

## 5. Diseño del HUD Táctico (Heads-Up Display)

El HUD se compone de elementos minimalistas con estética de aviónica militar:

1. **Barra Superior**:
    - `[SYS_ONLINE]` en verde esmeralda parpadeante.
    - Identificador del Operador: `OPERATOR: PEDRO ÚBEDA`.
    - Coordenadas de posición dinámica del avatar: `POS: X: 384 | Y: 450`.
    - Selector de Idioma `[ES | EN]`.
    - Conmutador de Audio `[AUDIO: ON/OFF]`.
    - Botón `[SALIR / EXIT]`.
2. **Matriz de Acceso Rápido (Quick-Nav Dock)**:
    - 4 accesos directos numéricos en la parte inferior o lateral para saltar instantáneamente a las estaciones sin necesidad de caminar si el usuario tiene prisa.
3. **Panel de Información Táctica**:
    - Modal flotante con desenfoque de fondo (`backdrop-blur-md`), borde de neón temático según la estación y tipografía monoespaciada para metadatos técnicos.
