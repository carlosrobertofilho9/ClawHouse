"use client";

import { cn } from "@/src/lib/utils";
import { AvatarState } from "@/src/hooks/useAgentActivity";
import { ActivityEvent, Room } from "@/src/lib/mocks";

interface NarrationBarProps {
  avatarState: AvatarState;
  currentEvent: ActivityEvent | null;
  currentRoom: Room;
  className?: string;
}

function generateNarrative(state: AvatarState, event: ActivityEvent | null, room: Room): string {
  if (event?.narrative) {
    return event.narrative;
  }

  const roomName = room.replace("_", " ");

  switch (state) {
    case "idle":
      return "Claw está descansando...";
    case "thinking":
      return `Claw está pensando sobre ${event?.context?.project || roomName}...`;
    case "working":
      return `Claw está trabalhando no ${roomName}`;
    case "excited":
      return `Claw enviou uma mensagem!`;
    case "tired":
      return `Claw encontrou um problema...`;
    case "reading":
      return `Claw está lendo algo no ${roomName}`;
    default:
      return "Claw está observando...";
  }
}

const stateConfig: Record<AvatarState, { color: string; bg: string; border: string; emoji: string }> = {
  idle: { color: "text-gray-300", bg: "bg-gray-900/60", border: "border-gray-700", emoji: "😴" },
  thinking: { color: "text-blue-300", bg: "bg-blue-900/40", border: "border-blue-800", emoji: "🤔" },
  working: { color: "text-yellow-300", bg: "bg-yellow-900/40", border: "border-yellow-800", emoji: "⚡" },
  excited: { color: "text-green-300", bg: "bg-green-900/40", border: "border-green-800", emoji: "🎉" },
  tired: { color: "text-red-300", bg: "bg-red-900/40", border: "border-red-800", emoji: "😓" },
  reading: { color: "text-purple-300", bg: "bg-purple-900/40", border: "border-purple-800", emoji: "📖" },
};

export default function NarrationBar({ avatarState, currentEvent, currentRoom, className }: NarrationBarProps) {
  const config = stateConfig[avatarState];
  const narrative = generateNarrative(avatarState, currentEvent, currentRoom);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 px-6 py-2.5 rounded-lg border transition-all duration-500 backdrop-blur-sm",
        config.bg,
        config.border,
        className
      )}
    >
      <span className="text-lg animate-pulse">{config.emoji}</span>
      <p className={cn("text-sm font-medium", config.color)}>
        {narrative}
      </p>
    </div>
  );
}
