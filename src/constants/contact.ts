/**
 * CONSTANTES DE CONTACTO - EIMAR
 * ==============================
 *
 * Procesa y formatea la información de contacto del restaurante.
 * Los datos estáticos están en @/data/contact-data.ts
 * Usa utilidades de @/lib/utils para formateo consistente.
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

import {
  BASE_PHONE_PRIMARY,
  BASE_PHONE_SECONDARY,
  COUNTRY_CODE_DISPLAY,
  COUNTRY_CODE_NUMERIC,
  BASE_EMAIL_DOMAIN,
  BASE_ADDRESS,
  BASE_COORDINATES,
  BASE_WHATSAPP_MESSAGES,
  BASE_SCHEDULE,
  BASE_SOCIAL,
} from "@/data/contact-data";

/**
 * ========================================
 * GENERACIÓN AUTOMÁTICA DE HORARIOS
 * ========================================
 * Lógica para procesar los datos de horarios estáticos
 */

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

/**
 * ========================================
 * DATOS PROCESADOS AUTOMÁTICAMENTE
 * ========================================
 * ⚠️ Datos generados a partir de @/data/contact-data.ts
 * Todos estos valores se procesan automáticamente
 * usando las utilidades de formateo.
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
 * y los datos estáticos de @/data/contact-data.ts
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
