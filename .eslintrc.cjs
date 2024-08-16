module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      "files": ["*.cjs"],
      "env": {
        "node": true,
        "commonjs": true
      },
      "parserOptions": {
        "sourceType": "script" // 设置为 'script' 以允许 CommonJS 语法
      },
      "rules": {
        // 允许使用 require
        "@typescript-eslint/no-var-requires": "off",
        "no-undef": "off"
      }
    }
  ]
}
