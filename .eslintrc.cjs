module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "@typescript-eslint/no-shadow": 1,
    "prefer-arrow-callback": [
      2,
      {
        // react forward ref
        allowNamedFunctions: true,
      },
    ],
    "arrow-body-style": 0,
    "import/prefer-default-export": 0,
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: "**/*.test.{ts,tsx}",
      rules: {
        "import/no-extraneous-dependencies": 0,
      },
    },
  ],
};
