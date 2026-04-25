# Fase 5 — IA Real (Narrador Ghost)

## Objetivo
Um narrador enriquece as atividades do agente com linguagem humana, contexto e insights.

## Escopo
- [ ] Sub-agente (ou chamada a modelo) que analisa eventos brutos
- [ ] Transforma "tool_call: kimi_search" em "Claw está pesquisando sobre fibrilação atrial para o artigo do Carlos..."
- [ ] Detecta padrões: "Parece que você está em modo TCC há 3 horas"
- [ ] Sugestões proativas: "Que tal uma pausa? Você está trabalhando há 2h"
- [ ] Resumo diário automático (final do dia)

## Onde roda
Opção A: No servidor OpenClaw (cron job)
Opção B: Edge function (Vercel/Netlify)
Opção C: Client-side com modelo leve (Gemini Nano, etc.)

## Exemplo de narrativa rica
```
Evento bruto: {kind: "tool_call", tool: "kimi_search", query: "ABC Cardiologia"}
↓
Narração: "Claw está pesquisando sobre a Arquivos Brasileiros de Cardiologia. 
Parece que ela está preparando o artigo do TCC para submissão. 
Ela já leu 3 papers hoje sobre fibrilação atrial."
```

---

## Prompt para Kimi Code (Fase 5)

Veja: `prompts/kimicode_phase_5.md`
