const mainConfig = require('../../../../.eslintrc');

module.exports = {
  ...mainConfig,
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
