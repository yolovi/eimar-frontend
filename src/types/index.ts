/**
 * SISTEMA DE TIPOS - EIMAR
 * ========================
 * 
 * Centralización de todos los tipos TypeScript del proyecto.
 * Separados por funcionalidad para mejor mantenimiento.
 * 
 * types/ → Definiciones de tipos TypeScript reutilizables en todo el proyecto
 */

// ===== TIPOS DEL SISTEMA DE MENÚ =====

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  allergens?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: MenuItem[];
}

// ===== TIPOS DE NAVEGACIÓN =====

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

// ===== TIPOS DE DATOS cliente y reserva ===== 
export interface Reservation {
  id?: string  // ID opcional (se genera al guardar)
  name: string
  email: string
  phone: string
  date: Date
  time: string
  guests: number //num. comensales
  specialRequests?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  image?: string
  category: 'football' | 'birthday' | 'celebration' | 'other'
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  hours: {
    [key: string]: string
  }
}