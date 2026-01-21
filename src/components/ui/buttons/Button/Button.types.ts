import { ButtonWithIconsProps } from "../shared";

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

export interface ButtonProps extends ButtonWithIconsProps {
  variant?: ButtonVariant;
  asChild?: boolean;
}
