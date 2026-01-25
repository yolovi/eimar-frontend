/**
 * DATOS DE HEADERS DE PÁGINAS - EIMAR
 * ===================================
 *
 * Centraliza la información de headers para las diferentes páginas.
 * Cada página tiene su título y descripción específica.
 */

export interface PageHeaderData {
  title: string;
  description: string;
}

export const PAGE_HEADERS: Record<string, PageHeaderData> = {
  menu: {
    title: "Nuestra Carta",
    description: "Descubre nuestra selección de platos elaborados con ingredientes frescos y de temporada. Cada plato está cuidadosamente preparado para ofrecerte una experiencia gastronómica única."
  },
  almuerzos: {
    title: "Desayunos y Almuerzos",
    description: "Empieza tu día con energía. Desayunos tradicionales desde las 8:00h y almuerzos caseros que te harán sentir como en casa. Productos frescos y sabores auténticos de toda la vida."
  },
  menus: {
    title: "Menús Especiales",
    description: "Menús completos diseñados para cada ocasión. Desde nuestro menú del día hasta propuestas para grupos y celebraciones. Calidad, variedad y el mejor precio garantizado."
  }
} as const;

export type PageHeaderType = keyof typeof PAGE_HEADERS;