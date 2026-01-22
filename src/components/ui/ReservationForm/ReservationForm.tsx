/**
 * RESERVATION FORM COMPONENT - EIMAR
 * ==================================
 *
 * Componente de formulario de reservas reutilizable.
 * Incluye validación, manejo de estado y integración con WhatsApp.
 * CARACTERÍSTICAS:
 * - Formulario accesible con IDs (labels omitidos para simplicidad de estilo)
 * - Validación básica de campos requeridos
 * - Estados de carga y error
 * - Integración directa con WhatsApp
 * - Estilos consistentes con el design system
 *
 * USO:
 * import { ReservationForm } from '@/components/ui/ReservationForm';
 * <ReservationForm onSubmit={handleReservation} />
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, OrderSection } from "@/components/ui";
import { CONTACT_INFO } from "@/constants/contact";

export interface ReservationFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  people: string;
}

export interface ReservationFormProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: ReservationFormData) => void;
  showOrderSection?: boolean;
  className?: string;
}

// Función helper para obtener fecha actual en formato YYYY-MM-DD
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const ReservationForm = ({
  title = "Haz tu reserva",
  subtitle = "Reserva a través de nuestro formulario, por teléfono o por WhatsApp.",
  onSubmit,
  showOrderSection = true,
  className = "",
}: ReservationFormProps) => {
  // Constantes de estilos para evitar repetición
  const inputBaseStyles =
    "w-full px-4 py-3 border rounded-lg transition-colors";
  const inputNormalStyles = "border-gray-200";
  const inputErrorStyles = "border-red-300 focus:border-red-500";
  const errorMessageStyles = "ds-error mt-1";

  // Función helper para estilos de input según estado de error
  const getInputStyles = (hasError: boolean, extraClasses = "") => {
    return cn(
      inputBaseStyles,
      hasError ? inputErrorStyles : inputNormalStyles,
      extraClasses,
    );
  };
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    phone: "",
    date: getTodayDate(),
    time: "12:00",
    people: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});

  // Validación básica del formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }

    if (!formData.date) {
      newErrors.date = "La fecha es requerida";
    }

    if (!formData.time) {
      newErrors.time = "La hora es requerida";
    }

    if (!formData.people) {
      newErrors.people = "El número de personas es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (
    field: keyof ReservationFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Envío por defecto via WhatsApp
        await handleWhatsAppSubmission();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enviar reserva por WhatsApp
  const handleWhatsAppSubmission = async () => {
    const message = `Hola! Me gustaría hacer una reserva:

🏷️ Nombre: ${formData.name}
📞 Teléfono: ${formData.phone}
📅 Fecha: ${formData.date}
🕐 Hora: ${formData.time}
👥 Personas: ${formData.people}

¡Gracias!`;

    const whatsappUrl = `https://wa.me/${
      CONTACT_INFO.whatsapp.number
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={cn(
        "bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl",
        className,
      )}
    >
      {/* Header del formulario */}
      <div className="mb-4">
        <h2 className="ds-h3 mb-2" style={{ color: "var(--color-accent)" }}>
          {title}
        </h2>
        <p className="ds-body-base">{subtitle}</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre y Teléfono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              id="reservation-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={getInputStyles(!!errors.name)}
              placeholder="Tu nombre"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className={errorMessageStyles}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              id="reservation-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={getInputStyles(!!errors.phone)}
              placeholder="Tu teléfono"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className={errorMessageStyles}>
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Fecha y Hora */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              id="reservation-date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={getInputStyles(!!errors.date)}
              min={new Date().toISOString().split("T")[0]}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <p id="date-error" className={errorMessageStyles}>
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <input
              id="reservation-time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              className={getInputStyles(
                !!errors.time,
                "cursor-pointer hover:border-gray-300",
              )}
              placeholder="12:00"
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? "time-error" : undefined}
            />
            {errors.time && (
              <p id="time-error" className={errorMessageStyles}>
                {errors.time}
              </p>
            )}
          </div>
        </div>

        {/* Número de personas */}
        <div>
          <select
            id="reservation-people"
            value={formData.people}
            onChange={(e) => handleInputChange("people", e.target.value)}
            className={getInputStyles(!!errors.people)}
            aria-invalid={!!errors.people}
            aria-describedby={errors.people ? "people-error" : undefined}
          >
            <option value="">Selecciona número de personas</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6+">6 o más personas</option>
          </select>
          {errors.people && (
            <p id="people-error" className={errorMessageStyles}>
              {errors.people}
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="ghost"
          size="lg"
          className="w-full mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar reserva →"}
        </Button>
      </form>

      {/* Sección de pedidos para llevar */}
      {showOrderSection && <OrderSection />}
    </div>
  );
};

export default ReservationForm;
