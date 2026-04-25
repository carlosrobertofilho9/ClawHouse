"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { LabTable, Whiteboard, Microscope } from "@/src/components/furniture";

export default function LabRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="laboratorio" name="Laboratório" emoji="🔬">
      <div className="relative w-full h-full">
        <LabTable
          className="absolute top-4 left-2"
          color="violet"
          width="w-20"
          flasks={["sky", "green"]}
        />
        <LabTable
          className="absolute top-4 right-2"
          color="purple"
          width="w-16"
          flasks={["rose", "yellow"]}
        />
        <Whiteboard className="absolute bottom-2 left-1/2 -translate-x-1/2" chartType="bars" />
        <Microscope className="absolute bottom-16 right-4" color="slate" />
      </div>
    </RoomBase>
  );
}
