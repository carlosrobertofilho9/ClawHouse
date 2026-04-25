"use client";

import { cn } from "@/src/lib/utils";

export type RugColor = "rose" | "blue" | "amber" | "green" | "purple" | "slate";
export type RugShape = "rounded" | "pill";

interface RugProps {
  className?: string;
  color?: RugColor;
  shape?: RugShape;
  width?: string;
  height?: string;
  opacity?: number;
}

const colorMap: Record<RugColor, { bg: string; border: string }> = {
  rose: { bg: "bg-rose-300", border: "border-rose-400" },
  blue: { bg: "bg-blue-300", border: "border-blue-400" },
  amber: { bg: "bg-amber-300", border: "border-amber-400" },
  green: { bg: "bg-green-300", border: "border-green-400" },
  purple: { bg: "bg-purple-300", border: "border-purple-400" },
  slate: { bg: "bg-slate-300", border: "border-slate-400" },
};

export default function Rug({
  className,
  color = "rose",
  shape = "rounded",
  width = "w-16",
  height = "h-10",
  opacity = 0.6,
}: RugProps) {
  const colors = colorMap[color];
  const shapeClass = shape === "pill" ? "rounded-full" : "rounded-lg";

  return (
    <div
      className={cn(width, height, colors.bg, shapeClass, "border-2 border-dashed", colors.border, className)}
      style={{ opacity }}
    />
  );
}
