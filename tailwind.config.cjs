/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'lg': '0 0 20px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};
