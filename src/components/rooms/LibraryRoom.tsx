"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import { Bookshelf, ReadingTable, Lamp } from "@/src/components/furniture";

export default function LibraryRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="biblioteca" name="Biblioteca" emoji="📚">
      <div className="relative w-full h-full">
        <Bookshelf
          className="absolute top-0 left-0 h-full"
          color="brown"
          width="w-10"
          shelves={6}
          pattern="warm"
          side="left"
        />
        <Bookshelf
          className="absolute top-0 right-0 h-full"
          color="brown"
          width="w-10"
          shelves={6}
          pattern="cool"
          side="right"
        />
        <ReadingTable className="absolute bottom-4 left-1/2 -translate-x-1/2" />
        <Lamp className="absolute top-2 left-1/2 -translate-x-1/2" color="yellow" />
      </div>
    </RoomBase>
  );
}
