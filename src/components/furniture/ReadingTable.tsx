"use client";

import { cn } from "@/src/lib/utils";

interface ReadingTableProps {
  className?: string;
  width?: string;
  hasPaper?: boolean;
}

export default function ReadingTable({ className, width = "w-16", hasPaper = true }: ReadingTableProps) {
  return (
    <div className={cn(width, "h-10 bg-amber-700 rounded-lg border-2 border-amber-800", className)}>
      {hasPaper && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-6 bg-amber-100 rounded-sm border border-amber-300" />
      )}
    </div>
  );
}
