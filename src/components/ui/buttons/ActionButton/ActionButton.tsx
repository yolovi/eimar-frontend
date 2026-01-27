/**
 * ACTION BUTTON COMPONENT - EIMAR
 * ===============================
 *
 * Componente unificado para todas las acciones de contacto del restaurante.
 * Soporta diferentes variantes, tamaños y estilos para máxima flexibilidad.
 *
 * CARACTERÍSTICAS:
 * - Múltiples variantes: button, link, icon-only, round (circular), text-only
 * - Diferentes tamaños y estilos adaptables
 * - Integración completa con useContactActions
 * - Iconos consistentes desde lib/icons
 * - TypeScript completo
 * - Responsive automático
 *
 * USO:
 * - Botón estándar:
 * <ActionButton action="phone" variant="button" size="md" />
 * 
 * - Enlace texto:
 * <ActionButton action="whatsapp" variant="link" />
 * 
 * - Solo icono cuadrado:
 * <ActionButton action="phone" variant="icon" size="sm" />
 * 
 * - Solo icono redondo:
 * <ActionButton action="whatsapp" variant="round" size="md" style="secondary" />
 * 
 * - Redes sociales redondas:
 * <ActionButton action="instagram" variant="round" size="sm" style="minimal" />
 */

"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/lib/icons";
import { useContact } from "@/hooks";

export type ActionType = 'phone' | 'whatsapp' | 'reservation' | 'email' | 'location' | 'facebook' | 'instagram' | 'tripadvisor';
export type ActionVariant = 'button' | 'link' | 'icon' | 'round' | 'text';
export type ActionSize = 'xs' | 'sm' | 'md' | 'lg';
export type ActionStyle = 'primary' | 'secondary' | 'ghost' | 'outline' | 'minimal';

