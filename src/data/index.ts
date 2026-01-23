/**
 * DATA BARREL EXPORT
 * ==================
 * 
 * Re-exporta todos los datos del proyecto de forma centralizada.
 * 
 * USO:
 * import { MENU_DATA } from '@/data';
 */

// Datos del menú
export { MENU_DATA } from './menu';

// Datos de reseñas
export { SELECTED_REVIEWS, FALLBACK_REVIEWS_DATA, API_FALLBACK_REVIEWS } from './reviews';
export type { Review, ReviewsData } from './reviews';

// Re-export de tipos relacionados con datos
export type { MenuItem, MenuCategory } from '@/types';
