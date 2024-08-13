module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.app.json' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'arrow-parens': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'linebreak-style': 0,
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'operator-linebreak': 'off',
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-nested-ternary': 'off',
  },
};
