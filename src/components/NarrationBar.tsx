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

const stateConfig: Record<AvatarState, { color: string; bg: string; emoji: string }> = {
  idle: { color: "text-gray-600", bg: "bg-gray-100", emoji: "😴" },
  thinking: { color: "text-blue-600", bg: "bg-blue-50", emoji: "🤔" },
  working: { color: "text-yellow-600", bg: "bg-yellow-50", emoji: "⚡" },
  excited: { color: "text-green-600", bg: "bg-green-50", emoji: "🎉" },
  tired: { color: "text-red-600", bg: "bg-red-50", emoji: "😓" },
  reading: { color: "text-purple-600", bg: "bg-purple-50", emoji: "📖" },
};

export default function NarrationBar({ avatarState, currentEvent, currentRoom, className }: NarrationBarProps) {
  const config = stateConfig[avatarState];
  const narrative = generateNarrative(avatarState, currentEvent, currentRoom);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 px-6 py-3 rounded-xl border transition-all duration-500",
        config.bg,
        "border-neutral-200",
        className
      )}
    >
      <span className="text-xl animate-pulse">{config.emoji}</span>
      <p className={cn("text-sm font-medium", config.color)}>
        {narrative}
      </p>
    </div>
  );
}
