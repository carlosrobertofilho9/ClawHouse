"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

interface StoveProps extends FurnitureComponentProps {
  width?: string;
  burners?: number;
}

export default function Stove({ className, placement, width = "w-14", burners = 4 }: StoveProps) {
  return (
    <FurnitureBase placement={placement} className={cn(width, "h-12 bg-slate-700 rounded-lg border-2 border-slate-800", className)}>
      {[...Array(Math.min(burners, 4))].map((_, i) => {
        const positions = [
          "top-1 left-1",
          "top-1 right-1",
          "bottom-1 left-1",
          "bottom-1 right-1",
        ];
        return (
          <div
            key={i}
            className={cn("absolute w-4 h-4 bg-slate-900 rounded-full border border-slate-500", positions[i])}
          />
        );
      })}
    </FurnitureBase>
  );
}
