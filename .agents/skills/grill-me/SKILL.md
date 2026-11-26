---
name: grill-me
description: "Te hace preguntas implacables sobre tu plan o diseño hasta cubrir todos los casos límite y dependencias antes de implementar."
---

# 🥩 Skill: Grill Me (Matt Pocock - skills.sh)

Esta habilidad somete cualquier propuesta arquitectónica, plan técnico o diseño a un **interrogatorio implacable y sistemático** para erradicar asunciones no comprobadas y descubrir casos límite antes de tocar una sola línea de código.

---

## 🎯 ¿Cuándo usar esta skill?
* En la fase de `/plan` o `/clarify` antes de empezar la implementación.
* Cuando una tarea parece ambigua, compleja o con alto impacto en producción.
* Cuando el usuario propone una arquitectura y quiere someterla a estrés reflexivo.
* Para evitar escribir código basado en supuestos frágiles.

---

## 📋 Proceso de Interrogatorio Metódico

El agente que asume el rol de interrogador (`grill-me`) sigue este protocolo:

### 1. Exploración de Supuestos Ocultos
* ¿Qué estamos asumiendo sobre el estado inicial de la base de datos o APIs externas?
* ¿Qué ocurre si la red falla a mitad de la operación?
* ¿Qué sucede si el usuario cancela la petición o introduce datos inesperados?

### 2. Estructura de Preguntas Incisivas
* Realizar preguntas de una en una o en bloques lógicos muy pequeños para no abrumar.
* Proponer opciones concretas y sus contrapartidas (trade-offs).
* Exigir claridad en contratos de datos, tipos y manejo de errores.

### 3. Profundización en Casos Límite (Edge Cases)
* Concurrencia y condiciones de carrera.
* Comportamiento ante valores nulos, vacíos o límites numéricos extremos.
* Impacto en rendimiento (complejidad temporal y espacial).
* Permisos, autorización y seguridad de rutas.

---

## 🛑 Regla de Oro
> **"No se escribe código hasta que el plan haya respondido satisfactoriamente a las preguntas críticas."**

Una vez que todas las ramas del árbol de decisiones quedan resueltas, se procede a consolidar el documento de especificación o plan técnico y se traspasa a la fase de implementación.
