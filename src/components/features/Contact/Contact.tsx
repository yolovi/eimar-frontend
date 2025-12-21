/**
 * CONTACT COMPONENT - EIMAR
 * =========================
 *
 * Componente de contacto con mapa interactivo e información del restaurante.
 * Incluye funcionalidad responsive para móvil/desktop.
 *
 * CARACTERÍSTICAS:
 * - Mapa interactivo con Google Maps
 * - Información de contacto y horarios
 * - Botones de acción adaptativos (llamada/WhatsApp)
 * - Detección automática de dispositivo
 * - Diseño responsive con sistema de variables EIMAR
 *
 * USO:
 * import Contact from '@/components/features/Contact/Contact';
 * <Contact />
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { HeroButton, ImageSlider, GoogleReviews } from "@/components/ui";
import { CONTACT_INFO, getTodaySchedule } from "@/constants/contact";

interface ContactProps {
  className?: string;
}

const Contact = ({ className }: ContactProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const todaySchedule = getTodaySchedule();

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

  // Evitar hidration mismatch - solo ejecutar en cliente
  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Función para manejar el click del teléfono
  const handlePhoneClick = () => {
    if (!isMounted) return; // Esperar a que esté montado

    if (isMobile) {
      // En móvil: abrir marcador telefónico
      window.open(CONTACT_INFO.phone.primary.link, "_self");
    } else {
      // En desktop: abrir WhatsApp Web
      const whatsappUrl = `https://wa.me/${
        CONTACT_INFO.whatsapp.number
      }?text=${encodeURIComponent(CONTACT_INFO.whatsapp.messages.info)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // Función para manejar reservas
  const handleReservation = () => {
    const whatsappUrl = `https://wa.me/${
      CONTACT_INFO.whatsapp.number
    }?text=${encodeURIComponent(CONTACT_INFO.whatsapp.messages.reservation)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contacto"
      className={cn("w-full py-16 px-4", className)}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            CONTACTO
          </h2>
          <p
            className="text-lg font-accent max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Visítanos en el corazón de Paiporta y descubre la auténtica
            experiencia gastronómica
          </p>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mapa interactivo */}
          <div className="order-2 lg:order-1">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.234567!2d${CONTACT_INFO.coordinates.lng}!3d${CONTACT_INFO.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDI1JzM0LjciTiAwwrAyNScwNC40Ilc!5e0!3m2!1ses!2ses!4v1234567890123`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Restaurante Eimar"
              />
            </div>
          </div>

          {/* Información del restaurante */}
          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            {/* Nombre del restaurante */}
            <div>
              <h3
                className="text-2xl md:text-3xl font-display font-bold tracking-wide"
                style={{ color: "var(--text-primary)" }}
              >
                RESTAURANTE EIMAR
              </h3>
            </div>

            {/* Información de contacto */}
            <div className="space-y-6">
              {/* Cómo llegar */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    style={{ color: "var(--color-accent)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h4
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Cómo llegar
                  </h4>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <p
                    className="mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {CONTACT_INFO.address.full}
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        CONTACT_INFO.coordinates.googleMapsLink,
                        "_blank"
                      )
                    }
                    className="text-sm font-medium hover:underline transition-all duration-200"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Abrir en Google Maps →
                  </button>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    style={{ color: "var(--color-accent)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <h4
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Teléfono
                  </h4>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <button
                    onClick={handlePhoneClick}
                    className="text-lg font-medium hover:underline transition-all duration-200"
                    style={{ color: "var(--color-accent)" }}
                    title={
                      isMounted
                        ? isMobile
                          ? "Llamar ahora"
                          : "Contactar por WhatsApp"
                        : "Contactar"
                    }
                  >
                    {CONTACT_INFO.phone.primary.display}
                  </button>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    style={{ color: "var(--color-accent)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h4
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Horario
                  </h4>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <p
                    className="mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    De martes a domingo: {todaySchedule.formatted}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-light)" }}>
                    Lunes cerrado
                  </p>
                </div>
              </div>

              {/* Mascotas */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    style={{ color: "var(--color-accent)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <p
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Mascotas
                  </p>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <p style={{ color: "var(--text-secondary)" }}>
                    Bienvenidas en terraza
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de reserva - TEMPORALMENTE DESHABILITADO */}
            <div className="flex justify-center lg:justify-start pt-4">
              {/* 
              <HeroButton
                variant="primary"
                size="md"
                onClick={handleReservation}
                className="px-8"
              >
                Reservar Mesa
              </HeroButton>
              */}

              {/* TODO: Botón temporal con acción de llamada directa. Descomentar botones anteriores cuando estén preparadas las acciones. Eliminar el siguiente temporal */}
              <HeroButton
                variant="primary"
                size="md"
                onClick={handlePhoneClick}
                className="px-8"
              >
                💬 Contactar
              </HeroButton>
            </div>
          </div>
        </div>

        {/* Galería de imágenes */}
        <div className="mt-16">
          <ImageSlider images={restaurantImages} className="" />
        </div>

        {/* Sección de reseñas */}
        <div className="mt-16">
          <GoogleReviews />
        </div>
      </div>
    </section>
  );
};

export default Contact;
