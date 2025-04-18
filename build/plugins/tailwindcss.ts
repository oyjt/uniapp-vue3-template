/**
 * @name TailwindcssPlugin
 * @description tailwindcss相关配置
 */
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';
import { WeappTailwindcssDisabled } from '../../platform';

export const TailwindcssPlugin = () => {
  return uvwt(
    {
      rem2rpx: true,
      disabled: WeappTailwindcssDisabled,
      tailwindcssPatcherOptions: {
        patch: {
          tailwindcss: {
            v4: {
              base: __dirname
            }
          }
        }
      }
    },
  );
};