interface ActionButtonProps {
  action: ActionType;
  variant?: ActionVariant;
  size?: ActionSize;
  style?: ActionStyle;
  className?: string;
  children?: React.ReactNode;
  customText?: string;
  onClose?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

// Configuración de cada acción
const ACTION_CONFIG = {
  phone: {
    icon: Icons.phone,
    defaultText: "Llamar",
    ariaLabel: "Llamar por teléfono",
  },
  whatsapp: {
    icon: Icons.whatsapp,
    defaultText: "WhatsApp", 
    ariaLabel: "Contactar por WhatsApp",
  },
  reservation: {
    icon: Icons.phone, // Usar phone para reservas telefónicas
    defaultText: "Reservar",
    ariaLabel: "Hacer una reserva",
  },
  email: {
    icon: Icons.email,
    defaultText: "Email",
    ariaLabel: "Enviar email",
  },
  location: {
    icon: Icons.location,
    defaultText: "Ubicación",
    ariaLabel: "Ver ubicación en mapa",
  },
  facebook: {
    icon: Icons.facebook,
    defaultText: "Facebook",
    ariaLabel: "Visitar página de Facebook",
  },
  instagram: {
    icon: Icons.instagram,
    defaultText: "Instagram",
    ariaLabel: "Visitar perfil de Instagram",
  },
  tripadvisor: {
    icon: Icons.tripadvisor,
    defaultText: "TripAdvisor",
    ariaLabel: "Ver en TripAdvisor",
  }
} as const;

// Estilos base para cada variante
const VARIANT_STYLES = {
  button: "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer",
  link: "inline-flex items-center font-medium hover:opacity-80 transition-opacity duration-200 cursor-pointer",
  icon: "inline-flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer",
  round: "inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer",
  text: "inline-flex items-center font-medium transition-all duration-200 cursor-pointer"
} as const;

// Tamaños para cada variante
const SIZE_STYLES = {
  button: {
    xs: "h-8 px-3 text-sm gap-2",
    sm: "h-10 px-4 text-sm gap-2", 
    md: "h-12 px-6 text-base gap-3",
    lg: "h-14 px-8 text-lg gap-3"
  },
  link: {
    xs: "text-xs gap-1",
    sm: "text-sm gap-1.5",
    md: "text-base gap-2",
    lg: "text-lg gap-2.5"
  },
  icon: {
    xs: "w-8 h-8 p-1.5",
    sm: "w-10 h-10 p-2",
    md: "w-12 h-12 p-2.5",
    lg: "w-14 h-14 p-3"
  },
  round: {
    xs: "w-8 h-8 p-1.5",
    sm: "w-10 h-10 p-2",
    md: "w-12 h-12 p-2.5",
    lg: "w-14 h-14 p-3"
  },
  text: {
    xs: "text-xs gap-1",
    sm: "text-sm gap-1.5", 
    md: "text-base gap-2",
    lg: "text-lg gap-2.5"
  }
} as const;

// Estilos de color para cada tipo
const COLOR_STYLES = {
  primary: {
    button: "backdrop-blur-sm bg-accent text-white border-transparent hover:scale-105 hover:shadow-xl hover:border-accent hover:bg-accent/90 shadow-lg",
    link: "text-accent hover:text-accent/80",
    icon: "backdrop-blur-sm bg-accent/10 text-accent hover:bg-accent/20 hover:scale-105 border-transparent hover:shadow-xl",
    round: "backdrop-blur-sm bg-accent text-white border-transparent hover:scale-105 hover:shadow-xl shadow-lg",
    text: "text-accent hover:text-accent/80"
  },
  secondary: {
    button: "backdrop-blur-sm bg-bg-primary text-text-accent border-transparent hover:scale-105 hover:shadow-xl hover:border-accent hover:bg-bg-accent/40",
    link: "text-text-secondary hover:text-text-primary", 
    icon: "backdrop-blur-sm bg-bg-primary text-text-accent hover:bg-bg-accent/40 border-transparent hover:scale-105 hover:shadow-xl",
    round: "backdrop-blur-sm bg-white/10 text-white hover:bg-white/20 hover:scale-105 hover:shadow-xl",
    text: "text-text-secondary hover:text-text-primary"
  },
  ghost: {
    button: "bg-transparent text-text-primary hover:bg-bg-accent/20",
    link: "text-text-muted hover:text-text-primary",
    icon: "bg-transparent text-text-primary hover:bg-bg-accent/20",
    round: "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20",
    text: "text-text-muted hover:text-text-primary"
  },
  outline: {
    button: "backdrop-blur-sm bg-transparent border border-accent text-accent hover:bg-accent hover:text-white hover:scale-105 hover:shadow-xl",
    link: "text-accent hover:opacity-80",
    icon: "backdrop-blur-sm bg-transparent border border-accent text-accent hover:bg-accent hover:text-white hover:scale-105 hover:shadow-xl",
    round: "backdrop-blur-sm bg-transparent border border-white/30 text-white hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:border-white/50",
    text: "text-accent hover:text-accent/80"
  },
  minimal: {
    button: "bg-bg-primary/50 text-text-muted hover:text-text-primary hover:bg-bg-primary",
    link: "text-text-muted hover:text-text-secondary",
    icon: "text-text-muted hover:text-text-primary",
    round: "bg-white/5 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/10",
    text: "text-text-muted hover:text-text-secondary"
  }
} as const;

// Tamaños de iconos según el tamaño del componente
const ICON_SIZES = {
  xs: 14,
  sm: 16, 
  md: 20,
  lg: 24
} as const;

const ActionButton = ({
  action,
  variant = 'button',
  size = 'md',
  style = 'primary',
  className = "",
  children,
  customText,
  onClose,
  disabled = false,
  fullWidth = false
}: ActionButtonProps) => {
  const {
    callPhone,
    sendWhatsApp,
    makeReservation,
    sendEmail,
    openLocation,
    openFacebook,
    openInstagram,
    openTripAdvisor,
    isMounted
  } = useContact();

  const config = ACTION_CONFIG[action];
  
  // Validación de seguridad
  if (!config) {
    console.error(`ActionButton: acción "${action}" no válida. Acciones disponibles: ${Object.keys(ACTION_CONFIG).join(', ')}`);
    return null;
  }
  
  const IconComponent = config.icon;

  // Obtener el handler correspondiente
  const getClickHandler = () => {
    const baseHandler = () => {
      switch (action) {
        case 'phone':
          callPhone();
          break;
        case 'whatsapp':
          sendWhatsApp();
          break;
        case 'reservation':
          makeReservation();
          break;
        case 'email':
          sendEmail();
          break;
        case 'location':
          openLocation();
          break;
        case 'facebook':
          openFacebook();
          break;
        case 'instagram':
          openInstagram();
          break;
        case 'tripadvisor':
          openTripAdvisor();
          break;
        default:
          break;
      }
      onClose?.();
    };
    
    return baseHandler;
  };

  // Texto a mostrar
  const displayText = customText || children || config.defaultText;

  // Construir clases CSS
  const baseClasses = VARIANT_STYLES[variant];
  const sizeClasses = SIZE_STYLES[variant][size];
  const colorClasses = COLOR_STYLES[style][variant];
  
  const finalClasses = cn(
    "ds-action-button", // Clase base para excluir del CSS global
    baseClasses,
    sizeClasses,
    colorClasses,
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  // Solo mostrar cuando esté montado para evitar hydration mismatch
  if (!isMounted) {
    return (
      <div className={cn("ds-action-button", baseClasses, sizeClasses, "opacity-50")}>
        {variant !== 'icon' && variant !== 'round' && <span className="ds-action-text">{displayText}</span>}
      </div>
    );
  }

  const content = (
    <>
      <IconComponent size={ICON_SIZES[size]} />
      {variant !== 'icon' && variant !== 'round' && <span className="ds-action-text">{displayText}</span>}
    </>
  );

  // Para variante link, usar elemento <a> si es necesario
  if (variant === 'link' && (action === 'email' || action === 'location')) {
    const href = action === 'email' 
      ? 'mailto:info@eimar.es'
      : 'https://www.google.com/maps/place/Restaurante+Eimar';
      
    return (
      <a
        href={href}
        className={finalClasses}
        aria-label={config.ariaLabel}
        target={action === 'location' ? '_blank' : undefined}
        rel={action === 'location' ? 'noopener noreferrer' : undefined}
        onClick={onClose}
      >
        {content}
      </a>
    );
  }

  // Para el resto, usar botón
  return (
    <button
      className={finalClasses}
      onClick={getClickHandler()}
      aria-label={config.ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default ActionButton;