/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0ea5e9',
        },
        navy: {
          700: '#16325c',
        },
        rust: {
          300: '#ecb099',
          600: '#c44c35',
          700: '#9f3723',
        },
        gold: {
          300: '#f0cb6a',
          400: '#e8b94f',
        },
      },
      boxShadow: {
        soft: '0 12px 35px rgba(15, 23, 42, 0.12)',
        card: '0 24px 70px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
