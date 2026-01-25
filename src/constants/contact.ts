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
  formatWhatsAppNumber,
} from "@/lib/utils";

/**
 * ========================================
 * CONFIGURACIÓN BASE - SOLO CAMBIAR AQUÍ
 * ========================================
 * Estos son los ÚNICOS valores que necesitas modificar.
 * Todo lo demás se genera automáticamente.
 * TODO: revisar y actualizar estos valores según el restaurante.
 */

// 📞 TELÉFONOS BASE (solo números, sin formato)
const BASE_PHONE_PRIMARY = "672149607";
const BASE_PHONE_SECONDARY = "963123456";
const COUNTRY_CODE_DISPLAY = "+34"; // Para mostrar
const COUNTRY_CODE_NUMERIC = "34"; // Para WhatsApp

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

// 🗺️ COORDENADAS BASE (Restaurante Eimar, Paiporta)
// URL exacta: https://www.google.com/maps/place/Restaurante+Eimar/@39.4318343,-0.4168656,17z/data=!4m6!3m5!1s0xd604e58f9e16bbf:0x7e141fefed57a1fd!8m2!3d39.431492!4d-0.4142367
const BASE_COORDINATES = {
  lat: 39.431492,
  lng: -0.4142367,
};

// 💬 MENSAJES WHATSAPP BASE
const BASE_WHATSAPP_MESSAGES = {
  general: "Hola, me gustaría hacer una consulta sobre el restaurante Eimar",
  reservation:
    "Hola, me gustaría hacer una reserva en el restaurante Eimar. ¿Podrían ayudarme?",
  info: "Hola, me gustaría obtener más información sobre el restaurante Eimar.",
} as const;

// 🕐 HORARIOS BASE
const BASE_SCHEDULE = {
  monday: { open: "08:00", close: "01:00", isClosed: true },
  tuesday: { open: "08:00", close: "01:00", isClosed: false },
  wednesday: { open: "08:00", close: "01:00", isClosed: false },
  thursday: { open: "08:00", close: "01:00", isClosed: false },
  friday: { open: "08:00", close: "01:00", isClosed: false },
  saturday: { open: "08:00", close: "01:00", isClosed: false },
  sunday: { open: "08:00", close: "01:00", isClosed: false },
} as const;

// Horario de referencia (generado automáticamente)
/**
 * Genera automáticamente el resumen de horarios basándose en BASE_SCHEDULE
 * Agrupa días con horarios similares y maneja días cerrados
 */
