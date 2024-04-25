/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c99700",
        },
        sfsuPurple: {
          DEFAULT: "#463077",
        },
      },
      keyframes: {
        slideOutLeft: {
          from: { transform: "translateX(0%)", opacity: 1 },
          to: { transform: "translateX(-100%)", opacity: 0 },
        },
        slideOutRight: {
          from: { transform: "translateX(0%)", opacity: 1 },
          to: { transform: "translateX(100%)", opacity: 0 },
        },
      },
      animation: {
        "slide-out-left": "slideOutLeft 500ms forwards",
        "slide-out-right": "slideOutRight 500ms forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
