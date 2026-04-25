"use client";

import { useState, useEffect, useCallback } from "react";
import { ActivityEvent, mockEvents } from "@/src/lib/mocks";

const API_URL = process.env.NEXT_PUBLIC_CLAWHOUSE_API || "http://localhost:18790";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true" || !process.env.NEXT_PUBLIC_CLAWHOUSE_API;
const POLL_INTERVAL = 3000;

interface UseAgentActivityReturn {
  events: ActivityEvent[];
  currentRoom: string;
  status: "connected" | "disconnected" | "mock";
  error: string | null;
}

export function useAgentActivity(): UseAgentActivityReturn {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [status, setStatus] = useState<"connected" | "disconnected" | "mock">(
    USE_MOCK ? "mock" : "connected"
  );
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    if (USE_MOCK) {
      // Rotate mock events to simulate live activity
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

  const currentRoom = events[0]?.context?.room || "entrada";

  return { events, currentRoom, status, error };
}
