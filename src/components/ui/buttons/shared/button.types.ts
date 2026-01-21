/**
 * SHARED BUTTON TYPES
 * ===================
 * Tipos base comunes para todos los componentes de botón
 * Evita duplicación y asegura consistencia en la API
 */

import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Tamaños base para todos los botones
 * Usar este tipo como base para variaciones específicas
 */
export type BaseButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Props base comunes para todos los botones
 * Extiende ButtonHTMLAttributes para heredar todas las props nativas
 */
export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Contenido del botón */
  children: ReactNode;
  
  /** Tamaño del botón */
  size?: BaseButtonSize;
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Estado de carga con spinner */
  isLoading?: boolean;
  
  /** Estado deshabilitado */
  disabled?: boolean;
  
  /** Función onClick personalizada */
  onClick?: () => void;
}

/**
 * Props extendidas para botones con iconos
 */
export interface ButtonWithIconsProps extends BaseButtonProps {
  /** Icono a la izquierda del texto */
  leftIcon?: ReactNode;
  
  /** Icono a la derecha del texto */
  rightIcon?: ReactNode;
  
  /** Hacer el botón de ancho completo */
  fullWidth?: boolean;
}