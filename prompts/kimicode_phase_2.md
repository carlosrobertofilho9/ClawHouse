# Prompt Kimi Code — Fase 2: Controle por UI

## Contexto
Você está adicionando controles ao ClawHouse. O usuário pode interagir com o agente Claw via botões, não só via chat.

## O que já existe
- App Next.js com casa, avatar animado, timeline
- Hook `useAgentActivity` com polling
- Avatar com estados (idle, thinking, working, etc.)

## Tarefa

### 1. Painel de controle flutuante
Criar componente `ControlPanel.tsx` — painel flutuante estilo HUD (bottom-right):

**Botões principais:**
- ⏸️ Pausar (toggle com ▶️ Continuar)
- ⏹️ Interromper
- 🎯 Modo Foco (toggle)
- ⚡ Intensidade (slider 1-5)
- 🚨 Emergência (kill switch — vermelho, confirma antes)

**Estados visuais:**
- Ativo: verde, glow sutil
- Pausado: amarelo, avatar idle
- Interrompido: vermelho, avatar "assustado"
- Foco: azul, avatar com "óculos" (CSS overlay)

### 2. Integração com API de controle
Criar `lib/agent-control.ts`:
```typescript
export async function sendControl(action: ControlAction) {
  // POST para o servidor OpenClaw
  // O servidor expõe endpoint de controle (vai ser implementado na Fase 2 do backend)
}
```

Ações:
- `pause` — agente não responde novas mensagens
- `resume` — volta ao normal
- `interrupt` — cancela execução atual
- `focus` — modo foco (ignora heartbeats)
- `emergency` — para tudo
- `intensity` — ajusta número máximo de tools por turno (1-5)

### 3. Feedback imediato
- Cada botão tem ripple effect (CSS)
- Toast/snackbar confirma ação ("Claw pausado", "Modo foco ativado")
- Se a API falhar, mostra erro em vermelho e reverte o estado do botão

### 4. Visualização de sessões
- Sidebar com lista de sessões ativas
- Cada sessão: canal, usuário, tempo decorrido, progresso (barra)
- Botão "Interromper" por sessão

### 5. Persistência local
- Estados de controle salvos em `localStorage`
- Ao recarregar a página, recupera último estado

## Design
- Painel: `fixed bottom-4 right-4`, glassmorphism (bg-white/80 backdrop-blur)
- Botões: ícones + tooltip em hover
- Slider de intensidade: vertical ou horizontal com cores (1=verde, 5=vermelho)
- Kill switch: botão maior, vermelho, requer double-click

## API do servidor (já documentada, você consome)
```
POST http://localhost:18790/control
Content-Type: application/json

{ "action": "pause" }
```

Resposta:
```json
{ "status": "ok", "previousState": "active", "currentState": "paused" }
```

## Estados possíveis do agente
```typescript
type AgentState = 'active' | 'paused' | 'interrupted' | 'focus' | 'emergency';
```

## Critérios
1. Cada controle funciona em <2s
2. Estados são visíveis e claros
3. Kill switch realmente para o agente (testar!)
4. Mobile: painel colapsa em FAB (Floating Action Button)

## Como testar
Usar `curl` para simular o servidor aceitando controles:
```bash
# O servidor de atividades já roda em 18790
# Adicione endpoint /control que só retorna {status: "ok"}
```

## Entregável
Painel de controle funcionando, integrado visualmente com o resto do app.
