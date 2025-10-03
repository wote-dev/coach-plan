"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "emerald" | "yellow" | "danger" | "neutral";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
}

const toneToBorder: Record<Tone, string> = {
  default: "border-white/20",
  neutral: "border-white/20",
  emerald: "border-emerald-500/30",
  yellow: "border-yellow-500/30",
  danger: "border-red-500/40",
};

const toneToBg: Record<Tone, string> = {
  default: "bg-white/10",
  neutral: "bg-white/10",
  emerald: "bg-white/10",
  yellow: "bg-white/10",
  danger: "bg-red-500/15",
};

export function SectionCard({ tone = "default", className, ...props }: SectionCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-sm rounded-2xl shadow-md",
        toneToBg[tone],
        "border",
        toneToBorder[tone],
        className
      )}
      {...props}
    />
  );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
  dotColor?: "white" | "emerald" | "yellow" | "blue" | "red";
  size?: "sm" | "md" | "lg";
}

const sizeToClasses: Record<NonNullable<SectionHeaderProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl sm:text-3xl font-bold tracking-tight",
};

const dotToClasses: Record<NonNullable<SectionHeaderProps["dotColor"]>, string> = {
  white: "bg-white",
  emerald: "bg-emerald-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  red: "bg-red-400",
};

export function SectionHeader({
  as = "h3",
  dotColor = "white",
  size = "md",
  className,
  children,
  ...props
}: SectionHeaderProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp
      className={cn(
        "text-white uppercase tracking-wider font-bold flex items-center gap-2",
        sizeToClasses[size],
        className
      )}
      {...props}
    >
      <span className={cn("w-2 h-2 rounded-full", dotToClasses[dotColor])} />
      {children}
    </Comp>
  );
}
