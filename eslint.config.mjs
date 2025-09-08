import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    // Browser globals for your src/
    files: ["src/**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  {
    // Node globals for config files
    files: [
      "webpack.*.js",
      "babel.config.js",
      "jest.config.js",
      "eslint.config.mjs",
    ],
    languageOptions: { globals: globals.node },
  },
  {
    // Jest globals for tests
    files: ["**/*.test.{js,mjs,cjs}"],
    languageOptions: { globals: globals.jest },
  },
]);
