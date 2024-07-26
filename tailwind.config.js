/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
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
      height: {
        13: "3.25rem",
        128: "32rem",
        150: "37.5rem",
        "fit-layout": "calc(100vh - 88px)",
        banner: "32vw",
      },
      minHeight: {
        "fit-layout": "calc(100vh - 88px)",
        13: "3.25rem",
        20: "5rem",
        88: "22rem",
      },
      width: {
        56: "14rem",
        160: "40rem",
        200: "50rem",
        320: "80rem",
        "fit-layout": "calc(100% - 288px)",
      },
      minWidth: {
        48: "12rem",
        84: "21rem",
      },
      maxWidth: {
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
      backgroundImage: {
        banner: "url('https://cdn.tgdd.vn/2024/06/banner/banner-big--Desk--1920x450.png')",
      },
      fontSize: {
        title: "3vw",
        small: "1vw",
        medium: "2vw",
        large: "4vw",
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
