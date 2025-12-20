/**
 * CONSTANTES DE CONTACTO - EIMAR
 * ==============================
 * 
 * Centraliza toda la información de contacto del restaurante.
 * Usa utilidades de @/lib/utils para formateo consistente.
 * 
 * ⚠️ IMPORTANTE: Solo modifica la sección "CONFIGURACIÓN BASE"
 * Todo lo demás se genera automáticamente.
 * 
 * USO:
 * import { CONTACT_INFO } from '@/constants/contact';
 * <a href={CONTACT_INFO.phone.primary.link}>{CONTACT_INFO.phone.primary.display}</a>
 */

import { 
  createPhoneLink, 
  createWhatsAppLink, 
  formatTimeRange, 
  getCurrentDay,
  formatPhoneDisplay,
  formatWhatsAppNumber
} from '@/lib/utils';

/**
 * ========================================
 * CONFIGURACIÓN BASE - SOLO CAMBIAR AQUÍ
 * ========================================
 * Estos son los ÚNICOS valores que necesitas modificar.
 * Todo lo demás se genera automáticamente.
 */

// 📞 TELÉFONOS BASE (solo números, sin formato)
const BASE_PHONE_PRIMARY = "672149607";
const BASE_PHONE_SECONDARY = "963123456";
const COUNTRY_CODE_DISPLAY = "+34";         // Para mostrar
const COUNTRY_CODE_NUMERIC = "34";          // Para WhatsApp

// 📧 EMAILS BASE
const BASE_EMAIL_DOMAIN = "restauranteeimar.com";

// 📍 DIRECCIÓN BASE
const BASE_ADDRESS = {
  street: "Carrer Mestre Palau, 98",
  city: "Paiporta", 
  province: "Valencia",
  postalCode: "46200",
  country: "España",
};

// 🗺️ COORDENADAS BASE (Paiporta, Valencia - aproximadas)
const BASE_COORDINATES = {
  lat: 39.4263,
  lng: -0.4179,
};

// 💬 MENSAJES WHATSAPP BASE
const BASE_WHATSAPP_MESSAGES = {
  general: "Hola, me gustaría hacer una consulta sobre el restaurante Eimar",
  reservation: "Hola, me gustaría hacer una reserva en el restaurante Eimar. ¿Podrían ayudarme?",
  info: "Hola, me gustaría obtener más información sobre el restaurante Eimar.",
} as const;

// 🕐 HORARIOS BASE
const BASE_SCHEDULE = {
  monday: { open: "12:00", close: "16:00", isClosed: false },
  tuesday: { open: "12:00", close: "16:00", isClosed: false }, 
  wednesday: { open: "12:00", close: "16:00", isClosed: false },
  thursday: { open: "12:00", close: "16:00", isClosed: false },
  friday: { open: "12:00", close: "16:00", isClosed: false },
  saturday: { open: "12:00", close: "00:00", isClosed: false },
  sunday: { open: "12:00", close: "16:00", isClosed: false },
} as const;

// 📱 REDES SOCIALES BASE
const BASE_SOCIAL = {
  instagram: {
    username: "@restaurante_eimar",
    baseUrl: "https://instagram.com",
  },
  facebook: {
    name: "Restaurante Eimar Paiporta",
    baseUrl: "https://facebook.com",
    slug: "restauranteeimar",
  },
  tripadvisor: {
    slug: "restaurant-eimar-paiporta",
    baseUrl: "https://tripadvisor.com",
  }
} as const;

/**
 * ========================================
 * DATOS GENERADOS AUTOMÁTICAMENTE
 * ========================================
 * ⚠️ NO MODIFICAR ESTA SECCIÓN ⚠️
 * Todos estos valores se generan automáticamente 
 * a partir de la configuración base de arriba.
 */

