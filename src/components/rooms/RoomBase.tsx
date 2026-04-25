"use client";

import { cn } from "@/src/lib/utils";
import type { Room } from "@/src/lib/mocks";
import { ReactNode } from "react";

export interface RoomBaseProps {
  id: Room;
  name: string;
  emoji: string;
  isActive: boolean;
  isError: boolean;
  children?: ReactNode;
  className?: string;
}

const roomStyles: Record<Room, { floor: string; wall: string; activeRing: string }> = {
  escritorio: { floor: "bg-blue-200", wall: "border-blue-300", activeRing: "ring-blue-400" },
  entrada: { floor: "bg-gray-200", wall: "border-gray-300", activeRing: "ring-orange-400" },
  biblioteca: { floor: "bg-amber-100", wall: "border-amber-300", activeRing: "ring-yellow-400" },
  cozinha: { floor: "bg-green-200", wall: "border-green-300", activeRing: "ring-green-400" },
  sala_de_controle: { floor: "bg-red-200", wall: "border-red-300", activeRing: "ring-red-400" },
  laboratorio: { floor: "bg-purple-200", wall: "border-purple-300", activeRing: "ring-purple-400" },
};

export default function RoomBase({ id, name, emoji, isActive, isError, children, className }: RoomBaseProps) {
  const styles = roomStyles[id];

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 overflow-hidden transition-all duration-500 h-full",
        styles.floor,
        isError ? "border-red-500 animate-shake bg-red-100" : styles.wall,
        isActive && !isError && `shadow-lg ring-2 ${styles.activeRing} scale-[1.02] z-10`,
        className
      )}
    >
      {/* Floor texture pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Room header */}
      <div className="relative flex items-center gap-2 px-3 py-2 border-b border-black/10">
        <span className="text-lg">{emoji}</span>
        <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">{name}</span>
        {isActive && (
          <span className="absolute top-2 right-2 text-[10px] bg-white/70 px-2 py-0.5 rounded-full text-neutral-600 font-semibold">
            Ativo
          </span>
        )}
      </div>

      {/* Room content */}
      <div className="relative p-3 h-[calc(100%-36px)]">
        {children}
      </div>
    </div>
  );
}
