module.exports = {
  content: ["src/**/*.{js,ts,jsx,tsx}", "index.html"],
  corePlugins: {
    container: false,
  },
  theme: {
    fontSize: {
      xxs: "0.5rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.875rem",
      "3xl": "2rem",
      "4xl": "2.125rem",
      "5xl": "2.25rem",
      "6xl": "2.5rem",
      "7xl": "2.875rem",
      "8xl": "3rem",
      "9xl": "3.125rem",
      "10xl": "3.25rem",
      "11xl": "3.5rem",
      "12xl": "3.875rem",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
    screens: {
      xs: "400px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#FFC14D",
        success: "#309975",
        danger: "#FF4D4D",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          margin: "0 auto",
          maxWidth: "100%",
          padding: "1em",
          "@screen sm": {
            maxWidth: "600px",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "980px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
          "@screen 2xl": {
            maxWidth: "1400px",
          },
        },
      });
    },
  ],
};
