/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      "cupcake",
      "dark", 
      "cyberpunk",
      "forest",
      "business",
      "night",
      "bumblebee",
      "retro",
      "synthwave", 
      "valentine",
      "aqua",
      "dracula",
      "luxury",
      "coffee",
      "winter",
      "garden",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe"
    ],
  }
}