/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
import { UniUseAutoImports } from '@uni-helper/uni-use'

export default function AutoImportDeps() {
  return AutoImport({
    imports: ['vue', 'uni-app', 'pinia', '@vueuse/core', UniUseAutoImports],
    dts: 'types/auto-imports.d.ts',
    vueTemplate: true
  })
}
