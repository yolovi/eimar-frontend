import Logo from '@/components/Logo';
import { Button } from '@/components/ui';

export default function Page() {
  return (
    <div className="p-8 space-y-4">
      <Logo size="lg" className="text-primary mb-8" />
      
      {/* Prueba de todas las fuentes */}
      <h1 className="font-sans text-3xl text-primary">Geist Sans - Fuente principal 10.90 €</h1>
      <h1 className="font-mono text-3xl text-primary">Geist Mono - Código 10.90 € </h1>
      <h1 className="font-accent text-3xl text-accent">Playfair Display - Títulos elegantes 10.90 €</h1>
      
      {/* Diferentes pesos */}
      <div className="mt-8">
        <h2 className="font-accent text-2xl font-light text-primary">Playfair Light</h2>
        <h2 className="font-accent text-2xl font-normal text-primary">Playfair Normal</h2>
        <h2 className="font-accent text-2xl font-medium text-primary">Playfair Medium</h2>
        <h2 className="font-accent text-2xl font-semibold text-primary">Playfair Semibold</h2>
        <h2 className="font-accent text-2xl font-bold text-primary">Playfair Bold</h2>
        <h2 className="font-accent text-2xl font-black text-primary">Playfair Black</h2>
      </div>

      {/* Debug de colores */}
      <div className="mt-8 p-4 border border-gray-300 rounded">
        <h3 className="font-bold mb-4">Debug de colores EIMAR:</h3>
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-primary border" title="Primary (Negro)"></div>
          <div className="w-16 h-16 bg-base border" title="Base (Blanco nieve)"></div>
          <div className="w-16 h-16 bg-accent border" title="Accent (Verde)"></div>
          <div className="w-16 h-16 bg-red-600 border" title="Destructive (Rojo)"></div>
        </div>
        <p className="text-sm mt-2">
          Primary: Negro | Base: Blanco nieve | Accent: Verde | Destructive: Rojo
        </p>
      </div>

      {/* Prueba de botones */}
      <div className="mt-12 space-y-6">
        <h2 className="font-accent text-3xl font-bold text-primary mb-6">Componentes Button</h2>
        
        {/* Variantes */}
        <div className="space-y-4">
          <h3 className="font-accent text-xl font-semibold text-primary">Variantes:</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Reservar</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Contorno</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Cancelar</Button>
          </div>
        </div>

        {/* Tamaños */}
        <div className="space-y-4">
          <h3 className="font-accent text-xl font-semibold text-primary">Tamaños:</h3>
          <div className="flex items-end gap-4">
            <Button size="sm" variant="primary">Pequeño</Button>
            <Button size="md" variant="primary">Mediano</Button>
            <Button size="lg" variant="primary">Grande</Button>
            <Button size="xl" variant="primary">Extra Grande</Button>
          </div>
        </div>

        {/* Estados */}
        <div className="space-y-4">
          <h3 className="font-accent text-xl font-semibold text-primary">Estados:</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Normal</Button>
            <Button variant="primary" disabled>Deshabilitado</Button>
            <Button variant="primary" isLoading>Cargando...</Button>
            <Button variant="primary" fullWidth>Ancho completo</Button>
          </div>
        </div>

        {/* Con iconos */}
        <div className="space-y-4">
          <h3 className="font-accent text-xl font-semibold text-primary">Con iconos:</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              leftIcon={<span>📞</span>}
            >
              Llamar
            </Button>
            <Button 
              variant="secondary" 
              rightIcon={<span>→</span>}
            >
              Siguiente
            </Button>
            <Button 
              variant="outline" 
              leftIcon={<span>❤️</span>}
              rightIcon={<span>⭐</span>}
            >
              Favorito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
