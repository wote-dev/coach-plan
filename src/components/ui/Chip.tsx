"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ChipColor = "neutral" | "emerald" | "yellow" | "blue" | "purple";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: ChipColor;
  leading?: React.ReactNode;
}

const colorToBorder: Record<ChipColor, string> = {
  neutral: "border-white/30",
  emerald: "border-emerald-400/40",
  yellow: "border-yellow-400/40",
  blue: "border-blue-400/40",
  purple: "border-purple-400/40",
};

export function Chip({ color = "neutral", leading, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold leading-none",
        "bg-white/10 text-white backdrop-blur-sm border shadow-sm",
        colorToBorder[color],
        className
      )}
      {...props}
    >
      {leading ? <span className="opacity-90">{leading}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}
