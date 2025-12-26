"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui";
import { CONTACT_INFO } from "@/constants/contact";
import MobileMenuToggle from "../Navigation/MobileMenuToggle";
import DesktopNavigation from "../Navigation/DesktopNavigation";

//TODO: ajustar los iconos del menú hamburguesa y la distribución (añadir fondos, etc)

const Header = () => {
  return (
    <header className="bg-base sticky top-0 z-50">
      {/* Borde inferior gris sin llegar a los extremos */}
      <div className="relative">
        <div className="w-full px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center">
            {/* Desktop Left: Logo */}
            <div className="shrink-0">
              <Link 
                href="/" 
                className="hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  // Si estamos en la página principal, scroll to top y limpiar URL
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Limpiar cualquier anchor de la URL
                    window.history.replaceState(null, '', '/');
                  } else {
                    // Si estamos en otra página, navegar a la página principal
                    window.location.href = '/';
                  }
                }}
              >
                <Logo size="md" className="text-primary" />
              </Link>
            </div>

            {/* Desktop Right: Navegación con espaciado */}
            <div className="flex items-center flex-1 justify-end gap-8">
              <DesktopNavigation />

              {/* TODO: Actions - Para futura implementación. Descomentar cuando se implemente */}
              {/* <div className="flex items-center gap-3">
                <Button variant="primary" size="sm">
                  Reservar Mesa
                </Button>
              </div> */}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between">
            {/* Mobile Left: Phone Icon */}
            <div className="shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => window.open(CONTACT_INFO.phone.primary.link, '_self')}
                title={`Llamar: ${CONTACT_INFO.phone.primary.display}`}
              >
                <svg
                  className="w-5 h-5"
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
              </Button>
            </div>

            {/* Mobile Center: Logo - Link to Home */}
            <div className="shrink-0">
              <Link 
                href="/" 
                className="hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  // Si estamos en la página principal, scroll to top y limpiar URL
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Limpiar cualquier anchor de la URL
                    window.history.replaceState(null, '', '/');
                  } else {
                    // Si estamos en otra página, navegar a la página principal
                    window.location.href = '/';
                  }
                }}
              >
                <Logo size="md" className="text-primary" />
              </Link>
            </div>

            {/* Mobile Right: Menu Toggle */}
            <div className="shrink-0">
              <MobileMenuToggle />
            </div>
          </div>
        </div>
        
        {/* Borde inferior que no llega a los extremos */}
        <div className="px-4">
          <div className="border-b border-gray-300"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
