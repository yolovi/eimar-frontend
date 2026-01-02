'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

/**
 * SECCIÓN INTRODUCTORIA DEL MENÚ
 * ==============================
 * 
 * Sección que aparece en la página principal para introducir
 * el menú y dirigir a los usuarios a la página completa de la carta.
 */
export default function MenuIntro() {
  const router = useRouter();

  const handleViewMenu = () => {
    router.push('/menu');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Carta
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre nuestra amplia selección de platos elaborados con ingredientes frescos y de temporada. 
            Desde entrantes creativos hasta postres irresistibles, cada plato cuenta una historia de sabor.
          </p>
        </div>

        {/* Grid de categorías destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Entrantes */}
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-3">🥗</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Entrantes</h3>
            <p className="text-sm text-gray-600">
              El comienzo perfecto para tu experiencia gastronómica
            </p>
          </div>

          {/* Bocadillos */}
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-3">🥖</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bocadillos</h3>
            <p className="text-sm text-gray-600">
              Tradición y calidad en cada bocado
            </p>
          </div>

          {/* Burgers */}
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-3">🍔</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Burgers</h3>
            <p className="text-sm text-gray-600">
              Hamburguesas gourmet con ingredientes premium
            </p>
          </div>

          {/* Carnes */}
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-3">🥩</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Carnes</h3>
            <p className="text-sm text-gray-600">
              Carnes selectas preparadas a la perfección
            </p>
          </div>

        </div>

        {/* Platos destacados (preview) */}
        <div className="bg-[var(--eimar-green)] rounded-2xl p-8 mb-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Contenido textual */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Platos Destacados</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Aguacate limeño</h4>
                    <p className="text-sm opacity-90">Aguacate fresco con toques cítricos</p>
                  </div>
                  <span className="font-bold">6.90€</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Sandwich coreano de pollo</h4>
                    <p className="text-sm opacity-90">Fusión asiática con sabor único</p>
                  </div>
                  <span className="font-bold">8.50€</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Burrata con tomates frescos</h4>
                    <p className="text-sm opacity-90">Cremosidad italiana en su máxima expresión</p>
                  </div>
                  <span className="font-bold">14.50€</span>
                </div>
              </div>
            </div>

            {/* Imagen ilustrativa */}
            <div className="relative">
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-lg">
                  Y mucho más...
                </p>
                <p className="text-sm opacity-90 mt-2">
                  Explora nuestra carta completa con más de 40 especialidades
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            onClick={handleViewMenu}
            variant="primary"
            // size="large" //TODO: Añadir tamaño large en el futuro o revisar tamaños existentes
            className="px-8 py-4 text-lg"
          >
            Ver Carta Completa
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            Descubre todos nuestros platos organizados por categorías
          </p>
        </div>

      </div>
    </section>
  );
}