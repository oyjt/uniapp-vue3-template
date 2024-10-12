import { createSSRApp } from 'vue';

// 引入UnoCSS
import 'virtual:uno.css';

// 引入uview-plus
import uviewPlus from 'uview-plus';
import App from '@/App.vue';

// 引入状态管理
import setupStore from '@/store';

// 引入请求封装
import setupRequest from '@/utils/request';

// 权限管理
import '@/permission';

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  // 状态管理
  setupStore(app);
  // 网络请求
  setupRequest();

  return {
    app,
  };
}
