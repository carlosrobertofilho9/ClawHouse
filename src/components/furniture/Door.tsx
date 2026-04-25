"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type DoorColor = "amber" | "stone" | "orange" | "neutral";

interface DoorProps extends FurnitureComponentProps {
  color?: DoorColor;
  width?: string;
}

const colorMap: Record<DoorColor, string> = {
  amber: "bg-amber-800",
  stone: "bg-stone-700",
  orange: "bg-orange-800",
  neutral: "bg-neutral-700",
};

export default function Door({ className, placement, color = "amber", width = "w-12" }: DoorProps) {
  return <FurnitureBase placement={placement} className={cn(width, "h-2", colorMap[color], "rounded-b", className)} />;
}
