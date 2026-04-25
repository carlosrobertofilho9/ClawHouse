# Prompt Kimi Code — Fase 6: Automações Visuais

## Contexto
Criar editor visual de automações do agente. O usuário monta regras tipo IFTTT/Zapier mas dentro da casa.

## O que já existe
- App completo com todos os módulos anteriores
- Sala de Controle com widgets básicos
- Integração com Supabase

## Tarefa

### 1. Editor visual de regras
Criar componente `RuleEditor.tsx`:

**Blocos:**
- Trigger (quando acontece): 
  - Receber mensagem no Telegram
  - Horário específico (cron visual)
  - Novo email
  - Commit no GitHub
- Condition (se):
  - Contém palavra X
  - É de usuário Y
  - É dia útil
- Action (faça):
  - Enviar mensagem no Telegram
  - Criar tarefa
  - Executar tool específica
  - Pausar agente

**Interface:**
- Blocos conectados por linhas (SVG)
- Drag-and-drop para montar fluxo
- Cores: trigger (verde), condition (amarelo), action (azul)

### 2. Galeria de templates
- Templates prontos:
  - "Bom dia" (8h → mensagem no Telegram)
  - "Foco no TCC" (se mencionar TCC → modo foco)
  - "Backup diário" (meia-noite → git commit)
  - "Alerta de erro" (se erro → notificar Telegram)

### 3. Status e logs
- Lista de automações: ativo/inativo/erro
- Última execução, próxima execução
- Log de execuções (sucesso/erro)
- Botão "Executar agora" (dry-run)

### 4. Storage
- Supabase table:
```sql
create table automations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  enabled boolean default true,
  trigger jsonb not null,
  conditions jsonb default '[]',
  actions jsonb not null,
  created_at timestamptz default now(),
  last_run timestamptz,
  last_error text
);
```

## Design
- Página `/automations` acessível pela Sala de Controle
- Editor em modal fullscreen
- Miniatura da regra na lista (preview dos blocos)
- Toggle rápido para ligar/desligar sem abrir editor

## Integração com backend
O backend (OpenClaw) vai precisar de:
- Endpoint `/automations` (CRUD)
- Scheduler interno (ou usar cron do sistema)
- Evaluator de conditions
- Executor de actions

**Nota:** Se o backend ainda não existe, crie o frontend e mock o backend com `setTimeout` + `console.log`.

## Critérios
1. Criar automação leva <2 minutos
2. Templates cobrem 80% dos casos comuns
3. Visual é intuitivo (testar com alguém que não sabe código)
4. Logs ajudam a debugar quando algo não funciona

## Entregável
Editor visual funcional, com templates e lista de automações.
