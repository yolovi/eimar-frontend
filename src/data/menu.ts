/**
 * DATOS DEL MENÚ - RESTAURANTE EIMAR
 * ==================================
 * 
 * Estructura centralizada de datos para toda la carta del restaurante.
 * Organizada por categorías con información completa de cada plato.
 * 
 * CONVENCIÓN DE ARCHIVOS:
 * - Número de orden: 01, 02, 03...
 * - Separador: guiones (-)
 * - Formato: 01-nombre-del-plato.jpg
 * - Resultado: "Nombre del plato"
 * 
 * ARQUITECTURA:
 * - types/index.ts: Definiciones de tipos (MenuItem, MenuCategory)
 * - data/menu.ts: Datos del contenido (este archivo)
 * - lib/menu-utils.ts: Funciones helper y utilidades
 * 
 * DIVISIÓN POR ARCHIVOS (recomendado cuando >500 líneas):
 * - data/menu/entrantes.ts
 * - data/menu/bocadillos.ts  
 * - data/menu/index.ts (exportación centralizada)
 * 
 * USO:
 * import { MENU_DATA } from '@/data/menu';
 * import { getMenuCategory } from '@/lib/menu-utils';
 */

import type { MenuCategory } from '@/types';

/**
 * Helper: Convierte nombre de archivo a nombre de plato
 * 
 * @param filename - Nombre del archivo (ej: "01-patatas-bravas")
 * @returns Nombre formateado (ej: "Patatas bravas")
 */
