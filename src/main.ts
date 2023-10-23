import App from './App.vue';
import routes from 'pages-generated';
import { ViteSSG } from 'vite-ssg';
import 'lib-flexible';
import './assets/css/index.less';

export const createApp = ViteSSG(App, { routes });
