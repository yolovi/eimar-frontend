"use client";

import { useRouter } from "next/navigation";
import { Button, ImageCarousel } from "@/components/ui";

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

  const handleViewMenu = () => {
    router.push("/menu");
  };

  // Imágenes del restaurante para el carrusel
  const restaurantImages = [
    {
      src: "/images/restaurant/ambiente1.png",
      alt: "Interior del restaurante Eimar",
      title: "Ambiente acogedor y familiar",
    },
    {
      src: "/images/restaurant/comida1.png",
      alt: "Paella del restaurante Eimar",
      title: "Especialidad de la casa: Paella",
    },
    {
      src: "/images/restaurant/ambiente2.png",
      alt: "Terraza del restaurante Eimar",
      title: "Terraza exterior - Pet friendly",
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Carta
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre nuestra amplia selección de platos elaborados con
            ingredientes frescos y de temporada. Desde entrantes creativos hasta
            postres irresistibles, cada plato cuenta una historia de sabor.
          </p>
        </div>

        {/* Platos destacados (preview) */}
        <div className="bg-[var(--eimar-green)] rounded-2xl p-8 mt-3.5 mb-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Contenido textual - 2 columnas */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Platos Destacados</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Aguacate limeño</h4>
                    <p className="text-sm opacity-90">
                      Aguacate fresco con toques cítricos
                    </p>
                  </div>
                  <span className="font-bold">6.90€</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Sandwich coreano de pollo</h4>
                    <p className="text-sm opacity-90">
                      Fusión asiática con sabor único
                    </p>
                  </div>
                  <span className="font-bold">8.50€</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">
                      Burrata con tomates frescos
                    </h4>
                    <p className="text-sm opacity-90">
                      Cremosidad italiana en su máxima expresión
                    </p>
                  </div>
                  <span className="font-bold">14.50€</span>
                </div>
                {/* Call to Action */}
                <div className="text-center">
                  <Button
                    onClick={handleViewMenu}
                    variant="primary"
                    className="px-8 py-4 text-lg"
                  >
                    Ver Carta Completa
                  </Button>
                  <p className="text-sm text-gray-600 mt-3">
                    Descubre todos nuestros platos organizados por categorías
                  </p>
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
