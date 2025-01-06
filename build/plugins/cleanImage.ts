/**
 * @name cleanImagePlugin
 * @description 清除构建后的图片资源
 */
import CleanBuild from 'vite-plugin-clean-build';

export const CleanImagePlugin = () => {
  return CleanBuild({
    outputDir: 'dist/build/mp-weixin',
    patterns: ['static/images/**', '!static/images/logo.png', '!static/images/tabbar/**'],
  });
};
