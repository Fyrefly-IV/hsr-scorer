import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        anuphan: ["Anuphan", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
