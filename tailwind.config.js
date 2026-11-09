/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "obsidian": "#070709",
        "surface-slate": "#131317",
        "surface-container": "#201f22",
        "surface-bright": "#39393b",
        "crimson-glow": "#5C1322",
        "crimson-deep": "#2D0A12",
        "silver-hairline": "#C4C8D0",
        "jade-accent": "#1A3D32",
        "secondary": "#44e2cd",
        "secondary-container": "#03c6b2",
        "primary": "#F5F5F7",
        "on-surface-variant": "#9EA2AA",
        "outline-variant": "rgba(255, 255, 255, 0.08)"
      },
      fontFamily: {
        "display-hero": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-mono-sm": ["Space Grotesk", "monospace"],
        "label-mono-md": ["Space Grotesk", "monospace"]
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
