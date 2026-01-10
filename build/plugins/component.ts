/**
 * @name AutoComponentsPlugin
 * @description 按需加载，自动引入
 */
import Components from 'unplugin-vue-components/vite';

export const AutoComponentsPlugin = () => {
  return Components({
    dts: 'types/components.d.ts',
  });
};
