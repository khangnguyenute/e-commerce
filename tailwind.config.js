/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
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
        13: "3.25rem",
        20: "5rem",
        88: "22rem",
        "fit-layout": "calc(100vh - 88px)",
        banner: "12rem",
      },
      maxHeight: {
        "1/2": "50%",
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
        22: "5.5rem",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        base: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        banner: "url('https://cdn.tgdd.vn/2024/06/banner/banner-big--Desk--1920x450.png')",
        footer:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/src/assets/images/footer.png')",
        tag: "linear-gradient(to right top, #1746a2, #2b5bb7, #3c70cd, #4d86e2, #5f9df7)",
        phone: "linear-gradient(to right top, #ef4444, #f56234, #f67e23, #f29911, #eab308)",
        tablet: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
        laptop: "linear-gradient(to right top, #fbbf24, #aab833, #65a751, #2b9067, #0f766e)",
      },
      fontSize: {
        xxs: "12px",
      },
      screens: {
        ...defaultTheme.screens,
        xs: "360px",
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
