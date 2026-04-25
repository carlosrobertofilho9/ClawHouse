# Prompt Kimi Code — Fase 0: Base + UI Mockada + Activity Protocol

## Contexto
Você está criando o **ClawHouse** — uma interface visual em Next.js onde o agente "Claw" (OpenClaw/Kimi) vive em uma casa virtual. Esta é a Fase 0 (MVP).

## O que já existe (não reinvente)
- Activity Protocol definido em `clawhouse/PROTOCOL.md` (formato JSON de eventos)
- Activity Server rodando em `http://localhost:18790` (endpoints `/activity`, `/status`)
- O servidor retorna eventos no formato:
```json
{
  "timestamp": "2026-04-25T14:33:05Z",
  "kind": "thinking",
  "narrative": "Claw está pensando...",
  "context": { "room": "biblioteca", "channel": "kimi-claw" },
  "activity": { "tool": "kimi_search" }
}
```

## Tarefa
Crie a estrutura base do app Next.js:

### 1. Setup inicial
- Next.js 16 com App Router
- Tailwind CSS (configurado)
- TypeScript
- shadcn/ui (instale componentes básicos: Button, Card, Badge, ScrollArea)

### 2. Layout principal — A Casa
- **Design:** Vista de cima (top-down) da casa com 6 cômodos em grid
- **Cômodos:**
  - Entrada (centro) 🏠
  - Escritório (esquerda) 💻
  - Biblioteca (direita) 📚
  - Cozinha (embaixo-esquerda) 🍳
  - Laboratório (embaixo-direita) 🔬
  - Sala de Controle (embaixo-centro) 🎛️
- **Avatar:** Ícone de pata 🐾 posicionado no cômodo atual
- **Navegação:** Clicar num cômodo move o avatar pra lá com animação CSS (transition-all duration-700)

### 3. Activity Timeline
- Sidebar direita mostrando últimos 10 eventos
- Cada evento: ícone do tipo + narrativa + tempo relativo ("há 2 min")
- Cores por tipo: thinking (azul), tool_call (amarelo), message_sent (verde), error (vermelho)

### 4. Mock Data
Crie `lib/mocks.ts` com ~20 eventos variados cobrindo todos os cômodos e tipos. Use isso se `NEXT_PUBLIC_USE_MOCK=true`.

### 5. Polling básico
- `hooks/useAgentActivity.ts` — useEffect com setInterval a cada 3s
- Se `NEXT_PUBLIC_CLAWHOUSE_API` não estiver setado, use mock data
- Se a API retornar erro, mostre "Desconectado" em vermelho

### 6. Páginas
- `/` — Casa (dashboard principal)
- `/timeline` — Timeline completa (scroll infinito)
- `/settings` — Configurações básicas (tema, polling interval)

## Variáveis de ambiente
```env
NEXT_PUBLIC_CLAWHOUSE_API=http://localhost:18790
NEXT_PUBLIC_USE_MOCK=false
```

## Estilo visual
- Cores: fundo cinza muito claro, cômodos com cores pastéis distintas
- Fonte: Inter ou Geist (Next.js default)
- Efeito: cômodo ativo tem shadow-lg + ring-2
- Avatar: absolute position com transition-all

## O que NÃO fazer
- ❌ Não use Three.js/WebGL (ainda)
- ❌ Não conecte a APIs reais ainda (use mock)
- ❌ Não implemente autenticação
- ❌ Não crie backend próprio

## Como testar
```bash
npm install
npm run dev
# Deve abrir em http://localhost:3000 com a casa visível
```

## Entregável
Código completo funcional, sem placeholders. O app deve abrir e mostrar a casa com avatar e timeline funcionando.
