/**
 * NAVIGATION DATA - EIMAR
 * =======================
 * 
 * Fuente única de verdad para todos los elementos de navegación del sitio.
 * Centraliza los enlaces para evitar duplicación y facilitar mantenimiento.
 * 
 * ESTRUCTURA:
 * - carta: Menú principal con subitems
 * - main: Navegación principal
 * - all: Todos los elementos en formato plano para mobile
 * 
 * USO:
 * import { NAVIGATION_DATA } from '@/constants/navigation';
 */

export interface NavigationItem {
  href: string;
  label: string;
  isSubItem?: boolean;
}

export interface NavigationData {
  carta: {
    main: NavigationItem;
    subitems: NavigationItem[];
  };
  main: NavigationItem[];
  all: NavigationItem[];
}

export const NAVIGATION_DATA: NavigationData = {
  // TODO: Carta principal con subitems para dropdown - DESHABILITADO TEMPORALMENTE
  carta: {
    main: { 
      href: "#", // Deshabilitado. Cambiar # por: "/nuestra-carta" cuando esté terminada la sección
      label: "Nuestra Carta (Próximamente)" 
    },
    subitems: [
      //  TODO:  Comentado temporalmente
      // { href: "/nuestra-carta/almuerzos", label: "Almuerzos" },
      // { href: "/nuestra-carta/carta", label: "Carta" },
      // { href: "/nuestra-carta/menus", label: "Menús" },
    ]
  },
  
  //  Navegación principal
  main: [
    { href: "#reservas-y-pedidos", label: "Reservas y Pedidos" },
    { href: "#contacto", label: "Contacto" },
  ],
  
  // Todos los elementos en formato plano (para mobile)
  all: [
    // Temporalmente deshabilitados:
    // { href: "/nuestra-carta", label: "Nuestra Carta" },
    // { href: "/nuestra-carta/almuerzos", label: "Almuerzos", isSubItem: true },
    // { href: "/nuestra-carta/carta", label: "Carta", isSubItem: true },
    // { href: "/nuestra-carta/menus", label: "Menús", isSubItem: true },
    { href: "#reservas-y-pedidos", label: "Reservas y Pedidos" },
    { href: "#contacto", label: "Contacto" },
  ]
};