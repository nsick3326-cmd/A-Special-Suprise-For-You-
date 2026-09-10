/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        galaxy: {
          deep: '#0F0C24',
          card: '#161135',
          lavender: '#C8B6FF',
          sky: '#A0C4FF',
          pink: '#FFAEE2',
          purple: '#9FA1FF',
          mint: '#D9F9DF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        handwriting: ['Caveat', 'Sacramento', 'Dancing Script', 'cursive'],
        mono: ['Space Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(200, 182, 255, 0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(255, 174, 226, 0.9))' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'glow-lavender': '0 0 25px rgba(200, 182, 255, 0.4)',
        'glow-pink': '0 0 25px rgba(255, 174, 226, 0.4)',
        'glass-dark': '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 20px rgba(200, 182, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
