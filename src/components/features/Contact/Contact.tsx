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

import { cn } from "@/lib/utils";
import { HeroButton, GoogleReviews } from "@/components/ui";
import { CONTACT_INFO, getTodaySchedule } from "@/constants/contact";
import { useContactActions } from "@/hooks";

interface ContactProps {
  className?: string;
}

const Contact = ({ className }: ContactProps) => {
  const todaySchedule = getTodaySchedule();

  // Usar hook centralizado para todas las acciones de contacto
  const {
    handlePhoneAction,
    handleQuickContact,
    getActionTitle,
  } = useContactActions();

  // Datos de contacto estructurados
  const contactItems = [
    {
      id: "location",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
      title: "Cómo llegar",
      content: (
        <>
          <p className="mb-3" style={{ color: "var(--color-text-secondary)" }}>
            {CONTACT_INFO.address.full}
          </p>
          <button
            onClick={() =>
              window.open(CONTACT_INFO.coordinates.googleMapsLink, "_blank")
            }
            className="text-sm font-medium hover:underline transition-all duration-200"
            style={{ color: "var(--color-text-accent)" }}
          >
            Abrir en Google Maps →
          </button>
        </>
      ),
    },
    {
      id: "phone",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
      title: "Teléfono",
      content: (
        <button
          onClick={() => handlePhoneAction()}
          className="text-lg font-medium hover:underline transition-all duration-200"
          style={{ color: "var(--color-text-accent)" }}
          title={getActionTitle("phone")}
        >
          {CONTACT_INFO.phone.primary.display}
        </button>
      ),
    },
    {
      id: "schedule",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      title: "Horario",
      content: (
        <>
          <p className="mb-1" style={{ color: "var(--color-text-secondary)" }}>
            De martes a domingo: {todaySchedule.formatted}
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Lunes cerrado
          </p>
        </>
      ),
    },
    {
      id: "pets",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      ),
      title: "Mascotas",
      content: (
        <p style={{ color: "var(--color-text-secondary)" }}>
          Bienvenidas en terraza
        </p>
      ),
    },
  ];

  // Función helper para renderizar cada elemento de contacto
  const renderContactItem = (item: (typeof contactItems)[0]) => (
    <div
      key={item.id}
      className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4"
    >
      <div className="flex items-center gap-2 lg:w-32 lg:min-w-32">
        <svg
          className="w-5 h-5"
          style={{ color: "var(--color-text-accent)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {item.icon}
        </svg>
        <h4 className="ds-h6-sans">{item.title}</h4>
      </div>
      <div className="flex-1 text-center lg:text-left">{item.content}</div>
    </div>
  );

  return (
    <section
      id="contacto"
      className={cn("w-full", className)}
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Sección del mapa e información con fondo gris */}
      <div
        className="w-full py-16"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-bg-accent) 10%, transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Layout principal */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mapa interactivo */}
            <div className="order-2 lg:order-1">
              <div className="relative h-[400] lg:h-[500] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6163.34797038494!2d${CONTACT_INFO.coordinates.lng}!3d${CONTACT_INFO.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604e58f9e16bbf%3A0x7e141fefed57a1fd!2sRestaurante%20Eimar!5e0!3m2!1ses!2ses!4v1766364556562!5m2!1ses!2ses`}
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
                <h3 className="ds-section-title tracking-wide">
                  RESTAURANTE EIMAR
                </h3>
                <p className="ds-body-xl max-w-2xl mx-auto">
                  Visítanos en el corazón de Paiporta y descubre la auténtica
                  experiencia gastronómica
                </p>
              </div>

              {/* Información de contacto */}
              <div className="space-y-6">
                {contactItems.map(renderContactItem)}
              </div>

              {/* Botón de reserva - TEMPORALMENTE DESHABILITADO */}
              <div className="flex justify-center lg:justify-start pt-4">
                <HeroButton
                  variant="primary"
                  size="md"
                  onClick={() => handleQuickContact()}
                  className="px-8"
                >
                  Contactar
                </HeroButton>
              </div>
            </div>
          </div>
        </div>
        {/* Sección de reseñas */}
        <div
          id="reviews"
          className="py-12 px-4 mt-6.5"
          style={{ backgroundColor: " var(--color-bg-accent) 10%," }}
        >
          <GoogleReviews />
        </div>
      </div>
    </section>
  );
};

export default Contact;
