/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#F6B21B", dark: "#D99A0B", light: "#FFF6DD" },
        navy: { DEFAULT: "#0B1623", 800: "#101F31", 700: "#16293F" },
      },
      fontFamily: { sans: ["var(--font-poppins)", "system-ui", "sans-serif"] },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shine: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "100%": { transform: "translateX(220%) skewX(-20deg)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: ".6" }, "100%": { transform: "scale(1.8)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 4s ease-in-out infinite",
        shine: "shine 1.1s ease-in-out",
        pulseRing: "pulseRing 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
