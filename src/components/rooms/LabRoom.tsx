"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { LabTable, Whiteboard, Microscope } from "@/src/components/furniture";

export default function LabRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="laboratorio" name="Laboratório" emoji="🔬">
      <div className="relative w-full h-full">
        <LabTable
          placement={{ top: 16, left: 8 }}
          color="violet"
          width="w-20"
          flasks={["sky", "green"]}
        />
        <LabTable
          placement={{ top: 16, right: 8 }}
          color="purple"
          width="w-16"
          flasks={["rose", "yellow"]}
        />
        <Whiteboard placement={{ bottom: 8, left: "50%", anchor: "bottom-center" }} chartType="bars" />
        <Microscope placement={{ top: 22, right: 26 }} />
      </div>
    </RoomBase>
  );
}
