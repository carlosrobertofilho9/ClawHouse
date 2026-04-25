"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type BookshelfColor = "amber" | "brown" | "dark-amber";
export type BookPattern = "mixed" | "warm" | "cool" | "neutral";

interface BookshelfProps extends FurnitureComponentProps {
  color?: BookshelfColor;
  width?: string;
  height?: string;
  shelves?: number;
  pattern?: BookPattern;
  side?: "left" | "right" | "center";
}

const colorMap: Record<BookshelfColor, { bg: string; border: string }> = {
  amber: { bg: "bg-amber-700", border: "border-amber-800" },
  brown: { bg: "bg-amber-800", border: "border-amber-900" },
  "dark-amber": { bg: "bg-amber-900", border: "border-amber-950" },
};

const bookPatterns: Record<BookPattern, string[]> = {
  mixed: ["bg-amber-200", "bg-amber-300", "bg-red-300", "bg-blue-300", "bg-green-300"],
  warm: ["bg-amber-200", "bg-orange-300", "bg-red-300", "bg-yellow-300", "bg-rose-300"],
  cool: ["bg-blue-300", "bg-sky-300", "bg-teal-300", "bg-indigo-300", "bg-cyan-300"],
  neutral: ["bg-stone-300", "bg-gray-300", "bg-neutral-300", "bg-slate-300", "bg-zinc-300"],
};

export default function Bookshelf({
  className,
  placement,
  color = "amber",
  width = "w-10",
  height = "h-24",
  shelves = 5,
  pattern = "mixed",
  side = "center",
}: BookshelfProps) {
  const colors = colorMap[color];
  const books = bookPatterns[pattern];

  const borderClass =
    side === "center"
      ? cn("border-2", colors.border)
      : cn(side === "left" ? "border-r-2" : "border-l-2", colors.border);

  return (
    <FurnitureBase placement={placement} className={cn(width, height, colors.bg, "rounded-md", borderClass, className)}>
      <div className="mt-1 mx-0.5 space-y-0.5">
        {[...Array(shelves)].map((_, i) => {
          const widths = [75, 60, 85, 70, 65, 50, 90, 80];
          const bookColor = books[i % books.length];
          return (
            <div key={i} className={cn("h-1.5 rounded-sm", bookColor)} style={{ width: `${widths[i % widths.length]}%` }} />
          );
        })}
      </div>
    </FurnitureBase>
  );
}
