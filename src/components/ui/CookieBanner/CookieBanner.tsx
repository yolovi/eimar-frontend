/**
 * COOKIE BANNER COMPONENT - EIMAR
 * ===============================
 *
 * Banner simple de consentimiento de cookies que cumple con RGPD.
 * Se muestra al usuario la primera vez que visita el sitio.
 *
 * CARACTERÍSTICAS:
 * - Diseño minimalista siguiendo estética Eimar
 * - LocalStorage para recordar consentimiento
 * - Animación suave de entrada/salida
 * - Enlaces a política de cookies
 *
 * USO:
 * import CookieBanner from '@/components/ui/CookieBanner';
 * <CookieBanner />
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CookieBannerProps {
  className?: string;
}

const CookieBanner = ({ className }: CookieBannerProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se ha dado consentimiento
    const hasConsent = localStorage.getItem("eimar-cookies-accepted");
    if (!hasConsent) {
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1500); // Mostrar después de 1.5s
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("eimar-cookies-accepted", "all");
    hideBanner();
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("eimar-cookies-accepted", "necessary");
    hideBanner();
  };

  const hideBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className
      )}
      style={{ 
        backgroundColor: "var(--color-bg-primary)",
        borderTopColor: "var(--color-border-primary)"
      }}
    >
      <div className="border-t shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 max-w-6xl mx-auto">
            
            {/* Texto del banner */}
            <div className="flex-1 text-sm">
              <p style={{ color: "var(--color-text-secondary)" }}>
                🍪 Utilizamos cookies para mejorar tu experiencia de navegación y analizar el uso de la web. 
                Puedes aceptar todas las cookies o solo las necesarias para el funcionamiento básico.
              </p>
              <div className="mt-2">
                <Link 
                  href="/politica-cookies"
                  className="text-xs underline hover:no-underline transition-all duration-200"
                  style={{ color: "var(--color-text-accent)" }}
                >
                  Más información sobre cookies
                </Link>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={handleAcceptNecessary}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 hover:bg-opacity-80"
                style={{ 
                  color: "var(--color-text-secondary)",
                  borderColor: "var(--color-border-primary)",
                  backgroundColor: "transparent"
                }}
              >
                Solo necesarias
              </button>
              
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{ 
                  backgroundColor: "var(--color-bg-accent)",
                  color: "var(--color-text-contrast)"
                }}
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;