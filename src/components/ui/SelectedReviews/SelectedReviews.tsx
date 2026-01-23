/**
 * SELECTED REVIEWS COMPONENT - EIMAR
 * ==================================
 *
 * Componente para mostrar reseñas destacadas seleccionadas manualmente.
 * Usa datos reales de Google Maps copiados manualmente para mayor control.
 *
 * CARACTERÍSTICAS:
 * - Reseñas reales verificadas manualmente
 * - Diseño responsive con grid adaptativo
 * - Estrellas individuales por reseña (sin puntuación total)
 * - Sistema de variables CSS EIMAR
 * - Datos estáticos para máximo control
 *
 * USO:
 * import SelectedReviews from '@/components/ui/SelectedReviews';
 * <SelectedReviews />
 */

"use client";

import { cn } from "@/lib/utils";
import { SimpleHeader, renderStars } from "../RatingDisplay";
import { SELECTED_REVIEWS } from "@/data/reviews";
import type { Review } from "@/data/reviews";

interface SelectedReviewsProps {
  className?: string;
}

const SelectedReviews = ({ className }: SelectedReviewsProps) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Header sin puntuación total */}
      <SimpleHeader 
        title="RESEÑAS SELECCIONADAS"
        subtitle="Selección de reseñas reales de nuestros clientes en Google"
      />

      {/* Grid de reseñas */}
      <div className="grid md:grid-cols-2 gap-6">
        {SELECTED_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-lg transition-shadow duration-200 hover:shadow-md"
            style={{
              backgroundColor: "var(--color-bg-primary)",
              opacity: 0.9,
            }}
          >
            {/* Header de la reseña */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
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

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {renderStars(review.rating, `selected-${review.id}`)}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {review.rating} {review.rating === 1 ? 'estrella' : 'estrellas'}
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

      {/* Footer con enlace a Google Maps */}
      <div className="text-center mt-8">
        <button
          onClick={() => {
            // Usar el enlace de Google Maps desde contact.ts
            window.open(
              "https://www.google.com/maps/place/Restaurante+Eimar/@39.4318343,-0.4168656,17z/data=!4m6!3m5!1s0xd604e58f9e16bbf:0x7e141fefed57a1fd!8m2!3d39.431492!4d-0.4142367!16s%2Fg%2F11b7d42z5d",
              "_blank",
            );
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-bg-accent/10"
          style={{ color: "var(--color-text-accent)" }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
          Ver todas las reseñas en Google
        </button>
      </div>
    </div>
  );
};

export default SelectedReviews;