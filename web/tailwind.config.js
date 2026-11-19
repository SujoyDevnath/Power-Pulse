/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        outage: {
          red: '#ef4444',
          amber: '#f59e0b',
          yellow: '#eab308',
          green: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
