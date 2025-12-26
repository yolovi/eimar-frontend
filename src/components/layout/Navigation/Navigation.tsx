"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, smoothScrollTo } from "@/lib/utils";
import { NAVIGATION_DATA } from "@/constants/navigation";

interface NavigationProps {
  isMobile?: boolean;
  showSubItems?: boolean;
  className?: string;
  onItemClick?: () => void;
}

const Navigation = ({ isMobile = false, showSubItems = false, className, onItemClick }: NavigationProps) => {
  const pathname = usePathname();

  // Determinar qué elementos mostrar usando datos centralizados
  const navigationItems = showSubItems 
    ? NAVIGATION_DATA.all 
    : NAVIGATION_DATA.all.filter(item => !item.isSubItem);

  const linkBaseClasses = "font-accent transition-colors duration-200";
  const linkVariants = {
    desktop: "px-4 py-2 rounded-lg hover:bg-accent/10",
    mobile: "block py-4 hover:bg-accent/5 border-b border-accent/10 last:border-b-0 text-right",
  };
  const linkStates = {
    active: "text-accent font-semibold bg-accent/10",
    inactive: "text-primary hover:text-accent",
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
              if (item.href.startsWith('#')) {
                e.preventDefault();
                
                // Si estamos en una página diferente, ir a la homepage primero
                if (window.location.pathname !== '/') {
                  // Navegar a la homepage con el anchor
                  window.location.href = '/' + item.href;
                  onItemClick?.();
                  return;
                }
                
                // Si estamos en la homepage, hacer scroll usando la función que ya funciona
                const sectionId = item.href.substring(1);
                const section = document.querySelector(`#${sectionId}`);
                
                if (section) {
                  // Usar smoothScrollTo con offset adecuado para el header
                  smoothScrollTo(section, 1500, -120)
                    .then(() => {
                      // Actualizar URL después del scroll
                      window.history.replaceState(null, '', item.href);
                    })
                    .catch(() => {
                      // Fallback
                      window.location.href = '/' + item.href;
                    });
                } else {
                  // Fallback si no encuentra la sección
                  window.location.href = '/' + item.href;
                }
                
                onItemClick?.();
              } else {
                // Para enlaces normales, dejar que Next.js maneje
                onItemClick?.();
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
