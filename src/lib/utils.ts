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
 * 🏃‍♂️ NAVEGACIÓN & SCROLL:
 * • smoothScrollTo() - Scroll animado personalizable hacia elemento o posición
 * • scrollToTop() - Scroll suave hacia arriba
 * • scrollToSection() - Scroll hacia sección por ID con offset para header
 * • handleNavigationClick() - Maneja clics de navegación con scroll suave para anchors y navegación entre páginas
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

/**
 * cn:
 * Combina clases CSS usando clsx y tailwind-merge
 * @param inputs - Clases CSS variadas
 * @returns Clases combinadas y optimizadas
 * @example
 * cn("btn", "btn-primary", { "btn-disabled": isDisabled }) → "btn btn-primary btn-disabled"
 * Usar para combinar clases condicionales en componentes
 * Evita conflictos de Tailwind y duplica clases automáticamente
 * Ejemplo: className={cn("base-classes", isActive ? "active-classes" : "inactive-classes")}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * formatCurrency:
 * Formatea números como moneda EUR en español
 * @param amount - Monto numérico
 * @returns Monto formateado como string
 * Para formatear precios en el menú.
 * Ejemplo const precio = formatCurrency(12.90); → "12,90 €"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2, // ← Máximo 2 decimales
  }).format(amount);
}

/**
 * formatDate:
 * Formatea fechas en español
 * @param date - Objeto Date
 * @returns Fecha formateada como string
 * Para fechas de reserva.
 * Ejemplo: const reserva = formatDate(new Date('2025-11-15')); → "15 de noviembre de 2025"
 */

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * formatTime:
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
 * formatTimeRange:
 * Formatea rangos de horario
 * @param openTime - Hora de apertura "HH:MM"
 * @param closeTime - Hora de cierre "HH:MM"
 * @param isClosed - Si está cerrado
 * @returns Rango formateado o "Cerrado"
 * @example formatTimeRange("12:00", "16:00", false) → "12:00 - 16:00"
 */
