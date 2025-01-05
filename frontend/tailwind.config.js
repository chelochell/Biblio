/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bellota: ['Bellota', 'cursive'],
        geologica: ['Geologica', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        'text-color': '#444444', // Custom text color
        'background-color': '#F2F2F2', // Custom background color
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
