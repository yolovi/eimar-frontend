/**
 * COMPONENTE PAGEHEADER REUTILIZABLE
 * ==================================
 * 
 * Header reutilizable para páginas con título y descripción dinámicos.
 * Mantiene los estilos consistentes del diseño.
 */

import { PAGE_HEADERS, type PageHeaderType } from '@/data/page-headers';

export interface PageHeaderProps {
  /** Tipo de página para obtener el contenido automáticamente */
  pageType: PageHeaderType;
  /** Título personalizado (opcional, sobrescribe el automático) */
  customTitle?: string;
  /** Descripción personalizada (opcional, sobrescribe la automática) */
  customDescription?: string;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageType,
  customTitle,
  customDescription,
  className = ""
}) => {
  const headerData = PAGE_HEADERS[pageType];
  const title = customTitle || headerData.title;
  const description = customDescription || headerData.description;

  return (
    <div className={`bg-bg-primary border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="ds-h1 mb-4">
          {title}
        </h1>
        <p className="ds-body-xl max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;