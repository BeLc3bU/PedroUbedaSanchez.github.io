/**
 * lib/adapters/DecisionProvider.js
 * Capa de Decisión y Adaptadores Desacoplados para Elite Agent Bootstrap v2 + ODD (Gentle Shell v5).
 *
 * Sigue el principio Core vs. Extended:
 * - DeterministicDecisionProvider: Core, 100% autónomo, reglas léxicas, rúbrica de alto riesgo ODD (1-6)
 *   y cruce con .agents/registry.json (cero dependencias).
 * - KevJevDecisionProvider: Extended, adaptador opcional para API /v1/systemone o MCP de Kev/Jev con fallback automático.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

/**
 * Los 6 ítems de Alto Riesgo del arnés ODD (Gentle Shell v4.7 - v5.0).
 */
const HIGH_RISK_ITEMS = {
  1: 'Datos o efectos irreversibles no reconstruibles (migraciones, borrado o cambio de formato persistido)',
  2: 'Seguridad (autenticación, permisos, credenciales, secretos, guardias o sandbox)',
  3: 'Contratos consumidos por terceros o código compartido no solicitado (API pública, flags CLI, formatos o prompts)',
  4: 'Concurrencia (locks, condiciones de carrera u orden asíncrono)',
  5: 'Entrega o entorno (instaladores, release, CI/CD, deploy o dependencias)',
  6: 'Sin cobertura de pruebas que detecte regresiones en el cambio'
};

class DecisionProvider {
  /**
   * Evalúa un texto de tarea y determina el agente idóneo, riesgo ODD y sus restricciones.
   * @param {string} taskText
   * @param {object} context
   * @returns {Promise<object>}
   */
  async decide(taskText, context = {}) {
    throw new Error('decide() debe ser implementado por la subclase');
  }
}

/**
 * Proveedor Determinista (Core): Rápido, offline, seguro y basado en reglas ODD y gobernanza.
 */
class DeterministicDecisionProvider extends DecisionProvider {
  constructor(registryPath) {
    super();
    this.registryPath = registryPath || path.resolve(process.cwd(), '.agents', 'registry.json');
    this.registry = this._loadRegistry();
  }

