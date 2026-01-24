"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn, handleNavigationClick } from "@/lib/utils";
import { NAVIGATION_DATA } from "@/constants/navigation";
import DropdownMenu from "./DropdownMenu";

interface NavigationProps {
  isMobile?: boolean;
  showSubItems?: boolean;
  className?: string;
  onItemClick?: () => void;
}

const Navigation = ({ isMobile = false, showSubItems = false, className, onItemClick }: NavigationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Estado para controlar dropdown móvil
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Para móvil, solo usamos la navegación principal (sin subitems legacy)
  const mobileMainItems = NAVIGATION_DATA.main;

  const linkBaseClasses = "font-accent text-lg transition-colors duration-200";
  const linkVariants = {
    desktop: "px-4 py-2 rounded-lg hover:bg-bg-accent/10",
    mobile: "block py-4 hover:bg-bg-accent/5 border-b border-accent/10 last:border-b-0 text-right",
  };
  const linkStates = {
    active: "text-text-accent font-semibold bg-bg-accent/10",
    inactive: "text-text-primary hover:text-text-accent",
  };

  // Función para manejar click en dropdown móvil
  const handleMobileDropdownClick = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  // Función para manejar click en subitem móvil
  const handleMobileSubitemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onItemClick) {
      onItemClick(); // Cerrar menú inmediatamente
      setTimeout(() => {
        handleNavigationClick(e, href, pathname, router, { 
          onComplete: undefined,
          isMobile: true 
        });
      }, 100);
    }
  };

  // Verificar si "Nuestra Carta" está activa
  const isCartaActive = pathname === '/menu' || pathname.startsWith('/menu');

  return (
    <nav
      className={cn(
        "flex", 
        isMobile ? "flex-col" : "items-center space-x-2",
        className
      )}
    >
      {/* Desktop: Dropdown para "Nuestra Carta" + navegación principal */}
      {!isMobile && (
        <>
          <DropdownMenu 
            mainItem={NAVIGATION_DATA.carta.main}
            subItems={NAVIGATION_DATA.carta.subitems}
          />
          {NAVIGATION_DATA.main.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  linkBaseClasses,
                  linkVariants.desktop,
                  isActive ? linkStates.active : linkStates.inactive
                )}
                onClick={(e) => {
                  handleNavigationClick(e, item.href, pathname, router, { 
                    onComplete: onItemClick 
                  });
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </>
      )}

      {/* Mobile: Dropdown para "Nuestra Carta" + navegación principal */}
      {isMobile && (
        <>
          {/* Dropdown "Nuestra Carta" en móvil */}
          <div>
            {/* Header del dropdown clickeable - SIN flecha visible */}
            <button
              onClick={handleMobileDropdownClick}
              className={cn(
                linkBaseClasses,
                linkVariants.mobile,
                "px-6 w-full text-right",
                // Estado activo o dropdown abierto
                (isCartaActive || isMobileDropdownOpen) ? linkStates.active : linkStates.inactive,
                // Fondo adicional cuando dropdown está abierto
                isMobileDropdownOpen && "bg-bg-accent/15 border-b border-accent/20"
              )}
            >
              {NAVIGATION_DATA.carta.main.label}
            </button>

            {/* Subitems del dropdown */}
            {isMobileDropdownOpen && (
              <div className="bg-bg-accent/5">
                {NAVIGATION_DATA.carta.subitems.map((subitem) => {
                  const isSubActive = pathname === subitem.href;
                  
                  return (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        "block py-3 px-10 text-sm font-medium transition-colors duration-200 hover:bg-bg-accent/5 border-b border-accent/10 last:border-b-0 text-right",
                        isSubActive
                          ? "text-text-accent bg-bg-accent/10"
                          : "text-text-secondary hover:text-text-accent"
                      )}
                      onClick={(e) => handleMobileSubitemClick(e, subitem.href)}
                    >
                      {subitem.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navegación principal móvil */}
          {mobileMainItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  linkBaseClasses,
                  linkVariants.mobile,
                  "px-6",
                  isActive ? linkStates.active : linkStates.inactive
                )}
                onClick={(e) => {
                  if (onItemClick) {
                    onItemClick(); // Cerrar menú inmediatamente
                    setTimeout(() => {
                      handleNavigationClick(e, item.href, pathname, router, { 
                        onComplete: undefined,
                        isMobile: true 
                      });
                    }, 100);
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </>
      )}
      
      {/* Enlace al portafolio - Solo en móvil */}
      {isMobile && (
        <div className="mt-6 pt-6 border-t border-accent/10">
          <div className="px-6 mb-3">
            <p className="text-xs font-medium text-text-secondary/70 uppercase tracking-wider">
              Desarrollado por
            </p>
          </div>
          <a
            href="https://tu-portafolio.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 px-6 text-sm font-medium text-text-accent hover:bg-bg-accent/5 transition-colors duration-200"
            onClick={onItemClick} // Cerrar menú al hacer click
          >
            🌐 Ver mi portafolio →
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
