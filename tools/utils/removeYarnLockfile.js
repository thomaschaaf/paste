const shell = require('shelljs');
const {resolve} = require('path');
const chalk = require('chalk');

async function removeLockfile() {
  // eslint-disable-next-line no-console
  console.log(chalk.red('[Monorepo] Removing pnpm-lock.yaml file.'));
  shell.rm(resolve(__dirname, '../../pnpm-lock.yaml'));
}

module.exports = {
  removeLockfile,
};
