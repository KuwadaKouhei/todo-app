import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 和モダンな配色
        ink: {
          50: "#f7f7f5",
          100: "#edecea",
          200: "#dbd9d4",
          300: "#c4c0b8",
          400: "#a9a498",
          500: "#95907f",
          600: "#888273",
          700: "#716c60",
          800: "#5e5a51",
          900: "#4e4b44",
          950: "#292723",
        },
        vermillion: {
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#ffcdc9",
          300: "#fdaaa3",
          400: "#f97970",
          500: "#f04d41",
          600: "#dd3124",
          700: "#ba251a",
          800: "#9a2319",
          900: "#80231c",
          950: "#460d09",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e3ebe3",
          200: "#c8d7c8",
          300: "#a1baa1",
          400: "#759775",
          500: "#567a56",
          600: "#436143",
          700: "#374e37",
          800: "#2e402e",
          900: "#273527",
          950: "#121c12",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "check": "check 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        check: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
