/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0f7f4',
          100: '#dbede4',
          200: '#b9ddca',
          300: '#8cc6a9',
          400: '#5da884',
          500: '#3d8b66',
          600: '#2c6f50',
          700: '#245940',
          800: '#1e4836',
          900: '#193c2d',
          950: '#0d2118',
        },
        accent: {
          50: '#f0f6ff',
          100: '#dbe8fe',
          200: '#bdd1fe',
          300: '#92b4fd',
          400: '#618cfc',
          500: '#3b66f7',
          600: '#2549ed',
          700: '#1d39d4',
          800: '#1e32ab',
          900: '#1e3088',
          950: '#172054',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
