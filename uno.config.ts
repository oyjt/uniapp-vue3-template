import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

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
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    'border-base': 'border border-gray-500_10',
    'center': 'flex justify-center items-center',
    // 主题相关快捷方式
    'theme-bg': 'bg-[var(--theme-bg-color)]',
    'theme-bg-secondary': 'bg-[var(--theme-bg-color-secondary)]',
    'theme-bg-tertiary': 'bg-[var(--theme-bg-color-tertiary)]',
    'theme-text': 'text-[var(--theme-main-color)]',
    'theme-text-content': 'text-[var(--theme-content-color)]',
    'theme-text-tips': 'text-[var(--theme-tips-color)]',
    'theme-border': 'border-[var(--theme-border-color)]',
    'theme-shadow': 'shadow-[0_2px_8px_var(--theme-shadow-color)]',
  },
  theme: {
    colors: {
      // 主题颜色
      'primary': 'var(--theme-primary)',
      'primary-dark': 'var(--theme-primary-dark)',
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
      'bg-tertiary': 'var(--theme-bg-color-tertiary)',
      // 边框颜色
      'border-main': 'var(--theme-border-color)',
      'border-light': 'var(--theme-border-color-light)',
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
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
});
