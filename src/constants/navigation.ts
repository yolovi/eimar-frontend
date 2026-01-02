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
      { href: "/menu#entrantes", label: "Entrantes" },
      { href: "/menu#ensaladas", label: "Ensaladas" },
      { href: "/menu#bocadillos", label: "Bocadillos" },
      { href: "/menu#burgers", label: "Burgers" },
      { href: "/menu#carnes", label: "Carnes" },
      { href: "/menu#postres", label: "Postres" },
      { href: "/menu#bebidas", label: "Bebidas" },
      //TODO: añadir { href: "/nuestra-carta/almuerzos", label: "Almuerzos" } + Carta (subitems: entrantes, ensaladas...) + menus (fin de semana, festivos, grupos, etc.)
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
    { href: "/menu#entrantes", label: "Entrantes", isSubItem: true },
    { href: "/menu#ensaladas", label: "Ensaladas", isSubItem: true },
    { href: "/menu#bocadillos", label: "Bocadillos", isSubItem: true },
    { href: "/menu#burgers", label: "Burgers", isSubItem: true },
    { href: "/menu#carnes", label: "Carnes", isSubItem: true },
    { href: "/menu#postres", label: "Postres", isSubItem: true },
    { href: "/menu#bebidas", label: "Bebidas", isSubItem: true },
    { href: "#menu-intro", label: "Menú" },
    { href: "#reservas-y-pedidos", label: "Reservas y Pedidos" },
    { href: "#contacto", label: "Contacto" },
  ]
};