"use client";

import { cn } from "@/src/lib/utils";

export type PanelPattern = "alternating" | "every-third" | "random";

interface ControlPanelProps {
  className?: string;
  width?: string;
  pattern?: PanelPattern;
}

const patternMap: Record<PanelPattern, (i: number) => string> = {
  alternating: (i) => (i % 2 === 0 ? "bg-green-400" : "bg-red-400"),
  "every-third": (i) => (i % 3 === 0 ? "bg-blue-400" : "bg-yellow-400"),
  random: (i) => {
    const colors = ["bg-green-400", "bg-red-400", "bg-blue-400", "bg-yellow-400", "bg-purple-400"];
    return colors[i % colors.length];
  },
};

export default function ControlPanel({ className, width = "w-16", pattern = "alternating" }: ControlPanelProps) {
  const getColor = patternMap[pattern];

  return (
    <div className={cn(width, "h-10 bg-slate-800 rounded-lg border-2 border-slate-600", className)}>
      <div className="grid grid-cols-3 gap-1 p-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={cn("w-3 h-2 rounded-sm", getColor(i))} />
        ))}
      </div>
    </div>
  );
}
