"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import type { Room } from "@/src/lib/mocks";

interface HouseProps {
  currentRoom: string;
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

export default function House({ currentRoom, onRoomChange }: HouseProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room>(currentRoom as Room);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    onRoomChange?.(room);
  };

  const targetRoom = rooms.find((r) => r.id === selectedRoom) || rooms[1];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Grid de cômodos */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 p-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isActive={currentRoom === room.id}
            isSelected={selectedRoom === room.id}
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </div>

      {/* Avatar — posicionado via grid overlay */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-6 pointer-events-none">
        <div
          className="flex items-center justify-center transition-all duration-700 ease-in-out"
          style={{
            gridColumn: targetRoom.col,
            gridRow: targetRoom.row,
          }}
        >
          <div className="w-12 h-12 bg-white rounded-full shadow-xl border-2 border-neutral-900 flex items-center justify-center text-2xl z-10">
            🐾
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomCard({
  room,
  isActive,
  isSelected,
  onClick,
}: {
  room: RoomConfig;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl p-6 h-40 transition-all duration-500 cursor-pointer border-2",
        room.bgColor,
        room.hoverColor,
        isActive || isSelected
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
