import uniPlugin from '@dcloudio/vite-plugin-uni';
import ViteRestart from 'vite-plugin-restart';
import { AutoImportDeps } from './autoImport.js';
// import { ConfigImageminPlugin } from './imagemin.js';
// import { ReplaceUrlPlugin } from './replaceUrl.js';
import { AutoRegistryComponents } from './component.js';
import { ConfigUnoCSSPlugin } from './unocss.js';

export default function createVitePlugins(isBuild) {
  const vitePlugins = [
    // UnoCSS配置
    ConfigUnoCSSPlugin(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    AutoRegistryComponents(),
    // uni支持(兼容写法，兼容不同导出形式)
    (typeof uniPlugin === 'function' ? uniPlugin() : uniPlugin.default()),
    ViteRestart({
      // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
      restart: ['vite.config.js'],
    }),
  ];

  if (isBuild) {
    const buildPlugins = [
      // 图片资源自动转换为网络资源
      // ReplaceUrlPlugin(),
      // 自动清除本地图片
      // CleanImagePlugin(),
      // 打包视图分析
      // VisualizerPlugin(),
    ];
    vitePlugins.push(...buildPlugins);
  }

  return vitePlugins;
}
