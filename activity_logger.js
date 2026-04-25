#!/usr/bin/env node
/**
 * Activity Logger para ClawHouse
 * Registra atividades do agente em formato JSONL para consumo externo.
 */

const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(process.env.HOME || '/root', '.openclaw', 'workspace', 'clawhouse');
const LOG_FILE = path.join(LOG_DIR, 'activity_stream.jsonl');

// Garantir diretório existe
function ensureDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

// Inferir "room" baseado no contexto
function inferRoom(context = {}) {
  const { project, channel, tool, file } = context;
  
  if (project === 'Claw' || (file && file.includes('axioma'))) return 'escritorio';
  if (project === 'TCC' || (file && file.includes('TCC'))) return 'biblioteca';
  if (tool === 'feishu_calendar_event' || tool === 'feishu_task_task') return 'sala_de_controle';
  if (channel === 'telegram' && context.bot?.includes('nutri')) return 'cozinha';
  if (tool === 'sessions_spawn' || (file && file.includes('MVP'))) return 'laboratorio';
  
  return 'entrada';
}

// Criar narrativa automática
function autoNarrative(kind, activity = {}, context = {}) {
  const actor = context.actor || 'Claw';
  const room = inferRoom(context);
  
  const narratives = {
    session_start: `${actor} foi chamado por ${context.user || 'alguém'}`,
    thinking: `${actor} está pensando...`,
    tool_call: `${actor} está usando ${activity.tool || 'uma ferramenta'}`,
    file_edit: `${actor} editou ${activity.file || 'um arquivo'}`,
    file_read: `${actor} leu ${activity.file || 'um arquivo'}`,
    web_search: `${actor} pesquisou "${activity.query || 'algo'}"`,
    message_sent: `${actor} enviou uma resposta`,
    session_end: `${actor} terminou e está descansando`,
    error: `${actor} encontrou um erro: ${activity.error || 'desconhecido'}`,
    idle: `${actor} está idle no ${room}`,
    heartbeat: `${actor} executou uma verificação automática`,
    command: `${actor} executou ${activity.command || 'um comando'}`,
  };
  
  return narratives[kind] || `${actor} realizou uma ação`;
}

/**
 * Registra uma atividade no stream
 * @param {string} kind - Tipo de atividade
 * @param {Object} activity - Detalhes da atividade
 * @param {Object} context - Contexto (channel, user, project, etc)
 */
function logActivity(kind, activity = {}, context = {}) {
  ensureDir();
  
  const event = {
    timestamp: new Date().toISOString(),
    session_id: context.session_id || process.env.OPENCLAW_SESSION_ID || 'unknown',
    type: 'agent_activity',
    actor: context.actor || 'axioma_main',
    kind,
    activity: {
      ...activity,
      duration_ms: activity.duration_ms || null,
    },
    context: {
      channel: context.channel || 'unknown',
      user_id: context.user_id || null,
      project: context.project || null,
      room: inferRoom({ ...context, ...activity }),
    },
    narrative: context.narrative || autoNarrative(kind, activity, context),
  };
  
  const line = JSON.stringify(event) + '\n';
  
  try {
    fs.appendFileSync(LOG_FILE, line);
  } catch (err) {
    console.error('[ActivityLogger] Falha ao registrar:', err.message);
  }
  
  return event;
}

/**
 * Lê eventos recentes do stream
 * @param {number} limit - Quantidade máxima de eventos
 * @param {string} since - Timestamp ISO para filtrar
 */
function readActivity(limit = 50, since = null) {
  if (!fs.existsSync(LOG_FILE)) return [];
  
  const lines = fs.readFileSync(LOG_FILE, 'utf8').trim().split('\n').filter(Boolean);
  const events = lines.map(l => JSON.parse(l));
  
  if (since) {
    const sinceDate = new Date(since);
    const filtered = events.filter(e => new Date(e.timestamp) > sinceDate);
    return filtered.slice(-limit);
  }
  
  return events.slice(-limit);
}

/**
 * Limpa o log (cuidado!)
 */
function clearActivity() {
  if (fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '');
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  
  if (cmd === 'read') {
    const limit = parseInt(args[1]) || 10;
    console.log(JSON.stringify(readActivity(limit), null, 2));
  } else if (cmd === 'clear') {
    clearActivity();
    console.log('Activity stream limpo.');
  } else if (cmd === 'test') {
    logActivity('thinking', {}, { channel: 'kimi-claw', user_id: '960611098' });
    logActivity('tool_call', { tool: 'kimi_search', query: 'ClawHouse' }, { channel: 'kimi-claw', project: 'ClawHouse' });
    logActivity('file_edit', { file: 'clawhouse/PROTOCOL.md', lines_added: 50 }, { channel: 'kimi-claw', project: 'ClawHouse' });
    logActivity('message_sent', { tokens: 150 }, { channel: 'kimi-claw' });
    console.log('Eventos de teste registrados.');
    console.log(readActivity(10));
  } else {
    console.log(`
Uso: node activity_logger.js [comando]

Comandos:
  test      - Gera eventos de teste
  read [N]  - Lê últimos N eventos (default: 10)
  clear     - Limpa o stream

API (require):
  logActivity(kind, activity, context)  - Registra evento
  readActivity(limit, since)            - Lê eventos
  clearActivity()                       - Limpa tudo
`);
  }
}

module.exports = { logActivity, readActivity, clearActivity, inferRoom };
