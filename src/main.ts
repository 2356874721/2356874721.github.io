import App from './App.vue';
import routes from 'pages-generated';
import { ViteSSG } from 'vite-ssg';
import './assets/css/index.less';

if (typeof window !== 'undefined') {
  import('lib-flexible').then(() => {});
}

export const createApp = ViteSSG(App, { routes });
