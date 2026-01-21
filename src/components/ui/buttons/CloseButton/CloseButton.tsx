import { cn } from "@/lib/utils";
import { SVG_NAMESPACE } from "@/constants";
import { CloseButtonProps } from "./CloseButton.types";
import { BaseButtonSize } from "../shared";

type CloseButtonSize = 'sm' | 'md' | 'lg'; // Solo los tamaños que CloseButton soporta

const CloseButton = ({
  onClick,
  className,
  size = 'md',
  position = 'absolute',
  positionClasses = 'top-4 right-4',
  ariaLabel = 'Cerrar',
  disabled = false
}: CloseButtonProps) => {
  // Validar y usar solo tamaños soportados
  const validSize: CloseButtonSize = (size === 'xl') ? 'lg' : size as CloseButtonSize;
  
  const sizeClasses: Record<CloseButtonSize, string> = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-10 h-10'
  };

  const iconSizeClasses: Record<CloseButtonSize, string> = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const baseClasses = "flex items-center justify-center rounded-full hover:bg-accent/20 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none";

  const positionClass = position === 'absolute' ? 'absolute z-10' : 'relative';

  return (
    <div className={cn(positionClass, positionClasses)}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseClasses,
          sizeClasses[validSize],
          className
        )}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <svg
          className={iconSizeClasses[validSize]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns={SVG_NAMESPACE}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CloseButton;