  _loadRegistry() {
    if (fs.existsSync(this.registryPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.registryPath, 'utf8'));
      } catch (_) {
        return { agents: [] };
      }
    }
    return { agents: [] };
  }

  /**
   * Evalúa la rúbrica de los 6 ítems de alto riesgo ODD sobre el texto de la tarea.
   * @param {string} text
   * @returns {{ risk_items: number[], risk_line: string, escalate: boolean }}
   */
  assessHighRisk(text) {
    const lower = (text || '').toLowerCase();
    const matched = [];

    const rules = [
      { item: 1, regex: /\b(migraci[oó]n|migration|drop\s+table|truncate|reescribir\s+datos|formato\s+persistido|borrar\s+datos)\b/i },
      { item: 2, regex: /\b(auth|jwt|oauth|credenciales?|credentials?|secretos?|secrets?|tokens?|permisos?|permissions?|sandbox|guardrails?|owasp|vulnerabilidad(?:es)?|\.env|ssl|tls)\b/i },
      { item: 3, regex: /\b(contrato\s+p[uú]blico|api\s+p[uú]blica|breaking\s+change|esquema\s+json|schema|cli\s+flags?|c[oó]digo\s+compartido)\b/i },
      { item: 4, regex: /\b(concurrencia|concurrency|race\s+condition|mutex|lock|deadlock|paralel[oa]s?|async\s+ordering)\b/i },
      { item: 5, regex: /\b(instalador|installer|release|ci\/cd|github\s+actions|workflow|deploy|despliegue|dependencias|package\.json)\b/i },
      { item: 6, regex: /\b(sin\s+tests?|sin\s+pruebas|no\s+test\s+coverage|untested)\b/i }
    ];

    for (const r of rules) {
      if (r.regex.test(lower)) {
        matched.push(r.item);
      }
    }

    if (matched.length === 0) {
      return {
        risk_items: [],
        risk_line: 'Risk: none',
        escalate: false
      };
    }

    const primary = matched[0];
    return {
      risk_items: matched,
      risk_line: `Risk: item ${primary} (${HIGH_RISK_ITEMS[primary]})`,
      escalate: true
    };
  }

  /**
   * Clasifica el tamaño de la tarea (small vs large) aplicando el Resume Test ODD.
   * @param {string} text
   * @param {{ risk_items: number[] }} riskInfo
   * @param {object} context
   * @returns {'small'|'large'}
   */
  classifyTaskSize(text, riskInfo, context = {}) {
    if (context.taskSize === 'small' || context.taskSize === 'large') {
      return context.taskSize;
    }
    const lower = (text || '').toLowerCase();
    const largeIndicators = /\b(m[uú]ltiples?\s+sesiones|multi-sesi[oó]n|arquitectura|sistema\s+completo|migrar\s+todo|varias\s+fases|large\s+feature|tracking\s+odd)\b/i;
    if (largeIndicators.test(lower) || (riskInfo && riskInfo.risk_items.length >= 2)) {
      return 'large';
    }
    return 'small';
  }

  async decide(taskText, context = {}) {
    const text = (taskText || '').toLowerCase().trim();
    const workflowMode = context.workflowMode === 'full-delegation' ? 'full-delegation' : 'organic';

    if (!text) {
      return {
        agent_id: 'orchestrator',
        confidence: 0.1,
        risk_level: 'medium',
        requires_human_approval: false,
        task_size: 'small',
        risk_items: [],
        risk_line: 'Risk: none',
        escalate: false,
        workflow_mode: workflowMode,
        route: 'inline',
        reason: 'Texto de tarea vacío; enrutado a orquestador por defecto.',
        engine: 'deterministic-core'
      };
    }

    // 1. Guardrail Constitucional: Detección de acciones críticas o de bypass (Agent ≠ Authority)
    const escalationTriggers = [
      /merge.*(main|master|producci[oó]n)/i,
      /push.*(main|master|producci[oó]n)/i,
      /deploy.*(producci[oó]n|prod)/i,
      /saltar.*revisi[oó]n/i,
      /bypass.*(review|gate|aprobaci[oó]n)/i,
      /eliminar.*(base de datos|bd|db|producci[oó]n)/i,
      /sin.*aprobaci[oó]n.*humana/i,
      /auto.*aprobar/i,
      /force\s*push/i
    ];

    for (const trigger of escalationTriggers) {
      if (trigger.test(text)) {
        const reviewerAgent = this._getAgent('reviewer') || { risk_level: 'medium', requires_human_approval: true };
        return {
          agent_id: 'reviewer',
          agent_name: reviewerAgent.name || 'Puerta de Revisión',
          confidence: 1.0,
          risk_level: 'high',
          requires_human_approval: true,
          escalate: true,
          task_size: 'large',
          risk_items: [2, 3],
          risk_line: `Risk: item 2 (${HIGH_RISK_ITEMS[2]})`,
          workflow_mode: workflowMode,
          route: 'delegated',
          reason: 'Acción crítica detectada: violación potencial de regla constitucional (Agent ≠ Authority). Se exige revisión y aprobación humana obligatoria.',
          allowed_files: reviewerAgent.allowed_files || [],
          engine: 'deterministic-core'
        };
      }
    }

    // 2. Diccionario de pesos léxicos por agente canónico
    const agentKeywords = {
      'spec-agent': [
        'especificar', 'especificaci[oó]n', 'spec', 'sdd', 'odd', 'historias? de usuario',
        'criterios? de aceptaci[oó]n', 'given-when-then', 'requisitos?', 'alcance',
        'clarificar', 'redactar plan', 'casos? l[ií]mite', 'user stories'
      ],
      'tester': [
        'test', 'tests', 'pruebas?', 'cobertura', 'coverage', 'jest', 'vitest',
        'mocha', 'unitarias?', 'e2e', 'integraci[oó]n', 'tdd', 'test-driven',
        'verificar suite', 'testear', 'fallos? de test'
      ],
      'security-agent': [
        'seguridad', 'vulnerabilidad', 'vulnerabilidades', 'owasp', 'cve',
        'auditor[ií]a', 'inyecci[oó]n', 'xss', 'csrf', 'secretos?', 'tokens?',
        'sanitizar', 'auth bypass', 'privilegios', 'permisos'
      ],
      'reviewer': [
        'revisar pr', 'revisi[oó]n de c[oó]digo', 'code review', 'puerta de calidad',
        'quality gate', 'aprobar merge', 'validar pr', 'auditar pull request',
        'checklist de calidad', 'convergencia'
      ],
      'optimization-agent': [
        'optimizar', 'optimizaci[oó]n', 'rendimiento', 'performance', 'bundle',
        'latencia', 'memoria', 'profiling', 'tree-shaking', 'lighthouse', 'speed'
      ],
      'implementer': [
        'implementar', 'escribir c[oó]digo', 'desarrollar', 'refactorizar',
        'programar', 'crear componente', 'crear endpoint', 'modificar l[oó]gica',
        'feature', 'bugfix', 'arreglar bug', 'corregir error', 'endpoint'
      ],
      'orchestrator': [
        'orquestar', 'coordinar', 'planificar fases', 'asignar tareas',
        'estado general', 'supervisar equipo', 'distribuir'
      ]
    };

    const scores = {};
    for (const [agentId, patterns] of Object.entries(agentKeywords)) {
      scores[agentId] = 0;
      for (const pattern of patterns) {
        const regex = new RegExp(`\\b${pattern}\\b`, 'i');
        if (regex.test(text)) {
          scores[agentId] += 1;
        }
      }
    }

    let bestAgent = 'implementer';
    let maxScore = 0;
    for (const [agentId, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        bestAgent = agentId;
      }
    }

    const confidence = maxScore > 0 ? Math.min(1.0, 0.5 + maxScore * 0.2) : 0.4;
    const agentData = this._getAgent(bestAgent) || {
      id: bestAgent,
      name: bestAgent,
      risk_level: 'medium',
      requires_human_approval: false,
      allowed_files: []
    };

    const riskAssessment = this.assessHighRisk(text);
    const taskSize = this.classifyTaskSize(text, riskAssessment, context);
    const mutatingAgent = ['implementer', 'tester', 'spec-agent'].includes(agentData.id);
    const route = workflowMode === 'full-delegation' && mutatingAgent ? 'delegated' : 'inline';

    return {
      agent_id: agentData.id,
      agent_name: agentData.name,
      confidence: Number(confidence.toFixed(2)),
      risk_level: riskAssessment.escalate ? 'high' : agentData.risk_level,
      requires_human_approval: agentData.requires_human_approval,
      escalate: riskAssessment.escalate,
      risk_items: riskAssessment.risk_items,
      risk_line: riskAssessment.risk_line,
      task_size: taskSize,
      workflow_mode: workflowMode,
      route,
      allowed_files: agentData.allowed_files || [],
      reason: maxScore > 0
        ? `Coincidencia léxica determinista (${maxScore} términos identificados para rol '${bestAgent}').`
        : `Enrutamiento por defecto a '${bestAgent}' con confianza heurística.`,
      engine: 'deterministic-core'
    };
  }

  _getAgent(agentId) {
    if (!this.registry || !Array.isArray(this.registry.agents)) return null;
    return this.registry.agents.find(a => a.id === agentId) || null;
  }
}

