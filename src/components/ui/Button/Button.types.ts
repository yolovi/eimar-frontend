import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost" //acciones secundarias, botones nav, cancelar modales...
  | "destructive"; //acciones peligrosas (eliminar reserva)

/*disabled se maneja con CSS:
const baseClasses = '... disabled:pointer-events-none disabled:opacity-50';
<Button variant="primary" disabled>Primario Deshabilitado</Button>
Tailwind aplica automáticamente: disabled:opacity-50 disabled:pointer-events-none
*/

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}
