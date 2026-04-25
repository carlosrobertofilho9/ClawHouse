"use client";

import { cn } from "@/src/lib/utils";

export type ChairColor = "slate" | "gray" | "zinc" | "neutral" | "stone";

interface ChairProps {
  className?: string;
  color?: ChairColor;
  size?: "sm" | "md";
}

const colorMap: Record<ChairColor, string> = {
  slate: "bg-slate-600",
  gray: "bg-gray-600",
  zinc: "bg-zinc-600",
  neutral: "bg-neutral-600",
  stone: "bg-stone-600",
};

export default function Chair({ className, color = "slate", size = "md" }: ChairProps) {
  const sizeClass = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  return <div className={cn(sizeClass, colorMap[color], "rounded-full", className)} />;
}
