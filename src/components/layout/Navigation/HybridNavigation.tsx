"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface HybridNavigationProps {
  variant: "desktop-about" | "desktop-main" | "mobile-full";
  className?: string;
}

const allNavigationItems = [
  // Elemento principal (home/about) - solo para mobile
  { href: "/", label: "Nuestra Esencia" },
  // Carta con subelementos
  { href: "/nuestra-carta", label: "Nuestra Carta" },
  { href: "/nuestra-carta/almuerzos", label: "Almuerzos", isSubItem: true },
  { href: "/nuestra-carta/carta", label: "Carta", isSubItem: true },
  { href: "/nuestra-carta/menus", label: "Menús", isSubItem: true },
  // Resto de navegación
  { href: "/reservas-y-pedidos", label: "Reservas y Pedidos" },
  { href: "/contacto", label: "Contacto" },
];

const HybridNavigation = ({ variant, className }: HybridNavigationProps) => {
  const pathname = usePathname();

  // Determinar qué elementos mostrar según la variante
  const getNavigationItems = () => {
    switch (variant) {
      case "desktop-about":
        // Ya no se usa en desktop, ahora el logo es el enlace principal
        return [];
      case "desktop-main":
        // Ya no se usa, ahora usamos el componente DesktopNavigation en Header
        return [];
      case "mobile-full":
        return allNavigationItems; // Todos los elementos incluyendo subitems
      default:
        return allNavigationItems;
    }
  };

  const items = getNavigationItems();
  const isMobile = variant === "mobile-full";

  const linkBaseClasses = "font-accent transition-colors duration-200";
  const linkVariants = {
    desktop: "px-4 py-2 rounded-lg hover:bg-accent/10",
    mobile: "block py-4 hover:bg-accent/5 border-b border-accent/10 last:border-b-0 text-right",
  };
  const linkStates = {
    active: "text-accent font-semibold bg-accent/10",
    inactive: "text-primary hover:text-accent",
  };

  // Función para obtener clases específicas de padding según si es subitem
  const getMobilePadding = (item: any) => {
    return item.isSubItem ? "px-10" : "px-6"; // Más padding para subitems
  };

  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "flex",
        isMobile ? "flex-col" : "items-center space-x-2",
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              linkBaseClasses,
              isMobile ? linkVariants.mobile : linkVariants.desktop,
              isMobile && getMobilePadding(item), // Aplicar padding específico en mobile
              isActive ? linkStates.active : linkStates.inactive,
              // Estilo especial para subitems en mobile
              item.isSubItem && isMobile && "text-sm text-text-secondary"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default HybridNavigation;
