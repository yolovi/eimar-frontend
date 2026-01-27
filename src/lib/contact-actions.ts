/**
 * CONTACT ACTIONS UTILITIES - EIMAR
 * ==================================
 *
 * Utilidades centralizadas para acciones de contacto (llamadas, WhatsApp, etc.)
 * Siguiendo principios SOLID y DRY para evitar código repetido.
 *
 * CARACTERÍSTICAS:
 * - Detección automática de dispositivo (móvil/desktop)
 * - Comportamiento adaptativo según plataforma
 * - URLs predefinidas y validadas
 * - Integración con constantes centralizadas
 * - Funciones puras y testeable
 * - TypeScript para seguridad de tipos
 *
 * USO:
 * import { openPhoneAction, openWhatsApp, openReservation } from '@/lib/contact-actions';
 * openPhoneAction(); // Se adapta automáticamente al dispositivo
 * openWhatsApp(customMessage);
 * openReservation(formData);
 */

import { CONTACT_INFO } from "@/constants/contact";
import { createWhatsAppLink } from "./utils";

// Tipo para datos de reserva
export interface ReservationData {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  people?: string;
}

// Tipo para detectar dispositivo
export interface DeviceInfo {
  isMobile: boolean;
  isTablet?: boolean;
  userAgent?: string;
}

/**
 ** getDeviceInfo:
 * Detecta información del dispositivo de forma segura
 * @returns Información del dispositivo o valores por defecto si no está disponible
 */
export function getDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return { isMobile: false };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    window.innerWidth < 768 ||
    /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isTablet =
    /ipad|tablet|kindle/.test(userAgent) && window.innerWidth >= 768;

  return {
    isMobile,
    isTablet,
    userAgent,
  };
}

/**
 ** openPhoneAction:
 * Abre acción de teléfono adaptativa según dispositivo
 * - Móvil: Abre marcador telefónico
 * - Desktop: Abre WhatsApp con mensaje informativo
 *
 * @param customMessage - Mensaje personalizado para WhatsApp (opcional)
 * @param forcePhone - Forzar llamada telefónica independientemente del dispositivo
 */
export function openPhoneAction(
  customMessage?: string,
  forcePhone: boolean = false,
): void {
  const { isMobile } = getDeviceInfo();

  if (isMobile || forcePhone) {
    // En móvil o si se fuerza: abrir marcador telefónico
    window.open(CONTACT_INFO.phone.primary.link, "_self");
  } else {
    // En desktop: abrir WhatsApp con mensaje
    const message = customMessage || CONTACT_INFO.whatsapp.messages.info;
    const whatsappUrl = createWhatsAppLink(
      CONTACT_INFO.whatsapp.number,
      message,
    );
    window.open(whatsappUrl, "_blank");
  }
}

/**
 ** openWhatsApp:
 * Abre WhatsApp con mensaje personalizado
 *
 * @param message - Mensaje para enviar (opcional, usa mensaje general por defecto)
 * @param openInNewTab - Abrir en nueva pestaña (default: true)
 */
export function openWhatsApp(
  message?: string,
  openInNewTab: boolean = true,
): void {
  const finalMessage = message || CONTACT_INFO.whatsapp.messages.general;
  const whatsappUrl = createWhatsAppLink(
    CONTACT_INFO.whatsapp.number,
    finalMessage,
  );
  const target = openInNewTab ? "_blank" : "_self";

  window.open(whatsappUrl, target);
}

/**
 ** openWhatsAppReservation:
 * Abre WhatsApp con mensaje de reserva
 *
 * @param reservationData - Datos de la reserva (opcional)
 * @param customMessage - Mensaje personalizado que sobrescribe los datos (opcional)
 */
export function openWhatsAppReservation(
  reservationData?: ReservationData,
  customMessage?: string,
): void {
  let message: string;

  if (customMessage) {
    message = customMessage;
  } else if (reservationData) {
    message = formatReservationMessage(reservationData);
  } else {
    message = CONTACT_INFO.whatsapp.messages.reservation;
  }

  openWhatsApp(message);
}

/**
 ** formatReservationMessage:
 * Formatea datos de reserva en mensaje de WhatsApp
 *
 * @param data - Datos de la reserva
 * @returns Mensaje formateado para WhatsApp
 */
export function formatReservationMessage(data: ReservationData): string {
  const header = "Hola! Me gustaría hacer una reserva:";
  const footer = "\n¡Gracias!";

  const details = [
    data.name && `- Nombre: ${data.name}`,
    data.phone && `- Teléfono: ${data.phone}`,
    data.date && `- Fecha: ${data.date}`,
    data.time && `- Hora: ${data.time}`,
    data.people && `- Personas: ${data.people}\n`,
  ]
    .filter(Boolean)
    .join("\n");

  return details
    ? `${header}\n\n${details}${footer}`
    : CONTACT_INFO.whatsapp.messages.reservation;
}

/**
 ** openDirectCall:
 * Fuerza la apertura del marcador telefónico independientemente del dispositivo
 */
export function openDirectCall(): void {
  window.open(CONTACT_INFO.phone.primary.link, "_self");
}

/**
 ** openWhatsAppQuickContact:
 * Abre WhatsApp usando el enlace directo preconfigurado para contacto rápido
 */
export function openWhatsAppQuickContact(): void {
  window.open(CONTACT_INFO.whatsapp.linkWithReservation, "_blank");
}

/**
 ** getContactActionLabel:
 * Obtiene etiqueta apropiada para acción de contacto según dispositivo
 *
 * @param actionType - Tipo de acción
 * @param deviceInfo - Información del dispositivo (opcional, se detecta automáticamente)
 * @returns Etiqueta apropiada para mostrar al usuario
 */
export function getContactActionLabel(
  actionType: "phone" | "whatsapp" | "reservation" = "phone",
  deviceInfo?: DeviceInfo,
): string {
  const device = deviceInfo || getDeviceInfo();

  const labels = {
    phone: {
      mobile: "Llamar ahora",
      desktop: "Contactar por WhatsApp",
    },
    whatsapp: {
      mobile: "WhatsApp",
      desktop: "WhatsApp",
    },
    reservation: {
      mobile: "Reservar",
      desktop: "Reservar",
    },
  };

  return labels[actionType][device.isMobile ? "mobile" : "desktop"];
}

/**
 ** getContactActionTitle:
 * Obtiene título descriptivo para acción de contacto según dispositivo
 *
 * @param actionType - Tipo de acción
 * @param deviceInfo - Información del dispositivo (opcional)
 * @returns Título descriptivo para atributo title/aria-label
 */
export function getContactActionTitle(
  actionType: "phone" | "whatsapp" | "reservation" = "phone",
  deviceInfo?: DeviceInfo,
): string {
  const device = deviceInfo || getDeviceInfo();

  const titles = {
    phone: {
      mobile: `Llamar a ${CONTACT_INFO.phone.primary.display}`,
      desktop: `Contactar por WhatsApp: ${CONTACT_INFO.whatsapp.display}`,
    },
    whatsapp: {
      mobile: `WhatsApp: ${CONTACT_INFO.whatsapp.display}`,
      desktop: `WhatsApp: ${CONTACT_INFO.whatsapp.display}`,
    },
    reservation: {
      mobile: "Hacer reserva por WhatsApp",
      desktop: "Hacer reserva por WhatsApp",
    },
  };

  return titles[actionType][device.isMobile ? "mobile" : "desktop"];
}
