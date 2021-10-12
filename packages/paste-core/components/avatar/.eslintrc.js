const mainConfig = require('../../../../.eslintrc.js');

module.exports = {
  ...mainConfig,
  root: true,
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
};
