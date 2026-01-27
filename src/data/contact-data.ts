/**
 * DATOS DE CONTACTO - EIMAR
 * =========================
 *
 * Centraliza toda la información estática del restaurante.
 * Este archivo contiene ÚNICAMENTE los datos, sin lógica.
 *
 * ⚠️ CONFIGURACIÓN CENTRAL: Solo modifica los valores aquí
 * La lógica y funciones están en @/constants/contact.ts
 *
 * ESTRUCTURA:
 * - Teléfonos y códigos de país
 * - Información de email y dominio
 * - Dirección física completa
 * - Coordenadas geográficas
 * - Mensajes predefinidos de WhatsApp
 * - Horarios de funcionamiento
 * - Redes sociales
 */

// 📞 TELÉFONOS BASE (solo números, sin formato)
export const BASE_PHONE_PRIMARY = "621046486"; /*TODO: Cambiar al número real del restaurante*/
export const BASE_PHONE_SECONDARY = "963123456"; /*TODO: Cambiar al número real del restaurante*/
export const COUNTRY_CODE_DISPLAY = "+34"; // Para mostrar
export const COUNTRY_CODE_NUMERIC = "34"; // Para WhatsApp

// 📧 EMAILS BASE
export const BASE_EMAIL_DOMAIN = "restauranteeimar.com";

// 📍 DIRECCIÓN BASE
export const BASE_ADDRESS = {
  street: "Carrer Mestre Palau, 98",
  city: "Paiporta",
  province: "Valencia",
  postalCode: "46200",
  country: "España",
} as const;

// 🗺️ COORDENADAS BASE (Restaurante Eimar, Paiporta)
// URL exacta: https://www.google.com/maps/place/Restaurante+Eimar/@39.4318343,-0.4168656,17z/data=!4m6!3m5!1s0xd604e58f9e16bbf:0x7e141fefed57a1fd!8m2!3d39.431492!4d-0.4142367
export const BASE_COORDINATES = {
  lat: 39.431492,
  lng: -0.4142367,
} as const;

// 💬 MENSAJES WHATSAPP BASE
export const BASE_WHATSAPP_MESSAGES = {
  general: "Hola, me gustaría hacer una consulta sobre el restaurante Eimar",
  reservation:
    "Hola, me gustaría hacer una reserva en el restaurante Eimar. ¿Podrían ayudarme?",
  info: "Hola, me gustaría obtener más información sobre el restaurante Eimar.",
} as const;

// 🕐 HORARIOS BASE
export const BASE_SCHEDULE = {
  monday: { open: "08:00", close: "01:00", isClosed: true },
  tuesday: { open: "08:00", close: "01:00", isClosed: false },
  wednesday: { open: "08:00", close: "01:00", isClosed: false },
  thursday: { open: "08:00", close: "01:00", isClosed: false },
  friday: { open: "08:00", close: "01:00", isClosed: false },
  saturday: { open: "08:00", close: "01:00", isClosed: false },
  sunday: { open: "08:00", close: "01:00", isClosed: false },
} as const;

// 📱 REDES SOCIALES BASE
export const BASE_SOCIAL = {
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

// 🔧 DATOS DE DESARROLLO
export const BASE_DEVELOPER = {
  name: "KOMOREBI",
  url: "https://github.com/yolovi",
  label: "Desarrollado por"
} as const;