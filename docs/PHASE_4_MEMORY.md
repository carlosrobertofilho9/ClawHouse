# Fase 4 — Memória Visual

## Objetivo
A casa "lembra" do que aconteceu. Timeline persistente, estatísticas, padrões de uso.

## Escopo
- [ ] Timeline infinita (scroll back no tempo)
- [ ] Filtros por cômodo, tipo de atividade, período
- [ ] Heatmap de atividade (quando o agente mais trabalhou)
- [ ] Estatísticas: total de mensagens, tools usadas, tempo online
- [ ] "Dias marcantes" — eventos importantes destacados
- [ ] Exportar relatório semanal/mensal

## Visual
- Timeline estilo GitHub contribution graph + Instagram stories
- Cada dia é um círculo colorido (intensidade = atividade)
- Hover revela resumo do dia
- Click abre timeline detalhada daquele dia

## Dados
Armazenados no Supabase:
```sql
daily_summary (
  date,
  total_activities,
  rooms_visited[],
  tools_used[],
  top_project,
  summary_text
)
```

---

## Prompt para Kimi Code (Fase 4)

Veja: `prompts/kimicode_phase_4.md`
