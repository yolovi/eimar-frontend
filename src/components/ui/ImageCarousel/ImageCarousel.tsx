/**
 * IMAGE CAROUSEL COMPONENT - EIMAR
 * ===============================
 *
 * Carousel horizontal de imágenes para mostrar múltiples fotos del restaurante.
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
 * import ImageCarousel from '@/components/ui/ImageCarousel';
 * <ImageCarousel images={images} />
 */

"use client";

import { useState, useRef, useEffect } from "react";
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
  className?: string;
}

const ImageCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  className,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImagesPerView, setCurrentImagesPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Configuración responsive: imágenes visibles por pantalla
  const imagesPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  // Calcular cuántas imágenes mostrar según el tamaño de pantalla
  const getImagesPerView = () => {
    if (typeof window === "undefined") return imagesPerView.desktop;

    if (window.innerWidth < 768) return imagesPerView.mobile;
    if (window.innerWidth < 1024) return imagesPerView.tablet;
    return imagesPerView.desktop;
  };

  // Actualizar imagesPerView cuando cambie el tamaño de pantalla
  useEffect(() => {
    const updateImagesPerView = () => {
      const newImagesPerView = getImagesPerView();
      setCurrentImagesPerView(newImagesPerView);
      // Resetear index si es necesario
      setCurrentIndex((prev) => {
        const newMaxIndex = Math.max(0, images.length - newImagesPerView);
        return Math.min(prev, newMaxIndex);
      });
    };

    updateImagesPerView();
    window.addEventListener("resize", updateImagesPerView);

    return () => window.removeEventListener("resize", updateImagesPerView);
  }, [images.length]);

  // Listener de scroll para móvil
  useEffect(() => {
    if (currentImagesPerView !== 1) return; // Solo en móvil

    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const imageWidth = 280 + 16; // 280px + gap
        const newIndex = Math.round(scrollLeft / imageWidth);

        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < images.length
        ) {
          setCurrentIndex(newIndex);
        }
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll, { passive: true });
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [currentImagesPerView, currentIndex, images.length]);

  const maxIndex = Math.max(0, images.length - currentImagesPerView);

  // AutoPlay functionality - solo en desktop
  useEffect(() => {
    if (
      !autoPlay ||
      images.length <= currentImagesPerView ||
      isHovered ||
      currentImagesPerView === 1
    )
      return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Si llegamos al final, volver al inicio
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    autoPlay,
    autoPlayInterval,
    images.length,
    maxIndex,
    isHovered,
    currentImagesPerView,
  ]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      // Calcular si podemos avanzar sin que falten imágenes
      if (prev + currentImagesPerView >= images.length) {
        return 0; // Volver al inicio si llegamos al final
      }
      return prev + 1;
    });
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor principal */}
      <div className="relative">
        {/* Botón anterior - Solo desktop */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/35 hover:bg-white/90 shadow-lg hover:shadow-xl p-2 md:p-3 rounded-full transition-all duration-200"
            style={{
              color: "var(--color-text-accent)",
              border: "1px solid transparent",
            }}
            aria-label="Imágenes anteriores"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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

        {/* Botón siguiente - Solo desktop */}
        {currentIndex < maxIndex && (
          <button
            onClick={goToNext}
            className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-bg-primary/35 hover:bg-bg-primary/90 shadow-lg hover:shadow-xl p-2 md:p-3 rounded-full transition-all duration-200"
            style={{
              color: "var(--color-text-accent)",
              border: "1px solid transparent",
            }}
            aria-label="Siguientes imágenes"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className={cn(
              "flex gap-4",
              currentImagesPerView === 1
                ? "overflow-x-auto scrollbar-hide" // Móvil: scroll horizontal
                : "transition-transform duration-700 ease-out", // Desktop: transform animado
            )}
            style={{
              transform:
                currentImagesPerView === 1
                  ? "none"
                  : `translateX(calc(-${currentIndex} * (calc((100% - ${
                      (currentImagesPerView - 1) * 16
                    }px) / ${currentImagesPerView}) + ${16}px)))`,
            }}
          >
            {images.map((image, index) => {
              // En móvil: ancho fijo para scroll manual, en desktop: ancho dinámico
              const widthStyle =
                currentImagesPerView === 1
                  ? { width: "280px", flexShrink: 0 } // Ancho fijo para scroll manual en móvil
                  : {
                      width: `calc((100% - ${
                        (currentImagesPerView - 1) * 16
                      }px) / ${currentImagesPerView})`,
                    }; // Ancho dinámico para desktop restando gaps

              return (
                <div
                  key={`${image.src}-${index}`}
                  className="flex-none"
                  style={widthStyle}
                >
                  <div className="relative h-[200] md:h-[250] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Overlay con título */}
                    {image.title && (
                      <>
                        {/* Fondo gradual */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black via-black/60 to-transparent" />

                        {/* Texto por encima del fondo */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                          <p className="text-text-inverse/70! text-sm">
                            {image.title}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicadores de posición */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {currentImagesPerView === 1
            ? // En móvil: un indicador por cada imagen
              images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // En móvil: scroll hacia la imagen específica
                    if (carouselRef.current) {
                      const imageWidth = 280 + 16; // 280px + gap de 16px
                      carouselRef.current.scrollTo({
                        left: index * imageWidth,
                        behavior: "smooth",
                      });
                    }
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex ? "scale-125" : "hover:scale-110",
                  )}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? "var(--color-bg-primary)"
                        : "var(--color-bg-accent)",
                  }}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))
            : // En desktop: un indicador por grupo
              Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex ? "scale-125" : "hover:scale-110",
                  )}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? "var(--color-bg-primary)"
                        : "var(--color-bg-accent)",
                  }}
                  aria-label={`Ir al grupo ${index + 1}`}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
