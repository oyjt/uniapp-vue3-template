import type { App } from 'vue';
import uvUI from '@/uni_modules/uv-ui-tools'

function setupUI(app: App) {
  app.use(uvUI);
}

export default setupUI;
