"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn, handleNavigationClick } from "@/lib/utils";
import { NAVIGATION_DATA } from "@/constants/navigation";

interface NavigationProps {
  isMobile?: boolean;
  showSubItems?: boolean;
  className?: string;
  onItemClick?: () => void;
}

const Navigation = ({ isMobile = false, showSubItems = false, className, onItemClick }: NavigationProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Determinar qué elementos mostrar usando datos centralizados
  const navigationItems = showSubItems 
    ? NAVIGATION_DATA.all 
    : NAVIGATION_DATA.all.filter(item => !item.isSubItem);

  const linkBaseClasses = "font-accent text-lg transition-colors duration-200";
  const linkVariants = {
    desktop: "px-4 py-2 rounded-lg hover:bg-bg-accent/10",
    mobile: "block py-4 hover:bg-bg-accent/5 border-b border-accent/10 last:border-b-0 text-right",
  };
  const linkStates = {
    active: "text-text-accent font-semibold bg-bg-accent/10",
    inactive: "text-text-primary hover:text-text-accent",
  };

  // Función para obtener clases específicas de padding según si es subitem (solo móvil)
  const getMobilePadding = (item: any) => {
    return item.isSubItem ? "px-10" : "px-6";
  };

  return (
    <nav
      className={cn(
        "flex", 
        isMobile ? "flex-col" : "items-center space-x-2",
        className
      )}
    >
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              linkBaseClasses,
              isMobile ? linkVariants.mobile : linkVariants.desktop,
              isMobile && getMobilePadding(item),
              isActive ? linkStates.active : linkStates.inactive,
              // Estilo especial para subitems en mobile
              item.isSubItem && isMobile && "text-sm text-text-secondary"
            )}
            onClick={(e) => {
              // Si es mobile, cerrar menú primero y ejecutar scroll después
              if (isMobile && onItemClick) {
                onItemClick(); // Cerrar menú inmediatamente
                // Pequeño delay para que el menú termine de cerrarse
                setTimeout(() => {
                  handleNavigationClick(e, item.href, pathname, router, { 
                    onComplete: undefined,
                    isMobile: true 
                  });
                }, 100);
              } else {
                // Desktop: comportamiento normal
                handleNavigationClick(e, item.href, pathname, router, { 
                  onComplete: onItemClick 
                });
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
      
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
