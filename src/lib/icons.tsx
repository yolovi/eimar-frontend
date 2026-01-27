/**
 * ICONOS CENTRALIZADOS - EIMAR
 * ============================
 * 
 * Archivo centralizado con todos los iconos usados en el proyecto.
 * Solo se importan y usan desde aquí para mantener consistencia.
 * 
 * USO:
 * import { Icons } from '@/lib/icons';
 * <Icons.phone size={20} />
 */

import {
  Menu,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Heart,
  Mail,
  Facebook,
  Instagram,
  Star,
  ExternalLink,
  MapPinHouse
} from "lucide-react";

// Iconos de navegación y menús
export const MenuIcon = Menu;
export const PhoneIcon = Phone;
export const MessageCircleIcon = MessageCircle; // WhatsApp

// Iconos de ubicación y contacto
export const MapPinIcon = MapPin;
export const ClockIcon = Clock;
export const HeartIcon = Heart; // Mascotas
export const MailIcon = Mail;

// Iconos de redes sociales (corregidos)
export const FacebookIcon = Facebook;
export const InstagramIcon = Instagram;
export const StarIcon = Star; // Para TripAdvisor es más apropiado
export const ExternalLinkIcon = ExternalLink;

// Iconos adicionales
export const MapPinHouseIcon = MapPinHouse; // Para dirección

// Objeto principal de iconos
export const Icons = {
  // Navegación
  menu: MenuIcon,
  
  // Contacto
  phone: PhoneIcon,
  whatsapp: MessageCircleIcon,
  email: MailIcon,
  
  // Ubicación y tiempo
  location: MapPinIcon,
  address: MapPinHouseIcon,
  clock: ClockIcon,
  
  // Emocional
  heart: HeartIcon,
  
  // Redes sociales
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tripadvisor: StarIcon, // Más apropiado que ExternalLink
  
  // Utilidad
  externalLink: ExternalLinkIcon,
} as const;

export default Icons;