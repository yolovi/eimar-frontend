/**
 * PÁGINA DE MENÚS ESPECIALES - EIMAR PAIPORTA
 * ==========================================
 * 
 * Página dedicada a los menús especiales: diarios y para grupos.
 * Incluye ejemplos y precios de los diferentes menús disponibles.
 * 
 * FUTURO - IMPLEMENTACIÓN DINÁMICA DE MENÚ DIARIO:
 * ------------------------------------------------
 * Para hacer el menú diario dinámico en el futuro:
 * 
 * 1. Opción PDF + Google Drive (RECOMENDADA):
 *    - Crear carpeta compartida en Google Drive
 *    - El dueño sube PDF/imagen del menú cada día
 *    - Usar Google Drive API para obtener último archivo
 *    - Mostrar PDF embebido o convertir a imagen
 * 
 * 2. Opción Google Sheets:
 *    - Hoja de cálculo con formato: Primeros | Segundos | Precio
 *    - Google Sheets API para leer datos
 *    - Fácil de editar desde móvil
 * 
 * 3. Implementación técnica:
 *    ```bash
 *    npm install googleapis
 *    ```
 *    
 *    Crear:
 *    - /api/menu-diario route
 *    - useMenuDiario() hook
 *    - <MenuDiarioDinamico /> component
 *    - Variables env: GOOGLE_API_KEY, DRIVE_FOLDER_ID
 * 
 * 4. Componente condicional:
 *    ```tsx
 *    {menuDinamiscoDisponible ? <MenuDiarioDinamico /> : <MenuDiarioEstatico />}
 *    ```
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { PageHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Menús Especiales - Eimar Paiporta',
  description: 'Menús diarios y especiales para grupos en Eimar Paiporta. Primeros, segundos, postres y bebida incluida.',
  keywords: 'menú diario Paiporta, menú grupos Paiporta, menú especial, restaurante Paiporta',
};

export default function MenusPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Header principal */}
      <PageHeader pageType="menus" />
      
      {/* Botón de navegación */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/menu">
            <Button variant="secondary">
              ← Volver a la Carta
            </Button>
          </Link>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="w-full py-16" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        <div className="max-w-7xl mx-auto px-4 space-y-16">
        
          {/* Menús Diarios */}
          <section>
            <div className="max-w-4xl mx-auto">
              <h2 className="ds-section-title text-center mb-4">
                Menú Diario
              </h2>
              <p className="ds-body-xl text-center mb-12" style={{ color: "var(--color-text-secondary)" }}>
                Algunos de nuestros menús
              </p>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                
                {/* Ejemplo de Menú Diario */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Primeros */}
                  <div>
                    <h3 className="ds-h3 text-center mb-6" style={{ color: "var(--color-text-accent)" }}>
                      PRIMEROS
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Ensaladilla de cangrejo</p>
                      </div>
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Calabacín relleno de carne</p>
                      </div>
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Lentejas de la abuela</p>
                      </div>
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Albóndigas veganas a la jardinera</p>
                      </div>
                    </div>
                  </div>

                  {/* Segundos */}
                  <div>
                    <h3 className="ds-h3 text-center mb-6" style={{ color: "var(--color-text-accent)" }}>
                      SEGUNDOS
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Estofado de ternera</p>
                      </div>
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Jamoncitos de pollo con pisto</p>
                      </div>
                      <div className="bg-bg-accent/10 rounded-lg p-4">
                        <p className="ds-menu-title">Arroz de bogavante</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precio y detalles del menú diario */}
                <div className="bg-bg-accent/20 rounded-xl p-8 text-center mb-6">
                  <h4 className="ds-h2 mb-4" style={{ color: "var(--color-text-accent)" }}>14,50€</h4>
                  <p className="ds-body-xl" style={{ color: "var(--color-text-secondary)" }}>
                    El precio del menú incluye primer plato, segundo plato, postre, pan, una bebida y café o infusión.
                  </p>
                </div>

                {/* Aviso importante */}
                <div className="bg-bg-muted border-2 border-gray-300 rounded-lg p-6">
                  <p className="ds-body-base text-center" style={{ color: "var(--color-text-secondary)" }}>
                    ⚠️ <strong>Aviso:</strong> Ejemplo de menú, varía diariamente.
                  </p>
                  <p className="ds-body-sm text-center mt-2" style={{ color: "var(--color-text-muted)" }}>
                    Consulta disponibilidad del día en restaurante
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Menús de Grupos */}
          <section>
            <div className="max-w-4xl mx-auto">
              <h2 className="ds-section-title text-center mb-12">
                Menús para Grupos
              </h2>
              
              {/* Menú 1 - Grupos */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                <h3 className="ds-h3 text-center mb-2" style={{ color: "var(--color-text-accent)" }}>
                  MENÚ DE GRUPOS
                </h3>
                <p className="ds-body-base text-center mb-8" style={{ color: "var(--color-text-secondary)" }}>
                  (A partir de 8 personas)
                </p>

                {/* Tapas al centro */}
                <div className="mb-8">
                  <h4 className="ds-h4 mb-4" style={{ color: "var(--color-text-accent)" }}>
                    TAPAS AL CENTRO A COMPARTIR CADA 4 PERSONAS:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="ds-badge bg-bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">4</span>
                      <span className="ds-body-base">Croquetas de jamón</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="ds-badge bg-bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">1</span>
                      <span className="ds-body-base">Patatas Cabreadas (Bravas)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="ds-badge bg-bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">1</span>
                      <span className="ds-body-base">Ensalada de Burrata, cogollos la brasa y vinagreta de frutos rojos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="ds-badge bg-bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">1</span>
                      <span className="ds-body-base">Calamar a la plancha</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="ds-badge bg-bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">1</span>
                      <span className="ds-body-base">Entraña a la brasa con patatas fritas y chimichurri</span>
                    </div>
                  </div>
                </div>

                {/* Bebidas */}
                <div className="mb-8">
                  <h4 className="ds-h4 mb-4" style={{ color: "var(--color-text-accent)" }}>
                    BEBIDA A ELEGIR (1 cada 4 personas):
                  </h4>
                  <div className="ds-list-bulleted space-y-2 ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                    <p>• Jarra de litro de cerveza nacional</p>
                    <p>• Jarra de litro de sangría</p>
                    <p>• Botella de vino de la casa</p>
                  </div>
                  <p className="mt-4 ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                    Pan con tomate y alioli, bebida.
                  </p>
                  <p className="ds-body-base font-semibold" style={{ color: "var(--color-text-accent)" }}>
                    CAFÉ INCLUIDO.
                  </p>
                </div>

                {/* Precios del menú grupos */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-bg-accent/10 rounded-lg p-6 text-center">
                    <h5 className="ds-h4 mb-2" style={{ color: "var(--color-text-accent)" }}>Opción Estándar</h5>
                    <p className="ds-menu-price text-3xl font-bold mb-2" style={{ color: "var(--color-text-accent)" }}>25,00€</p>
                    <p className="ds-body-sm" style={{ color: "var(--color-text-secondary)" }}>POR PERSONA</p>
                    <p className="ds-body-xs mt-1" style={{ color: "var(--color-text-muted)" }}>(1 bebida cada 4 personas)</p>
                  </div>
                  <div className="bg-bg-accent/20 rounded-lg p-6 text-center">
                    <h5 className="ds-h4 mb-2" style={{ color: "var(--color-text-accent)" }}>Barra Libre</h5>
                    <p className="ds-menu-price text-3xl font-bold mb-2" style={{ color: "var(--color-text-accent)" }}>40,00€</p>
                    <p className="ds-body-sm" style={{ color: "var(--color-text-secondary)" }}>POR PERSONA</p>
                    <p className="ds-body-xs mt-1" style={{ color: "var(--color-text-muted)" }}>(barra libre durante la comida, hasta sacar el plato de entraña)</p>
                  </div>
                </div>
              </div>

              {/* Menú 2 - Placeholder */}
              <div className="bg-bg-muted rounded-2xl p-8 text-center">
                <h3 className="ds-h4 mb-4" style={{ color: "var(--color-text-accent)" }}>Menú 2</h3>
                <p className="ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                  📋 Próximamente disponible
                </p>
                <p className="ds-body-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
                  Estamos preparando más opciones para grupos
                </p>
              </div>
            </div>
          </section>

          {/* Llamada a la acción */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-bg-accent/80 rounded-2xl p-8 text-center text-text-inverse">
              <h3 className="ds-h3 mb-4">
                ¿Organizas un evento?
              </h3>
              <p className="ds-body-xl opacity-90 mb-6">
                Contacta con nosotros para reservar tu menú de grupo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/reservas-y-pedidos">
                  <Button variant="secondary">
                    Reservar Grupo
                  </Button>
                </Link>
                <Link href="#contacto">
                  <Button variant="outline">
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer adicional info */}
      <div className="bg-bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="ds-body-base mb-2" style={{ color: "var(--color-text-secondary)" }}>
            ¿Quieres ver nuestras reseñas?
          </p>
          <a
            href="https://www.tripadvisor.es/Restaurant_Review-g1063711-d27287981-Reviews-Bar_Eimar-Paiporta_Province_of_Valencia_Valencian_Community.html"
            target="_blank"
            rel="noopener noreferrer"
            className="ds-body-base font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-accent)" }}
          >
            Ver en TripAdvisor ↗
          </a>
        </div>
      </div>
    </div>
  );
}