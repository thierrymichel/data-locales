const chalk = require('chalk'); // tslint:disable-line
import fs = require('fs');
import globby = require('globby');
import pMap = require('p-map');
import path = require('path');

// Definitions
export interface IOptions {
  source?: string | object;
  dataDir?: string;
  localesDir?: string;
  localesFile?: string;
  delimiter?: string;
}
interface IOutput {
  data: any;
  locales: any;
}

function isIterable(value: any): boolean {
  const type = Object.prototype.toString.call(value);

  return type === '[object Object]' || type === '[object Array]';
}

export function parser(source: object, delimiter: string = '.'): IOutput {
  const data = { ...source };
  const locales = {};

  function parse(object: object, prev?: string) {
    Object.keys(object).forEach(key => {
      const value = object[key];
      let newKey = prev ? prev + delimiter + key : key;

      if (isIterable(value) && Object.keys(value).length) {
        return parse(value, newKey);
      }

      if (key.match(/^\$.+/)) {
        const i = newKey.lastIndexOf(key);
        const localeStr = newKey.slice(0, i) + newKey.slice(i + 1);

        object[key] = localeStr;
        newKey = localeStr;
        locales[newKey] = value;
      }
    });
  }

  parse(data);

  return { data, locales };
}

async function run({
  source = 'data.js',
  dataDir = 'data',
  localesDir = 'locales',
  localesFile = 'locales',
  delimiter = '.',
}: IOptions = {}) {
  const dest = {
    data: path.resolve(process.cwd(), dataDir),
    locales: path.resolve(process.cwd(), localesDir),
  };
  let locales = {};
  let entries: Array<string | object>;

  // Check/create destination directories
  Object.keys(dest).forEach(key => {
    try {
      /* istanbul ignore else */
      if (!fs.existsSync(dest[key])) {
        fs.mkdirSync(dest[key]);
      }
      console.info(
        `${key.toUpperCase()} directory: ${chalk.yellow(dest[key])}`
      );
    } catch (err) {
      /* istanbul ignore next */
      console.error(err);
    }
  });

  if (isIterable(source)) {
    entries = [source];
  } else {
    entries = await globby(source as string);
  }

  entries.forEach(entry => {
    const { base, name, ext } = isIterable(entry)
      ? {
          base: 'data.json',
          ext: 'json',
          name: 'data',
        }
      : path.parse(entry as string);
    const raw = isIterable(entry)
      ? entry
      : require(path.resolve(process.cwd(), entry as string));
    const { data, locales: newLocales } = parser(raw, delimiter);

    // Merge locales
    locales = {
      ...locales,
      ...newLocales,
    };

    // Write data files
    // TODO: check for data ? Do not write empty file ?
    // TODO: async ?
    fs.writeFileSync(
      path.join(dest.data, `${name}.json`),
      JSON.stringify(data)
      // err => {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log(`📦 ${chalk.green('Data have been saved!')} [${base}]`);
      // }
    );
    console.log(`📦 ${chalk.green('Data have been saved!')} [${base}]`);
  });

  // TODO: async?
  fs.writeFileSync(
    path.join(dest.locales, `${localesFile}.json`),
    JSON.stringify(locales)
    // err => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log(
    //     `💬 ${chalk.green('Locales have been saved!')} [${localesFile}.json]`
    //   );
    // }
  );
  console.log(
    `💬 ${chalk.green('Locales have been saved!')} [${localesFile}.json]`
  );
}

export default run;
