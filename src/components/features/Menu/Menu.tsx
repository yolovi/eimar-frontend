'use client';

import { useState, useEffect } from 'react';
import { MENU_DATA } from '@/data';
import type { MenuCategory, MenuItem } from '@/types';
import { smoothScrollTo } from '@/lib/utils';

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * NAVEGACIÓN FIJA DEL MENÚ (Pestañas)
 * ===================================
 * 
 * Navegación horizontal fija que permanece en la parte superior
 * cuando el usuario hace scroll. Estilo tipo pestañas de navegador.
 */
function MenuTabs({ categories, activeCategory, onCategoryChange }: MenuTabsProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-4 whitespace-nowrap text-sm font-medium
                  border-b-2 transition-all duration-200 hover:text-[var(--eimar-green)]
                  ${isActive 
                    ? 'border-[var(--eimar-green)] text-[var(--eimar-green)]' 
                    : 'border-transparent text-gray-600 hover:border-gray-200'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
}

/**
 * TARJETA DE PLATO INDIVIDUAL
 * ==========================
 * 
 * Muestra la información de cada plato con imagen, descripción, 
 * precio y características especiales (vegano, picante, etc.)
 */
function MenuItemCard({ item }: MenuItemCardProps) {
  const badges = [];
  
  if (item.isVegetarian) badges.push({ text: 'Vegetariano', color: 'bg-green-100 text-green-800' });
  if (item.isVegan) badges.push({ text: 'Vegano', color: 'bg-green-100 text-green-800' });
  if (item.isGlutenFree) badges.push({ text: 'Sin Gluten', color: 'bg-blue-100 text-blue-800' });
  if (item.isSpicy) badges.push({ text: '🌶️ Picante', color: 'bg-red-100 text-red-800' });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md group">
      {/* Imagen del plato */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            // Fallback si la imagen no existe
            e.currentTarget.src = '/images/placeholder-food.jpg';
          }}
        />
      </div>
      
      {/* Información del plato */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--eimar-green)] transition-colors">
            {item.name}
          </h3>
          <span className="text-xl font-bold text-[var(--eimar-green)] ml-2">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
          {item.description}
        </p>
        
        {/* Badges de características especiales */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {badges.map((badge, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
        
        {/* Información de alérgenos */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="text-xs text-gray-500">
            <span className="font-medium">Alérgenos:</span> {item.allergens.join(', ')}
          </div>
        )}
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
            <span className="text-4xl mr-3">{category.icon}</span>
            {category.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
        
        {/* Grid de platos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {category.items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
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

  return (
    <div className="min-h-screen bg-gray-50">
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
