module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "prettier/prettier": [
      1
    ],
    "react/prop-types": "off",
    "react/function-component-definition": [1, {
      "namedComponents": "arrow-function",
      "unnamedComponents": "arrow-function"
    }],
    "@typescript-eslint/no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
    "react/display-name": "off",
    "react/self-closing-comp": [1],
    "curly": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-restricted-imports": ["error", ".."]
  },
};
