/**
 * UTILIDADES DEL MENÚ - EIMAR
 * ============================
 * 
 * Funciones helper para trabajar con los datos del menú.
 * Separadas de los datos para mejor organización y reutilización.
 * 
 * PRINCIPIOS:
 * - Funciones puras (sin efectos secundarios)
 * - Tipado estricto con TypeScript
 * - Documentación clara de cada función
 * - Testing friendly (fácil de testear)
 * 
 * USO:
 * import { getMenuCategory, getMenuItem } from '@/lib/menu-utils';
 */

import { MENU_DATA } from '@/data';
import type { MenuCategory, MenuItem } from '@/types';

/**
 * Obtiene una categoría del menú por su ID
 * 
 * @param categoryId - ID de la categoría a buscar
 * @returns La categoría encontrada o undefined si no existe
 * 
 * @example
 * const entrantes = getMenuCategory('entrantes');
 * if (entrantes) {
 *   console.log(entrantes.name); // "Entrantes"
 * }
 */
export const getMenuCategory = (categoryId: string): MenuCategory | undefined => {
  return MENU_DATA.find(category => category.id === categoryId);
};

/**
 * Obtiene todos los nombres de las categorías del menú
 * 
 * @returns Array con los nombres de todas las categorías
 * 
 * @example
 * const names = getMenuCategoryNames();
 * // ["Entrantes", "Ensaladas", "Bocadillos", ...]
 */
export const getMenuCategoryNames = (): string[] => {
  return MENU_DATA.map(category => category.name);
};

/**
 * Obtiene todos los IDs de las categorías del menú
 * 
 * @returns Array con los IDs de todas las categorías
 * 
 * @example
 * const ids = getMenuCategoryIds();
 * // ["entrantes", "ensaladas", "bocadillos", ...]
 */
export const getMenuCategoryIds = (): string[] => {
  return MENU_DATA.map(category => category.id);
};

/**
 * Obtiene un plato específico por categoría e ID del plato
 * 
 * @param categoryId - ID de la categoría donde buscar
 * @param itemId - ID del plato a buscar
 * @returns El plato encontrado o undefined si no existe
 * 
 * @example
 * const plato = getMenuItem('entrantes', 'aguacate-limeno');
 * if (plato) {
 *   console.log(plato.name); // "Aguacate limeño"
 * }
 */
export const getMenuItem = (categoryId: string, itemId: string): MenuItem | undefined => {
  const category = getMenuCategory(categoryId);
  return category?.items.find(item => item.id === itemId);
};

/**
 * Busca platos por nombre (búsqueda parcial, case-insensitive)
 * 
 * @param searchTerm - Término de búsqueda
 * @returns Array de platos que coinciden con la búsqueda
 * 
 * @example
 * const resultados = searchMenuItems('aguacate');
 * // Encuentra "Aguacate limeño", "Guacamole con stracciatella", etc.
 */
export const searchMenuItems = (searchTerm: string): MenuItem[] => {
  const results: MenuItem[] = [];
  const term = searchTerm.toLowerCase().trim();
  
  if (!term) return results;
  
  MENU_DATA.forEach(category => {
    category.items.forEach(item => {
      if (item.name.toLowerCase().includes(term) || 
          item.description.toLowerCase().includes(term)) {
        results.push(item);
      }
    });
  });
  
  return results;
};

/**
 * Filtra platos por características dietéticas
 * 
 * @param filters - Objeto con los filtros a aplicar
 * @returns Array de platos que cumplen todos los filtros
 * 
 * @example
 * const veganos = filterMenuItems({ isVegan: true });
 * const sinGluten = filterMenuItems({ isGlutenFree: true });
 * const vegetarianosBaratos = filterMenuItems({ 
 *   isVegetarian: true, 
 *   maxPrice: 10 
 * });
 */
export const filterMenuItems = (filters: {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
}): MenuItem[] => {
  const results: MenuItem[] = [];
  
  MENU_DATA.forEach(category => {
    // Filtrar por categoría si se especifica
    if (filters.categoryId && category.id !== filters.categoryId) {
      return;
    }
    
    category.items.forEach(item => {
      // Aplicar todos los filtros
      if (filters.isVegetarian !== undefined && item.isVegetarian !== filters.isVegetarian) return;
      if (filters.isVegan !== undefined && item.isVegan !== filters.isVegan) return;
      if (filters.isGlutenFree !== undefined && item.isGlutenFree !== filters.isGlutenFree) return;
      if (filters.isSpicy !== undefined && item.isSpicy !== filters.isSpicy) return;
      if (filters.minPrice !== undefined && item.price < filters.minPrice) return;
      if (filters.maxPrice !== undefined && item.price > filters.maxPrice) return;
      
      results.push(item);
    });
  });
  
  return results;
};

/**
 * Obtiene el rango de precios del menú completo
 * 
 * @returns Objeto con precio mínimo y máximo
 * 
 * @example
 * const rango = getMenuPriceRange();
 * console.log(`Precios desde ${rango.min}€ hasta ${rango.max}€`);
 */
export const getMenuPriceRange = (): { min: number; max: number } => {
  let min = Number.MAX_VALUE;
  let max = 0;
  
  MENU_DATA.forEach(category => {
    category.items.forEach(item => {
      if (item.price < min) min = item.price;
      if (item.price > max) max = item.price;
    });
  });
  
  return { min, max };
};

/**
 * Obtiene estadísticas del menú
 * 
 * @returns Objeto con estadísticas del menú
 * 
 * @example
 * const stats = getMenuStats();
 * console.log(`Total de platos: ${stats.totalItems}`);
 * console.log(`Platos veganos: ${stats.veganItems}`);
 */
export const getMenuStats = () => {
  let totalItems = 0;
  let vegetarianItems = 0;
  let veganItems = 0;
  let glutenFreeItems = 0;
  let spicyItems = 0;
  
  MENU_DATA.forEach(category => {
    totalItems += category.items.length;
    
    category.items.forEach(item => {
      if (item.isVegetarian) vegetarianItems++;
      if (item.isVegan) veganItems++;
      if (item.isGlutenFree) glutenFreeItems++;
      if (item.isSpicy) spicyItems++;
    });
  });
  
  return {
    totalCategories: MENU_DATA.length,
    totalItems,
    vegetarianItems,
    veganItems,
    glutenFreeItems,
    spicyItems,
    priceRange: getMenuPriceRange()
  };
};