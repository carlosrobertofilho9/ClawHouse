# Fase 1 — Thinking Mode

## Objetivo
O avatar reage em tempo real às atividades do agente. Quando o agente está pensando, pesquisando ou editando arquivos, o avatar mostra isso visualmente.

## Escopo
- [ ] Conectar ao Activity Protocol (API real ou mock avançado)
- [ ] Avatar com estados animados: idle, thinking, working, excited, tired
- [ ] Cômodo atual muda automaticamente baseado no `room` do evento
- [ ] Animações de transição entre cômodos
- [ ] Partículas/efeitos visuais indicando tipo de atividade

## Estados do Avatar

| Estado | Quando | Visual |
|--------|--------|--------|
| idle | Sem atividade por 30s | Respiração suave, olhos abertos |
| thinking | Modelo processando | Mãos na cabeça, bolhas de pensamento |
| working | Executando tools | Movimento rápido, focado |
| excited | Terminou tarefa | Salto pequeno, sorriso |
| tired | Erro ou timeout | Ombro caído, gota de suor |
| reading | Lendo arquivo | Olhos focados, cabeça inclinada |

## Animações
- Troca de cômodo: avatar "anda" pelo corredor (1s)
- Thinking: bolhas de pensamento aparecem (~3 bolhas subindo)
- Working: partículas de "energia" ao redor do avatar
- Conclusão: confete sutil ou brilho

## Critérios de aceitação
1. Avatar muda de estado automaticamente baseado no último evento
2. Transição de cômodo é visível e fluida (1-2s)
3. Estados são distintos e legíveis a 2 metros de distância
4. Não quebra se a API falhar (fallback para idle)

## Risco técnico
- Animações CSS podem pesar em mobile. Testar com `prefers-reduced-motion`.

---

## Prompt para Kimi Code (Fase 1)

Veja: `prompts/kimicode_phase_1.md`
