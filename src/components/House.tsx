"use client";

import { cn } from "@/src/lib/utils";
import type { Room } from "@/src/lib/mocks";
import { AvatarState } from "@/src/hooks/useAgentActivity";
import { ActivityEvent } from "@/src/lib/mocks";
import Avatar from "./Avatar";

interface HouseProps {
  currentRoom: string;
  previousRoom: string | null;
  isTransitioning: boolean;
  avatarState: AvatarState;
  currentEvent: ActivityEvent | null;
  onRoomChange?: (room: Room) => void;
}

interface RoomConfig {
  id: Room;
  name: string;
  emoji: string;
  col: number;
  row: number;
  bgColor: string;
  hoverColor: string;
  ringColor: string;
}

const rooms: RoomConfig[] = [
  {
    id: "escritorio",
    name: "Escritório",
    emoji: "💻",
    col: 1,
    row: 1,
    bgColor: "bg-office",
    hoverColor: "hover:bg-blue-200",
    ringColor: "ring-blue-400",
  },
  {
    id: "entrada",
    name: "Entrada",
    emoji: "🏠",
    col: 2,
    row: 1,
    bgColor: "bg-entrance",
    hoverColor: "hover:bg-gray-200",
    ringColor: "ring-orange-400",
  },
  {
    id: "biblioteca",
    name: "Biblioteca",
    emoji: "📚",
    col: 3,
    row: 1,
    bgColor: "bg-library",
    hoverColor: "hover:bg-yellow-200",
    ringColor: "ring-yellow-400",
  },
  {
    id: "cozinha",
    name: "Cozinha",
    emoji: "🍳",
    col: 1,
    row: 2,
    bgColor: "bg-kitchen",
    hoverColor: "hover:bg-green-200",
    ringColor: "ring-green-400",
  },
  {
    id: "sala_de_controle",
    name: "Sala de Controle",
    emoji: "🎛️",
    col: 2,
    row: 2,
    bgColor: "bg-control",
    hoverColor: "hover:bg-red-200",
    ringColor: "ring-red-400",
  },
  {
    id: "laboratorio",
    name: "Laboratório",
    emoji: "🔬",
    col: 3,
    row: 2,
    bgColor: "bg-lab",
    hoverColor: "hover:bg-purple-200",
    ringColor: "ring-purple-400",
  },
];

export default function House({
  currentRoom,
  previousRoom,
  isTransitioning,
  avatarState,
  currentEvent,
  onRoomChange,
}: HouseProps) {
  const targetRoom = rooms.find((r) => r.id === currentRoom) || rooms[1];
  const sourceRoom = previousRoom ? rooms.find((r) => r.id === previousRoom) : null;
  const isError = avatarState === "tired";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Grid de cômodos */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 p-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isActive={currentRoom === room.id}
            isError={isError && currentRoom === room.id}
            onClick={() => onRoomChange?.(room.id)}
          />
        ))}
      </div>

      {/* Avatar overlay with transition */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-6 pointer-events-none">
        {/* Flash line between rooms during transition */}
        {isTransitioning && sourceRoom && (
          <FlashLine from={sourceRoom} to={targetRoom} />
        )}

        <div
          className="flex items-center justify-center transition-all duration-700 ease-in-out"
          style={{
            gridColumn: targetRoom.col,
            gridRow: targetRoom.row,
          }}
        >
          <Avatar
            state={avatarState}
            isTransitioning={isTransitioning}
            currentEvent={currentEvent}
          />
        </div>
      </div>
    </div>
  );
}

function FlashLine({ from, to }: { from: RoomConfig; to: RoomConfig }) {
  // Calculate center positions (approximate based on grid)
  const cellW = 100 / 3;
  const cellH = 100 / 2;
  const x1 = (from.col - 0.5) * cellW;
  const y1 = (from.row - 0.5) * cellH;
  const x2 = (to.col - 0.5) * cellW;
  const y2 = (to.row - 0.5) * cellH;

  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return (
    <div
      className="absolute animate-flash-line pointer-events-none z-0"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${length}%`,
        height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 50%",
      }}
    />
  );
}

function RoomCard({
  room,
  isActive,
  isError,
  onClick,
}: {
  room: RoomConfig;
  isActive: boolean;
  isError: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl p-6 h-40 transition-all duration-500 cursor-pointer border-2",
        room.bgColor,
        room.hoverColor,
        isError && "room-flash-error bg-red-100 border-red-300",
        isActive && !isError
          ? `shadow-lg ring-2 ${room.ringColor} border-transparent scale-105`
          : "border-neutral-200 shadow-sm hover:shadow-md"
      )}
    >
      <span className="text-4xl mb-2">{room.emoji}</span>
      <span className="font-medium text-sm text-neutral-700">{room.name}</span>
      {isActive && (
        <span className="absolute top-2 right-2 text-xs bg-white/80 px-2 py-0.5 rounded-full text-neutral-600 font-medium">
          Ativo
        </span>
      )}
    </button>
  );
}
