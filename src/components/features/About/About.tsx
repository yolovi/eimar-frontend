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

// Constantes de contenido para evitar repetición
const ABOUT_CONTENT = {
  title: "Hay lugares que no solo se visitan, se sienten.",
  subtitle: "Eimar es uno de ellos.",

  paragraphs: {
    opening:
      "Volvemos con alma nueva, pero con la misma pasión que nos ha unido siempre: la de",
    openingHighlight: "compartir, saborear y disfrutar.",

    space: "Un espacio acogedor que combina lo",
    spaceHighlight: "mediterráneo con un toque urbano y fresco.",
    experience:
      "Aquí, la comida se saborea, pero también se vive: desde unas tapas con amigos mientras ves el partido, una burger original con sabor casero, hasta un almuerzo de los de siempre o una cena especial al aire libre en nuestra terraza, abierta todo el año.",

    meetingPoint: "Porque más que un restaurante, somos un punto de encuentro.",
    identity:
      "Hoy seguimos siendo los de siempre, pero con una nueva identidad centrada en que disfrutes no solo de la comida sino del ambiente.",
  },

  quote: "Nos alegra verte llegar, y más aún verte volver.",

  welcome: "Bienvenido a",
  welcomeHighlight: "Eimar.",
};

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
                <h2 className="eimar-section-title">{ABOUT_CONTENT.title}</h2>

                <p className="eimar-subtitle">{ABOUT_CONTENT.subtitle}</p>
              </div>

              {/* Párrafo principal */}
              <div className="space-y-4">
                <p className="eimar-body-large">
                  {ABOUT_CONTENT.paragraphs.opening}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.openingHighlight}
                  </span>
                </p>

                <p className="eimar-body-large">
                  {ABOUT_CONTENT.paragraphs.space}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.spaceHighlight}
                  </span>{" "}
                  {ABOUT_CONTENT.paragraphs.experience}{" "}
                  {ABOUT_CONTENT.paragraphs.meetingPoint}
                </p>

                <p className="eimar-body-large">
                  {ABOUT_CONTENT.paragraphs.identity}
                </p>

                {/* Frase destacada */}
                <blockquote className="eimar-quote my-6">
                  {ABOUT_CONTENT.quote}
                </blockquote>

                {/* Bienvenida final */}
                <p className="eimar-body-large font-medium">
                  {ABOUT_CONTENT.welcome}{" "}
                  <span
                    className="font-display font-bold text-xl"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {ABOUT_CONTENT.welcomeHighlight}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout desktop - Título arriba con imagen, texto en columnas abajo */}
        <div className="hidden lg:block">
          {/* Sección superior - Título e imagen */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-4">
            {/* Título principal */}
            <div className="space-y-4">
              <h2 className="eimar-section-title">{ABOUT_CONTENT.title}</h2>

              <p className="eimar-subtitle">{ABOUT_CONTENT.subtitle}</p>
              {/* Imagen del restaurante izquierda*/}
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

            <div>
              <div className="space-y-4 mt-48">
                <p className="eimar-body-large">
                  {ABOUT_CONTENT.paragraphs.opening}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.openingHighlight}
                  </span>
                </p>
                <p className="eimar-body-large">
                  {ABOUT_CONTENT.paragraphs.space}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.spaceHighlight}
                  </span>{" "}
                  {ABOUT_CONTENT.paragraphs.experience}
                </p>
              </div>
              {/* Imagen del restaurante derecha*/}
              <div className="relative h-[145] rounded-lg overflow-hidden shadow-xl mb-8 mt-8">
                <Image
                  src="/images/restaurant/about-1.png"
                  alt="ensalada"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Sección inferior - Contenido en columnas */}
          <div className="space-y-4">
            <p className="eimar-body-large">
              {ABOUT_CONTENT.paragraphs.meetingPoint}{" "}
              {ABOUT_CONTENT.paragraphs.identity}
            </p>
          </div>

          {/* Frase destacada y bienvenida final */}
          <div className="mt-12 space-y-6">
            <blockquote className="eimar-quote">
              {ABOUT_CONTENT.quote}
            </blockquote>

            <p className="eimar-body-large font-medium">
              {ABOUT_CONTENT.welcome}{" "}
              <span
                className="font-display font-bold text-xl"
                style={{ color: "var(--color-accent)" }}
              >
                {ABOUT_CONTENT.welcomeHighlight}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
