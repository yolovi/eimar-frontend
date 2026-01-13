'use client';

import { useState, useEffect, useRef } from 'react';
import { MENU_DATA } from '@/data';
import type { MenuCategory, MenuItem } from '@/types';
import { MenuImage } from '@/components/ui';
import { Header } from '@/components/layout';

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * NAVEGACIÓN FIJA DEL MENÚ (Badges/Botones)
 * =========================================
 * 
 * Navegación horizontal fija con estilo badge minimalista.
 * Se mantiene visible durante el scroll para fácil navegación.
 * Adapta su comportamiento según el espacio disponible.
 */
function MenuTabs({ categories, activeCategory, onCategoryChange }: MenuTabsProps) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Verificar si hay overflow y posición del scroll
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const hasOverflowContent = scrollWidth > clientWidth;
      
      setHasOverflow(hasOverflowContent);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Indicador izquierdo */}
          {hasOverflow && canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-1 w-8 bg-linear-to-r from-white to-transparent z-10 pointer-events-none flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400 opacity-60 flex items-center justify-center">
                <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </div>
            </div>
          )}
          
          {/* Indicador derecho */}
          {hasOverflow && canScrollRight && (
            <div className="absolute right-0 top-0 bottom-1 w-8 bg-linear-to-l from-white to-transparent z-10 pointer-events-none flex items-center justify-end">
              <div className="w-4 h-4 rounded-full bg-gray-400 opacity-60 flex items-center justify-center">
                <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </div>
            </div>
          )}

          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className={`flex gap-2 overflow-x-auto scrollbar-hide pb-1 ${
              hasOverflow ? 'justify-start' : 'justify-center'
            }`}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    transition-all duration-200 text-center
                    ${hasOverflow 
                      ? 'shrink-0' 
                      : 'flex-1 min-w-0'
                    }
                    ${isActive 
                      ? 'bg-(--eimar-green) text-white! shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }
                  `}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  category: MenuCategory;
  isExpanded: boolean;
  onCardClick: (cardId: string, event: React.MouseEvent) => void;
}

/**
 * TARJETA DE PLATO INDIVIDUAL
 * ==========================
 * 
 * Muestra la información de cada plato con imagen, descripción, 
 * precio y características especiales (vegano, picante, etc.)
 * Incluye funcionalidad de expansión para descripciones largas.
 */
function MenuItemCard({ item, category, isExpanded, onCardClick }: MenuItemCardProps) {
  const badges = [];
  
  if (item.isVegetarian) badges.push({ text: 'Vegetariano', color: 'bg-green-100 text-green-800' });
  if (item.isVegan) badges.push({ text: 'Vegano', color: 'bg-green-100 text-green-800' });
  if (item.isGlutenFree) badges.push({ text: 'Sin Gluten', color: 'bg-blue-100 text-blue-800' });
  if (item.isSpicy) badges.push({ text: '🌶️ Picante', color: 'bg-red-100 text-red-800' });

  if (isExpanded) {
    return (
      <>
        {/* Overlay de fondo oscuro */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(item.id, e);
          }}
        />
        
        {/* Card expandida */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="
              bg-white rounded-2xl shadow-2xl border border-gray-200 
              max-w-lg w-full max-h-[85vh] overflow-hidden
              transform transition-all duration-300 scale-100
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(item.id, e);
              }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <div className="aspect-4/3 bg-gray-100 relative overflow-hidden">
              <MenuImage
                src={item.image}
                alt={item.name}
                dishName={item.name}
                categoryName={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Contenido */}
            <div className="p-6 space-y-4">
              {/* Título y precio */}
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-gray-900 flex-1">
                  {item.name}
                </h3>
                <span className="text-2xl font-bold text-(--eimar-green) shrink-0">
                  {item.price.toFixed(2)}€
                </span>
              </div>
              
              {/* Descripción */}
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
              
              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Alérgenos */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Alérgenos:</span>
                    <span className="ml-1">{item.allergens.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div 
      className="
        bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden 
        transition-all duration-200 hover:shadow-md group h-full flex flex-col cursor-pointer
        hover:scale-[1.02]
      "
      onClick={(e) => onCardClick(item.id, e)}
    >
      {/* Imagen del plato con manejo de errores */}
      <div className="aspect-square bg-gray-100 shrink-0 relative overflow-hidden">
        <MenuImage
          src={item.image}
          alt={item.name}
          dishName={item.name}
          categoryName={category.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        
        {/* Indicador sutil de expansión */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>
      
      {/* Información del plato */}
      <div className="p-3 flex flex-col grow">
        {/* Layout para móvil (2 columnas) - Título solo */}
        <div className="md:hidden mb-2">
          <h3 className="font-semibold text-(--text-primary) group-hover:text-(--eimar-green) transition-colors line-clamp-2 min-h-10">
            {item.name}
          </h3>
        </div>
        
        {/* Layout para tablet/desktop (3-4 columnas) - Título y precio en línea */}
        <div className="hidden md:flex justify-between items-start mb-2 min-h-10">
          <h3 className="font-semibold text-(--text-primary) group-hover:text-(--eimar-green) transition-colors line-clamp-2 flex-1">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-(--eimar-green) ml-2 shrink-0">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        <p className="text-gray-600 text-xs leading-relaxed grow line-clamp-3 mb-2 min-h-12">
          {item.description}
        </p>
        
        {/* Precio para móvil - Debajo de la descripción */}
        <div className="md:hidden mb-2">
          <span className="text-lg font-bold text-(--eimar-green)">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        {/* Badges de características especiales */}
        <div className="min-h-6 mb-2">
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Información de alérgenos */}
        <div className="mt-auto min-h-4">
          {item.allergens && item.allergens.length > 0 && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Alérgenos:</span> {item.allergens.join(', ')}
            </div>
          )}
        </div>
        
        {/* Indicador sutil de que se puede expandir */}
        <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-(--eimar-green) font-medium">
            Ver detalles
          </span>
        </div>
      </div>
    </div>
  );
}

interface MenuCategoryProps {
  category: MenuCategory;
  isActive: boolean;
  expandedCard: string | null;
  onCardClick: (cardId: string, event: React.MouseEvent) => void;
}

/**
 * SECCIÓN DE CATEGORÍA DEL MENÚ
 * =============================
 * Muestra una categoría completa con su descripción y todos sus platos en formato grid.
 */
function MenuCategorySection({ category, isActive, expandedCard, onCardClick }: MenuCategoryProps) {
  return (
    <section
      id={`menu-${category.id}`}
      className={`py-8 ${isActive ? 'block' : 'hidden'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la categoría */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {category.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
        
        {/* Grid de platos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {category.items.map((item) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              category={category}
              isExpanded={expandedCard === item.id}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

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
        className={`fixed top-0 left-0 right-0 z-30 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </div>

      {/* Header de la página */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestra Carta
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
            fixed bottom-6 right-6 z-50 w-12 h-12 bg-(--eimar-green) text-white 
            rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300
            hover:scale-110 hover:bg-(--eimar-green)/90 flex items-center justify-center
          `}
          aria-label="Volver arriba"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer con información adicional */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Alérgenos</h4>
              <p>Consulta con nuestro personal sobre alérgenos e intolerancias alimentarias</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ingredientes</h4>
              <p>Utilizamos productos frescos y de temporada de proveedores locales</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Precios</h4>
              <p>Precios válidos hasta nueva actualización. IVA incluido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
