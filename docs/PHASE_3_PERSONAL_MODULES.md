# Fase 3 — Módulos Pessoais

## Objetivo
Cada cômodo ganha funcionalidade real relacionada à vida do usuário. Não é só visual — é útil.

## Escopo por cômodo

### 📚 Biblioteca (Estudos)
- [ ] Flashcards espaçados (SRS)
- [ ] Resumos de leituras
- [ ] Progresso de cursos
- [ ] Integração com Notion/Anki (futuro)

### 💻 Escritório (Projetos)
- [ ] Board Kanban de projetos
- [ ] Lista de tarefas pendentes
- [ ] Commits recentes do GitHub
- [ ] Deploy status (Vercel/Netlify)

### 🍳 Cozinha (Dieta)
- [ ] Cardápio do dia
- [ ] Tracker de macros
- [ ] Substituições inteligentes
- [ ] Lista de compras

### 🔬 Laboratório (Ideias)
- [ ] Board de brainstorm
- [ ] MVPs em progresso
- [ ] Canvas de modelo de negócio
- [ ] Pitch deck helper

### 🎛️ Sala de Controle (Automações)
- [ ] Calendário semanal
- [ ] Tarefas agendadas (cron visual)
- [ ] Notificações pendentes
- [ ] Status de serviços

## Design
- Cada cômodo tem um "painel de controle" que abre ao clicar
- Widgets flutuantes dentro do cômodo
- Drag-and-drop para reorganizar

## Critérios de aceitação
1. Cada cômodo tem pelo menos 2 widgets funcionais
2. Dados são persistidos (Supabase ou localStorage)
3. Integração com APIs externas funciona (GitHub, Notion)

---

## Prompt para Kimi Code (Fase 3)

Veja: `prompts/kimicode_phase_3.md`
