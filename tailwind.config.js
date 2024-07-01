/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin'); 

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
        'light-blue': '#3B86FF',
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('current', '&.active');
    })
  ],
}

