import App from '@/App.vue'
import setupPlugins from '@/plugins'
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(setupPlugins)

  return {
    app,
  }
}
