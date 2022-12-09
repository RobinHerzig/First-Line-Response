/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    screens: {
      csm: '544px',
      cmd: '800px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#075985",
          "secondary": "#0284c7",
          "accent": "#5b21b6",
          "neutral": "#191D24",
          "base-100": "#2A303C",
          "info": "#075985",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}