import type { Config } from 'tailwindcss';
import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons';
import cssMacro from 'weapp-tailwindcss/css-macro';
import { isMp } from './platform';

export default <Config>{
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {},
  // https://weapp-tw.icebreaker.top/docs/quick-start/uni-app-css-macro
  plugins: [
    cssMacro({
      variantsMap: {
        'wx': 'MP-WEIXIN',
        '-wx': {
          value: 'MP-WEIXIN',
          negative: true,
        },
        'mv': {
          // 可以使用表达式
          value: 'H5 || MP-WEIXIN',
        },
        '-mv': {
          // 可以使用表达式
          value: 'H5 || MP-WEIXIN',
          negative: true,
        },
      },
    }),
    iconsPlugin({
      // 在这里可以选择你要使用的 icon, 更多详见:
      // https://icon-sets.iconify.design/
      collections: getIconCollections(['svg-spinners', 'lucide']),
    }),
  ],
  corePlugins: {
    // 小程序去使用 h5 的 preflight 和响应式 container 没有意义
    preflight: !isMp,
    container: !isMp,
  },
};
