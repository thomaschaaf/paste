const mainConfig = require('../../../../.eslintrc');

console.log('henlo is this running omg what is happening');

module.exports = {
  ...mainConfig,
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
