/**
 * SCROLL TO TOP BUTTON
 * ===================
 * 
 * Botón flotante que aparece cuando el usuario hace scroll hacia abajo.
 * Permite volver rápidamente al inicio de la página con animación suave.
 * 
 * CARACTERÍSTICAS:
 * - Aparece automáticamente después de hacer scroll
 * - Animación suave al volver arriba
 * - Diseño consistente con el sistema EIMAR
 * - Accesible con aria-label
 * - Posición y estilos configurables
 */

'use client';

import { useState, useEffect } from 'react';
import { scrollToTop } from '@/lib/utils';

interface ScrollToTopButtonProps {
  /** Distancia de scroll en px antes de mostrar el botón (por defecto: 400) */
  threshold?: number;
  /** Clases CSS adicionales para el botón */
  className?: string;
  /** Posición del botón (por defecto: bottom-6 right-6) */
  position?: string;
  /** Tamaño del botón (por defecto: w-12 h-12) */
  size?: string;
  /** Ícono personalizado (opcional) */
  icon?: React.ReactNode;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 400,
  className = '',
  position = 'bottom-6 right-6',
  size = 'w-12 h-12',
  icon
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Función para volver arriba con animación suave
  const handleScrollToTop = () => {
    scrollToTop({
      duration: 1500,
      easing: 'ease-in-out'
    });
  };

  // Detectar scroll para mostrar/ocultar botón
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // No renderizar si no se debe mostrar
  if (!showScrollTop) {
    return null;
  }

  return (
    <button
      onClick={handleScrollToTop}
      className={`
        fixed ${position} z-50 ${size} bg-bg-accent text-text-inverse 
        rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300
        hover:scale-110 hover:bg-bg-accent/90 flex items-center justify-center
        ${className}
      `}
      aria-label="Volver arriba"
    >
      {icon || (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      )}
    </button>
  );
};

export default ScrollToTopButton;