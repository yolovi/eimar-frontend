/**
 * PÁGINA RESERVAS Y PEDIDOS - EIMAR
 * ===================================
 *
 * Página dedicada exclusivamente al sistema de reservas y pedidos
 * del restaurante Eimar Paiporta. 
 * 
 * ESTRUCTURA:
 * - Componente Reservations como contenido principal
 * - Layout responsivo con navegación completa
 * - SEO optimizado para reservas de restaurante
 * - Metadatos específicos para la página
 * 
 * INTEGRACIÓN:
 * - Utiliza el componente Reservations reutilizable
 * - Compatible con el sistema de navegación existente
 * - Mantiene la consistencia de diseño con el resto de la web
 */

import type { Metadata } from "next";
import Reservations from "@/components/features/Reservations";

// Metadatos específicos para SEO de reservas
export const metadata: Metadata = {
  title: "Reservas y Pedidos - Restaurante Eimar Paiporta",
  description: "Reserva tu mesa o haz tu pedido para llevar en Eimar Paiporta. Disfruta de nuestra cocina mediterránea por WhatsApp, teléfono o en nuestro acogedor local.",
  keywords: [
    "reservas restaurante Paiporta",
    "pedidos para llevar Valencia",
    "restaurante Eimar reservar mesa",
    "comida mediterránea domicilio",
    "WhatsApp pedidos restaurante",
    "reservas telefónicas Valencia"
  ],
  openGraph: {
    title: "Reservas y Pedidos - Restaurante Eimar Paiporta",
    description: "Reserva tu mesa o haz tu pedido para llevar en Eimar Paiporta. Cocina mediterránea de calidad.",
    type: "website",
  },
};

/**
 * Página principal de Reservas y Pedidos
 * 
 * Esta página encapsula el componente Reservations y proporciona
 * la estructura necesaria para una experiencia de usuario completa
 * en el proceso de reserva y pedidos.
 */
export default function ReservationsPage() {
  return (
    <main className="min-h-screen">
      {/* 
        Página dedicada de reservas con contenido expandido
        - Información más detallada sobre reservas y políticas
        - Optimizada para conversiones desde búsquedas específicas
        - SEO enfocado en términos de reservas de restaurante
      */}
      <Reservations 
        title="Reserva tu Mesa o Haz tu Pedido"
        subtitle="En Eimar Paiporta te esperamos con la mejor comida mediterránea"
        subtitleBold="Reservas fáciles por WhatsApp o teléfono"
        height="xl"
      />
      
      {/* Contenido adicional SEO para la página dedicada */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            ¿Por qué reservar en Eimar Paiporta?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">
                🍽️ Comida Mediterránea Auténtica
              </h3>
              <p className="text-text-secondary">
                Ingredientes frescos y recetas tradicionales que respetan el sabor mediterráneo.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">
                📱 Reservas Fáciles
              </h3>
              <p className="text-text-secondary">
                Reserva por WhatsApp, teléfono o visítanos directamente. Siempre te atenderemos.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">
                🏠 Ambiente Familiar
              </h3>
              <p className="text-text-secondary">
                En el corazón de Paiporta, un espacio acogedor perfecto para cualquier ocasión.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}