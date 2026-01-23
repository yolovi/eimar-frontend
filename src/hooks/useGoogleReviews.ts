/**
 * HOOK - GOOGLE REVIEWS
 * ======================
 * 
 * Hook personalizado para manejar el estado de las reseñas de Google.
 * Incluye caché en localStorage y manejo de errores.
 */

import { useState, useEffect } from 'react';
import { FALLBACK_REVIEWS_DATA } from '@/data/reviews';
import type { Review, ReviewsData } from '@/data/reviews';

interface UseGoogleReviewsReturn {
  data: ReviewsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Datos reales copiados de Google Maps para usar en caso de fallo de API
// Estas son reseñas reales de Eimar obtenidas manualmente
const realFallbackReviews: ReviewsData = FALLBACK_REVIEWS_DATA;

const CACHE_KEY = 'eimar-google-reviews';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora en millisegundos

export function useGoogleReviews(): UseGoogleReviewsReturn {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar caché primero
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        const isValidCache = Date.now() - timestamp < CACHE_DURATION;
        
        if (isValidCache) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Hacer llamada a nuestra API route (fallback para desarrollo)
      const response = await fetch('/api/reviews-fallback');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const reviewsData: ReviewsData = await response.json();

      // Guardar en caché
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: reviewsData,
        timestamp: Date.now(),
      }));

      setData(reviewsData);

    } catch (err) {
      console.error('Error fetching Google reviews:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      
      // Usar datos centralizados de fallback en caso de error
      setData(FALLBACK_REVIEWS_DATA);
      
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    // Limpiar caché y volver a cargar
    localStorage.removeItem(CACHE_KEY);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
}