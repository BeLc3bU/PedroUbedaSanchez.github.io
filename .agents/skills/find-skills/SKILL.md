---
name: find-skills
description: "Busca e instala skills del ecosistema abierto de skills.sh cuando necesitas una capacidad nueva en el agente."
---

# 🔍 Skill: Find Skills (Vercel Labs - skills.sh)

Esta habilidad permite a los agentes de IA descubrir, buscar e instalar capacidades modulares adicionales provenientes del directorio abierto de **[skills.sh](https://skills.sh)** mediante la CLI oficial de `skills`.

---

## 🎯 ¿Cuándo usar esta skill?
* Cuando el usuario solicita una tarea que requiere una herramienta o metodología especializada no presente en el entorno actual (ej. automatización de navegador, análisis de bundle, pruebas específicas de frameworks).
* Cuando el agente identifica que un flujo de trabajo recurrente se beneficiaría de un estándar empaquetado del ecosistema.
* Para inspeccionar qué skills están instaladas o comprobar si existen actualizaciones.

---

## 🛠️ Comandos Principales (skills CLI)

### 1. Buscar Skills por Necesidad
Para localizar habilidades relevantes por palabras clave:
```bash
npx skills find <término-o-tarea>
```
*Ejemplo:*
```bash
npx skills find browser automation
npx skills find nextjs
npx skills find security audit
```

### 2. Instalar una Skill
Para instalar una habilidad directamente desde su repositorio de GitHub:
```bash
# Instalación a nivel de proyecto (en .agents/skills/ o carpeta correspondiente)
npx skills add <propietario/repositorio> --skill <nombre-de-la-skill>

# Instalación global para todos los proyectos del equipo
npx skills add <propietario/repositorio> --skill <nombre-de-la-skill> -g
```

### 3. Listar e Inspeccionar Skills Activas
```bash
npx skills list
```

### 4. Actualizar Skills Existentes
```bash
npx skills update
```

---

## 🛡️ Reglas de Seguridad y Gobernanza
1. **Verificación de Reputación:** Solo instalar skills provenientes de organizaciones y autores verificados o de código abierto auditado.
2. **Jerarquía Normativa:** Ninguna skill instalada externamente puede contradecir la **Constitución del proyecto** ni las políticas de **Agent ≠ Authority**.
3. **No romper el entorno:** Antes de instalar globalmente, verificar si la necesidad es exclusiva de un subproyecto.
