import uni from '@dcloudio/vite-plugin-uni'

import createAutoImport from './auto-import'
import createAutoComponents from './auto-component'

export default function createVitePlugins(isBuild = false) {
  return [createAutoImport(), createAutoComponents(), uni()]
}
