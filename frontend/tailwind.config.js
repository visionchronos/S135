/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        linkedin: {
          50: '#f0f7fd',
          100: '#e8f3fc',
          200: '#cfe5f9',
          300: '#a3d0f4',
          400: '#70b3ed',
          500: '#0a66c2',
          600: '#004182',
          700: '#003366',
          800: '#00264d',
          900: '#09223b',
          canvas: '#f3f2ef',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e0dfdc',
          text: '#191919',
          muted: '#666666',
          darkBg: '#1d2226',
          darkSurface: '#242a30',
          darkCard: '#1b1f23',
          darkBorder: '#38434f'
        },
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        navy: {
          800: '#111827',
          850: '#0e1626',
          900: '#090d16',
          950: '#05080e',
        },
        saffron: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(16, 185, 129, 0.2)',
        'glow-md': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
