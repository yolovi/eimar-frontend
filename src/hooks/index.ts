/**
 * HOOKS INDEX - EIMAR
 * ====================
 *
 * Barrel exports para todos los hooks personalizados del proyecto.
 * Proporciona una interfaz limpia para importar hooks desde un solo punto.
 *
 * USO:
 * import { useContact } from '@/hooks';
 */

// Simple unified contact hook
export { useContact } from "./useContact";

// Device Detection Hooks
export {
  useIsMobile,
  useBreakpoint,
  useDeviceInfo,
  isMobileDevice,
  getTailwindBreakpoint,
  getDeviceType,
} from "./useDeviceDetection";

// Google Reviews Hook
export { useGoogleReviews } from "./useGoogleReviews";
