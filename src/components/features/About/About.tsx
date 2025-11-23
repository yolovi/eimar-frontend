"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isMobile?: boolean;
}

//TODO: ajustar los enlaces al diseño
const navigationItem = { href: "/nuestra-esencia", label: "Nuestra Esencia" };

const About = ({ isMobile = false }: NavigationProps) => {
  const pathname = usePathname();

  const isActive = pathname === navigationItem.href;

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
    <Link
      href={navigationItem.href}
      className={cn(
        linkBaseClasses,
        isMobile ? linkVariants.mobile : linkVariants.desktop,
        isActive ? linkStates.active : linkStates.inactive
      )}
    >
      {navigationItem.label}
    </Link>
  );
};

export default About;
