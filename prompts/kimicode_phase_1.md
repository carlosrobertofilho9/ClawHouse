# Prompt Kimi Code — Fase 1: Thinking Mode

## Contexto
Você está evoluindo o ClawHouse da Fase 0. O Activity Protocol agora recebe eventos reais do agente Claw. Você precisa fazer o avatar reagir a esses eventos.

## O que já existe (da Fase 0)
- App Next.js 16 com layout de casa (6 cômodos)
- Hook `useAgentActivity` fazendo polling a cada 3s
- Timeline de atividades na sidebar
- Avatar posicionado no cômodo ativo

## Tarefa

### 1. Avatar com estados animados
Substitua o ícone estático 🐾 por um avatar visual mais rico:

| Estado | CSS/Tailwind | Quando |
|--------|-------------|--------|
| idle | scale-100, animate-pulse suave | último evento > 30s |
| thinking | animate-bounce leve, bolhas 💭 aparecem | kind === "thinking" |
| working | animate-spin muito lento, glow amarelo | kind === "tool_call" ou "file_edit" |
| excited | scale-110, jump animation, ✨ partículas | kind === "message_sent" |
| tired | grayscale-50, rotate-3 | kind === "error" |
| reading | opacity-80, "shimmer" effect | kind === "file_read" |

Crie componente `Avatar.tsx` que recebe `state` prop e renderiza o visual apropriado.

### 2. Bolhas de pensamento
Quando estado é "thinking", mostre 3 bolhas (💭) subindo acima do avatar com animação staggered:
```
💭 (delay 0s) → some em 2s
 💭 (delay 0.3s) → some em 2s
  💭 (delay 0.6s) → some em 2s
```

### 3. Efeitos por tipo de atividade
- **tool_call:** Partículas de "energia" (círculos amarelos pequenos aparecendo e sumindo ao redor do avatar)
- **file_edit:** Ícone de lápis ✏️ flutuando brevemente
- **message_sent:** Ondas de pulso saindo do avatar (ripple effect)
- **error:** Treme levemente (animate-shake) + fundo do cômodo fica vermelho por 1s

### 4. Transição de cômodo
Quando `context.room` muda:
1. Avatar desaparece (opacity-0, scale-75) — 300ms
2. Espera 200ms
3. Avatar aparece no novo cômodo (opacity-100, scale-100) — 400ms
4. Traçar linha/flash entre cômodo antigo e novo (opcional, CSS)

### 5. Narração em tempo real
Na parte superior da tela, mostrar uma "frase de status" que reflete o estado atual:
- idle → "Claw está descansando..."
- thinking → "Claw está pensando sobre [contexto]"
- working → "Claw está trabalhando no [cômodo]"
- etc.

Use o campo `narrative` do evento se disponível; senão, gere localmente.

### 6. Som (opcional, mas legal)
- Efeito sonoro sutil para mudança de estado (use Web Audio API, sem bibliotecas pesadas)
- Só tocar se `window.ClawHouse.soundEnabled === true`

## Hook atualizado
```typescript
// useAgentActivity agora retorna mais dados:
const { 
  activities,      // todos os eventos
  current,         // último evento
  previousRoom,    // cômodo anterior (pra animar transição)
  isTransitioning, // boolean durante troca de cômodo
  avatarState      // 'idle' | 'thinking' | 'working' | ...
} = useAgentActivity();
```

## Critérios de aceitação
1. Avatar muda visualmente em <1s após novo evento
2. Transição de cômodo é perceptível mas não irritante (max 2s)
3. Estados são distintos — alguém olhando de longe entende o que está acontecendo
4. Funciona sem som (não quebra se Web Audio não disponível)
5. Mobile: animações respeitam `prefers-reduced-motion`

## O que NÃO fazer
- ❌ Não use bibliotecas de animação pesadas (Framer Motion, GSAP) — use CSS transitions/keyframes
- ❌ Não adicione backend
- ❌ Não mude a arquitetura de polling

## Como testar
Use o script de teste do servidor:
```bash
# No servidor, rode:
node /root/.openclaw/workspace/clawhouse/activity_logger.js test
# Isso gera eventos de teste. Veja se o avatar reage.
```

## Entregável
Código completo, avatar reagindo a eventos reais (ou mock). Teste visualmente com os eventos de teste.
