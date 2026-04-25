"use client";

import { Brain, Wrench, Send, AlertCircle, Clock, Activity, FileEdit, Search, Heart, PlayCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import type { ActivityEvent, ActivityKind } from "@/src/lib/mocks";

interface ActivityTimelineProps {
  events: ActivityEvent[];
  maxItems?: number;
  showAll?: boolean;
}

const kindConfig: Record<
  ActivityKind,
  { icon: React.ReactNode; label: string; variant: "thinking" | "toolcall" | "messagesent" | "error" | "idle" | "default" }
> = {
  thinking: { icon: <Brain className="w-4 h-4" />, label: "Pensando", variant: "thinking" },
  tool_call: { icon: <Wrench className="w-4 h-4" />, label: "Ferramenta", variant: "toolcall" },
  web_search: { icon: <Search className="w-4 h-4" />, label: "Busca", variant: "toolcall" },
  file_edit: { icon: <FileEdit className="w-4 h-4" />, label: "Edição", variant: "toolcall" },
  message_sent: { icon: <Send className="w-4 h-4" />, label: "Mensagem", variant: "messagesent" },
  error: { icon: <AlertCircle className="w-4 h-4" />, label: "Erro", variant: "error" },
  idle: { icon: <Clock className="w-4 h-4" />, label: "Idle", variant: "idle" },
  session_start: { icon: <PlayCircle className="w-4 h-4" />, label: "Início", variant: "default" },
  session_end: { icon: <Clock className="w-4 h-4" />, label: "Fim", variant: "idle" },
  heartbeat: { icon: <Heart className="w-4 h-4" />, label: "Heartbeat", variant: "default" },
};

function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "agora";
  if (diffMins < 60) return `há ${diffMins} min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  return `há ${diffDays}d`;
}

function getKindFromEvent(event: ActivityEvent): ActivityKind {
  if (event.activity?.kind) return event.activity.kind;
  if (event.kind) return event.kind;
  if (event.type === "thinking") return "thinking";
  if (event.type === "tool_call") return "tool_call";
  if (event.type === "message_sent") return "message_sent";
  if (event.type === "error") return "error";
  if (event.type === "session_start") return "session_start";
  if (event.type === "session_end") return "session_end";
  return "idle";
}

export default function ActivityTimeline({ events, maxItems = 10, showAll = false }: ActivityTimelineProps) {
  const displayEvents = showAll ? events : events.slice(0, maxItems);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-neutral-100 flex items-center gap-2">
        <Activity className="w-5 h-5 text-neutral-600" />
        <h2 className="font-semibold text-neutral-800">Activity Timeline</h2>
        <span className="text-xs text-neutral-400 ml-auto">{events.length} eventos</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {displayEvents.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">
              Nenhum evento ainda
            </div>
          ) : (
            displayEvents.map((event, index) => {
              const kind = getKindFromEvent(event);
              const config = kindConfig[kind] || kindConfig.idle;
              const roomLabel = event.context?.room
                ? event.context.room.replace("_", " ")
                : "entrada";

              return (
                <div
                  key={`${event.timestamp}-${index}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                      kind === "thinking" && "bg-blue-100 text-blue-600",
                      kind === "tool_call" && "bg-yellow-100 text-yellow-600",
                      kind === "web_search" && "bg-yellow-100 text-yellow-600",
                      kind === "file_edit" && "bg-yellow-100 text-yellow-600",
                      kind === "message_sent" && "bg-green-100 text-green-600",
                      kind === "error" && "bg-red-100 text-red-600",
                      kind === "idle" && "bg-gray-100 text-gray-600",
                      kind === "session_start" && "bg-neutral-100 text-neutral-600",
                      kind === "session_end" && "bg-gray-100 text-gray-600",
                      kind === "heartbeat" && "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant={config.variant} className="text-[10px] px-1.5 py-0">
                        {config.label}
                      </Badge>
                      <span className="text-[10px] text-neutral-400 capitalize">
                        {roomLabel}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 leading-snug">
                      {event.narrative}
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      {getRelativeTime(event.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
