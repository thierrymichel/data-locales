import { parser } from '../src/index';

describe('parser', () => {
  it('accept empty object', () => {
    const result = parser({});
    const { data, locales } = result;

    expect(data).toStrictEqual({});
    expect(locales).toStrictEqual({});
  });
});

describe('parser', () => {
  it('accept empty array', () => {
    const result = parser({});
    const { data, locales } = result;

    expect(data).toStrictEqual({});
    expect(locales).toStrictEqual({});
  });
});

describe('parser', () => {
  it('accept 1 level with string', () => {
    const result = parser({
      $foo: 'bar',
      baz: 'qux',
    });
    const { data, locales } = result;

    expect(data.$foo).toBe('foo');
    expect(data.baz).toBe('qux');
    expect(locales.foo).toBe('bar');
    expect(locales.baz).toBeUndefined();
  });
});

describe('parser', () => {
  it('accept 2 levels string', () => {
    const result = parser({
      module: {
        $foo: 'bar',
        baz: 'qux',
      },
    });
    const { data, locales } = result;

    expect(data.module.$foo).toBe('module.foo');
    expect(data.module.baz).toBe('qux');
    expect(locales['module.foo']).toBe('bar');
    expect(locales['module.baz']).toBeUndefined();
  });
});
