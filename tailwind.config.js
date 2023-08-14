module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    listStyleType: {
      square: "square",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
