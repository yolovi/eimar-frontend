import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
========================================
📝 PLANTILLA PARA NUEVAS UTILIDADES
========================================
Al añadir nuevas funciones:
1. Actualiza el índice del README
2. Usa esta plantilla para documentar la función:

 * Descripción breve de qué hace
 * @param param1 - Descripción del parámetro
 * @returns - Qué devuelve
 * @example
 * nombreFuncion('ejemplo') // → "resultado"

export function nombreFuncion(param1: tipo): tipoRetorno {
  // implementación
}
========================================
*/

/**
 ** cn:
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
 ** formatCurrency:
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
 ** formatDate:
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
 ** formatTime:
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
 ** formatTimeRange:
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
 ** createPhoneLink:
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
 ** createWhatsAppLink:
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
 ** createEmailLink:
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
 ** getCurrentDay:
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
 ** formatPhoneDisplay:
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
 ** formatWhatsAppNumber:
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
 ** isValidTime:
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
 * 🏃‍♂️ NAVEGACIÓN & SMOOTH SCROLL - ARQUITECTURA CLEAN & SOLID
 * ============================================================================ */

// TIPOS Y INTERFACES (Single Responsibility)
interface ScrollOptions {
  duration?: number;
  offset?: number;
  easing?: 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear';
}

interface NavigationOptions extends ScrollOptions {
  onComplete?: () => void;
  isMobile?: boolean;
}

// CONSTANTES DE CONFIGURACIÓN (Open/Closed Principle)
const SCROLL_CONFIG = {
  DEFAULT_DURATION: 2000,
  DEFAULT_OFFSET: -80,
  MOBILE_OFFSET: -60,
  DESKTOP_OFFSET: -120,
  HEADER_THRESHOLD: 768, // Breakpoint para mobile/desktop
} as const;

// FUNCIONES DE EASING (Single Responsibility)
const easingFunctions = {
  'ease-in-out': (progress: number): number => 
    progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2,
  'ease-in': (progress: number): number => progress * progress * progress,
  'ease-out': (progress: number): number => 1 - Math.pow(1 - progress, 3),
  'linear': (progress: number): number => progress,
};

// UTILIDADES PRIVADAS (Dependency Inversion)
const getOptimalOffset = (customOffset?: number, isMobile?: boolean): number => {
  if (customOffset !== undefined) return customOffset;
  if (isMobile !== undefined) return isMobile ? SCROLL_CONFIG.MOBILE_OFFSET : SCROLL_CONFIG.DESKTOP_OFFSET;
  return typeof window !== 'undefined' && window.innerWidth < SCROLL_CONFIG.HEADER_THRESHOLD 
    ? SCROLL_CONFIG.MOBILE_OFFSET 
    : SCROLL_CONFIG.DESKTOP_OFFSET;
};

const findSectionElement = (sectionId: string): Element | null => {
  const cleanId = sectionId.startsWith("#") ? sectionId.substring(1) : sectionId;
  return document.querySelector(`#${cleanId}`) || 
         document.querySelector(`[id*="${cleanId}"]`) ||
         document.querySelector(`[data-section="${cleanId}"]`);
};

// FUNCIÓN PRINCIPAL DE SCROLL (Single Responsibility)
/**
 ** smoothScrollTo:
 * Función principal de scroll animado con configuración avanzada
 * @param target - Elemento del DOM o número de píxeles desde arriba
 * @param options - Configuración del scroll (duración, offset, easing)
 * @returns Promise que se resuelve cuando termina la animación
 * @example
 * Scroll básico:
 * smoothScrollTo(document.querySelector('#about'))
 * Scroll avanzado:
 * smoothScrollTo('#about', { duration: 1000, offset: -100, easing: 'ease-out' })
 */

export function smoothScrollTo(
  target: Element | number | string,
  options: ScrollOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    const {
      duration = SCROLL_CONFIG.DEFAULT_DURATION,
      offset,
      easing = 'ease-in-out'
    } = options;

    const start = window.pageYOffset;
    let targetPosition: number;

    // Determinar posición objetivo (Interface Segregation)
    if (typeof target === 'number') {
      targetPosition = target;
    } else if (typeof target === 'string') {
      const element = findSectionElement(target);
      if (!element) {
        console.warn(`Element not found: ${target}`);
        resolve();
        return;
      }
      targetPosition = element.getBoundingClientRect().top + start + getOptimalOffset(offset);
    } else {
      targetPosition = target.getBoundingClientRect().top + start + getOptimalOffset(offset);
    }

    const distance = targetPosition - start;
    let startTime: number | null = null;
    const easingFn = easingFunctions[easing];

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFn(progress);

      window.scrollTo({
        top: start + distance * easedProgress,
        left: 0,
        behavior: 'auto'
      });

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
}

