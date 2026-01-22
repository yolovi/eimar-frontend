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
    <div className={`mt-4 pt-8 border-t border-gray-200 ${className}`}>
      <h2
        className="ds-h3 mb-2"
        style={{color: "var(--color-accent)"}}
      >
        Haz tu pedido
      </h2>
      <p className="ds-body-xl mb-4 font-bold ">
        y recógelo en nuestro restaurante
      </p>
      <p className="ds-body-sm mb-4">
        Disfruta de nuestros platos en casa. Llama o envía un WhatsApp para
        realizar tu pedido y te avisaremos cuando esté listo para recoger.
      </p>
    </div>
  );
};

export default OrderSection;
