---
name: systematic-debugging
description: "Depura con método estricto en 4 fases (reproducir, aislar, formular hipótesis y verificar con tests) antes de intentar cualquier arreglo."
---

# 🔬 Skill: Systematic Debugging (Jesse Vincent / obra - skills.sh)

Esta habilidad impone una metodología científica y rigurosa de resolución de problemas técnicos para erradicar el "parcheo a ciegas" o la modificación aleatoria de código sin comprender la causa raíz.

---

## 🛑 La Ley de Hierro del Debugging
```text
PROHIBIDO PROPONER PARCHES SIN INVESTIGAR LA CAUSA RAÍZ PRIMERO
```

Si no se ha completado la **Fase 1**, el agente no tiene autorización para sugerir cambios en el código.

---

## 🎯 ¿Cuándo usar esta skill?
* Ante cualquier fallo en pruebas unitarias, de integración o e2e.
* Ante comportamientos inesperados o bugs en producción.
* Ante fallos de compilación, construcción o integración continua.
* Especialmente cuando se siente la tentación de "un cambio rápido a ver si cuela" o tras haber intentado ya 2 soluciones fallidas.

---

## 🔄 El Proceso en 4 Fases Obligatorias

### Fase 1: Investigación de la Causa Raíz
1. **Lectura Exhaustiva del Error:** Leer la traza de pila (stack trace) completa, números de línea, rutas y códigos de error exactos sin omitir detalles.
2. **Reproducción Consistente:** Confirmar los pasos exactos y repetibles para disparar el fallo. Si no es reproducible, recopilar telemetría y datos antes de adivinar.
3. **Revisión de Cambios Recientes:** Consultar `git diff`, commits recientes y cambios en dependencias o variables de entorno.
4. **Trazabilidad de Límites de Componentes:** En sistemas multicapa, insertar instrumentación de diagnóstico para aislar exactamente en qué frontera se produce la anomalía.

### Fase 2: Análisis de Patrones
1. **Buscar Ejemplos que Funcionen:** Encontrar código similar en el repositorio que sí funcione correctamente.
2. **Comparar con Referencias:** Leer la implementación de referencia línea por línea para identificar divergencias.
3. **Identificar Diferencias Mínimas:** Listar toda diferencia sin asumir que "eso no puede ser".

### Fase 3: Hipótesis Científica y Prueba Aislada
1. **Formular una Hipótesis Única:** *"Creo que la causa raíz es X porque se observa Y"*.
2. **Prueba Mínima:** Realizar el cambio más pequeño posible que confirme o refute la hipótesis (modificar una sola variable a la vez).
3. **Validar:** Si se confirma, pasar a la Fase 4. Si se refuta, formular una nueva hipótesis limpia sin apilar cambios.

### Fase 4: Implementación y Prevención de Regresiones
1. **Crear Test Automatizado que Falla (TDD):** Escribir una prueba unitaria que reproduzca el bug de forma aislada (el test debe fallar en rojo antes del arreglo).
2. **Implementar el Arreglo Atómico:** Modificar el código atacando la causa raíz, no el síntoma.
3. **Verificación Total:** Comprobar que el nuevo test pasa en verde y que ninguna prueba previa se ha roto.
4. **Regla de 3 Intentos:** Si 3 intentos de arreglo fallan consecutivamente, **DETENERSE**. El problema no es un bug puntual; es un defecto arquitectónico que debe discutirse antes de seguir.
