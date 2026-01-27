"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "./Navigation";
import { HeroButton, CloseButton, ActionButton } from "@/components/ui";
import { CONTACT_INFO } from "@/constants/contact";
import { cn, handleSectionNavigation } from "@/lib/utils";

const MobileMenuToggle = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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
        className="md:hidden flex flex-col justify-center items-center w-8 h- p-1 rounded-md hover:bg-bg-accent/10 transition-colors focus:outline-none cursor-pointer"
        onClick={openMenu}
        disabled={isAnimating}
        aria-label="Abrir menú"
      >
        {/* Hamburger Icon - Siempre igual */}
        <div className="flex flex-col gap-1.5 w-6">
          <span className="w-full bg-bg-secondary" style={{ height: '1.5px' }} />
          <span className="w-full bg-bg-secondary" style={{ height: '1.5px' }} />
          <span className="w-full bg-bg-secondary" style={{ height: '1.5px' }} />
        </div>
      </button>

      {/* Mobile Menu Overlay - Solo mostrar cuando esté visible */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-bg-secondary/50 z-50 md:hidden"
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
              "fixed right-0 bg-bg-primary/98 backdrop-blur-md shadow-2xl z-50 md:hidden",
              "w-72 max-w-[85vw]", // Mayor ancho y mejor proporción
              "overflow-y-auto overscroll-contain" // Scroll interno si es necesario
            )}
            style={{
              top: "0",
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
              <CloseButton 
                onClick={closeMenu}
                ariaLabel="Cerrar menú"
              />

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
                  <ActionButton 
                    action="phone" 
                    variant="icon"
                    size="md"
                    style="primary"
                    fullWidth
                    onClose={closeMenu}
                  />
                  <ActionButton 
                    action="whatsapp" 
                    variant="icon"
                    size="md"
                    style="primary"
                    fullWidth
                    onClose={closeMenu}
                  />
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

                {/* Línea divisoria */}
                <div className="w-full h-px bg-accent/20 my-4" />

                {/* Desarrollado por */}
                <div className="text-center">
                  <p className="text-xs font-medium text-text-secondary/70 mb-2">
                    {CONTACT_INFO.developer.label}
                  </p>
                  <a
                    href={CONTACT_INFO.developer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-text-accent hover:opacity-80 transition-opacity duration-200 underline"
                    onClick={closeMenu}
                  >
                    {CONTACT_INFO.developer.name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenuToggle;
