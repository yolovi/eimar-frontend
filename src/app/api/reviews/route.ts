/**
 * API ROUTE - GOOGLE REVIEWS
 * ===========================
 * 
 * Endpoint seguro para obtener reseñas de Google Places API
 * sin exponer la API key al frontend.
 */

import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
// Fallback al Place ID conocido si no está en .env
const EIMAR_PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJv2vh-VhOYA0R_aFX7e8fFH4';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  original_language?: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated?: boolean;
}

interface GooglePlaceDetailsResponse {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Verificar que tenemos la API key
    if (!GOOGLE_PLACES_API_KEY) {
      return NextResponse.json(
        { error: 'Google Places API key no configurada' },
        { status: 500 }
      );
    }

    // Construir la URL de la API de Google Places
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', EIMAR_PLACE_ID);
    url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews');
    url.searchParams.set('language', 'es');
    url.searchParams.set('key', GOOGLE_PLACES_API_KEY);

    // Hacer la llamada a Google Places API
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data: GooglePlaceDetailsResponse = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API status: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Transformar los datos al formato que espera nuestro frontend
    const transformedReviews = data.result.reviews?.map((review, index) => ({
      id: `google-${index}`,
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: review.relative_time_description,
      verified: true, // Las reseñas de Google están verificadas
      photoUrl: review.profile_photo_url,
      language: review.language,
    })) || [];

    const reviewsData = {
      restaurantName: data.result.name,
      averageRating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews: transformedReviews,
      lastUpdated: new Date().toISOString(),
    };

    // Configurar headers de caché (cachear por 1 hora)
    return NextResponse.json(reviewsData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al obtener las reseñas',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}