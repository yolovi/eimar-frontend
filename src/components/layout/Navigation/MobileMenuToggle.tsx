"use client";

import { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation";
import { HeroButton, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/constants/contact";

const MobileMenuToggle = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const translateX = isOpening ? 100 - (ease * 100) : ease * 100;
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
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
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
              "fixed right-0 bg-base/98 backdrop-blur-md shadow-2xl z-40 md:hidden",
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
                  showSubItems={true}
                  className="text-right"
                  onItemClick={closeMenu}
                />
              </div>

              {/* Actions at Bottom con safe area para dispositivos con notch */}
              <div className="p-6 pb-8 border-t border-accent/20 space-y-4 flex flex-col items-center" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center justify-center w-full"
                  onClick={() => {
                    window.open(CONTACT_INFO.phone.secondary.link, "_self");
                    closeMenu();
                  }}
                  title={`Llamar: ${CONTACT_INFO.phone.secondary.display}`}
                >
                  Llamar
                </Button>
                
                <HeroButton 
                  variant="primary" 
                  size="sm"
                  className="flex items-center justify-center w-full"
                  onClick={closeMenu}
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
