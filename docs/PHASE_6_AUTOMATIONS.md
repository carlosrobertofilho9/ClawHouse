# Fase 6 — Automações Visuais

## Objetivo
Criar e gerenciar automações do agente via interface visual, sem código.

## Escopo
- [ ] Editor visual de cron jobs (drag time blocks)
- [ ] "Regras da casa" — if/then visual
  - Se (receber email de X) → (alertar no Telegram)
  - Se (for 9h da manhã) → (verificar calendário)
- [ ] Status de automações (ativo/pausado/erro)
- [ ] Logs de execução com visualização

## Design
- Interface estilo Zapier/IFTTT mas mais bonita
- Blocos coloridos conectados por linhas
- Preview do que vai acontecer antes de ativar

## Critérios
1. Usuário cria automação em <2 minutos
2. Não exige saber cron syntax
3. Teste dry-run antes de ativar

---

## Prompt para Kimi Code (Fase 6)

Veja: `prompts/kimicode_phase_6.md`
