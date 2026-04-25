"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Plant, Desk, Chair, Bookshelf, Rug } from "@/src/components/furniture";

export default function OfficeRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="escritorio" name="Escritório" emoji="💻">
      <div className="relative w-full h-full">
        <Desk className="absolute top-2 left-2" />
        <Chair className="absolute top-14 left-8" color="slate" />
        <Bookshelf className="absolute top-2 right-2" color="amber" shelves={5} pattern="mixed" />
        <Plant className="absolute bottom-2 left-2" size="md" leafColor="emerald" flower="yellow" />
        <Rug className="absolute bottom-2 right-8" color="rose" width="w-16" height="h-10" />
      </div>
    </RoomBase>
  );
}
