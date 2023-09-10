/**
 * @name AutoRegistryComponents
 * @description 按需加载，自动引入
 */
import Components from 'unplugin-vue-components/vite';

export const AutoRegistryComponents = () => {
  return Components({
    dts: 'types/components.d.ts',
  });
};
