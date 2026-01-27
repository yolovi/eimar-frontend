/**
 * AVISO LEGAL - RESTAURANTE EIMAR
 * ===============================
 * Página simple con información legal básica
 */

import { Metadata } from "next";
import { Icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Aviso Legal | Restaurante Eimar",
  description: "Información legal sobre el sitio web de Restaurante Eimar",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          Aviso Legal
        </h1>
        
        <div 
          className="prose max-w-none"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <div className="space-y-6 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Datos del titular
              </h2>
              <p>
                <strong>Restaurante Eimar</strong><br/>
                Carrer Mestre Palau, 98<br/>
                46200 Paiporta, Valencia, España<br/>
                <Icons.email className="inline w-4 h-4 mr-1" /> info@restauranteeimar.com<br/>
                <Icons.phone className="inline w-4 h-4 mr-1" /> +34 672 149 607
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Objeto del sitio web
              </h2>
              <p>
                Este sitio web tiene como finalidad informar sobre nuestros servicios de restauración, 
                carta, horarios y facilitar el contacto para reservas. Toda la información se ofrece 
                de buena fe y con fines informativos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Condiciones de uso
              </h2>
              <p className="mb-3">
                Al acceder y utilizar este sitio web, aceptas las siguientes condiciones:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>El uso de la web es libre y gratuito</li>
                <li>Debes hacer un uso responsable y lícito del sitio</li>
                <li>No puedes utilizarlo para fines comerciales sin autorización</li>
                <li>Está prohibido cualquier uso que pueda dañar el sitio o interferir con otros usuarios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Propiedad intelectual
              </h2>
              <p>
                Todos los contenidos de este sitio web (textos, imágenes, diseño, código, etc.) 
                están protegidos por derechos de propiedad intelectual. Queda prohibida su 
                reproducción, distribución o modificación sin autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Exclusión de garantías y responsabilidad
              </h2>
              <p className="mb-3">
                Restaurante Eimar no se hace responsable de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>La disponibilidad continua del sitio web</li>
                <li>Errores temporales en la información (precios, horarios, etc.)</li>
                <li>Daños que puedan derivarse del uso de la web</li>
                <li>Enlaces a sitios web de terceros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Enlaces externos
              </h2>
              <p>
                Este sitio web puede contener enlaces a páginas de terceros. No nos responsabilizamos 
                del contenido o políticas de privacidad de estos sitios externos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Modificaciones
              </h2>
              <p>
                Nos reservamos el derecho a modificar este aviso legal en cualquier momento. 
                Los cambios serán efectivos desde su publicación en la web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Legislación aplicable
              </h2>
              <p>
                Este aviso legal se rige por la legislación española. Para cualquier controversia, 
                serán competentes los juzgados y tribunales de Valencia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                Contacto
              </h2>
              <p>
                Para cualquier consulta sobre este aviso legal:
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