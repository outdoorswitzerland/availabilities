const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#171717",
        white: "#ffffff",
        primary: "#2C9199",
        oRed: "#e52325",
        ogray10: "#FAFAFA",
        ogray20: "#F4F4F5",
        ogray30: "#E4E4E7",
        ogray40: "#D4D4D8",
        ogray50: "#A1A1AA",
        ogray60: "#71717A",
        ogray70: "#52525B",
        ogray80: "#3F3F46",
        ogray90: "#27272A",
      },
      fontFamily: {
        sans: ["futuraRound", ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        padding: "2rem",
      },
      zIndex: {
        "-1": "-1",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
};
