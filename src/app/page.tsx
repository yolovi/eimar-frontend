import Logo from '@/components/Logo';


export default function Home() {
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
    </div>
  );
}