const generateScheduleSummary = () => {
  const days = {
    monday: 'Lunes',
    tuesday: 'Martes', 
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  // Separar días abiertos y cerrados
  const openDays: Array<{ day: string; schedule: { open: string; close: string; isClosed: false } }> = [];
  const closedDays: string[] = [];

  (Object.entries(BASE_SCHEDULE) as Array<[keyof typeof BASE_SCHEDULE, typeof BASE_SCHEDULE[keyof typeof BASE_SCHEDULE]]>).forEach(([dayKey, schedule]) => {
    const dayName = days[dayKey];
    if (schedule.isClosed) {
      closedDays.push(dayName);
    } else {
      openDays.push({ day: dayName, schedule: schedule as { open: string; close: string; isClosed: false } });
    }
  });

  const summary: { label: string; hours: string; isOpen: boolean }[] = [];

  // Agrupar días abiertos por horario
  const scheduleGroups: { [key: string]: string[] } = {};
  openDays.forEach(({ day, schedule }) => {
    const timeKey = `${schedule.open}-${schedule.close}`;
    if (!scheduleGroups[timeKey]) {
      scheduleGroups[timeKey] = [];
    }
    scheduleGroups[timeKey].push(day);
  });

  // Crear etiquetas para días abiertos
  Object.entries(scheduleGroups).forEach(([timeKey, daysList]) => {
    const [open, close] = timeKey.split('-');
    let label: string;
    
    if (daysList.length === 1) {
      label = `${daysList[0]}:`;
    } else if (daysList.length === 2) {
      label = `${daysList[0]} y ${daysList[1]}:`;
    } else {
      // Para rangos consecutivos, intentar simplificar
      const dayOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      const sortedDays = daysList.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
      
      // Verificar si es un rango consecutivo
      let isConsecutive = true;
      for (let i = 1; i < sortedDays.length; i++) {
        const currentIndex = dayOrder.indexOf(sortedDays[i]);
        const previousIndex = dayOrder.indexOf(sortedDays[i-1]);
        if (currentIndex !== previousIndex + 1) {
          isConsecutive = false;
          break;
        }
      }
      
      if (isConsecutive && sortedDays.length > 2) {
        label = `De ${sortedDays[0].toLowerCase()} a ${sortedDays[sortedDays.length - 1].toLowerCase()}:`;
      } else {
        label = `${sortedDays.slice(0, -1).join(', ')} y ${sortedDays[sortedDays.length - 1]}:`;
      }
    }
    
    summary.push({
      label,
      hours: `${open} - ${close}`,
      isOpen: true
    });
  });

  // Agregar días cerrados
  if (closedDays.length > 0) {
    let closedLabel: string;
    if (closedDays.length === 1) {
      closedLabel = `${closedDays[0]}:`;
    } else {
      closedLabel = `${closedDays.slice(0, -1).join(', ')} y ${closedDays[closedDays.length - 1]}:`;
    }
    
    summary.push({
      label: closedLabel,
      hours: 'Cerrado',
      isOpen: false
    });
  }

  return summary;
};

// Resumen de horarios generado automáticamente
export const SCHEDULE_SUMMARY_INFO = generateScheduleSummary();

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
  },
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
    link: createWhatsAppLink(
      formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC),
    ),
    messages: BASE_WHATSAPP_MESSAGES,
    linkWithMessage: createWhatsAppLink(
      formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC),
      BASE_WHATSAPP_MESSAGES.general,
    ),
    linkWithReservation: createWhatsAppLink(
      formatWhatsAppNumber(BASE_PHONE_PRIMARY, COUNTRY_CODE_NUMERIC),
      BASE_WHATSAPP_MESSAGES.reservation,
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
    googleMapsLink:
      "https://www.google.com/maps/place/Restaurante+Eimar/@39.4318343,-0.4168656,17z/data=!4m6!3m5!1s0xd604e58f9e16bbf:0x7e141fefed57a1fd!8m2!3d39.431492!4d-0.4142367!16s%2Fg%2F11b7d42z5d",
  },

  // 🕐 HORARIOS (referencia directa a la configuración base)
  schedule: BASE_SCHEDULE,

  // 📱 REDES SOCIALES (generadas automáticamente)
  social: {
    instagram: {
      username: BASE_SOCIAL.instagram.username,
      url: `${
        BASE_SOCIAL.instagram.baseUrl
      }/${BASE_SOCIAL.instagram.username.replace("@", "")}`,
    },
    facebook: {
      name: BASE_SOCIAL.facebook.name,
      url: `${BASE_SOCIAL.facebook.baseUrl}/${BASE_SOCIAL.facebook.slug}`,
    },
    tripadvisor: {
      url: `${BASE_SOCIAL.tripadvisor.baseUrl}/${BASE_SOCIAL.tripadvisor.slug}`,
    },
  },
} as const;

/**
 * ========================================
 * UTILIDADES ESPECÍFICAS DEL DOMINIO RESTAURANTE
 * ========================================
 * Funciones que usan las utilidades genéricas de @/lib/utils
 * pero están específicamente diseñadas para el contexto del restaurante
 * 
 * EXPORTACIONES ADICIONALES:
 * - SCHEDULE_SUMMARY_INFO: Resumen automático de horarios para UI
 */

/**
 * Formatea horarios del restaurante usando utilidades genéricas
 * @param day - Día de la semana
 * @returns Horario formateado o "Cerrado"
 * @example getFormattedSchedule('monday') → "12:00 - 16:00"
 */
export const getFormattedSchedule = (
  day: keyof typeof CONTACT_INFO.schedule,
): string => {
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
    formatted: getFormattedSchedule(today),
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
export type ScheduleInfo = (typeof CONTACT_INFO.schedule)[ScheduleDay];
