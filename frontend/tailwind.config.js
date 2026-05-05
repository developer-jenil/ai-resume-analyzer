/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          400: "#7c8cff",
          500: "#5b6df8",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(124,140,255,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
