"use client";

import { useRouter } from "next/navigation";
import { Button, ImageCarousel } from "@/components/ui";
import { navigateToMenu } from "@/lib/utils";

/**
 * SECCIÓN INTRODUCTORIA DEL MENÚ
 * ==============================
 *
 * Sección que aparece en la página principal para introducir el menú y dirigir a los usuarios a la página completa de la carta.
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

export default function MenuIntro() {
  const router = useRouter();

  // Estilos constantes para platos destacados
  const dishTitleStyle = {
    className: "ds-body-md",
    style: { color: "var(--color-text-inverse)" }
  };

  const dishDescriptionStyle = {
    className: "ds-body-sm opacity-90",
    style: { color: "var(--color-secondary)" }
  };

  // Imágenes del restaurante para el carrusel
  const restaurantImages = [
    {
      src: "/images/restaurant/ambiente1.png",
      alt: "Interior del restaurante Eimar",
      title: "Ambiente acogedor",
    },
    {
      src: "/images/restaurant/comida1.png",
      alt: "Bocadillo Eimar",
      title: "Bocadillo Eimar",
    },
    {
      src: "/images/restaurant/ambiente2.png",
      alt: "Terraza del restaurante Eimar",
      title: "Terraza exterior",
    },
    {
      src: "/images/restaurant/comida2.png",
      alt: "Platos del menú del día",
      title: "Platos del menú diario",
    },
    {
      src: "/images/restaurant/comida3.png",
      alt: "Especialidades de la casa",
      title: "Nuestras especialidades",
    },
    {
      src: "/images/restaurant/bebida1.png",
      alt: "Bebidas y vinos del restaurante",
      title: "Carta de bebidas",
    },
    {
      src: "/images/restaurant/postre1.png",
      alt: "Postres caseros",
      title: "Postres de la casa",
    },
  ];

  return (
    <section className="py-8 bg-base">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12">
          <h2 className="ds-section-title mb-4">Nuestra Carta</h2>
          <p className="ds-body-xl max-w-3xl mx-auto mb-8">
            Descubre nuestra amplia selección de platos elaborados con
            ingredientes frescos y de temporada. Desde entrantes creativos hasta
            postres irresistibles, cada plato cuenta una historia de sabor.
          </p>
        </div>

        {/* Platos destacados (preview) */}
        <div className="bg-accent/80 rounded-2xl p-8 mt-3.5 mb-12 text-text-inverse">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Contenido textual - 2 columnas */}
            <div className="lg:col-span-2">
              <h3 className="ds-h3 mb-4">Platos Destacados</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 {...dishTitleStyle}>
                      Aguacate limeño
                    </h4>
                    <p {...dishDescriptionStyle}>
                      Aguacate fresco con toques cítricos
                    </p>
                  </div>
                  <span className="ds-label">6.90€</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 {...dishTitleStyle}>
                      Sandwich coreano de pollo
                    </h4>
                    <p {...dishDescriptionStyle}>
                      Fusión asiática con sabor único
                    </p>
                  </div>
                  <span className="ds-label">8.50€</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 {...dishTitleStyle}>
                      Burrata con tomates frescos
                    </h4>
                    <p {...dishDescriptionStyle}>
                      Cremosidad italiana en su máxima expresión
                    </p>
                  </div>
                  <span className="ds-label">14.50€</span>
                </div>
                {/* Call to Action */}
                <div className="text-center">
                  <Button
                    onClick={() => navigateToMenu(router)}
                    className="bg-transparent hover:bg-transparent border-2 border-transparent px-8 py-4 text-lg hover:text-xl transition-all duration-300 ease-in-out"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Ver Carta Completa
                  </Button>
                </div>
              </div>
            </div>

            {/* Carrusel - Galería de imágenes - 3 columnas */}
            <div id="galeria" className="lg:col-span-3 py-2 px-2">
              <div className="max-w-7xl mx-auto">
                <div className="mt-0">
                  <ImageCarousel
                    images={restaurantImages}
                    autoPlay={true}
                    autoPlayInterval={4000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
