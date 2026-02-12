import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#144bb8",
        "rize-green": "#228b22",
        "accent-green": "#1e5128",
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
        "navy-custom": "#0f172a",
      },
      fontFamily: {
        display: ["var(--font-lexend)", "Lexend", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
