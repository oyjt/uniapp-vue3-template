/**
 * @name TailwindcssPlugin
 * @description tailwindcss相关配置
 */
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';
import { WeappTailwindcssDisabled } from '../../platform';

export const TailwindcssPlugin = () => {
  return UnifiedViteWeappTailwindcssPlugin(
    {
      rem2rpx: true,
      disabled: WeappTailwindcssDisabled,
      tailwindcssBasedir: __dirname,
      injectAdditionalCssVarScope: true,
    },
  );
};
