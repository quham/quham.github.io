import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'navy': {
          800: '#0f2147',
          900: '#0c1b3d',
        },
        // Light theme colors
        'light': {
          50: '#fafbfc',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
        },
        // Accent colors that work in both themes
        'accent': {
          cyan: '#00b4d8',
          blue: '#0077b6',
          purple: '#7209b7',
          pink: '#f72585',
        }
      },
    },
  },
  plugins: [],
} satisfies Config


