"use client";

import { cn } from "@/src/lib/utils";

export type MicroscopeColor = "slate" | "gray" | "zinc";

interface MicroscopeProps {
  className?: string;
  color?: MicroscopeColor;
}

const colorMap: Record<MicroscopeColor, { body: string; head: string }> = {
  slate: { body: "bg-slate-700", head: "bg-slate-800" },
  gray: { body: "bg-gray-700", head: "bg-gray-800" },
  zinc: { body: "bg-zinc-700", head: "bg-zinc-800" },
};

export default function Microscope({ className, color = "slate" }: MicroscopeProps) {
  const c = colorMap[color];
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("w-2 h-4 rounded-sm", c.body)} />
      <div className={cn("w-4 h-3 rounded-t-lg -mt-6", c.head)} />
    </div>
  );
}
