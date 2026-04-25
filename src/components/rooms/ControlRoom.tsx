"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";

export default function ControlRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="sala_de_controle" name="Sala de Controle" emoji="🎛️">
      <div className="relative w-full h-full">
        {/* Control panels */}
        <div className="absolute top-2 left-2 w-16 h-10 bg-slate-800 rounded-lg border-2 border-slate-600">
          <div className="grid grid-cols-3 gap-1 p-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-3 h-2 rounded-sm ${i % 2 === 0 ? "bg-green-400" : "bg-red-400"}`} />
            ))}
          </div>
        </div>

        <div className="absolute top-2 right-2 w-16 h-10 bg-slate-800 rounded-lg border-2 border-slate-600">
          <div className="grid grid-cols-3 gap-1 p-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-3 h-2 rounded-sm ${i % 3 === 0 ? "bg-blue-400" : "bg-yellow-400"}`} />
            ))}
          </div>
        </div>

        {/* Main console desk */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-12 bg-slate-700 rounded-lg border-2 border-slate-600">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-6 bg-sky-900 rounded border border-sky-700">
            <div className="mt-1 mx-1 h-0.5 bg-sky-400 rounded" />
            <div className="mt-0.5 mx-1 h-0.5 bg-sky-400 rounded w-2/3" />
          </div>
        </div>

        {/* Chair */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-500 rounded-full" />

        {/* Blinking lights strip */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-900 rounded-b">
          <div className="absolute top-0 left-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute top-0 left-6 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-0 left-10 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
          <div className="absolute top-0 left-14 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }} />
        </div>
      </div>
    </RoomBase>
  );
}
