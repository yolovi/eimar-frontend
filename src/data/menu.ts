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

import type { MenuCategory } from "@/types";

/**
 * Helper: Convierte nombre de archivo a nombre de plato
 *
 * @param filename - Nombre del archivo (ej: "01-patatas-bravas")
 * @returns Nombre formateado (ej: "Patatas bravas")
 */
function formatDishName(filename: string): string {
  return filename
    .replace(/^\d+-/, "") // Quitar número y guión inicial
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
    description: "El comienzo perfecto para tu experiencia gastronómica.",
    icon: "🥗",
    items: [
      {
        id: "patatas-bravas",
        name: "Patatas bravas",
        description:
          "Patatas crujientes con salsa brava picante y ali oli casero",
        price: 6.0,
        image: getImagePath("entrantes", "01-patatas-bravas"),
        isVegetarian: true,
        isGlutenFree: true,
      },
      {
        id: "oreja-cerdo",
        name: "Oreja de cerdo",
        description: "Oreja de cerdo crujiente",
        price: 8.0,
        image: getImagePath("entrantes", "02-oreja-cerdo"),
        isGlutenFree: true,
      },
      {
        id: "torrezno-soria",
        name: "Torrezno de Soria",
        description:
          "Torrezno tradicional de Soria, crujiente por fuera y jugoso por dentro",
        price: 8.0,
        image: getImagePath("entrantes", "03-torrezno-soria"),
        isGlutenFree: true,
      },
      {
        id: "calamares-romana",
        name: "Calamares a la romana",
        description:
          "Calamares frescos rebozados en harina y fritos hasta dorar",
        price: 8.0,
        image: getImagePath("entrantes", "04-calamares-romana"),
        allergens: ["gluten", "huevo", "pescado"],
      },
      {
        id: "calamarete-patagonico",
        name: "Calamarete patagónico",
        description:
          "Calamarete patagónico rebozado en harina de maíz, acompañado de salsa tártara",
        price: 8.0,
        image: getImagePath("entrantes", "05-calamarete-patagonico"),
        allergens: ["gluten", "huevo", "pescado"],
      },
      {
        id: "sepionet",
        name: "Sepionet",
        description: "Sepionet fresco a la plancha con alioli de ajo negro",
        price: 13.5,
        image: getImagePath("entrantes", "06-sepionet"),
        isGlutenFree: true,
        allergens: ["pescado"],
      },
      {
        id: "huevas-sepia",
        name: "Huevas de sepia",
        description:
          "Huevas de sepia frescas a la plancha con un toque de sal marina",
        price: 12.0,
        image: getImagePath("entrantes", "07-huevas-sepia"),
        isGlutenFree: true,
        allergens: ["pescado"],
      },
      {
        id: "ensaladilla",
        name: "Ensaladilla",
        description: "Clásica ensaladilla rusa con mayonesa casera y atún",
        price: 7.0,
        image: getImagePath("entrantes", "08-ensaladilla"),
        allergens: ["huevo", "pescado"],
      },
      {
        id: "queso-frito",
        name: "Queso frito",
        description:
          "Queso manchego empanado y frito, servido con mermelada de tomate",
        price: 7.0,
        image: getImagePath("entrantes", "09-queso-frito"),
        isVegetarian: true,
        allergens: ["gluten", "leche", "huevo"],
      },
      {
        id: "croquetas-jamon",
        name: "Croquetas de jamón",
        description:
          "Croquetas caseras de jamón ibérico, cremosas por dentro y crujientes por fuera (2 unidades)",
        price: 4.0,
        image: getImagePath("entrantes", "10-croquetas-jamon"),
        allergens: ["gluten", "leche", "huevo"],
      },
      {
        id: "croquetas-boletus",
        name: "Croquetas de boletus y roquefort",
        description:
          "Croquetas caseras de boletus y roquefort, sabor intenso y textura cremosa (2 unidades)",
        price: 4.0,
        image: getImagePath("entrantes", "11-croquetas-boletus"),
        isVegetarian: true,
        allergens: ["gluten", "leche", "huevo"],
      },
      {
        id: "alitas-pollo",
        name: "Alitas de pollo",
        description: "Alitas de pollo crujientes y sabrosas",
        price: 7.5,
        image: getImagePath("entrantes", "12-alitas-pollo"),
        isGlutenFree: true,
      },
      {
        id: "pinchos",
        name: "Pinchos morunos o de pollo",
        description:
          "Pinchos morunos de cerdo o de pollo, marinados y a la parrilla (2 unidades)",
        price: 6.0,
        image: getImagePath("entrantes", "13-pinchos"),
        isGlutenFree: true,
      },
    ],
  },
  {
    id: "ensaladas",
    name: "Ensaladas",
    description: "Frescura y sabor en cada bocado.",
    icon: "🥬",
    items: [
      {
        id: "ensalada-iberica",
        name: "Ensalada Ibérica",
        description:
          "Brotes verdes,rulo de cabra, jamón serrano, tomate cherry,nueces y vinagre de Módena",
        price: 9.5,
        image: getImagePath("ensaladas", "01-ensalada-iberica"),
        allergens: ["leche", "frutos secos"],
      },
      {
        id: "ensalada-burratina",
        name: "Ensalada Burratina",
        description: "Burrata, tomate valenciano, sardina ahumada y pesto",
        price: 11.5,
        image: getImagePath("ensaladas", "02-ensalada-burratina"),
        isGlutenFree: true,
        allergens: ["leche"],
      },
      {
        id: "ensalada-valenciana",
        name: "Ensalada Valenciana",
        description:
          "Brotes verdes, lechuga, tomate valenciano, huevo, atún, maíz, zanahoria encurtida y aceitunas rellenas",
        price: 8.5,
        image: getImagePath("ensaladas", "03-ensalada-valenciana"),
        isGlutenFree: true,
        allergens: ["huevo", "pescado"],
      },
    ],
  },
  {
    id: "bocadillos",
    name: "Bocadillos",
    description: "Tradición y calidad en cada bocado.",
    icon: "🥖",
    items: [
      {
        id: "chivito",
        name: "Chivito",
        description:
          "Lomo o pechuga, lechuga, tomate, queso, huevo, bacon y mayonesa",
        price: 7.5,
        image: getImagePath("bocadillos", "01-chivito"),
        allergens: ["gluten", "huevo", "leche"],
      },
      {
        id: "pepito-pueblo",
        name: "Pepito pueblo",
        description: "Lomo, pimiento, huevo y jamón.",
        price: 7.5,
        image: getImagePath("bocadillos", "02-pepito-pueblo"),
        allergens: ["gluten", "huevo"],
      },
      {
        id: "brascada",
        name: "Brascada",
        description: "Ternera o caballo, jamón y cebolla",
        price: 8.0,
        image: getImagePath("bocadillos", "03-brascada"),
        allergens: ["gluten"],
      },
      {
        id: "valenciano",
        name: "Valenciano",
        description: "Caballo, huevo y ajo tierno.",
        price: 8.5,
        image: getImagePath("bocadillos", "04-valenciano"),
        allergens: ["gluten", "huevo"],
      },
      {
        id: "roquefort",
        name: "Roquefort",
        description: "Lomo, cebolla caramelizada y salsa Roquefort",
        price: 7.5,
        image: getImagePath("bocadillos", "05-roquefort"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "eimar",
        name: "Eimar",
        description: "Pechuga de pollo, bacon, queso y tomate rayado",
        price: 7.5,
        image: getImagePath("bocadillos", "06-eimar"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "galego",
        name: "Galego",
        description: "Tortilla de queso, jamón York y tomate.",
        price: 7.5,
        image: getImagePath("bocadillos", "07-galego"),
        allergens: ["gluten", "huevo", "leche"],
      },
      {
        id: "vegetal",
        name: "Vegetal",
        description: "Lechuga, tomate, huevo duro, atún y mayonesa",
        price: 7.0,
        image: getImagePath("bocadillos", "08-vegetal"),
        allergens: ["gluten", "huevo", "leche"],
      },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    description: "Hamburguesas gourmet con ingredientes premium.",
    icon: "🍔",
    items: [
      {
        id: "clasica",
        name: "Clásica",
        description: "Doble carne smash 100g, cheddar, bacon y cebolla",
        price: 12.0,
        image: getImagePath("burgers", "01-clasica"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "trufada",
        name: "Trufada",
        description: "Doble carne smash 100g, cheddar, bacon y salsa trufada",
        price: 12.5,
        image: getImagePath("burgers", "02-trufada"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "sweet-boom",
        name: "Sweet Boom",
        description: "Doble carne smash 100g, cheddar y mermelada de bacon",
        price: 12.5,
        image: getImagePath("burgers", "03-sweet-boom"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "emmy",
        name: "Emmy",
        description:
          "Medallón de carne madurada 200g, queso edam, cebolla caramelizada, pepinillos y mermelada de bacon",
        price: 13.5,
        image: getImagePath("burgers", "04-emmy"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "la-incompleta",
        name: "La Incompleta",
        description:
          "Medallón de carne madurada 200g, cheddar, bacon, lechuga,tomate y cebolla encurtida.",
        price: 12.5,
        image: getImagePath("burgers", "05-la-incompleta"),
        allergens: ["gluten", "leche"],
      },
      {
        id: "la-veggie",
        name: "La Veggie",
        description:
          "DBeyond burguer, bacon veggie, huevo, lechuga, tomate y guacamole",
        price: 12.5,
        image: getImagePath("burgers", "06-la-veggie"),
        allergens: ["gluten", "huevo"],
        isVegetarian: true,
      },
    ],
  },
  {
    id: "carnes",
    name: "Carnes",
    description: "Carnes selectas preparadas a la perfección.",
    icon: "🥩",
    items: [
      {
        id: "secreto-iberico",
        name: "Secreto ibérico",
        description:
          "Secreto de cerdo ibérico con guarnición a elegir entre patatas fritas o ensalada",
        price: 10.0,
        image: getImagePath("carnes", "01-secreto-iberico"),
        isGlutenFree: true,
      },
      {
        id: "entrecot-ternera",
        name: "Entrecot de ternera",
        description:
          "Entrecot a la plancha  con guarnición a elegir entre patatas fritas o ensalada",
        price: 16.0,
        image: getImagePath("carnes", "02-entrecot-ternera"),
        isGlutenFree: true,
      },
      {
        id: "contramuslo-pollo",
        name: "Contramuslo de pollo",
        description:
          "Contramuslo de pollo a la plancha con guarnición a elegir entre patatas fritas o ensalada",
        price: 10.0,
        image: getImagePath("carnes", "03-contramuslo-pollo"),
        isGlutenFree: true,
      },
    ],
  },
  {
    id: "postres",
    name: "Postres",
    description: "Dulce final para una experiencia perfecta.",
    icon: "🍰",
    items: [
      {
        id: "tarta-queso",
        name: "Tarta queso",
        description:
          "Cremosa tarta de queso con base de galleta y coulis de frutos rojos",
        price: 5.9,
        image: getImagePath("postres", "01-tarta-queso"),
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true,
      },
      {
        id: "flan-casero",
        name: "Flan casero",
        description:
          "Flan tradicional elaborado con huevos frescos y leche entera",
        price: 4.5,
        image: getImagePath("postres", "02-flan-casero"),
        allergens: ["leche", "huevo"],
        isVegetarian: true,
        isGlutenFree: true,
      },
      {
        id: "tiramisu-tradicional",
        name: "Tiramisú tradicional",
        description: "Clásico tiramisú italiano con café y mascarpone",
        price: 6.5,
        image: getImagePath("postres", "03-tiramisu-tradicional"),
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true,
      },
      {
        id: "coulant-chocolate",
        name: "Coulant chocolate",
        description:
          "Coulant de chocolate con corazón fundido y helado de vainilla",
        price: 7.2,
        image: getImagePath("postres", "04-coulant-chocolate"),
        allergens: ["gluten", "leche", "huevo"],
        isVegetarian: true,
      },
    ],
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
        price: 2.2,
        image: getImagePath("bebidas", "01-agua-mineral"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
      },
      {
        id: "refrescos-variados",
        name: "Refrescos variados",
        description: "Coca-Cola, Fanta, Sprite, Nestea",
        price: 2.8,
        image: getImagePath("bebidas", "02-refrescos-variados"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
      },
      {
        id: "cerveza-nacional",
        name: "Cerveza nacional",
        description: "Cerveza nacional o importada, caña o botellín",
        price: 2.5,
        image: getImagePath("bebidas", "03-cerveza-nacional"),
        allergens: ["gluten"],
        isVegetarian: true,
        isVegan: true,
      },
      {
        id: "vino-casa",
        name: "Vino casa",
        description: "Vino tinto, blanco o rosado de nuestra selección",
        price: 3.2,
        image: getImagePath("bebidas", "04-vino-casa"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
      },
      {
        id: "zumos-naturales",
        name: "Zumos naturales",
        description: "Zumos frescos de naranja, limón o frutos rojos",
        price: 3.8,
        image: getImagePath("bebidas", "05-zumos-naturales"),
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
      },
    ],
  },
];
