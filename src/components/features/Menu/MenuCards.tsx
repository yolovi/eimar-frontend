'use client';

import type { MenuCategory, MenuItem } from '@/types';
import { Image } from '@/components/ui';

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
export function MenuItemCard({ item, category, isExpanded, onCardClick }: MenuItemCardProps) {
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
          className="fixed inset-0 bg-bg-secondary/60 backdrop-blur-sm z-50 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(item.id, e);
          }}
        />
        
        {/* Card expandida */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="
              bg-bg-primary rounded-2xl shadow-2xl border border-gray-superlight 
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
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-bg-primary/90 hover:bg-bg-primary shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <div className="aspect-4/3 bg-bg-superlight relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                placeholderText={item.name}
                secondaryText={`${category.name} - Sin imagen`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Contenido */}
            <div className="p-6 space-y-4">
              {/* Título y precio */}
              <div className="flex justify-between items-start gap-4">
                <h3 className="ds-h3 flex-1">
                  {item.name}
                </h3>
                <span className="ds-h4 shrink-0" style={{ color: "var(--color-text-accent)" }}>
                  {item.price.toFixed(2)}€
                </span>
              </div>
              
              {/* Descripción */}
              <p className="ds-body-xl">
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
                <div className="pt-2 border-t border-gray-superlight">
                  <div className="ds-body-sm">
                    <span className="ds-label">Alérgenos:</span>
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
        bg-bg-primary rounded-lg shadow-sm border border-gray-superlight overflow-hidden 
        transition-all duration-200 hover:shadow-md group h-full flex flex-col cursor-pointer
        hover:scale-[1.02]
      "
      onClick={(e) => onCardClick(item.id, e)}
    >
      {/* Imagen del plato con manejo de errores */}
      <div className="aspect-square bg-bg-superlight shrink-0 relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          placeholderText={item.name}
          secondaryText={`${category.name} - Sin imagen`}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        
        {/* Indicador sutil de expansión */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-3 h-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>
      
      {/* Información del plato */}
      <div className="p-3 flex flex-col grow">
        {/* Layout para móvil (2 columnas) - Título solo */}
        <div className="md:hidden mb-2">
          <h3 className="ds-label group-hover:text-(--color-text-accent) transition-colors line-clamp-2 min-h-10">
            {item.name}
          </h3>
        </div>
        
        {/* Layout para tablet/desktop (3-4 columnas) - Título y precio en línea */}
        <div className="hidden md:flex justify-between items-start mb-2 min-h-10">
          <h3 className="ds-label group-hover:text-(--color-text-accent) transition-colors line-clamp-2 flex-1">
            {item.name}
          </h3>
          <span className="ds-label ml-2 shrink-0" style={{ color: "var(--color-text-accent)" }}>
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        <p className="ds-body-sm leading-relaxed grow line-clamp-3 mb-2 min-h-12">
          {item.description}
        </p>
        
        {/* Precio para móvil - Debajo de la descripción */}
        <div className="md:hidden mb-2">
          <span className="ds-label" style={{ color: "var(--color-text-accent)" }}>
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
            <div className="ds-body-sm">
              <span className="ds-label">Alérgenos:</span> {item.allergens.join(', ')}
            </div>
          )}
        </div>
        
        {/* Indicador sutil de que se puede expandir */}
        <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="ds-body-sm" style={{ color: "var(--color-text-accent)" }}>
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
export function MenuCategorySection({ category, isActive, expandedCard, onCardClick }: MenuCategoryProps) {
  return (
    <section
      id={`menu-${category.id}`}
      className={`py-8 ${isActive ? 'block' : 'hidden'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la categoría */}
        <div className="text-center mb-8">
          <h2 className="ds-section-title mb-3">
            {category.name}
          </h2>
          <p className="ds-body-large max-w-2xl mx-auto">
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