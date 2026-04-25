"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type FlaskColor = "sky" | "green" | "rose" | "yellow" | "purple";

interface LabTableProps extends FurnitureComponentProps {
  color?: "violet" | "purple" | "indigo";
  width?: string;
  flasks?: FlaskColor[];
}

const tableColorMap: Record<string, { bg: string; border: string; detail: string }> = {
  violet: { bg: "bg-violet-600", border: "border-violet-800", detail: "bg-violet-400" },
  purple: { bg: "bg-purple-600", border: "border-purple-800", detail: "bg-purple-400" },
  indigo: { bg: "bg-indigo-600", border: "border-indigo-800", detail: "bg-indigo-400" },
};

const flaskMap: Record<FlaskColor, { bg: string; border: string }> = {
  sky: { bg: "bg-sky-200", border: "border-sky-400" },
  green: { bg: "bg-green-300", border: "border-green-500" },
  rose: { bg: "bg-rose-200", border: "border-rose-400" },
  yellow: { bg: "bg-yellow-200", border: "border-yellow-400" },
  purple: { bg: "bg-purple-200", border: "border-purple-400" },
};

export default function LabTable({
  className,
  placement,
  color = "violet",
  width = "w-20",
  flasks = ["sky", "green"],
}: LabTableProps) {
  const t = tableColorMap[color];

  return (
    <FurnitureBase placement={placement} className={cn(width, "h-10", t.bg, "rounded-lg border-2", t.border, className)}>
      {flasks.map((flask, i) => {
        const f = flaskMap[flask];
        const position = i === 0 ? "left-2" : i === 1 ? "right-3" : "left-1/2 -translate-x-1/2";
        const size = i === 0 ? "w-4 h-5" : "w-3 h-4";
        return (
          <div
            key={i}
            className={cn("absolute top-1", position, size, f.bg, "rounded-full border", f.border, "opacity-70")}
          />
        );
      })}
      <div className={cn("absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded", t.detail)} />
    </FurnitureBase>
  );
}
