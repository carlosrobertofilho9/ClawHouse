"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type DeskColor = "violet" | "amber" | "slate" | "zinc";

interface DeskProps extends FurnitureComponentProps {
  color?: DeskColor;
  width?: string;
  height?: string;
  hasMonitor?: boolean;
  hasBook?: boolean;
}

const colorMap: Record<DeskColor, { bg: string; border: string; book: string }> = {
  violet: { bg: "bg-violet-400", border: "border-violet-600", book: "bg-violet-300" },
  amber: { bg: "bg-amber-600", border: "border-amber-700", book: "bg-amber-400" },
  slate: { bg: "bg-slate-600", border: "border-slate-700", book: "bg-slate-400" },
  zinc: { bg: "bg-zinc-600", border: "border-zinc-700", book: "bg-zinc-400" },
};

export default function Desk({
  className,
  placement,
  color = "violet",
  width = "w-20",
  height = "h-12",
  hasMonitor = true,
  hasBook = true,
}: DeskProps) {
  const colors = colorMap[color];

  return (
    <FurnitureBase placement={placement} className={cn(width, height, colors.bg, "rounded-lg border-2", colors.border, "shadow-sm", className)}>
      {hasMonitor && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-6 bg-slate-700 rounded border border-slate-500" />
      )}
      {hasBook && (
        <div className={cn("absolute bottom-1 right-2 w-6 h-4 rounded-sm", colors.book)} />
      )}
    </FurnitureBase>
  );
}
