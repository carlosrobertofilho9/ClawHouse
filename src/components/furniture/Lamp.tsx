"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type LampColor = "yellow" | "warm" | "cool";

interface LampProps extends FurnitureComponentProps {
  color?: LampColor;
}

const shadeMap: Record<LampColor, { shade: string; border: string; opacity: string }> = {
  yellow: { shade: "bg-yellow-200", border: "border-yellow-400", opacity: "opacity-80" },
  warm: { shade: "bg-orange-200", border: "border-orange-400", opacity: "opacity-80" },
  cool: { shade: "bg-sky-200", border: "border-sky-400", opacity: "opacity-80" },
};

export default function Lamp({ className, placement, color = "yellow" }: LampProps) {
  const c = shadeMap[color];
  return (
    <FurnitureBase placement={placement} className={cn("flex flex-col items-center", className)}>
      <div className="w-1 h-6 bg-slate-600" />
      <div className={cn("w-6 h-4 rounded-t-full -mt-6 border", c.shade, c.border, c.opacity)} />
    </FurnitureBase>
  );
}
