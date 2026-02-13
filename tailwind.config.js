/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "dot-flip": {
          "0%,25%": { backgroundColor: "#ef4444" },
          "50%": { backgroundColor: "#9ca3af" },
        },
      },
      animation: {
        "dot-flip": "dot-flip 1.2s infinite",
      },
    },
  },
  plugins: [],
};
