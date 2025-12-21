/**
 * HERO SECTION - EIMAR
 * ====================
 * 
 * Hero section para la página de inicio con imagen de fondo optimizada,
 * texto superpuesto y diseño responsivo.
 * 
 * CARACTERÍSTICAS:
 * - Next.js Image optimizado con priority loading
 * - Overlay gradient para mejorar legibilidad del texto
 * - Responsive design con diferentes layouts mobile/desktop
 * - Variables CSS del sistema EIMAR
 * - Accesibilidad completa
 * 
 * USO:
 * import Hero from '@/components/features/Hero/Hero';
 * <Hero />
 */

"use client";

import Image from "next/image";
import { cn, scrollToSection } from "@/lib/utils";
import { HeroButton } from "@/components/ui";

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  height?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const Hero = ({
  title = "Donde el sabor y la esencia se encuentran.",
  subtitle = "Descubre la auténtica experiencia gastronómica en el corazón de Paiporta",
  imageSrc = "/images/hero/hero-bartender.jpg",
  imageAlt = "Bartender preparando cocktail en Restaurante Eimar",
  height = "lg",
  className,
}: HeroProps) => {
  // Definir alturas responsivas
  const heightClasses = {
    sm: "h-[60vh] min-h-[400px]",
    md: "h-[70vh] min-h-[500px]",
    lg: "h-[80vh] min-h-[600px]",
    xl: "h-[90vh] min-h-[700px]",
    full: "h-screen",
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        heightClasses[height],
        className
      )}
      aria-label="Hero section"
    >
      {/* Imagen de fondo optimizada */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        
        {/* Overlay gradient para legibilidad del texto */}
        <div
          className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/60"
          aria-hidden="true"
        />
        
        {/* Overlay adicional para móvil */}
        <div
          className="absolute inset-0 bg-black/15 md:bg-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative h-full flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            
            {/* Título principal */}
            <h1
              className={cn(
                "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
                "font-display font-bold leading-tight",
                "drop-shadow-2xl mb-4 md:mb-6"
              )}
              style={{ color: "var(--eimar-white-snow)" }}
            >
              {title}
            </h1>

            {/* Subtítulo */}
            {subtitle && (
              <p
                className={cn(
                  "text-lg md:text-xl lg:text-2xl",
                  "font-accent font-medium leading-relaxed",
                  "drop-shadow-xl max-w-2xl mx-auto",
                  "mb-8 md:mb-10"
                )}
                style={{ color: "var(--eimar-white-snow)" }}
              >
                {subtitle}
              </p>
            )}

            {/* Botones de acción - TEMPORALMENTE DESHABILITADOS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* 
              <HeroButton variant="primary">
                Ver Nuestra Carta
              </HeroButton>
              
              <HeroButton variant="secondary">
                Reservar Mesa
              </HeroButton>
              */}
              
              {/* TODO: Botón temporal mientras se desarrollan las otras secciones. Descomentar el los HeroeButtons anteriores y elimiar el siguiente cuando estén terminadas las acciones */}
              <HeroButton variant="primary" onClick={() => {
                const contactSection = document.querySelector('#contacto');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Conoce más
              </HeroButton>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll - Clickeable */}
      <button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2"
        onClick={() => scrollToSection('about', 2000)}
        aria-label="Desplazarse a la sección Acerca de nosotros"
        title="Ver más información"
      >
        <div className="animate-bounce opacity-70 hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-6 h-6"
            style={{ color: "var(--eimar-white-snow)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default Hero;
