/**
 * RESERVATIONS COMPONENT - EIMAR
 * ===============================
 *
 * Componente para gestión de reservas y pedidos del restaurante.
 * Incluye formulario de reservas, información sobre pedidos para llevar y políticas.
 *
 * CARACTERÍSTICAS:
 * - Diseño hero con imagen de fondo y overlay
 * - Formulario de reservas completo
 * - Integración con WhatsApp y llamadas
 * - Información sobre turnos y políticas de reserva
 * - Botones de acción adaptativos según dispositivo
 * - Sistema de variables CSS EIMAR consistente
 *
 * USO:
 * import Reservations from '@/components/features/Reservations/Reservations';
 * <Reservations />
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ReservationForm,
  ActionButton,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui";
import { CONTACT_INFO } from "@/constants/contact";
import Image from "next/image";

export interface ReservationsProps {
  title?: string;
  subtitle?: string;
  subtitleBold?: string;
  imageSrc?: string;
  imageAlt?: string;
  height?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

// Constantes de contenido para evitar repetición y facilitar mantenimiento
const RESERVATIONS_CONTENT = {
  payment: {
    title: "Pago con tarjeta o efectivo",
    description: "Aceptamos ambas formas de pago para tu comodidad",
  },

  policies: {
    turnos: {
      title: "Turnos de Reserva",
      content: [
        "Almuerzo: De 12:00h a 16:00h",
        "Cena (Viernes y Sábado): De 20:00h a 00:00h",
        "Reservas recomendadas especialmente en fines de semana",
      ],
    },
    general: {
      title: "Políticas Generales",
      content: [
        "Las reservas se confirman por WhatsApp o teléfono",
        "Para grupos de más de 6 personas, contactar con antelación",
        "Política de cancelación: avisar con al menos 2 horas de anticipación",
        "Mesa reservada durante 15 minutos tras la hora de reserva",
      ],
    },
  },
} as const;

const Reservations = ({
  imageSrc = "/images/restaurant/reservation-table.png",
  imageAlt = "Interior del restaurante Eimar con ambiente acogedor",
  height = "lg",
  className,
}: ReservationsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // Mapeo a clases globales de altura responsiva
  const heightClasses = {
    sm: "eimar-height-sm",
    md: "eimar-height-md", 
    lg: "eimar-height-lg",
    xl: "eimar-height-xl",
    full: "eimar-height-full",
  };

  // Evitar hydration mismatch - solo ejecutar en cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Función para manejar llamadas
  const handlePhoneCall = () => {
    if (!isMounted) return;
    window.open(CONTACT_INFO.phone.primary.link, "_self");
  };

  // Función para WhatsApp reservas
  const handleWhatsAppReservation = () => {
    const whatsappUrl = `https://wa.me/${
      CONTACT_INFO.whatsapp.number
    }?text=${encodeURIComponent(CONTACT_INFO.whatsapp.messages.reservation)}`;
    window.open(whatsappUrl, "_blank");
  };

  // TODO: Función para ver carta (deshabilitada temporalmente)
  const handleViewMenu = () => {
    // Falta implementar navegación a la sección de carta. Deshabilitado temporalmente.
  };

  return (
    <section
      id="reservas-y-pedidos"
      className={cn("w-full py-12 mb-8", heightClasses[height], className)}
      style={{ backgroundColor: "var(--bg-primary)" }}
      aria-label="Reservation section"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Contenido principal con dos columnas */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full">
            <div className="grid lg:grid-cols-7 gap-8">
              {/* Columna izquierda: Formulario de reserva */}
              <div className="lg:col-span-3">
                <ReservationForm />
              </div>

              {/* Columna derecha: Información con imagen de fondo */}
              <div className="lg:col-span-4 relative min-h-[400] rounded-lg overflow-hidden shadow-xl flex items-center">
                {/* Imagen de fondo */}
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Overlay gradient para legibilidad del texto */}
                <div
                  className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/60"
                  aria-hidden="true"
                />

                {/* Overlay adicional para móvil */}
                <div
                  className="absolute inset-0 bg-black/15 lg:bg-transparent"
                  aria-hidden="true"
                />

                {/* Texto superpuesto */}
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="text-center px-8 relative z-50">
                    <h1
                      className="eimar-h2 mb-4"
                      style={{ color: "var(--text-inverse)" }}
                    >
                      Reservas y Pedidos
                    </h1>
                    <p className="eimar-hero-subtitle mb-8">
                      Disfruta de la experiencia Eimar
                      <br />
                      <span
                        className="font-medium"
                        style={{
                          color: "var(--text-inverse)",
                        }}
                      >
                        en casa o en nuestro local
                      </span>
                    </p>
                    {/* Botones de acción */}
                    <div className="flex gap-6 justify-center relative z-50">
                      <ActionButton
                        icon={MenuIcon}
                        label="Carta"
                        onClick={handleViewMenu}
                        ariaLabel="Ver carta del restaurante"
                      />

                      <ActionButton
                        icon={PhoneIcon}
                        label="Llamar"
                        onClick={handlePhoneCall}
                        ariaLabel="Llamar al restaurante"
                      />

                      <ActionButton
                        icon={WhatsAppIcon}
                        label="WhatsApp"
                        onClick={handleWhatsAppReservation}
                        ariaLabel="Contactar por WhatsApp"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de información adicional */}
        <div className="grid lg:grid-cols-7 gap-8">
          {/* Turnos */}
          <div className="p-6 bg-white/50 rounded-xl border border-accent/20 lg:col-span-3">
            <h4 className="eimar-h6 mb-4">
              {RESERVATIONS_CONTENT.policies.turnos.title}
            </h4>
            <ul className="eimar-list-bulleted eimar-body-small">
              {RESERVATIONS_CONTENT.policies.turnos.content.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Políticas */}
          <div className="p-6 bg-white/50 rounded-xl border border-accent/20 lg:col-span-4">
            <h4 className="eimar-h6 mb-4">
              {RESERVATIONS_CONTENT.policies.general.title}
            </h4>
            <ul className="eimar-list-bulleted eimar-body-small">
              {RESERVATIONS_CONTENT.policies.general.content.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
