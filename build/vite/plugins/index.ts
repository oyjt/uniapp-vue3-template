import uni from '@dcloudio/vite-plugin-uni'

import AutoImportDeps from './autoImport'
import createAutoComponents from './component'

export default function createVitePlugins(isBuild: boolean) {
  return [AutoImportDeps(), createAutoComponents(), uni()]
}