export const CONTACT_INFO = {
  // 📞 TELÉFONOS (generados automáticamente)
  phone: {
    primary: {
      number: BASE_PHONE_PRIMARY,
      display: formatPhoneDisplay(BASE_PHONE_PRIMARY, COUNTRY_CODE_DISPLAY),
      link: createPhoneLink(`${COUNTRY_CODE_DISPLAY}${BASE_PHONE_PRIMARY}`),
    },
    secondary: {
      number: BASE_PHONE_SECONDARY,
      display: formatPhoneDisplay(BASE_PHONE_SECONDARY, COUNTRY_CODE_DISPLAY),
      link: createPhoneLink(`${COUNTRY_CODE_DISPLAY}${BASE_PHONE_SECONDARY}`),
    },
  },

  // 💬 WHATSAPP (generado automáticamente)
  whatsapp: {
    number: formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC),
    display: formatPhoneDisplay(BASE_PHONE_PRIMARY, COUNTRY_CODE_DISPLAY),
    link: createWhatsAppLink(formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC)),
    messages: BASE_WHATSAPP_MESSAGES,
    linkWithMessage: createWhatsAppLink(
      formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC), 
      BASE_WHATSAPP_MESSAGES.general
    ),
    linkWithReservation: createWhatsAppLink(
      formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC), 
      BASE_WHATSAPP_MESSAGES.reservation
    ),
  },

  // 📧 EMAILS (generados automáticamente)
  email: {
    main: `info@${BASE_EMAIL_DOMAIN}`,
    reservas: `reservas@${BASE_EMAIL_DOMAIN}`, 
    eventos: `eventos@${BASE_EMAIL_DOMAIN}`,
  },

  // 📍 DIRECCIÓN (generada automáticamente)
  address: {
    ...BASE_ADDRESS,
    full: `${BASE_ADDRESS.street}, ${BASE_ADDRESS.postalCode} ${BASE_ADDRESS.city}, ${BASE_ADDRESS.province}, ${BASE_ADDRESS.country}`,
  },

  // 🗺️ COORDENADAS (generadas automáticamente)
  coordinates: {
    ...BASE_COORDINATES,
    googleMapsLink: `https://maps.google.com/?q=${BASE_COORDINATES.lat},${BASE_COORDINATES.lng}`,
  },

  // 🕐 HORARIOS (referencia directa a la configuración base)
  schedule: BASE_SCHEDULE,

  // 📱 REDES SOCIALES (generadas automáticamente)
  social: {
    instagram: {
      username: BASE_SOCIAL.instagram.username,
      url: `${BASE_SOCIAL.instagram.baseUrl}/${BASE_SOCIAL.instagram.username.replace('@', '')}`,
    },
    facebook: {
      name: BASE_SOCIAL.facebook.name,
      url: `${BASE_SOCIAL.facebook.baseUrl}/${BASE_SOCIAL.facebook.slug}`,
    },
    tripadvisor: {
      url: `${BASE_SOCIAL.tripadvisor.baseUrl}/${BASE_SOCIAL.tripadvisor.slug}`,
    }
  }
} as const;

/**
 * ========================================
 * UTILIDADES ESPECÍFICAS DEL DOMINIO RESTAURANTE
 * ========================================
 * Funciones que usan las utilidades genéricas de @/lib/utils
 * pero están específicamente diseñadas para el contexto del restaurante
 */

/**
 * Formatea horarios del restaurante usando utilidades genéricas
 * @param day - Día de la semana 
 * @returns Horario formateado o "Cerrado"
 * @example getFormattedSchedule('monday') → "12:00 - 16:00"
 */
export const getFormattedSchedule = (day: keyof typeof CONTACT_INFO.schedule): string => {
  const schedule = CONTACT_INFO.schedule[day];
  return formatTimeRange(schedule.open, schedule.close, schedule.isClosed);
};

/**
 * Obtiene el horario de hoy usando utilidades genéricas
 * @returns Objeto con información del día actual
 */
export const getTodaySchedule = () => {
  const today = getCurrentDay() as keyof typeof CONTACT_INFO.schedule;
  
  return {
    day: today,
    schedule: CONTACT_INFO.schedule[today],
    formatted: getFormattedSchedule(today)
  };
};

/**
 * ========================================
 * TIPOS DERIVADOS DEL DOMINIO RESTAURANTE
 * ========================================
 * Tipos automáticos basados en las constantes del restaurante.
 * Se generan automáticamente y proporcionan type safety.
 */
export type ContactPhone = typeof CONTACT_INFO.phone.primary;
export type ScheduleDay = keyof typeof CONTACT_INFO.schedule;
export type SocialNetwork = keyof typeof CONTACT_INFO.social;
export type ScheduleInfo = typeof CONTACT_INFO.schedule[ScheduleDay];