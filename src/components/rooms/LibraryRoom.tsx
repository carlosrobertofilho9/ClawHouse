"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";

export default function LibraryRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="biblioteca" name="Biblioteca" emoji="📚">
      <div className="relative w-full h-full">
        {/* Tall bookshelves left */}
        <div className="absolute top-0 left-0 w-10 h-full bg-amber-800 rounded-md border-r-2 border-amber-900">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mt-1 mx-0.5 space-y-0.5">
              <div className="h-1 bg-amber-200 rounded-sm" />
              <div className="h-1 bg-amber-300 rounded-sm w-3/4" />
              <div className="h-1 bg-red-300 rounded-sm w-1/2" />
            </div>
          ))}
        </div>

        {/* Tall bookshelves right */}
        <div className="absolute top-0 right-0 w-10 h-full bg-amber-800 rounded-md border-l-2 border-amber-900">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mt-1 mx-0.5 space-y-0.5">
              <div className="h-1 bg-blue-300 rounded-sm w-2/3" />
              <div className="h-1 bg-green-300 rounded-sm" />
              <div className="h-1 bg-amber-200 rounded-sm w-4/5" />
            </div>
          ))}
        </div>

        {/* Reading table */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-10 bg-amber-700 rounded-lg border-2 border-amber-800">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-6 bg-amber-100 rounded-sm border border-amber-300" />
        </div>

        {/* Lamp */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <div className="w-1 h-6 bg-slate-600 mx-auto" />
          <div className="w-6 h-4 bg-yellow-200 rounded-t-full -mt-6 border border-yellow-400 opacity-80" />
        </div>
      </div>
    </RoomBase>
  );
}
