/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      },
      padding: {
        4.5: "1.125rem",
      },
      margin: {
        18: "4.5rem",
      },
      colors: {
        primary: {
          ...colors.red,
          700: "#bf1922",
          600: "#ff102d",
          500: "#e32832",
        },
        yellow: {
          ...colors.yellow,
          600: "#ffa600",
        },
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "9/16": "9 / 16",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        primary: "9999px",
      },
      height: {
        4.5: "18px",
        13: "3.25rem",
        150: "37.5rem",
        "fit-layout": "calc(100vh - 80px)",
      },
      minHeight: {
        "fit-layout": "calc(100vh - 80px)",
        13: "3.25rem",
        20: "5rem",
        52: "13rem",
        88: "22rem",
      },
      maxHeight: {
        "fit-layout": "calc(100vh - 80px)",
      },
      inset: {
        22: "5.5rem",
        26.5: "6.625rem",
      },
      scale: {
        25: "0.25",
        120: "1.2",
        140: "1.4",
        160: "1.6",
        175: "1.75",
        180: "1.8",
        200: "2.00",
      },
      width: {
        13: "3.25rem",
        4.5: "18px",
        56: "14rem",
        128: "32rem",
        160: "40rem",
        200: "50rem",
        300: "75rem",
        320: "80rem",
        "fit-layout": "calc(100% - 288px)",
      },
      minWidth: {
        16: "4rem",
        48: "12rem",
        84: "21rem",
      },
      maxWidth: {
        20: "5rem",
        48: "12rem",
        320: "80rem",
      },
      spacing: {
        0.25: "0.0625rem",
        0.75: "0.1875rem",
        4.5: "1.125rem",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        base: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
