import { defineConfig } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins/index.js'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置别名
        '@': path.resolve(__dirname, './src')
      }
    },
    // vite 相关配置
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dev-api/, '')
        }
      }
    },
    plugins: createVitePlugins(command === 'build')
  }
})
