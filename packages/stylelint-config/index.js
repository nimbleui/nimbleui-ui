module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    "no-missing-end-of-source-newline": null,
    "declaration-block-no-duplicate-properties": true,
    "no-invalid-double-slash-comments": null,
  },
};
