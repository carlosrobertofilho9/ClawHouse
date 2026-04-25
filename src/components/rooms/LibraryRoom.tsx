"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Bookshelf, ReadingTable, Lamp } from "@/src/components/furniture";

export default function LibraryRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="biblioteca" name="Biblioteca" emoji="📚">
      <div className="relative w-full h-full">
        <Bookshelf
          placement={{ top: 0, left: 0 }}
          color="brown"
          width="w-10"
          height="h-full"
          shelves={6}
          pattern="warm"
          side="left"
        />
        <Bookshelf
          placement={{ top: 0, right: 0 }}
          color="brown"
          width="w-10"
          height="h-full"
          shelves={6}
          pattern="cool"
          side="right"
        />
        <ReadingTable placement={{ bottom: 16, left: "50%", anchor: "bottom-center" }} />
        <Lamp placement={{ top: 8, left: "50%", anchor: "top-center" }} color="yellow" />
      </div>
    </RoomBase>
  );
}
