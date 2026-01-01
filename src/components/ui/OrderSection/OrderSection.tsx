/**
 * ORDER SECTION COMPONENT - EIMAR
 * ================================
 *
 * Componente independiente para la sección de pedidos para llevar.
 * Separado del formulario de reservas para mejor modularidad y reutilización.
 * Estilos consistentes con el design system
 *
 * USO:
 * import { OrderSection } from '@/components/ui/OrderSection';
 * <OrderSection />
 */

interface OrderSectionProps {
  className?: string;
}

const OrderSection = ({ className = "" }: OrderSectionProps) => {
  return (
    <div className={`mt-8 pt-8 border-t border-gray-200 ${className}`}>
      <h2
        className="font-accent"
        style={{
          color: "var(--color-accent)",
          fontSize: "2rem",
        }}
      >
        Haz tu pedido{" "}
      </h2>
      <p className="eimar-body mb-2 font-medium">
        y recógelo en nuestro restaurante
      </p>
      <p className="eimar-body-small mb-4">
        Disfruta de nuestros platos en casa. Llama o envía un WhatsApp para
        realizar tu pedido y te avisaremos cuando esté listo para recoger.
      </p>
    </div>
  );
};

export default OrderSection;