"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Rug, Door, ConsoleTable } from "@/src/components/furniture";

export default function EntranceRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="entrada" name="Entrada" emoji="🏠">
      <div className="relative w-full h-full">
        <Door placement={{ top: 0, left: "50%", anchor: "top-center", flushToWall: "top" }} />
        <Rug
          placement={{ top: 36, left: "50%", anchor: "top-center" }}
          color="rose"
          width="w-52"
          height="h-24"
          opacity={0.5}
        />
        <ConsoleTable
          placement={{ bottom: 12, left: "50%", anchor: "bottom-center" }}
          items={["frame", "vase-red"]}
        />
        <Plant placement={{ top: 20, left: 10 }} size="md" leafColor="green" rotation={-5} />
        <Plant placement={{ top: 20, right: 10 }} size="md" leafColor="teal" flower="pink" rotation={5} />
      </div>
    </RoomBase>
  );
}
