import { d as o, o as t, c as n, a as s } from './app-16f6e0b8.js';
const c = { class: 'markdown-body' },
  a = s('h1', null, 'Hi, Cooking', -1),
  r = [a],
  m = {},
  l = '',
  f = o({
    __name: 'cooking',
    setup(_, { expose: e }) {
      return (
        e({ frontmatter: {}, excerpt: void 0 }), (d, i) => (t(), n('div', c, r))
      );
    }
  });
export { f as default, l as excerpt, m as frontmatter };
