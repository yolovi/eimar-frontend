"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isMobile?: boolean;
}

// logo Eimar: about -->{ href: "/nuestra-esencia", label: "Eimar" }
// const eimarAbout = { href: "/nuestra-esencia" }

//TODO: ajustar los enlaces al diseño
const navigationItems = [
  { href: "/nuestra-carta", label: "Nuestra Carta" },
  { href: "/reservas-y-pedidos", label: "Reservas y Pedidos" },
  { href: "/contacto", label: "Contacto" },
];

const Navigation = ({ isMobile = false }: NavigationProps) => {
  const pathname = usePathname();

  const linkBaseClasses = "font-accent transition-colors duration-200";
  const linkVariants = {
    desktop: "px-4 py-2 rounded-lg hover:bg-accent/10",
    mobile: "block px-4 py-3 border-b border-accent/10 last:border-b-0",
  };
  const linkStates = {
    active: "text-accent font-semibold",
    inactive: "text-primary hover:text-accent",
  };

  return (
    <nav
      className={cn("flex", isMobile ? "flex-col" : "items-center space-x-2")}
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
              isActive ? linkStates.active : linkStates.inactive
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
