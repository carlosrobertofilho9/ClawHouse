"use client";

import { cn } from "@/src/lib/utils";

export type FridgeColor = "gray" | "white" | "slate";

interface FridgeProps {
  className?: string;
  color?: FridgeColor;
  height?: string;
}

const colorMap: Record<FridgeColor, { bg: string; border: string; handle: string }> = {
  gray: { bg: "bg-gray-200", border: "border-gray-300", handle: "bg-gray-400" },
  white: { bg: "bg-white", border: "border-gray-200", handle: "bg-gray-300" },
  slate: { bg: "bg-slate-200", border: "border-slate-300", handle: "bg-slate-400" },
};

export default function Fridge({ className, color = "gray", height = "h-20" }: FridgeProps) {
  const c = colorMap[color];
  return (
    <div className={cn("w-10", height, c.bg, "rounded-lg border-2", c.border, className)}>
      <div className={cn("absolute top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded", c.handle)} />
      <div className={cn("absolute top-4 left-1/2 -translate-x-1/2 w-6 h-1 rounded", c.handle)} />
    </div>
  );
}
