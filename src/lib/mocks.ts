export type ActivityKind =
  | "session_start"
  | "thinking"
  | "tool_call"
  | "file_edit"
  | "file_read"
  | "web_search"
  | "message_sent"
  | "session_end"
  | "error"
  | "idle"
  | "heartbeat";

export type Room =
  | "entrada"
  | "escritorio"
  | "biblioteca"
  | "cozinha"
  | "laboratorio"
  | "sala_de_controle";

export interface ActivityEvent {
  timestamp: string;
  session_id?: string;
  type?: string;
  actor?: string;
  activity?: {
    kind: ActivityKind;
    tool?: string;
    params?: Record<string, unknown>;
    result_summary?: string;
    duration_ms?: number;
    file?: string;
    lines_added?: number;
    tokens?: number;
    channels?: string[];
  };
  context: {
    channel?: string;
    user_id?: string;
    project?: string;
    room: Room;
  };
  narrative: string;
  kind?: ActivityKind;
}

const now = new Date();
const offset = (minutes: number) =>
  new Date(now.getTime() - minutes * 60000).toISOString();

export const mockEvents: ActivityEvent[] = [
  {
    timestamp: offset(0),
    session_id: "sess_001",
    actor: "axioma_main",
    activity: { kind: "thinking" },
    context: { channel: "kimi-claw", room: "escritorio" },
    narrative: "Claw está pensando sobre a arquitetura do ClawHouse...",
  },
  {
    timestamp: offset(2),
    session_id: "sess_001",
    actor: "axioma_main",
    activity: { kind: "tool_call", tool: "kimi_search", duration_ms: 1200 },
    context: { channel: "kimi-claw", room: "biblioteca" },
    narrative: "Claw pesquisou sobre activity streams em tempo real",
  },
  {
    timestamp: offset(5),
    session_id: "sess_001",
    actor: "axioma_main",
    activity: { kind: "file_edit", file: "src/app/page.tsx", lines_added: 45 },
    context: { channel: "kimi-claw", room: "escritorio" },
    narrative: "Claw editou a página principal do ClawHouse",
  },
  {
    timestamp: offset(8),
    session_id: "sess_001",
    actor: "axioma_main",
    activity: { kind: "message_sent", tokens: 520, channels: ["kimi-claw"] },
    context: { channel: "kimi-claw", room: "entrada" },
    narrative: "Claw enviou a resposta sobre o protocolo",
  },
  {
    timestamp: offset(12),
    session_id: "sess_002",
    actor: "axioma_main",
    activity: { kind: "session_start" },
    context: { channel: "kimi-claw", user_id: "960611098", room: "entrada" },
    narrative: "Carlos chamou Claw no Kimi Chat",
  },
  {
    timestamp: offset(13),
    session_id: "sess_002",
    actor: "axioma_main",
    activity: { kind: "web_search", tool: "kimi_search", duration_ms: 800 },
    context: { channel: "kimi-claw", room: "biblioteca" },
    narrative: "Claw buscou 'OpenClaw WhatsApp setup'",
  },
  {
    timestamp: offset(15),
    session_id: "sess_002",
    actor: "axioma_main",
    activity: { kind: "thinking" },
    context: { channel: "kimi-claw", room: "laboratorio" },
    narrative: "Claw está brainstorming ideias para o MVP",
  },
  {
    timestamp: offset(18),
    session_id: "sess_002",
    actor: "axioma_main",
    activity: { kind: "error" },
    context: { channel: "kimi-claw", room: "laboratorio" },
    narrative: "Claw encontrou um erro: timeout na API",
  },
  {
    timestamp: offset(22),
    session_id: "sess_003",
    actor: "axioma_main",
    activity: { kind: "session_start" },
    context: { channel: "kimi-claw", user_id: "960611098", room: "entrada" },
    narrative: "Carlos chamou Claw para revisar o TCC",
  },
  {
    timestamp: offset(23),
    session_id: "sess_003",
    actor: "axioma_main",
    activity: { kind: "thinking" },
    context: { channel: "kimi-claw", room: "biblioteca" },
    narrative: "Claw está analisando a bibliografia do TCC",
  },
  {
    timestamp: offset(25),
    session_id: "sess_003",
    actor: "axioma_main",
    activity: { kind: "tool_call", tool: "kimi_search", duration_ms: 1500 },
    context: { channel: "kimi-claw", room: "biblioteca" },
    narrative: "Claw pesquisou referências sobre cardiologia",
  },
  {
    timestamp: offset(28),
    session_id: "sess_003",
    actor: "axioma_main",
    activity: { kind: "file_edit", file: "docs/TCC.md", lines_added: 120 },
    context: { channel: "kimi-claw", room: "escritorio" },
    narrative: "Claw atualizou o documento do TCC",
  },
  {
    timestamp: offset(30),
    session_id: "sess_004",
    actor: "axioma_main",
    activity: { kind: "file_read", file: "docs/plano.md" },
    context: { channel: "kimi-claw", room: "biblioteca" },
    narrative: "Claw está lendo o plano de estudos",
  },
  {
    timestamp: offset(32),
    session_id: "sess_004",
    actor: "axioma_main",
    activity: { kind: "heartbeat" },
    context: { channel: "kimi-claw", room: "sala_de_controle" },
    narrative: "Claw verificou o calendário e tarefas do dia",
  },
  {
    timestamp: offset(35),
    session_id: "sess_004",
    actor: "axioma_main",
    activity: { kind: "tool_call", tool: "kimi_search", duration_ms: 900 },
    context: { channel: "kimi-claw", room: "cozinha" },
    narrative: "Claw pesquisou receitas low-carb para o almoço",
  },
  {
    timestamp: offset(38),
    session_id: "sess_004",
    actor: "axioma_main",
    activity: { kind: "message_sent", tokens: 180, channels: ["kimi-claw"] },
    context: { channel: "kimi-claw", room: "cozinha" },
    narrative: "Claw enviou sugestões de cardápio",
  },
  {
    timestamp: offset(42),
    session_id: "sess_005",
    actor: "axioma_main",
    activity: { kind: "session_start" },
    context: { channel: "kimi-claw", user_id: "960611098", room: "entrada" },
    narrative: "Carlos chamou Claw para configurar automações",
  },
  {
    timestamp: offset(43),
    session_id: "sess_005",
    actor: "axioma_main",
    activity: { kind: "thinking" },
    context: { channel: "kimi-claw", room: "sala_de_controle" },
    narrative: "Claw está planejando as automações do dia",
  },
  {
    timestamp: offset(45),
    session_id: "sess_005",
    actor: "axioma_main",
    activity: { kind: "file_edit", file: "src/lib/automations.ts", lines_added: 80 },
    context: { channel: "kimi-claw", room: "escritorio" },
    narrative: "Claw criou o módulo de automações",
  },
  {
    timestamp: offset(48),
    session_id: "sess_005",
    actor: "axioma_main",
    activity: { kind: "message_sent", tokens: 340, channels: ["kimi-claw"] },
    context: { channel: "kimi-claw", room: "entrada" },
    narrative: "Claw enviou o resumo das automações configuradas",
  },
  {
    timestamp: offset(50),
    session_id: "sess_005",
    actor: "axioma_main",
    activity: { kind: "session_end" },
    context: { channel: "kimi-claw", room: "entrada" },
    narrative: "Claw ficou idle",
  },
];

export function getLatestMockEvents(count: number = 10): ActivityEvent[] {
  return mockEvents.slice(0, count);
}
