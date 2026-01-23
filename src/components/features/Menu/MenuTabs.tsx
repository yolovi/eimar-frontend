'use client';

import { useState, useEffect, useRef } from 'react';
import type { MenuCategory } from '@/types';
import { useIsMobile } from '@/hooks';

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isFixed?: boolean;
}

/**
 * NAVEGACIÓN FIJA DEL MENÚ (Badges/Botones)
 * =========================================
 * 
 * Navegación horizontal con comportamiento adaptativo:
 * - DESKTOP: Se mantiene fija al hacer scroll para fácil navegación
 * - MOBILE: Comportamiento normal para no ocupar espacio
 * Adapta su comportamiento según el espacio disponible.
 */
function MenuTabs({ categories, activeCategory, onCategoryChange, isFixed = false }: MenuTabsProps) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Hook para detectar mobile de forma reactiva
  const isMobile = useIsMobile();

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

  // Detectar scroll para posición fija en desktop
  const handleScroll = () => {
    if (tabsRef.current) {
      const tabsTop = tabsRef.current.offsetTop;
      setIsScrolled(window.scrollY > tabsTop);
    }
  };

  useEffect(() => {
    checkScroll();
    
    window.addEventListener('resize', checkScroll);
    
    // Solo agregar scroll listener en desktop
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('resize', checkScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <div 
      ref={tabsRef}
      className={`
        z-30 bg-bg-primary border-b border-gray-100 py-4
        ${!isMobile && isScrolled 
          ? 'fixed top-0 left-0 right-0 shadow-lg' 
          : 'relative shadow-sm'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Indicador izquierdo */}
          {hasOverflow && canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-1 w-8 bg-linear-to-r from-white to-transparent z-10 pointer-events-none flex items-center">
              <div className="w-4 h-4 rounded-full bg-text-tertiary opacity-60 flex items-center justify-center">
                <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </div>
            </div>
          )}
          
          {/* Indicador derecho */}
          {hasOverflow && canScrollRight && (
            <div className="absolute right-0 top-0 bottom-1 w-8 bg-linear-to-l from-white to-transparent z-10 pointer-events-none flex items-center justify-end">
              <div className="w-4 h-4 rounded-full bg-text-tertiary opacity-60 flex items-center justify-center">
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
                      ? 'bg-bg-accent text-text-inverse shadow-md' 
                      : 'bg-bg-secondary/10 text-text-secondary hover:bg-bg-accent/40 hover:text-text-primary'
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

export default MenuTabs;