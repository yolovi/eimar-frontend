import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layout';

/*
 * CONFIGURACIÓN DE FUENTES CON NEXT/FONT
 * ======================================
 * 
 * ¿Por qué usar next/font en lugar de definir fuentes en globals.css?
 * 
 * 1. OPTIMIZACIONES AUTOMÁTICAS:
 *    - Preload automático de fuentes críticas
 *    - Subsetting (solo los caracteres que necesitas)
 *    - Font display: swap automático (evita FOIT/FOUT)
 *    - Compresión y caching optimizado
 * 
 * 2. INTEGRACIÓN CON VARIABLES CSS:
 *    - next/font genera variables CSS (--font-geist-sans, etc.)
 *    - Estas variables se aplican al DOM via className
 *    - globals.css puede entonces usar var(--font-geist-sans)
 * 
 * 3. FLUJO DE INTEGRACIÓN:
 *    layout.tsx (aquí) → define y carga fuentes → genera variables CSS
 *    globals.css → consume las variables → aplica tipografía global
 */

const geistSans = Geist({
  variable: "--font-geist-sans", // Esta variable estará disponible en CSS
  subsets: ["latin"],
  display: "swap", // Mejor rendimiento (evita flash de texto)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // Para código y elementos monospace
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair", // Para títulos y elementos accent
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Restaurante Eimar",
  description: "Restaurante Eimar en Paiporta. Comida mediterranea, eventos y reservas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 
        APLICACIÓN DE VARIABLES DE FUENTE AL DOM
        ========================================
        
        Las clases generadas por next/font (.variable) se aplican aquí al <body>:
        - ${geistSans.variable}     → inyecta --font-geist-sans: "Geist", system-ui...
        - ${geistMono.variable}     → inyecta --font-geist-mono: "Geist Mono", monospace...
        - ${playfairDisplay.variable} → inyecta --font-playfair: "Playfair Display", serif...
        
        Una vez aplicadas estas clases, globals.css puede usar:
        - var(--font-geist-sans) para tipografía base
        - var(--font-geist-mono) para código
        - var(--font-playfair) para títulos elegantes
        
        IMPORTANTE: No muevas estas variables a globals.css porque perderías
        las optimizaciones de next/font (preload, subsetting, etc.)
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        {/* Header contiene el Navbar para que esté presente en todas las páginas */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* <Footer /> - Cuando esté creado */}
      </body>
    </html>
  );
}
