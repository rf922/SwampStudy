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
        flip: {
          "0%": { transform: "rotateY(0)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        flipBack: {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0)" },
        },
      },
      animation: {
        "slide-out-left": "slideOutLeft 500ms forwards",
        "slide-out-right": "slideOutRight 500ms forwards",
        flip: "flip 1s forwards",
        flipBack: "flipBack 1s forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
