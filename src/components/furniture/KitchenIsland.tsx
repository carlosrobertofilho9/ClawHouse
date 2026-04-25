"use client";

import { cn } from "@/src/lib/utils";

export type FoodItem = "tomato" | "cucumber" | "carrot" | "apple" | "bowl";

interface KitchenIslandProps {
  className?: string;
  width?: string;
  items?: FoodItem[];
}

const foodMap: Record<FoodItem, { color: string; shape: string }> = {
  tomato: { color: "bg-red-400", shape: "w-4 h-4 rounded-full" },
  cucumber: { color: "bg-green-400", shape: "w-4 h-4 rounded-full" },
  carrot: { color: "bg-orange-400", shape: "w-3 h-5 rounded-full" },
  apple: { color: "bg-red-500", shape: "w-4 h-4 rounded-full" },
  bowl: { color: "bg-blue-300", shape: "w-5 h-3 rounded-b-lg" },
};

export default function KitchenIsland({ className, width = "w-24", items = ["tomato", "cucumber"] }: KitchenIslandProps) {
  return (
    <div className={cn(width, "h-10 bg-amber-600 rounded-lg border-2 border-amber-700", className)}>
      {items.map((item, i) => {
        const food = foodMap[item];
        const position = i === 0 ? "right-2" : i === 1 ? "left-2" : "left-1/2 -translate-x-1/2";
        return (
          <div key={i} className={cn("absolute top-1", position, food.color, food.shape)} />
        );
      })}
    </div>
  );
}