/**
 * Adaptador Extendido para Kev / Jev / System 1 (/v1/systemone o MCP)
 * Si no está configurado, delega con fallback automático a DeterministicDecisionProvider.
 */
class KevJevDecisionProvider extends DecisionProvider {
  constructor(options = {}) {
    super();
    this.apiUrl = options.apiUrl || process.env.KEV_API_URL || process.env.JEV_ENDPOINT || null;
    this.apiKey = options.apiKey || process.env.KEV_API_KEY || null;
    this.fallback = new DeterministicDecisionProvider(options.registryPath);
  }

  async decide(taskText, context = {}) {
    if (!this.apiUrl) {
      const res = await this.fallback.decide(taskText, context);
      res.engine = 'kev-fallback-deterministic';
      return res;
    }

    try {
      const payload = JSON.stringify({
        task: taskText,
        options: ['spec-agent', 'implementer', 'tester', 'security-agent', 'reviewer', 'optimization-agent', 'orchestrator'],
        context
      });

      const urlObj = new URL(this.apiUrl);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;

      const responseBody = await new Promise((resolve, reject) => {
        const req = client.request(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
          },
          timeout: 2000
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(data));
        });

        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Timeout en llamada a Kev API (>2000ms)'));
        });

        req.write(payload);
        req.end();
      });

      const parsed = JSON.parse(responseBody);
      const riskAssessment = this.fallback.assessHighRisk(taskText);
      return {
        agent_id: parsed.agent_id || parsed.choice || 'implementer',
        confidence: parsed.confidence || 0.95,
        risk_level: parsed.risk_level || (riskAssessment.escalate ? 'high' : 'medium'),
        requires_human_approval: Boolean(parsed.requires_human_approval),
        escalate: Boolean(parsed.escalate || riskAssessment.escalate),
        risk_items: riskAssessment.risk_items,
        risk_line: riskAssessment.risk_line,
        task_size: this.fallback.classifyTaskSize(taskText, riskAssessment, context),
        workflow_mode: context.workflowMode === 'full-delegation' ? 'full-delegation' : 'organic',
        route: context.workflowMode === 'full-delegation' ? 'delegated' : 'inline',
        reason: parsed.reason || 'Clasificación obtenida vía modelo de decisión Kev/Jev',
        engine: 'kev-system1-api'
      };
    } catch (err) {
      const fallbackRes = await this.fallback.decide(taskText, context);
      fallbackRes.engine = 'kev-fallback-error';
      fallbackRes.warning = `Fallo en Kev API (${err.message}). Recuperado con motor determinista.`;
      return fallbackRes;
    }
  }
}

/**
 * Fábrica para instanciar el proveedor adecuado según el entorno.
 */
function createDecisionProvider(options = {}) {
  const preferExtended = Boolean(process.env.KEV_API_URL || process.env.JEV_ENDPOINT || options.preferExtended);
  if (preferExtended) {
    return new KevJevDecisionProvider(options);
  }
  return new DeterministicDecisionProvider(options.registryPath);
}

module.exports = {
  HIGH_RISK_ITEMS,
  DecisionProvider,
  DeterministicDecisionProvider,
  KevJevDecisionProvider,
  createDecisionProvider
};
