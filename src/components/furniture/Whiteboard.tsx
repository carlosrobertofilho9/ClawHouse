"use client";

import { cn } from "@/src/lib/utils";
import FurnitureBase, { type FurnitureComponentProps } from "./FurnitureBase";

export type ChartType = "bars" | "line" | "none";

interface WhiteboardProps extends FurnitureComponentProps {
  width?: string;
  height?: string;
  lines?: number;
  chartType?: ChartType;
}

export default function Whiteboard({
  className,
  placement,
  width = "w-20",
  height = "h-12",
  lines = 3,
  chartType = "bars",
}: WhiteboardProps) {
  const lineWidths = ["w-full", "w-3/4", "w-1/2", "w-2/3", "w-5/6"];

  return (
    <FurnitureBase placement={placement} className={cn(width, height, "bg-white rounded-lg border-2 border-gray-300", className)}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={cn("mt-1 mx-2 h-0.5 bg-gray-400 rounded", lineWidths[i % lineWidths.length])}
          style={{ marginTop: i === 0 ? "8px" : "4px" }}
        />
      ))}
      {/* Chart */}
      {chartType === "bars" && (
        <div className="absolute top-2 right-2 w-4 h-6">
          <div className="absolute bottom-0 left-0 w-1 h-3 bg-blue-400" />
          <div className="absolute bottom-0 left-1.5 w-1 h-5 bg-green-400" />
          <div className="absolute bottom-0 left-3 w-1 h-2 bg-red-400" />
        </div>
      )}
      {chartType === "line" && (
        <div className="absolute top-2 right-2 w-4 h-6">
          <svg viewBox="0 0 16 24" className="w-full h-full">
            <polyline
              points="0,18 4,12 8,16 12,6 16,10"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}
    </FurnitureBase>
  );
}
