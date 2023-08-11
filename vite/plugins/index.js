import uni from '@dcloudio/vite-plugin-uni'

import createAutoImport from './auto-import'

export default function createVitePlugins(isBuild = false) {
  const vitePlugins = [uni(), createAutoImport()]
  return vitePlugins
}
