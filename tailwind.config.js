/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4E9F3D',
        'secondary': '#1E5128',
        'dark': '#191A19',
        'light': '#D8E9A8',
      }
    },
  },
  plugins: [],
}
