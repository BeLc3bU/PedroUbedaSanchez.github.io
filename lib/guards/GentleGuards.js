/**
 * lib/guards/GentleGuards.js
 * Guardrails deterministas alineados con Gentleman-Programming/gentle-shell (v4.7 - v5.0).
 * Cero dependencias externas: compatible con cualquier versión moderna de Node.js.
 */

const fs = require('fs');
const path = require('path');

// Política compartida de rutas sensibles (Gentle Shell lib/sensitive-paths.ts)
const ENV_PATH_PATTERN = /(^|\/)\.env(?:$|[./_-])/;
const ENV_FILE_NAME = /(^|\/)\.env(?:[._-][^/]*)?$/;
const SSH_DIRECTORY_PATTERN = /(^|\/)\.ssh(?:\/|$)/;

const SENSITIVE_PATH_PATTERNS = [
  SSH_DIRECTORY_PATTERN,
  /(^|\/)\.credentials(?:\/|$)/,
  /(^|\/)library\/keychains(?:\/|$)/,
  /(^|\/)\.aws\/credentials$/,
  /(^|\/)\.config\/gh\/hosts\.ya?ml$/,
  /(^|\/)secrets(?:\/|$)/,
  ENV_PATH_PATTERN,
  /(^|\/)\.(?:envrc|netrc)(?:$|\/)/,
  /(^|\/)auth\.json$/,
  /\.(?:pem|key|p12|pfx)$/
];

/**
 * Normaliza una ruta con barras inclinadas hacia adelante y minúsculas.
 * @param {string} targetPath
 * @returns {string}
 */
function normalizeGuardPath(targetPath) {
  return String(targetPath || '').trim().replace(/\\/g, '/').toLowerCase();
}

/**
 * Determina si una ruta corresponde a un archivo o directorio sensible protegido.
 * @param {string} targetPath
 * @returns {boolean}
 */
function isSensitivePath(targetPath) {
  const normalized = normalizeGuardPath(targetPath);
  if (!normalized) return false;
  return SENSITIVE_PATH_PATTERNS.some((pattern) => pattern.test(normalized));
}

/**
 * Determina si la ruta es específicamente un archivo .env* y no otro patrón sensible.
 * @param {string} targetPath
 * @returns {boolean}
 */
function isEnvFilePath(targetPath) {
  const normalized = normalizeGuardPath(targetPath);
  return (
    ENV_FILE_NAME.test(normalized) &&
    !SENSITIVE_PATH_PATTERNS.some((pattern) => pattern !== ENV_PATH_PATTERN && pattern.test(normalized))
  );
}

/**
 * Elimina heredocs y literales entrecomillados para evitar falsos positivos en prosa.
 * @param {string} command
 * @returns {string}
 */
function stripQuotedAndHeredocText(command) {
  let cleaned = String(command || '').replace(
    /<<-?\s*(['"]?)([A-Za-z_]\w*)\1[^\n]*\n[\s\S]*?\n\2(?=\n|$)/g,
    ' '
  );
  cleaned = cleaned.replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, ' "" ');
  return cleaned;
}

/**
 * Clasifica comandos de terminal destructivos (git, filesystem, database)
 * siguiendo el modelo de confirmaciones por alcance de Gentle Shell v4.7+.
 * @param {string} command
 * @returns {{ kind: 'git'|'filesystem'|'database', hardDeny: boolean, confirmationPolicy: 'deny'|'allow_once'|'allow_session', reason: string } | null}
 */
function classifyDestructiveCommand(command) {
  const executableSurface = stripQuotedAndHeredocText(command);
  if (!executableSurface.trim()) return null;

  // 1. Git destructivo / irreversible
  if (/\bgit\s+push\b[^\n;&|]*(?:--force|-f|--mirror|--delete)\b/i.test(executableSurface)) {
    const isForce = /(?:--force|-f)\b/i.test(executableSurface) && !/--force-with-lease\b/i.test(executableSurface);
    return {
      kind: 'git',
      hardDeny: isForce,
      confirmationPolicy: isForce ? 'deny' : 'allow_once',
      reason: isForce
        ? 'Comando git push --force/-f bloqueado por riesgo de sobrescritura irreversible de historial.'
        : 'Variante sensible de git push detectada (--delete/--mirror/--force-with-lease).'
    };
  }

  if (/\bgit\s+(?:reset\s+--hard|clean\s+-[a-z]*f|branch\s+-D)\b/i.test(executableSurface)) {
    return {
      kind: 'git',
      hardDeny: false,
      confirmationPolicy: 'allow_once',
      reason: 'Operación git potencialmente destructiva sobre cambios no guardados o ramas.'
    };
  }

  // 2. Base de datos destructiva (hardDeny cuando implica pérdida de esquema/datos)
  if (/\b(?:DROP\s+(?:TABLE|DATABASE|SCHEMA)|TRUNCATE\s+TABLE|prisma\s+migrate\s+reset)\b/i.test(executableSurface)) {
    return {
      kind: 'database',
      hardDeny: true,
      confirmationPolicy: 'deny',
      reason: 'Operación destructiva de base de datos bloqueada (DROP/TRUNCATE/migrate reset).'
    };
  }

  if (/\bDELETE\s+FROM\s+[a-z0-9_."`]+\s*(?:;|$)/i.test(executableSurface)) {
    return {
      kind: 'database',
      hardDeny: true,
      confirmationPolicy: 'deny',
      reason: 'DELETE FROM sin cláusula WHERE bloqueado por riesgo de pérdida total de registros.'
    };
  }

  // 3. Sistema de archivos destructivo
  if (
    /\brm\s+[^\n;&|]*-(?:[a-z]*r[a-z]*f|[a-z]*f[a-z]*r)\b/i.test(executableSurface) ||
    /\bRemove-Item\b[^\n;&|]*-Recurse[^\n;&|]*-Force\b/i.test(executableSurface) ||
    /\b(?:rmdir|rd)\s+\/s\b/i.test(executableSurface)
  ) {
    const hitsRoot = /(?:^|\s)(?:\/|\*|~\/?|C:\\)(?:\s|$)/i.test(executableSurface);
    return {
      kind: 'filesystem',
      hardDeny: hitsRoot,
      confirmationPolicy: hitsRoot ? 'deny' : 'allow_once',
      reason: hitsRoot
        ? 'Borrado recursivo sobre raíz o comodín global bloqueado.'
        : 'Borrado recursivo forzado detectado; requiere confirmación explícita.'
    };
  }

  return null;
}

/**
 * Busca marcadores de conflicto Git sin resolver en un contenido de texto.
 * @param {string} content
 * @returns {number[]} Números de línea (1-based) con marcadores
 */
function findConflictMarkersInText(content) {
  const lines = String(content || '').split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^(<{7}(?:\s|$)|={7}$|>{7}(?:\s|$))/.test(line)) {
      hits.push(i + 1);
    }
  }
  return hits;
}

