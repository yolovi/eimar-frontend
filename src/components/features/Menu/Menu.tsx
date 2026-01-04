'use client';

import { useState, useEffect, useRef } from 'react';
import { MENU_DATA } from '@/data';
import type { MenuCategory, MenuItem } from '@/types';
import { smoothScrollTo } from '@/lib/utils';
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
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Indicador izquierdo */}
          {hasOverflow && canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-1 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400 opacity-60 flex items-center justify-center">
                <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </div>
            </div>
          )}
          
          {/* Indicador derecho */}
          {hasOverflow && canScrollRight && (
            <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none flex items-center justify-end">
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
                      ? 'flex-shrink-0' 
                      : 'flex-1 min-w-0'
                    }
                    ${isActive 
                      ? 'bg-[var(--eimar-green)] text-white shadow-md' 
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
}

/**
 * TARJETA DE PLATO INDIVIDUAL
 * ==========================
 * 
 * Muestra la información de cada plato con imagen, descripción, 
 * precio y características especiales (vegano, picante, etc.)
 */
function MenuItemCard({ item, category }: MenuItemCardProps) {
  const badges = [];
  
  if (item.isVegetarian) badges.push({ text: 'Vegetariano', color: 'bg-green-100 text-green-800' });
  if (item.isVegan) badges.push({ text: 'Vegano', color: 'bg-green-100 text-green-800' });
  if (item.isGlutenFree) badges.push({ text: 'Sin Gluten', color: 'bg-blue-100 text-blue-800' });
  if (item.isSpicy) badges.push({ text: '🌶️ Picante', color: 'bg-red-100 text-red-800' });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md group h-full flex flex-col">
      {/* Imagen del plato con manejo de errores */}
      <div className="aspect-square bg-gray-100 flex-shrink-0">
        <MenuImage
          src={item.image}
          alt={item.name}
          dishName={item.name}
          categoryName={category.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      
      {/* Información del plato */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Layout para móvil (2 columnas) - Título solo */}
        <div className="md:hidden mb-2">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--eimar-green)] transition-colors line-clamp-2 min-h-[2.5rem]">
            {item.name}
          </h3>
        </div>
        
        {/* Layout para tablet/desktop (3-4 columnas) - Título y precio en línea */}
        <div className="hidden md:flex justify-between items-start mb-2 min-h-[2.5rem]">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--eimar-green)] transition-colors line-clamp-2 flex-1">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-[var(--eimar-green)] ml-2 flex-shrink-0">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        <p className="text-gray-600 text-xs leading-relaxed flex-grow line-clamp-3 mb-2 min-h-[3rem]">
          {item.description}
        </p>
        
        {/* Precio para móvil - Debajo de la descripción */}
        <div className="md:hidden mb-2">
          <span className="text-lg font-bold text-[var(--eimar-green)]">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        {/* Badges de características especiales */}
        <div className="min-h-[1.5rem] mb-2">
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
        <div className="mt-auto min-h-[1rem]">
          {item.allergens && item.allergens.length > 0 && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Alérgenos:</span> {item.allergens.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MenuCategoryProps {
  category: MenuCategory;
  isActive: boolean;
}

/**
 * SECCIÓN DE CATEGORÍA DEL MENÚ
 * =============================
 * 
 * Muestra una categoría completa con su descripción y 
 * todos sus platos en formato grid.
 */
function MenuCategorySection({ category, isActive }: MenuCategoryProps) {
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
            <MenuItemCard key={item.id} item={item} category={category} />
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

  // Cambiar categoría y hacer scroll suave
  const handleCategoryChange = (categoryId: string) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    setActiveCategory(categoryId);
    
    // Pequeño delay para que la transición sea más suave
    setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar deslizante desde arriba */}
      <div 
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
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
          />
        ))}
      </main>

      {/* Botón scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50 w-12 h-12 bg-[var(--eimar-green)] text-white 
            rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300
            hover:scale-110 hover:bg-[var(--eimar-green)]/90 flex items-center justify-center
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Información Adicional
          </h3>
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
