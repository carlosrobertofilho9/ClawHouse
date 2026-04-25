"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type LightColor = "green" | "red" | "blue" | "yellow" | "purple";

interface BlinkingLightsProps extends FurnitureComponentProps {
  width?: string;
  lights?: LightColor[];
}

const colorMap: Record<LightColor, string> = {
  green: "bg-green-400",
  red: "bg-red-400",
  blue: "bg-blue-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
};

export default function BlinkingLights({
  className,
  placement,
  width = "w-20",
  lights = ["green", "red", "blue", "yellow"],
}: BlinkingLightsProps) {
  return (
    <FurnitureBase placement={placement} className={cn(width, "h-1 bg-slate-900 rounded-b", className)}>
      {lights.map((color, i) => (
        <div
          key={`${color}-${i}`}
          className={cn("absolute top-0 w-1.5 h-1.5 rounded-full animate-pulse", colorMap[color])}
          style={{ left: `${(i + 1) * 16}px`, animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </FurnitureBase>
  );
}
