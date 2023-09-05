import autoImport from 'unplugin-auto-import/vite'
import { UniUseAutoImports } from '@uni-helper/uni-use'

export default function createAutoImport() {
  return autoImport({
    imports: ['vue', 'uni-app', 'pinia', '@vueuse/core', UniUseAutoImports],
    dts: true,
    vueTemplate: true
  })
}
