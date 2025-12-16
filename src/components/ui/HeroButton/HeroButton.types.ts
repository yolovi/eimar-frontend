import { ButtonHTMLAttributes, ReactNode } from "react";

export type HeroButtonVariant = "primary" | "secondary" | "dark";

export type HeroButtonSize = "sm" | "md" | "lg";

export interface HeroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: HeroButtonVariant;
  size?: HeroButtonSize;
  children: ReactNode;
  className?: string;
}