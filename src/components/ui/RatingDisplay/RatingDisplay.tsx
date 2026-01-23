/**
 * RATING DISPLAY COMPONENTS - EIMAR
 * =================================
 *
 * Componentes y utilidades para mostrar ratings y estrellas.
 * Extraído para uso opcional según el tipo de componente de reseñas.
 *
 * USO:
 * - RatingHeader: Header completo con promedio y estrellas
 * - renderStars: Función para renderizar solo estrellas individuales
 * - StarRating: Componente individual de estrellas
 */

"use client";

interface RatingHeaderProps {
  averageRating: number;
  totalReviews: number;
  title?: string;
  error?: string | null;
}

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Función para renderizar estrellas (exportable individualmente)
 */
export const renderStars = (rating: number, uniqueId?: string) => {
  return Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < Math.floor(rating);
    const isHalf = index < rating && index >= Math.floor(rating);
    const gradientId = `half-${uniqueId || 'default'}-${rating}-${index}`;

    return (
      <svg
        key={index}
        className="w-4 h-4"
        style={{
          color: isFilled || isHalf ? "#fbbf24" : "#e5e7eb", // yellow-400 : gray-200
        }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        {isHalf ? (
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
        ) : null}
        <path
          fillRule="evenodd"
          d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
          fill={isHalf ? `url(#${gradientId})` : "currentColor"}
        />
      </svg>
    );
  });
};

/**
 * Componente de estrellas individual con tamaños opcionales
 */
export const StarRating = ({ rating, size = 'md', className = '' }: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalf = index < rating && index >= Math.floor(rating);
        const gradientId = `star-${size}-${rating}-${index}`;

        return (
          <svg
            key={index}
            className={sizeClasses[size]}
            style={{
              color: isFilled || isHalf ? "#fbbf24" : "#e5e7eb",
            }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isHalf ? (
              <defs>
                <linearGradient id={gradientId}>
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              fillRule="evenodd"
              d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
              fill={isHalf ? `url(#${gradientId})` : "currentColor"}
            />
          </svg>
        );
      })}
    </div>
  );
};

/**
 * Header completo con rating promedio (para GoogleReviews)
 */
export const RatingHeader = ({ 
  averageRating, 
  totalReviews, 
  title = "RESEÑAS DE CLIENTES",
  error = null 
}: RatingHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h3
        className="text-2xl md:text-3xl font-display font-bold mb-4"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h3>

      <div className="flex items-center justify-center gap-4 mb-2">
        <StarRating rating={averageRating} size="md" />
        <span
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {averageRating.toFixed(1)}
        </span>
      </div>

      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Basado en {totalReviews} reseñas de Google
      </p>
      
      {error && (
        <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block">
          Mostrando reseñas de respaldo
        </div>
      )}
    </div>
  );
};

/**
 * Header simple sin rating (para FeaturedReviews)
 */
export const SimpleHeader = ({ title = "RESEÑAS DESTACADAS", subtitle }: { 
  title?: string; 
  subtitle?: string;
}) => {
  return (
    <div className="text-center mb-8">
      <h3
        className="text-2xl md:text-3xl font-display font-bold mb-4"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h3>
      
      {subtitle && (
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};