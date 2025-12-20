/**
 * GOOGLE REVIEWS COMPONENT - EIMAR
 * =================================
 * 
 * Componente para mostrar reseñas de Google Maps del restaurante.
 * Incluye rating con estrellas y diseño responsive.
 * 
 * CARACTERÍSTICAS:
 * - Diseño responsive con grid adaptativo
 * - Estrellas visuales para rating
 * - Formato de fecha legible
 * - Sistema de variables CSS EIMAR
 * - Placeholders para datos reales
 * 
 * USO:
 * import GoogleReviews from '@/components/ui/GoogleReviews';
 * <GoogleReviews />
 */

"use client";

import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

interface GoogleReviewsProps {
  className?: string;
}

// TODO: Mock data - En producción esto vendría de la API de Google Places
const mockReviews: Review[] = [
  {
    id: "1",
    author: "María González",
    rating: 5,
    text: "Excelente restaurante en Paiporta. La comida es deliciosa y el servicio muy atento. Recomiendo especialmente la paella, está espectacular. El ambiente es muy acogedor y familiar.",
    date: "Hace 2 semanas",
    verified: true,
  },
  {
    id: "2",
    author: "Carlos Ruiz",
    rating: 5,
    text: "Una experiencia gastronómica increíble. Los platos están elaborados con mucho cariño y se nota la calidad de los ingredientes. El personal es muy profesional y amable.",
    date: "Hace 1 mes",
    verified: true,
  },
  {
    id: "3",
    author: "Ana Martínez",
    rating: 4,
    text: "Muy buen restaurante local. Hemos ido en familia y todos hemos quedado muy contentos. Las raciones son generosas y los precios muy justos. Volveremos seguro.",
    date: "Hace 3 semanas",
    verified: true,
  },
  {
    id: "4",
    author: "Jorge López",
    rating: 5,
    text: "Descubrimos este restaurante por casualidad y fue todo un acierto. La atención al cliente es excepcional y la comida está buenísima. Totalmente recomendado.",
    date: "Hace 1 semana",
    verified: true,
  },
];

const GoogleReviews = ({ className }: GoogleReviewsProps) => {
  // Calcular rating promedio
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
  
  // Función para renderizar estrellas
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < Math.floor(rating);
      const isHalf = index < rating && index >= Math.floor(rating);
      
      return (
        <svg
          key={index}
          className="w-4 h-4"
          style={{ 
            color: isFilled || isHalf ? "#fbbf24" : "#e5e7eb" // yellow-400 : gray-200
          }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {isHalf ? (
            <defs>
              <linearGradient id={`half-${rating}-${index}`}>
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
          ) : null}
          <path
            fillRule="evenodd"
            d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
            fill={isHalf ? `url(#half-${rating}-${index})` : "currentColor"}
          />
        </svg>
      );
    });
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header con rating promedio */}
      <div className="text-center mb-8">
        <h3 
          className="text-2xl md:text-3xl font-display font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          RESEÑAS DE CLIENTES
        </h3>
        
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            {renderStars(averageRating)}
          </div>
          <span 
            className="text-2xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {averageRating.toFixed(1)}
          </span>
        </div>
        
        <p 
          className="text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Basado en {mockReviews.length} reseñas de Google
        </p>
      </div>

      {/* Grid de reseñas */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-lg border shadow-sm transition-shadow duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--eimar-gray-light)"
            }}
          >
            {/* Header de la reseña */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 
                    className="font-semibold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {review.author}
                  </h4>
                  {review.verified && (
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <span 
                    className="text-xs"
                    style={{ color: "var(--text-light)" }}
                  >
                    {review.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Texto de la reseña */}
            <p 
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              "{review.text}"
            </p>
          </div>
        ))}
      </div>

      {/* Footer con enlace a Google */}
      <div className="text-center mt-8">
        <button
          onClick={() => {
            // TODO: revisar que --> En producción, esto abriría el perfil de Google del restaurante
            window.open("https://maps.google.com/?q=Restaurante+Eimar+Paiporta", "_blank");
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-accent/10"
          style={{ color: "var(--color-accent)" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.407-5.957 1.407-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.745.096.118.11.219.082.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
          </svg>
          Ver más reseñas en Google
        </button>
      </div>
    </div>
  );
};

export default GoogleReviews;