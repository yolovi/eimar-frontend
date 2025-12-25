/**
 * ACTION BUTTON COMPONENT - EIMAR
 * ===============================
 *
 * Botón circular de acción reutilizable para secciones hero.
 * Usado típicamente para acciones como llamar, WhatsApp, ver carta, etc.
 *
 * CARACTERÍSTICAS:
 * - Diseño circular con icono y texto
 * - Estados hover y focus consistentes
 * - Soporte para diferentes iconos vía props
 * - Estilos optimizados para overlays oscuros
 * - Accesibilidad completa
 *
 * USO:
 * import { ActionButton } from '@/components/ui';
 * 
 * <ActionButton 
 *   icon={<MenuIcon />} 
 *   label="Carta" 
 *   onClick={handleViewMenu}
 *   ariaLabel="Ver carta del restaurante"
 * />
 */

import React from "react";

export interface ActionButtonProps {
  /** Elemento SVG del icono a mostrar */
  icon: React.ReactNode;
  /** Texto que aparece debajo del botón */
  label: string;
  /** Función a ejecutar al hacer click */
  onClick: () => void;
  /** Descripción accesible del botón (opcional, usa label por defecto) */
  ariaLabel?: string;
  /** Clases CSS adicionales */
  className?: string;
  /** Si está deshabilitado */
  disabled?: boolean;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  ariaLabel,
  className = "",
  disabled = false,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className={`
        flex flex-col items-center gap-2 
        hover:text-accent transition-colors group 
        relative z-50 drop-shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{ color: "var(--text-inverse)" }}
    >
      <div className="w-12 h-12 bg-base/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-accent/80 transition-colors">
        <div className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current">
          {icon}
        </div>
      </div>
      <span className="eimar-body-small font-medium">
        {label}
      </span>
    </button>
  );
};

export default ActionButton;