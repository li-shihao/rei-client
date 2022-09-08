/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "test-image": "url('../public/login-bg.jpg')",
      },
      fontFamily: {
        SKConcretica: ["SKConcretica"],
      },
    },
  },
  plugins: [require("daisyui")],
};
