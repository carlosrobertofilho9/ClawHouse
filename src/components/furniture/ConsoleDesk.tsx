"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type ScreenColor = "sky" | "green" | "amber";

interface ConsoleDeskProps extends FurnitureComponentProps {
  width?: string;
  screenColor?: ScreenColor;
}

const screenMap: Record<ScreenColor, { bg: string; border: string; line: string }> = {
  sky: { bg: "bg-sky-900", border: "border-sky-700", line: "bg-sky-400" },
  green: { bg: "bg-green-900", border: "border-green-700", line: "bg-green-400" },
  amber: { bg: "bg-amber-900", border: "border-amber-700", line: "bg-amber-400" },
};

export default function ConsoleDesk({ className, placement, width = "w-28", screenColor = "sky" }: ConsoleDeskProps) {
  const s = screenMap[screenColor];
  return (
    <FurnitureBase placement={placement} className={cn(width, "h-12 bg-slate-700 rounded-lg border-2 border-slate-600", className)}>
      <div className={cn("absolute top-1 left-1/2 -translate-x-1/2 w-16 h-6 rounded border", s.bg, s.border)}>
        <div className={cn("mt-1 mx-1 h-0.5 rounded", s.line)} />
        <div className={cn("mt-0.5 mx-1 h-0.5 rounded w-2/3", s.line)} />
      </div>
    </FurnitureBase>
  );
}
