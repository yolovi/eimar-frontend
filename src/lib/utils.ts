import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 📚 ÍNDICE DE UTILIDADES DISPONIBLES
 * ===================================
 * Puedes encontrar una explicación ampliada en el README de lib
 * 
 * 🎨 ESTILOS & CSS:
 * • cn() - Combina clases CSS con Tailwind merge
 * 
 * 💰 FORMATEO:
 * • formatCurrency() - Formatea números como moneda EUR
 * • formatDate() - Formatea fechas en español
 * • formatTime() - Formatea horarios en formato HH:MM
 * • formatTimeRange() - Formatea rangos de horario
 * • formatPhoneDisplay() - Formatea números para mostrar ("+34 672 14 96 07")
 * • formatWhatsAppNumber() - Genera números internacionales para WhatsApp
 * 
 * 🔗 URLS & LINKS:
 * • createPhoneLink() - Genera enlaces tel: formatados
 * • createWhatsAppLink() - Genera enlaces WhatsApp con mensaje opcional
 * • createEmailLink() - Genera enlaces mailto: con asunto opcional
 * 
 * 📅 FECHAS & TIEMPO:
 * • getCurrentDay() - Obtiene el día actual como string
 * • isValidTime() - Valida formato de horario
*/

/* cn --> Class Names. Combina clsx y tailwind-merge*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Para formatear precios en el menú. Ejemplo const precio = formatCurrency(12.90); → "12,90 €" */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2, // ← Máximo 2 decimales
  }).format(amount);
}

/* Para fechas de reserva. Ejemplo: const reserva = formatDate(new Date('2025-11-15')); → "15 de noviembre de 2025"*/
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Formatea horarios en formato legible
 * @param time - Horario en formato "HH:MM" 
 * @returns Horario formateado o "Hora inválida"
 * @example formatTime("14:30") → "14:30"
 */
export function formatTime(time: string): string {
  if (!isValidTime(time)) {
    return "Hora inválida";
  }
  return time;
}

/**
 * Formatea rangos de horario
 * @param openTime - Hora de apertura "HH:MM"
 * @param closeTime - Hora de cierre "HH:MM" 
 * @param isClosed - Si está cerrado
 * @returns Rango formateado o "Cerrado"
 * @example formatTimeRange("12:00", "16:00", false) → "12:00 - 16:00"
 */
export function formatTimeRange(openTime: string, closeTime: string, isClosed: boolean = false): string {
  if (isClosed) {
    return "Cerrado";
  }
  
  const formattedOpen = formatTime(openTime);
  const formattedClose = formatTime(closeTime);
  
  if (formattedOpen === "Hora inválida" || formattedClose === "Hora inválida") {
    return "Horario inválido";
  }
  
  return `${formattedOpen} - ${formattedClose}`;
}

/**
 * Genera enlaces de teléfono formatados
 * @param number - Número con código de país (ej: "+34672149607")
 * @returns Enlace tel: válido
 * @example createPhoneLink("+34672149607") → "tel:+34672149607"
 */
export function createPhoneLink(number: string): string {
  // Limpiar número de espacios y guiones
  const cleanNumber = number.replace(/[\s-]/g, '');
  return `tel:${cleanNumber}`;
}

/**
 * Genera enlaces de WhatsApp con mensaje opcional
 * @param number - Número internacional sin + (ej: "34672149607")
 * @param message - Mensaje predeterminado (opcional)
 * @returns Enlace WhatsApp completo
 * @example createWhatsAppLink("34672149607", "Hola") → "https://wa.me/34672149607?text=Hola"
 */
export function createWhatsAppLink(number: string, message?: string): string {
  const baseUrl = `https://wa.me/${number}`;
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  
  return baseUrl;
}

/**
 * Genera enlaces de email con asunto opcional
 * @param email - Dirección de email
 * @param subject - Asunto del email (opcional)
 * @returns Enlace mailto: completo
 * @example createEmailLink("info@example.com", "Consulta") → "mailto:info@example.com?subject=Consulta"
 */
export function createEmailLink(email: string, subject?: string): string {
  const baseUrl = `mailto:${email}`;
  
  if (subject) {
    const encodedSubject = encodeURIComponent(subject);
    return `${baseUrl}?subject=${encodedSubject}`;
  }
  
  return baseUrl;
}

/**
 * Obtiene el día actual como string
 * @returns Día de la semana en inglés
 * @example getCurrentDay() → "monday"
 */
export function getCurrentDay(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  return days[today];
}

/**
 * Formatea número de teléfono para display
 * @param number - Número sin formato (ej: "672149607")
 * @param countryCode - Código de país (default: "+34")
 * @returns Número formateado para mostrar
 * @example formatPhoneDisplay("672149607") → "+34 672 14 96 07"
 */
export function formatPhoneDisplay(number: string, countryCode: string = "+34"): string {
  // Limpiar número de cualquier formato previo
  const cleanNumber = number.replace(/[\s\-\+]/g, '');
  
  // Formatear según longitud española típica (9 dígitos)
  if (cleanNumber.length === 9) {
    return `${countryCode} ${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 5)} ${cleanNumber.slice(5, 7)} ${cleanNumber.slice(7, 9)}`;
  }
  
  // Para números de 6 dígitos (números cortos)
  if (cleanNumber.length === 6) {
    return `${countryCode} ${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 6)}`;
  }
  
  // Fallback: devolver con código de país
  return `${countryCode} ${cleanNumber}`;
}

/**
 * Genera número internacional para WhatsApp
 * @param number - Número sin formato (ej: "672149607") 
 * @param countryCode - Código numérico de país (default: "34")
 * @returns Número internacional sin + para WhatsApp
 * @example formatWhatsAppNumber("672149607") → "34672149607"
 */
export function formatWhatsAppNumber(number: string, countryCode: string = "34"): string {
  const cleanNumber = number.replace(/[\s\-\+]/g, '');
  return `${countryCode}${cleanNumber}`;
}

/**
 * Valida formato de horario HH:MM
 * @param time - Horario a validar
 * @returns true si es válido
 * @example isValidTime("14:30") → true
 */
export function isValidTime(time: string): boolean {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
========================================
📝 PLANTILLA PARA NUEVAS UTILIDADES
========================================
Al añadir nuevas funciones:
1. Actualiza el índice arriba ⬆️
2. Añade documentación con ejemplos en README
3. Usa esta plantilla:

 * Descripción breve de qué hace
 * @param param1 - Descripción del parámetro
 * @returns - Qué devuelve
 * @example
 * nombreFuncion('ejemplo') // → "resultado"

export function nombreFuncion(param1: tipo): tipoRetorno {
  // implementación
}

Esta plantilla debe ir siempre al final (añade las nuevas funciones por encima)
*/