function formatDishName(filename: string): string {
  return filename
    .replace(/^\d+-/, '') // Quitar número y guión inicial
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Helper: Genera la ruta de imagen basada en categoría y nombre de archivo
 * 
 * @param category - ID de la categoría (ej: "entrantes")
 * @param filename - Nombre del archivo (ej: "01-patatas-bravas")
 * @returns Ruta completa (ej: "/images/menu/entrantes/01-patatas-bravas.jpg")
 */
function getImagePath(category: string, filename: string): string {
  return `/images/menu/${category}/${filename}.jpg`;
}

export const MENU_DATA: MenuCategory[] = [
  {
    id: "entrantes",
    name: "Entrantes",
    description: "El comienzo perfecto para tu experiencia gastronómica",
    icon: "🥗",
    items: [
      {
        id: "patatas-bravas",
        name: "Patatas bravas",
        description: "Patatas crujientes con salsa brava picante y ali oli casero",
        price: 6.50,
        image: getImagePath("entrantes", "01-patatas-bravas"),
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        id: "aguacate-limeno",
        name: "Aguacate limeño",
        description: "Aguacate fresco con toques cítricos de lima, acompañado de especias mediterráneas",
        price: 6.90,
        image: getImagePath("entrantes", "02-aguacate-limeno"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "croquetas-vacanal",
        name: "Croquetas vacanal",
        description: "Deliciosas croquetas artesanales de bechamel cremosa con un toque especial de la casa (6 uds.)",
        price: 8.50,
        image: getImagePath("entrantes", "03-croquetas-vacanal"),
        allergens: ["gluten", "leche", "huevo"]
      },
      {
        id: "pan-tomate",
        name: "Pan con tomate",
        description: "Pan artesanal recien horneado con aceite de oliva virgen extra y tomate natural",
        price: 1.90,
        image: getImagePath("entrantes", "04-pan-tomate"),
        allergens: ["gluten"],
        isVegetarian: true
      },
      {
        id: "gazpacho-andaluz",
        name: "Gazpacho andaluz",
        description: "Gazpacho andaluz tradicional con verduras frescas de temporada",
        price: 6.20,
        image: getImagePath("entrantes", "05-gazpacho-andaluz"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "hummus-ancestral",
        name: "Hummus ancestral",
        description: "Hummus cremoso con garbanzos de la sierra, tahini y especias orientales",
        price: 8.90,
        image: getImagePath("entrantes", "06-hummus-ancestral"),
        allergens: ["sésamo"],
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "burrata-tomates",
        name: "Burrata con tomates",
        description: "Burrata artesanal acompañada de tomates de temporada, albahaca y aceite de oliva",
        price: 14.50,
        image: getImagePath("entrantes", "07-burrata-tomates"),
        allergens: ["leche"],
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        id: "sandwich-coreano-pollo",
        name: "Sandwich coreano pollo",
        description: "Fusión asiática con pollo marinado en salsa coreana, vegetales crujientes y pan brioche",
        price: 8.50,
        image: getImagePath("entrantes", "08-sandwich-coreano-pollo"),
        allergens: ["gluten", "soja", "sésamo"],
        isSpicy: true
      }
    ]
  },
  {
    id: "ensaladas",
    name: "Ensaladas",
    description: "Frescura y sabor en cada bocado",
    icon: "🥬",
    items: [
      {
        id: "cesar-clasica",
        name: "César clásica",
        description: "Lechuga romana, parmesano, crutones caseros y salsa césar tradicional",
        price: 9.90,
        image: getImagePath("ensaladas", "01-cesar-clasica"),
        allergens: ["gluten", "leche", "huevo", "anchoas"]
      },
      {
        id: "mediterranea",
        name: "Mediterránea",
        description: "Mix de lechugas, tomate cherry, aceitunas, queso feta y vinagreta de hierbas",
        price: 11.50,
        image: getImagePath("ensaladas", "02-mediterranea"),
        allergens: ["leche"],
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        id: "quinoa-aguacate",
        name: "Quinoa aguacate",
        description: "Quinoa, aguacate, tomates cherry, rúcula y aderezo de lima",
        price: 10.50,
        image: getImagePath("ensaladas", "03-quinoa-aguacate"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      }
    ]
  },
  {
    id: "bocadillos",
    name: "Bocadillos",
    description: "Tradición y calidad en cada bocado",
    icon: "🥖",
    items: [
      {
        id: "chivito",
        name: "Chivito",
        description: "Lomo o pechuga, lechuga, tomate, queso, huevo, bacon y mayonesa",
        price: 7.50,
        image: getImagePath("bocadillos", "01-chivito"),
        allergens: ["gluten", "huevo", "leche"]
      },
      {
        id: "pepito-pueblo",
        name: "Pepito pueblo",
        description: "Lomo, pimiento, huevo y jamón en pan crujiente",
        price: 7.50,
        image: getImagePath("bocadillos", "02-pepito-pueblo"),
        allergens: ["gluten", "huevo"]
      },
      {
        id: "brascada",
        name: "Brascada",
        description: "Ternera o caballo, jamón y cebolla caramelizada",
        price: 8.00,
        image: getImagePath("bocadillos", "03-brascada"),
        allergens: ["gluten"]
      },
      {
        id: "valenciano",
        name: "Valenciano",
        description: "Caballo, huevo y ajo tierno en pan tradicional",
        price: 8.50,
        image: getImagePath("bocadillos", "04-valenciano"),
        allergens: ["gluten", "huevo"]
      },
      {
        id: "eimar-especial",
        name: "Eimar especial",
        description: "Lomo, cebolla caramelizada y salsa Roquefort especial de la casa",
        price: 7.50,
        image: getImagePath("bocadillos", "05-eimar-especial"),
        allergens: ["gluten", "leche"]
      },
      {
        id: "galego",
        name: "Galego",
        description: "Tortilla de queso, jamón York y tomate fresco",
        price: 7.50,
        image: getImagePath("bocadillos", "06-galego"),
        allergens: ["gluten", "huevo", "leche"]
      }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Hamburguesas gourmet con ingredientes premium",
    icon: "🍔",
    items: [
      {
        id: "classic-beef",
        name: "Classic beef",
        description: "Carne de ternera 200g, lechuga, tomate, cebolla y salsa especial",
        price: 12.90,
        image: getImagePath("burgers", "01-classic-beef"),
        allergens: ["gluten", "huevo"]
      },
      {
        id: "bbq-bacon",
        name: "BBQ bacon",
        description: "Carne de ternera, bacon crujiente, queso cheddar y salsa BBQ casera",
        price: 14.50,
        image: getImagePath("burgers", "02-bbq-bacon"),
        allergens: ["gluten", "leche", "huevo"]
      },
      {
        id: "veggie-quinoa",
        name: "Veggie quinoa",
        description: "Hamburguesa de quinoa y verduras, aguacate, rúcula y salsa de yogur",
        price: 11.90,
        image: getImagePath("burgers", "03-veggie-quinoa"),
        allergens: ["gluten", "leche"],
        isVegetarian: true
      }
    ]
  },
  {
    id: "carnes",
    name: "Carnes",
    description: "Carnes selectas preparadas a la perfección",
    icon: "🥩",
    items: [
      {
        id: "solomillo-iberico",
        name: "Solomillo ibérico",
        description: "Solomillo de cerdo ibérico con guarnición de temporada",
        price: 18.90,
        image: getImagePath("carnes", "01-solomillo-iberico"),
        isGlutenFree: true
      },
      {
        id: "entrecot-ternera",
        name: "Entrecot ternera",
        description: "Entrecot a la plancha con patatas panaderas y pimientos",
        price: 22.50,
        image: getImagePath("carnes", "02-entrecot-ternera"),
        isGlutenFree: true
      },
      {
        id: "chuleton-vaca",
        name: "Chuletón vaca",
        description: "Chuletón de vaca gallega madurada con guarnición de verduras",
        price: 28.00,
        image: getImagePath("carnes", "03-chuleton-vaca"),
        isGlutenFree: true
      }
    ]
  },
  {
    id: "postres",
    name: "Postres",
    description: "Dulce final para una experiencia perfecta",
    icon: "🍰",
    items: [
      {
        id: "tarta-queso",
        name: "Tarta queso",
        description: "Cremosa tarta de queso con base de galleta y coulis de frutos rojos",
        price: 5.90,
        image: getImagePath("postres", "01-tarta-queso"),
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true
      },
      {
        id: "flan-casero",
        name: "Flan casero",
        description: "Flan tradicional elaborado con huevos frescos y leche entera",
        price: 4.50,
        image: getImagePath("postres", "02-flan-casero"),
        allergens: ["leche", "huevo"],
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        id: "tiramisu-tradicional",
        name: "Tiramisú tradicional",
        description: "Clásico tiramisú italiano con café y mascarpone",
        price: 6.50,
        image: getImagePath("postres", "03-tiramisu-tradicional"),
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true
      },
      {
        id: "coulant-chocolate",
        name: "Coulant chocolate",
        description: "Coulant de chocolate con corazón fundido y helado de vainilla",
        price: 7.20,
        image: getImagePath("postres", "04-coulant-chocolate"),
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true
      }
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Refrescantes opciones para acompañar tu comida",
    icon: "🥤",
    items: [
      {
        id: "agua-mineral",
        name: "Agua mineral",
        description: "Agua mineral natural o con gas",
        price: 2.20,
        image: getImagePath("bebidas", "01-agua-mineral"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "refrescos-variados",
        name: "Refrescos variados",
        description: "Coca-Cola, Fanta, Sprite, Nestea",
        price: 2.80,
        image: getImagePath("bebidas", "02-refrescos-variados"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "cerveza-nacional",
        name: "Cerveza nacional",
        description: "Cerveza nacional o importada, caña o botellín",
        price: 2.50,
        image: getImagePath("bebidas", "03-cerveza-nacional"),
        allergens: ["gluten"],
        isVegetarian: true,
        isVegan: true
      },
      {
        id: "vino-casa",
        name: "Vino casa",
        description: "Vino tinto, blanco o rosado de nuestra selección",
        price: 3.20,
        image: getImagePath("bebidas", "04-vino-casa"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "zumos-naturales",
        name: "Zumos naturales",
        description: "Zumos frescos de naranja, limón o frutos rojos",
        price: 3.80,
        image: getImagePath("bebidas", "05-zumos-naturales"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      }
    ]
  }
];

