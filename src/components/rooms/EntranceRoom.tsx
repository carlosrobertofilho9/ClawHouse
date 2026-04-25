"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Rug, Door, ConsoleTable } from "@/src/components/furniture";

export default function EntranceRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="entrada" name="Entrada" emoji="🏠">
      <div className="relative w-full h-full">
        <Door placement={{ top: 0, left: "50%", anchor: "top-center", flushToWall: "top" }} />
        <Rug
          placement={{ top: 32, left: "50%", anchor: "top-center" }}
          color="rose"
          width="w-28"
          height="h-16"
          opacity={0.5}
        />
        <ConsoleTable
          placement={{ bottom: 8, left: "50%", anchor: "bottom-center" }}
          items={["frame", "vase-red"]}
        />
        <Plant placement={{ top: 16, left: 8 }} size="sm" leafColor="green" rotation={-5} />
        <Plant placement={{ top: 16, right: 8 }} size="sm" leafColor="teal" flower="pink" rotation={5} />
      </div>
    </RoomBase>
  );
}
