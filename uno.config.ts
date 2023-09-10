import type { Preset, SourceCodeTransformer } from 'unocss';
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
  transformerAttributify,
} from 'unocss-applet';

// eslint-disable-next-line n/prefer-global/process
const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false;
const presets: Preset[] = [];
const transformers: SourceCodeTransformer[] = [];

if (isApplet) {
  /**
   * UnoCSS Applet
   * @see https://github.com/unocss-applet/unocss-applet
   */
  presets.push(presetApplet());
  presets.push(presetRemRpx()); // 如果需要使用 rem 转 rpx 单位，需要启用此插件
  transformers.push(transformerAttributify({ ignoreAttributes: ['block'] }));
  transformers.push(transformerApplet());
} else {
  presets.push(presetUno());
  presets.push(presetAttributify());
}

export default defineConfig({
  presets,
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [
    ['center', 'flex justify-center items-center'],
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none',
    ],
  ],
  transformers: [
    transformerDirectives(), // 启用 @apply 功能
    transformerVariantGroup(), // 启用 () 分组功能
    ...transformers,
  ],
});
