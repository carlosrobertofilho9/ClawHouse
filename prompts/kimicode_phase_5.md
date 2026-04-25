# Prompt Kimi Code — Fase 5: IA Real (Narrador Ghost)

## Contexto
Adicionar um narrador inteligente ao ClawHouse. Ele enriquece os eventos brutos do agente com linguagem natural, contexto e insights.

## O que já existe
- App com todos os cômodos, widgets, memória visual
- Activity Protocol recebendo eventos brutos
- Hook `useAgentActivity` com eventos

## Tarefa

### 1. Narrador Client-Side (MVP)
Use a API do Gemini (gratuita tier) ou outro modelo leve:
```typescript
// lib/narrator.ts
export async function narrate(event: ActivityEvent): Promise<string> {
  // Chama Gemini API com prompt enriquecido
  // Retorna narração humana
}
```

Prompt para o modelo:
```
Você é o narrador do ClawHouse, um assistente pessoal. 
O usuário é Carlos, um médico cardiologista que também programa.

Evento atual: {kind: "tool_call", tool: "kimi_search", query: "ABC Cardiologia"}
Contexto: Carlos está transformando o TCC em artigo.
Últimos eventos: [lista dos últimos 5]

Crie uma narração curta (1-2 frases), natural, como se estivesse 
observando um amigo trabalhar. Seja leve e ocasionalmente engraçado.

Responda APENAS com a narração, sem aspas.
```

### 2. Cache de narrações
- Não chamar a API toda vez — cache por evento ID
- Se o evento não mudou, usar narração cacheada
- TTL de 1 hora

### 3. Insights proativos
- Detectar padrões nos últimos eventos
- Mostrar "insight cards" ocasionalmente (não a cada evento — limitar a 1 a cada 5 min)

Exemplos:
- "Você está no Escritório há 2 horas sem pausa. Hora de um café? ☕"
- "Parece que você voltou pro TCC! Terceira vez hoje."
- "Claw usou kimi_search 5 vezes seguidas. Ele está pesquisando muito."

### 4. Resumo diário automático
- Ao final do dia (ou quando usuário clicar "Resumo"), gerar:
  - "Hoje Claw trabalhou 4h, visitou 3 cômodos, usou 12 tools."
  - "Destaque: você finalizou a integração do Telegram!"

### 5. Configurações do narrador
- Toggle: ativar/desativar narrações
- Slider: frequência (sempre / às vezes / raramente)
- Toggle: insights proativos (on/off)

## API Key
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIza...
```

**Alternativa:** Se não quiser depender de API externa, use um sistema de templates + randomização (mais simples, menos inteligente mas funciona offline).

## Design
- Narração aparece como "fala" do avatar — balão de diálogo estilo HQ
- Balão desaparece após 10s ou quando novo evento chega
- Insights aparecem como notificações toast no canto
- Resumo diário: modal que abre automaticamente às 22h (se ativo)

## Performance
- Limitar chamadas API: max 1 por minuto
- Fallback: se API falhar, usar narração básica do `narrative` do evento
- AbortController para cancelar chamadas antigas

## Critérios
1. Narrações parecem humanas (testar com amigos!)
2. Não inunda com texto (máx 1 narração a cada 10s)
3. Insights são úteis, não irritantes
4. Funciona offline (fallback templates)

## Entregável
Avatar "falando" com narrações enriquecidas. Insights aparecendo naturalmente.
