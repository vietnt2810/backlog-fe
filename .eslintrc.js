module.exports = {
  env: {
    jest: true,
  },
  extends: ["airbnb-typescript-prettier"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    project: ["./tsconfig.json"],
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: false,
        printWidth: 80,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto",
      },
    ],
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ["ts", "tsx"],
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "no-unused-expressions": "off",
    "import/no-cycle": 0,
    "no-param-reassign": ["error", { props: false }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "react/button-has-type": 0,
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "styles/**",
            group: "internal",
            position: "after",
          },
          { group: "builtin", pattern: "react", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "react/function-component-definition": [
      1,
      {
        namedComponents: ["arrow-function"],
      },
    ],
    "react/no-unstable-nested-components": [
      "off" | "warn" | "error",
      {
        allowAsProps: true | false,
        customValidators:
          [] /* optional array of validators used for propTypes validation */,
      },
    ],
    "import/no-unresolved": [2, { caseSensitive: false }],
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
    "import/no-duplicates": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
