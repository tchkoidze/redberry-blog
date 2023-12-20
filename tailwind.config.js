/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: ["FiraGO", "sans-serif"],
      },
      colors: {
        "blue-magenta": "#5D37F3",
        black: "#1A1A1F",
        "ghost-white": "#F3F2FA",
        "bg-black": "rgba(26, 26, 31, 0.24)",
      },
    },
  },
  plugins: [],
};
