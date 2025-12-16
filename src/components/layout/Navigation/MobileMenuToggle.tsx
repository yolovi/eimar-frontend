"use client";

import React from "react";
import { useState, useEffect } from "react";
import HybridNavigation from "./HybridNavigation";
import { HeroButton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/constants/contact";

const MobileMenuToggle = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button - Solo cambia el icono */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1 rounded-md hover:bg-accent/10 transition-colors focus:outline-none cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          // X Icon
          <div className="relative w-6 h-6">
            <span className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-primary transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all duration-300" />
            <span className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-primary transform -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-300" />
          </div>
        ) : (
          // Hamburger Icon
          <div className="flex flex-col gap-1.5 w-6">
            <span className="w-full h-0.5 bg-primary transition-all duration-300" />
            <span className="w-full h-0.5 bg-primary transition-all duration-300" />
            <span className="w-full h-0.5 bg-primary transition-all duration-300" />
          </div>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            style={{ top: "80px" }} // Empieza debajo del navbar
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in Menu from Right */}
          <div
            className={cn(
              "fixed right-0 bg-base/90 shadow-2xl z-50 md:hidden",
              "w-62 max-w-[65vw]",
              "transform transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
            style={{
              top: "56px", // Justo debajo del navbar (altura aproximada)
              height: "calc(100vh - 56px)", // Resta la altura del navbar
            }}
          >
            {/* Menu Content */}
            <div className="flex flex-col h-full">
              {/* Navigation Items con texto a la derecha */}
              <div className="flex-1 py-6">
                <HybridNavigation
                  variant="mobile-full"
                  className="text-right"
                />
              </div>

              {/* Actions at Bottom */}
              <div className="p-6 border-t border-accent/20 space-y-4 flex flex-col items-center">
                <HeroButton
                  variant="secondary"
                  size="sm"
                  className="flex items-center justify-center gap-2 !text-[var(--eimar-green)]"
                  onClick={() => {
                    window.open(CONTACT_INFO.phone.secondary.link, "_self");
                    setIsMobileMenuOpen(false);
                  }}
                  title={`Llamar: ${CONTACT_INFO.phone.secondary.display}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-label="Teléfono"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Llamar
                </HeroButton>
                
                <HeroButton 
                  variant="primary" 
                  size="sm"
                  className="flex items-center justify-center hover:!border-[var(--eimar-green)]"
                  onClick={() => setIsMobileMenuOpen(false)}
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
