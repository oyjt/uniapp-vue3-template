import type { Preset, SourceCodeTransformer } from 'unocss'
import { presetWind } from '@unocss/preset-wind3';
import {
  defineConfig,
  presetIcons,
  transformerVariantGroup,
  presetAttributify,
} from 'unocss';
import presetAnimations from 'unocss-preset-animations';
import { presetShadcn } from 'unocss-preset-shadcn';
import {
  presetApplet,
  presetRemRpx,
  transformerAttributify,
} from 'unocss-applet'

// uni-app
const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false
const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
  presets.push(presetApplet() as Preset<any>)
  presets.push(presetRemRpx() as Preset<any>)
  transformers.push(transformerAttributify({ ignoreAttributes: ['block'] }) as unknown as SourceCodeTransformer)
}
else {
  presets.push(presetApplet() as Preset<any>)
  presets.push(presetAttributify() as Preset<any>)
  presets.push(presetRemRpx({ mode: 'rpx2rem' }) as Preset<any>)
}

export default defineConfig({
  presets: [
    ...presets,
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWind() as Preset<any>,
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
    ...transformers,
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
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
