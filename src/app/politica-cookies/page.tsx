/**
 * POLÍTICA DE COOKIES - RESTAURANTE EIMAR
 * =======================================
 * Página simple con información sobre el uso de cookies
 */

import { Metadata } from "next";
import { Icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Política de Cookies | Restaurante Eimar",
  description: "Información sobre el uso de cookies en nuestro sitio web",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          Política de Cookies
        </h1>
        
        <div 
          className="prose max-w-none"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <div className="space-y-6 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
                Nos ayudan a ofrecer una mejor experiencia de navegación y a entender cómo utilizas nuestra web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Qué cookies utilizamos?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--color-text-accent)" }}>
                    Cookies necesarias
                  </h3>
                  <p>
                    Son esenciales para que el sitio web funcione correctamente. Incluyen funciones como 
                    la navegación por el menú, formularios de contacto y preferencias básicas.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--color-text-accent)" }}>
                    Cookies analíticas
                  </h3>
                  <p>
                    Nos ayudan a entender cómo interactúas con nuestro sitio web para mejorarlo. 
                    Estas cookies recopilan información anónima sobre las páginas visitadas y el tiempo de navegación.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                ¿Cómo gestionar las cookies?
              </h2>
              <p className="mb-3">
                Puedes gestionar o eliminar las cookies según tus preferencias:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>En tu navegador:</strong> Puedes configurar tu navegador para rechazar cookies 
                  o avisarte antes de aceptarlas.
                </li>
                <li>
                  <strong>Cookies de terceros:</strong> Para cookies de servicios como Google Analytics, 
                  puedes gestionar tus preferencias directamente en sus plataformas.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Contacto
              </h2>
              <p>
                Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos:
              </p>
              <ul className="list-none space-y-1 mt-2">
                <li><Icons.email className="inline w-4 h-4 mr-1" /> Email: info@restauranteeimar.com</li>
                <li><Icons.phone className="inline w-4 h-4 mr-1" /> Teléfono: +34 672 149 607</li>
                <li><Icons.location className="inline w-4 h-4 mr-1" /> Dirección: Carrer Mestre Palau, 98, Paiporta, Valencia</li>
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