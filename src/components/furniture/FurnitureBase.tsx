"use client";

import { cn } from "@/src/lib/utils";
import type { CSSProperties, ReactNode } from "react";

export type FurnitureAnchor =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type FurnitureWallSide = "top" | "right" | "bottom" | "left";

export interface FurniturePlacement {
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
  anchor?: FurnitureAnchor;
  flushToWall?: FurnitureWallSide | FurnitureWallSide[];
  zIndex?: CSSProperties["zIndex"];
}

export interface FurnitureComponentProps {
  className?: string;
  placement?: FurniturePlacement;
}

interface FurnitureBaseProps extends FurnitureComponentProps {
  children?: ReactNode;
  rotation?: number;
  style?: CSSProperties;
}

const anchorTransformMap: Record<FurnitureAnchor, string> = {
  "top-left": "",
  "top-center": "translateX(-50%)",
  "top-right": "translateX(-100%)",
  "center-left": "translateY(-50%)",
  center: "translate(-50%, -50%)",
  "center-right": "translate(-100%, -50%)",
  "bottom-left": "translateY(-100%)",
  "bottom-center": "translate(-50%, -100%)",
  "bottom-right": "translate(-100%, -100%)",
};

const roomContentPaddingPx = 12;

function offsetCssValue(value: CSSProperties["top"] | undefined, offset: number): CSSProperties["top"] {
  if (typeof value === "number") {
    return value + offset;
  }

  if (typeof value === "string") {
    return `calc(${value} + ${offset}px)`;
  }

  return offset;
}

function shouldFlushToWall(placement: FurniturePlacement, side: FurnitureWallSide) {
  const flushToWall = placement.flushToWall;

  if (!flushToWall) {
    return false;
  }

  return Array.isArray(flushToWall) ? flushToWall.includes(side) : flushToWall === side;
}

function getPlacementStyle(placement?: FurniturePlacement): CSSProperties {
  if (!placement) {
    return {};
  }

  const style: CSSProperties = {};

  if (placement.top !== undefined) style.top = placement.top;
  if (placement.right !== undefined) style.right = placement.right;
  if (placement.bottom !== undefined) style.bottom = placement.bottom;
  if (placement.left !== undefined) style.left = placement.left;
  if (placement.zIndex !== undefined) style.zIndex = placement.zIndex;

  if (shouldFlushToWall(placement, "top")) {
    style.top = offsetCssValue(placement.top, -roomContentPaddingPx);
  }
  if (shouldFlushToWall(placement, "right")) {
    style.right = offsetCssValue(placement.right, -roomContentPaddingPx);
  }
  if (shouldFlushToWall(placement, "bottom")) {
    style.bottom = offsetCssValue(placement.bottom, -roomContentPaddingPx);
  }
  if (shouldFlushToWall(placement, "left")) {
    style.left = offsetCssValue(placement.left, -roomContentPaddingPx);
  }

  return style;
}

export default function FurnitureBase({
  className,
  placement,
  rotation = 0,
  style,
  children,
}: FurnitureBaseProps) {
  const anchor = placement?.anchor ?? "top-left";
  const { transform: customTransform, ...customStyle } = style ?? {};
  const transform = [
    anchorTransformMap[anchor],
    rotation !== 0 ? `rotate(${rotation}deg)` : "",
    customTransform,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cn("relative", placement && "absolute", className)}
      style={{
        ...getPlacementStyle(placement),
        ...customStyle,
        ...(transform ? { transform } : undefined),
      }}
    >
      {children}
    </div>
  );
}
