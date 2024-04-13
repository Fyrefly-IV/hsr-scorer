import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        anuphan: ["Anuphan", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
