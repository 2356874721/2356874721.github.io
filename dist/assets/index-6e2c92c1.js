import { d as o, o as n, c as s, a as e } from './app-16f6e0b8.js';
const c = { class: 'markdown-body' },
  a = e('h1', null, 'Hi, Markdown', -1),
  r = e('p', null, 'life', -1),
  _ = [a, r],
  m = {},
  f = '',
  h = o({
    __name: 'index',
    setup(d, { expose: t }) {
      return (
        t({ frontmatter: {}, excerpt: void 0 }), (i, p) => (n(), s('div', c, _))
      );
    }
  });
export { h as default, f as excerpt, m as frontmatter };