/**
 * Escanea una lista de archivos relativos en busca de marcadores de conflicto.
 * @param {string} baseDir
 * @param {string[]} relPaths
 * @returns {Array<{ file: string, lines: number[] }>}
 */
function findConflictMarkersInFiles(baseDir, relPaths) {
  const findings = [];
  for (const rel of relPaths) {
    const full = path.resolve(baseDir, rel);
    if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) continue;
    try {
      const content = fs.readFileSync(full, 'utf8');
      const lines = findConflictMarkersInText(content);
      if (lines.length > 0) {
        findings.push({ file: rel.replace(/\\/g, '/'), lines });
      }
    } catch (_) {}
  }
  return findings;
}

/**
 * Valida superficies de edición permitidas (`## Allowed edit surfaces`).
 * Regla Gentle Shell: no vacío, sin `.`, sin raíz desnuda y sin rutas absolutas.
 * @param {string[]} surfaces
 * @returns {{ valid: boolean, surfaces: string[], errors: string[] }}
 */
function validateEditSurfaces(surfaces) {
  const errors = [];
  if (!Array.isArray(surfaces) || surfaces.length === 0) {
    return {
      valid: false,
      surfaces: [],
      errors: ['Allowed edit surfaces no puede estar vacío.']
    };
  }

  const normalized = [];
  for (const raw of surfaces) {
    const entry = String(raw || '').trim().replace(/^`|`$/g, '').replace(/\\/g, '/');
    if (!entry) {
      errors.push('Entrada vacía en Allowed edit surfaces.');
      continue;
    }
    if (entry === '.' || entry === './' || entry === '/') {
      errors.push(`Superficie demasiado amplia rechazada: '${entry}'.`);
      continue;
    }
    if (path.isAbsolute(entry) || /^[a-zA-Z]:\//.test(entry) || entry.startsWith('/')) {
      errors.push(`No se permiten rutas absolutas en Allowed edit surfaces: '${entry}'.`);
      continue;
    }
    if (entry.split('/').includes('..')) {
      errors.push(`No se permiten escapes '..' en Allowed edit surfaces: '${entry}'.`);
      continue;
    }
    normalized.push(entry.replace(/^\.\//, ''));
  }

  return {
    valid: errors.length === 0 && normalized.length > 0,
    surfaces: normalized,
    errors
  };
}

/**
 * Convierte un patrón glob simple (**, *, ?) a expresión regular.
 * @param {string} pattern
 * @returns {RegExp}
 */
function globToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '___DOUBLE_STAR___')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]')
    .replace(/___DOUBLE_STAR___/g, '.*');
  return new RegExp(`^${escaped}$`);
}

/**
 * Verifica si una ruta relativa está cubierta por al menos una superficie autorizada.
 * @param {string} targetPath
 * @param {string[]} surfaces
 * @returns {boolean}
 */
function isPathInSurfaces(targetPath, surfaces) {
  const cleanTarget = String(targetPath || '').trim().replace(/\\/g, '/').replace(/^\.\//, '');
  if (!cleanTarget || !Array.isArray(surfaces) || surfaces.length === 0) return false;
  return surfaces.some((surface) => {
    const cleanSurface = surface.replace(/\/$/, '');
    if (cleanTarget === cleanSurface) return true;
    if (surface.endsWith('/')) {
      return cleanTarget.startsWith(surface);
    }
    return globToRegex(cleanSurface).test(cleanTarget);
  });
}

module.exports = {
  SENSITIVE_PATH_PATTERNS,
  SSH_DIRECTORY_PATTERN,
  normalizeGuardPath,
  isSensitivePath,
  isEnvFilePath,
  classifyDestructiveCommand,
  findConflictMarkersInText,
  findConflictMarkersInFiles,
  validateEditSurfaces,
  isPathInSurfaces
};
