const del = require('del'); // tslint:disable-line
import fs = require('fs');

import run from '../src/index';
const raw = require('./entries/test.js'); // tslint:disable-line

const options = {
  dataDir: '__tests__/data',
  delimiter: '.',
  localesDir: '__tests__/locales',
  localesFile: 'locales',
  source: '__tests__/entries/*.(js|json)',
};

afterEach(async () => {
  await del(['__tests__/data', '__tests__/locales', 'data', 'locales']);
});

describe('data file', () => {
  it('is created', async () => {
    await run(options);
    fs.exists('__tests__/data/test.json', exists => {
      expect(exists).toBeTruthy();
    });
  });
});

describe('locales file', () => {
  it('is created', async () => {
    await run(options);
    fs.exists('__tests__/locales/locales.json', exists => {
      expect(exists).toBeTruthy();
    });
  });
});

describe('run', () => {
  it('accept raw data as source', async () => {
    await run({
      ...options,
      source: raw,
    });

    fs.exists('__tests__/data/data.json', exists => {
      expect(exists).toBeTruthy();
    });
  });
});

describe('run', () => {
  it('accept no options', async () => {
    await run();

    fs.exists('data/data.json', exists => {
      expect(exists).toBeFalsy();
    });
    fs.exists('locales/locales.json', exists => {
      expect(exists).toBeTruthy();
    });
  });
});

describe('update', () => {
  it('update existing locales', async () => {
    fs.mkdirSync('__tests__/locales');
    fs.writeFileSync('__tests__/locales/vl.json', '{}');

    await run(options);

    fs.exists('__tests__/locales/vl.json', exists => {
      expect(exists).toBeTruthy();
    });
    fs.exists('__tests__/locales/locales.json', exists => {
      expect(exists).toBeFalsy();
    });
  });
});
