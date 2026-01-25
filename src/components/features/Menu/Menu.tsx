'use client';

import { useState, useEffect } from 'react';
import { MENU_DATA } from '@/data';
import { Header } from '@/components/layout';
import { PageHeader, ScrollToTopButton } from '@/components/ui';
import MenuTabs from './MenuTabs';
import { MenuCategorySection } from './MenuCards';
import { useIsMobile } from '@/hooks';

/**
 * COMPONENTE PRINCIPAL DEL MENÚ
 * =============================
 * 
 * Página completa del menú con navegación fija tipo pestañas.
 * Maneja el estado de la categoría activa y el scroll entre secciones.
 */
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_DATA[0]?.id || 'entrantes');
  const [isScrolling, setIsScrolling] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Hook para detectar mobile de forma reactiva
  const isMobile = useIsMobile();

  // Cambiar categoría y hacer scroll suave
  const handleCategoryChange = (categoryId: string) => {
    // No es necesario el chequeo de isScrolling si usamos CSS para el scroll
    setActiveCategory(categoryId);
    
    // Cerrar card expandida al cambiar categoría
    setExpandedCard(null);

    const element = document.getElementById(categoryId);
    if (element) {
      // Hacemos un scroll suave a la sección
      // El offset se ajustará dependiendo de si el navbar y las tabs están visibles
      const headerOffset = (!isMobile) ? 160 : 80; // Ajusta este valor según la altura de tus headers fijos
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Manejar click en cards con timer para evitar activaciones accidentales
  const handleCardClick = (cardId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Si hay un timer corriendo, cancelarlo (doble click o click rápido)
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
      return;
    }

    // Si la card ya está expandida, colapsarla inmediatamente
    if (expandedCard === cardId) {
      setExpandedCard(null);
      return;
    }

    // Establecer un timer para expandir la card después de 150ms
    // Esto evita expandir por error al scrollear o tocar por accidente
    const timer = setTimeout(() => {
      setExpandedCard(cardId);
      setClickTimer(null);
    }, 150);
    
    setClickTimer(timer);
  };

  // Cerrar card expandida al hacer click fuera
  const handleClickOutside = () => {
    if (expandedCard) {
      setExpandedCard(null);
    }
    // También cancelar cualquier timer pendiente
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
    }
  };

  // Limpiar timer al desmontar el componente
  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
    };
  }, [clickTimer]);

  // Detectar scroll para mostrar navbar y actualizar categoría activa
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // --- Lógica de visibilidad del Navbar ---
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      if (isMobile) {
        if (scrollDirection === 'up' && currentScrollY > 200) {
          setShowNavbar(true);
        } else if (scrollDirection === 'down' || currentScrollY < 100) {
          setShowNavbar(false);
        }
      }
      
      setLastScrollY(currentScrollY);

      // --- Lógica para actualizar la categoría activa en scroll ---
      if (!isScrolling) {
        let currentCategory = '';
        const headerOffset = (!isMobile) ? 180 : 100; // Offset mayor para asegurar que el título esté visible

        for (const category of MENU_DATA) {
          const element = document.getElementById(category.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= headerOffset) {
              currentCategory = category.id;
            }
          }
        }

        if (currentCategory && activeCategory !== currentCategory) {
          setActiveCategory(currentCategory);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollDirection, isMobile, activeCategory, isScrolling]);

  // Detectar hover en la zona superior para desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      
      if (e.clientY < 60) {
        setShowNavbar(true);
      } else if (e.clientY > 150 && window.scrollY > 200) { // Ocultar solo si hemos scrolleado un poco
        setShowNavbar(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-50" onClick={handleClickOutside}>
      {/* Navbar deslizante desde arriba */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 bg-bg-primary transform transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </div>

      {/* Header de la página */}
      <PageHeader pageType="menu" />

      {/* Navegación fija tipo pestañas */}
      <MenuTabs 
        categories={MENU_DATA}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        navbarVisible={showNavbar && !isMobile}
      />

      {/* Contenido del menú */}
      <main>
        {MENU_DATA.map((category) => (
          <MenuCategorySection 
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            expandedCard={expandedCard}
            onCardClick={handleCardClick}
          />
        ))}
      </main>

      {/* Botón scroll to top */}
      <ScrollToTopButton />

      {/* Footer con información adicional */}
      <div className="bg-bg-primary border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-text-secondary">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Alérgenos</h4>
              <p>Consulta con nuestro personal sobre alérgenos e intolerancias alimentarias</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Ingredientes</h4>
              <p>Utilizamos productos frescos y de temporada de proveedores locales</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Precios</h4>
              <p>Precios válidos hasta nueva actualización. IVA incluido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
