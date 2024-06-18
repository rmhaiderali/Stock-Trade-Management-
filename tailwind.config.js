/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1D4ED8', // Blue-700
        secondary: '#D97706', // Amber-700
        button: '#10B981', // Green-500
        accent: '#F59E0B', // Amber-500
        muted: '#6B7280', // Gray-500
        background: '#223852',
        yellow: '#f9d949',
      },
    },
  },
  plugins: [],
}
