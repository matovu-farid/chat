/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        lg: "0 0 20px 0 rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        sidebarOpen: {
          "0%": { transform: "translateX(-250px)" },
          "25%": { transform: "translateX(-188px)" },
          "50%": { transform: "translateX(-125px)" },
          "75%": { transform: "translateX(-63px)" },
          "100%": { transform: "translateX(0)" },
        },
        overlay: {
          "0%": { opacity: "0" },

          "50%": { opacity: "0.2" },

          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
