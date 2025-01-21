interface ImportMetaEnv {
  /** 页面标题 */
  VITE_APP_TITLE: string;
  /** 开发环境配置 */
  VITE_APP_ENV: string;
  /** 接口地址 */
  VITE_API_BASE_URL: string;
  /** 端口号 */
  VITE_APP_PORT: string;
  /** h5是否需要配置代理 */
  VITE_APP_PROXY: string;
  /** API代理前缀 */
  VITE_API_PREFIX: string;
  /** 删除console */
  VITE_DROP_CONSOLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
