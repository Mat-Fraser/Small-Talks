/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop:"Great Vibes, cursive",
        poppins:"Dancing Script, cursive",
        popin:"Poppins",
      }
    },
  },
  plugins: [],
};
