/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green':'#00B33D',
        'spotify-dark-green': '#007026',
      }
    },
  },
  plugins: [],
}

