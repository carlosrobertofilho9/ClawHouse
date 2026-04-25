"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import type { Room } from "@/src/lib/mocks";
import { AvatarState } from "@/src/hooks/useAgentActivity";
import { ActivityEvent } from "@/src/lib/mocks";
import ClawCharacter from "./ClawCharacter";
import OfficeRoom from "./rooms/OfficeRoom";
import EntranceRoom from "./rooms/EntranceRoom";
import LibraryRoom from "./rooms/LibraryRoom";
import KitchenRoom from "./rooms/KitchenRoom";
import ControlRoom from "./rooms/ControlRoom";
import LabRoom from "./rooms/LabRoom";

interface HouseProps {
  currentRoom: string;
  previousRoom: string | null;
  isTransitioning: boolean;
  avatarState: AvatarState;
  currentEvent: ActivityEvent | null;
  onRoomChange?: (room: Room) => void;
}

export default function House({
  currentRoom,
  previousRoom,
  isTransitioning,
  avatarState,
  currentEvent,
  onRoomChange,
}: HouseProps) {
  const isError = avatarState === "tired";

  return (
    <div className="relative w-full h-full min-h-[480px] overflow-hidden rounded-xl bg-[#1a1a2e] p-4">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#2a2a3e 1px, transparent 1px), linear-gradient(90deg, #2a2a3e 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Rooms grid */}
      <div className="relative grid grid-cols-3 grid-rows-2 gap-4 h-full">
        <div className="col-span-1 row-span-1 h-full">
          <OfficeRoom isActive={currentRoom === "escritorio"} isError={isError && currentRoom === "escritorio"} />
        </div>
        <div className="col-span-1 row-span-1 h-full">
          <EntranceRoom isActive={currentRoom === "entrada"} isError={isError && currentRoom === "entrada"} />
        </div>
        <div className="col-span-1 row-span-1 h-full">
          <LibraryRoom isActive={currentRoom === "biblioteca"} isError={isError && currentRoom === "biblioteca"} />
        </div>
        <div className="col-span-1 row-span-1 h-full">
          <KitchenRoom isActive={currentRoom === "cozinha"} isError={isError && currentRoom === "cozinha"} />
        </div>
        <div className="col-span-1 row-span-1 h-full">
          <ControlRoom isActive={currentRoom === "sala_de_controle"} isError={isError && currentRoom === "sala_de_controle"} />
        </div>
        <div className="col-span-1 row-span-1 h-full">
          <LabRoom isActive={currentRoom === "laboratorio"} isError={isError && currentRoom === "laboratorio"} />
        </div>
      </div>

      {/* Character overlay - positioned absolutely based on room */}
      <ClawCharacterOverlay
        state={avatarState}
        isTransitioning={isTransitioning}
        currentRoom={currentRoom as Room}
        previousRoom={previousRoom as Room | null}
        currentEvent={currentEvent}
      />

      {/* Error flash overlay */}
      {isError && (
        <div className="absolute inset-0 pointer-events-none animate-pulse bg-red-500/10 rounded-xl" />
      )}
    </div>
  );
}

function ClawCharacterOverlay({
  state,
  isTransitioning,
  currentRoom,
  previousRoom,
  currentEvent,
}: {
  state: AvatarState;
  isTransitioning: boolean;
  currentRoom: Room;
  previousRoom: Room | null;
  currentEvent: ActivityEvent | null;
}) {
  const [pos, setPos] = useState(getRoomGridPosition(currentRoom));
  const targetRef = useRef(getRoomGridPosition(currentRoom));
  const animRef = useRef<number>(0);

  useEffect(() => {
    targetRef.current = getRoomGridPosition(currentRoom);
  }, [currentRoom]);

  // Smooth lerp movement
  useEffect(() => {
    const speed = 0.06;
    const animate = () => {
      setPos((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          return targetRef.current;
        }
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Grid positions (percentages for responsive positioning)
  // 3 columns, 2 rows with gap-4 (~16px)
  // Approximate centers:
  const left = `${pos.x}%`;
  const top = `${pos.y}%`;

  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-opacity duration-300",
        isTransitioning ? "opacity-0" : "opacity-100"
      )}
      style={{
        left,
        top,
        transform: "translate(-50%, -50%)",
        zIndex: 20,
      }}
    >
      <ClawCharacter
        state={state}
        isTransitioning={isTransitioning}
        currentRoom={currentRoom}
        previousRoom={previousRoom}
        currentEvent={currentEvent}
      />
    </div>
  );
}

function getRoomGridPosition(roomId: Room): { x: number; y: number } {
  // Percentage positions for 3-col, 2-row grid with padding
  const positions: Record<Room, { x: number; y: number }> = {
    escritorio: { x: 16.67, y: 25 },
    entrada: { x: 50, y: 25 },
    biblioteca: { x: 83.33, y: 25 },
    cozinha: { x: 16.67, y: 75 },
    sala_de_controle: { x: 50, y: 75 },
    laboratorio: { x: 83.33, y: 75 },
  };
  return positions[roomId] || { x: 50, y: 50 };
}
