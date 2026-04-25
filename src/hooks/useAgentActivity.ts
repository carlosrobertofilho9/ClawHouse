"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActivityEvent, ActivityKind, mockEvents, Room } from "@/src/lib/mocks";

const API_URL = process.env.NEXT_PUBLIC_CLAWHOUSE_API || "http://localhost:18790";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true" || !process.env.NEXT_PUBLIC_CLAWHOUSE_API;
const POLL_INTERVAL = 3000;
const IDLE_THRESHOLD_MS = 30000;
const TRANSITION_DURATION_MS = 900;

export type AvatarState = "idle" | "thinking" | "working" | "excited" | "tired" | "reading";

function getAvatarState(event: ActivityEvent | null, now: Date): AvatarState {
  if (!event) return "idle";

  const eventTime = new Date(event.timestamp).getTime();
  const elapsed = now.getTime() - eventTime;

  if (elapsed > IDLE_THRESHOLD_MS) return "idle";

  const rawKind = event.activity?.kind || event.kind || event.type || "idle";
  const kind: ActivityKind = ["session_start", "thinking", "tool_call", "file_edit", "web_search", "message_sent", "session_end", "error", "idle", "heartbeat"].includes(rawKind as string) ? (rawKind as ActivityKind) : "idle";

  switch (kind) {
    case "thinking":
      return "thinking";
    case "tool_call":
    case "file_edit":
    case "web_search":
      return "working";
    case "message_sent":
      return "excited";
    case "error":
      return "tired";
    case "file_read":
      return "reading";
    default:
      return "idle";
  }
}

interface UseAgentActivityReturn {
  events: ActivityEvent[];
  current: ActivityEvent | null;
  currentRoom: Room;
  previousRoom: Room | null;
  isTransitioning: boolean;
  avatarState: AvatarState;
  status: "connected" | "disconnected" | "mock";
  error: string | null;
}

export function useAgentActivity(): UseAgentActivityReturn {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [status, setStatus] = useState<"connected" | "disconnected" | "mock">(
    USE_MOCK ? "mock" : "connected"
  );
  const [error, setError] = useState<string | null>(null);
  const [previousRoom, setPreviousRoom] = useState<Room | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = events[0] || null;
  const currentRoom: Room = current?.context?.room || "entrada";

  // Update avatar state periodically
  useEffect(() => {
    const updateState = () => {
      setAvatarState(getAvatarState(current, new Date()));
    };
    updateState();
    idleTimerRef.current = setInterval(updateState, 2000);
    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [current]);

  // Detect room transition
  useEffect(() => {
    if (!current) return;
    const newRoom = current.context?.room || "entrada";
    if (previousRoom && previousRoom !== newRoom) {
      setIsTransitioning(true);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION_MS);
    }
    setPreviousRoom(newRoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.context?.room]);

  const fetchActivity = useCallback(async () => {
    if (USE_MOCK) {
      setEvents((prev) => {
        if (prev.length === 0) return mockEvents.slice(0, 10);
        const nextIndex = mockEvents.findIndex((e) => e.timestamp === prev[0]?.timestamp);
        const start = nextIndex >= 0 ? (nextIndex + 1) % mockEvents.length : 0;
        return mockEvents.slice(start, start + 10);
      });
      setStatus("mock");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/activity`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ActivityEvent | ActivityEvent[] = await res.json();
      const incoming = Array.isArray(data) ? data : [data];
      setEvents((prev) => {
        const combined = [...incoming, ...prev];
        const unique = Array.from(new Map(combined.map((e) => [e.timestamp, e])).values());
        return unique.slice(0, 10);
      });
      setStatus("connected");
      setError(null);
    } catch (err) {
      setStatus("disconnected");
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  }, []);

  useEffect(() => {
    fetchActivity();
    const interval = setInterval(fetchActivity, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchActivity]);

  return {
    events,
    current,
    currentRoom,
    previousRoom,
    isTransitioning,
    avatarState,
    status,
    error,
  };
}
