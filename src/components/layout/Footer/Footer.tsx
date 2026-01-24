/**
 * FOOTER COMPONENT - EIMAR
 * =========================
 *
 * Footer principal del sitio web con información de contacto,
 * horarios, redes sociales y créditos de desarrollo.
 *
 * CARACTERÍSTICAS:
 * - Diseño responsive con grid adaptativo
 * - Integración completa con contact.ts
 * - Estilo consistente con variables CSS de EIMAR
 * - Enlaces de contacto funcionales
 * - Créditos de desarrollo
 *
 * USO:
 * import Footer from '@/components/layout/Footer';
 * <Footer />
 */

import { CONTACT_INFO, getTodaySchedule } from "@/constants/contact";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const today = getTodaySchedule();

  return (
    <footer 
      className={cn("border-t", className)}
      style={{ 
        backgroundColor: "var(--color-bg-secondary)",
        borderColor: "var(--color-border-primary)"
      }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Grid principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* SECCIÓN: Información del Restaurante */}
          <div>
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Restaurante Eimar
            </h3>
            <p 
              className="text-sm leading-relaxed mb-3"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Auténtica cocina mediterránea en el corazón de Paiporta. 
              Tradición, calidad y sabor en cada plato.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span 
                className="font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                Hoy:
              </span>
              <span 
                style={{ color: "var(--color-text-accent)" }}
              >
                {today.formatted}
              </span>
            </div>
          </div>

          {/* SECCIÓN: Contacto */}
          <div>
            <h4 
              className="text-md font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Contacto
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <a 
                  href={CONTACT_INFO.phone.primary.link}
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  📞 {CONTACT_INFO.phone.primary.display}
                </a>
              </div>
              <div>
                <a 
                  href={CONTACT_INFO.whatsapp.linkWithReservation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  💬 WhatsApp
                </a>
              </div>
              <div>
                <a 
                  href={`mailto:${CONTACT_INFO.email.main}`}
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  ✉️ {CONTACT_INFO.email.main}
                </a>
              </div>
            </div>
          </div>

          {/* SECCIÓN: Ubicación */}
          <div>
            <h4 
              className="text-md font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Ubicación
            </h4>
            <div className="space-y-2 text-sm">
              <p style={{ color: "var(--color-text-secondary)" }}>
                {CONTACT_INFO.address.street}
              </p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}
              </p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {CONTACT_INFO.address.province}, {CONTACT_INFO.address.country}
              </p>
              <div className="mt-3">
                <a 
                  href={CONTACT_INFO.coordinates.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-accent)" }}
                >
                  📍 Ver en Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* SECCIÓN: Redes Sociales */}
          <div>
            <h4 
              className="text-md font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Síguenos
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <a 
                  href={CONTACT_INFO.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  📷 Instagram
                </a>
              </div>
              <div>
                <a 
                  href={CONTACT_INFO.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  📘 Facebook
                </a>
              </div>
              <div>
                <a 
                  href={CONTACT_INFO.social.tripadvisor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  ✈️ TripAdvisor
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div 
          className="border-t my-8"
          style={{ borderColor: "var(--color-border-secondary)" }}
        />

        {/* Footer bottom: Copyright y créditos */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div style={{ color: "var(--color-text-secondary)" }}>
            <p>
              © {new Date().getFullYear()} Restaurante Eimar. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span style={{ color: "var(--color-text-secondary)" }}>
              Desarrollado por
            </span>
            <a 
              href="https://tu-portafolio.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline transition-colors duration-200"
              style={{ color: "var(--color-text-accent)" }}
            >
              Tu Nombre
            </a>
          </div>
        </div>

        {/* Enlaces legales */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 text-xs border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
          <Link 
            href="/politica-privacidad"
            className="hover:underline transition-colors duration-200"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Política de Privacidad
          </Link>
          <span style={{ color: "var(--color-border-primary)" }}>|</span>
          <Link 
            href="/politica-cookies"
            className="hover:underline transition-colors duration-200"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Política de Cookies
          </Link>
          <span style={{ color: "var(--color-border-primary)" }}>|</span>
          <Link 
            href="/aviso-legal"
            className="hover:underline transition-colors duration-200"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Aviso Legal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;