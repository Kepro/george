/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "george-dark": "#005b94",
        "george-light": "#0076b3",
      },
    },
  },
  plugins: [],
};
