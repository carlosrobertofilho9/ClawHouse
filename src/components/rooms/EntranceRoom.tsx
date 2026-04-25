"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import Plant from "./Plant";

export default function EntranceRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="entrada" name="Entrada" emoji="🏠">
      <div className="relative w-full h-full">
        {/* Door */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-amber-800 rounded-b" />

        {/* Large rug */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-16 bg-rose-300 rounded-xl border-2 border-dashed border-rose-400 opacity-50" />

        {/* Console table */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-8 bg-amber-600 rounded-lg border-2 border-amber-700">
          <div className="absolute top-1 left-2 w-4 h-4 bg-white rounded-full border border-gray-300" />
          <div className="absolute top-1 right-2 w-3 h-3 bg-red-400 rounded-full" />
        </div>

        {/* Plants */}
        <div className="absolute top-4 left-2">
          <Plant size="sm" />
        </div>
        <div className="absolute top-4 right-2">
          <Plant size="sm" />
        </div>
      </div>
    </RoomBase>
  );
}
