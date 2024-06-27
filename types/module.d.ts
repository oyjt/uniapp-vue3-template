/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'uview-plus';
declare module 'uview-plus/libs/mixin/mpShare.js';
