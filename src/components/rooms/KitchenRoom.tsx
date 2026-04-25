"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import Plant from "./Plant";

export default function KitchenRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="cozinha" name="Cozinha" emoji="🍳">
      <div className="relative w-full h-full">
        {/* Stove */}
        <div className="absolute top-2 left-2 w-14 h-12 bg-slate-700 rounded-lg border-2 border-slate-800">
          <div className="absolute top-1 left-1 w-4 h-4 bg-slate-900 rounded-full border border-slate-500" />
          <div className="absolute top-1 right-1 w-4 h-4 bg-slate-900 rounded-full border border-slate-500" />
          <div className="absolute bottom-1 left-1 w-4 h-4 bg-slate-900 rounded-full border border-slate-500" />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-slate-900 rounded-full border border-slate-500" />
        </div>

        {/* Fridge */}
        <div className="absolute top-2 right-2 w-10 h-20 bg-gray-200 rounded-lg border-2 border-gray-300">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-400 rounded" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-400 rounded" />
        </div>

        {/* Kitchen island */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-10 bg-amber-600 rounded-lg border-2 border-amber-700">
          <div className="absolute top-1 right-2 w-4 h-4 bg-red-400 rounded-full" />
          <div className="absolute top-1 left-2 w-4 h-4 bg-green-400 rounded-full" />
        </div>

        {/* Plant */}
        <div className="absolute bottom-2 left-2">
          <Plant size="sm" />
        </div>
      </div>
    </RoomBase>
  );
}
