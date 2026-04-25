"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Chair, ControlPanel, ConsoleDesk, BlinkingLights } from "@/src/components/furniture";

export default function ControlRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="sala_de_controle" name="Sala de Controle" emoji="🎛️">
      <div className="relative w-full h-full">
        <ControlPanel placement={{ top: 8, left: 8 }} pattern="alternating" />
        <ControlPanel placement={{ top: 8, right: 8 }} pattern="every-third" />
        <ConsoleDesk placement={{ bottom: 16, left: "50%", anchor: "bottom-center" }} screenColor="sky" />
        <Chair placement={{ bottom: 64, left: "50%", anchor: "bottom-center" }} color="slate" />
        <BlinkingLights placement={{ top: 0, left: "50%", anchor: "top-center", flushToWall: "top" }} />
      </div>
    </RoomBase>
  );
}
