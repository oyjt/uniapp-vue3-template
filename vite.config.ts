import type { UserConfig } from 'vite';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { createViteProxy } from './build/config/index';
import createVitePlugins from './build/plugins/index';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode);

  const { UNI_PLATFORM } = process.env;
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM); // 得到 mp-weixin, h5, app 等

  const env = loadEnv(mode, fileURLToPath(new URL('./env', import.meta.url)));
  console.log('环境变量 env -> ', env);

  const isBuild = process.env.NODE_ENV === 'production';
  return {
    // 自定义env目录
    envDir: './env',
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置别名
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // vite 相关配置
    server: {
      port: Number.parseInt(env.VITE_APP_PORT, 10),
      hmr: true,
      host: true,
      open: true,
      proxy: createViteProxy(env),
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
    esbuild: {
      drop: JSON.parse(env.VITE_DROP_CONSOLE) ? ['console', 'debugger'] : [],
    },
  };
});
