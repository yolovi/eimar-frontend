/**
 * BUTTONS COLLECTION
 * ==================
 * Agrupación conceptual de todos los tipos de botón disponibles
 * Facilita la visión general y el mantenimiento de la familia de botones
 */

// === BOTÓN BASE ===
// El componente Button principal con todas sus variantes de estilo
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant } from "./Button";

// === BOTONES ESPECIALIZADOS ===
// Para casos de uso específicos

// Hero sections y landing pages
export { HeroButton } from "./HeroButton";
export type { HeroButtonProps, HeroButtonVariant } from "./HeroButton";

// Acciones rápidas (teléfono, WhatsApp, etc.)
export { ActionButton } from "./ActionButton";

// Cerrar modales, overlays, etc.
export { default as CloseButton } from "./CloseButton";
export type { CloseButtonProps } from "./CloseButton";

// === TIPOS COMPARTIDOS ===
// Base types que usan todos los botones para consistencia
export type {
  BaseButtonSize,
  BaseButtonProps,
  ButtonWithIconsProps,
} from "./shared";
