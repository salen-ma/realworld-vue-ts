module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'operator-linebreak': 'off',
    'lines-between-class-members': 'off',
    semi: 'off',
    'object-curly-spacing': 'off',
    indent: 'off',
    'array-bracket-spacing': 'off',
    'comma-dangle': 'off'
  }
}
