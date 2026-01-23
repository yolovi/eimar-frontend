/**
 * DEVICE DETECTION HOOKS - RESPONSIVE UTILITIES  
 * ===============================================
 * 
 * Hooks personalizados para detectar tipos de dispositivo y breakpoints
 * de forma reactiva y optimizada.
 * 
 * CARACTERÍSTICAS:
 * - Reactivos: Se actualizan automáticamente al redimensionar
 * - Optimizados: Usan passive listeners para mejor performance
 * - SSR Safe: Manejan correctamente la hidratación en Next.js
 * - Configurables: Permiten personalizar breakpoints
 * - TypeScript: Tipado completo para seguridad
 * 
 * HOOKS DISPONIBLES:
 * - useIsMobile: Detección simple mobile/desktop
 * - useBreakpoint: Detección múltiple de breakpoints
 * - useDeviceInfo: Información completa del dispositivo
 */

'use client';

import { useState, useEffect } from 'react';

/* ============================================================================
 * 📱 TIPOS E INTERFACES
 * ============================================================================ */

interface BreakpointConfig {
  [key: string]: number;
}

interface BreakpointState {
  [key: string]: boolean;
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  breakpoint: string;
}

/* ============================================================================
 * 🎯 CONFIGURACIÓN Y CONSTANTES
 * ============================================================================ */

const defaultBreakpoints: BreakpointConfig = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/* ============================================================================
 * 📱 HOOK PRINCIPAL: useIsMobile
 * ============================================================================ */

/**
 * useIsMobile:
 * Hook personalizado para detectar dispositivos móviles de forma reactiva
 * @param breakpoint - Punto de quiebre en píxeles (por defecto: 768px para md)
 * @returns boolean - true si es mobile, false si es desktop/tablet
 * @example
 * const isMobile = useIsMobile(); // → true/false
 * const isTablet = useIsMobile(1024); // → true/false para lg breakpoint
 * 
 * CARACTERÍSTICAS:
 * - Reactivo: Se actualiza automáticamente al redimensionar
 * - Optimizado: Usa passive listeners para mejor performance
 * - Configurable: Permite personalizar el breakpoint
 * - SSR Safe: Maneja correctamente la hidratación en Next.js
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  // Inicializar con false para evitar problemas de hidratación en SSR
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para comprobar el tamaño de pantalla
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Comprobar inmediatamente al montar
    checkIsMobile();

    // Listener para cambios de tamaño
    window.addEventListener('resize', checkIsMobile, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

/* ============================================================================
 * 🎯 HOOK AVANZADO: useBreakpoint
 * ============================================================================ */

/**
 * useBreakpoint:
 * Hook avanzado para detectar múltiples breakpoints
 * @param breakpoints - Objeto con breakpoints nombrados
 * @returns Objeto con estados booleanos para cada breakpoint
 * @example
 * const { isXs, isSm, isMd, isLg, isXl } = useBreakpoint();
 * const { isMobile, isTablet, isDesktop } = useBreakpoint({
 *   mobile: 640,
 *   tablet: 768,
 *   desktop: 1024
 * });
 */
export function useBreakpoint(customBreakpoints?: BreakpointConfig): BreakpointState {
  const breakpoints = customBreakpoints || defaultBreakpoints;
  
  // Crear estado inicial con todas las propiedades como false
  const initialState = Object.keys(breakpoints).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as BreakpointState);

  const [breakpointState, setBreakpointState] = useState<BreakpointState>(initialState);

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      const newState: BreakpointState = {};
      
      Object.entries(breakpoints).forEach(([name, size]) => {
        newState[name] = width >= size;
      });
      
      setBreakpointState(newState);
    };

    // Comprobar inmediatamente
    checkBreakpoints();

    // Listener para cambios
    window.addEventListener('resize', checkBreakpoints, { passive: true });

    return () => {
      window.removeEventListener('resize', checkBreakpoints);
    };
  }, [breakpoints]);

  return breakpointState;
}

/* ============================================================================
 * 🔍 HOOK COMPLETO: useDeviceInfo
 * ============================================================================ */

/**
 * useDeviceInfo:
 * Hook completo con información detallada del dispositivo
 * @param mobileBreakpoint - Breakpoint para mobile (default: 768)
 * @param tabletBreakpoint - Breakpoint para tablet (default: 1024)
 * @returns Información completa del dispositivo
 * @example
 * const { isMobile, isTablet, isDesktop, width, breakpoint } = useDeviceInfo();
 */
export function useDeviceInfo(
  mobileBreakpoint: number = 768,
  tabletBreakpoint: number = 1024
): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 0,
    height: 0,
    breakpoint: 'xl',
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < mobileBreakpoint;
      const isTablet = width >= mobileBreakpoint && width < tabletBreakpoint;
      const isDesktop = width >= tabletBreakpoint;

      // Determinar breakpoint actual
      let breakpoint = 'xs';
      if (width >= 1536) breakpoint = '2xl';
      else if (width >= 1280) breakpoint = 'xl';
      else if (width >= 1024) breakpoint = 'lg';
      else if (width >= 768) breakpoint = 'md';
      else if (width >= 640) breakpoint = 'sm';

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        width,
        height,
        breakpoint,
      });
    };

    // Ejecutar inmediatamente
    updateDeviceInfo();

    // Listener para cambios
    window.addEventListener('resize', updateDeviceInfo, { passive: true });

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return deviceInfo;
}

/* ============================================================================
 * 🛠️ FUNCIONES UTILITARIAS (NO HOOKS)
 * ============================================================================ */

/**
 * isMobileDevice:
 * Función utilitaria para detectar mobile en contextos no-hook
 * @param breakpoint - Punto de quiebre personalizado
 * @returns boolean - true si es mobile
 * @example
 * if (isMobileDevice()) { 
 *   // Lógica para mobile
 * }
 * 
 * NOTA: Esta función no es reactiva, usar useIsMobile() en componentes
 */
export function isMobileDevice(breakpoint: number = 768): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoint;
}

/**
 * getTailwindBreakpoint:
 * Obtiene el breakpoint actual según las convenciones de Tailwind CSS
 * @returns string - Nombre del breakpoint actual ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 * @example
 * const currentBreakpoint = getTailwindBreakpoint(); // → 'md'
 */
export function getTailwindBreakpoint(): string {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
}

/**
 * getDeviceType:
 * Obtiene el tipo de dispositivo actual
 * @param mobileBreakpoint - Breakpoint para mobile (default: 768)
 * @param tabletBreakpoint - Breakpoint para tablet (default: 1024) 
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceType(
  mobileBreakpoint: number = 768,
  tabletBreakpoint: number = 1024
): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < mobileBreakpoint) return 'mobile';
  if (width < tabletBreakpoint) return 'tablet';
  return 'desktop';
}