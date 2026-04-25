"use client";

import RoomBase, { RoomBaseProps } from "./RoomBase";
import Plant from "./Plant";

export default function LabRoom(props: Omit<RoomBaseProps, "id" | "name" | "emoji">) {
  return (
    <RoomBase {...props} id="laboratorio" name="Laboratório" emoji="🔬">
      <div className="relative w-full h-full">
        {/* Lab table left */}
        <div className="absolute top-4 left-2 w-20 h-10 bg-violet-600 rounded-lg border-2 border-violet-800">
          <div className="absolute top-1 left-2 w-4 h-5 bg-sky-200 rounded-full border border-sky-400 opacity-70" />
          <div className="absolute top-2 right-3 w-3 h-4 bg-green-300 rounded-full border border-green-500 opacity-70" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-violet-400 rounded" />
        </div>

        {/* Lab table right */}
        <div className="absolute top-4 right-2 w-16 h-10 bg-violet-700 rounded-lg border-2 border-violet-900">
          <div className="absolute top-1 left-2 w-3 h-5 bg-rose-200 rounded-full border border-rose-400 opacity-70" />
          <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-200 rounded-full border border-yellow-400 opacity-70" />
        </div>

        {/* Whiteboard */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-12 bg-white rounded-lg border-2 border-gray-300">
          <div className="mt-2 mx-2 h-0.5 bg-gray-400 rounded" />
          <div className="mt-1 mx-2 h-0.5 bg-gray-400 rounded w-3/4" />
          <div className="mt-1 mx-2 h-0.5 bg-gray-400 rounded w-1/2" />
          {/* Chart */}
          <div className="absolute top-2 right-2 w-4 h-6">
            <div className="absolute bottom-0 left-0 w-1 h-3 bg-blue-400" />
            <div className="absolute bottom-0 left-1.5 w-1 h-5 bg-green-400" />
            <div className="absolute bottom-0 left-3 w-1 h-2 bg-red-400" />
          </div>
        </div>

        {/* Microscope */}
        <div className="absolute bottom-16 right-4">
          <div className="w-2 h-4 bg-slate-700 rounded-sm mx-auto" />
          <div className="w-4 h-3 bg-slate-800 rounded-t-lg -mt-6" />
        </div>
      </div>
    </RoomBase>
  );
}
