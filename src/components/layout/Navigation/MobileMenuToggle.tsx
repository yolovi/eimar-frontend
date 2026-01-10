"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "./Navigation";
import { HeroButton, Button } from "@/components/ui";
import { cn, handleSectionNavigation } from "@/lib/utils";
import { CONTACT_INFO } from "@/constants/contact";

const MobileMenuToggle = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Estilo común para los botones de contacto
  const contactButtonClasses = "flex-1 h-12 px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 backdrop-blur-sm border-2 border-transparent hover:scale-105 hover:shadow-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/60 flex items-center justify-center";

  const contactButtonStyle = {
    backgroundColor: "var(--color-base)",
    color: "var(--color-accent)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  };

  // Función de animación suave personalizada para el sidebar
  const animateSidebar = (isOpening: boolean) => {
    setIsAnimating(true);

    if (isOpening) {
      setShowMenu(true);
    }

    const duration = 800; // Duración más lenta para efecto cinematográfico
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing cúbico suave (igual que el scroll)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const translateX = isOpening ? 100 - ease * 100 : ease * 100;
      const opacity = isOpening ? ease : 1 - ease;

      if (menuRef.current) {
        menuRef.current.style.transform = `translateX(${translateX}%)`;
        menuRef.current.style.opacity = opacity.toString();
      }

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        setIsAnimating(false);
        if (!isOpening) {
          setShowMenu(false);
        }
      }
    };

    requestAnimationFrame(animation);
  };

  // Manejar solo apertura del menú (el cierre se hace desde la X del sidebar)
  const openMenu = () => {
    if (isAnimating || isMobileMenuOpen) return; // Evitar abrir si ya está abierto o animando

    setIsMobileMenuOpen(true);
    animateSidebar(true);
  };

  // Manejar solo cierre del menú (usado por la X del sidebar)
  const closeMenu = () => {
    if (isAnimating || !isMobileMenuOpen) return; // Evitar cerrar si ya está cerrado o animando

    setIsMobileMenuOpen(false);
    animateSidebar(false);
  };
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Prevenir scroll en iOS Safari
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button - Solo hamburguesa (siempre igual) */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1 rounded-md hover:bg-accent/10 transition-colors focus:outline-none cursor-pointer"
        onClick={openMenu}
        disabled={isAnimating}
        aria-label="Abrir menú"
      >
        {/* Hamburger Icon - Siempre igual */}
        <div className="flex flex-col gap-1.5 w-6">
          <span className="w-full h-0.5 bg-primary" />
          <span className="w-full h-0.5 bg-primary" />
          <span className="w-full h-0.5 bg-primary" />
        </div>
      </button>

      {/* Mobile Menu Overlay - Solo mostrar cuando esté visible */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            style={{
              top: "0", // Cubrir toda la pantalla desde arriba
              // height: "100vh", // Altura completa del viewport
              height: "100dvh", // Dynamic viewport height para móviles
            }}
            onClick={closeMenu}
          />

          {/* Slide-in Menu from Right */}
          <div
            ref={menuRef}
            className={cn(
              "fixed right-0 bg-base/98 backdrop-blur-md shadow-2xl z-50 md:hidden",
              "w-72 max-w-[85vw]", // Mayor ancho y mejor proporción
              "overflow-y-auto overscroll-contain" // Scroll interno si es necesario
            )}
            style={{
              top: "0", // Empezar desde arriba
              // height: "100vh", // Altura completa
              height: "100dvh", // Dynamic viewport height
              transform: "translateX(100%)", // Estado inicial fuera de pantalla
              opacity: "0",
              // Mejorar rendimiento en dispositivos móviles
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              WebkitPerspective: "1000px",
              perspective: "1000px",
            }}
          >
            {/* Menu Content */}
            <div className="flex flex-col h-full">
              {/* Botón de cerrar en la esquina superior derecha */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent/20 transition-colors focus:outline-none"
                  aria-label="Cerrar menú"
                >
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Items con texto a la derecha */}
              <div className="flex-1 py-6 px-2 pt-16">
                <Navigation
                  isMobile={true}
                  showSubItems={false}
                  className="text-right"
                  onItemClick={closeMenu}
                />
              </div>

              {/* Actions at Bottom con safe area para dispositivos con notch */}
              <div
                className="p-6 pb-8 border-t border-accent/20 space-y-4 flex flex-col items-center"
                style={{
                  paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
                }}
              >
                {/* Iconos de contacto estilo HeroButton personalizado */}
                <div className="flex gap-4 w-full mb-2">
                  {/* Botón de teléfono */}
                  <button
                    className={contactButtonClasses}
                    style={contactButtonStyle}
                    onClick={() => {
                      window.open(CONTACT_INFO.phone.primary.link, "_self");
                      closeMenu();
                    }}
                    title={`Llamar: ${CONTACT_INFO.phone.primary.display}`}
                    aria-label="Llamar por teléfono"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                    </svg>
                  </button>

                  {/* Botón de WhatsApp */}
                  <button
                    className={contactButtonClasses}
                    style={contactButtonStyle}
                    onClick={() => {
                      window.open(CONTACT_INFO.whatsapp.linkWithReservation, "_blank");
                      closeMenu();
                    }}
                    title={`WhatsApp: ${CONTACT_INFO.whatsapp.display}`}
                    aria-label="Contactar por WhatsApp"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472,14.382c-0.297-0.149-1.758-0.867-2.03-0.967c-0.273-0.099-0.471-0.148-0.670.15c-0.197,0.297-0.767,0.966-0.94,1.164c-0.173,0.199-0.347,0.223-0.644,0.075c-0.297-0.15-1.255-0.463-2.39-1.475c-0.883-0.788-1.48-1.761-1.653-2.059c-0.173-0.297-0.018-0.458,0.13-0.606c0.134-0.133,0.298-0.347,0.446-0.52C9.889,9.367,9.939,9.26,10.037,9.061c0.099-0.198,0.05-0.371-0.025-0.52C9.962,8.390,9.366,6.929,9.143,6.335c-0.220-0.593-0.444-0.513-0.607-0.513C8.39,5.822,8.192,5.822,7.994,5.822c-0.198,0-0.52,0.074-0.792,0.372C6.930,6.491,6.16,7.164,6.16,8.624s1.004,2.319,1.144,2.479c0.139,0.148,1.96,2.994,4.75,4.199c0.664,0.287,1.182,0.458,1.586,0.587c0.668,0.212,1.276,0.182,1.757,0.11c0.536-0.08,1.758-0.719,2.006-1.413c0.248-0.694,0.248-1.289,0.173-1.413C18.452,14.927,18.769,14.531,17.472,14.382z M12.056,21.785c-1.665,0-3.293-0.448-4.718-1.294L2.051,21.8l1.367-4.95C2.51,15.402,2.056,13.681,2.056,11.896c0-5.455,4.434-9.889,9.889-9.889s9.889,4.434,9.889,9.889S17.511,21.785,12.056,21.785z M20.5,11.896c0-4.67-3.819-8.444-8.444-8.444s-8.444,3.774-8.444,8.444c0,1.487,0.389,2.984,1.13,4.300l0.111,0.175l-0.464,1.68l1.717-0.452l0.171,0.102c1.31,0.758,2.799,1.158,4.299,1.158C16.681,20.34,20.5,16.566,20.5,11.896z" />
                    </svg>
                  </button>
                </div>

                <HeroButton
                  variant="primary"
                  size="sm"
                  className="flex items-center justify-center w-full"
                  onClick={() => {
                    closeMenu();
                    handleSectionNavigation(
                      "reservas-y-pedidos",
                      pathname,
                      router,
                      {
                        onComplete: undefined,
                        isMobile: true,
                      }
                    );
                  }}
                >
                  Reservar Mesa
                </HeroButton>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenuToggle;
