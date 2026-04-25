"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Rug, Door, ConsoleTable } from "@/src/components/furniture";

export default function EntranceRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="entrada" name="Entrada" emoji="🏠">
      <div className="relative w-full h-full">
        <Door className="absolute top-0 left-1/2 -translate-x-1/2" />
        <Rug className="absolute top-8 left-1/2 -translate-x-1/2" color="rose" width="w-28" height="h-16" opacity={0.5} />
        <ConsoleTable className="absolute bottom-2 left-1/2 -translate-x-1/2" items={["frame", "vase-red"]} />
        <Plant className="absolute top-4 left-2" size="sm" leafColor="green" rotation={-5} />
        <Plant className="absolute top-4 right-2" size="sm" leafColor="teal" flower="pink" rotation={5} />
      </div>
    </RoomBase>
  );
}
