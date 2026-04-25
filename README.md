# ClawHouse

🏠 **O lar virtual do seu agente pessoal.**

ClawHouse é uma interface visual onde seu agente OpenClaw "vive" — você acompanha e controla tudo que ele faz em tempo real.

## Conceito

A casa representa como o agente organiza sua vida:

| Cômodo | O que acontece lá |
|--------|-------------------|
| 🏠 **Entrada** | Estado geral, boas-vindas |
| 💻 **Escritório** | Projetos, código, arquivos |
| 📚 **Biblioteca** | Estudos, pesquisas, TCC |
| 🍳 **Cozinha** | Dieta, nutrição, saúde |
| 🔬 **Laboratório** | Ideias, brainstorm, MVPs |
| 🎛️ **Sala de Controle** | Automações, tarefas, calendário |

## Arquitetura

```
OpenClaw Gateway (servidor)
  ├── Activity Logger → activity_stream.jsonl
  └── HTTP Server → localhost:18790
            ↓
    Cloudflare Tunnel
            ↓
    https://clawhouse.seudominio.com
            ↓
    ClawHouse Next.js App
```

## Fases de Desenvolvimento

- **Fase 0** → Base + UI mockada + Activity Protocol ✅ (implementado)
- **Fase 1** → Thinking Mode (avatar reage às atividades)
- **Fase 2** → Controle por UI (pausar, continuar, interromper)
- **Fase 3** → Módulos pessoais (dieta, projetos, estudos)
- **Fase 4** → Memória visual (timeline persistente)
- **Fase 5** → IA real (narrador ghost enriquecido)
- **Fase 6** → Automações visuais (cron jobs, heartbeats)
- **Fase 7** → Modo avançado (múltiplos agentes, plugins)

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# O app estará em http://localhost:3000
```

## Como conectar ao agente

1. Configure o Cloudflare Tunnel apontando para `http://localhost:18790`
2. Ajuste `NEXT_PUBLIC_CLAWHOUSE_API` no `.env.local`
3. O app fará polling na API de atividades a cada 2 segundos

## Repositório do Agente

O agente principal (Claw) roda em servidor separado. Seu código de activity logging está em:
- `clawhouse/activity_logger.js`
- `clawhouse/server.js` (porta 18790)
- `clawhouse/PROTOCOL.md` (especificação)

---

Feito com 🐾 por Carlos Roberto + Claw
