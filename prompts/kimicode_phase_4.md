# Prompt Kimi Code — Fase 4: Memória Visual

## Contexto
Adicionar persistência e visualização de histórico ao ClawHouse. A casa "lembra" do que aconteceu.

## O que já existe
- App com casa, avatar, controles, widgets
- Activity timeline em tempo real
- Dados em localStorage (widgets)

## Tarefa

### 1. Integração com Supabase
- Criar projeto Supabase (ou usar o local se possível)
- Tabelas:
```sql
-- activities (log completo)
create table activities (
  id uuid primary key default gen_random_uuid(),
  timestamp timestamptz default now(),
  kind text not null,
  narrative text,
  room text,
  channel text,
  activity jsonb,
  session_id text
);

-- daily_summaries (agregado)
create table daily_summaries (
  date date primary key,
  total_activities int default 0,
  rooms jsonb default '[]',
  tools jsonb default '[]',
  top_project text,
  summary text
);
```

### 2. Timeline persistente
- Substituir/mockar a timeline atual com dados do Supabase
- Paginação: scroll infinito ou "Carregar mais"
- Filtros: por cômodo, tipo, período (hoje/esta semana/este mês)
- Busca: por texto na narrativa

### 3. Heatmap
- Componente `ActivityHeatmap.tsx`
- Estilo GitHub contribution graph: grid 7xN (dias x semanas)
- Cada célula = 1 dia, cor = intensidade (0=branco, 1-5=tons de verde)
- Hover mostra resumo do dia
- Click abre timeline filtrada por aquele dia

### 4. Estatísticas
- Dashboard com cards:
  - Total de mensagens hoje/esta semana/este mês
  - Cômodo mais visitado (pie chart CSS)
  - Tool mais usada (bar chart CSS)
  - Tempo total online (contador)
- Atualiza em tempo real (quando novos eventos chegam)

### 5. "Dias marcantes"
- Sistema de tags: usuário pode marcar evento como "importante"
- Eventos marcados aparecem destacados na timeline
- Badge dourado ⭐ no evento

### 6. Exportar relatório
- Botão "Exportar semana" → gera Markdown com resumo
- Botão "Exportar mês" → PDF (ou Markdown pra converter depois)

## Design
- Página `/memory` ou `/history` — acessível via menu
- Heatmap no topo, timeline abaixo
- Cores: verde para atividade, cinza para inatividade, dourado para marcantes
- Responsive: heatmap scrolla horizontalmente em mobile

## Supabase Client
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## Variáveis de ambiente
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Critérios
1. Timeline carrega em <2s (paginação ajuda)
2. Heatmap mostra últimos 90 dias
3. Dados não se perdem (Supabase é persistente)
4. Export funciona e gera arquivo baixável

## O que NÃO fazer
- ❌ Não use bibliotecas de chart pesadas (Recharts, Chart.js) — use CSS/SVG
- ❌ Não implemente autenticação (use RLS público por enquanto)

## Entregável
Página de memória funcional com heatmap, timeline filtrável e estatísticas.
