import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import createVitePlugins from './build/vite/plugins';
import proxy from './build/vite/proxy';

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  const isBuild = process.env.NODE_ENV === 'production';
  return {
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置别名
        '@': resolve(__dirname, './src'),
      },
    },
    // vite 相关配置
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy,
    },
    // 设置scss的api类型为modern-compiler
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          // 消除一些不必要的警告
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    plugins: createVitePlugins(isBuild),
  };
});
