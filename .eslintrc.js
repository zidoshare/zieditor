const eslintrc = {
  extends: ['eslint-config-airbnb'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  rules: {
    'strict': 0,
    'indent': [
      "error",
      2,
      {
        SwitchCase: 1,
      }
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'nerver',
    ],
  }
}

module.exports = eslintrc