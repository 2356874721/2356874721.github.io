/// <reference types="vite/client" />

// 解决ts中引入.vue文件报没有声明的问题
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
