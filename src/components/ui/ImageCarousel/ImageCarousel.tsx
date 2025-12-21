/**
 * IMAGE CAROUSEL COMPONENT - EIMAR
 * =================================
 * FIXME: actualmente no se está usando
 * 
 * Carrusel de imágenes responsive para mostrar ambiente del restaurante.
 * Incluye navegación por flechas, indicadores y autoplay opcional.
 * 
 * CARACTERÍSTICAS:
 * - Navegación con flechas y indicadores
 * - Responsive design
 * - Lazy loading de imágenes
 * - Transiciones suaves
 * - Sistema de variables CSS EIMAR
 * 
 * USO:
 * import ImageCarousel from '@/components/ui/ImageCarousel';
 * <ImageCarousel images={images} />
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  className?: string;
}

const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  className
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Contenedor principal de imágenes */}
      <div className="relative h-[300] md:h-[400] rounded-lg overflow-hidden shadow-lg">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0} // Solo la primera imagen con priority
            />
            
            {/* Overlay con título si existe */}
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                <h4 
                  className="text-white font-medium text-sm md:text-base"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {image.title}
                </h4>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      {images.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Botón siguiente */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Siguiente imagen"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;