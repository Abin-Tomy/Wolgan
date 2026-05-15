import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "tagline";
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function Typography({
  children,
  className,
  variant = "h2",
  as: Component = "h2",
  style,
}: TypographyProps) {
  const variantStyles = {
    h1: "font-normal leading-[0.95] tracking-tight",
    h2: "font-montserrat font-normal text-4xl leading-tight",
    h3: "text-2xl font-montserrat font-normal tracking-tight",
    tagline: "text-[10px] uppercase tracking-[0.5em] font-bold opacity-70",
  };

  const defaultStyles = {
    h1: { fontSize: "clamp(2.5rem, 7vw, 6rem)" },
  };

  const combinedStyle = {
    ...(variant === "h1" ? defaultStyles.h1 : {}),
    ...style,
  };

  return (
    <Component
      className={cn(variantStyles[variant], className)}
      style={combinedStyle}
    >
      {children}
    </Component>
  );
}
