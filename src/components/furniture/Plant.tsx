"use client";

import { cn } from "@/src/lib/utils";

export type PlantSize = "sm" | "md" | "lg";
export type LeafColor = "green" | "emerald" | "teal" | "lime" | "dark-green";
export type FlowerColor = "red" | "pink" | "yellow" | "white" | "purple" | "none";

interface PlantProps {
  className?: string;
  size?: PlantSize;
  leafColor?: LeafColor;
  flower?: FlowerColor;
  rotation?: number;
}

const leafColorMap: Record<LeafColor, { main: string; dark: string; light: string; border: string }> = {
  green: { main: "bg-green-500", dark: "bg-green-600", light: "bg-green-400", border: "border-green-700" },
  emerald: { main: "bg-emerald-500", dark: "bg-emerald-600", light: "bg-emerald-400", border: "border-emerald-700" },
  teal: { main: "bg-teal-500", dark: "bg-teal-600", light: "bg-teal-400", border: "border-teal-700" },
  lime: { main: "bg-lime-500", dark: "bg-lime-600", light: "bg-lime-400", border: "border-lime-700" },
  "dark-green": { main: "bg-green-700", dark: "bg-green-800", light: "bg-green-600", border: "border-green-900" },
};

const flowerColorMap: Record<string, string> = {
  red: "bg-red-400",
  pink: "bg-pink-400",
  yellow: "bg-yellow-300",
  white: "bg-white",
  purple: "bg-purple-400",
};

const sizes = {
  sm: { pot: "w-4 h-5", leaf: "w-6 h-6", flower: "w-2 h-2" },
  md: { pot: "w-5 h-6", leaf: "w-8 h-8", flower: "w-3 h-3" },
  lg: { pot: "w-6 h-7", leaf: "w-10 h-10", flower: "w-4 h-4" },
};

export default function Plant({
  className,
  size = "md",
  leafColor = "green",
  flower = "none",
  rotation = 0,
}: PlantProps) {
  const s = sizes[size];
  const colors = leafColorMap[leafColor];
  const hasFlower = flower !== "none";

  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      style={rotation !== 0 ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      {/* Leaves */}
      <div className="relative">
        <div
          className={cn(s.leaf, colors.main, "rounded-full border", colors.border, "relative")}
        >
          <div className={cn("absolute top-1 left-1 w-2 h-2 rounded-full opacity-60", colors.light)} />
        </div>
        <div
          className={cn("absolute -top-1 -left-1 w-3 h-4 rounded-full rotate-[-20deg] border", colors.dark, colors.border)}
        />
        <div
          className={cn("absolute -top-1 -right-1 w-3 h-4 rounded-full rotate-[20deg] border", colors.dark, colors.border)}
        />
        {/* Flower */}
        {hasFlower && (
          <div
            className={cn(
              "absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-white/50",
              s.flower,
              flowerColorMap[flower]
            )}
          />
        )}
      </div>
      {/* Pot */}
      <div className={cn(s.pot, "bg-amber-800 rounded-b-md rounded-t-sm -mt-1 border border-amber-900")} />
    </div>
  );
}
