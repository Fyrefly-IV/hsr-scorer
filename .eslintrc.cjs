/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "@feature-sliced",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
