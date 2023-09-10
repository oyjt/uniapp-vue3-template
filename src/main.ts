// 引入全局uview-plus
import uviewPlus from 'uview-plus';
import { createSSRApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';

// 引入UnoCSS
import 'uno.css';

// 引入mixin封装
import initMixin from '@/common/mixin';

// 引入请求封装
import initRequest from '@/utils/request/index';

// http接口API抽离，免于写url或者一些固定的参数
import initApi from '@/api/index';

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(store);

  initRequest();
  initMixin(app);
  initApi(app);

  return {
    app,
  };
}
// #endif
