import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import { presetLegacyCompat } from '@unocss/preset-legacy-compat';
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify() as any,
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // 自定义图标
      collections: {
        // 从本地文件系统加载 svg 图标
        'my-icons': FileSystemIconLoader('./src/static/icons'),
        // 从在线图标库加载图标
        // 'my-online-icons': async (iconName) => {
        //   return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text());
        // },
      },
    }),
    /**
     * 启用 legacy-compat 模式(处理低端安卓机的样式问题)
     * @see https://unocss.dev/presets/legacy-compat
     */
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    'border-base': 'border border-gray-500_10',
    'center': 'flex justify-center items-center',
  },
  theme: {
    colors: {
      // 主题颜色
      'primary': 'var(--theme-primary)',
      'success': 'var(--theme-success)',
      'warning': 'var(--theme-warning)',
      'error': 'var(--theme-error)',
      // 文字颜色
      'text-main': 'var(--theme-main-color)',
      'text-content': 'var(--theme-content-color)',
      'text-tips': 'var(--theme-tips-color)',
      'text-light': 'var(--theme-light-color)',
      'text-disabled': 'var(--theme-disabled-color)',
      // 背景颜色
      'bg-main': 'var(--theme-bg-color)',
      'bg-secondary': 'var(--theme-bg-color-secondary)',
      // 边框颜色
      'border-main': 'var(--theme-border-color)',
    },
  },
  transformers: [
    // 启用 @apply 功能
    transformerDirectives({
      enforce: 'pre',
    }),
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
    // 暂时关闭这两个功能，会引起 sourcemap 异常无法正常调试
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    // transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    // transformerClass(),
  ],
});
