"use client";

import { cn } from "@/src/lib/utils";

interface StatusBarProps {
  status: "connected" | "disconnected" | "mock";
  error: string | null;
}

export default function StatusBar({ status, error }: StatusBarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#0f0f23] border-b border-neutral-800">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            status === "connected" && "bg-green-500",
            status === "mock" && "bg-yellow-500",
            status === "disconnected" && "bg-red-500 animate-pulse"
          )}
        />
        <span
          className={cn(
            "text-xs font-medium",
            status === "connected" && "text-green-400",
            status === "mock" && "text-yellow-400",
            status === "disconnected" && "text-red-400"
          )}
        >
          {status === "connected" && "Conectado"}
          {status === "mock" && "Mock Data"}
          {status === "disconnected" && "Desconectado"}
        </span>
      </div>
      {error && (
        <span className="text-xs text-red-400 ml-auto">{error}</span>
      )}
    </div>
  );
}
