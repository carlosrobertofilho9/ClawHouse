"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Desk, Chair, Bookshelf, Rug } from "@/src/components/furniture";

export default function OfficeRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="escritorio" name="Escritório" emoji="💻">
      <div className="relative w-full h-full">
        <Desk placement={{ top: 8, left: 8 }} />
        <Chair placement={{ top: 56, left: 32 }} color="slate" />
        <Bookshelf placement={{ top: 8, right: 8 }} color="amber" shelves={5} pattern="mixed" />
        <Plant placement={{ bottom: 8, left: 8 }} size="md" leafColor="emerald" flower="yellow" />
        <Rug placement={{ bottom: 8, right: 32 }} color="rose" width="w-16" height="h-10" />
      </div>
    </RoomBase>
  );
}
