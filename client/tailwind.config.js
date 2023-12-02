/** @type {import('tailwindcss').Config} */

module.exports = {
  plugins:[
    require('tailwindcss'),
    require('@tailwindcss/aspect-ratio'),
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#471AA0","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
      fontFamily: {
        Montserrat: ['Montserrat','sans-serif'],
      },
    }
  },
  plugins: [],
}

