import type { UserConfig } from 'vite';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import createVitePlugins from './build/vite/plugins';
import proxy from './build/vite/proxy';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode);

  const { UNI_PLATFORM } = process.env;
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM); // 得到 mp-weixin, h5, app 等

  const env = loadEnv(mode, resolve(process.cwd(), 'env'));
  console.log('环境变量 env -> ', env);

  const isBuild = process.env.NODE_ENV === 'production';
  return {
    // 自定义env目录
    envDir: './env',
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置别名
        '@': resolve(__dirname, './src'),
      },
    },
    // vite 相关配置
    server: {
      port: Number.parseInt(env.VITE_APP_PORT, 10),
      hmr: true,
      host: true,
      open: true,
      proxy: proxy(env),
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
    build: {
      // 开发环境不用压缩
      minify: isBuild ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE === 'true',
          drop_debugger: true,
        },
      },
    },
  };
});
