import { BaseButtonProps } from "../shared";

export type HeroButtonVariant = "primary" | "secondary" | "dark";

export interface HeroButtonProps extends BaseButtonProps {
  variant?: HeroButtonVariant;
}