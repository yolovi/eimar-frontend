/**
 * HOOKS INDEX - EIMAR
 * ====================
 *
 * Barrel exports para todos los hooks personalizados del proyecto.
 * Proporciona una interfaz limpia para importar hooks desde un solo punto.
 *
 * USO:
 * import { useContactActions, useSimpleContactActions } from '@/hooks';
 */

// Contact Actions Hooks
export {
  useContactActions,
  useSimpleContactActions,
  type UseContactActionsReturn,
} from "./useContactActions";