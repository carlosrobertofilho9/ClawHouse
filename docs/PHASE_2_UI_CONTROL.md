# Fase 2 — Controle por UI

## Objetivo
O usuário pode interagir com o agente sem depender só de prompts de texto. Botões e controles visuais.

## Escopo
- [ ] Botão "Pausar" — agente para de responder a novas mensagens
- [ ] Botão "Continuar" — retoma atividade normal
- [ ] Botão "Interromper" — cancela a sessão/tarefa atual
- [ ] Slider de "Intensidade" — controla quantas tools o agente usa (econômico vs completo)
- [ ] Toggle de "Modo Foco" — só responde ao usuário, ignora heartbeats
- [ ] Botão "Emergência" — para tudo imediatamente (kill switch)
- [ ] Visualização de sessões ativas (lista com progresso)

## Estados de controle

| Controle | Estado visual | Efeito no agente |
|----------|--------------|------------------|
| Pausar | Avatar dormindo | Não responde novas mensagens |
| Interromper | Avatar assustado | Cancela tool call atual |
| Foco | Avatar com óculos | Ignora automações, só responde usuário |
| Intensidade | Barra de energia | Limita número de tools por turno |

## Design
- Painel de controle flutuante (bottom-right ou sidebar)
- Visual estilo "head-up display" (HUD) transparente
- Cores indicativas: verde (ativo), amarelo (pausado), vermelho (interrompido)

## Critérios de aceitação
1. Cada botão tem feedback visual imediato (click ripple + estado)
2. Estados persistem entre reloads da página (localStorage)
3. Comandos chegam ao agente em <2s
4. Kill switch funciona mesmo se a sessão estiver travada

## API necessária
```
POST /agent/control
{ action: "pause" | "resume" | "interrupt" | "focus" | "emergency" }
```

---

## Prompt para Kimi Code (Fase 2)

Veja: `prompts/kimicode_phase_2.md`
