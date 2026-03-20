/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E6',
          100: '#F5E9C4',
          200: '#EBD489',
          300: '#E1BF4E',
          400: '#D4AF37',
          500: '#B8942E',
          600: '#9C7A26',
          700: '#80601E',
          800: '#644616',
          900: '#482C0E',
        },
        charcoal: {
          DEFAULT: '#111111',
          50: '#2a2a2a',
          100: '#1f1f1f',
          200: '#171717',
          300: '#111111',
          400: '#0a0a0a',
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
