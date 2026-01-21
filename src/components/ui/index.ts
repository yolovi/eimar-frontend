/**
 * UI components library barrel export
 * Allows: import { Button, HeroButton, ImageCarousel, ImageSlider, GoogleReviews, ReservationForm, OrderSection, ActionButton, MenuIcon, PhoneIcon, WhatsAppIcon, CloseButton } from '@/components/ui'
 */

// Shared types
export * from "./buttons/shared";

// === BUTTON FAMILY ===
// Todos los tipos de botón disponibles - también disponibles agrupados en ./buttons
export { Button } from "./buttons/Button";
export type { ButtonProps, ButtonVariant } from "./buttons/Button";
export { HeroButton } from "./buttons/HeroButton";
export type { HeroButtonProps, HeroButtonVariant } from "./buttons/HeroButton";
export { default as ActionButton } from "./buttons/ActionButton";
export type { ActionButtonProps } from "./buttons/ActionButton";
export { MenuIcon, PhoneIcon, WhatsAppIcon } from "./buttons/ActionButton";
export { default as CloseButton } from "./buttons/CloseButton";
export type { CloseButtonProps } from "./buttons/CloseButton";
export { default as ContactButton } from "./buttons/ContactButton";
// === OTHER UI COMPONENTS ===
export { default as ImageCarousel } from "./ImageCarousel";
export { default as ImageSlider } from "./ImageSlider";
export { default as GoogleReviews } from "./GoogleReviews";
export { default as ReservationForm } from "./ReservationForm";
export type { ReservationFormData, ReservationFormProps } from "./ReservationForm";
export { default as OrderSection } from "./OrderSection";
export { default as MenuImage } from "./MenuImage";
