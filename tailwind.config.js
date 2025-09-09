/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d7efff',
          200: '#b8e3ff',
          300: '#89d1ff',
          400: '#57b7ff',
          500: '#2a98ff',
          600: '#0f7ef2',
          700: '#0b64c2',
          800: '#0c5099',
          900: '#0d427c'
        }
      },
      boxShadow: {
        glow: '0 10px 30px -12px rgba(42,152,255,.45)'
      },
      backgroundImage: {
        'grid': "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
        'hero': 'radial-gradient(1200px 500px at 50% -10%, rgba(42,152,255,.25), transparent), radial-gradient(800px 400px at 80% -10%, rgba(255,255,255,.08), transparent)'
      }
    },
  },
  plugins: [],
}
