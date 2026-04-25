# Fase 0 — Base + UI Mockada + Activity Protocol

## Objetivo
Criar a estrutura base do ClawHouse: app Next.js funcionando, com mock de dados do agente, sem necessidade de conexão real.

## Escopo
- [ ] Next.js 16 app com Tailwind CSS
- [ ] Layout principal com cômodos visuais
- [ ] Avatar do agente (estático, posição central)
- [ ] Timeline de atividades (mock data)
- [ ] Troca de cômodos via navegação
- [ ] Sistema de temas (claro/escuro)

## Design
- Casa em perspectiva isométrica ou vista de cima (top-down)
- Cada cômodo é clicável
- Avatar se move entre cômodos com animação suave
- Atividades aparecem como "bolhas" no cômodo atual

## Mock Data
Criar arquivo `mocks/activities.ts` com ~20 eventos variados cobrindo todos os cômodos.

## Critérios de aceitação
1. App roda em `npm run dev` sem erros
2. Todos os 6 cômodos são navegáveis
3. Avatar está visível e posicionado no cômodo ativo
4. Timeline mostra eventos com timestamp relativo ("há 2 minutos")

## Inspiração visual
- Habbo Hotel (cômodos isométricos)
- Tamagotchi (avatar que reage)
- Notion (timeline limpa)

---

## Prompt para Kimi Code (Fase 0)

Veja: `prompts/kimicode_phase_0.md`
