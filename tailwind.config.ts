import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sage archetype color palette - earth tones, wisdom, credibility
        sage: {
          50: '#f7f7f6',
          100: '#e8e7e3',
          200: '#d4d2ca',
          300: '#b8b5aa',
          400: '#9c9789',
          500: '#7d7a6d',
          600: '#67645a',
          700: '#55534b',
          800: '#484740',
          900: '#3d3c36',
        },
        earth: {
          50: '#f9f8f6',
          100: '#efeee8',
          200: '#dddad0',
          300: '#c4bfaf',
          400: '#a8a18c',
          500: '#8e8671',
          600: '#706b5a',
          700: '#5a564a',
          800: '#4a473e',
          900: '#3f3d36',
        },
        warm: {
          50: '#faf8f5',
          100: '#f3ede3',
          200: '#e6d9c5',
          300: '#d4bf9f',
          400: '#c0a478',
          500: '#a8875a',
          600: '#8f6f4d',
          700: '#735842',
          800: '#5f4939',
          900: '#4f3d31',
        }
      },
      fontFamily: {
        // Sage archetype typography - scholarly, trustworthy
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
