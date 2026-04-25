"use client";

import { cn } from "@/src/lib/utils";

export type TableItem = "frame" | "vase-red" | "vase-blue" | "lamp" | "plant";

interface ConsoleTableProps {
  className?: string;
  width?: string;
  items?: TableItem[];
}

const itemRender: Record<TableItem, React.ReactNode> = {
  frame: <div className="w-4 h-4 bg-white rounded-full border border-gray-300" />,
  "vase-red": <div className="w-3 h-3 bg-red-400 rounded-full" />,
  "vase-blue": <div className="w-3 h-3 bg-blue-400 rounded-full" />,
  lamp: <div className="w-3 h-4 bg-yellow-200 rounded-t-full border border-yellow-400" />,
  plant: <div className="w-3 h-3 bg-green-500 rounded-full border border-green-700" />,
};

export default function ConsoleTable({ className, width = "w-20", items = ["frame", "vase-red"] }: ConsoleTableProps) {
  return (
    <div className={cn(width, "h-8 bg-amber-600 rounded-lg border-2 border-amber-700", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "absolute top-1",
            i === 0 ? "left-2" : i === 1 ? "right-2" : "left-1/2 -translate-x-1/2"
          )}
        >
          {itemRender[item]}
        </div>
      ))}
    </div>
  );
}
