import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAVIGATION_DATA } from "@/constants/navigation";

const DesktopNavigation = () => {
  const [isCartaOpen, setIsCartaOpen] = useState(false);

  // Usar datos centralizados
  const { carta, main: navigationItems } = NAVIGATION_DATA;
  const cartaItems = carta.subitems;

  // Función para manejar el delay del cierre del menú
  const handleCloseDropdown = () => {
    setTimeout(() => setIsCartaOpen(false), 150);
  };

  return (
    <nav className="flex items-center space-x-6">
      {/* Nuestra Carta - Desplegable */}
      <div
        className="relative"
        onMouseEnter={() => setIsCartaOpen(true)}
        onMouseLeave={handleCloseDropdown}
      >
        <button className="font-accent px-4 py-2 rounded-lg hover:bg-accent/10 text-primary hover:text-accent transition-colors duration-200 flex items-center gap-1">
          {carta.main.label}
          <svg
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isCartaOpen && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown con padding invisible para evitar el gap */}
        <div
          className={cn(
            "absolute top-full left-0 pt-1 w-48 z-50",
            isCartaOpen ? "block" : "hidden"
          )}
        >
          <div className="bg-base shadow-lg rounded-lg border border-accent/20 py-2">
            {cartaItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-primary hover:bg-accent/10 hover:text-accent transition-colors duration-200 font-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Navegación normal */}
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-accent px-4 py-2 rounded-lg hover:bg-accent/10 text-primary hover:text-accent transition-colors duration-200"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
