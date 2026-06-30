import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        "gold-subtle": "rgb(var(--gold-subtle) / <alpha-value>)",
        "gov-slate": "rgb(var(--gov-slate) / <alpha-value>)",
        "gov-light": "rgb(var(--gov-light) / <alpha-value>)",
        steel: "rgb(var(--steel) / <alpha-value>)",
        navy: {
          950: "#081428",
          900: "#0a1426",
          800: "#0e2042",
          700: "#16345e",
          600: "#1e3a5f",
          500: "#2b4c7e",
          400: "#3d6394",
          300: "#5580b0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        "content-wide": "82rem",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        "card-blue": "0 8px 24px rgba(74,125,181,0.12), 0 2px 8px rgba(74,125,181,0.08)",
        "glow-blue": "0 0 28px rgba(74,125,181,0.18)",
        "premium": "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
        "premium-blue": "0 16px 48px rgba(22,52,94,0.28), 0 4px 16px rgba(22,52,94,0.14)",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(160deg, #081428 0%, #0e2042 45%, #16345e 100%)",
        "gradient-navy-subtle": "linear-gradient(180deg, #0a1426 0%, #0e2042 100%)",
        "gradient-steel": "linear-gradient(135deg, #0e2042 0%, #16345e 60%, #2b4c7e 100%)",
        "gradient-radial-blue": "radial-gradient(ellipse at center, rgba(74,125,181,0.12) 0%, transparent 70%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
