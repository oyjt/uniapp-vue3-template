/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { PluginOption } from 'vite';
import uniPlugin from '@dcloudio/vite-plugin-uni';
import { AutoImportDeps } from './autoImport';
import { AutoRegistryComponents } from './component';
import { ConfigUnoCSSPlugin } from './unocss';
import { ConfigImageminPlugin } from './imagemin';

export default function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // UnoCSS配置
    ConfigUnoCSSPlugin(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    AutoRegistryComponents(),
    // uni支持
    uniPlugin(),
  ];

  if (isBuild) {
    // vite-plugin-imagemin
    vitePlugins.push(ConfigImageminPlugin());
  }

  return vitePlugins;
}
