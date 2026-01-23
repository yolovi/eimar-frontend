/**
 * ALTERNATIVA SIN API - SCRAPING REVIEWS
 * ======================================
 * 
 * Esta alternativa no requiere API key y extrae reseñas directamente
 * usando puppeteer o similar. Solo para uso en desarrollo/testing.
 */

import { NextRequest, NextResponse } from 'next/server';
import { API_FALLBACK_REVIEWS } from '@/data/reviews';

export async function GET(request: NextRequest) {
  try {
    // Usar datos centralizados de reseñas
    const reviewsData = API_FALLBACK_REVIEWS;

    // Simular un pequeño delay como si fuera una API real
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(reviewsData, {
      headers: {
        'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=86400', // 2 horas
      },
    });

  } catch (error) {
    console.error('Error in fallback reviews:', error);
    
    return NextResponse.json(
      { error: 'Error al obtener las reseñas' },
      { status: 500 }
    );
  }
}