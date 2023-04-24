const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ["@typescript-eslint"],

  extends: [
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:markdown/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],

  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },

  overrides: [
    {
      files: ["*.vue"],
      parser: require.resolve("vue-eslint-parser"),
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    {
      files: ["*.json", "*.json5", "*.jsonc"],
      parser: "jsonc-eslint-parser",
    },
  ],
});
