/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add the custom fonts
        'cormorant-garamond': ['Cormorant Garamond', 'serif'],
        'urbanist': ['Urbanist', 'sans-serif'],
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