/**
 * DROPDOWN MENU COMPONENT - EIMAR
 * ===============================
 *
 * Componente dropdown para navegación desktop con submenús.
 * Usado específicamente para "Nuestra Carta" con sus opciones.
 *
 * CARACTERÍSTICAS:
 * - Hover para mostrar/ocultar dropdown
 * - Animación suave de entrada/salida
 * - Diseño consistente con navegación Eimar
 * - Enlaces funcionales con scroll automático
 *
 * USO:
 * import DropdownMenu from '@/components/layout/Navigation/DropdownMenu';
 * <DropdownMenu mainItem={carta.main} subItems={carta.subitems} />
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn, handleNavigationClick } from "@/lib/utils";

interface DropdownMenuItem {
  href: string;
  label: string;
}

interface DropdownMenuProps {
  mainItem: DropdownMenuItem;
  subItems: DropdownMenuItem[];
  className?: string;
}

const DropdownMenu = ({ mainItem, subItems, className }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isMainActive = pathname === mainItem.href || pathname.startsWith('/menu');

  return (
    <div 
      className={cn("relative", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Elemento principal del dropdown */}
      <Link
        href={mainItem.href}
        className={cn(
          "font-accent text-lg px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1",
          isMainActive 
            ? "text-text-accent font-semibold bg-bg-accent/10" 
            : "text-text-primary hover:text-text-accent hover:bg-bg-accent/10"
        )}
        onClick={(e) => {
          handleNavigationClick(e, mainItem.href, pathname, router);
        }}
      >
        {mainItem.label}
        <svg 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 min-w-[200px] rounded-lg shadow-lg border z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ 
            backgroundColor: "var(--color-bg-primary)",
            borderColor: "var(--color-border-primary)"
          }}
        >
          <div className="py-2">
            {subItems.map((item, index) => {
              const isSubActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-bg-accent/5",
                    isSubActive
                      ? "text-text-accent bg-bg-accent/10" 
                      : "text-text-primary hover:text-text-accent",
                    index === 0 && "rounded-t-lg",
                    index === subItems.length - 1 && "rounded-b-lg"
                  )}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavigationClick(e, item.href, pathname, router);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;