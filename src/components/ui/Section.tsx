"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "emerald" | "yellow" | "danger" | "neutral";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
}

const toneToBorder: Record<Tone, string> = {
  default: "border-white/10",
  neutral: "border-white/10",
  emerald: "border-emerald-500/20",
  yellow: "border-lime-300/30",
  danger: "border-red-400/25",
};

const toneToBg: Record<Tone, string> = {
  default: "bg-white/5",
  neutral: "bg-white/5",
  emerald: "bg-white/5",
  yellow: "bg-white/5",
  danger: "bg-red-500/10",
};

export function SectionCard({ tone = "default", className, ...props }: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border backdrop-blur-[2px] transition-colors",
        toneToBg[tone],
        toneToBorder[tone],
        "hover:border-white/20",
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
  sm: "text-[11px] font-semibold text-white/60 uppercase tracking-widest",
  md: "text-xl sm:text-2xl font-semibold tracking-tight",
  lg: "text-3xl sm:text-4xl font-extrabold tracking-tight",
};

const dotToClasses: Record<NonNullable<SectionHeaderProps["dotColor"]>, string> = {
  white: "bg-white/80",
  emerald: "bg-emerald-400",
  yellow: "bg-lime-300",
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
        "text-white flex items-center gap-2",
        sizeToClasses[size],
        className
      )}
      {...props}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotToClasses[dotColor])} />
      {children}
    </Comp>
  );
}