export function formatTimeRange(
  openTime: string,
  closeTime: string,
  isClosed: boolean = false
): string {
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
 * createPhoneLink:
 * Genera enlaces de teléfono formatados
 * @param number - Número con código de país (ej: "+34672149607")
 * @returns Enlace tel: válido
 * @example createPhoneLink("+34672149607") → "tel:+34672149607"
 */
export function createPhoneLink(number: string): string {
  // Limpiar número de espacios y guiones
  const cleanNumber = number.replace(/[\s-]/g, "");
  return `tel:${cleanNumber}`;
}

/**
 * createWhatsAppLink:
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
 * createEmailLink:
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
 * getCurrentDay:
 * Obtiene el día actual como string
 * @returns Día de la semana en inglés
 * @example getCurrentDay() → "monday"
 */
export function getCurrentDay(): string {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  return days[today];
}

/**
 * formatPhoneDisplay:
 * Formatea número de teléfono para display
 * @param number - Número sin formato (ej: "672149607")
 * @param countryCode - Código de país (default: "+34")
 * @returns Número formateado para mostrar
 * @example formatPhoneDisplay("672149607") → "+34 672 14 96 07"
 */
export function formatPhoneDisplay(
  number: string,
  countryCode: string = "+34"
): string {
  // Limpiar número de cualquier formato previo
  const cleanNumber = number.replace(/[\s\-\+]/g, "");

  // Formatear según longitud española típica (9 dígitos)
  if (cleanNumber.length === 9) {
    return `${countryCode} ${cleanNumber.slice(0, 3)} ${cleanNumber.slice(
      3,
      5
    )} ${cleanNumber.slice(5, 7)} ${cleanNumber.slice(7, 9)}`;
  }

  // Para números de 6 dígitos (números cortos)
  if (cleanNumber.length === 6) {
    return `${countryCode} ${cleanNumber.slice(0, 3)} ${cleanNumber.slice(
      3,
      6
    )}`;
  }

  // Fallback: devolver con código de país
  return `${countryCode} ${cleanNumber}`;
}

/**
 * formatWhatsAppNumber:
 * Genera número internacional para WhatsApp
 * @param number - Número sin formato (ej: "672149607")
 * @param countryCode - Código numérico de país (default: "34")
 * @returns Número internacional sin + para WhatsApp
 * @example formatWhatsAppNumber("672149607") → "34672149607"
 */
export function formatWhatsAppNumber(
  number: string,
  countryCode: string = "34"
): string {
  const cleanNumber = number.replace(/[\s\-\+]/g, "");
  return `${countryCode}${cleanNumber}`;
}

/**
 * isValidTime:
 * Valida formato de horario HH:MM
 * @param time - Horario a validar
 * @returns true si es válido
 * @example isValidTime("14:30") → true
 */
export function isValidTime(time: string): boolean {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/* ============================================================================
 * 🏃‍♂️ NAVEGACIÓN & SMOOTH SCROLL
 * ============================================================================ */

/**
 * smoothScrollTo:
 * Scroll animado personalizable hacia un elemento o posición específica
 * @param target - Elemento del DOM o número de píxeles desde arriba
 * @param duration - Duración de la animación en milisegundos (default: 2000ms)
 * @param offset - Offset adicional en píxeles (default: -80 para header)
 * @returns Promise que se resuelve cuando termina la animación
 * @example
 * Scroll hacia elemento:
 * smoothScrollTo(document.querySelector('#about'), 1500);
 * Scroll hacia posición:
 * smoothScrollTo(500, 1000);
 */
export function smoothScrollTo(
  target: Element | number,
  duration: number = 2000,
  offset: number = -80
): Promise<void> {
  return new Promise((resolve) => {
    const start = window.pageYOffset;
    const targetPosition =
      typeof target === "number"
        ? target
        : target.getBoundingClientRect().top + start + offset;

    const distance = targetPosition - start;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Función de easing cúbica mejorada para movimiento natural (funciona en ambas direcciones)
      // Ease-in-out cubic: empieza despacio, acelera en medio, termina despacio
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress // Primera mitad: acceleración cúbica
          : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Segunda mitad: deceleración cúbica

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
}

/**
 * scrollToTop:
 * Scroll suave hacia arriba (útil para logos/botones "volver arriba")
 * @param duration - Duración de la animación en milisegundos (default: 1500ms)
 * @example
 * scrollToTop(1000); // Scroll hacia arriba en 1 segundo
 */
export function scrollToTop(duration: number = 1500): Promise<void> {
  return smoothScrollTo(0, duration, 0);
}

/**
 * scrollToSection:
 * Scroll hacia una sección específica por ID con configuración optimizada
 * @param sectionId - ID de la sección (con o sin #)
 * @param duration - Duración de la animación (default: 2000ms)
 * @param fallbackDistance - Distancia de fallback si no encuentra la sección
 * @example
 * scrollToSection('about'); // Busca #about
 * scrollToSection('#contacto', 1500);
 */
export function scrollToSection(
  sectionId: string,
  duration: number = 2000,
  fallbackDistance: number = typeof window !== "undefined"
    ? window.innerHeight * 0.8
    : 600
): Promise<void> {
  const cleanId = sectionId.startsWith("#") ? sectionId : `#${sectionId}`;
  const section =
    document.querySelector(cleanId) ||
    document.querySelector(`[id*="${sectionId}"]`);

  if (section) {
    return smoothScrollTo(section, duration);
  } else {
    // Fallback: scroll relativo
    return smoothScrollTo(fallbackDistance, duration, 0);
  }
}

/**
 * handleNavigationClick:
 * Maneja clics en enlaces de navegación, aplicando scroll suave para anchors internos
 * y navegación entre páginas cuando es necesario
 * @param event - Evento del click
 * @param href - URL del enlace
 * @param onComplete - Callback opcional cuando termina el scroll
 * @param pathname - Pathname actual de la página (desde usePathname)
 * @param router - Router de Next.js (desde useRouter)
 * @example
 * handleNavigationClick(e, '#contacto', () => setMenuOpen(false), pathname, router);
 */
export function handleNavigationClick(
  event: React.MouseEvent,
  href: string,
  onComplete?: () => void,
  pathname?: string,
  router?: any
): void {
  // Solo manejar enlaces anchor internos (que empiecen con #)
  if (!href.startsWith("#")) {
    return; // Dejar que Next.js maneje la navegación normal
  }

  event.preventDefault();

  // Si estamos en una página diferente a la homepage, redirigir a la homepage con la sección
  if (pathname && pathname !== '/') {
    if (router) {
      // Usar Next.js router para navegar limpiamente
      router.push('/' + href);
      onComplete?.();
      return;
    } else {
      // Fallback si no se pasa router
      window.location.href = '/' + href;
      onComplete?.();
      return;
    }
  }

  // Si estamos en la homepage, hacer scroll usando la función que ya funciona
  const sectionId = href.substring(1);
  const section = document.querySelector(`#${sectionId}`);
  
  if (section) {
    // Usar smoothScrollTo con offset adecuado para el header
    smoothScrollTo(section, 1500, -120)
      .then(() => {
        // Actualizar URL después del scroll
        window.history.replaceState(null, '', href);
        onComplete?.();
      })
      .catch(() => {
        // Fallback usando router o window.location
        if (router) {
          router.push('/' + href);
        } else {
          window.location.href = '/' + href;
        }
        onComplete?.();
      });
  } else {
    // Fallback si no encuentra la sección
    if (router) {
      router.push('/' + href);
    } else {
      window.location.href = '/' + href;
    }
    onComplete?.();
  }
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