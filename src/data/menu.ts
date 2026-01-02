/**
 * DATOS DEL MENÚ - RESTAURANTE EIMAR
 * ==================================
 * 
 * Estructura centralizada de datos para toda la carta del restaurante.
 * Organizada por categorías con información completa de cada plato.
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

export const MENU_DATA: MenuCategory[] = [
  {
    id: "entrantes",
    name: "Entrantes",
    description: "El comienzo perfecto para tu experiencia gastronómica",
    icon: "🥗",
    items: [
      {
        id: "aguacate-limeno",
        name: "Aguacate limeño",
        description: "Aguacate fresco con toques cítricos de lima, acompañado de especias mediterráneas",
        price: 6.90,
        image: "/images/menu/entrantes/aguacate-limeno.jpg",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "vacanal-unidad",
        name: "Vacanal (Unidad)",
        description: "Deliciosa croqueta artesanal de bechamel cremosa con un toque especial de la casa",
        price: 3.20,
        image: "/images/menu/entrantes/vacanal.jpg",
        allergens: ["gluten", "leche", "huevo"]
      },
      {
        id: "pan-origen",
        name: "Pan de origen",
        description: "Pan artesanal recién horneado con aceite de oliva virgen extra y tomate natural",
        price: 1.90,
        image: "/images/menu/entrantes/pan-origen.jpg",
        allergens: ["gluten"]
      },
      {
        id: "begin-salad",
        name: "Begin Salad",
        description: "Ensalada fresca de temporada con mix de lechugas, tomate cherry y vinagreta casera",
        price: 7.90,
        image: "/images/menu/entrantes/begin-salad.jpg",
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        id: "sandwich-coreano",
        name: "Sandwich coreano de pollo",
        description: "Fusión asiática con pollo marinado en salsa coreana, vegetales crujientes y pan brioche",
        price: 8.50,
        image: "/images/menu/entrantes/sandwich-coreano.jpg",
        allergens: ["gluten", "soja", "sésamo"],
        isSpicy: true
      },
      {
        id: "berenjena-asada",
        name: "Berenjena asada al miso",
        description: "Berenjena asada con glaseado de miso, sésamo y cebolleta fresca",
        price: 7.50,
        image: "/images/menu/entrantes/berenjena-miso.jpg",
        allergens: ["soja", "sésamo"],
        isVegetarian: true,
        isVegan: true
      },
      {
        id: "gazpacho",
        name: "Gazpacho",
        description: "Gazpacho andaluz tradicional con verduras frescas de temporada",
        price: 6.20,
        image: "/images/menu/entrantes/gazpacho.jpg",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "hummus-ancestral",
        name: "Hummus ancestral",
        description: "Hummus cremoso con garbanzos de la sierra, tahini y especias orientales",
        price: 8.90,
        image: "/images/menu/entrantes/hummus.jpg",
        allergens: ["sésamo"],
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "guacamole-stracciatella",
        name: "Guacamole con stracciatella de Puglia",
        description: "Guacamole fresco con cremosa stracciatella italiana y tostadas artesanales",
        price: 12.90,
        image: "/images/menu/entrantes/guacamole-stracciatella.jpg",
        allergens: ["gluten", "leche"],
        isVegetarian: true
      },
      {
        id: "burrata-tomates",
        name: "Burrata con tomates frescos",
        description: "Burrata artesanal acompañada de tomates de temporada, albahaca y aceite de oliva",
        price: 14.50,
        image: "/images/menu/entrantes/burrata-tomates.jpg",
        allergens: ["leche"],
        isVegetarian: true,
        isGlutenFree: true
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
        name: "César Clásica",
        description: "Lechuga romana, parmesano, crutones caseros y salsa césar tradicional",
        price: 9.90,
        image: "/images/menu/ensaladas/cesar.jpg",
        allergens: ["gluten", "leche", "huevo", "anchoas"]
      },
      {
        id: "mediterranea",
        name: "Mediterránea",
        description: "Mix de lechugas, tomate cherry, aceitunas, queso feta y vinagreta de hierbas",
        price: 11.50,
        image: "/images/menu/ensaladas/mediterranea.jpg",
        allergens: ["leche"],
        isVegetarian: true,
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
        image: "/images/menu/bocadillos/chivito.jpg",
        allergens: ["gluten", "huevo", "leche"]
      },
      {
        id: "pepito-pueblo",
        name: "Pepito de pueblo",
        description: "Lomo, pimiento, huevo y jamón en pan crujiente",
        price: 7.50,
        image: "/images/menu/bocadillos/pepito.jpg",
        allergens: ["gluten", "huevo"]
      },
      {
        id: "brascada",
        name: "Brascada",
        description: "Ternera o caballo, jamón y cebolla caramelizada",
        price: 8.00,
        image: "/images/menu/bocadillos/brascada.jpg",
        allergens: ["gluten"]
      },
      {
        id: "valenciano",
        name: "Valenciano",
        description: "Caballo, huevo y ajo tierno en pan tradicional",
        price: 8.50,
        image: "/images/menu/bocadillos/valenciano.jpg",
        allergens: ["gluten", "huevo"]
      },
      {
        id: "eimar",
        name: "Eimar",
        description: "Lomo, cebolla caramelizada y salsa Roquefort especial",
        price: 7.50,
        image: "/images/menu/bocadillos/eimar.jpg",
        allergens: ["gluten", "leche"]
      },
      {
        id: "galego",
        name: "Galego",
        description: "Tortilla de queso, jamón York y tomate fresco",
        price: 7.50,
        image: "/images/menu/bocadillos/galego.jpg",
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
        name: "Classic Beef",
        description: "Carne de ternera 200g, lechuga, tomate, cebolla y salsa especial",
        price: 12.90,
        image: "/images/menu/burgers/classic.jpg",
        allergens: ["gluten", "huevo"]
      },
      {
        id: "bbq-bacon",
        name: "BBQ Bacon",
        description: "Carne de ternera, bacon crujiente, queso cheddar y salsa BBQ casera",
        price: 14.50,
        image: "/images/menu/burgers/bbq.jpg",
        allergens: ["gluten", "leche", "huevo"]
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
        name: "Solomillo Ibérico",
        description: "Solomillo de cerdo ibérico con guarnición de temporada",
        price: 18.90,
        image: "/images/menu/carnes/solomillo.jpg",
        isGlutenFree: true
      },
      {
        id: "entrecot-ternera",
        name: "Entrecot de Ternera",
        description: "Entrecot a la plancha con patatas panaderas y pimientos",
        price: 22.50,
        image: "/images/menu/carnes/entrecot.jpg",
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
        name: "Tarta de Queso",
        description: "Cremosa tarta de queso con base de galleta y coulis de frutos rojos",
        price: 5.90,
        image: "/images/menu/postres/tarta-queso.jpg",
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true
      },
      {
        id: "flan-casero",
        name: "Flan Casero",
        description: "Flan tradicional elaborado con huevos frescos y leche entera",
        price: 4.50,
        image: "/images/menu/postres/flan.jpg",
        allergens: ["leche", "huevo"],
        isVegetarian: true,
        isGlutenFree: true
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
        name: "Agua Mineral",
        description: "Agua mineral natural o con gas",
        price: 2.20,
        image: "/images/menu/bebidas/agua.jpg",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "refrescos",
        name: "Refrescos",
        description: "Coca-Cola, Fanta, Sprite, Nestea",
        price: 2.80,
        image: "/images/menu/bebidas/refrescos.jpg",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: "cerveza",
        name: "Cerveza",
        description: "Cerveza nacional o importada, caña o botellín",
        price: 2.50,
        image: "/images/menu/bebidas/cerveza.jpg",
        allergens: ["gluten"],
        isVegetarian: true,
        isVegan: true
      },
      {
        id: "vino-casa",
        name: "Vino de la Casa",
        description: "Vino tinto, blanco o rosado de nuestra selección",
        price: 3.20,
        image: "/images/menu/bebidas/vino.jpg",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      }
    ]
  }
];

