import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — backed by CSS variables so opacity modifiers work.
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        // Brand gold — primary accent, used for CTAs, active states, eyebrows.
        gold: "rgb(var(--gold) / <alpha-value>)",
        // Warm parchment — subtle tinted section backgrounds.
        "gold-subtle": "rgb(var(--gold-subtle) / <alpha-value>)",
        // Government slate — authoritative dark section backgrounds.
        "gov-slate": "rgb(var(--gov-slate) / <alpha-value>)",
        // Government light — cool tinted government page backgrounds.
        "gov-light": "rgb(var(--gov-light) / <alpha-value>)",
        // Steel blue — interactive accents, icons, accent bars.
        steel: "rgb(var(--steel) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Display typeface for hero headlines and section headings.
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
