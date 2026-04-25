"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

interface ReadingTableProps extends FurnitureComponentProps {
  width?: string;
  hasPaper?: boolean;
}

export default function ReadingTable({ className, placement, width = "w-16", hasPaper = true }: ReadingTableProps) {
  return (
    <FurnitureBase placement={placement} className={cn(width, "h-10 bg-amber-700 rounded-lg border-2 border-amber-800", className)}>
      {hasPaper && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-6 bg-amber-100 rounded-sm border border-amber-300" />
      )}
    </FurnitureBase>
  );
}
