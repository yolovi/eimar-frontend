/**
 * POLÍTICA DE PRIVACIDAD - RESTAURANTE EIMAR
 * ==========================================
 * Página simple con información sobre protección de datos
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Restaurante Eimar",
  description: "Información sobre cómo protegemos y utilizamos tus datos personales",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          Política de Privacidad
        </h1>
        
        <div 
          className="prose max-w-none"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <div className="space-y-6 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Responsable del tratamiento
              </h2>
              <p>
                <strong>Restaurante Eimar</strong><br/>
                Carrer Mestre Palau, 98<br/>
                46200 Paiporta, Valencia<br/>
                📧 info@restauranteeimar.com<br/>
                📞 +34 672 149 607
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Qué datos recopilamos?
              </h2>
              <p className="mb-3">Solo recopilamos los datos necesarios para prestarte nuestros servicios:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Reservas:</strong> Nombre, teléfono, email y preferencias de mesa</li>
                <li><strong>Contacto:</strong> Datos que nos proporciones voluntariamente en formularios</li>
                <li><strong>Navegación:</strong> Información técnica básica para mejorar la web (cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Para qué utilizamos tus datos?
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Gestionar tus reservas y pedidos</li>
                <li>Responder a tus consultas y solicitudes</li>
                <li>Mejorar nuestros servicios y la experiencia en la web</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Base legal
              </h2>
              <p>
                Tratamos tus datos basándose en tu consentimiento (formularios de contacto), 
                la ejecución de un servicio (reservas) y nuestro interés legítimo (mejora del servicio).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Compartimos tus datos?
              </h2>
              <p>
                No vendemos ni compartimos tus datos personales con terceros, excepto cuando sea 
                necesario para prestarte el servicio (ej: plataformas de reserva) o por obligación legal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Cuánto tiempo conservamos tus datos?
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Reservas:</strong> Hasta 2 años después de tu última visita</li>
                <li><strong>Contacto:</strong> Hasta que solicites su eliminación</li>
                <li><strong>Navegación:</strong> Máximo 2 años (cookies analíticas)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Tus derechos
              </h2>
              <p className="mb-3">Tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Acceso:</strong> Saber qué datos tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> Corregir datos incorrectos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato legible</li>
                <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
              </ul>
              <p className="mt-3">
                Para ejercer estos derechos, contáctanos en: <strong>info@restauranteeimar.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Seguridad
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos 
                contra accesos no autorizados, pérdida o alteración.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Contacto
              </h2>
              <p>
                Si tienes dudas sobre esta política de privacidad o quieres ejercer tus derechos:
              </p>
              <ul className="list-none space-y-1 mt-2">
                <li>📧 Email: info@restauranteeimar.com</li>
                <li>📞 Teléfono: +34 672 149 607</li>
                <li>📍 Dirección: Carrer Mestre Palau, 98, Paiporta, Valencia</li>
              </ul>
            </section>

            <section className="text-xs opacity-75 pt-4 border-t" style={{ borderColor: "var(--color-border-secondary)" }}>
              <p>
                Última actualización: {new Date().toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}