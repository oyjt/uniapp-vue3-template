import type { VNodeChild } from 'vue';

declare global {
  // vue
  declare type VueNode = VNodeChild | JSX.Element;

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  declare interface ViteEnv {
    VITE_APP_TITLE?: string;
    VITE_APP_BASE_API: string;
    VITE_APP_PORT: number;
    VITE_APP_PROXY: boolean;
    VITE_API_PREFIX: string;
    VITE_DROP_CONSOLE: boolean;
  }

  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;

  declare interface Uni {
    $u: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      view: _View;
    }
  }
}
