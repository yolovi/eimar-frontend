/**
 * RESERVATIONS COMPONENT - EIMAR
 * ===============================
 *
 * Componente para gestión de reservas y pedidos del restaurante.
 * Incluye formulario de reservas, información sobre pedidos para llevar y políticas.
 *
 * CARACTERÍSTICAS:
 * - Diseño hero con imagen de fondo y overlay
 * - Formulario de reservas completo
 * - Integración con WhatsApp y llamadas
 * - Información sobre turnos y políticas de reserva
 * - Botones de acción adaptativos según dispositivo
 * - Sistema de variables CSS EIMAR consistente
 *
 * USO:
 * import Reservations from '@/components/features/Reservations/Reservations';
 * <Reservations />
 */

"use client";

import { cn, navigateToMenu } from "@/lib/utils";
import { ReservationForm, ActionButton } from "@/components/ui";
import { Icons } from "@/lib/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ReservationsProps {
  title?: string;
  subtitle?: string;
  subtitleBold?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

// Constantes de contenido para evitar repetición y facilitar mantenimiento
const RESERVATIONS_CONTENT = {
  payment: {
    title: "Pago con tarjeta o efectivo",
    description: "Aceptamos ambas formas de pago para tu comodidad",
  },

  policies: {
    turnos: {
      title: "Turnos de Reserva",
      content: [
        "Almuerzo: De 12:00h a 16:00h",
        "Cena (Viernes y Sábado): De 20:00h a 00:00h",
        "Se recomienda reservar con antelación en fines de semana",
      ],
    },
    general: {
      title: "Políticas Generales",
      content: [
        "Las reservas se confirman por WhatsApp o teléfono",
        "Para grupos de más de 6 personas, contactar con antelación",
        "Política de cancelación: avisar con al menos 2 horas de anticipación",
        "Mesa reservada durante 15 minutos tras la hora de reserva",
      ],
    },
  },
} as const;

const Reservations = ({
  imageSrc = "/images/restaurant/reservation-table.png",
  imageAlt = "Interior del restaurante Eimar con ambiente acogedor",
  className,
}: ReservationsProps) => {
  const router = useRouter();

  return (
    <section
      id="reservas-y-pedidos"
      className={cn("w-full mb-12", className)}
      style={{ backgroundColor: "var(--color-bg-primary)" }}
      aria-label="Reservation section"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Contenido principal con dos columnas */}
        <div className="relative">
          <div className="w-full">
            <div className="grid lg:grid-cols-7 gap-8">
              {/* Columna izquierda: Formulario de reserva */}
              <div className="lg:col-span-3">
                <ReservationForm />
              </div>

              {/* Columna derecha: Información con imagen de fondo */}
              <div className="lg:col-span-4 relative min-h-[400] rounded-lg overflow-hidden shadow-xl flex items-center">
                {/* Imagen de fondo */}
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Overlay gradient para legibilidad del texto */}
                <div
                  className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/60"
                  aria-hidden="true"
                />

                {/* Overlay adicional para móvil */}
                <div
                  className="absolute inset-0 bg-bg-secondary/15 lg:bg-transparent"
                  aria-hidden="true"
                />

                {/* Texto superpuesto */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <h1
                      className="ds-h2 mb-4"
                      style={{ color: "var(--color-text-inverse)" }}
                    >
                      Reservas y Pedidos
                    </h1>
                    <p
                      className="ds-hero-subtitle mb-8"
                      style={{ color: "var(--color-text-inverse)" }}
                    >
                      Disfruta de la experiencia Eimar
                      <br />
                      <span
                        className="font-medium"
                        style={{
                          color: "var(--color-text-inverse)",
                        }}
                      >
                        en casa o en nuestro local
                      </span>
                    </p>
                    {/* Botones de acción */}
                    <div className="flex gap-6 justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => navigateToMenu(router)}
                          className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm bg-bg-primary/10 text-text-inverse hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300"
                          aria-label="Ver carta del restaurante"
                        >
                          <Icons.menu size={20} />
                        </button>
                        <span className="text-sm font-medium text-text-muted!">
                          Carta
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <ActionButton
                          action="phone"
                          variant="round"
                          style="secondary"
                          size="md"
                        />
                        <span className="text-sm font-medium text-text-muted!">
                          Llamar
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <ActionButton
                          action="whatsapp"
                          variant="round"
                          style="secondary"
                          size="md"
                        />
                        <span className="text-sm font-medium text-text-muted!">
                          WhatsApp
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de información adicional */}
        <div className="grid lg:grid-cols-7 gap-8">
          {/* Turnos */}
          <div className="p-6 bg-bg-primary/50 rounded-xl border border-accent/20 lg:col-span-3">
            <h4 className="ds-body-xl mb-4">
              {RESERVATIONS_CONTENT.policies.turnos.title}
            </h4>
            <ul className="ds-list-bulleted ds-body-sm">
              {RESERVATIONS_CONTENT.policies.turnos.content.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </div>

          {/* Políticas */}
          <div className="p-6 bg-bg-primary/50 rounded-xl border border-accent/20 lg:col-span-4">
            <h4 className="ds-body-xl mb-4">
              {RESERVATIONS_CONTENT.policies.general.title}
            </h4>
            <ul className="ds-list-bulleted ds-body-sm">
              {RESERVATIONS_CONTENT.policies.general.content.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
