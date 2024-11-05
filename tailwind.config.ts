import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#1D4E89", // Teal Blue - Darker Shade
          700: "#2E7DBD", // Teal Blue - Default Button Color
          500: "#4C9FCC", // Teal Blue - Lighter Shade
          300: "#75BCE6", // Teal Blue - Lightest Shade
        },
        secondary: {
          900: "#D85555", // Coral - Darker Shade
          700: "#FF6B6B", // Coral - Default Highlight Color
          500: "#FF8E72", // Salmon - Lighter Shade
          300: "#FFC1A1", // Salmon - Lightest Shade
        },
        background: {
          100: "#F9FAFB", // Off-white - Main Background
          200: "#ECEFF1", // Light Gray - Secondary Background
        },
        neutral: {
          900: "#333333", // Charcoal - Dark Text Color
          700: "#595959", // Slightly Lighter Charcoal
          500: "#A1A1A1", // Medium Gray - For Borders or Dividers
          300: "#D9D9D9", // Light Gray - Secondary Elements
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [],
  },
};
export default config;
