import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VitePages from 'vite-plugin-pages';
import { resolve } from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import ViteMarkdown from 'vite-plugin-md';
import ViteComponents from 'unplugin-vue-components/vite';
import Prism from 'markdown-it-prism';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    VitePages({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1));
        const md = fs.readFileSync(path, 'utf-8');
        const { data } = matter(md);
        route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        return route;
      }
    }),
    ViteMarkdown({
      wrapperComponent: 'Detail',
      markdownItSetup: (md) => {
        md.use(Prism);
      }
    }),
    ViteComponents({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.md$/]
    })
  ]
});
