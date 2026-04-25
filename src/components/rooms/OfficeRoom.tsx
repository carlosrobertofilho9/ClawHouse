"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import Plant from "./Plant";

export default function OfficeRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="escritorio" name="Escritório" emoji="💻">
      <div className="relative w-full h-full">
        {/* Desk */}
        <div className="absolute top-2 left-2 w-20 h-12 bg-violet-400 rounded-lg border-2 border-violet-600 shadow-sm">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-6 bg-slate-700 rounded border border-slate-500" />
          <div className="absolute bottom-1 right-2 w-6 h-4 bg-violet-300 rounded-sm" />
        </div>

        {/* Chair */}
        <div className="absolute top-14 left-8 w-6 h-6 bg-slate-600 rounded-full" />

        {/* Bookshelf */}
        <div className="absolute top-2 right-2 w-10 h-24 bg-amber-700 rounded-md border-2 border-amber-800">
          <div className="mt-1 mx-0.5 space-y-0.5">
            {[75, 60, 85, 70, 65].map((w, i) => (
              <div key={i} className="h-1.5 bg-amber-200 rounded-sm" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        {/* Plant */}
        <div className="absolute bottom-2 left-2">
          <Plant size="md" />
        </div>

        {/* Rug */}
        <div className="absolute bottom-2 right-8 w-16 h-10 bg-rose-300 rounded-lg border-2 border-dashed border-rose-400 opacity-60" />
      </div>
    </RoomBase>
  );
}
