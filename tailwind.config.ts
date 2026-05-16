import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hessel Design Tokens — BRD §13.1
        base:         "#4A1625", // Dominant page background
        surface:      "#5B1E2D", // Cards, drawer, section containers
        elevated:     "#7A2E3F", // Hover states, active panels
        accent: {
          DEFAULT:    "#D4A373", // Primary buttons, CTAs, active nav
          soft:       "#E6BE8A", // Hover glows, focus rings, subtle borders
        },
        divider:      "#8C5A4A", // Card borders, separators
        primary:      "#FFF8F0", // All body & heading text
        secondary:    "#E6CCB2", // Descriptions, captions, labels
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale (Cormorant Garamond)
        "display-xl": ["clamp(3rem, 8vw, 6rem)",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15" }],
        // Body scale (Inter)
        "body-lg":    ["1.125rem", { lineHeight: "1.7" }],
        "body-md":    ["1rem",     { lineHeight: "1.6" }],
        "body-sm":    ["0.875rem", { lineHeight: "1.5" }],
        "label":      ["0.75rem",  { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      spacing: {
        "section": "6rem",
        "section-sm": "4rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-up":   "fadeUp 0.5s ease-out forwards",
        "fade-in":   "fadeIn 0.4s ease-out forwards",
        "price-roll": "priceRoll 0.3s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      maxWidth: {
        content: "1400px",
      },
      boxShadow: {
        "accent-glow": "0 0 20px rgba(212, 163, 115, 0.15)",
        "card":        "0 4px 24px rgba(74, 22, 37, 0.4)",
        "drawer":      "4px 0 40px rgba(0, 0, 0, 0.5)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
