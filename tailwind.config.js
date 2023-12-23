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
        "blue-focused": "#F7F7FF",
        "blue-default": "#F4F3FF",
        black: "#1A1A1F",
        "ghost-white": "#F3F2FA",
        "bg-black": "rgba(26, 26, 31, 0.24)",
        "red-bg": "#FAF2F3",
        "red-txt": "#EA1919",
        grey: "#E4E3EB",
        "grey-bg": "#FCFCFD",
        "grey-hover": "#F9F9FA",
        "green-dark": "#14D81C",
        "green-light": "#F8FFF8",
        "default-input-grey": "#85858D",
      },
    },
  },
  plugins: [],
};
