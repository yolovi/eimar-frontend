/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System EIMAR
        primary: "var(--eimar-primary)", // Negro
        base: "var(--eimar-base)", // Blanco nieve
        accent: "var(--eimar-accent)", // Verde principal
        text: {
          dark: "var(--eimar-primary)", // Texto oscuro
          secondary: "var(--eimar-text-secondary)", // Texto gris
          light: "var(--eimar-base)", // Texto claro
        },

        // Color de Opacidad (Nota: Tailwind maneja la opacidad con utilidades como bg-opacity-75)
        "dark-overlay": "rgba(0, 0, 0, 0.75)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Courier New", "monospace"],
        accent: ["var(--font-playfair)", "Georgia", "serif"],
      },
      spacing: {
        "spacing-xs": "0.25rem",
        "spacing-sm": "0.5rem",
        "spacing-md": "1rem",
        "spacing-lg": "1.5rem",
        "spacing-xl": "2rem",
      },
    },
  },
};