// FUNCIONES DE ALTO NIVEL (Liskov Substitution Principle)
/**
 ** scrollToTop:
 * Scroll suave hacia arriba
 * @param options - Configuración opcional del scroll
 */
export function scrollToTop(options: ScrollOptions = {}): Promise<void> {
  return smoothScrollTo(0, { ...options, offset: 0 });
}

/**
 ** scrollToSection:
 * Scroll hacia una sección específica por ID
 * @param sectionId - ID de la sección (con o sin #)
 * @param options - Configuración opcional del scroll
 */
export function scrollToSection(
  sectionId: string,
  options: ScrollOptions = {}
): Promise<void> {
  return smoothScrollTo(sectionId, options);
}

/**
 **scrollToElement:
 * Scroll hacia un elemento específico del DOM
 * @param element - Elemento del DOM
 * @param options - Configuración opcional del scroll
 */
export function scrollToElement(
  element: Element,
  options: ScrollOptions = {}
): Promise<void> {
  return smoothScrollTo(element, options);
}

// FUNCIONES DE NAVEGACIÓN ESPECÍFICAS (Single Responsibility)
/**
 * navigateToHome:
 * Maneja navegación inteligente al home
 * @param pathname - Ruta actual
 * @param router - Router de Next.js
 * @param options - Opciones de scroll
 */
export function navigateToHome(
  pathname?: string,
  router?: any,
  options: ScrollOptions = {}
): void {
  if (pathname === '/') {
    // Ya estamos en home, scroll al top
    scrollToTop(options);
    // Limpiar anchor de la URL
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/');
    }
  } else {
    // Navegar a home
    if (router) {
      router.push('/');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}

/**
 * *navigateToMenu:
 * Maneja navegación a la página del menú
 * @param router - Router de Next.js
 * @example
 * const handleViewMenu = () => navigateToMenu(router);
 * Función reutilizable para navegación al menú desde cualquier componente
 */
export function navigateToMenu(router?: any): void {
  if (router) {
    router.push('/menu');
  } else if (typeof window !== 'undefined') {
    window.location.href = '/menu';
  }
}

/**
 ** handleSectionNavigation:
 * Maneja navegación inteligente a secciones con soporte cross-page
 * @param sectionId - ID de la sección objetivo
 * @param pathname - Ruta actual
 * @param router - Router de Next.js
 * @param options - Configuración de navegación
 */
export function handleSectionNavigation(
  sectionId: string,
  pathname?: string,
  router?: any,
  options: NavigationOptions = {}
): Promise<void> {
  const { onComplete, ...scrollOptions } = options;

  return new Promise((resolve) => {
    // Si estamos en otra página, navegar a home primero
    if (pathname && pathname !== '/') {
      const targetUrl = `/#${sectionId.replace('#', '')}`;
      if (router) {
        router.push(targetUrl);
      } else if (typeof window !== 'undefined') {
        window.location.href = targetUrl;
      }
      onComplete?.();
      resolve();
      return;
    }

    // Si estamos en home, hacer scroll
    scrollToSection(sectionId, scrollOptions)
      .then(() => {
        // Actualizar URL
        if (typeof window !== 'undefined') {
          const anchor = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
          window.history.replaceState(null, '', anchor);
        }
        onComplete?.();
        resolve();
      })
      .catch(() => {
        // Fallback
        if (router) {
          router.push(`/#${sectionId.replace('#', '')}`);
        }
        onComplete?.();
        resolve();
      });
  });
}

/**
 ** handleNavigationClick:
 * Handler unificado para clics de navegación (Facade Pattern)
 * @param event - Evento del click
 * @param href - URL del enlace
 * @param pathname - Ruta actual
 * @param router - Router de Next.js
 * @param options - Configuración de navegación
 */
export function handleNavigationClick(
  event: React.MouseEvent,
  href: string,
  pathname?: string,
  router?: any,
  options: NavigationOptions = {}
): void {
  // Solo manejar enlaces anchor internos
  if (!href.startsWith("#")) return;

  event.preventDefault();
  event.stopPropagation();

  const sectionId = href.substring(1);
  handleSectionNavigation(sectionId, pathname, router, options);
}

