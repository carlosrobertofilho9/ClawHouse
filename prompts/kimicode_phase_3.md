# Prompt Kimi Code — Fase 3: Módulos Pessoais

## Contexto
Cada cômodo da casa ganha funcionalidade real. O usuário (Carlos — médico, desenvolvedor) precisa de ferramentas úteis em cada espaço.

## O que já existe
- Casa com 6 cômodos
- Clicar num cômodo move o avatar
- Activity timeline na sidebar

## Tarefa

### 1. Painel de cômodo (abre ao clicar 2x ou botão "Expandir")
Cada cômodo tem um modal/drawer com widgets específicos:

#### 📚 Biblioteca (Estudos)
- Widget "Flashcards": mostra 1 card por vez, flip ao clicar
- Widget "Progresso": barra de progresso de leituras/cursos
- Widget "Resumo": área de texto para notas rápidas
- Dados: localStorage (Supabase na Fase 4)

#### 💻 Escritório (Projetos)
- Widget "Commits": lista últimos commits (GitHub API — token do usuário)
- Widget "Tarefas": checklist simples (CRUD)
- Widget "Deploy": status do último deploy (Vercel API)

#### 🍳 Cozinha (Dieta)
- Widget "Cardápio": refeições do dia (manhã/tarde/noite)
- Widget "Macros": prot/carbo/gord em formato circular (pie chart CSS)
- Widget "Água": contador de copos (clique para +1)

#### 🔬 Laboratório (Ideias)
- Widget "Brainstorm": board de post-its arrastáveis
- Widget "MVP": checklist de funcionalidades pro MVP atual
- Widget "Pitch": contador de caracteres pra elevator pitch

#### 🎛️ Sala de Controle (Automações)
- Widget "Calendário": mini calendário com eventos ( Feitoso API futuro)
- Widget "Status": lista de serviços (Supabase, Gateway, etc.) com ping
- Widget "Notificações": badge com notificações pendentes

### 2. Widget system
Criar `components/widgets/BaseWidget.tsx`:
```typescript
interface WidgetProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose?: () => void;
}
```
- Card com header (título + ícone + botão fechar)
- Body scrollable
- Pode ser minimizado (só mostra título + status)

### 3. Estado por cômodo
Cada cômodo tem um `roomState` em localStorage:
```typescript
interface RoomState {
  widgets: WidgetConfig[];
  isExpanded: boolean;
  lastVisited: string;
}
```

### 4. Navegação
- Clicar 1x: move avatar (já existe)
- Clicar 2x ou botão "Expandir": abre painel do cômodo
- ESC fecha painel

## Design
- Painel: `fixed inset-0 bg-black/50` com modal centralizado (max-w-4xl)
- Grid de widgets: 2 colunas desktop, 1 coluna mobile
- Widgets têm altura fixa (h-64) com scroll interno
- Cores por cômodo (mesmo esquema da casa)

## Dados
- localStorage por enquanto (chave: `clawhouse_room_${roomName}`)
- JSON simples, sem schema complexo

## Critérios
1. Cada cômodo tem pelo menos 2 widgets funcionais
2. Dados persistem entre reloads
3. Interface não fica lenta com muitos widgets abertos
4. Mobile: painel é fullscreen, swipe-down pra fechar

## Como testar
```bash
npm run dev
# Clicar duas vezes num cômodo deve abrir o painel
# Adicionar item em um widget, recarregar, deve persistir
```

## Entregável
Todos os cômodos com pelo menos 2 widgets funcionais e testáveis.
