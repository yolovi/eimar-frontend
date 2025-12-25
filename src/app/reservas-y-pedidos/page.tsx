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
        Componente principal de reservas y pedidos
        - Maneja la lógica de reservas por WhatsApp/teléfono
        - Proporciona información sobre turnos y políticas
        - Incluye sistema de pedidos para llevar
      */}
      <Reservations />
    </main>
  );
}