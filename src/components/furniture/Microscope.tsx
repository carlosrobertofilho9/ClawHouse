"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type MicroscopeColor = "slate" | "gray" | "zinc";

interface MicroscopeProps extends FurnitureComponentProps {
  color?: MicroscopeColor;
}

const colorMap: Record<MicroscopeColor, { body: string; head: string; lens: string; base: string }> = {
  slate: { body: "bg-slate-700", head: "bg-slate-800", lens: "bg-slate-600", base: "bg-slate-900" },
  gray: { body: "bg-gray-700", head: "bg-gray-800", lens: "bg-gray-600", base: "bg-gray-900" },
  zinc: { body: "bg-zinc-700", head: "bg-zinc-800", lens: "bg-zinc-600", base: "bg-zinc-900" },
};

export default function Microscope({ className, placement, color = "slate" }: MicroscopeProps) {
  const c = colorMap[color];

  return (
    <FurnitureBase placement={placement} className={cn("w-8 h-9", className)}>
      <div className={cn("absolute bottom-0 left-1/2 h-1.5 w-7 -translate-x-1/2 rounded-full", c.base)} />
      <div className={cn("absolute bottom-1 left-3 h-5 w-1.5 rounded-sm", c.body)} />
      <div className={cn("absolute bottom-5 left-3 h-2 w-4 origin-left -rotate-[25deg] rounded-full", c.head)} />
      <div className={cn("absolute bottom-6 left-5 h-1.5 w-3 origin-left -rotate-[25deg] rounded-full", c.lens)} />
      <div className={cn("absolute bottom-2 right-1.5 h-5 w-1 rounded-full rotate-[20deg]", c.body)} />
    </FurnitureBase>
  );
}
