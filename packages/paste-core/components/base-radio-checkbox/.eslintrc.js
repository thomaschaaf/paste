const mainConfig = require('../../../../.eslintrc.base.js');

module.exports = {
  ...mainConfig(tsConfigPath),
  root: true,
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
};
