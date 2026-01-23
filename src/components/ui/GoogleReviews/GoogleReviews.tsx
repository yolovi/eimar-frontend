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
 * "../RatingDisplay":
 * usa RatingHeader para el header con rating promedio
 * usa SimpleHeader para headers sin rating
 * usa renderStars para renderizar estrellas individuales
 *
 * USO:
 * import GoogleReviews from '@/components/ui/GoogleReviews';
 * <GoogleReviews />
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { RatingHeader, SimpleHeader, renderStars } from "../RatingDisplay";

interface GoogleReviewsProps {
  className?: string;
}

const GoogleReviews = ({ className }: GoogleReviewsProps) => {
  const { data: reviewsData, loading, error, refetch } = useGoogleReviews();

  // Estado para alternar texto en SimpleHeader
  const [headerText, setHeaderText] = useState("Reseñas de Google");
  const [isUsingSimpleHeader, setIsUsingSimpleHeader] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Effect para alternar texto cada 3 segundos solo cuando se usa SimpleHeader
  useEffect(() => {
    if (!isUsingSimpleHeader) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Cambiar texto después del fade out
      setTimeout(() => {
        setHeaderText((prev) =>
          prev === "Reseñas de Google" ? "Ver más reseñas" : "Reseñas de Google",
        );
        // Fade in
        setIsVisible(true);
      }, 300); // Duración del fade out
    }, 3000);

    return () => clearInterval(interval);
  }, [isUsingSimpleHeader]);

  // Función para abrir Google Reviews
  const openGoogleReviews = () => {
    window.open(
      "https://www.google.com/maps/place/Restaurante+Eimar/@39.4318343,-0.4168656,17z/data=!4m6!3m5!1s0xd604e58f9e16bbf:0x7e141fefed57a1fd!8m2!3d39.431492!4d-0.4142367!16s%2Fg%2F11b7d42z5d",
      "_blank",
    );
  };

  // Mostrar loading state
  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Cargando reseñas...
          </p>
        </div>
      </div>
    );
  }

  // Si no hay datos, no renderizar nada
  if (!reviewsData) {
    return null;
  }

  const { reviews, averageRating, totalReviews, restaurantName } = reviewsData;

  return (
    <div className={cn("w-full", className)}>
      {/* Header con rating promedio */}
      {/* <RatingHeader
        averageRating={averageRating}
        totalReviews={totalReviews}
        error={error}
      /> */}

      {/* Header sin rating promedio */}
      <SimpleHeader title={`Reseñas de ${restaurantName}`} />

      {/* Subtítulo alternante y clickeable (solo para SimpleHeader) */}
      {isUsingSimpleHeader && (
        <div
          onClick={openGoogleReviews}
          className="text-center mb-6 cursor-pointer group"
        >
          <p
            className={`text-sm font-medium transition-all duration-300 ease-in-out group-hover:scale-105 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
            }`}
            style={{ color: "var(--color-text-accent)" }}
          >
            {headerText}
          </p>
        </div>
      )}

      {/* Grid de reseñas */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-lg  shadow-sm transition-shadow duration-200 hover:shadow-md"
            style={{
              backgroundColor: "var(--color-bg-primary)",
              opacity: 0.8,
            }}
          >
            {/* Header de la reseña */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-text-primary)" }}
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
                    {renderStars(review.rating, `review-${review.id}`)}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {review.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Texto de la reseña */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              "{review.text}"
            </p>
          </div>
        ))}
      </div>

      {/* Footer con enlace a Google - Solo mostrar cuando NO se use SimpleHeader */}
      {!isUsingSimpleHeader && (
        <div className="text-center mt-8">
          <button
            onClick={openGoogleReviews}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-bg-accent/10"
            style={{ color: "var(--color-text-accent)" }}
          >
            Ver más reseñas en Google
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
