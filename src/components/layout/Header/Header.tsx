"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { ActionButton, Button } from "@/components/ui";
import { CONTACT_INFO } from "@/constants/contact";
import { navigateToHome } from "@/lib/utils";
import MobileMenuToggle from "../Navigation/MobileMenuToggle";
import DesktopNavigation from "../Navigation/DesktopNavigation";

//TODO: ajustar los iconos del menú hamburguesa y la distribución (añadir fondos, etc)

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigateToHome(pathname, router);
  };

  return (
    <header className="bg-bg-primary sticky top-0 z-50">
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
                onClick={handleLogoClick}
              >
                <Logo size="md" className="text-text-accent" />
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
              <ActionButton
                action="phone"
                variant="icon"
                size="md"
                style="ghost"
                className="hover:bg-transparent"
              />
            </div>

            {/* Mobile Center: Logo - Link to Home */}
            <div className="shrink-0">
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
              >
                <Logo size="md" className="text-text-accent" />
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
