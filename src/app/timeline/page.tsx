"use client";

import { useState } from "react";
import ActivityTimeline from "@/src/components/ActivityTimeline";
import StatusBar from "@/src/components/StatusBar";
import { useAgentActivity } from "@/src/hooks/useAgentActivity";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import type { ActivityKind, Room } from "@/src/lib/mocks";

const kindFilters: { value: ActivityKind | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "thinking", label: "Pensando" },
  { value: "tool_call", label: "Ferramenta" },
  { value: "message_sent", label: "Mensagem" },
  { value: "error", label: "Erro" },
  { value: "idle", label: "Idle" },
  { value: "session_start", label: "Início" },
  { value: "session_end", label: "Fim" },
];

const roomFilters: { value: Room | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "entrada", label: "Entrada" },
  { value: "escritorio", label: "Escritório" },
  { value: "biblioteca", label: "Biblioteca" },
  { value: "cozinha", label: "Cozinha" },
  { value: "laboratorio", label: "Laboratório" },
  { value: "sala_de_controle", label: "Sala de Controle" },
];

export default function TimelinePage() {
  const { events, status, error } = useAgentActivity();
  const [kindFilter, setKindFilter] = useState<ActivityKind | "all">("all");
  const [roomFilter, setRoomFilter] = useState<Room | "all">("all");

  const filteredEvents = events.filter((event) => {
    const kind = event.activity?.kind || event.kind || event.type || "idle";
    const room = event.context?.room || "entrada";
    const kindMatch = kindFilter === "all" || kind === kindFilter;
    const roomMatch = roomFilter === "all" || room === roomFilter;
    return kindMatch && roomMatch;
  });

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <StatusBar status={status} error={error} />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">📜 Timeline Completa</h1>
          <p className="text-sm text-neutral-500">
            Todos os eventos de atividade do agente Claw
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 space-y-3">
          <div>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block">
              Tipo
            </span>
            <div className="flex flex-wrap gap-2">
              {kindFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={kindFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setKindFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block">
              Cômodo
            </span>
            <div className="flex flex-wrap gap-2">
              {roomFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={roomFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRoomFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Badge variant="secondary">{filteredEvents.length} eventos</Badge>
          {kindFilter !== "all" && (
            <Badge variant="outline">Tipo: {kindFilters.find((f) => f.value === kindFilter)?.label}</Badge>
          )}
          {roomFilter !== "all" && (
            <Badge variant="outline">
              Cômodo: {roomFilters.find((f) => f.value === roomFilter)?.label}
            </Badge>
          )}
        </div>

        <div className="h-[600px]">
          <ActivityTimeline events={filteredEvents} showAll />
        </div>
      </div>
    </div>
  );
}
