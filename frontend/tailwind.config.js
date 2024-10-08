/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "darkGrey": "#27374D",
        "grey": "#526D82",
        "coolGrey": "#9DB2BF",
        "lightGrey": "#DDE6ED",
      },
    },
  },
  daisyui: {
    themes: ["light"],  
  },
  plugins: [
    require('daisyui'),
  ],
};
