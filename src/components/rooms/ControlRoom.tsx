"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Chair, ControlPanel, ConsoleDesk, BlinkingLights } from "@/src/components/furniture";

export default function ControlRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="sala_de_controle" name="Sala de Controle" emoji="🎛️">
      <div className="relative w-full h-full">
        <ControlPanel className="absolute top-2 left-2" pattern="alternating" />
        <ControlPanel className="absolute top-2 right-2" pattern="every-third" />
        <ConsoleDesk className="absolute bottom-4 left-1/2 -translate-x-1/2" screenColor="sky" />
        <Chair className="absolute bottom-16 left-1/2 -translate-x-1/2" color="slate" />
        <BlinkingLights
          className="absolute top-0 left-1/2 -translate-x-1/2"
          lights={["green", "red", "blue", "yellow"]}
        />
      </div>
    </RoomBase>
  );
}
