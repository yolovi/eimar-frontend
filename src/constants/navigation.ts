/**
 * NAVIGATION DATA - EIMAR
 * =======================
 * 
 * Fuente única de verdad para todos los elementos de navegación del sitio.
 * Centraliza los enlaces para evitar duplicación y facilitar mantenimiento.
 * 
 * ARQUITECTURA:
 * - types/index.ts: Definiciones de tipos (NavigationItem, NavigationData)
 * - constants/navigation.ts: Datos de navegación (este archivo)
 * 
 * USO:
 * import { NAVIGATION_DATA } from '@/constants/navigation';
 * import type { NavigationData } from '@/types';
 */

import type { NavigationData } from '@/types';

export const NAVIGATION_DATA: NavigationData = {
  // Carta principal con subitems para dropdown
  carta: {
    main: { 
      href: "/menu",
      label: "Nuestra Carta" 
    },
    subitems: [
      { href: "/menu", label: "Carta Completa" },
      { href: "/almuerzos", label: "Almuerzos" },
      { href: "/menus", label: "Menús Especiales" },
    ]
  },
  
  //  Navegación principal
  main: [
    { href: "#menu-intro", label: "Menú" },
    { href: "#reservas-y-pedidos", label: "Reservas y Pedidos" },
    { href: "#contacto", label: "Contacto" },
  ],
  
  // Todos los elementos en formato plano (para mobile)
  all: [
    { href: "/menu", label: "Nuestra Carta" },
    { href: "/menu", label: "Carta Completa", isSubItem: true },
    { href: "/almuerzos", label: "Almuerzos", isSubItem: true },
    { href: "/menus", label: "Menús Especiales", isSubItem: true },
    { href: "#menu-intro", label: "Menú" },
    { href: "#reservas-y-pedidos", label: "Reservas y Pedidos" },
    { href: "#contacto", label: "Contacto" },
  ]
};