import { d as t, o as n, c as s, a as e } from './app-16f6e0b8.js';
const c = { class: 'markdown-body' },
  a = e('h1', null, 'Hi, Markdown', -1),
  r = e('p', null, 'technology', -1),
  _ = [a, r],
  m = {},
  h = '',
  f = t({
    __name: 'index',
    setup(d, { expose: o }) {
      return (
        o({ frontmatter: {}, excerpt: void 0 }), (i, p) => (n(), s('div', c, _))
      );
    }
  });
export { f as default, h as excerpt, m as frontmatter };
