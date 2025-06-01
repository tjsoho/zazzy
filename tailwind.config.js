module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        bebas: ["Bebas Neue", "cursive"],
      },
      colors: {
        adminPurple: "#a084e8",
        adminPink: "#ff7eb9",
        adminYellow: "#ffe156",
        adminGreen: "#6ee7b7",
        adminOrange: "#ffb86b",
        adminBlue: "#57c7ff",
        adminRed: "#ff5e5b",
        adminBg: "#f7f7fa",
      },
   
    },
  },
  plugins: [],
};
