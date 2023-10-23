const camelize = (str: string): string =>
  str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

// 修饰符类型
type modsType =
  | Record<string, boolean>
  | Array<string | Record<string, boolean>>;

function genBem(name: string, mods: string): string;
function genBem(name: string, mods?: modsType): string;
function genBem(name: string, mods?: unknown): string {
  if (!mods || mods === 'undefined') return '';

  if (typeof mods == 'string') return ` ${name}--${mods.toLowerCase()}`;

  if (mods instanceof Array) {
    return mods.reduce((ret, item) => ret + genBem(name, item), '');
  }

  return Object.keys(mods as Record<string, boolean>).reduce(
    (ret, key) =>
      ret + ((mods as Record<string, boolean>)[key] ? genBem(name, key) : ''),
    ''
  );
}

/**
 * CSS-BEM 命名规范: block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名。
 *
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function createBEM(name: string) {
  return (el?: string | modsType, mods?: modsType) => {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }
    el = el ? `${name}__${el}` : name;
    return `${el}${genBem(el, mods)}`;
  };
}

function useNamespace(name: string) {
  const prefixedName = `blog-${name}`;

  return {
    name: camelize(`-${prefixedName}`),
    prefixedName,
    prefixCls: prefixedName,
    bem: createBEM(prefixedName)
  };
}

export { useNamespace };
