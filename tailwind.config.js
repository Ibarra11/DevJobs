const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      violet: "hsl(27deg, 22% 51%)",
      lightviolet: "hsl(235deg, 82%, 77%)",
      darkblue: "hsl(219deg, 29%, 14%)",
      midnight: "hsl(220deg, 29%, 10%)",
      white: "hsl(0deg, 0%, 100%)",
      lightgrey: "hsl(210deg, 22%, 96%)",
      gray: "hsl(212deg, 23%, 69%)",
      darkgray: "hsl(214deg, 17%, 51%)",
    },
    extend: {
      fontFamily: {
        serif: ["Kumbh Sans", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
