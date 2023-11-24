/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      navRed: "#ef5552",
      bgLight: "#F2F2F7",
      dark: "#1F2A37",
      borderDark: "#cccccc",
      borderGrey: "#E5E7EB",
      textLightBlack: "#4D4D4D",
      textGrey: "#808080",
      textRed: "#d33131",
      bgGreenEligible: "#BBF7D0",
      textGreenEligible: "#166534",
      bgYellowEligible: "#fce090",
      textYellowEligible: "#EA580C",
      bgLightRed: "#f7cdcd",
      white: "#ffffff",
      black: "#000000",
    },
    extend: {
      dropShadow: {
        "3xl": "8px 5px 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("daisyui")],
};
