/**
 * REVIEWS DATA - EIMAR
 * ====================
 * 
 * Datos centralizados de reseñas del restaurante Eimar.
 * Contiene reseñas reales seleccionadas manualmente de Google Maps.
 */

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date?: string;
  verified: boolean;
  language?: string;
}

export interface ReviewsData {
  restaurantName: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  lastUpdated: string;
}

/**
 * Reseñas seleccionadas manualmente de Google Maps
 * Estas son reseñas reales verificadas del restaurante Eimar
 */
export const SELECTED_REVIEWS: Review[] = [
  {
    id: "selected-1",
    author: "Ivona Encheva Ivanova",
    rating: 5,
    text: "Trato genial desde siempre. Después de la Dana han renovado todo el establecimiento y la carta y está precioso, un sitio acogedor y el trato familiar. Toda la comida es de calidad y ponen cariño en cada plato. Volvemos siempre que podemos.",
    verified: true,
  },
  {
    id: "selected-2",
    author: "Kitres",
    rating: 5,
    text: "Servicio muy atento y agradable, te sientes como en casa. Estuvimos para almorzar, y es totalmente recomendable. Excelente relación calidad/precios.",
    verified: true,
  },
  {
    id: "selected-3",
    author: "Mireia pm", 
    rating: 5,
    text: "La comida está muy muy buena, ha sido un descubrimiento, el servicio muy rápido a pesar de que estaba lleno no tardaron en servirnos. Los camareros son muy simpáticos y atentos. Muy buena relación calidad precio. Muy recomendable.",
    verified: true,
  },
  {
    id: "selected-4",
    author: "Agustin Rabadan",
    rating: 5, 
    text: "Este restaurante familiar es de lo mejor que hay en paiporta, el dueño Alex un crack y la camarera Aylu un amor, comida riquísima, buenos precios y trato impecable. 100% recomendable.",
    verified: true,
  },
];

/**
 * Datos de fallback con fechas para uso en GoogleReviews hook
 */
export const FALLBACK_REVIEWS_DATA: ReviewsData = {
  restaurantName: "Restaurante Eimar",
  averageRating: 5.0,
  totalReviews: 127,
  reviews: [
    {
      id: "fallback-1",
      author: "Ivona Encheva Ivanova",
      rating: 5,
      text: "Trato genial desde siempre. Después de la Dana han renovado todo el establecimiento y la carta y está precioso, un sitio acogedor y el trato familiar. Toda la comida es de calidad y ponen cariño en cada plato. Volvemos siempre que podemos.",
      date: "Hace 2 meses",
      verified: true,
    },
    {
      id: "fallback-2", 
      author: "Kitres",
      rating: 5,
      text: "Servicio muy atento y agradable, te sientes como en casa. Estuvimos para almorzar, y es totalmente recomendable. Excelente relación calidad/precios.",
      date: "Hace 1 mes",
      verified: true,
    },
    {
      id: "fallback-3",
      author: "Mireia pm",
      rating: 5,
      text: "La comida está muy muy buena, ha sido un descubrimiento, el servicio muy rápido a pesar de que estaba lleno no tardaron en servirnos. Los camareros son muy simpáticos y atentos. Muy buena relación calidad precio. Muy recomendable.",
      date: "Hace 3 semanas", 
      verified: true,
    },
    {
      id: "fallback-4",
      author: "Agustin Rabadan",
      rating: 5,
      text: "Este restaurante familiar es de lo mejor que hay en paiporta, el dueño Alex un crack y la camarera Aylu un amor, comida riquísima, buenos precios y trato impecable. 100% recomendable.",
      date: "Hace 2 semanas",
      verified: true,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

/**
 * Datos para la API route de fallback
 */
export const API_FALLBACK_REVIEWS = {
  restaurantName: "Restaurante Eimar",
  averageRating: 5.0,
  totalReviews: 4,
  reviews: SELECTED_REVIEWS.map((review, index) => ({
    ...review,
    date: ["Hace 2 meses", "Hace 1 mes", "Hace 3 semanas", "Hace 2 semanas"][index],
    language: "es",
  })),
  lastUpdated: new Date().toISOString(),
};