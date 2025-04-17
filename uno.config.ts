import { presetWind } from '@unocss/preset-wind3';
import {
  defineConfig,
  presetIcons,
  transformerVariantGroup,
} from 'unocss';
import presetAnimations from 'unocss-preset-animations';
import { presetShadcn } from 'unocss-preset-shadcn';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp() as any,
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
    presetWind(),
    presetAnimations(),
    presetShadcn(
      {
        // 自定义主题色
        color: 'zinc',
      },
      {
        // 如果使用reka-ui，需要添加这一行（shadcn-vue基于reka-ui）
        componentLibrary: 'reka',
      },
    ),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    'border-base': 'border border-gray-500_10',
    'center': 'flex justify-center items-center',
  },
  transformers: [
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
    // https://unocss.dev/transformers/directives
  ],
  // shadcn-vue 必须要下面的配置
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },
});
