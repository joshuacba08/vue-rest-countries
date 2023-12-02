/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      darkBlue: 'hsl(209, 23%, 22%)',
      veryDarkBlueDark: 'hsl(207, 26%, 17%)',
      veryDarkBlueLight: 'hsl(200, 15%, 8%)',
      darkGray: 'hsl(0, 0%, 52%)',
      veryLightGray: 'hsl(0, 0%, 98%)',
      white: 'hsl(0, 0%, 100%)',
    },
    fontFamily:{
      sans: ['Nunito Sans', 'sans-serif'],
    },
  },
  plugins: [],
}