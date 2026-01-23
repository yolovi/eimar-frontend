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
      "Aquí, la comida se saborea, pero también se vive: desde unas tapas con amigos mientras ves el partido, una burger original con sabor casero, hasta un almuerzo de los de siempre o una cena especial al aire libre en nuestra terraza.",

    meetingPoint:
      "Porque más que un restaurante, somos un punto de encuentro. Hoy seguimos siendo los de siempre, pero con una nueva identidad centrada en que disfrutes no solo de la comida sino del ambiente.",
  },

  quote: "Nos alegra verte llegar, y más aún verte volver.",

  welcome: "Bienvenido a",
  welcomeHighlight: "Eimar.",
};

const About = ({ className }: AboutProps) => {
  return (
    <section id="nosotros" className={cn("w-full py-12 px-4", className)}>
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
                <h2 className="ds-section-title">{ABOUT_CONTENT.title}</h2>
                <p className="ds-subtitle">{ABOUT_CONTENT.subtitle}</p>
              </div>

              {/* Párrafo principal */}
              <div className="space-y-4">
                <p className="ds-body-xl">
                  {ABOUT_CONTENT.paragraphs.opening}{" "}
                  <span className="font-semibold">
                    {ABOUT_CONTENT.paragraphs.openingHighlight}
                  </span>
                </p>

                <p className="ds-body-xl">
                  {ABOUT_CONTENT.paragraphs.space}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-text-accent)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.spaceHighlight}
                  </span>{" "}
                  {ABOUT_CONTENT.paragraphs.experience}{" "}
                  {ABOUT_CONTENT.paragraphs.meetingPoint}
                </p>

                {/* Frase destacada */}
                <blockquote className="ds-quote my-6">
                  {ABOUT_CONTENT.quote}
                </blockquote>

                {/* Bienvenida final */}
                <p className="ds-body-xl font-medium">
                  {ABOUT_CONTENT.welcome}{" "}
                  <span
                    className="font-display font-bold text-xl"
                    style={{ color: "var(--color-text-accent)" }}
                  >
                    {ABOUT_CONTENT.welcomeHighlight}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout desktop - Título arriba, luego imagen y texto en columnas */}
        <div className="hidden lg:block">
          {/* Título y subtítulo separados - con ancho máximo de la columna izquierda */}
          <div className="lg:max-w-[calc(50%-1.5rem)] mb-8">
            <h2 className="ds-section-title">{ABOUT_CONTENT.title}</h2>
            <p className="ds-subtitle mt-4">{ABOUT_CONTENT.subtitle}</p>
          </div>

          {/* Sección de contenido en columnas */}
          <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-4">
            {/* Columna izquierda - Imagen */}
            <div className="flex flex-col">
              {/* Imagen del restaurante izquierda*/}
              <div className="relative flex-1 min-h-[400] rounded-lg overflow-hidden shadow-xl">
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

            {/* Columna derecha - Texto e imagen */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <p className="ds-body-xl">
                  {ABOUT_CONTENT.paragraphs.opening}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.openingHighlight}
                  </span>
                </p>
                <p className="ds-body-xl">
                  {ABOUT_CONTENT.paragraphs.space}{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-text-accent)" }}
                  >
                    {ABOUT_CONTENT.paragraphs.spaceHighlight}
                  </span>{" "}
                  {ABOUT_CONTENT.paragraphs.experience}
                </p>
              </div>
              {/* Imagen del restaurante derecha*/}
              <div className="relative h-[145] rounded-lg overflow-hidden shadow-xl">
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
            <p className="ds-body-xl">
              {ABOUT_CONTENT.paragraphs.meetingPoint}
            </p>
          </div>

          {/* Frase destacada y bienvenida final */}
          <div className="mt-12 space-y-6">
            <blockquote className="ds-quote">{ABOUT_CONTENT.quote}</blockquote>

            <p className="ds-body-xl font-medium">
              {ABOUT_CONTENT.welcome}{" "}
              <span
                className="font-display font-bold text-xl"
                style={{ color: "var(--color-text-accent)" }}
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
