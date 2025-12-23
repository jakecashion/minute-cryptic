import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#B8C9E8",
          yellow: "#FFE600", // Brighter yellow for buttons
          pink: "#FFB6C1",   // Soft pink for selections
          purple: "#D8B5FF", // Purple for buttons
          dark: "#1A1A1A",   // Softer black for text
        }
      },
      boxShadow: {
        'neobrutalist': '4px 4px 0px 0px rgba(0,0,0,1)', // The "sticker" shadow look
        'neobrutalist-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
};
export default config;
