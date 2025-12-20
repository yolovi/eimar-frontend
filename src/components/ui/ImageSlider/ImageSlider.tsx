/**
 * IMAGE SLIDER COMPONENT - EIMAR
 * ===============================
 * 
 * Slider horizontal de imágenes para mostrar múltiples fotos del restaurante.
 * Muestra varias imágenes a la vez con navegación lateral.
 * 
 * CARACTERÍSTICAS:
 * - Múltiples imágenes visibles simultáneamente
 * - Navegación con flechas laterales
 * - Responsive design (más imágenes en desktop)
 * - Scroll suave entre grupos de imágenes
 * - Sistema de variables CSS EIMAR
 * 
 * USO:
 * import ImageSlider from '@/components/ui/ImageSlider';
 * <ImageSlider images={images} />
 */

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SliderImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  className?: string;
}

const ImageSlider = ({ images, className }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Configuración responsive: imágenes visibles por pantalla
  const imagesPerView = {
    mobile: 1,
    tablet: 2, 
    desktop: 3
  };

  // Calcular cuántas imágenes mostrar según el tamaño de pantalla
  const getImagesPerView = () => {
    if (typeof window === 'undefined') return imagesPerView.desktop;
    
    if (window.innerWidth < 768) return imagesPerView.mobile;
    if (window.innerWidth < 1024) return imagesPerView.tablet;
    return imagesPerView.desktop;
  };

  const maxIndex = Math.max(0, images.length - getImagesPerView());

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Contenedor principal */}
      <div className="relative">
        
        {/* Botón anterior */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all duration-200"
            style={{ 
              color: "var(--color-accent)",
              border: "1px solid var(--eimar-gray-light)"
            }}
            aria-label="Imágenes anteriores"
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
        )}

        {/* Botón siguiente */}
        {currentIndex < maxIndex && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition-all duration-200"
            style={{ 
              color: "var(--color-accent)",
              border: "1px solid var(--eimar-gray-light)"
            }}
            aria-label="Siguientes imágenes"
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
        )}

        {/* Contenedor de imágenes */}
        <div className="overflow-hidden mx-8">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / getImagesPerView())}%)`
            }}
          >
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="flex-none w-full md:w-1/2 lg:w-1/3"
              >
                <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay con título */}
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p 
                        className="text-white text-sm font-medium"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
                      >
                        {image.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicadores de posición */}
      {images.length > getImagesPerView() && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "scale-125"
                  : "hover:scale-110"
              )}
              style={{
                backgroundColor: index === currentIndex 
                  ? "var(--color-accent)" 
                  : "var(--eimar-gray-light)"
              }}
              aria-label={`Ir al grupo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;