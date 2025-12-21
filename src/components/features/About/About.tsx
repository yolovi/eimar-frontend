/**
 * ABOUT COMPONENT - EIMAR
 * =======================
 *
 * Componente que presenta la historia e identidad del restaurante.
 * Incluye imagen del ambiente y texto descriptivo sobre la experiencia Eimar.
 *
 * CARACTERÍSTICAS:
 * - Layout responsive con imagen y texto
 * - Tipografía jerárquica con énfasis visual
 * - Integración con sistema de variables CSS EIMAR
 * - Diseño que transmite la esencia mediterránea del restaurante
 *
 * USO:
 * import About from '@/components/features/About/About';
 * <About />
 */

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AboutProps {
  className?: string;
}

const About = ({ className }: AboutProps) => {
  return (
    <section
      id="nosotros"
      className={cn("w-full py-16 px-4", className)}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Layout móvil/tablet - Grid normal */}
        <div className="lg:hidden">
          <div className="grid gap-8 items-center">
            {/* Imagen del restaurante */}
            <div className="order-2">
              <div className="relative h-[400] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/restaurant/ambiente1.png"
                  alt="Interior del restaurante Eimar con ambiente acogedor"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Contenido de texto */}
            <div className="order-1 space-y-6">
              {/* Título principal */}
              <div className="space-y-4">
                <h2 className="eimar-section-title">
                  Hay lugares que no solo se visitan, se sienten.
                </h2>

                <p className="eimar-subtitle">Eimar es uno de ellos.</p>
              </div>

              {/* Párrafo principal */}
              <div className="space-y-4">
                <p className="eimar-body-large">
                  Volvemos con alma nueva, pero con la misma pasión que nos ha
                  unido siempre: la de{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    compartir, saborear y disfrutar.
                  </span>
                </p>

                <p className="eimar-body-large">
                  Un espacio acogedor que combina lo{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    mediterráneo con un toque urbano y fresco.
                  </span>{" "}
                  Aquí, la comida se saborea, pero también se vive: desde unas
                  tapas con amigos mientras ves el partido, una burger original
                  con sabor casero, hasta un almuerzo de los de siempre o una
                  cena especial al aire libre en nuestra terraza, abierta todo
                  el año. Porque más que un restaurante, somos un punto de
                  encuentro.
                </p>

                <p className="eimar-body-large">
                  Hoy seguimos siendo los de siempre, pero con una nueva
                  identidad centrada en que disfrutes no solo de la comida sino
                  del ambiente.
                </p>

                {/* Frase destacada */}
                <blockquote className="eimar-quote my-6">
                  Nos alegra verte llegar, y más aún verte volver.
                </blockquote>

                {/* Bienvenida final */}
                <p className="eimar-body-large font-medium">
                  Bienvenido a{" "}
                  <span
                    className="font-display font-bold text-xl"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Eimar.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout desktop - Título arriba con imagen, texto en columnas abajo */}
        <div className="hidden lg:block">
          {/* Sección superior - Título e imagen */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Título principal */}
            <div className="space-y-4">
              <h2 className="eimar-section-title">
                Hay lugares que no solo se visitan, se sienten.
              </h2>

              <p className="eimar-subtitle">Eimar es uno de ellos.</p>
            </div>

            {/* Imagen del restaurante */}
            <div>
              <div className="relative h-[400] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/restaurant/ambiente1.png"
                  alt="Interior del restaurante Eimar con ambiente acogedor"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Sección inferior - Contenido en columnas */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <p className="eimar-body-large">
                Volvemos con alma nueva, pero con la misma pasión que nos ha
                unido siempre: la de{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  compartir, saborear y disfrutar.
                </span>
              </p>

              <p className="eimar-body-large">
                Un espacio acogedor que combina lo{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  mediterráneo con un toque urbano y fresco.
                </span>{" "}
                Aquí, la comida se saborea, pero también se vive: desde unas
                tapas con amigos mientras ves el partido, una burger original
                con sabor casero, hasta un almuerzo de los de siempre o una cena
                especial al aire libre en nuestra terraza, abierta todo el año.
              </p>
            </div>

            {/* Columna derecha */}
            <div className="space-y-4">
              <p className="eimar-body-large">
                Porque más que un restaurante, somos un punto de encuentro.
              </p>

              <p className="eimar-body-large">
                Hoy seguimos siendo los de siempre, pero con una nueva identidad
                centrada en que disfrutes no solo de la comida sino del
                ambiente.
              </p>
            </div>
          </div>

          {/* Frase destacada y bienvenida final */}
          <div className="mt-12 text-center space-y-6">
            <blockquote className="eimar-quote">
              Nos alegra verte llegar, y más aún verte volver.
            </blockquote>

            <p className="eimar-body-large font-medium">
              Bienvenido a{" "}
              <span
                className="font-display font-bold text-xl"
                style={{ color: "var(--color-accent)" }}
              >
                Eimar.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
