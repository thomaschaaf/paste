const mainConfig = require('../../../../.eslintrc.base.js');
const path = require('path');

const tsConfigPath = path.resolve(__dirname, './tsconfig.eslint.json');

module.exports = {
  ...mainConfig(tsConfigPath),
  root: true,
};
