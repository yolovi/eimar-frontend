import { BaseButtonProps } from "../shared";

export type CloseButtonPosition = "absolute" | "relative";

export interface CloseButtonProps extends Omit<BaseButtonProps, 'children' | 'onClick'> {
  /** Función para manejar el cierre - requerida */
  onClick: () => void;
  
  /** Tipo de posicionamiento */
  position?: CloseButtonPosition;
  
  /** Clases CSS para la posición (ej: 'top-4 right-4') */
  positionClasses?: string;
  
  /** Etiqueta de accesibilidad */
  ariaLabel?: string;
}