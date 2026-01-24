/**
 * PÁGINA DE ALMUERZOS - EIMAR PAIPORTA
 * ====================================
 * 
 * Página dedicada a los desayunos y almuerzos del restaurante.
 * Incluye información de horarios, precios e información adicional.
 * 
 * FUTURO - IMPLEMENTACIÓN DINÁMICA CON PDF/GOOGLE DRIVE:
 * --------------------------------------------------------
 * Para hacer esta página dinámica en el futuro:
 * 
 * 1. Google Drive + PDF:
 *    - Crear carpeta pública en Google Drive
 *    - El dueño sube foto/PDF del menú diario
 *    - Usar Google Drive API para obtener último archivo
 *    - Mostrar PDF embebido o imagen
 * 
 * 2. Implementación técnica:
 *    - Instalar: npm install googleapis
 *    - Crear API route: /api/menu-almuerzos
 *    - Hook personalizado: useAlmuerzosMenu()
 *    - Componente condicional: {menuDinamico || menuEstatico}
 * 
 * 3. Configuración Google Drive API:
 *    - Crear proyecto en Google Console
 *    - Habilitar Drive API
 *    - Variables de entorno: GOOGLE_DRIVE_API_KEY, FOLDER_ID
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Desayunos y Almuerzos - Eimar Paiporta',
  description: 'Deliciosos desayunos y almuerzos en Paiporta. Tostas artesanales, bocadillos y menús de almuerzo con bebida incluida.',
  keywords: 'desayunos Paiporta, almuerzos Paiporta, tostas, bocadillos, menú almuerzo',
};

export default function AlmuerzosPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Header Hero */}
      <section className="relative w-full py-16 bg-bg-accent/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="ds-hero-title text-text-inverse mb-4">
            Desayunos y Almuerzos
          </h1>
          <p className="ds-hero-subtitle text-text-inverse opacity-90 mb-8">
            En Paiporta
          </p>
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
        
          {/* Sección Desayunos */}
          <section>
            <div className="max-w-4xl mx-auto">
              <h2 className="ds-section-title text-center mb-12">
                Desayunos
              </h2>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="space-y-6">
                  
                  {/* Tosta de aceite y sal */}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="ds-menu-title">
                        Tosta de aceite y sal
                      </h3>
                    </div>
                    <span className="ds-menu-price" style={{ color: "var(--color-text-accent)" }}>2,00€</span>
                  </div>

                  {/* Tosta aceite, sal y tomate */}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="ds-menu-title">
                        Tosta aceite, sal y tomate natural rallado
                      </h3>
                    </div>
                    <span className="ds-menu-price" style={{ color: "var(--color-text-accent)" }}>2,40€</span>
                  </div>

                  {/* Tosta de mantequilla y mermelada */}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="ds-menu-title">
                        Tosta de mantequilla y mermelada
                      </h3>
                      <p className="ds-menu-description mt-1">
                        tomate, higos, melocotón
                      </p>
                    </div>
                    <span className="ds-menu-price" style={{ color: "var(--color-text-accent)" }}>2,50€</span>
                  </div>

                  {/* Tosta de jamón ibérico */}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="ds-menu-title">
                        Tosta de jamón ibérico y tomate natural rallado
                      </h3>
                    </div>
                    <span className="ds-menu-price" style={{ color: "var(--color-text-accent)" }}>6,00€</span>
                  </div>

                  {/* Extra bebidas */}
                  <div className="bg-bg-accent/10 rounded-lg p-6 mt-6">
                    <h4 className="ds-h5 mb-3" style={{ color: "var(--color-text-accent)" }}>
                      Complementa tu desayuno
                    </h4>
                    <p className="ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                      <strong>+ 1,75€</strong> zumo de naranja / agua / refresco / doble de cerveza / café 
                      <span className="ds-body-sm block mt-1">(cremaet +1€)</span>
                    </p>
                  </div>
                </div>
                
                {/* Imagen placeholder desayuno */}
                <div className="mt-8 bg-bg-muted rounded-xl p-8 text-center">
                  <p className="ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                    📸 Imagen desayuno ejemplo
                  </p>
                  <p className="ds-body-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
                    Próximamente: fotografías de nuestros deliciosos desayunos
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección Almuerzos */}
          <section>
            <div className="max-w-4xl mx-auto">
              <h2 className="ds-section-title text-center mb-12">
                Almuerzos
              </h2>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                
                {/* Horarios */}
                <div className="bg-bg-accent/10 rounded-lg p-6 mb-8">
                  <h3 className="ds-h4 mb-3" style={{ color: "var(--color-text-accent)" }}>
                    🕘 Horarios de Almuerzo
                  </h3>
                  <div className="space-y-1 ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                    <p><strong>Lunes a Jueves:</strong> De 9:30h a 12:00h</p>
                    <p><strong>Viernes, Sábado, Domingo y festivos:</strong> De 9:30h a 11:30h</p>
                  </div>
                </div>

                {/* Qué incluye */}
                <div className="bg-bg-muted rounded-lg p-6 mb-8">
                  <h3 className="ds-h4 mb-3" style={{ color: "var(--color-text-primary)" }}>
                    ✅ Todos los almuerzos incluyen:
                  </h3>
                  <div className="ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                    <p className="mb-2">
                      <strong>Bebida:</strong> Refresco 350cl / Agua 0.5cl / Doble de barril / Vino de la casa / Vino-gaseosa / Tinto de verano
                    </p>
                    <p className="mb-2">
                      <strong>Acompañamientos:</strong> Aceitunas variadas / Encurtidos / Cacaos fritos
                    </p>
                    <p>
                      <strong>Café incluido</strong> <span className="ds-body-sm">(*cremaet +1€)</span>
                    </p>
                  </div>
                </div>

                {/* Precios */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-bg-accent/10 rounded-lg p-6 text-center">
                    <h4 className="ds-h3 mb-2" style={{ color: "var(--color-text-accent)" }}>Medio</h4>
                    <p className="ds-menu-price text-3xl font-bold" style={{ color: "var(--color-text-accent)" }}>7,25€</p>
                  </div>
                  <div className="bg-bg-accent/20 rounded-lg p-6 text-center">
                    <h4 className="ds-h3 mb-2" style={{ color: "var(--color-text-accent)" }}>Entero</h4>
                    <p className="ds-menu-price text-3xl font-bold" style={{ color: "var(--color-text-accent)" }}>8,00€</p>
                  </div>
                </div>

                {/* Enlace a carta de bocadillos */}
                <div className="text-center mb-8">
                  <Link href="/menu">
                    <Button variant="primary" size="lg">
                      📋 Ver Carta de Bocadillos
                    </Button>
                  </Link>
                </div>

                {/* Imagen placeholder almuerzo */}
                <div className="bg-bg-muted rounded-xl p-8 text-center">
                  <p className="ds-body-base" style={{ color: "var(--color-text-secondary)" }}>
                    📸 Imagen almuerzo ejemplo
                  </p>
                  <p className="ds-body-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
                    Próximamente: fotografías de nuestros deliciosos almuerzos
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Llamada a la acción */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-bg-accent/80 rounded-2xl p-8 text-center text-text-inverse">
              <h3 className="ds-h3 mb-4">
                ¿Listo para disfrutar?
              </h3>
              <p className="ds-body-xl opacity-90 mb-6">
                Ven a Eimar y disfruta de nuestros desayunos y almuerzos en Paiporta
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/reservas-y-pedidos">
                  <Button variant="secondary">
                    Hacer Reserva
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
    </div>
  );
}