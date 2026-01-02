/**
 * COMPONENTE DE IMAGEN PARA EL MENÚ
 * =========================================
 * 
 * Maneja las imágenes faltantes sin generar errores en consola.
 * Proporciona múltiples niveles de fallback para desarrollo y producción.
 * 
 * CARACTERÍSTICAS:
 * - Fallback inmediato con placeholder SVG en línea
 * - No depende de archivos externos
 * - Previene errores 404 en consola
 * - Diseño consistente incluso sin imágenes
 * - Indicador visual de "imagen no disponible"
 */

'use client';

import { useState, useEffect } from 'react';

interface MenuImageProps {
  src: string;
  alt: string;
  dishName: string;
  categoryName: string;
  className?: string;
}

/**
 * Función helper para codificar strings a base64 de forma segura
 */
const safeBase64Encode = (str: string): string => {
  try {
    // Primero, escapar caracteres especiales para ASCII
    const asciiStr = str
      .replace(/[áàäâ]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/ç/g, 'c')
      .replace(/•/g, '-')
      .replace(/[^\x00-\x7F]/g, ''); // Remover cualquier carácter no-ASCII restante
    
    return btoa(asciiStr);
  } catch (error) {
    // Si btoa falla, usar una codificación manual básica
    console.warn('Fallback a codificación manual para SVG placeholder');
    return btoa(str.replace(/[^\x00-\x7F]/g, ''));
  }
};

/**
 * Genera un placeholder SVG en línea que nunca falla
 */
const createPlaceholderDataURL = (dishName: string, categoryName: string): string => {
  // Limpiar los nombres para evitar caracteres problemáticos
  const safeDishName = dishName.substring(0, 20); // Limitar longitud
  const safeCategoryName = categoryName.substring(0, 15);
  
  const svg = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <circle cx="150" cy="80" r="20" fill="#e2e8f0"/>
      <rect x="130" y="105" width="40" height="4" rx="2" fill="#e2e8f0"/>
      <rect x="120" y="115" width="60" height="3" rx="1.5" fill="#f1f5f9"/>
      <rect x="110" y="125" width="80" height="3" rx="1.5" fill="#f1f5f9"/>
      <text x="150" y="160" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="12" font-weight="500">
        ${safeDishName}
      </text>
      <text x="150" y="175" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">
        ${safeCategoryName} - Sin imagen
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${safeBase64Encode(svg)}`;
};

const MenuImage: React.FC<MenuImageProps> = ({
  src,
  alt,
  dishName,
  categoryName,
  className = ''
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Crear placeholder único para este plato
  const placeholderSrc = createPlaceholderDataURL(dishName, categoryName);

  // Función para verificar si la imagen existe sin generar error en consola
  const checkImageExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadImage = async () => {
      setIsLoading(true);
      setHasError(false);

      // Verificar si la imagen existe
      const exists = await checkImageExists(src);
      
      if (isCancelled) return;

      if (exists) {
        // La imagen existe, intentar cargarla
        const img = new Image();
        
        img.onload = () => {
          if (!isCancelled) {
            setImageSrc(src);
            setIsLoading(false);
          }
        };
        
        img.onerror = () => {
          if (!isCancelled) {
            setImageSrc(placeholderSrc);
            setHasError(true);
            setIsLoading(false);
          }
        };
        
        img.src = src;
      } else {
        // La imagen no existe, usar placeholder inmediatamente
        setImageSrc(placeholderSrc);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadImage();

    return () => {
      isCancelled = true;
    };
  }, [src, placeholderSrc]);

  return (
    <div className={`relative overflow-hidden bg-gray-50 ${className}`}>
      {/* Indicador de carga */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Cargando...</span>
          </div>
        </div>
      )}

      {/* Imagen principal o placeholder */}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          // Evitar el shimmer de carga si es placeholder
          filter: hasError ? 'none' : undefined
        }}
      />

      {/* Indicador opcional de imagen no disponible */}
      {hasError && !isLoading && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-xs">
          Sin imagen
        </div>
      )}
    </div>
  );
};

export default MenuImage;