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
          glow: 'rgba(212, 175, 55, 0.4)',
        },
        charcoal: {
          DEFAULT: '#0a0a0a',
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
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-delay-1': 'fadeInUp 0.6s ease-out 0.1s forwards',
        'fade-in-delay-2': 'fadeInUp 0.6s ease-out 0.2s forwards',
        'fade-in-delay-3': 'fadeInUp 0.6s ease-out 0.3s forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'gradient-radial-gold': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.15), transparent)',
        'gradient-radial-gold-strong': 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212, 175, 55, 0.2), transparent 60%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 0 50px rgba(212, 175, 55, 0.3)',
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.4)',
        'inner-gold': 'inset 0 0 30px rgba(212, 175, 55, 0.1)',
      },
    },
  },
  plugins: [],
}
