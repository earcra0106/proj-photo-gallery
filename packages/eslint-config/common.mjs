export const sharedEslintConfig = {
  ignores: ["eslint.config.mjs"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
