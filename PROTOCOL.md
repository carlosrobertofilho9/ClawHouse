# ClawHouse Activity Protocol

## O que é
Protocolo de eventos que o OpenClaw emite para que o ClawHouse (ou qualquer UI externa) possa renderizar a "presença" do agente em tempo real.

## Como funciona

```
┌─────────────────┐     WebSocket / SSE      ┌──────────────────┐
│  OpenClaw       │  ◄────────────────────►  │  ClawHouse       │
│  Gateway        │     activity_stream        │  (React/Next.js) │
│  (porta 18789)  │                          │                  │
└─────────────────┘                          └──────────────────┘
        │                                             │
        │  activity_stream.jsonl                      │
        │  (log rotativo)                             │
        │                                             │
        └─────────────────────────────────────────────┘
                           Poll a cada 2s (fallback)
```

## Formato dos eventos

```json
{
  "timestamp": "2026-04-25T22:30:00.000Z",
  "session_id": "sess_abc123",
  "type": "agent_activity",
  "actor": "axioma_main",
  "activity": {
    "kind": "tool_call",        // tool_call | file_edit | web_search | thinking | idle | message_sent | session_start | session_end | error
    "tool": "kimi_search",
    "params": { "query": "ABC Cardiologia" },
    "result_summary": "3 resultados encontrados",
    "duration_ms": 2450
  },
  "context": {
    "channel": "kimi-claw",
    "user_id": "960611098",
    "project": "TCC",
    "room": "biblioteca"          // derivado do contexto
  },
  "narrative": "Axioma está pesquisando sobre ABC Cardiologia..."
}
```

## Tipos de evento (kind)

| kind | Quando emitido | Narrativa exemplo |
|------|---------------|-------------------|
| `session_start` | Usuário enviou mensagem | "Carlos chamou Axioma no Kimi Chat" |
| `thinking` | Modelo começou a processar | "Axioma está pensando..." |
| `tool_call` | Tool foi invocada | "Axioma está pesquisando na web" |
| `file_edit` | Arquivo foi editado | "Axioma editou PROMPT_FIXES_AUTH.md" |
| `web_search` | Busca na web | "Axioma buscou 'OpenClaw WhatsApp setup'" |
| `message_sent` | Resposta enviada | "Axioma respondeu (3.2k tokens)" |
| `session_end` | Turno terminou | "Axioma ficou idle" |
| `error` | Erro ocorreu | "Axioma encontrou um erro: timeout" |
| `idle` | Sem atividade por 30s | "Axioma está descansando..." |
| `heartbeat` | Cron executou | "Axioma verificou calendário" |

## Cômodo derivado (room)

O `room` é inferido automaticamente baseado no contexto:

| Contexto | Room |
|----------|------|
| Arquivos em `/tmp/axioma-repo` ou código | `escritorio` |
| Pesquisa web, estudos, TCC | `biblioteca` |
| Calendário, tarefas, email | `sala_de_controle` |
| Dieta, nutrição, health_nutriAI_bot | `cozinha` |
| Brainstorm, ideias, MVP | `laboratorio` |
| Sem contexto específico | `entrada` |

## Como o ClawHouse consome

### Opção A: WebSocket (real-time)
```javascript
const ws = new WebSocket('ws://seu-servidor:18789/clawhouse');
ws.onmessage = (event) => {
  const activity = JSON.parse(event.data);
  updateAvatar(activity.room, activity.kind);
  addToTimeline(activity);
};
```

### Opção B: Server-Sent Events (SSE)
```javascript
const es = new EventSource('http://seu-servidor:18789/clawhouse/sse');
es.onmessage = (event) => {
  const activity = JSON.parse(event.data);
  updateUI(activity);
};
```

### Opção C: Polling (mais simples)
```javascript
setInterval(async () => {
  const res = await fetch('http://seu-servidor:18789/clawhouse/activity?since=last_id');
  const events = await res.json();
  events.forEach(e => updateUI(e));
}, 2000);
```

## Como o OpenClaw emite

### 1. Activity Logger (implementado no agente)
O agente principal chama `logActivity()` a cada ação significativa.

### 2. Activity Stream (arquivo)
Salvo em `~/.openclaw/workspace/clawhouse/activity_stream.jsonl`.

### 3. HTTP Endpoint (futuro)
Gateway expõe `GET /clawhouse/activity` pra polling.

## MVP proposto

**Fase 1 (hoje):**
- [x] Criar estrutura de log de atividades
- [ ] Implementar `logActivity()` no agente principal
- [ ] Criar arquivo `activity_stream.jsonl`
- [ ] Testar se eventos são gerados

**Fase 2 (depois):**
- [ ] HTTP endpoint `/clawhouse/activity` no gateway
- [ ] WebSocket `/clawhouse` no gateway
- [ ] ClawHouse React consome via polling

**Fase 3 (futuro):**
- [ ] Narrador Ghost como sub-agente
- [ ] Narrações mais ricas e humanizadas
- [ ] Avatar animado reagindo aos eventos

## Exemplo de arquivo gerado

```jsonl
{"timestamp":"2026-04-25T22:30:00Z","type":"session_start","actor":"axioma_main","context":{"channel":"kimi-claw","user_id":"960611098"},"narrative":"Carlos chamou Axioma"}
{"timestamp":"2026-04-25T22:30:01Z","type":"thinking","actor":"axioma_main","context":{"channel":"kimi-claw"},"narrative":"Axioma está pensando sobre ClawHouse..."}
{"timestamp":"2026-04-25T22:30:03Z","type":"tool_call","actor":"axioma_main","activity":{"kind":"web_search","tool":"kimi_search","params":{"query":"OpenClaw activity stream"},"duration_ms":1200},"context":{"channel":"kimi-claw","room":"biblioteca"},"narrative":"Axioma pesquisou sobre activity streams"}
{"timestamp":"2026-04-25T22:30:05Z","type":"file_edit","actor":"axioma_main","activity":{"file":"clawhouse/PROTOCOL.md","lines_added":45},"context":{"channel":"kimi-claw","room":"escritorio"},"narrative":"Axioma documentou o protocolo"}
{"timestamp":"2026-04-25T22:30:10Z","type":"message_sent","actor":"axioma_main","activity":{"tokens":320,"channels":["kimi-claw"]},"context":{"channel":"kimi-claw"},"narrative":"Axioma enviou a resposta"}
```
