/**
 * FOOTER COMPONENT - EIMAR
 * =========================
 *
 * Footer principal.
 *
 * CARACTERÍSTICAS:
 * - Logo Eimar elaborado
 * - Disposición horizontal: Logo | Contacto | Ubicación | Redes Sociales
 * - Horarios del día con dropdown para horario completo
 * - Tres secciones inferiores: Copyright | Políticas | Créditos desarrollo
 * - Diseño responsive con variables CSS de EIMAR
 *
 * USO:
 * import Footer from '@/components/layout/Footer';
 * <Footer />
 */

"use client";

import React from "react";
import { CONTACT_INFO, getTodaySchedule, SCHEDULE_SUMMARY_INFO } from "@/constants/contact";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const today = getTodaySchedule();
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Estilos reutilizables
  const socialIconStyle = "w-10 h-10 bg-bg-primary rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors";
  const policyLinkStyle = "hover:opacity-80 transition-opacity duration-200 underline";
  
  // Enlaces de políticas
  const policyLinks = [
    { href: "/politica-privacidad", label: "Política de Privacidad" },
    { href: "/politica-cookies", label: "Política de Cookies" },
    { href: "/aviso-legal", label: "Aviso Legal" }
  ];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFullSchedule(false);
      }
    };

    if (showFullSchedule) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showFullSchedule]);

  const currentDate = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <footer 
      className={cn("border-t", className)}
      style={{ 
        backgroundColor: "var(--color-bg-secondary)",
        borderColor: "var(--color-border-primary)"
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Sección principal horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Logo Eimar elaborado */}
          <div className="flex justify-center md:justify-start">
            <div className="w-48 h-auto">
              <Image
                src="/images/logos/eimar-logo-footer.png"
                alt="Restaurante Eimar - Esencia Mediterránea"
                width={192}
                height={120}
                className="w-full h-auto"
                style={{ filter: "brightness(0) invert(1)" }} // Para que se vea blanco sobre fondo negro
              />
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 
              className="ds-h5 mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Contacto
            </h4>
            <div className="space-y-2 ds-body-sm">
              <div>
                <a 
                  href={CONTACT_INFO.phone.primary.link}
                  className="hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {CONTACT_INFO.phone.primary.display}
                </a>
              </div>
              <div>
                <span style={{ color: "var(--color-text-muted)" }}>WhatsApp</span>
              </div>
              <div>
                <a 
                  href={`mailto:${CONTACT_INFO.email.main}`}
                  className="hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {CONTACT_INFO.email.main}
                </a>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <h4 
              className="ds-h5 mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Ubicación
            </h4>
            <div className="space-y-1 ds-body-sm">
              <p style={{ color: "var(--color-text-muted)" }}>{CONTACT_INFO.address.street}</p>
              <p style={{ color: "var(--color-text-muted)" }}>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}</p>
              <p style={{ color: "var(--color-text-muted)" }}>{CONTACT_INFO.address.province}, {CONTACT_INFO.address.country}</p>
              <div className="mt-3">
                <a 
                  href={CONTACT_INFO.coordinates.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "var(--color-text-accent)" }}
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Iconos RRSS y Horarios */}
          <div>
            {/* Iconos de redes sociales */}
            <div className="flex gap-3 mb-4 justify-center md:justify-start">
              <a 
                href={CONTACT_INFO.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconStyle}
              >
                <span className="text-text-primary text-sm font-bold">f</span>
              </a>
              <a 
                href={CONTACT_INFO.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconStyle}
              >
                <span className="text-text-primary text-sm font-bold">📷</span>
              </a>
              <a 
                href={CONTACT_INFO.social.tripadvisor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconStyle}
              >
                <span className="text-text-primary text-sm font-bold">🔗</span>
              </a>
            </div>

            {/* Fecha y horarios */}
            <div className="text-center md:text-left">
              <div className="ds-body-sm mb-2">
                <p style={{ color: "var(--color-text-muted)" }}><strong>Hoy:</strong> {today.formatted}</p>
                <p className="text-xs opacity-80 capitalize" style={{ color: "var(--color-text-muted)" }}>{currentDate}</p>
              </div>
              
              {/* Dropdown de horario completo */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  className="ds-body-xs underline hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-text-accent)" }}
                >
                  {showFullSchedule ? "Ocultar horarios ▼" : "Ver horario completo ▶"}
                </button>
                
                {showFullSchedule && (
                  <div className="absolute bottom-full mb-2 left-0 bg-bg-primary text-text-primary rounded-lg shadow-lg p-4 min-w-56 z-10">
                    <h5 className="font-semibold text-sm mb-3">Horario</h5>
                    <div className="space-y-2">
                      {SCHEDULE_SUMMARY_INFO.map((schedule, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-medium">{schedule.label}</span>
                          <span className={schedule.isOpen ? "text-green-600" : "text-red-600"}>
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div 
          className="border-t my-8"
          style={{ borderColor: "var(--color-border-secondary)" }}
        />

        {/* Tres contenedores inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* 1. Restaurante Eimar - Todos los derechos */}
          <div>
            <p 
              className="ds-body-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              © {new Date().getFullYear()} Restaurante Eimar.<br />
              Todos los derechos reservados.
            </p>
          </div>
          
          {/* 2. Políticas */}
          <div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 ds-body-xs">
              {policyLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link 
                    href={link.href}
                    className={policyLinkStyle}
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {link.label}
                  </Link>
                  {index < policyLinks.length - 1 && (
                    <span style={{ color: "var(--color-text-muted)" }}>•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* 3. Desarrollado por */}
          <div>
            <div className="flex items-center justify-center md:justify-end gap-2">
              <span 
                className="ds-body-sm"
                style={{ color: "var(--color-text-inverse)" }}
              >
                Desarrollado por
              </span>
              <a 
                href="https://komorebi.es" 
                target="_blank"
                rel="noopener noreferrer"
                className="ds-body-sm font-medium hover:opacity-80 transition-opacity duration-200 underline"
                style={{ color: "var(--color-text-accent)" }}
              >
                Komorebi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;