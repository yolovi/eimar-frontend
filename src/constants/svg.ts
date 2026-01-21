/**
 * SVG CONSTANTS
 * =============
 * Constantes reutilizables para elementos SVG
 */

// Namespace estándar para SVG
export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// ViewBox comunes para iconos
export const ICON_VIEWBOXES = {
  square24: "0 0 24 24",
  square16: "0 0 16 16", 
  square32: "0 0 32 32",
  heroicons: "0 0 24 24", // Estándar para Heroicons
} as const;

// Atributos comunes para SVGs
export const SVG_DEFAULTS = {
  fill: "none",
  stroke: "currentColor",
  xmlns: SVG_NAMESPACE,
} as const;