# data-locales

> Generate locales and localized data.

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![npm version](https://img.shields.io/npm/v/data-locales.svg?style=flat-square)](https://www.npmjs.org/package/data-locales)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/badge/license-UNLICENSE-green.svg?style=flat-square)](https://github.com/thierrymichel/data-locales/blob/master/UNLICENSE)
[![CircleCI](https://img.shields.io/circleci/project/github/thierrymichel/data-locales/master.svg?style=flat-square)](https://circleci.com/gh/thierrymichel/data-locales/tree/master)
[![Coverage Status](https://img.shields.io/coveralls/github/thierrymichel/data-locales/master.svg?style=flat-square)](https://coveralls.io/github/thierrymichel/data-locales?branch=master)

---

## How it works

- It take structured data (JavaScript or JSON);
- look for `$properties` (`$` leading);
- create a "locale" string;
- save it;
- assign it to new "localized" data file.

## Example

### Sources

### example/test.js

```js
export default {
  test: {
    $localizeMe: 'foo',
    dontTouchMe: 'bar',
  },
}
```

### example/test2.json

```json
{
  "test2": {
    "$localizeMe": "baz",
    "dontTouchMe": "qux"
  }
}
```

### Command

```sh
data-locales -e 'example/*.(js|json)' -d 'data' -l 'locales' -f 'EN'
```

### Outputs

#### data/test.json

```json
{
  "test": {
    "$localizeMe": "test.localizeMe",
    "dontTouchMe": "bar"
  }
}
```

#### data/test2.json

```json
{
  "test2": {
    "$localizeMe": "test2.localizeMe",
    "dontTouchMe": "bar"
  }
}
```

#### locales/EN.json

```json
{
  "test.localizeMe": "foo",
  "test2.localizeMe": "baz",
}
```
