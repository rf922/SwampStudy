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
    },
  },
  plugins: [],
};
