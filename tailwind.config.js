/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          0: '#FFFFFF',
          300: '#996DFF',
          500: '#8257e6'
        },
      }
    },
  },
  plugins: [],
}
