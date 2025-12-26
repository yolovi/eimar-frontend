"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
              handleNavigationClick(e, item.href, onItemClick);
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
