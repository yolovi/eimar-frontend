'use client';

import { useState, useEffect } from 'react';
import { MENU_DATA } from '@/data';
import { Header } from '@/components/layout';
import MenuTabs from './MenuTabs';
import { MenuCategorySection } from './MenuCards';

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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  // Cambiar categoría y hacer scroll suave
  const handleCategoryChange = (categoryId: string) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    setActiveCategory(categoryId);
    
    // Cerrar card expandida al cambiar categoría
    setExpandedCard(null);
    
    // Pequeño delay para que la transición sea más suave
    setTimeout(() => {
      setIsScrolling(false);
    }, 300);
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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Detectar scroll para mostrar botón "ir arriba" y navbar en móvil
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mostrar/ocultar botón scroll to top
      setShowScrollTop(currentScrollY > 400);
      
      // Detectar dirección del scroll
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // En móvil, mostrar navbar cuando scrollean hacia arriba y están lejos del top
      const isMobile = window.innerWidth < 768; // md breakpoint
      if (isMobile) {
        if (scrollDirection === 'up' && currentScrollY > 200) {
          setShowNavbar(true);
        } else if (scrollDirection === 'down' || currentScrollY < 100) {
          setShowNavbar(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollDirection]);

  // Detectar hover en la zona superior para desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;
      
      // Mostrar navbar cuando el cursor esté en los primeros 60px de la pantalla
      if (e.clientY < 60) {
        setShowNavbar(true);
      } else if (e.clientY > 150) {
        // Ocultar cuando el cursor baje más de 150px
        setShowNavbar(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" onClick={handleClickOutside}>
      {/* Navbar deslizante desde arriba */}
      <div 
        className={`fixed top-0 left-0 right-0 z-30 bg-bg-primary shadow-lg transform transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </div>

      {/* Header de la página */}
      <div className="bg-bg-primary border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="ds-h1 mb-4">
            Nuestra Carta
          </h1>
          <p className="ds-body-xl max-w-3xl mx-auto">
            Descubre nuestra selección de platos elaborados con ingredientes frescos y de temporada. 
            Cada plato está cuidadosamente preparado para ofrecerte una experiencia gastronómica única.
          </p>
        </div>
      </div>

      {/* Navegación fija tipo pestañas */}
      <MenuTabs 
        categories={MENU_DATA}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
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
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50 w-10 h-10 bg-bg-accent text-text-inverse 
            rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300
            hover:scale-110 hover:bg-bg-accent/90 flex items-center justify-center
          `}
          aria-label="Volver arriba"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

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
