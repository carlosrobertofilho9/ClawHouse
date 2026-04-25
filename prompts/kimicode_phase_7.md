# Prompt Kimi Code — Fase 7: Modo Avançado

## Contexto
ClawHouse como plataforma. Multi-agente, temas, plugins, PWA.

## O que já existe
Tudo das fases anteriores.

## Tarefa

### 1. Múltiplos agentes
- Suportar N agentes, cada um com:
  - Nome, avatar diferente, cor primária
  - Activity stream separado
  - Cômodos podem ser "compartilhados" ou "privados"
- UI: seletor de agente no header

### 2. Temas customizados
- Sistema de temas em `lib/themes.ts`:
```typescript
interface Theme {
  name: string;
  colors: { entrance, office, library, kitchen, lab, control };
  avatar: string; // emoji ou SVG
  font: string;
}
```
- Temas built-in: Padrão, Cyberpunk (neon), Retrô (pixel), Minimalista (B&W)
- Usuário pode criar tema customizado

### 3. PWA
- `manifest.json` com ícones
- Service worker para offline (cache das páginas)
- Push notifications (se API suportar)
- Instalável no mobile ("Adicionar à tela inicial")

### 4. Plugin system (arquitetura)
- Interface `Plugin`:
```typescript
interface Plugin {
  id: string;
  name: string;
  widgets: WidgetConfig[];
  onInstall: () => void;
  onUninstall: () => void;
}
```
- Sistema de carregamento dinâmico (code splitting)
- Marketplace mock (lista de plugins disponíveis)

### 5. Voice interface (opcional)
- Web Speech API: `SpeechRecognition` + `SpeechSynthesis`
- Botão de microfone no header
- Falar "Claw, pausa" → envia comando de voz
- Claw responde por voz (TTS)

### 6. Performance
- Code splitting por cômodo
- Lazy load de widgets
- Virtual scroll na timeline
- Bundle analyzer configurado

## Critérios
1. App funciona offline (PWA cache)
2. Troca de tema é instantânea (sem reload)
3. Instalação no mobile é fluida
4. Arquitetura de plugins permite extensão futura

## Entregável
Produto completo, polido, pronto para uso diário.
