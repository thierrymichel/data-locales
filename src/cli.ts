#!/usr/bin/env node

import program = require('commander');
import run from './index';
import { IOptions } from './index';

program
  .option('-e, --entry [path]', '<path|glob> …')
  .option('-d, --dataDir [path]', 'Output directory for data.')
  .option('-l, --localesDir [path]', 'Output directory for locales.')
  .option('-f, --localesFile [name]', 'Filename for locales.')
  .option('-w, --watch', 'watch mode')
  .option('-v, --verbose', 'output extra debugging');

program.parse(process.argv);

if (program.verbose) {
  console.log(program.opts());
}

const options: IOptions = {};

if (program.entry) {
  options.source = program.entry;
}
if (program.dataDir) {
  options.dataDir = program.dataDir;
}
if (program.localesDir) {
  options.localesDir = program.localesDir;
}
if (program.localesFile) {
  options.localesFile = program.localesFile;
}

run(options);
