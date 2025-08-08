import { createSSRApp } from 'vue';
import App from '@/App.vue';
import setupPlugins from '@/plugins';
// 引入UnoCSS
import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(setupPlugins);

  return {
    app,
  };
}
